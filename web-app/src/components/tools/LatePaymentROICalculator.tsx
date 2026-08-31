'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  BarChart3, Clock, DollarSign, ArrowRight, 
  Sparkles, CheckCircle2, ShieldAlert, Zap, AlertTriangle
} from 'lucide-react';

export default function LatePaymentROICalculator() {
  const [currencySymbol, setCurrencySymbol] = useState('$');
  const [monthlyInvoiced, setMonthlyInvoiced] = useState<number>(35000);
  const [currentDSO, setCurrentDSO] = useState<number>(54); // Days Sales Outstanding
  const [latePaymentRate, setLatePaymentRate] = useState<number>(40); // % of invoices late
  const [chasingHoursPerWeek, setChasingHoursPerWeek] = useState<number>(4);
  const [capitalInterestRate, setCapitalInterestRate] = useState<number>(9); // % annual cost of credit

  const analytics = useMemo(() => {
    const annualRevenue = (Number(monthlyInvoiced) || 0) * 12;
    const dsoDays = Number(currentDSO) || 30;
    
    // 1. Average Trapped Working Capital = (Annual Revenue / 365) * DSO
    const trappedCapital = (annualRevenue / 365) * dsoDays;

    // 2. Annual Financial Interest Drag
    const annualInterestCost = (trappedCapital * (Number(capitalInterestRate) || 0)) / 100;

    // 3. Labor Cost of Chasing Invoices ($50/hr benchmark)
    const laborCostPerYear = (Number(chasingHoursPerWeek) || 0) * 52 * 50;

    // 4. Total Financial Drain
    const totalAnnualDrain = annualInterestCost + laborCostPerYear;

    // 5. Projected Nobevra Improvement (Reduces DSO by an average of 18 days)
    const projectedDSO = Math.max(12, Math.round(dsoDays * 0.45));
    const projectedTrappedCapital = (annualRevenue / 365) * projectedDSO;
    const unlockedWorkingCapital = trappedCapital - projectedTrappedCapital;
    const projectedAnnualSavings = Math.round(
      (unlockedWorkingCapital * (Number(capitalInterestRate) || 0)) / 100 + (laborCostPerYear * 0.85)
    );

    return {
      trappedCapital: Math.round(trappedCapital),
      annualInterestCost: Math.round(annualInterestCost),
      laborCostPerYear: Math.round(laborCostPerYear),
      totalAnnualDrain: Math.round(totalAnnualDrain),
      projectedDSO,
      unlockedWorkingCapital: Math.round(unlockedWorkingCapital),
      projectedAnnualSavings,
    };
  }, [monthlyInvoiced, currentDSO, chasingHoursPerWeek, capitalInterestRate]);

  return (
    <div className="bg-noble-surface rounded-[40px] p-6 sm:p-10 md:p-14 border border-slate-200/80 shadow-xl max-w-5xl mx-auto relative overflow-hidden font-inter">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-700 font-bold text-xs uppercase tracking-widest mb-3">
            <BarChart3 className="w-3.5 h-3.5" />
            Working Capital & DSO Optimizer
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-near-black tracking-tight">
            Late Payment & DSO Cost Calculator
          </h2>
          <p className="text-near-black/60 text-sm mt-1">
            Calculate the exact hidden drain of overdue client invoices and projected cash acceleration with Nobevra.
          </p>
        </div>

        {/* Currency Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 p-1.5 rounded-2xl self-start md:self-auto">
          {['$', '£', '€', '₦', 'A$', 'CA$'].map((sym) => (
            <button
              key={sym}
              type="button"
              onClick={() => setCurrencySymbol(sym)}
              className={`w-9 h-9 rounded-xl text-xs font-black transition-all ${
                currencySymbol === sym
                  ? 'bg-[#166FBB] text-white shadow-md shadow-blue-500/20'
                  : 'text-near-black/60 hover:text-near-black'
              }`}
            >
              {sym}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid lg:grid-cols-12 gap-8 pt-8">
        {/* Left Inputs (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Monthly Invoicing Volume */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-black uppercase tracking-wider text-near-black/70">
                Monthly Invoiced Revenue
              </label>
              <span className="text-base font-black text-near-black">
                {currencySymbol}
                {monthlyInvoiced.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="5000"
              max="250000"
              step="5000"
              value={monthlyInvoiced}
              onChange={(e) => setMonthlyInvoiced(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-[#166FBB]"
            />
          </div>

          {/* 2. Current DSO */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-black uppercase tracking-wider text-near-black/70">
                Current Average Collection Time (DSO)
              </label>
              <span className="text-base font-black text-amber-600">
                {currentDSO} Days
              </span>
            </div>
            <input
              type="range"
              min="15"
              max="90"
              step="1"
              value={currentDSO}
              onChange={(e) => setCurrentDSO(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-amber-600"
            />
            <span className="text-[10px] text-slate-500 mt-1 block">
              Industry average is 42–58 days for B2B service firms.
            </span>
          </div>

          {/* 3. Labor & Interest Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-black text-near-black/70">
                  Chasing Invoices
                </label>
                <span className="text-sm font-black text-near-black">
                  {chasingHoursPerWeek} hrs/wk
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="15"
                step="1"
                value={chasingHoursPerWeek}
                onChange={(e) => setChasingHoursPerWeek(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-[#166FBB]"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Manual follow-ups & emailing.
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/80">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-black text-near-black/70">
                  Cost of Capital / Line of Credit
                </label>
                <span className="text-sm font-black text-near-black">
                  {capitalInterestRate}%
                </span>
              </div>
              <input
                type="range"
                min="4"
                max="20"
                step="0.5"
                value={capitalInterestRate}
                onChange={(e) => setCapitalInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-[#166FBB]"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Short term overdraft or debt rate.
              </span>
            </div>
          </div>
        </div>

        {/* Right Output Summary Card (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="bg-gradient-to-br from-[#060D1A] to-[#122238] text-white p-6 sm:p-8 rounded-3xl shadow-xl flex-1 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-widest text-amber-400">
                  Cash Flow Diagnostic
                </span>
                <span className="text-xs font-bold bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-full">
                  -{currentDSO - analytics.projectedDSO} Days Recovery
                </span>
              </div>

              {/* Main Capital Trapped Card */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <span className="text-xs font-bold text-slate-300 block mb-1">
                  Trapped Working Capital
                </span>
                <span className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight block">
                  {currencySymbol}{analytics.trappedCapital.toLocaleString()}
                </span>
                <span className="text-[11px] text-slate-400 mt-2 block">
                  Money owed to you that cannot be reinvested in payroll or growth.
                </span>
              </div>

              {/* Annual Drain Breakdown */}
              <div className="space-y-3 pt-1">
                <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2.5">
                  <span className="text-slate-300">Capital Interest Loss:</span>
                  <span className="font-bold text-base text-red-400">
                    -{currencySymbol}{analytics.annualInterestCost.toLocaleString()}/yr
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2.5">
                  <span className="text-slate-300">Wasted Admin Time:</span>
                  <span className="font-bold text-base text-red-400">
                    -{currencySymbol}{analytics.laborCostPerYear.toLocaleString()}/yr
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm pt-2 bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
                  <span className="text-emerald-300 font-bold text-xs">
                    Nobevra Cash Acceleration:
                  </span>
                  <span className="font-black text-emerald-400 text-sm">
                    +{currencySymbol}{analytics.unlockedWorkingCapital.toLocaleString()} unlocked
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Action */}
            <div className="pt-6 relative z-10">
              <Link
                href="/cash-flow-analytics"
                className="w-full py-3.5 px-6 rounded-2xl bg-[#01A0E2] hover:bg-[#166FBB] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25 transition-all hover:gap-3 group"
              >
                Accelerate Cash Flow with Nobevra
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
