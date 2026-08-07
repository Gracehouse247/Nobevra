'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { 
    Plus, Search, Filter, Receipt, FileText, UploadCloud,
    MoreHorizontal, Calendar, ArrowDownRight, Tag, Clock, CheckCircle2,
    Loader2, Trash2, FileDown, Grid3X3, List, ChevronLeft, ChevronRight, TrendingUp, TrendingDown, LayoutGrid, Sparkles, Calculator, Wallet
} from 'lucide-react';
import ProactiveEmptyState from '@/components/shared/ProactiveEmptyState';
import { useAuth } from '@/context/AuthContext';
import { expenseService, teamService } from '@/lib/services/supabaseService';
import { useCurrency } from '@/context/CurrencyContext';
import { useEntitlements } from '@/context/EntitlementsContext';
import { useUpgradeModal } from '@/context/UpgradeModalContext';
import PremiumBadge from '@/components/shared/PremiumBadge';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const TABS = ['All Expenses', 'Pending', 'Approved', 'Reimbursed', 'Recurring'];

export default function ExpensesPage() {
    const { user } = useAuth();
    const router = useRouter();
    const { canUse } = useEntitlements();
    const { openUpgradeModal } = useUpgradeModal();
    const [activeTab, setActiveTab] = React.useState('All Expenses');
    const [expenses, setExpenses] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [currentPage, setCurrentPage] = React.useState(1);
    const [itemsPerPage, setItemsPerPage] = React.useState(10);
    const [viewMode, setViewMode] = React.useState<'list' | 'grid'>('list');
    const { currencyCode, formatMoney } = useCurrency();
    const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);

    React.useEffect(() => {
        if (!user) return;
        const fetchExpenses = async () => {
            try {
                const tData = await teamService.getTeamByUserId(user.id);
                const teamId = tData?.id || user.id;
                const data = await expenseService.getExpenses(teamId);
                setExpenses(data || []);
            } catch (err) {
                console.error('Error fetching expenses:', err);
                toast.error('Failed to load expenses');
            } finally {
                setLoading(false);
            }
        };
        fetchExpenses();
    }, [user]);

    const handleDeleteExpense = async (id: string) => {
        if (!confirm('Are you sure you want to delete this expense?')) return;
        try {
            await expenseService.deleteExpense(id);
            setExpenses(prev => prev.filter(e => e.id !== id));
            toast.success('Expense deleted successfully');
        } catch (err) {
            console.error('Failed to delete expense:', err);
            toast.error('Failed to delete expense');
        }
    };

    const formatCurrency = (amount: number) => {
        return formatMoney(amount);
    };

    // Derived Statistics
    const stats = useMemo(() => {
        const now = new Date();
        const thisMonth = now.getMonth();
        const thisYear = now.getFullYear();

        let total = 0;
        let totalThisMonth = 0;
        let pendingTotal = 0;
        let pendingCount = 0;
        let approvedTotal = 0;
        let approvedCount = 0;
        const categoryMap: Record<string, { total: number, color: string }> = {};

        expenses.forEach(exp => {
            const amount = Number(exp.amount) || 0;
            total += amount;
            
            const expDate = new Date(exp.expense_date);
            if (expDate.getMonth() === thisMonth && expDate.getFullYear() === thisYear) {
                totalThisMonth += amount;
            }

            if (exp.status === 'pending') {
                pendingTotal += amount;
                pendingCount++;
            } else if (exp.status === 'approved') {
                approvedTotal += amount;
                approvedCount++;
            }

            const catName = exp.expense_categories?.name || 'Uncategorized';
            const catColor = exp.expense_categories?.color || '#94A3B8';
            if (!categoryMap[catName]) {
                categoryMap[catName] = { total: 0, color: catColor };
            }
            categoryMap[catName].total += amount;
        });

        const sortedCategories = Object.entries(categoryMap).sort((a, b) => b[1].total - a[1].total);
        const topCategory = sortedCategories.length > 0 ? { name: sortedCategories[0][0], ...sortedCategories[0][1] } : null;

        // Prepare Donut Chart Data
        let chartData = [];
        let othersTotal = 0;
        sortedCategories.forEach((cat, index) => {
            if (index < 5) {
                chartData.push({ name: cat[0], value: cat[1].total, color: cat[1].color });
            } else {
                othersTotal += cat[1].total;
            }
        });
        if (othersTotal > 0) {
            chartData.push({ name: 'Others', value: othersTotal, color: '#CBD5E1' });
        }

        return {
            total,
            totalThisMonth,
            pendingTotal,
            pendingCount,
            approvedTotal,
            approvedCount,
            topCategory,
            chartData
        };
    }, [expenses]);

    // Filtering & Pagination
    const filteredExpenses = useMemo(() => {
        return expenses.filter(expense => {
            const matchesSearch = 
                expense.notes?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                expense.vendors?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                expense.expense_categories?.name?.toLowerCase().includes(searchQuery.toLowerCase());
            
            if (!matchesSearch) return false;
            if (activeTab === 'All Expenses') return true;
            if (activeTab === 'Pending') return expense.status === 'pending';
            if (activeTab === 'Approved') return expense.status === 'approved';
            if (activeTab === 'Reimbursed') return expense.status === 'reimbursed';
            if (activeTab === 'Recurring') return expense.is_recurring;
            return true;
        });
    }, [expenses, searchQuery, activeTab]);

    const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);
    const paginatedExpenses = filteredExpenses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const recentReceipts = expenses.filter(e => e.receipt_url).slice(0, 6);

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'approved': return 'text-emerald-600';
            case 'reimbursed':
            case 'paid': return 'text-emerald-600';
            case 'pending': return 'text-amber-500';
            default: return 'text-slate-500';
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-24 text-slate-900 font-inter">
            <div className="max-w-[1500px] mx-auto px-5 lg:px-8 py-8">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-[19px] font-bold text-slate-900 tracking-tight mb-2">Expense Manager</h1>
                        <p className="text-slate-500 text-[15px]">Track your outgoing costs, upload receipts, and manage business spending.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={() => {
                                if (!canUse('expenses.receipt_scan')) {
                                    openUpgradeModal({ featureName: 'Receipt Scanning', requiredPlan: 'pulse' });
                                    return;
                                }
                                document.getElementById('expense-receipt-upload')?.click();
                            }} 
                            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold text-sm rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
                        >
                            <UploadCloud className="w-4 h-4" /> Upload Receipt
                            {!canUse('expenses.receipts') && <PremiumBadge tier="pulse" iconOnly />}
                            <input type="file" id="expense-receipt-upload" className="hidden" accept="image/png, image/jpeg, application/pdf" onChange={(e) => { if (e.target.files?.length) { toast.success('Receipt uploaded successfully.'); } }} />
                        </button>
                        <div className="flex rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(5,153,213,0.15)]">
                            <Link href="/expenses/new" className="flex items-center gap-2 px-5 py-2.5 bg-[#0599D5] hover:bg-[#0482B6] text-white font-bold text-sm transition-colors border-r border-white/20">
                                <Plus className="w-4 h-4" /> Record Expense
                            </Link>
                            <button className="px-3 py-2.5 bg-[#0599D5] hover:bg-[#0482B6] text-white transition-colors">
                                <ChevronLeft className="w-4 h-4 -rotate-90" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Top Stats Cards */}
                {expenses.length === 0 && !loading ? (
                    <ProactiveEmptyState
                        title="Track every business expense"
                        description="Record expenses, snap receipts, and see where your money goes. Stay organized for tax time."
                        variant="empty"
                        illustrationIcons={[Receipt, Calculator, Wallet]}
                        tips={["Tip: Upload receipt photos to keep digital records", "Tip: Categorize expenses for easy tax reporting"]}
                        actions={[
                            { label: '+ Record Your First Expense', onClick: () => router.push('/expenses/new'), variant: 'primary' },
                            { label: 'Upload a Receipt', onClick: () => router.push('/expenses/new?scan=true'), variant: 'secondary' }
                        ]}
                    />
                ) : (
                    <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
                    {/* Total Expenses */}
                    <div className="bg-white rounded-[20px] border border-slate-200 p-5 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-violet-50 text-indigo-600 flex items-center justify-center border border-violet-100">
                                <FileText className="w-5 h-5" />
                            </div>
                            <span className="font-bold text-[13px] text-slate-500">Total Expenses</span>
                        </div>
                        <div className="text-[18px] font-bold tracking-tight text-slate-900 mb-2">
                            {formatCurrency(stats.total)}
                        </div>
                        <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-500">
                            <TrendingUp className="w-3.5 h-3.5" /> 12% this month
                        </div>
                    </div>

                    {/* This Month */}
                    <div className="bg-white rounded-[20px] border border-slate-200 p-5 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                                <Receipt className="w-5 h-5" />
                            </div>
                            <span className="font-bold text-[13px] text-slate-500">This Month</span>
                        </div>
                        <div className="text-[18px] font-bold tracking-tight text-slate-900 mb-2">
                            {formatCurrency(stats.totalThisMonth)}
                        </div>
                        <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-500">
                            <TrendingUp className="w-3.5 h-3.5" /> 8% vs last month
                        </div>
                    </div>

                    {/* Pending */}
                    <div className="bg-white rounded-[20px] border border-slate-200 p-5 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center border border-amber-100">
                                <div className="w-4 h-4 rounded-md border-2 border-current rounded-sm"></div>
                            </div>
                            <span className="font-bold text-[13px] text-slate-500">Pending</span>
                        </div>
                        <div className="text-[18px] font-bold tracking-tight text-slate-900 mb-2">
                            {formatCurrency(stats.pendingTotal)}
                        </div>
                        <div className="text-[11px] font-bold text-amber-500">
                            {stats.pendingCount} expenses
                        </div>
                    </div>

                    {/* Approved */}
                    <div className="bg-white rounded-[20px] border border-slate-200 p-5 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-[#0599D5]/10 text-[#0599D5] flex items-center justify-center border border-[#0599D5]/20">
                                <CheckCircle2 className="w-5 h-5" />
                            </div>
                            <span className="font-bold text-[13px] text-slate-500">Approved</span>
                        </div>
                        <div className="text-[18px] font-bold tracking-tight text-slate-900 mb-2">
                            {formatCurrency(stats.approvedTotal)}
                        </div>
                        <div className="text-[11px] font-bold text-[#0599D5]">
                            {stats.approvedCount} expenses
                        </div>
                    </div>

                    {/* Top Category */}
                    <div className="bg-white rounded-[20px] border border-slate-200 p-5 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-500 flex items-center justify-center border border-pink-100">
                                <Tag className="w-5 h-5" />
                            </div>
                            <span className="font-bold text-[13px] text-slate-500">Top Category</span>
                        </div>
                        <div className="text-[18px] font-bold tracking-tight text-slate-900 mb-2 truncate" title={stats.topCategory?.name || 'N/A'}>
                            {stats.topCategory?.name || 'N/A'}
                        </div>
                        <div className="text-[11px] font-bold text-pink-500">
                            {stats.topCategory ? formatCurrency(stats.topCategory.total) : formatCurrency(0)}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                    {/* Main Left Section: Ledger */}
                    <div className="xl:col-span-8 space-y-6">
                        
                        {/* Filters & Tabs */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center overflow-x-auto no-scrollbar border-b border-slate-200 w-full md:w-auto">
                                {TABS.map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
                                        className={`px-5 py-3 text-[13px] font-bold whitespace-nowrap border-b-2 transition-colors ${
                                            activeTab === tab 
                                            ? 'border-[#0599D5] text-[#0599D5]' 
                                            : 'border-transparent text-slate-500 hover:text-slate-800'
                                        }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                            
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input 
                                        type="text"
                                        placeholder="Search expenses..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-[13px] font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0599D5] focus:ring-1 focus:ring-[#0599D5] transition-all w-full md:w-60"
                                    />
                                </div>
                                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold text-[13px] hover:bg-slate-50 transition-colors shadow-sm">
                                    <Filter className="w-3.5 h-3.5" /> Filters
                                </button>
                                <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-sm hidden md:flex">
                                    <button 
                                        onClick={() => setViewMode('grid')}
                                        className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-slate-100 text-[#0599D5]' : 'text-slate-400 hover:text-slate-600'}`}
                                    >
                                        <Grid3X3 className="w-4 h-4" />
                                    </button>
                                    <button 
                                        onClick={() => setViewMode('list')}
                                        className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-[#4F46E5] text-white' : 'text-slate-400 hover:text-slate-600'}`}
                                    >
                                        <List className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[800px]">
                                    <thead>
                                        <tr className="border-b border-slate-100 bg-slate-50/50">
                                            <th className="px-6 py-4 w-12">
                                                <input type="checkbox" className="rounded-[4px] border-slate-300 text-[#4F46E5] focus:ring-[#4F46E5]" />
                                            </th>
                                            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</th>
                                            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Merchant / Description</th>
                                            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Category</th>
                                            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Amount</th>
                                            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                                            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Receipt / Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {loading ? (
                                            <tr>
                                                <td colSpan={7} className="px-6 py-20 text-center text-slate-500 font-semibold text-sm">
                                                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-[#4F46E5]" />
                                                    Loading expenses...
                                                </td>
                                            </tr>
                                        ) : paginatedExpenses.length === 0 ? (
                                            <tr>
                                                <td colSpan={7} className="px-6 py-10">
                                                    <ProactiveEmptyState
                                                        title="No expenses found"
                                                        description="Adjust your filters or search to see more results."
                                                        variant="filtered"
                                                    />
                                                </td>
                                            </tr>
                                        ) : (
                                            paginatedExpenses.map((expense) => (
                                                <tr key={expense.id} className="hover:bg-slate-50/80 transition-colors group">
                                                    <td className="px-6 py-4">
                                                        <input type="checkbox" className="rounded-[4px] border-slate-300 text-[#4F46E5] focus:ring-[#4F46E5]" />
                                                    </td>
                                                    <td className="px-6 py-4 text-[13px] font-semibold text-slate-500">
                                                        {new Date(expense.expense_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 text-[10px]">
                                                                {expense.vendors?.name?.substring(0, 2).toUpperCase() || 'GE'}
                                                            </div>
                                                            <div>
                                                                <div className="font-bold text-[14px] text-slate-900">{expense.vendors?.name || 'General Overhead'}</div>
                                                                <div className="text-[12px] text-slate-500 truncate max-w-[200px]">{expense.notes || 'No description'}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold" style={{
                                                            backgroundColor: `${expense.expense_categories?.color || '#94A3B8'}15`,
                                                            color: expense.expense_categories?.color || '#64748B'
                                                        }}>
                                                            {expense.expense_categories?.name || 'Uncategorized'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 font-black text-[13px] text-slate-900">
                                                        {formatCurrency(expense.amount)}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className={`flex items-center gap-1.5 text-[11px] font-bold capitalize ${getStatusStyles(expense.status)}`}>
                                                            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                                                            {expense.status === 'reimbursed' ? 'Paid' : expense.status}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex items-center justify-end gap-3">
                                                            {expense.receipt_url ? (
                                                                <a 
                                                                    href={expense.receipt_url} 
                                                                    target="_blank" 
                                                                    rel="noreferrer"
                                                                    className="w-8 h-10 rounded border border-slate-200 bg-slate-50 overflow-hidden relative group-hover:border-[#0599D5]/50 transition-colors"
                                                                    title="View Receipt"
                                                                >
                                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                                    <img src={expense.receipt_url} alt="Receipt" className="w-full h-full object-cover opacity-70 group-hover:opacity-100" />
                                                                </a>
                                                            ) : (
                                                                <div className="w-8 h-10 rounded border border-dashed border-slate-200 flex items-center justify-center text-slate-300">
                                                                    <Receipt className="w-3.5 h-3.5" />
                                                                </div>
                                                            )}
                                                            <div className="relative">
                                                                <button 
                                                                    onClick={() => setActiveDropdown(activeDropdown === expense.id ? null : expense.id)}
                                                                    className="text-slate-400 hover:text-[#0599D5] transition-colors p-1.5 rounded-lg hover:bg-slate-100"
                                                                >
                                                                    <MoreHorizontal className="w-5 h-5" />
                                                                </button>
                                                                
                                                                {activeDropdown === expense.id && (
                                                                    <>
                                                                        <div className="fixed inset-0 z-10" onClick={() => setActiveDropdown(null)} />
                                                                        <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-20 text-left">
                                                                            <Link href={`/expenses/new?id=${expense.id}`} className="block px-4 py-2 text-[13px] font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#0599D5] transition-colors">
                                                                                Edit Expense
                                                                            </Link>
                                                                            {expense.receipt_url && (
                                                                                <a href={expense.receipt_url} target="_blank" rel="noreferrer" className="block px-4 py-2 text-[13px] font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#0599D5] transition-colors">
                                                                                    View Receipt
                                                                                </a>
                                                                            )}
                                                                            <div className="border-t border-slate-100 my-1"></div>
                                                                            <button 
                                                                                onClick={() => { handleDeleteExpense(expense.id); setActiveDropdown(null); }}
                                                                                className="w-full text-left px-4 py-2 text-[13px] font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                                                                            >
                                                                                Delete Expense
                                                                            </button>
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="border-t border-slate-100 p-4 flex items-center justify-between bg-slate-50/50 text-[13px]">
                                <div className="text-slate-500 font-medium">
                                    Showing {(currentPage - 1) * itemsPerPage + 1} to Math.min(currentPage * itemsPerPage, filteredExpenses.length) of {filteredExpenses.length} expenses
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1">
                                        <button 
                                            disabled={currentPage === 1}
                                            onClick={() => setCurrentPage(p => p - 1)}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-50 transition-colors"
                                        >
                                            <ChevronLeft className="w-4 h-4" />
                                        </button>
                                        
                                        {/* Simple Pagination Numbers */}
                                        {[...Array(Math.min(totalPages, 5))].map((_, i) => (
                                            <button 
                                                key={i}
                                                onClick={() => setCurrentPage(i + 1)}
                                                className={`w-8 h-8 flex items-center justify-center rounded-lg text-[13px] font-bold transition-colors ${
                                                    currentPage === i + 1 
                                                    ? 'bg-[#4F46E5] text-white border border-[#4F46E5]' 
                                                    : 'border border-transparent text-slate-600 hover:bg-slate-100'
                                                }`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}

                                        <button 
                                            disabled={currentPage === totalPages || totalPages === 0}
                                            onClick={() => setCurrentPage(p => p + 1)}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-50 transition-colors"
                                        >
                                            <ChevronLeft className="w-4 h-4 rotate-180" />
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <select 
                                            value={itemsPerPage}
                                            onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                                            className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 font-medium text-slate-700 outline-none"
                                        >
                                            <option value={10}>10 per page</option>
                                            <option value={20}>20 per page</option>
                                            <option value={50}>50 per page</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Receipts Widget */}
                        {recentReceipts.length > 0 && (
                            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold text-slate-900 text-[15px]">Recent Receipts</h3>
                                    <button className="text-[#0599D5] text-[13px] font-bold hover:underline">View all →</button>
                                </div>
                                <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                                    {recentReceipts.map((exp, i) => (
                                        <a 
                                            key={i}
                                            href={exp.receipt_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="w-24 h-32 rounded-xl border border-slate-200 overflow-hidden flex-shrink-0 relative group hover:border-[#0599D5] hover:shadow-md transition-all cursor-pointer"
                                        >
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={exp.receipt_url} alt="Receipt" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                <Search className="w-6 h-6 text-white" />
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Analytics & Insights */}
                    <div className="xl:col-span-4 space-y-6">
                        
                        {/* Expenses Overview (Donut Chart) */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-slate-900 text-[15px]">Expenses Overview</h3>
                                <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-[12px] font-bold text-slate-700 outline-none">
                                    <option>This Month</option>
                                    <option>Last Month</option>
                                    <option>This Year</option>
                                </select>
                            </div>

                            <div className="relative h-[220px] mb-6 flex items-center justify-center">
                                {stats.chartData.length > 0 ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={stats.chartData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={65}
                                                outerRadius={95}
                                                paddingAngle={2}
                                                dataKey="value"
                                                stroke="none"
                                            >
                                                {stats.chartData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip 
                                                formatter={(value: any) => formatCurrency(Number(value))}
                                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontWeight: 'bold', fontSize: '13px' }}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="w-40 h-40 rounded-full border-8 border-slate-100 flex items-center justify-center">
                                        <span className="text-slate-400 text-xs font-bold">No Data</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <span className="text-[22px] font-black text-slate-900 leading-none">{formatCurrency(stats.totalThisMonth).split('.')[0]}</span>
                                    <span className="text-[11px] font-bold text-slate-500 mt-1 uppercase tracking-wider">Total</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {stats.chartData.map((cat, i) => (
                                    <div key={i} className="flex items-center justify-between text-[13px]">
                                        <div className="flex items-center gap-2">
                                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }}></span>
                                            <span className="font-semibold text-slate-700">{cat.name}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-slate-900">{formatCurrency(cat.value)}</span>
                                            <span className="text-slate-400 font-medium text-[11px] w-10 text-right">
                                                {stats.total > 0 ? Math.round((cat.value / stats.total) * 100) : 0}%
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Top Categories Progress Bars */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                            <h3 className="font-bold text-slate-900 text-[15px] mb-6">Top Categories</h3>
                            <div className="space-y-5">
                                {stats.chartData.filter(c => c.name !== 'Others').slice(0, 5).map((cat, i) => {
                                    const percentage = stats.total > 0 ? Math.round((cat.value / stats.total) * 100) : 0;
                                    return (
                                        <div key={i}>
                                            <div className="flex items-center justify-between text-[13px] mb-1.5">
                                                <span className="font-semibold text-slate-700">{cat.name}</span>
                                                <span className="font-bold text-slate-900">{formatCurrency(cat.value)} <span className="text-slate-400 font-medium">({percentage}%)</span></span>
                                            </div>
                                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                                <motion.div 
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${percentage}%` }}
                                                    transition={{ duration: 1, ease: 'easeOut' }}
                                                    className="h-full rounded-full"
                                                    style={{ backgroundColor: cat.color }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <button className="text-[#0599D5] text-[13px] font-bold mt-6 hover:underline">View all categories →</button>
                        </div>

                        {/* Smart Insights Widget */}
                        <div className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-2xl border border-indigo-100 p-6 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                                <TrendingUp className="w-24 h-24 text-indigo-600" />
                            </div>
                            <div className="flex items-center justify-between mb-4 relative z-10">
                                <div className="flex items-center gap-2 text-indigo-700">
                                    <Sparkles className="w-4 h-4" />
                                    <h3 className="font-bold text-[14px]">Smart Insights</h3>
                                </div>
                                <button className="text-indigo-600 text-[12px] font-bold hover:underline">View report →</button>
                            </div>
                            <div className="flex items-start gap-4 relative z-10">
                                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0 text-indigo-600 mt-1">
                                    <TrendingUp className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-[13px] text-slate-700 leading-relaxed font-medium">
                                        You've spent <strong className="text-indigo-700">12% more on Operations</strong> this month. Consider reviewing these expenses.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                {/* End Main Container Wrap */}
                </>
                )}
            </div>
        </div>
    );
}
