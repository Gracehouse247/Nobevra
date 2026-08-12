import 'package:flutter/material.dart';
import 'package:noble_invoice/features/auth/screens/welcome_screen.dart';
import 'package:noble_invoice/features/auth/screens/login_screen.dart';
import 'package:noble_invoice/features/auth/screens/sign_up_screen.dart';
import 'package:noble_invoice/features/auth/screens/otp_verification_screen.dart';
import 'package:noble_invoice/features/auth/screens/email_verification_screen.dart';
import 'package:noble_invoice/features/auth/screens/forgot_password_screen.dart';
import 'package:noble_invoice/features/auth/screens/create_new_password_screen.dart';
import 'package:noble_invoice/features/auth/screens/biometric_setup_screen.dart';
import 'package:noble_invoice/features/auth/screens/totp_setup_screen.dart';
import 'package:noble_invoice/features/auth/screens/totp_verification_screen.dart';
import 'package:noble_invoice/features/qr_generator/types/website/qr_website_form_screen.dart';
import 'package:noble_invoice/features/qr_generator/types/wifi/qr_wifi_form_screen.dart';
import 'package:noble_invoice/features/qr_generator/types/vcard/qr_vcard_form_screen.dart';
import 'package:noble_invoice/features/qr_generator/types/business/qr_business_form_screen.dart';
import 'package:noble_invoice/features/qr_generator/types/menu/qr_menu_form_screen.dart';
import 'package:noble_invoice/features/qr_generator/types/social/qr_social_form_screen.dart';
import 'package:noble_invoice/features/qr_generator/types/app_store/qr_app_store_form_screen.dart';
import 'package:noble_invoice/features/qr_generator/types/pdf/qr_pdf_form_screen.dart';
import 'package:noble_invoice/features/qr_generator/types/image_gallery/qr_image_gallery_form_screen.dart';
import 'package:noble_invoice/features/qr_generator/types/video/qr_video_form_screen.dart';
import 'package:noble_invoice/features/qr_generator/types/event/qr_event_form_screen.dart';
import 'package:noble_invoice/features/qr_generator/types/bitcoin/qr_bitcoin_form_screen.dart';
import 'package:noble_invoice/features/qr_generator/types/email/qr_email_form_screen.dart';
import 'package:noble_invoice/features/qr_generator/types/whatsapp/qr_whatsapp_form_screen.dart';
import 'package:noble_invoice/features/qr_generator/types/coupon/qr_coupon_form_screen.dart';
import 'package:noble_invoice/features/qr_generator/types/mp3/qr_mp3_form_screen.dart';
import 'package:noble_invoice/features/qr_generator/types/sms/qr_sms_form_screen.dart';
import 'package:noble_invoice/features/qr_generator/types/location/qr_location_form_screen.dart';
import 'package:noble_invoice/features/qr_generator/types/text/qr_text_form_screen.dart';
import 'package:noble_invoice/features/qr_generator/types/call/qr_call_form_screen.dart';
import 'package:noble_invoice/features/qr_generator/screens/qr_preview_screen.dart';
import 'package:noble_invoice/features/qr_generator/screens/qr_success_screen.dart';
import 'package:noble_invoice/features/navigation/screens/main_navigation_screen.dart';
import 'package:noble_invoice/features/onboarding/screens/onboarding_screen.dart';
import 'package:noble_invoice/features/qr_generator/screens/qr_type_selection_screen.dart';
import 'package:noble_invoice/features/splash/screens/splash_screen.dart';
import 'package:noble_invoice/features/system/screens/update_required_screen.dart';
import 'package:noble_invoice/features/system/screens/maintenance_screen.dart';
import 'package:noble_invoice/features/system/screens/offline_screen.dart';
import 'package:noble_invoice/features/system/screens/session_expired_screen.dart';
import 'package:noble_invoice/features/invoicing/screens/invoice_dashboard_screen.dart';
import 'package:noble_invoice/features/invoicing/screens/create_invoice_screen.dart';
import 'package:noble_invoice/features/invoicing/screens/invoice_details_screen.dart';
import 'package:noble_invoice/features/invoicing/screens/client_selection_screen.dart';
import 'package:noble_invoice/features/invoicing/screens/client_details_screen.dart';
import 'package:noble_invoice/features/invoicing/screens/invoice_preview_screen.dart';
import 'package:noble_invoice/features/invoicing/screens/invoice_history_screen.dart';
import 'package:noble_invoice/features/invoicing/screens/add_invoice_item_screen.dart';
// AddClientScreen removed - use AddClientSheet instead
import 'package:noble_invoice/features/invoicing/screens/invoice_type_selection_screen.dart';
import 'package:noble_invoice/features/invoicing/models/invoice_model.dart';
import 'package:noble_invoice/features/invoicing/models/invoice_details_model.dart';
import 'package:noble_invoice/features/invoicing/models/invoice_type.dart';
import 'package:noble_invoice/features/invoicing/models/pdf_template.dart';
import 'package:noble_invoice/features/invoicing/models/client_model.dart';
import 'package:noble_invoice/features/reports/screens/export_reports_screen.dart';
import 'package:noble_invoice/features/invoicing/screens/settings/tax_discount_settings_screen.dart';
import 'package:noble_invoice/features/invoicing/screens/settings/invoice_template_selector_screen.dart';
import 'package:noble_invoice/features/invoicing/screens/settings/invoice_module_settings_screen.dart';
import 'package:noble_invoice/features/qr_generator/screens/qr_customization_screen.dart';
import 'package:noble_invoice/features/qr_generator/screens/qr_export_screen.dart';
import 'package:noble_invoice/features/qr_generator/screens/qr_activity_monitor_screen.dart';
import 'package:noble_invoice/features/qr_generator/screens/qr_folders_screen.dart';
import 'package:noble_invoice/features/qr_generator/screens/qr_history_screen.dart';
import 'package:noble_invoice/features/qr_generator/screens/qr_icon_management_screen.dart';
import 'package:noble_invoice/features/expenses/screens/expense_history_screen.dart';
import 'package:noble_invoice/features/expenses/screens/add_expense_screen.dart';
import 'package:noble_invoice/features/inventory/screens/product_list_screen.dart';
import 'package:noble_invoice/features/inventory/screens/add_product_screen.dart';
import 'package:noble_invoice/features/profile/screens/profile_overview_screen.dart';
import 'package:noble_invoice/features/profile/screens/team_management_screen.dart';
import 'package:noble_invoice/features/invoicing/screens/settings/invoice_branding_screen.dart';
import 'package:noble_invoice/features/profile/screens/edit_profile_screen.dart';
import 'package:noble_invoice/features/profile/screens/notification_settings_screen.dart';
import 'package:noble_invoice/features/profile/screens/appearance_settings_screen.dart';
import 'package:noble_invoice/features/profile/screens/security_settings_screen.dart';
import 'package:noble_invoice/features/profile/screens/update_password_screen.dart';
import 'package:noble_invoice/features/brand/screens/brand_kit_screen.dart';
import 'package:noble_invoice/features/brand/screens/asset_gallery_screen.dart';
import 'package:noble_invoice/features/wallet/screens/pricing_plans_screen.dart';
import 'package:noble_invoice/features/wallet/screens/payment_methods_screen.dart';
import 'package:noble_invoice/features/wallet/screens/upgrade_success_screen.dart';
import 'package:noble_invoice/features/wallet/screens/revenue_analytics_screen.dart';
import 'package:noble_invoice/features/wallet/screens/advanced_reports_screen.dart';
import 'package:noble_invoice/features/wallet/screens/billing_history_screen.dart';
import 'package:noble_invoice/features/support/screens/help_center_screen.dart';
import 'package:noble_invoice/features/support/screens/faq_screen.dart';
import 'package:noble_invoice/features/support/screens/contact_support_screen.dart';
import 'package:noble_invoice/features/support/screens/legal_screen.dart';
import 'package:noble_invoice/features/admin/screens/admin_dashboard_screen.dart';
import 'package:noble_invoice/features/admin/screens/user_management_screen.dart';
import 'package:noble_invoice/features/admin/screens/system_logs_screen.dart';
import 'package:noble_invoice/features/admin/screens/security_portal_screen.dart';
import 'package:noble_invoice/features/admin/screens/audit_logs_screen.dart';
import 'package:noble_invoice/features/admin/screens/admin_notifications_screen.dart';
import 'package:noble_invoice/features/analytics/screens/year_in_review_screen.dart';
import 'package:noble_invoice/features/qr_generator/screens/qr_performance_screen.dart';
import 'package:noble_invoice/features/qr_generator/screens/qr_performance_insights_screen.dart';
import 'package:noble_invoice/features/qr_generator/screens/qr_milestone_screen.dart';
import 'package:noble_invoice/features/onboarding/screens/quick_tour_screen.dart';
import 'package:noble_invoice/features/support/screens/referral_screen.dart';
import 'package:noble_invoice/features/support/screens/live_support_chat_screen.dart';
import 'package:noble_invoice/features/support/screens/report_issue_screen.dart';
import 'package:noble_invoice/features/support/screens/feature_suggestion_screen.dart';
import 'package:noble_invoice/features/admin/screens/content_moderation_screen.dart';
import 'package:noble_invoice/features/admin/screens/business_reports_screen.dart';
import 'package:noble_invoice/features/system/screens/offline_connection_screen.dart';
import 'package:noble_invoice/features/system/screens/system_maintenance_screen.dart';
import 'package:noble_invoice/features/system/screens/app_update_required_screen.dart';
import 'package:noble_invoice/features/profile/screens/delete_account_screen.dart';
import 'package:noble_invoice/features/profile/screens/recognized_devices_screen.dart';
import 'package:noble_invoice/features/business_card/screens/business_card_designer_screen.dart';
import 'package:noble_invoice/features/invoicing/screens/recurring_invoices_screen.dart';
import 'package:noble_invoice/features/invoicing/screens/create_recurring_invoice_screen.dart';
import 'package:noble_invoice/features/invoicing/screens/onboarding/business_profile_required_screen.dart';
import 'package:noble_invoice/features/onboarding/screens/onboarding_manager_screen.dart';
import 'package:noble_invoice/features/clients/screens/crm_dashboard_screen.dart';
import 'package:noble_invoice/features/profile/screens/payout_settings_screen.dart';
import 'package:noble_invoice/features/analytics/screens/financial_intelligence_dashboard.dart';
import 'package:noble_invoice/features/dashboard/screens/unified_activity_screen.dart';
import 'package:noble_invoice/features/ai_assistant/screens/ai_chat_screen.dart';

