'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
    Users, Search, Download, ChevronLeft, ChevronRight,
    Crown, Shield, MoreVertical, X, Loader2,
    UserCheck, Trash2
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface UserProfile {
    id: string;
    email: string;
    full_name: string | null;
    subscription_tier: string | null;
    subscription_status: string | null;
    role: string | null;
    is_superadmin: boolean | null;
    created_at: string;
    avatar_url?: string | null;
}

const ADMIN_ROLES = ['super_admin', 'seo_manager', 'support_staff'];
const PAGE_SIZE = 20;

const PlanBadge = ({ tier }: { tier: string | null }) => {
    const styles: Record<string, string> = {
        elite: 'bg-amber-50 text-amber-700 border-amber-200',
        pulse: 'bg-[#f0fafa] text-[#006970] border-[#b9cacb]',
        pro:   'bg-[#f0fafa] text-[#006970] border-[#b9cacb]',
        explorer: 'bg-slate-100 text-slate-700 border-slate-200',
    };
    const label = tier || 'explorer';
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-widest border ${styles[label] || styles.explorer}`}>
            {label === 'elite' && <Crown className="w-3.5 h-3.5" />}
            {label}
        </span>
    );
};

const StatusBadge = ({ status }: { status: string | null }) => {
    const active = status === 'active';
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-widest border ${active ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-emerald-500' : 'bg-slate-400'}`} />
            {status || 'inactive'}
        </span>
    );
};

const MetricCard = ({ title, value, icon: Icon }: { title: string, value: number | string, icon: React.ElementType }) => (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center justify-between">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-500">{title}</h3>
            <div className="p-2.5 bg-[#f0fafa] rounded-xl">
                <Icon className="w-5 h-5 text-[#006970]" />
            </div>
        </div>
        <p className="text-3xl font-bold tracking-tight text-slate-900 mt-4">{value}</p>
    </div>
);

