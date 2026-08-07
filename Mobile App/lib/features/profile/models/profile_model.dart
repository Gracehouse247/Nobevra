// lib/features/profile/models/profile_model.dart

class UserProfile {
  final String id;
  final String? displayName;
  final String email;
  final String? avatarPath;
  final String? phone;
  final String preferredCurrency;
  final String themeMode; // 'light', 'dark', 'system'
  final String locale;
  final String? industry;
  final String? country;
  final bool onboardingCompleted;
  final Map<String, dynamic>? metadata;

  // Business / Brand Identity Fields (Solo)
  final String? businessName;
  final String? company;
  final String? businessAddress;
  final String? businessEmail;
  final String? businessPhone;
  final String? taxNumber;
  final String? brandLogoUrl;
  final String  brandColor;
  final String? invoiceFooter;
  final String? bankName;
  final String? accountName;
  final String? accountNumber;
  final String? brandSignatureUrl;
  final String? defaultInvoiceTemplate;

  UserProfile({
    required this.id,
    this.displayName,
    required this.email,
    this.avatarPath,
    this.phone,
    this.preferredCurrency = 'USD',
    this.themeMode = 'system',
    this.locale = 'en',
    this.businessName,
    this.company,
    this.businessAddress,
    this.businessEmail,
    this.businessPhone,
    this.taxNumber,
    this.brandLogoUrl,
    this.brandColor = '#2563EB',
    this.invoiceFooter,
    this.bankName,
    this.accountName,
    this.accountNumber,
    this.brandSignatureUrl,
    this.defaultInvoiceTemplate,
    this.industry,
    this.country,
    this.onboardingCompleted = false,
    this.metadata,
  });

  String get initials {
    if (displayName == null || displayName!.isEmpty) return email[0].toUpperCase();
    final parts = displayName!.split(' ');
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  }

  factory UserProfile.fromJson(Map<String, dynamic> json) {
    return UserProfile(
      id:                json['id']?.toString() ?? '',
      displayName:       json['display_name'] ?? json['name'],
      email:             json['email'] ?? '',
      avatarPath:        json['avatar_url'] ?? json['avatar_path'],
      phone:             json['phone'],
      preferredCurrency: json['preferred_currency'] ?? 'USD',
      themeMode:         json['theme_mode'] ?? 'system',
      locale:            json['locale'] ?? 'en',
      businessName:      json['business_name'],
      company:           json['company'],
      businessAddress:   json['business_address'],
      businessEmail:     json['business_email'],
      businessPhone:     json['business_phone'],
      taxNumber:         json['tax_number'],
      brandLogoUrl:      json['brand_logo_url'],
      brandColor:        json['brand_color'] ?? '#2563EB',
      invoiceFooter:     json['invoice_footer'],
      bankName:          json['bank_name'],
      accountName:       json['account_name'],
      accountNumber:     json['account_number'],
      brandSignatureUrl: json['brand_signature_url'] as String?,
      defaultInvoiceTemplate: json['default_invoice_template'],
      industry:          json['industry'],
      country:           json['country'],
      onboardingCompleted: json['onboarding_completed'] ?? false,
      metadata:          json['metadata'] != null ? Map<String, dynamic>.from(json['metadata']) : null,
    );
  }

  Map<String, dynamic> toJson() => {
    'display_name':       displayName,
    'email':              email,
    'avatar_url':         avatarPath,
    'phone':              phone,
    'preferred_currency': preferredCurrency,
    'theme_mode':         themeMode,
    'locale':              locale,
    'business_name':      businessName,
    'company':           company,
    'business_address':   businessAddress,
    'business_email':     businessEmail,
    'business_phone':     businessPhone,
    'tax_number':         taxNumber,
    'brand_logo_url':      brandLogoUrl,
    'brand_color':        brandColor,
    'invoice_footer':     invoiceFooter,
    'bank_name':          bankName,
    'account_name':       accountName,
    'account_number':     accountNumber,
    'brand_signature_url': brandSignatureUrl,
    'default_invoice_template': defaultInvoiceTemplate,
    'industry':           industry,
    'country':            country,
    'onboarding_completed': onboardingCompleted,
    'metadata':           metadata,
  };

  UserProfile copyWith({
    String? displayName,
    String? email,
    String? avatarPath,
    String? phone,
    String? preferredCurrency,
    String? themeMode,
    String? locale,
    String? businessName,
    String? company,
    String? businessAddress,
    String? businessEmail,
    String? businessPhone,
    String? taxNumber,
    String? brandLogoUrl,
    String? brandColor,
    String? invoiceFooter,
    String? bankName,
    String? accountName,
    String? accountNumber,
    String? brandSignatureUrl,
    String? defaultInvoiceTemplate,
    String? industry,
    String? country,
    bool? onboardingCompleted,
    Map<String, dynamic>? metadata,
  }) {
    return UserProfile(
      id:                id,
      displayName:       displayName ?? this.displayName,
      email:             email ?? this.email,
      avatarPath:        avatarPath ?? this.avatarPath,
      phone:             phone ?? this.phone,
      preferredCurrency: preferredCurrency ?? this.preferredCurrency,
      themeMode:         themeMode ?? this.themeMode,
      locale:            locale ?? this.locale,
      businessName:      businessName ?? this.businessName,
      company:           company ?? this.company,
      businessAddress:   businessAddress ?? this.businessAddress,
      businessEmail:     businessEmail ?? this.businessEmail,
      businessPhone:     businessPhone ?? this.businessPhone,
      taxNumber:         taxNumber ?? this.taxNumber,
      brandLogoUrl:      brandLogoUrl ?? this.brandLogoUrl,
      brandColor:        brandColor ?? this.brandColor,
      invoiceFooter:     invoiceFooter ?? this.invoiceFooter,
      bankName:          bankName ?? this.bankName,
      accountName:       accountName ?? this.accountName,
      accountNumber:     accountNumber ?? this.accountNumber,
      brandSignatureUrl: brandSignatureUrl ?? this.brandSignatureUrl,
      defaultInvoiceTemplate: defaultInvoiceTemplate ?? this.defaultInvoiceTemplate,
      industry:          industry ?? this.industry,
      country:           country ?? this.country,
      onboardingCompleted: onboardingCompleted ?? this.onboardingCompleted,
      metadata:          metadata ?? this.metadata,
    );
  }
}
