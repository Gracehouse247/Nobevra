import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/theme/app_text_styles.dart';
import '../models/payment_methods.dart';
import '../../../../core/services/payment_service.dart';

/// The result of a completed in-app payment session.
class PaymentResult {
  final bool isSuccess;
  final String? txRef;
  final PaymentGateway gateway;
  final String? failureReason;

  const PaymentResult({
    required this.isSuccess,
    this.txRef,
    required this.gateway,
    this.failureReason,
  });
}

/// Premium in-app payment WebView.
/// Renders the full Flutterwave or Paystack checkout page inside the app.
/// Intercepts redirect URLs to detect success/failure without ever opening
/// an external browser — keeping the user 100% within Nobevra.
class PaymentWebViewScreen extends StatefulWidget {
  final String checkoutUrl;
  final String txRef;
  final PaymentGateway gateway;

  const PaymentWebViewScreen({
    super.key,
    required this.checkoutUrl,
    required this.txRef,
    required this.gateway,
  });

  @override
  State<PaymentWebViewScreen> createState() => _PaymentWebViewScreenState();
}

class _PaymentWebViewScreenState extends State<PaymentWebViewScreen> {
  late final WebViewController _controller;
  bool _isLoading = true;
  bool _hasError = false;
  int _loadProgress = 0;
  bool _verifying = false;

  // ── Flutterwave redirect patterns ──────────────────────────────────────
  // Flutterwave redirects to the `redirect_url` you configure on your backend.
  // The backend sets it to: https://go.noblesworld.com.ng/api/payments/flutterwave/callback
  // Flutterwave appends: ?status=successful&tx_ref=...&transaction_id=...
  static const _flwSuccessPatterns = [
    'status=successful',
    'status=completed',
    'payment-success',
    'flutterwave/callback',
  ];
  static const _flwFailurePatterns = [
    'status=cancelled',
    'status=failed',
    'payment-failure',
    'payment-cancel',
  ];

  // ── Paystack redirect patterns ──────────────────────────────────────────
  // Paystack redirects to your callback_url:
  // https://go.noblesworld.com.ng/api/payments/paystack/callback?reference=...&trxref=...
  static const _psSuccessPatterns = [
    'paystack/callback',
    'paystack/success',
    'trxref=',
  ];
  static const _psFailurePatterns = [
    'paystack/cancel',
    'paystack/failure',
  ];

  @override
  void initState() {
    super.initState();
    _setupWebView();
  }

  void _setupWebView() {
    _controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(Colors.white)
      ..setNavigationDelegate(
        NavigationDelegate(
          onPageStarted: (url) {
            setState(() {
              _isLoading = true;
              _hasError = false;
            });
            _checkRedirectUrl(url);
          },
          onProgress: (progress) {
            setState(() => _loadProgress = progress);
          },
          onPageFinished: (url) {
            setState(() => _isLoading = false);
            _checkRedirectUrl(url);
          },
          onWebResourceError: (error) {
            // Only show error for main frame failures, not sub-resource errors
            if (error.isForMainFrame ?? true) {
              setState(() {
                _isLoading = false;
                _hasError = true;
              });
            }
          },
          onNavigationRequest: (request) {
            final url = request.url;

            // Intercept success/failure — prevent navigation and handle internally
            if (_isSuccessUrl(url)) {
              _handleSuccess(url);
              return NavigationDecision.prevent;
            }
            if (_isFailureUrl(url)) {
              _handleFailure(url);
              return NavigationDecision.prevent;
            }

            // Allow all other navigations within the payment flow (3DS, OTP pages, etc.)
            return NavigationDecision.navigate;
          },
        ),
      )
      ..loadRequest(Uri.parse(widget.checkoutUrl));
  }

  void _checkRedirectUrl(String url) {
    if (_isSuccessUrl(url)) {
      _handleSuccess(url);
    } else if (_isFailureUrl(url)) {
      _handleFailure(url);
    }
  }

  bool _isSuccessUrl(String url) {
    final lower = url.toLowerCase();
    final patterns = widget.gateway == PaymentGateway.flutterwave
        ? _flwSuccessPatterns
        : _psSuccessPatterns;
    return patterns.any((p) => lower.contains(p));
  }

  bool _isFailureUrl(String url) {
    final lower = url.toLowerCase();
    final patterns = widget.gateway == PaymentGateway.flutterwave
        ? _flwFailurePatterns
        : _psFailurePatterns;
    return patterns.any((p) => lower.contains(p));
  }

  void _handleSuccess(String url) async {
    if (_verifying) return;
    setState(() => _verifying = true);

    // Extract txRef from URL params as a safety check (backend primary source)
    String txRef = widget.txRef;
    try {
      final uri = Uri.parse(url);
      final urlTxRef = uri.queryParameters['tx_ref'] ??
          uri.queryParameters['reference'] ??
          uri.queryParameters['trxref'];
      if (urlTxRef != null && urlTxRef.isNotEmpty) {
        txRef = urlTxRef;
      }
    } catch (_) {}

    // Verify on backend (server-side confirmation — cannot be spoofed)
    final isVerified = await PaymentService.verifyPayment(
      txRef: txRef,
    );

    if (mounted) {
      Navigator.pop(
        context,
        PaymentResult(
          isSuccess: isVerified,
          txRef: txRef,
          gateway: widget.gateway,
          failureReason: isVerified ? null : 'Payment verification failed.',
        ),
      );
    }
  }

