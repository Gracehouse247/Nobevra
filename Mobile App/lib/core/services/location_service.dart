import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;

class LocationService {
  static const String defaultCurrency = 'USD';

  static const Map<String, String> countryCurrencyMap = {
    // Africa
    'NG': 'NGN', 'GH': 'GHS', 'ZA': 'ZAR', 'KE': 'KES', 'UG': 'UGX', 'TZ': 'TZS',
    'ET': 'ETB', 'RW': 'RWF', 'ZM': 'ZMW', 'MW': 'MWK', 'MZ': 'MZN', 'MG': 'MGA',
    'CM': 'XAF', 'SN': 'XOF', 'CI': 'XOF', 'BF': 'XOF', 'ML': 'XOF', 'NE': 'XOF',
    'TG': 'XOF', 'BJ': 'XOF', 'GA': 'XAF', 'CG': 'XAF', 'TD': 'XAF', 'CF': 'XAF',
    'GQ': 'XAF', 'BI': 'BIF', 'DJ': 'DJF', 'SO': 'SOS', 'SD': 'SDG', 'SS': 'SSP',
    'AO': 'AOA', 'CV': 'CVE', 'ST': 'STN', 'GM': 'GMD', 'GN': 'GNF', 'GW': 'XOF',
    'LR': 'LRD', 'SL': 'SLL', 'MR': 'MRU', 'EG': 'EGP', 'LY': 'LYD', 'TN': 'TND',
    'DZ': 'DZD', 'MA': 'MAD', 'MU': 'MUR', 'SC': 'SCR', 'NA': 'NAD', 'BW': 'BWP',
    'SZ': 'SZL', 'LS': 'LSL', 'ZW': 'ZWL', 'ER': 'ERN', 'KM': 'KMF', 'RE': 'EUR',
    'YT': 'EUR', 'EH': 'MAD',
    // Americas
    'US': 'USD', 'CA': 'CAD', 'MX': 'MXN', 'BR': 'BRL', 'AR': 'ARS', 'CL': 'CLP',
    'CO': 'COP', 'PE': 'PEN', 'VE': 'VES', 'UY': 'UYU', 'PY': 'PYG', 'BO': 'BOB',
    'EC': 'USD', 'GY': 'GYD', 'SR': 'SRD', 'GT': 'GTQ', 'BZ': 'BZD', 'HN': 'HNL',
    'SV': 'USD', 'NI': 'NIO', 'CR': 'CRC', 'PA': 'PAB', 'CU': 'CUP', 'JM': 'JMD',
    'HT': 'HTG', 'DO': 'DOP', 'TT': 'TTD', 'BB': 'BBD', 'LC': 'XCD', 'VC': 'XCD',
    'GD': 'XCD', 'AG': 'XCD', 'KN': 'XCD', 'DM': 'XCD', 'BS': 'BSD', 'TC': 'USD',
    'KY': 'KYD', 'AW': 'AWG', 'CW': 'ANG', 'PR': 'USD', 'GP': 'EUR', 'MQ': 'EUR',
    'GF': 'EUR', 'FK': 'FKP', 'GL': 'DKK', 'PM': 'EUR',
    // Europe
    'GB': 'GBP', 'DE': 'EUR', 'FR': 'EUR', 'IT': 'EUR', 'ES': 'EUR', 'PT': 'EUR',
    'NL': 'EUR', 'BE': 'EUR', 'AT': 'EUR', 'CH': 'CHF', 'SE': 'SEK', 'NO': 'NOK',
    'DK': 'DKK', 'FI': 'EUR', 'IE': 'EUR', 'GR': 'EUR', 'PL': 'PLN', 'CZ': 'CZK',
    'HU': 'HUF', 'RO': 'RON', 'BG': 'BGN', 'HR': 'EUR', 'SK': 'EUR', 'SI': 'EUR',
    'EE': 'EUR', 'LV': 'EUR', 'LT': 'EUR', 'LU': 'EUR', 'MT': 'EUR', 'CY': 'EUR',
    'RU': 'RUB', 'UA': 'UAH', 'BY': 'BYN', 'MD': 'MDL', 'RS': 'RSD', 'BA': 'BAM',
    'AL': 'ALL', 'MK': 'MKD', 'ME': 'EUR', 'XK': 'EUR', 'TR': 'TRY', 'IS': 'ISK',
    'LI': 'CHF', 'MC': 'EUR', 'SM': 'EUR', 'VA': 'EUR', 'AD': 'EUR', 'GI': 'GIP',
    'GG': 'GBP', 'JE': 'GBP', 'IM': 'GBP',
    // Asia
    'CN': 'CNY', 'JP': 'JPY', 'IN': 'INR', 'KR': 'KRW', 'ID': 'IDR', 'MY': 'MYR',
    'TH': 'THB', 'VN': 'VND', 'PH': 'PHP', 'SG': 'SGD', 'HK': 'HKD', 'TW': 'TWD',
    'PK': 'PKR', 'BD': 'BDT', 'LK': 'LKR', 'NP': 'NPR', 'MM': 'MMK', 'KH': 'KHR',
    'LA': 'LAK', 'MN': 'MNT', 'KZ': 'KZT', 'UZ': 'UZS', 'TM': 'TMT', 'KG': 'KGS',
    'TJ': 'TJS', 'AZ': 'AZN', 'AM': 'AMD', 'GE': 'GEL', 'AF': 'AFN', 'IR': 'IRR',
    'IQ': 'IQD', 'SY': 'SYP', 'LB': 'LBP', 'JO': 'JOD', 'IL': 'ILS', 'PS': 'ILS',
    'SA': 'SAR', 'AE': 'AED', 'KW': 'KWD', 'BH': 'BHD', 'QA': 'QAR', 'OM': 'OMR',
    'YE': 'YER', 'MV': 'MVR', 'BT': 'BTN', 'TL': 'USD', 'BN': 'BND',
    // Oceania
    'AU': 'AUD', 'NZ': 'NZD', 'FJ': 'FJD', 'PG': 'PGK', 'SB': 'SBD', 'VU': 'VUV',
    'WS': 'WST', 'TO': 'TOP', 'KI': 'AUD', 'TV': 'AUD', 'NR': 'AUD', 'PW': 'USD',
    'FM': 'USD', 'MH': 'USD', 'PF': 'XPF', 'NC': 'XPF', 'GU': 'USD', 'AS': 'USD',
    'CK': 'NZD', 'NU': 'NZD', 'TK': 'NZD',
  };

