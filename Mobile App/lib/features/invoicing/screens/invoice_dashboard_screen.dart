import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:noble_invoice/core/utils/currency_formatter.dart';
import 'package:provider/provider.dart';
import 'package:noble_invoice/core/theme/app_colors.dart';
import 'package:noble_invoice/core/widgets/empty_state.dart';
import 'package:noble_invoice/features/invoicing/controllers/invoice_controller.dart';
import 'package:noble_invoice/features/invoicing/widgets/invoice_list_item.dart';
import 'package:noble_invoice/features/profile/controllers/profile_controller.dart';
import 'package:noble_invoice/routes/app_routes.dart';
import 'package:noble_invoice/features/invoicing/widgets/dashboard/total_invoiced_card.dart';
import 'package:noble_invoice/features/invoicing/widgets/dashboard/invoice_breakdown_chart.dart';
import 'package:noble_invoice/features/invoicing/widgets/dashboard/invoice_dashboard_summary.dart';
import 'package:noble_invoice/features/invoicing/widgets/dashboard/aging_report_widget.dart';
import 'package:noble_invoice/core/theme/glass_widgets.dart';
import 'package:noble_invoice/core/services/feature_gate_service.dart';

class InvoiceDashboardScreen extends StatefulWidget {
  const InvoiceDashboardScreen({super.key});

  @override
  State<InvoiceDashboardScreen> createState() => _InvoiceDashboardScreenState();
}