class AppRoutes {
  AppRoutes._();

  static const String splash = '/';
  static const String onboarding = '/onboarding';
  static const String onboardingManager = '/onboarding-manager';
  static const String dashboard = '/dashboard';
  static const String aiAssistant = '/ai-assistant';
  static const String activityHistory = '/activity-history';
  static const String qrTypeSelection = '/qr-type-selection';
  static const String qrBusinessForm = '/qr-business';
  
  // Auth Routes
  static const String welcome = '/welcome';
  static const String login = '/login';
  static const String signUp = '/sign-up';
  static const String otpVerification = '/otp-verification';
  static const String emailVerification = '/email-verification';
  static const String forgotPassword = '/forgot-password';
  static const String createNewPassword = '/create-new-password';
  static const String biometricSetup = '/biometric-setup';
  static const String totpSetup = '/totp-setup';
  static const String totpVerification = '/totp-verification';
  
  // QR Forms
  static const String websiteQrForm = '/website-qr-form';
  static const String wifiQrForm = '/wifi-qr-form';
  static const String vCardQrForm = '/vcard-qr-form';
  static const String businessQrForm = '/business-qr-form';
  static const String menuQrForm = '/menu-qr-form';
  static const String socialMediaQrForm = '/social-media-qr-form';
  static const String appStoreQrForm = '/app-store-qr-form';
  static const String pdfQrForm = '/pdf-qr-form';
  static const String imageQrForm = '/image-qr-form';
  static const String videoQrForm = '/video-qr-form';
  static const String eventQrForm = '/event-qr-form';
  static const String bitcoinQrForm = '/bitcoin-qr-form';
  static const String emailQrForm = '/email-qr-form';
  static const String whatsappQrForm = '/whatsapp-qr-form';
  static const String couponQrForm = '/coupon-qr-form';
  static const String mp3QrForm = '/mp3-qr-form';
  static const String smsQrForm = '/sms-qr-form';
  static const String locationQrForm = '/location-qr-form';
  static const String textQrForm = '/text-qr-form';
  static const String callQrForm = '/call-qr-form';
  static const String qrPreview = '/qr-preview';
  static const String qrSuccess = '/qr-success';
  static const String qrHistory = '/qr-history';
  static const String qrPerformance = '/qr-performance';
  static const String qrActivityMonitor = '/qr-activity-monitor';
  static const String qrFolders = '/qr-folders';
  static const String qrIconManagement = '/qr-icon-management';
  static const String qrCustomization = '/qr-customization';
  static const String qrExport = '/qr-export';
  static const String qrPerformanceInsights = '/qr-performance-insights';
  static const String qrMilestone = '/qr-milestone';
  