  void _handleFailure(String url) {
    String? reason;
    try {
      final uri = Uri.parse(url);
      reason = uri.queryParameters['message'] ?? uri.queryParameters['reason'];
    } catch (_) {}

    if (mounted) {
      Navigator.pop(
        context,
        PaymentResult(
          isSuccess: false,
          txRef: widget.txRef,
          gateway: widget.gateway,
          failureReason: reason ?? 'Payment was cancelled or failed.',
        ),
      );
    }
  }

  String get _gatewayName =>
      widget.gateway == PaymentGateway.flutterwave ? 'Flutterwave' : 'Paystack';

  Color get _gatewayColor =>
      widget.gateway == PaymentGateway.flutterwave
          ? const Color(0xFFF5A623) // Flutterwave orange
          : const Color(0xFF00C3F7); // Paystack teal

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: _buildAppBar(),
      body: Stack(
        children: [
          // ── WebView ───────────────────────────────────────────────────
          if (!_hasError)
            WebViewWidget(controller: _controller)
          else
            _buildErrorState(),

          // ── Progress Bar ──────────────────────────────────────────────
          if (_isLoading)
            Positioned(
              top: 0,
              left: 0,
              right: 0,
              child: LinearProgressIndicator(
                value: _loadProgress / 100,
                minHeight: 3,
                backgroundColor: Colors.transparent,
                valueColor: AlwaysStoppedAnimation<Color>(_gatewayColor),
              ),
            ),

          // ── Verifying Overlay ─────────────────────────────────────────
          if (_verifying) _buildVerifyingOverlay(),
        ],
      ),
    );
  }

  PreferredSizeWidget _buildAppBar() {
    return AppBar(
      backgroundColor: Colors.white,
      elevation: 0,
      leading: IconButton(
        icon: const Icon(Icons.close_rounded, color: Colors.black87),
        onPressed: () {
          _showExitConfirmation();
        },
      ),
      title: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: 8,
            height: 8,
            decoration: BoxDecoration(
              color: _isLoading ? Colors.orange : const Color(0xFF22C55E),
              shape: BoxShape.circle,
            ),
          ),
          const SizedBox(width: 8),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Secure Checkout',
                style: AppTextStyles.bodyMedium.copyWith(
                  fontWeight: FontWeight.bold,
                  fontSize: 14,
                  color: Colors.black87,
                ),
              ),
              Text(
                'Powered by $_gatewayName',
                style: TextStyle(
                  fontSize: 10,
                  color: Colors.grey.shade500,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ],
          ),
        ],
      ),
      centerTitle: true,
      actions: [
        // SSL padlock badge
        Padding(
          padding: const EdgeInsets.only(right: 16),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(Icons.lock_rounded, size: 14, color: Colors.green.shade600),
              const SizedBox(width: 4),
              Text(
                'SSL',
                style: TextStyle(
                  fontSize: 11,
                  color: Colors.green.shade600,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),
        ),
      ],
      bottom: PreferredSize(
        preferredSize: const Size.fromHeight(1),
        child: Divider(color: Colors.grey.shade100, height: 1),
      ),
    );
  }

  Widget _buildVerifyingOverlay() {
    return Container(
      color: Colors.black.withOpacity(0.6),
      child: Center(
        child: Container(
          margin: const EdgeInsets.symmetric(horizontal: 48),
          padding: const EdgeInsets.all(32),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(24),
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const CircularProgressIndicator(
                valueColor: AlwaysStoppedAnimation<Color>(AppColors.primary),
                strokeWidth: 3,
              ),
              const SizedBox(height: 20),
              const Text(
                'Confirming Payment',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 8),
              Text(
                'Please wait while we verify your transaction securely...',
                textAlign: TextAlign.center,
                style: TextStyle(color: Colors.grey.shade600, fontSize: 13),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildErrorState() {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(40),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: Colors.red.shade50,
                shape: BoxShape.circle,
              ),
              child: Icon(Icons.wifi_off_rounded, size: 48, color: Colors.red.shade400),
            ),
            const SizedBox(height: 24),
            const Text(
              'Connection Issue',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            Text(
              'We couldn\'t load the payment page. Check your internet connection and try again.',
              textAlign: TextAlign.center,
              style: TextStyle(color: Colors.grey.shade600, fontSize: 14, height: 1.5),
            ),
            const SizedBox(height: 32),
            ElevatedButton.icon(
              onPressed: () {
                setState(() {
                  _hasError = false;
                  _isLoading = true;
                });
                _controller.loadRequest(Uri.parse(widget.checkoutUrl));
              },
              icon: const Icon(Icons.refresh_rounded),
              label: const Text('Try Again'),
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.primary,
                foregroundColor: Colors.white,
                padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 16),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _showExitConfirmation() {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        title: const Text('Cancel Payment?', style: TextStyle(fontWeight: FontWeight.bold)),
        content: const Text(
          'Your payment is not complete. Are you sure you want to go back?',
          style: TextStyle(color: Colors.black87, height: 1.5),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text('Continue', style: TextStyle(color: AppColors.primary, fontWeight: FontWeight.bold)),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(ctx);
              Navigator.pop(
                context,
                PaymentResult(
                  isSuccess: false,
                  txRef: widget.txRef,
                  gateway: widget.gateway,
                  failureReason: 'User cancelled payment.',
                ),
              );
            },
            child: const Text('Cancel Payment', style: TextStyle(color: Colors.red)),
          ),
        ],
      ),
    );
  }
}
