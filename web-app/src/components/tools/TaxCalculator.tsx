'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Calculator, Globe, ArrowRight, CheckCircle2, 
  Info, Sparkles, RefreshCw, ShieldCheck, DollarSign
} from 'lucide-react';

interface TaxJurisdiction {
  id: string;
  name: string;
  flag: string;
  currency: string;
  symbol: string;
  rates: { label: string; rate: number; default?: boolean; isWht?: boolean }[];
  supportsReverseCharge?: boolean;
  complianceNote: string;
}

const TAX_JURISDICTIONS: TaxJurisdiction[] = [
  {
    id: 'uk',
    name: 'United Kingdom (HMRC VAT)',
    flag: '🇬🇧',
    currency: 'GBP',
    symbol: '£',
    rates: [
      { label: 'Standard Rate (20%)', rate: 20, default: true },
      { label: 'Reduced Rate (5%)', rate: 5 },
      { label: 'Zero-Rated / Exempt (0%)', rate: 0 },
    ],
    supportsReverseCharge: true,
    complianceNote: 'Mandatory on UK taxable turnover above £90,000 threshold. Invoices must state VAT registration number and net/gross split.',
  },
  {
    id: 'us',
    name: 'United States (State Sales Tax)',
    flag: '🇺🇸',
    currency: 'USD',
    symbol: '$',
    rates: [
      { label: 'Average Combined Rate (7.25%)', rate: 7.25, default: true },
      { label: 'California (7.25% - 10.25%)', rate: 8.5 },
      { label: 'New York (8.875%)', rate: 8.875 },
      { label: 'Texas (8.25%)', rate: 8.25 },
      { label: 'Zero Tax / Out of State (0%)', rate: 0 },
    ],
    supportsReverseCharge: false,
    complianceNote: 'Sales tax varies by state, county, and economic nexus. B2B software services may be taxable or exempt depending on jurisdiction.',
  },
  {
    id: 'eu',
    name: 'European Union (EU VAT & Cross-Border)',
    flag: '🇪🇺',
    currency: 'EUR',
    symbol: '€',
    rates: [
      { label: 'Germany (19%)', rate: 19, default: true },
      { label: 'France (20%)', rate: 20 },
      { label: 'Ireland (23%)', rate: 23 },
      { label: 'Spain (21%)', rate: 21 },
      { label: 'Netherlands (21%)', rate: 21 },
      { label: 'Zero Rate / Reverse Charge (0%)', rate: 0 },
    ],
    supportsReverseCharge: true,
    complianceNote: 'For B2B sales within the EU, valid customer VAT numbers allow 0% Reverse Charge. The invoice must state "Reverse charge: Customer to account for VAT".',
  },
  {
    id: 'canada',
    name: 'Canada (CRA GST / HST / PST)',
    flag: '🇨🇦',
    currency: 'CAD',
    symbol: 'CA$',
    rates: [
      { label: 'Ontario (13% HST)', rate: 13, default: true },
      { label: 'GST Only - Alberta/BC/QC (5%)', rate: 5 },
      { label: 'Atlantic Provinces (15% HST)', rate: 15 },
      { label: 'Zero-Rated / Export (0%)', rate: 0 },
    ],
    supportsReverseCharge: false,
    complianceNote: 'Required once global taxable supplies exceed CAD $30,000 in any single calendar quarter or 4 consecutive quarters.',
  },
  {
    id: 'australia',
    name: 'Australia (ATO GST)',
    flag: '🇦🇺',
    currency: 'AUD',
    symbol: 'A$',
    rates: [
      { label: 'Standard GST (10%)', rate: 10, default: true },
      { label: 'GST-Free Supplies (0%)', rate: 0 },
    ],
    supportsReverseCharge: false,
    complianceNote: 'Tax invoices above AUD $1,000 must show the buyer\'s identity/ABN. Registration threshold is AUD $75,000 gross annual turnover.',
  },
  {
    id: 'nigeria',
    name: 'Nigeria (FIRS VAT & WHT)',
    flag: '🇳🇬',
    currency: 'NGN',
    symbol: '₦',
    rates: [
      { label: 'Standard VAT (7.5%)', rate: 7.5, default: true },
      { label: 'VAT (7.5%) + 5% WHT Deduction', rate: 7.5, isWht: true },
      { label: 'VAT (7.5%) + 10% WHT Deduction', rate: 7.5, isWht: true },
      { label: 'Exempt / Zero-Rated (0%)', rate: 0 },
    ],
    supportsReverseCharge: false,
    complianceNote: 'Section 4 of the Value Added Tax Act mandates 7.5% VAT on all non-exempt goods and services. Withholding Tax (5%-10%) is deducted at source by corporate clients.',
  },
  {
    id: 'uae',
    name: 'United Arab Emirates & KSA (FTA / ZATCA)',
    flag: '🇦🇪',
    currency: 'AED',
    symbol: 'AED ',
    rates: [
      { label: 'UAE Standard VAT (5%)', rate: 5, default: true },
      { label: 'Saudi Arabia Standard VAT (15%)', rate: 15 },
      { label: 'Zero-Rated Export (0%)', rate: 0 },
    ],
    supportsReverseCharge: true,
    complianceNote: 'Mandatory e-invoicing and TRN inclusion. Invoices must include seller TRN, buyer TRN (if registered), and sequential numbering.',
  },
  {
    id: 'south-africa',
    name: 'South Africa (SARS VAT)',
    flag: '🇿🇦',
    currency: 'ZAR',
    symbol: 'R ',
    rates: [
      { label: 'Standard Rate (15%)', rate: 15, default: true },
      { label: 'Zero-Rated (0%)', rate: 0 },
    ],
    supportsReverseCharge: false,
    complianceNote: 'Compulsory VAT registration if taxable supplies exceed R1 million in any 12-month period.',
  },
];

