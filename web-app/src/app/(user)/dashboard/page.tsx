'use client';

import React, { useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
    Wallet, Clock, CheckCircle2, 
    Plus, Download, Users, RefreshCw, Zap,
    FileText, PenTool, Sparkles, CreditCard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatCard from '@/components/dashboard/StatCard';
import ProactiveEmptyState from '@/components/shared/ProactiveEmptyState';
import PredictiveHub from '@/components/dashboard/PredictiveHub';
import AccountsReceivable from '@/components/dashboard/AccountsReceivable';
import CashFlowChart from '@/components/dashboard/CashFlowChart';
import RecentAssets from '@/components/dashboard/RecentAssets';
import { currencyService } from '@/lib/services/currencyService';
import DashboardGreeting from '@/components/dashboard/DashboardGreeting';
import { useDashboardData } from '@/hooks/useDashboardData';
import LeaderboardWidget from '@/components/portal/LeaderboardWidget';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-hot-toast';

function DashboardContent() {
    const { invoices, expenses, loading, error, stats, currencyCode, firstName } = useDashboardData();
    const { userData, user } = useAuth();
    
    const avatarUrl = user?.user_metadata?.avatar_url || userData?.avatar_url || null;
    const initials = firstName
        ? firstName.substring(0, 2).toUpperCase()
        : 'US';

    // Show a toast when Google account was just linked (redirected from OAuth callback)
    const searchParams = useSearchParams();
    useEffect(() => {
        if (searchParams?.get('linked') === 'google') {
            toast.success('🎉 Google account linked! You can now sign in with either method.', { duration: 5000 });
            // Clean the URL without a reload
            window.history.replaceState({}, '', '/dashboard');
        }
    }, [searchParams]);
        
    // Trigger Turbopack recompile
    const timeGreeting = useMemo(() => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 17) return 'Good afternoon';
        return 'Good evening';
    }, []);
    
    const pendingCount = invoices.filter(inv => inv.status !== 'paid' && inv.status !== 'draft').length;
    const pendingTotal = invoices.filter(inv => inv.status !== 'paid' && inv.status !== 'draft')
                                 .reduce((s, i) => s + (Number(i.total_amount) || 0), 0);

    if (error && !loading && invoices.length === 0) {
        return (
            <div className="min-h-full flex flex-col items-center justify-center p-10">
                <div className="bg-noble-surface dark:bg-noble-card rounded-3xl shadow-xl p-10 max-w-md w-full text-center">
                    <RefreshCw className="w-10 h-10 text-[#01A0E2] mx-auto mb-4 opacity-60" />
                    <h2 className="text-xl font-black text-noble-text mb-2">Couldn't Load Dashboard</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">{error}</p>
                    <Button
                        onClick={() => window.location.reload()}
                        variant="primary"
                        className="px-8 h-12 rounded-full font-black text-xs uppercase tracking-widest"
                    >
                        Retry
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-full pb-24 lg:pb-10">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#01A0E2]/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3" />
            <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-[#006970]/5 blur-[100px] rounded-full pointer-events-none -translate-x-1/2" />
            
            <div className="relative z-10 w-full">
                <DashboardGreeting invoices={invoices} clientsLength={stats.clientsCount || 0} />
                
                {/* 1. Welcome Section & Quick Actions */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
                    <div className="flex items-center gap-5">
                        <div>
                            <h1 className="text-[19px] font-bold text-slate-800 dark:text-slate-100 tracking-tight">
                                {timeGreeting}, <span className="font-bold text-noble-text">{firstName || 'User'}</span>
                            </h1>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 dark:text-slate-500 mt-1">
                                {pendingCount > 0 
                                    ? <span>You have <strong className="text-slate-700 dark:text-slate-200">{pendingCount} pending invoices</strong> totalling <strong className="text-slate-700 dark:text-slate-200">{currencyService.format(pendingTotal, currencyCode, { decimals: 0 })}</strong>.</span>
                                    : (stats.paidCount > 0 
                                        ? <span><strong className="text-emerald-600">{stats.paidCount} payments</strong> collected. Keep up the momentum!</span>
                                        : <span>Welcome! Create your first invoice to get paid.</span>)
                                }
                            </p>
                        </div>
                    </div>
                    
                    {/* Quick Actions Island */}
                    <div className="p-2 flex items-center gap-2 self-start lg:self-center bg-noble-surface dark:bg-noble-card/90 backdrop-blur-xl border border-noble-border rounded-[20px] shadow-sm">
                        <Button asChild variant="primary" className="rounded-[14px]">
                            <Link href="/invoices/new">
                                <Plus className="w-4 h-4 mr-2" strokeWidth={3} />
                                Create Invoice
                            </Link>
                        </Button>
                        <Button asChild variant="outline" className="rounded-[14px]">
                            <Link href="/clients/new">
                                <Users className="w-4 h-4 mr-2" />
                                <span className="hidden sm:inline">Add Client</span>
                            </Link>
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-[14px]">
                            <Download className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {invoices.length === 0 && (!stats.clientsCount || stats.clientsCount === 0) ? (
                    <div className="mt-8">
                        <ProactiveEmptyState
                            title="Welcome to Nobevra!"
                            description="You're just a few steps away from getting paid faster. Let's set up your account."
                            variant="onboarding"
                            illustrationIcons={[FileText, PenTool, Sparkles]}
                            stepIndicator={{ current: 0, total: 3 }}
                            features={[
                                { title: 'Invoicing', description: 'Create and send professional invoices.', icon: FileText },
                                { title: 'Clients', description: 'Manage your client directory.', icon: Users },
                                { title: 'Expenses', description: 'Track business expenses easily.', icon: CreditCard }
                            ]}
                            actions={[
                                { label: 'Create Your First Invoice', onClick: () => window.location.href = '/invoices/new', variant: 'primary' },
                                { label: 'Set Up Your Brand', onClick: () => window.location.href = '/settings/brand', variant: 'secondary' }
                            ]}
                        />
                    </div>
                ) : (
                    <>
                        {/* 2. Top Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                    <StatCard 
                        variant="hero"
                        title="TOTAL REVENUE" 
                        value={currencyService.format(stats.totalRevenue, currencyCode, { decimals: 0 })} 
                        icon={Wallet} 
                        badgeText="CLEARED" 
                        badgeType="positive"
                        iconBgColor="bg-blue-50"
                        iconColor="text-[#01A0E2]"
                        loading={loading}
                        trend={stats.revenueTrend}
                        sparklineData={stats.revenueSparkline}
                    />
                    <StatCard 
                        title="OUTSTANDING" 
                        value={currencyService.format(stats.outstanding, currencyCode, { decimals: 0 })} 
                        icon={Clock} 
                        badgeText="PENDING" 
                        badgeType="warning"
                        iconBgColor="bg-orange-50"
                        iconColor="text-orange-500"
                        loading={loading}
                        trend={stats.outstandingTrend}
                        sparklineData={stats.outstandingSparkline}
                    />
                    <StatCard 
                        title="INVOICES PAID" 
                        value={stats.paidCount.toString()} 
                        icon={CheckCircle2} 
                        badgeText="LIFETIME" 
                        badgeType="positive"
                        iconBgColor="bg-emerald-50"
                        iconColor="text-emerald-500"
                        loading={loading}
                    />
                    <StatCard 
                        title="BUSINESS HEALTH" 
                        value={`${stats.strengthIndex}%`} 
                        icon={Zap} 
                        badgeText={stats.strengthIndex >= 70 ? "OPTIMAL" : stats.strengthIndex >= 40 ? "FAIR" : "LOW"} 
                        badgeType={stats.strengthIndex >= 70 ? "positive" : stats.strengthIndex >= 40 ? "neutral" : "warning"}
                        iconBgColor="bg-blue-50"
                        iconColor="text-[#01A0E2]"
                        loading={loading}
                        trend={stats.strengthTrend}
                    />
                </div>

                {/* 3. Middle Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5 items-stretch">
                    <div className="lg:col-span-4 h-full">
                        <PredictiveHub invoices={invoices} currencyCode={currencyCode} />
                    </div>
                    <div className="lg:col-span-8 h-[380px]">
                        <CashFlowChart invoices={invoices} currencyCode={currencyCode} expenses={expenses} />
                    </div>
                </div>

                {/* 4. Bottom Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5 items-stretch">
                    <div className="lg:col-span-8 h-full">
                        <AccountsReceivable invoices={invoices} currencyCode={currencyCode} />
                    </div>
                    <div className="lg:col-span-4 h-[420px]">
                        <RecentAssets invoices={invoices} currencyCode={currencyCode} />
                    </div>
                </div>

                {/* 5. Gamification / Leaderboard */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-8">
                    <div className="lg:col-span-4">
                        <LeaderboardWidget />
                    </div>
                </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default function DashboardPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center p-10">
                <div className="w-8 h-8 border-4 border-noble-border border-t-[#01A0E2] rounded-full animate-spin" />
            </div>
        }>
            <DashboardContent />
        </Suspense>
    );
}