  // System Routes
  static const String updateRequired = '/update-required';
  static const String maintenance = '/maintenance';
  static const String offline = '/offline';
  static const String sessionExpired = '/session-expired';
  static const String invoiceDashboard = '/invoice-dashboard';
  static const String crmDashboard = '/crm-dashboard';
  static const String invoiceTypeSelection = '/invoice-type-selection';
  static const String createInvoice = '/create-invoice';
  static const String invoiceDetails = '/invoice-details';
  static const String invoicePreview = '/invoice-preview';
  static const String exportReports = '/export-reports';
  static const String taxDiscountSettings = '/tax-discount-settings';
  static const String invoiceTemplateSelector = '/invoice-template-selector';
  static const String invoiceModuleSettings = '/invoice-module-settings';
  static const String invoiceHistory = '/invoice-history';
  static const String addInvoiceItem = '/add-invoice-item';
  static const String addClient = '/add-client';
  static const String clientDetails = '/client-details';
  static const String clientSelection = '/client-selection';
  static const String recurringInvoices = '/recurring-invoices';
  static const String createRecurringInvoice = '/create-recurring-invoice';
  static const String invoiceBranding = '/invoice-branding';
  static const String businessProfileRequired = '/business-profile-required';
  static const String expenseHistory = '/expense-history';
  static const String addExpense = '/add-expense';
  static const String productList = '/product-list';
  static const String addProduct = '/add-product';
  