  /// Attempts to detect user's country code via IP geolocation
  static Future<String?> detectUserCountryCode() async {
    try {
      // Use ip-api.com (free, no key required for low volume)
      final response = await http.get(Uri.parse('https://ip-api.com/json')).timeout(const Duration(seconds: 5));
      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        final countryCode = data['countryCode'] as String?;
        if (countryCode != null && countryCurrencyMap.containsKey(countryCode.toUpperCase())) {
          return countryCode.toUpperCase();
        }
      }
    } catch (e) {
      debugPrint('[LocationService] Auto-detection failed: $e');
    }
    return null;
  }

  static String getCurrencyForCountryCode(String? countryCode) {
    if (countryCode == null) return defaultCurrency;
    return countryCurrencyMap[countryCode.toUpperCase()] ?? defaultCurrency;
  }

  static bool isCrossBorder(String? userCountryCode, String? clientCountryCode) {
    if (userCountryCode == null || clientCountryCode == null) return false;
    return userCountryCode.toUpperCase() != clientCountryCode.toUpperCase();
  }

  static String suggestCurrency(String? userCountryCode, String? clientCountryCode, String userDefaultCurrency) {
    if (!isCrossBorder(userCountryCode, clientCountryCode)) {
      return userDefaultCurrency;
    }
    return getCurrencyForCountryCode(clientCountryCode);
  }
}
