'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  TrendingUp, Clock, DollarSign, ArrowRight, 
  Sparkles, CheckCircle2, ShieldCheck, Briefcase, HelpCircle 
} from 'lucide-react';

export default function FreelanceRateCalculator() {
  const [currencySymbol, setCurrencySymbol] = useState('$');
  const [targetAnnualNet, setTargetAnnualNet] = useState<number>(85000);
  const [annualExpenses, setAnnualExpenses] = useState<number>(12000);
  const [vacationWeeks, setVacationWeeks] = useState<number>(4);
  const [billableHoursPerWeek, setBillableHoursPerWeek] = useState<number>(25);
  const [taxReserveRate, setTaxReserveRate] = useState<number>(25);
  const [profitMargin, setProfitMargin] = useState<number>(15);

  const calculations = useMemo(() => {
    // 1. Gross Revenue needed before taxes & profit
    const netNeeded = Number(targetAnnualNet) || 0;
    const expenses = Number(annualExpenses) || 0;
    const taxRate = (Number(taxReserveRate) || 0) / 100;
    const profitRate = (Number(profitMargin) || 0) / 100;

    // Gross = (Net + Expenses) / (1 - TaxRate) * (1 + ProfitRate)
    const taxableBase = (netNeeded + expenses) / Math.max(0.1, 1 - taxRate);
    const targetGrossRevenue = taxableBase * (1 + profitRate);

    // 2. Billable Hours per Year
    const workingWeeks = Math.max(1, 52 - (Number(vacationWeeks) || 0));
    const totalBillableHours = workingWeeks * (Number(billableHoursPerWeek) || 1);

    // 3. Calculated Rates
    const hourlyRate = Math.ceil(targetGrossRevenue / Math.max(1, totalBillableHours));
    const dayRate = Math.ceil(hourlyRate * 8);
    const weeklyRate = Math.ceil(hourlyRate * (Number(billableHoursPerWeek) || 25));
    const monthlyRetainer10h = Math.ceil(hourlyRate * 10);
    const monthlyRetainer20h = Math.ceil(hourlyRate * 20);

    return {
      targetGrossRevenue: Math.round(targetGrossRevenue),
      totalBillableHours,
      hourlyRate,
      dayRate,
      weeklyRate,
      monthlyRetainer10h,
      monthlyRetainer20h,
    };
  }, [
    targetAnnualNet,
    annualExpenses,
    vacationWeeks,
    billableHoursPerWeek,
    taxReserveRate,
    profitMargin,
  ]);

  return (
    <div className="bg-noble-surface rounded-[40px] p-6 sm:p-10 md:p-14 border border-slate-200/80 shadow-xl max-w-5xl mx-auto relative overflow-hidden font-inter">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 font-bold text-xs uppercase tracking-widest mb-3">
            <TrendingUp className="w-3.5 h-3.5" />
            Pricing Strategy & Retainer Engine
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-near-black tracking-tight">
            Freelance Rate & Retainer Calculator
          </h2>
          <p className="text-near-black/60 text-sm mt-1">
            Determine your mathematically sound hourly rate, day rate, and recurring monthly retainer tiers.
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
          {/* 1. Target Net Income */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-black uppercase tracking-wider text-near-black/70">
                Target Annual Take-Home (Net Salary)
              </label>
              <span className="text-base font-black text-near-black">
                {currencySymbol}
                {targetAnnualNet.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="30000"
              max="300000"
              step="5000"
              value={targetAnnualNet}
              onChange={(e) => setTargetAnnualNet(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-[#166FBB]"
            />
          </div>

          {/* 2. Annual Overhead Expenses */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-black uppercase tracking-wider text-near-black/70">
                Annual Business Overhead & Software
              </label>
              <span className="text-base font-black text-near-black">
                {currencySymbol}
                {annualExpenses.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="2000"
              max="50000"
              step="1000"
              value={annualExpenses}
              onChange={(e) => setAnnualExpenses(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-[#166FBB]"
            />
          </div>

          {/* 3. Billable Hours & Vacation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-black text-near-black/70">
                  Billable Hours / Week
                </label>
                <span className="text-sm font-black text-emerald-600">
                  {billableHoursPerWeek} hrs
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="40"
                step="1"
                value={billableHoursPerWeek}
                onChange={(e) => setBillableHoursPerWeek(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-emerald-600"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Exclude marketing, proposals, and admin time.
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/80">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-black text-near-black/70">
                  Vacation & Sick Weeks
                </label>
                <span className="text-sm font-black text-amber-600">
                  {vacationWeeks} weeks
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="1"
                value={vacationWeeks}
                onChange={(e) => setVacationWeeks(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-amber-600"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                {52 - vacationWeeks} active working weeks/yr.
              </span>
            </div>
          </div>

          {/* 4. Tax & Profit Reserves */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-black text-near-black/70 block mb-1.5">
                Tax & Pension Reserve ({taxReserveRate}%)
              </label>
              <select
                value={taxReserveRate}
                onChange={(e) => setTaxReserveRate(Number(e.target.value))}
                className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs font-bold text-near-black focus:outline-none focus:border-noble-blue"
              >
                <option value={15}>15% (Low tax / startup)</option>
                <option value={25}>25% (Standard freelance)</option>
                <option value={35}>35% (High tax bracket)</option>
                <option value={45}>45% (EU / Progressive top tier)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-black text-near-black/70 block mb-1.5">
                Profit Margin Buffer ({profitMargin}%)
              </label>
              <select
                value={profitMargin}
                onChange={(e) => setProfitMargin(Number(e.target.value))}
                className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs font-bold text-near-black focus:outline-none focus:border-noble-blue"
              >
                <option value={10}>10% (Lean buffer)</option>
                <option value={15}>15% (Recommended)</option>
                <option value={25}>25% (Agency growth)</option>
                <option value={35}>35% (Premium specialty)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Output Results (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="bg-gradient-to-br from-[#060D1A] to-[#0A1A30] text-white p-6 sm:p-8 rounded-3xl shadow-xl flex-1 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <span className="text-[11px] font-black uppercase tracking-widest text-emerald-400">
                Recommended Price Targets
              </span>

              {/* Main Rate Hero */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <span className="text-xs font-bold text-slate-300 block mb-1">
                  Minimum Hourly Rate
                </span>
                <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                  {currencySymbol}{calculations.hourlyRate}
                  <span className="text-sm font-bold text-slate-400">/hr</span>
                </span>
                <span className="text-[11px] text-slate-400 mt-2 block">
                  Based on {calculations.totalBillableHours} billable hours/year
                </span>
              </div>

              {/* Tier Breakdown */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2.5">
                  <span className="text-slate-300">Standard Day Rate (8 hrs):</span>
                  <span className="font-bold text-base text-white">
                    {currencySymbol}{calculations.dayRate.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2.5">
                  <span className="text-slate-300">Starter Retainer (10h/mo):</span>
                  <span className="font-bold text-base text-emerald-400">
                    {currencySymbol}{calculations.monthlyRetainer10h.toLocaleString()}/mo
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2.5">
                  <span className="text-slate-300">Growth Retainer (20h/mo):</span>
                  <span className="font-bold text-base text-noble-blue">
                    {currencySymbol}{calculations.monthlyRetainer20h.toLocaleString()}/mo
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm pt-1">
                  <span className="text-slate-400 text-xs">Required Gross Revenue:</span>
                  <span className="font-black text-xs text-slate-300">
                    {currencySymbol}{calculations.targetGrossRevenue.toLocaleString()}/yr
                  </span>
                </div>
              </div>
            </div>

            {/* Direct PLG Action */}
            <div className="pt-6 relative z-10">
              <Link
                href="/recurring-billing-software"
                className="w-full py-3.5 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all hover:gap-3 group"
              >
                Set Up Recurring Client Retainer
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