  // Profile & Settings
  static const String profileOverview = '/profile-overview';
  static const String teamManagement = '/team-management';
  static const String editProfile = '/edit-profile';
  static const String notificationSettings = '/notification-settings';
  static const String appearanceSettings = '/appearance-settings';
  static const String securitySettings = '/security-settings';
  static const String updatePassword = '/update-password';
  static const String deleteAccount = '/delete-account';
  static const String billingHistory = '/billing-history';
  static const String recognizedDevices = '/recognized-devices';
  static const String businessCardDesigner = '/business-card-designer';
  static const String payoutSettings = '/payout-settings';

  // Brand Kit & Assets
  static const String brandKit = '/brand-kit';
  static const String assetGallery = '/asset-gallery';

  // Wallet & Subscription
  static const String pricingPlans = '/pricing-plans';
  static const String paymentMethods = '/payment-methods';
  static const String upgradeSuccess = '/upgrade-success';
  static const String revenueAnalytics = '/revenue-analytics';
  static const String advancedReports = '/advanced-reports';
  static const String financialIntelligence = '/financial-intelligence';

  // Support & Legal
  static const String helpCenter = '/help-center';
  static const String faq = '/faq';
  static const String contactSupport = '/contact-support';
  static const String liveSupportChat = '/live-support-chat';
  static const String reportIssue = '/report-issue';
  static const String featureSuggestion = '/feature-suggestion';
  static const String privacyPolicy = '/privacy-policy';
  static const String termsOfService = '/terms-of-service';
  static const String legal = '/legal';

