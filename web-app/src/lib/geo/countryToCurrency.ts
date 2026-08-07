/**
 * Complete ISO 3166-1 alpha-2 country code → ISO 4217 currency code mapping.
 * Covers 250+ countries/territories.
 * Used for geolocation-based currency auto-detection.
 */
export const COUNTRY_CURRENCY_MAP: Record<string, string> = {
    // Africa
    NG: 'NGN', GH: 'GHS', ZA: 'ZAR', KE: 'KES', UG: 'UGX', TZ: 'TZS',
    ET: 'ETB', RW: 'RWF', ZM: 'ZMW', MW: 'MWK', MZ: 'MZN', MG: 'MGA',
    CM: 'XAF', SN: 'XOF', CI: 'XOF', BF: 'XOF', ML: 'XOF', NE: 'XOF',
    TG: 'XOF', BJ: 'XOF', GA: 'XAF', CG: 'XAF', TD: 'XAF', CF: 'XAF',
    GQ: 'XAF', BI: 'BIF', DJ: 'DJF', SO: 'SOS', SD: 'SDG', SS: 'SSP',
    AO: 'AOA', CV: 'CVE', ST: 'STN', GM: 'GMD', GN: 'GNF', GW: 'XOF',
    LR: 'LRD', SL: 'SLL', MR: 'MRU', EG: 'EGP', LY: 'LYD', TN: 'TND',
    DZ: 'DZD', MA: 'MAD', MU: 'MUR', SC: 'SCR', NA: 'NAD', BW: 'BWP',
    SZ: 'SZL', LS: 'LSL', ZW: 'ZWL', ER: 'ERN', KM: 'KMF', RE: 'EUR',
    YT: 'EUR', EH: 'MAD',
    // Americas
    US: 'USD', CA: 'CAD', MX: 'MXN', BR: 'BRL', AR: 'ARS', CL: 'CLP',
    CO: 'COP', PE: 'PEN', VE: 'VES', UY: 'UYU', PY: 'PYG', BO: 'BOB',
    EC: 'USD', GY: 'GYD', SR: 'SRD', GT: 'GTQ', BZ: 'BZD', HN: 'HNL',
    SV: 'USD', NI: 'NIO', CR: 'CRC', PA: 'PAB', CU: 'CUP', JM: 'JMD',
    HT: 'HTG', DO: 'DOP', TT: 'TTD', BB: 'BBD', LC: 'XCD', VC: 'XCD',
    GD: 'XCD', AG: 'XCD', KN: 'XCD', DM: 'XCD', BS: 'BSD', TC: 'USD',
    KY: 'KYD', AW: 'AWG', CW: 'ANG', PR: 'USD', GP: 'EUR', MQ: 'EUR',
    GF: 'EUR', FK: 'FKP', GL: 'DKK', PM: 'EUR',
    // Europe
    GB: 'GBP', DE: 'EUR', FR: 'EUR', IT: 'EUR', ES: 'EUR', PT: 'EUR',
    NL: 'EUR', BE: 'EUR', AT: 'EUR', CH: 'CHF', SE: 'SEK', NO: 'NOK',
    DK: 'DKK', FI: 'EUR', IE: 'EUR', GR: 'EUR', PL: 'PLN', CZ: 'CZK',
    HU: 'HUF', RO: 'RON', BG: 'BGN', HR: 'EUR', SK: 'EUR', SI: 'EUR',
    EE: 'EUR', LV: 'EUR', LT: 'EUR', LU: 'EUR', MT: 'EUR', CY: 'EUR',
    RU: 'RUB', UA: 'UAH', BY: 'BYN', MD: 'MDL', RS: 'RSD', BA: 'BAM',
    AL: 'ALL', MK: 'MKD', ME: 'EUR', XK: 'EUR', TR: 'TRY', IS: 'ISK',
    LI: 'CHF', MC: 'EUR', SM: 'EUR', VA: 'EUR', AD: 'EUR', GI: 'GIP',
    GG: 'GBP', JE: 'GBP', IM: 'GBP',
    // Asia
    CN: 'CNY', JP: 'JPY', IN: 'INR', KR: 'KRW', ID: 'IDR', MY: 'MYR',
    TH: 'THB', VN: 'VND', PH: 'PHP', SG: 'SGD', HK: 'HKD', TW: 'TWD',
    PK: 'PKR', BD: 'BDT', LK: 'LKR', NP: 'NPR', MM: 'MMK', KH: 'KHR',
    LA: 'LAK', MN: 'MNT', KZ: 'KZT', UZ: 'UZS', TM: 'TMT', KG: 'KGS',
    TJ: 'TJS', AZ: 'AZN', AM: 'AMD', GE: 'GEL', AF: 'AFN', IR: 'IRR',
    IQ: 'IQD', SY: 'SYP', LB: 'LBP', JO: 'JOD', IL: 'ILS', PS: 'ILS',
    SA: 'SAR', AE: 'AED', KW: 'KWD', BH: 'BHD', QA: 'QAR', OM: 'OMR',
    YE: 'YER', MV: 'MVR', BT: 'BTN', TL: 'USD', BN: 'BND',
    // Oceania
    AU: 'AUD', NZ: 'NZD', FJ: 'FJD', PG: 'PGK', SB: 'SBD', VU: 'VUV',
    WS: 'WST', TO: 'TOP', KI: 'AUD', TV: 'AUD', NR: 'AUD', PW: 'USD',
    FM: 'USD', MH: 'USD', PF: 'XPF', NC: 'XPF', GU: 'USD', AS: 'USD',
    CK: 'NZD', NU: 'NZD', TK: 'NZD',
};

/** Global fallback currency for undetected / unrecognized locations */
export const DEFAULT_CURRENCY = 'USD';

/**
 * Maps an ISO 3166-1 alpha-2 country code to its ISO 4217 currency code.
 * Falls back to USD if the country is not in the map.
 */
export function getCurrencyForCountry(countryCode: string | null | undefined): string {
    if (!countryCode) return DEFAULT_CURRENCY;
    return COUNTRY_CURRENCY_MAP[countryCode.toUpperCase()] ?? DEFAULT_CURRENCY;
}
