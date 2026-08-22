import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:noble_invoice/core/services/supabase_service.dart';
import 'package:noble_invoice/core/constants/env_constants.dart';

class WebEngineView extends StatefulWidget {
  final String path; // e.g., "/embed/invoice/123" or "/embed/business-card"
  final String title; // Fallback title or AppBar title if needed
  final bool showAppBar;
  final void Function(String message)? onMessageReceived;

  const WebEngineView({
    Key? key,
    required this.path,
    this.title = '',
    this.showAppBar = true,
    this.onMessageReceived,
  }) : super(key: key);

  @override
  State<WebEngineView> createState() => _WebEngineViewState();
}

class _WebEngineViewState extends State<WebEngineView> {
  late final WebViewController _controller;
  bool _isLoading = true;
  String _errorMessage = '';

  @override
  void initState() {
    super.initState();
    _initWebView();
  }

  Future<void> _initWebView() async {
    const String baseUrl = "http://10.0.2.2:3000"; // Local dev for now
    final String fullUrl = "$baseUrl${widget.path}";

    final session = SupabaseService.client.auth.currentSession;
    final String? accessToken = session?.accessToken;

    _controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(const Color(0x00000000));

    if (widget.onMessageReceived != null) {
      _controller.addJavaScriptChannel(
        'NobleBridge',
        onMessageReceived: (JavaScriptMessage message) {
          widget.onMessageReceived!(message.message);
        },
      );
    }

    _controller
      ..setNavigationDelegate(
        NavigationDelegate(
          onPageStarted: (String url) {
            setState(() { _isLoading = true; });
          },
          onPageFinished: (String url) async {
            if (accessToken != null) {
              final String jsCode = '''
                try {
                  localStorage.setItem('supabase.auth.token', JSON.stringify({
                    currentSession: { access_token: "$accessToken" }
                  }));
                  window.dispatchEvent(new Event('storage'));
                } catch(e) {
                  console.error("SSO Injection Error", e);
                }
              ''';
              await _controller.runJavaScript(jsCode);
            }
            
            Future.delayed(const Duration(milliseconds: 300), () {
              if (mounted) setState(() { _isLoading = false; });
            });
          },
          onWebResourceError: (WebResourceError error) {
            if (mounted) {
              setState(() {
                _isLoading = false;
                _errorMessage = 'Failed to load engine. Please check your connection.';
              });
            }
          },
        ),
      )
      ..loadRequest(Uri.parse(fullUrl));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white, // Match native background
      appBar: widget.showAppBar ? AppBar(
        title: Text(
          widget.title,
          style: const TextStyle(
            color: Colors.black87,
            fontWeight: FontWeight.w900,
            fontSize: 16,
            letterSpacing: 1.2,
          ),
        ),
        backgroundColor: Colors.white,
        elevation: 0,
        iconTheme: const IconThemeData(color: Colors.black87),
      ) : null,
      body: Stack(
        children: [
          if (_errorMessage.isNotEmpty)
            Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Icon(Icons.error_outline, color: Colors.redAccent, size: 48),
                  const SizedBox(height: 16),
                  Text(_errorMessage, style: const TextStyle(color: Colors.black54)),
                  const SizedBox(height: 16),
                  ElevatedButton(
                    onPressed: () {
                      setState(() {
                        _errorMessage = '';
                        _isLoading = true;
                      });
                      _controller.reload();
                    },
                    child: const Text('Retry'),
                  )
                ],
              ),
            )
          else
            WebViewWidget(controller: _controller),
            
          // Native Loading Spinner (Hides the fact that it's a web page loading)
          if (_isLoading && _errorMessage.isEmpty)
            Container(
              color: Colors.white,
              child: const Center(
                child: CircularProgressIndicator(
                  color: Color(0xFF2563EB), // Noble Blue
                  strokeWidth: 3,
                ),
              ),
            ),
        ],
      ),
    );
  }
}