  // Admin Portal
  static const String adminDashboard = '/admin-dashboard';
  static const String userManagement = '/user-management';
  static const String systemLogs = '/system-logs';
  static const String adminSecurityPortal = '/admin-security-portal';
  static const String auditLogs = '/audit-logs';
  static const String contentModeration = '/content-moderation';
  static const String businessReports = '/business-reports';
  static const String adminNotifications = '/admin-notifications';

  // System & Edge Cases
  static const String offlineConnection = '/offline-connection';
  static const String systemMaintenance = '/system-maintenance';
  static const String appUpdateRequired = '/app-update-required';
  // Marketing & Previews
  static const String appLandingPreview = '/app-landing-preview';


  static const String vcardPreview = '/vcard-preview';
  static const String quickTour = '/quick-tour';
  static const String referral = '/referral';
  static const String yearInReview = '/year-in-review';

  static Route<dynamic> generateRoute(RouteSettings settings) {
    switch (settings.name) {
      case splash:
        return MaterialPageRoute(builder: (_) => const SplashScreen());
      case onboarding:
        return MaterialPageRoute(builder: (_) => const OnboardingScreen());
      case onboardingManager:
        return MaterialPageRoute(builder: (_) => const OnboardingManagerScreen());
      case dashboard:
        return MaterialPageRoute(builder: (_) => const MainNavigationScreen());
      case aiAssistant:
        return MaterialPageRoute(builder: (_) => const AiChatScreen());
      case activityHistory:
        return MaterialPageRoute(builder: (_) => const UnifiedActivityScreen());
      case qrTypeSelection:
        return MaterialPageRoute(builder: (_) => const QrTypeSelectionScreen());
      case qrBusinessForm:
        return MaterialPageRoute(builder: (_) => const QrBusinessFormScreen());
      
      // Auth Cases
      case welcome:
        return MaterialPageRoute(builder: (_) => const WelcomeScreen());
      case login:
        return MaterialPageRoute(builder: (_) => const LoginScreen());
      case signUp:
        return MaterialPageRoute(builder: (_) => const SignUpScreen());
      case otpVerification:
        return MaterialPageRoute(builder: (_) => const OtpVerificationScreen());
      case emailVerification:
        return MaterialPageRoute(builder: (_) => const EmailVerificationScreen());
      case forgotPassword:
        return MaterialPageRoute(builder: (_) => const ForgotPasswordScreen());
      case createNewPassword:
        return MaterialPageRoute(builder: (_) => const CreateNewPasswordScreen());
      case biometricSetup:
        return MaterialPageRoute(builder: (_) => const BiometricSetupScreen());
      case totpSetup:
        return MaterialPageRoute(builder: (_) => const TotpSetupScreen());
      case totpVerification:
        return MaterialPageRoute(builder: (_) => const TotpVerificationScreen());
      
      // QR Forms
      case websiteQrForm:
        return MaterialPageRoute(builder: (_) => const QrWebsiteFormScreen());
      case wifiQrForm:
        return MaterialPageRoute(builder: (_) => const QrWifiFormScreen());
      case vCardQrForm:
        return MaterialPageRoute(builder: (_) => const QrVCardFormScreen());
      case businessQrForm:
        return MaterialPageRoute(builder: (_) => const QrBusinessFormScreen());
      case menuQrForm:
        return MaterialPageRoute(builder: (_) => const QrMenuFormScreen());
      case socialMediaQrForm:
        return MaterialPageRoute(builder: (_) => const QrSocialFormScreen());
      case appStoreQrForm:
        return MaterialPageRoute(builder: (_) => const QrAppStoreFormScreen());
      case pdfQrForm:
        return MaterialPageRoute(builder: (_) => const QrPdfFormScreen());
      case imageQrForm:
        return MaterialPageRoute(builder: (_) => const QrImageGalleryFormScreen());
      case videoQrForm:
        return MaterialPageRoute(builder: (_) => const QrVideoFormScreen());
      case eventQrForm:
        return MaterialPageRoute(builder: (_) => const QrEventFormScreen());
      case bitcoinQrForm:
        return MaterialPageRoute(builder: (_) => const QrBitcoinFormScreen());
      case emailQrForm:
        return MaterialPageRoute(builder: (_) => const QrEmailFormScreen());
      case whatsappQrForm:
        return MaterialPageRoute(builder: (_) => const QrWhatsAppFormScreen());
      case couponQrForm:
        return MaterialPageRoute(builder: (_) => const QrCouponFormScreen());
      case mp3QrForm:
        return MaterialPageRoute(builder: (_) => const QrMp3FormScreen());
      case smsQrForm:
        return MaterialPageRoute(builder: (_) => const QrSmsFormScreen());
      case locationQrForm:
        return MaterialPageRoute(builder: (_) => const QrLocationFormScreen());
      case textQrForm:
        return MaterialPageRoute(builder: (_) => const QrTextFormScreen());
      case callQrForm:
        return MaterialPageRoute(builder: (_) => const QrCallFormScreen());
      case qrPreview:
        return MaterialPageRoute(builder: (_) => const QrPreviewScreen());
      case qrSuccess:
        return MaterialPageRoute(builder: (_) => const QrSuccessScreen());
      case qrHistory:
        return MaterialPageRoute(builder: (_) => const QrHistoryScreen());

      // System Cases
      case updateRequired:
        return MaterialPageRoute(builder: (_) => const UpdateRequiredScreen());
      case maintenance:
        return MaterialPageRoute(builder: (_) => const MaintenanceScreen());
      case offline:
        return MaterialPageRoute(builder: (_) => const OfflineScreen());
      case sessionExpired:
        return MaterialPageRoute(builder: (_) => const SessionExpiredScreen());
      case invoiceDashboard:
        return MaterialPageRoute(builder: (_) => const InvoiceDashboardScreen());
      case crmDashboard:
        return MaterialPageRoute(builder: (_) => const CrmDashboardScreen());
      case invoiceTypeSelection:
        return MaterialPageRoute(builder: (_) => const InvoiceTypeSelectionScreen());
      case createInvoice:
        // Supports: InvoiceType, InvoiceDetails (edit), Client (from CRM), or Map with 'type'/'invoice'/'client'
        final invoiceArgs = settings.arguments;
        InvoiceType resolvedType = InvoiceType.standard;
        InvoiceDetails? resolvedInvoice;
        Client? resolvedClient;

        if (invoiceArgs is InvoiceType) {
          resolvedType = invoiceArgs;
        } else if (invoiceArgs is InvoiceDetails) {
          resolvedType = invoiceArgs.invoiceType;
          resolvedInvoice = invoiceArgs;
        } else if (invoiceArgs is Client) {
          resolvedClient = invoiceArgs;
        } else if (invoiceArgs is Map<String, dynamic>) {
          resolvedType = invoiceArgs['type'] ?? InvoiceType.standard;
          resolvedInvoice = invoiceArgs['invoice'];
          resolvedClient = invoiceArgs['client'];
        }

        return MaterialPageRoute(
          builder: (_) => CreateInvoiceScreen(
            invoiceType: resolvedType,
            initialInvoice: resolvedInvoice,
            initialClient: resolvedClient,
          ),
        );
      case invoiceDetails:
        final id = settings.arguments;
        if (id is int) {
          return MaterialPageRoute(builder: (_) => InvoiceDetailsScreen(invoiceId: id));
        }
        return _errorRoute('Invalid Invoice ID');
      case invoicePreview:
        final args = settings.arguments;
        if (args is Map<String, dynamic>) {
          return MaterialPageRoute(builder: (_) => InvoicePreviewScreen(
            invoice: args['invoice'] as Invoice,
            initialTemplate: args['template'] as PdfTemplate?,
          ));
        }
        if (args is Invoice) {
          return MaterialPageRoute(builder: (_) => InvoicePreviewScreen(invoice: args));
        }
        return _errorRoute('Invalid Invoice Data');
      case clientSelection:
        return MaterialPageRoute(builder: (_) => const ClientSelectionScreen());
      case exportReports:
        return MaterialPageRoute(builder: (_) => const ExportReportsScreen());
      case taxDiscountSettings:
        return MaterialPageRoute(builder: (_) => const TaxDiscountSettingsScreen());
      case invoiceTemplateSelector:
        return MaterialPageRoute(builder: (_) => const InvoiceTemplateSelectorScreen());
      case invoiceModuleSettings:
        return MaterialPageRoute(builder: (_) => const InvoiceModuleSettingsScreen());
      case invoiceBranding:
        return MaterialPageRoute(builder: (_) => const InvoiceBrandingScreen());
      case businessProfileRequired:
        return MaterialPageRoute(builder: (_) => const BusinessProfileRequiredScreen());
      case expenseHistory:
        return MaterialPageRoute(builder: (_) => const ExpenseHistoryScreen());
      case addExpense:
        final args = settings.arguments as Map<String, dynamic>?;
        return MaterialPageRoute(builder: (_) => AddExpenseScreen(
          preLinkedInvoiceId: args?['preLinkedInvoiceId'],
          preLinkedInvoiceLabel: args?['preLinkedInvoiceLabel'],
        ));
      case productList:
        return MaterialPageRoute(builder: (_) => const ProductListScreen());
      case addProduct:
        return MaterialPageRoute(builder: (_) => const AddProductScreen());
      case invoiceHistory:
        return MaterialPageRoute(builder: (_) => const InvoiceHistoryScreen());
      case addInvoiceItem:
        return MaterialPageRoute(builder: (_) => const AddInvoiceItemScreen());
      // Removed addClient route to prevent redundancy
      // case addClient:
      //   return MaterialPageRoute(builder: (_) => const AddClientScreen());
      case clientDetails:
        final client = settings.arguments;
        if (client is Client) {
          return MaterialPageRoute(builder: (_) => ClientDetailsScreen(client: client));
        }
        return _errorRoute('Invalid Client Data');
      case qrCustomization:
        return MaterialPageRoute(builder: (_) => const QrCustomizationScreen());
      case qrExport:
        return MaterialPageRoute(builder: (_) => const QrExportScreen());
      case qrActivityMonitor:
        return MaterialPageRoute(builder: (_) => const QrActivityMonitorScreen());
      case qrFolders:
        return MaterialPageRoute(builder: (_) => const QrFoldersScreen());
      case qrIconManagement:
        return MaterialPageRoute(builder: (_) => const QrIconManagementScreen());
      
      // Profile & Settings
      case profileOverview:
        return MaterialPageRoute(builder: (_) => const ProfileOverviewScreen());
      case teamManagement:
        return MaterialPageRoute(builder: (_) => const TeamManagementScreen());
      case editProfile:
        return MaterialPageRoute(builder: (_) => const EditProfileScreen());
      case notificationSettings:
        return MaterialPageRoute(builder: (_) => const NotificationSettingsScreen());
      case appearanceSettings:
        return MaterialPageRoute(builder: (_) => const AppearanceSettingsScreen());
      case securitySettings:
        return MaterialPageRoute(builder: (_) => const SecuritySettingsScreen());
      case updatePassword:
        return MaterialPageRoute(builder: (_) => const UpdatePasswordScreen());
      case deleteAccount:
        return MaterialPageRoute(builder: (_) => const DeleteAccountScreen());
      case billingHistory:
        return MaterialPageRoute(builder: (_) => const BillingHistoryScreen());
      case recognizedDevices:
        return MaterialPageRoute(builder: (_) => const RecognizedDevicesScreen());
      case payoutSettings:
        return MaterialPageRoute(builder: (_) => const PayoutSettingsScreen());

      // Brand Kit & Assets
      case brandKit:
        return MaterialPageRoute(builder: (_) => const BrandKitScreen());
      case businessCardDesigner:
        return MaterialPageRoute(builder: (_) => const BusinessCardDesignerScreen());
      case assetGallery:
        return MaterialPageRoute(builder: (_) => const AssetGalleryScreen());

      // Wallet & Subscription
      case pricingPlans:
        return MaterialPageRoute(builder: (_) => const PricingPlansScreen());
      case paymentMethods:
        return MaterialPageRoute(builder: (_) => const PaymentMethodsScreen());
      case upgradeSuccess:
        return MaterialPageRoute(builder: (_) => const UpgradeSuccessScreen());
      case revenueAnalytics:
        return MaterialPageRoute(builder: (_) => const RevenueAnalyticsScreen());
      case advancedReports:
        return MaterialPageRoute(builder: (_) => const AdvancedReportsScreen());
      case financialIntelligence:
        return MaterialPageRoute(builder: (_) => const FinancialIntelligenceDashboard());
      case recurringInvoices:
        return MaterialPageRoute(builder: (_) => const RecurringInvoicesScreen());
      case createRecurringInvoice:
        return MaterialPageRoute(builder: (_) => const CreateRecurringInvoiceScreen());

      // Support & Legal
      case helpCenter:
        return MaterialPageRoute(builder: (_) => const HelpCenterScreen());
      case faq:
        return MaterialPageRoute(builder: (_) => const FaqScreen());
      case contactSupport:
        return MaterialPageRoute(builder: (_) => const ContactSupportScreen());
      case liveSupportChat:
        return MaterialPageRoute(builder: (_) => const LiveSupportChatScreen());
      case reportIssue:
        return MaterialPageRoute(builder: (_) => const ReportIssueScreen());
      case featureSuggestion:
        return MaterialPageRoute(builder: (_) => const FeatureSuggestionScreen());
      case privacyPolicy:
        return MaterialPageRoute(builder: (_) => const LegalScreen(title: 'Privacy Policy'));
      case termsOfService:
        return MaterialPageRoute(builder: (_) => const LegalScreen(title: 'Terms of Service'));
      case legal:
        // Accept optional title argument, default to 'Legal'
        final title = settings.arguments is String ? settings.arguments as String : 'Legal';
        return MaterialPageRoute(builder: (_) => LegalScreen(title: title));

      // Admin Portal
      case adminDashboard:
        return MaterialPageRoute(builder: (_) => const AdminDashboardScreen());
      case userManagement:
        return MaterialPageRoute(builder: (_) => const UserManagementScreen());
      case systemLogs:
        return MaterialPageRoute(builder: (_) => const SystemLogsScreen());
      case adminSecurityPortal:
        return MaterialPageRoute(builder: (_) => const SecurityPortalScreen());
      case auditLogs:
        return MaterialPageRoute(builder: (_) => const AuditLogsScreen());
      case contentModeration:
        return MaterialPageRoute(builder: (_) => const ContentModerationScreen());
      case businessReports:
        return MaterialPageRoute(builder: (_) => const BusinessReportsScreen());
      case adminNotifications:
        return MaterialPageRoute(builder: (_) => const AdminNotificationsScreen());

      // System & Edge Cases
      case offlineConnection:
        return MaterialPageRoute(builder: (_) => const OfflineConnectionScreen());
      case systemMaintenance:
        return MaterialPageRoute(builder: (_) => const SystemMaintenanceScreen());
      case appUpdateRequired:
        return MaterialPageRoute(builder: (_) => const AppUpdateRequiredScreen());

      // AI & Analytics
      case qrPerformance:
        return MaterialPageRoute(builder: (_) => const QrPerformanceScreen());
      case qrPerformanceInsights:
        return MaterialPageRoute(builder: (_) => const QrPerformanceInsightsScreen());
      case yearInReview:
        return MaterialPageRoute(builder: (_) => const YearInReviewScreen());

      // Milestones & Tours
      case qrMilestone:
        return MaterialPageRoute(builder: (_) => const QrMilestoneScreen());
      case quickTour:
        return MaterialPageRoute(builder: (_) => const QuickTourScreen());

      // Sharing & Previews
      case referral:
        return MaterialPageRoute(builder: (_) => const ReferralScreen());

      default:
        return MaterialPageRoute(
          builder: (_) => Scaffold(
            body: Center(
              child: Text('No route defined for ${settings.name}'),
            ),
          ),
        );
    }
  }

  static Route<dynamic> _errorRoute(String message) {
    return MaterialPageRoute(
      builder: (_) => Scaffold(
        appBar: AppBar(title: const Text('Error')),
        body: Center(child: Text(message)),
      ),
    );
  }
}