export default function TaxCalculator() {
  const [selectedCountryId, setSelectedCountryId] = useState('uk');
  const [amountInput, setAmountInput] = useState<number>(1000);
  const [taxMode, setTaxMode] = useState<'exclusive' | 'inclusive'>('exclusive');
  const [selectedRateIndex, setSelectedRateIndex] = useState(0);
  const [isReverseCharge, setIsReverseCharge] = useState(false);
  const [whtRate, setWhtRate] = useState<number>(0);

  const country = useMemo(
    () => TAX_JURISDICTIONS.find((c) => c.id === selectedCountryId) || TAX_JURISDICTIONS[0],
    [selectedCountryId]
  );

  const selectedRateObj = country.rates[selectedRateIndex] || country.rates[0];
  const effectiveRate = isReverseCharge ? 0 : selectedRateObj.rate;

  // Perform accurate calculations
  const calculation = useMemo(() => {
    const amount = Number(amountInput) || 0;

    let net = 0;
    let tax = 0;
    let gross = 0;

    if (taxMode === 'exclusive') {
      net = amount;
      tax = (net * effectiveRate) / 100;
      gross = net + tax;
    } else {
      gross = amount;
      net = gross / (1 + effectiveRate / 100);
      tax = gross - net;
    }

    const whtDeduction = (net * whtRate) / 100;
    const finalReceivable = gross - whtDeduction;

    return {
      net: Number(net.toFixed(2)),
      tax: Number(tax.toFixed(2)),
      gross: Number(gross.toFixed(2)),
      whtDeduction: Number(whtDeduction.toFixed(2)),
      finalReceivable: Number(finalReceivable.toFixed(2)),
    };
  }, [amountInput, effectiveRate, taxMode, whtRate]);

  const handleCountryChange = (id: string) => {
    setSelectedCountryId(id);
    setSelectedRateIndex(0);
    setIsReverseCharge(false);
    setWhtRate(0);
  };

  return (
    <div className="bg-noble-surface rounded-[40px] p-6 sm:p-10 md:p-14 border border-slate-200/80 shadow-xl max-w-5xl mx-auto relative overflow-hidden font-inter">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-noble-blue/10 text-noble-blue font-bold text-xs uppercase tracking-widest mb-3">
            <Calculator className="w-3.5 h-3.5" />
            Global Tax & Invoicing Engine
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-near-black tracking-tight">
            International VAT, GST & Sales Tax Calculator
          </h2>
          <p className="text-near-black/60 text-sm mt-1">
            Compute exact tax allocations, reverse charges, and withholding taxes across 8 major international jurisdictions.
          </p>
        </div>

        {/* Currency & Mode Badge */}
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 p-1.5 rounded-2xl self-start md:self-auto">
          <button
            type="button"
            onClick={() => setTaxMode('exclusive')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
              taxMode === 'exclusive'
                ? 'bg-[#166FBB] text-white shadow-md shadow-blue-500/20'
                : 'text-near-black/60 hover:text-near-black'
            }`}
          >
            Tax Exclusive (Add)
          </button>
          <button
            type="button"
            onClick={() => setTaxMode('inclusive')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
              taxMode === 'inclusive'
                ? 'bg-[#166FBB] text-white shadow-md shadow-blue-500/20'
                : 'text-near-black/60 hover:text-near-black'
            }`}
          >
            Tax Inclusive (Extract)
          </button>
        </div>
      </div>

      {/* Main Calculator Grid */}
      <div className="grid lg:grid-cols-12 gap-8 pt-8">
        {/* Left Inputs (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Country Selector */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-near-black/60 mb-2">
              Select Tax Jurisdiction
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {TAX_JURISDICTIONS.map((j) => (
                <button
                  key={j.id}
                  type="button"
                  onClick={() => handleCountryChange(j.id)}
                  className={`p-3 rounded-2xl border text-left flex flex-col gap-1 transition-all ${
                    selectedCountryId === j.id
                      ? 'border-noble-blue bg-noble-blue/5 shadow-xs ring-2 ring-noble-blue/20'
                      : 'border-slate-200/80 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg">{j.flag}</span>
                    <span className="text-[10px] font-black uppercase text-near-black/40">{j.currency}</span>
                  </div>
                  <span className="text-xs font-bold text-near-black line-clamp-1">
                    {j.name.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Amount Input */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-near-black/60 mb-2">
              {taxMode === 'exclusive' ? 'Net Amount (Before Tax)' : 'Gross Amount (Total with Tax)'}
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-near-black/40">
                {country.symbol}
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={amountInput || ''}
                onChange={(e) => setAmountInput(parseFloat(e.target.value) || 0)}
                placeholder="1000.00"
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-xl font-black text-near-black focus:outline-none focus:ring-2 focus:ring-noble-blue/30 focus:border-noble-blue transition-all"
              />
            </div>
          </div>

          {/* 3. Rate Selector */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-near-black/60 mb-2">
              Applicable Tax Rate
            </label>
            <div className="space-y-2">
              {country.rates.map((rate, idx) => (
                <label
                  key={rate.label}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    selectedRateIndex === idx && !isReverseCharge
                      ? 'border-noble-blue bg-noble-blue/5'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="taxRate"
                      checked={selectedRateIndex === idx && !isReverseCharge}
                      onChange={() => {
                        setSelectedRateIndex(idx);
                        setIsReverseCharge(false);
                      }}
                      className="accent-noble-blue w-4 h-4"
                    />
                    <span className="text-sm font-bold text-near-black">{rate.label}</span>
                  </div>
                  <span className="text-xs font-black text-noble-blue">{rate.rate}%</span>
                </label>
              ))}

              {country.supportsReverseCharge && (
                <label
                  className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    isReverseCharge
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={isReverseCharge}
                      onChange={(e) => setIsReverseCharge(e.target.checked)}
                      className="accent-emerald-600 w-4 h-4 rounded"
                    />
                    <div>
                      <span className="text-sm font-bold text-emerald-900 block">
                        B2B Cross-Border Reverse Charge (0%)
                      </span>
                      <span className="text-[11px] text-emerald-700">
                        Customer accounts for VAT in their local country.
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-black text-emerald-600">0% VAT</span>
                </label>
              )}
            </div>
          </div>

          {/* Withholding Tax Toggle for Nigeria */}
          {country.id === 'nigeria' && (
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-near-black/60 mb-2">
                Withholding Tax (WHT) Deduction at Source
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'No WHT (0%)', val: 0 },
                  { label: '5% WHT (Services)', val: 5 },
                  { label: '10% WHT (Agency/Prof)', val: 10 },
                ].map((w) => (
                  <button
                    key={w.label}
                    type="button"
                    onClick={() => setWhtRate(w.val)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      whtRate === w.val
                        ? 'border-amber-500 bg-amber-50 text-amber-900 font-black'
                        : 'border-slate-200 bg-white text-near-black/70'
                    }`}
                  >
                    {w.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Output Summary Card (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="bg-gradient-to-br from-[#060D1A] to-[#0D1F38] text-white p-6 sm:p-8 rounded-3xl shadow-xl flex-1 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-noble-blue/20 blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                  Calculation Breakdown
                </span>
                <span className="text-xs font-bold text-noble-blue bg-noble-blue/20 px-2.5 py-1 rounded-full">
                  {isReverseCharge ? 'Reverse Charge 0%' : `${effectiveRate}% Tax`}
                </span>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex justify-between items-center text-sm border-b border-white/10 pb-3">
                  <span className="text-slate-300">Net Amount:</span>
                  <span className="font-bold text-lg text-white">
                    {country.symbol}
                    {calculation.net.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm border-b border-white/10 pb-3">
                  <span className="text-slate-300">
                    Tax Amount ({effectiveRate}%):
                  </span>
                  <span className="font-bold text-lg text-noble-blue">
                    {country.symbol}
                    {calculation.tax.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                {whtRate > 0 && (
                  <div className="flex justify-between items-center text-sm border-b border-white/10 pb-3 text-amber-300">
                    <span>Less WHT Withheld ({whtRate}%):</span>
                    <span className="font-bold text-lg">
                      -{country.symbol}
                      {calculation.whtDeduction.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                )}

                <div className="pt-2 flex justify-between items-end">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-black text-slate-400 block">
                      Total Invoice Amount
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      {country.symbol}
                      {calculation.gross.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  {whtRate > 0 && (
                    <div className="text-right">
                      <span className="text-[10px] uppercase tracking-widest font-black text-emerald-400 block">
                        Net Cash Received
                      </span>
                      <span className="text-xl font-black text-emerald-400">
                        {country.symbol}
                        {calculation.finalReceivable.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Compliance Note */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-xs text-slate-300 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-noble-blue shrink-0 mt-0.5" />
                <p className="leading-relaxed">{country.complianceNote}</p>
              </div>
            </div>

            {/* Direct PLG Action Link */}
            <div className="pt-6 relative z-10">
              <Link
                href={`/free-invoice-generator?taxRate=${effectiveRate}&currency=${country.currency}`}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#01A0E2] hover:bg-[#166FBB] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25 transition-all hover:gap-3 group"
              >
                Create Invoice with this Tax
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