export default function AdminUsersPage() {
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [filtered, setFiltered] = useState<UserProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [planFilter, setPlanFilter] = useState('all');
    const [page, setPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
    const [showPlanModal, setShowPlanModal] = useState(false);
    const [newPlan, setNewPlan] = useState('');
    const [saving, setSaving] = useState(false);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [stats, setStats] = useState({ total: 0, active: 0, admins: 0 });
    const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
    const [actionError, setActionError] = useState<string | null>(null);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        setActionError(null);
        try {
            const { data, count, error: fetchErr } = await supabase
                .from('profiles')
                .select('id, email, full_name:display_name, subscription_tier, subscription_status, role, is_superadmin, created_at, avatar_url', { count: 'exact' })
                .order('created_at', { ascending: false })
                .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

            if (fetchErr) throw fetchErr;
            if (data) { setUsers(data); setFiltered(data); }
            if (count !== null) setTotalCount(count);

            // Count active subscriptions
            const { count: activeCount } = await supabase
                .from('profiles')
                .select('*', { count: 'exact', head: true })
                .eq('subscription_status', 'active');

            // Count admin accounts using the role column, NOT subscription_tier
            const { count: adminCount } = await supabase
                .from('profiles')
                .select('*', { count: 'exact', head: true })
                .or(`role.in.(${ADMIN_ROLES.join(',')}),is_superadmin.eq.true`);

            setStats({ total: count || 0, active: activeCount || 0, admins: adminCount || 0 });
        } catch (err) {
            console.error('Failed to fetch users:', err);
            setActionError('Failed to load users. Please refresh the page.');
        } finally {
            setLoading(false);
        }
    }, [page]);

    useEffect(() => { fetchUsers(); }, [fetchUsers]);

    useEffect(() => {
        let results = users;
        if (search) {
            const q = search.toLowerCase();
            results = results.filter(u =>
                u.email?.toLowerCase().includes(q) ||
                u.full_name?.toLowerCase().includes(q)
            );
        }
        if (planFilter !== 'all') {
            results = results.filter(u => (u.subscription_tier || 'explorer') === planFilter);
        }
        setFiltered(results);
    }, [search, planFilter, users]);

    const handleChangePlan = async () => {
        if (!selectedUser || !newPlan) return;
        setSaving(true);
        setActionError(null);
        const { error } = await supabase
            .from('profiles')
            .update({ subscription_tier: newPlan, subscription_status: 'active' })
            .eq('id', selectedUser.id);
        setSaving(false);
        if (error) {
            setActionError(`Failed to update plan: ${error.message}`);
            return;
        }
        setShowPlanModal(false);
        setSelectedUser(null);
        fetchUsers();
    };

    /**
     * Toggles admin access by updating the `role` column.
     * We NEVER touch `subscription_tier` for admin privileges — that field
     * tracks the user's billing plan only.
     */
    const handleToggleAdmin = async (user: UserProfile) => {
        setActionError(null);
        const isCurrentlyAdmin = ADMIN_ROLES.includes(user.role ?? '') || user.is_superadmin;
        // Promote: set role to 'super_admin'. Demote: clear the role.
        const newRole = isCurrentlyAdmin ? null : 'super_admin';

        const { error } = await supabase
            .from('profiles')
            .update({ role: newRole })
            .eq('id', user.id);

        if (error) {
            setActionError(`Failed to update admin role: ${error.message}`);
        }
        setOpenMenuId(null);
        fetchUsers();
    };

    const exportCSV = () => {
        const header = ['Name', 'Email', 'Plan', 'Status', 'Role', 'Superadmin', 'Joined'];
        const rows = filtered.map(u => [
            u.full_name || '',
            u.email,
            u.subscription_tier || 'explorer',
            u.subscription_status || 'inactive',
            u.role || '—',
            u.is_superadmin ? 'Yes' : 'No',
            new Date(u.created_at).toLocaleDateString(),
        ]);
        const csv = [header, ...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'nobevra_users.csv';
        a.click();
    };

    const toggleSelectAll = () => {
        if (selectedUsers.size === filtered.length && filtered.length > 0) {
            setSelectedUsers(new Set());
        } else {
            setSelectedUsers(new Set(filtered.map(u => u.id)));
        }
    };

    const toggleSelectUser = (id: string) => {
        const newSet = new Set(selectedUsers);
        if (newSet.has(id)) newSet.delete(id);
        else newSet.add(id);
        setSelectedUsers(newSet);
    };

    const isUserAdmin = (user: UserProfile) =>
        user.is_superadmin === true || ADMIN_ROLES.includes(user.role ?? '');

    const getRoleLabel = (user: UserProfile) => {
        if (user.is_superadmin) return 'Superadmin';
        const labelMap: Record<string, string> = {
            super_admin: 'Super Admin',
            seo_manager: 'SEO Manager',
            support_staff: 'Support Staff',
        };
        return labelMap[user.role ?? ''] ?? null;
    };

    const totalPages = Math.ceil(totalCount / PAGE_SIZE);

    return (
        <div className="min-h-screen bg-slate-50 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">User Management</h1>
                        <p className="mt-1.5 text-slate-500 font-medium">View, manage and export all registered users.</p>
                    </div>
                    <button onClick={exportCSV} className="flex items-center gap-2 px-5 py-2.5 bg-[#006970] hover:bg-[#005a60] text-white rounded-lg font-bold text-sm transition-all shadow-sm">
                        <Download className="w-4 h-4" /> Export CSV
                    </button>
                </div>

                {/* Error Banner */}
                {actionError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-3 text-sm font-medium flex items-center justify-between">
                        <span>{actionError}</span>
                        <button onClick={() => setActionError(null)} className="ml-4 text-red-500 hover:text-red-700 font-bold">✕</button>
                    </div>
                )}

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <MetricCard title="Total Users" value={stats.total} icon={Users} />
                    <MetricCard title="Active Subscriptions" value={stats.active} icon={UserCheck} />
                    <MetricCard title="Admin Accounts" value={stats.admins} icon={Shield} />
                </div>

                {/* Enterprise Data Grid */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-visible">
                    {/* Toolbar */}
                    <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row items-center gap-4 justify-between bg-slate-50/50 rounded-t-2xl">
                        {selectedUsers.size > 0 ? (
                            <div className="flex items-center gap-4 bg-[#f0fafa] border border-[#b9cacb] px-4 py-2.5 rounded-xl shadow-sm">
                                <span className="text-sm font-bold text-[#006970]">{selectedUsers.size} selected</span>
                                <div className="w-px h-4 bg-[#b9cacb]" />
                                <button className="text-sm font-bold text-red-600 hover:text-red-700 transition-colors flex items-center gap-1.5">
                                    <Trash2 className="w-3.5 h-3.5" /> Delete Selected
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3 w-full sm:w-auto flex-1 max-w-md relative">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input 
                                    value={search} 
                                    onChange={e => setSearch(e.target.value)} 
                                    placeholder="Search users by name or email..."
                                    className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#006970]/20 focus:border-[#006970] transition-all shadow-sm placeholder:text-slate-400" 
                                />
                            </div>
                        )}

                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <select 
                                value={planFilter} 
                                onChange={e => setPlanFilter(e.target.value)}
                                className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 font-bold focus:outline-none focus:ring-2 focus:ring-[#006970]/20 focus:border-[#006970] transition-all shadow-sm cursor-pointer"
                            >
                                <option value="all">All Plans</option>
                                <option value="explorer">Explorer</option>
                                <option value="pulse">Pulse</option>
                                <option value="elite">Elite</option>
                            </select>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-200 bg-slate-50/50">
                                    <th className="px-6 py-4 w-12">
                                        <input 
                                            type="checkbox" 
                                            className="w-4 h-4 text-[#006970] rounded border-slate-300 focus:ring-[#006970] cursor-pointer"
                                            checked={filtered.length > 0 && selectedUsers.size === filtered.length}
                                            onChange={toggleSelectAll}
                                        />
                                    </th>
                                    <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-500">User</th>
                                    <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-500">Plan</th>
                                    <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-500">Status</th>
                                    <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-500">Joined</th>
                                    <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-500">Role</th>
                                    <th className="px-6 py-4 text-right text-[11px] font-bold uppercase tracking-widest text-slate-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                                            <div className="flex flex-col items-center gap-2">
                                                <Loader2 className="w-6 h-6 animate-spin text-[#006970]" />
                                                <span className="text-sm font-medium">Loading users...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : filtered.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                                            <div className="flex flex-col items-center gap-2">
                                                <Users className="w-8 h-8 text-slate-300" />
                                                <span className="text-sm font-medium">No users found.</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filtered.map(user => (
                                        <tr 
                                            key={user.id} 
                                            className={`group hover:bg-slate-50 transition-colors ${selectedUsers.has(user.id) ? 'bg-[#f0fafa]/30' : ''}`}
                                        >
                                            <td className="px-6 py-4">
                                                <input 
                                                    type="checkbox" 
                                                    className="w-4 h-4 text-[#006970] rounded border-slate-300 focus:ring-[#006970] cursor-pointer"
                                                    checked={selectedUsers.has(user.id)}
                                                    onChange={() => toggleSelectUser(user.id)}
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    {user.avatar_url ? (
                                                        <img src={user.avatar_url} alt="Avatar" className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-sm" />
                                                    ) : (
                                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#e0f5f5] to-[#f0fafa] flex items-center justify-center text-[#006970] font-bold text-sm border border-[#b9cacb] shadow-sm">
                                                            {(user.full_name || user.email || '?')[0].toUpperCase()}
                                                        </div>
                                                    )}
                                                    <div>
                                                        <div className="font-bold text-slate-900 group-hover:text-[#006970] transition-colors cursor-pointer">{user.full_name || '—'}</div>
                                                        <div className="text-sm text-slate-500 font-medium">{user.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <PlanBadge tier={user.subscription_tier} />
                                            </td>
                                            <td className="px-6 py-4">
                                                <StatusBadge status={user.subscription_status} />
                                            </td>
                                            <td className="px-6 py-4 text-sm font-bold text-slate-600">
                                                {new Date(user.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                            </td>
                                            <td className="px-6 py-4">
                                                {isUserAdmin(user) ? (
                                                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                                                        <Shield className="w-3 h-3" /> {getRoleLabel(user)}
                                                    </span>
                                                ) : <span className="text-slate-400 text-sm font-bold">—</span>}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="relative inline-block text-left">
                                                    <button 
                                                        onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === user.id ? null : user.id); }}
                                                        className="p-2 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors"
                                                    >
                                                        <MoreVertical className="w-5 h-5" />
                                                    </button>
                                                    {openMenuId === user.id && (
                                                        <>
                                                            <div className="fixed inset-0 z-40" onClick={() => setOpenMenuId(null)} />
                                                            <div className="absolute right-0 mt-2 w-52 z-50 bg-white border border-slate-200 rounded-xl shadow-lg p-1.5 origin-top-right">
                                                                <button 
                                                                    onClick={(e) => { e.stopPropagation(); setSelectedUser(user); setNewPlan(user.subscription_tier || 'explorer'); setShowPlanModal(true); setOpenMenuId(null); }}
                                                                    className="w-full text-left px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-[#006970] rounded-lg transition-colors flex items-center gap-2"
                                                                >
                                                                    <Crown className="w-4 h-4" /> Change Plan
                                                                </button>
                                                                <button 
                                                                    onClick={(e) => { e.stopPropagation(); handleToggleAdmin(user); }}
                                                                    className="w-full text-left px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-[#006970] rounded-lg transition-colors flex items-center gap-2"
                                                                >
                                                                    <Shield className="w-4 h-4" /> {isUserAdmin(user) ? 'Remove Admin Role' : 'Grant Admin Role'}
                                                                </button>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-6 py-4 flex items-center justify-between border-t border-slate-100 bg-slate-50/50 rounded-b-2xl">
                        <p className="text-sm font-bold text-slate-500">Page {page + 1} of {totalPages || 1}</p>
                        <div className="flex gap-2">
                            <button 
                                onClick={() => setPage(p => Math.max(0, p - 1))} 
                                disabled={page === 0}
                                className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm flex items-center gap-1"
                            >
                                <ChevronLeft className="w-4 h-4" /> Previous
                            </button>
                            <button 
                                onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} 
                                disabled={page >= totalPages - 1}
                                className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm flex items-center gap-1"
                            >
                                Next <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Change Plan Modal */}
                {showPlanModal && selectedUser && (
                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-slate-200 overflow-hidden">
                            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                                <div>
                                    <h3 className="text-lg font-bold tracking-tight text-slate-900">Change Plan</h3>
                                    <p className="text-sm font-medium text-slate-500">{selectedUser.email}</p>
                                </div>
                                <button onClick={() => setShowPlanModal(false)} className="p-2 rounded-xl hover:bg-slate-200 transition-colors">
                                    <X className="w-5 h-5 text-slate-500" />
                                </button>
                            </div>
                            <div className="p-6 space-y-3">
                                {['explorer', 'pulse', 'elite'].map(plan => (
                                    <label key={plan} className={`flex items-center justify-between px-4 py-3.5 rounded-xl border-2 cursor-pointer transition-all ${newPlan === plan ? 'border-[#006970] bg-[#f0fafa]/50' : 'border-slate-100 hover:border-slate-200'}`}>
                                        <div className="flex items-center gap-3">
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${newPlan === plan ? 'border-[#006970]' : 'border-slate-300'}`}>
                                                {newPlan === plan && <div className="w-2.5 h-2.5 bg-[#006970] rounded-full" />}
                                            </div>
                                            <span className="font-bold text-slate-900 capitalize">{plan}</span>
                                        </div>
                                        <PlanBadge tier={plan} />
                                    </label>
                                ))}
                            </div>
                            <div className="px-6 py-5 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                                <button 
                                    onClick={() => setShowPlanModal(false)}
                                    className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg font-bold text-sm hover:bg-slate-50 shadow-sm transition-all"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={handleChangePlan} 
                                    disabled={saving}
                                    className="px-5 py-2.5 bg-[#006970] hover:bg-[#005a60] text-white rounded-lg font-bold text-sm transition-all disabled:opacity-50 flex items-center gap-2 shadow-sm"
                                >
                                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Apply Changes'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