class _InvoiceDashboardScreenState extends State<InvoiceDashboardScreen> {
  bool _isSearching = false;
  final _searchController = TextEditingController();
  String _searchQuery = '';

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final ctrl = context.read<InvoiceController>();
      final profileCtrl = context.read<ProfileController>();
      ctrl.loadDashboard(targetCurrency: profileCtrl.preferredCurrency);
    });
  }

  @override
  Widget build(BuildContext context) {
    final ctrl = context.watch<InvoiceController>();

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: _buildAppBar(ctrl),
      body: ctrl.isLoading && ctrl.invoices.isEmpty
        ? const Center(child: CircularProgressIndicator())
        : RefreshIndicator(
            onRefresh: () => ctrl.loadDashboard(targetCurrency: context.read<ProfileController>().preferredCurrency),
            child: SingleChildScrollView(
              physics: const AlwaysScrollableScrollPhysics(),
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Column(children: [
                const SizedBox(height: 16),
                _buildViewSwitcher(ctrl),
                const SizedBox(height: 20),
                TotalInvoicedCard(ctrl: ctrl),
                const SizedBox(height: 16),
                InvoiceDashboardSummary(ctrl: ctrl),

                if (ctrl.viewType == InvoiceViewType.invoices && !ctrl.isLoading)
                  AgingReportWidget(aging: ctrl.agingSummary),
                
                if (ctrl.viewType == InvoiceViewType.invoices)
                  _buildUrgencyBanner(ctrl),
                
                const SizedBox(height: 24),
                _buildFilterTabs(ctrl),
                const SizedBox(height: 20),
                _buildRecentInvoicesHeader(ctrl),
                _buildInvoiceList(context, ctrl),
                const SizedBox(height: 24),
                InvoiceBreakdownChart(ctrl: ctrl),
                const SizedBox(height: 100),
              ]),
            ),
          ),
      floatingActionButton: _buildFAB(context, ctrl),
    );
  }

  PreferredSizeWidget _buildAppBar(InvoiceController ctrl) {
    return GlassAppBar(
      title: _isSearching
        ? TextField(
            controller: _searchController, autofocus: true,
            decoration: const InputDecoration(hintText: 'Search invoices...', border: InputBorder.none),
            onChanged: (val) => setState(() => _searchQuery = val.toLowerCase()),
          )
        : Text(ctrl.viewType == InvoiceViewType.invoices ? 'Invoice Hub' : 'Estimates & Quotes', 
            style: const TextStyle(fontWeight: FontWeight.w900, color: AppColors.black, fontSize: 18, letterSpacing: -0.5)),
      centerTitle: false, backgroundColor: AppColors.background.withOpacity(0.85), elevation: 0,
      actions: [
        IconButton(
          icon: Icon(_isSearching ? Icons.close_rounded : Icons.search_rounded, color: AppColors.darkGrey),
          onPressed: () => setState(() { _isSearching = !_isSearching; if (!_isSearching) { _searchController.clear(); _searchQuery = ''; } }),
        ),
        if (!_isSearching) ...[
          IconButton(icon: const Icon(Icons.analytics_rounded, color: AppColors.darkGrey), onPressed: () => Navigator.pushNamed(context, AppRoutes.exportReports)),
          IconButton(icon: const Icon(Icons.inventory_2_outlined, color: AppColors.darkGrey), onPressed: () => Navigator.pushNamed(context, AppRoutes.productList)),
          IconButton(icon: const Icon(Icons.settings_suggest_rounded, color: AppColors.primary), onPressed: () => Navigator.pushNamed(context, AppRoutes.invoiceModuleSettings)),
        ],
      ],
    );
  }

  Widget _buildViewSwitcher(InvoiceController ctrl) {
    return Container(
      height: 50,
      padding: const EdgeInsets.all(4),
      decoration: BoxDecoration(
        color: AppColors.lightGrey.withOpacity(0.3),
        borderRadius: BorderRadius.circular(15),
      ),
      child: Row(
        children: [
          Expanded(
            child: _buildSwitchItem(
              isActive: ctrl.viewType == InvoiceViewType.invoices,
              label: 'Invoices',
              icon: Icons.receipt_long_rounded,
              onTap: () => ctrl.setViewType(InvoiceViewType.invoices),
            ),
          ),
          Expanded(
            child: _buildSwitchItem(
              isActive: ctrl.viewType == InvoiceViewType.estimates,
              label: 'Estimates',
              icon: Icons.request_quote_rounded,
              onTap: () => ctrl.setViewType(InvoiceViewType.estimates),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSwitchItem({required bool isActive, required String label, required IconData icon, required VoidCallback onTap}) {
    return GestureDetector(
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 300),
        decoration: BoxDecoration(
          color: isActive ? AppColors.primaryDark : Colors.transparent,
          borderRadius: BorderRadius.circular(12),
          boxShadow: isActive ? [BoxShadow(color: Colors.black.withOpacity(0.08), blurRadius: 10, offset: const Offset(0, 4))] : [],
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, size: 18, color: isActive ? Colors.white : AppColors.darkGrey),
            const SizedBox(width: 8),
            Text(label, style: TextStyle(fontWeight: FontWeight.w900, fontSize: 13, color: isActive ? Colors.white : AppColors.darkGrey)),
          ],
        ),
      ),
    );
  }

  Widget _buildUrgencyBanner(InvoiceController ctrl) {
    if (ctrl.viewType != InvoiceViewType.invoices) return const SizedBox.shrink();
    final overdueCount = ctrl.invoices.where((i) => i.status == 'overdue').length;
    if (overdueCount == 0) return const SizedBox.shrink();

    return Padding(
      padding: const EdgeInsets.only(top: 20),
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          gradient: const LinearGradient(colors: [Color(0xFFFEF2F2), Color(0xFFFFF1F2)]),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: Colors.red.withOpacity(0.1)),
        ),
        child: Row(
          children: [
            Container(padding: const EdgeInsets.all(8), decoration: const BoxDecoration(color: Colors.red, shape: BoxShape.circle), child: const Icon(Icons.notifications_active_rounded, color: Colors.white, size: 16)),
            const SizedBox(width: 12),
            Expanded(
              child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Text('$overdueCount Invoices Overdue', style: const TextStyle(fontWeight: FontWeight.w900, color: Color(0xFF991B1B), fontSize: 13)),
                const Text('Collect payments to maintain healthy cash flow.', style: TextStyle(color: Color(0xFFB91C1C), fontSize: 11)),
              ]),
            ),
            TextButton(
              onPressed: () => ctrl.setFilter('overdue'),
              style: TextButton.styleFrom(backgroundColor: Colors.white, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8))),
              child: const Text('Resolve', style: TextStyle(fontWeight: FontWeight.w900, fontSize: 11, color: Colors.red)),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildFilterTabs(InvoiceController ctrl) {
    final isEstimates = ctrl.viewType == InvoiceViewType.estimates;
    final filters = isEstimates 
        ? ['all', 'pending', 'accepted', 'rejected', 'draft']
        : ['all', 'pending', 'paid', 'overdue', 'draft'];
        
    final labels = isEstimates
        ? {'all': 'All', 'pending': 'Open', 'accepted': 'Accepted', 'rejected': 'Declined', 'draft': 'Drafts'}
        : {'all': 'All', 'pending': 'Active', 'paid': 'Settled', 'overdue': 'Delayed', 'draft': 'Drafts'};

    return SizedBox(
      height: 40,
      child: ListView(
        scrollDirection: Axis.horizontal,
        children: filters.map((f) {
          final isActive = ctrl.filterStatus == f;
          return GestureDetector(
            onTap: () => ctrl.setFilter(f),
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 300),
              margin: const EdgeInsets.only(right: 10),
              padding: const EdgeInsets.symmetric(horizontal: 20),
              decoration: BoxDecoration(
                color: isActive ? AppColors.primary : Colors.white,
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: isActive ? AppColors.primary : AppColors.lightGrey),
              ),
              child: Center(child: Text(labels[f]!, style: TextStyle(fontWeight: FontWeight.w900, fontSize: 12, color: isActive ? Colors.white : AppColors.darkGrey))),
            ),
          );
        }).toList(),
      ),
    );
  }

  Widget _buildRecentInvoicesHeader(InvoiceController ctrl) {
    final title = ctrl.viewType == InvoiceViewType.invoices ? 'Recent Invoices' : 'Active Estimates';
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(title, style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 18, color: Color(0xFF0F172A), letterSpacing: -0.8)),
          GestureDetector(
            onTap: () => Navigator.pushNamed(context, AppRoutes.invoiceHistory),
            child: Row(
              children: [
                const Text('View All', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: AppColors.primary)),
                const SizedBox(width: 4),
                const Icon(Icons.arrow_forward_ios_rounded, size: 12, color: AppColors.primary),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildInvoiceList(BuildContext context, InvoiceController ctrl) {
    final filtered = ctrl.invoices.where((i) {
      if (_searchQuery.isEmpty) return true;
      return i.clientName.toLowerCase().contains(_searchQuery) || i.invoiceNumber.toLowerCase().contains(_searchQuery);
    }).toList();

    if (filtered.isEmpty && !ctrl.isLoading) {
      return EmptyState(
        icon: _searchQuery.isEmpty 
          ? (ctrl.viewType == InvoiceViewType.invoices ? Icons.auto_awesome_mosaic_rounded : Icons.history_edu_rounded) 
          : Icons.search_off_rounded,
        title: _searchQuery.isEmpty 
          ? (ctrl.viewType == InvoiceViewType.invoices ? 'Your \$1M Journey Starts Here' : 'No Estimates Yet') 
          : 'No matches found',
        description: _searchQuery.isEmpty 
          ? (ctrl.viewType == InvoiceViewType.invoices ? 'Create your first professional invoice in seconds.' : 'Send a quote to win more business.') 
          : 'Try adjusting your search filters.',
        actionLabel: _searchQuery.isEmpty 
          ? (ctrl.viewType == InvoiceViewType.invoices ? 'Create First Invoice' : 'Create First Estimate') 
          : 'Clear Search',
        onAction: () {
          if (_searchQuery.isNotEmpty) {
            setState(() { _isSearching = false; _searchController.clear(); _searchQuery = ''; });
          } else {
            final fg = FeatureGateService();
            final currentMonthInvoices = ctrl.invoices.where((i) {
              final d = DateTime.tryParse(i.issueDate);
              if (d == null) return false;
              final now = DateTime.now();
              return d.year == now.year && d.month == now.month;
            }).length;

            final maxInvoices = fg.getLimit('invoice.create') ?? -1;
            if (maxInvoices != -1 && currentMonthInvoices >= maxInvoices) {
              ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Monthly invoice limit reached. Please upgrade.')));
              Navigator.pushNamed(context, AppRoutes.pricingPlans);
              return;
            }

            if (ctrl.viewType == InvoiceViewType.invoices) {
              Navigator.pushNamed(context, AppRoutes.invoiceTypeSelection);
            } else {
              Navigator.pushNamed(context, AppRoutes.createInvoice, arguments: InvoiceType.estimate);
            }
          }
        },
      );
    }

    return Column(children: filtered.take(3).map((invoice) => Padding(
      padding: const EdgeInsets.only(bottom: 4),
      child: InvoiceListCard(
        clientName: invoice.clientName, invoiceId: invoice.invoiceNumber,
        date: invoice.issueDate.isNotEmpty ? DateFormat('d MMM').format(DateTime.parse(invoice.issueDate)) : '--',
        amount: CurrencyFormatter.format(context, invoice.totalAmount),
        status: InvoiceController.parseStatus(invoice.status),
        onTap: () => Navigator.pushNamed(context, AppRoutes.invoiceDetails, arguments: invoice.id),
      ),
    )).toList());
  }

  Widget _buildFAB(BuildContext context, InvoiceController ctrl) {
    final isEstimates = ctrl.viewType == InvoiceViewType.estimates;
    return FloatingActionButton.extended(
      onPressed: () async { 
        final fg = FeatureGateService();
        final currentMonthInvoices = ctrl.invoices.where((i) {
          final d = DateTime.tryParse(i.issueDate);
          if (d == null) return false;
          final now = DateTime.now();
          return d.year == now.year && d.month == now.month;
        }).length;

        final maxInvoices = fg.getLimit('invoice.create') ?? -1;
        if (maxInvoices != -1 && currentMonthInvoices >= maxInvoices) {
          ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Monthly invoice limit reached. Please upgrade.')));
          Navigator.pushNamed(context, AppRoutes.pricingPlans);
          return;
        }

        if (isEstimates) {
          await Navigator.pushNamed(context, AppRoutes.createInvoice, arguments: InvoiceType.estimate);
        } else {
          await Navigator.pushNamed(context, AppRoutes.invoiceTypeSelection);
        }
        if (context.mounted) ctrl.loadDashboard(); 
      },
      backgroundColor: AppColors.primary, elevation: 8,
      icon: const Icon(Icons.add_rounded, color: Colors.white, size: 28),
      label: Text(isEstimates ? 'New Estimate' : 'New Invoice', style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w800, fontSize: 15)),
    );
  }
}
