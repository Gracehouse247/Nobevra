'use client';

import React, { useState, useEffect } from 'react';
import { 
    Users, Plus, Shield, Mail, MoreHorizontal, Check, Search, 
    Filter, ChevronDown, User, ShieldAlert, Edit2, ShieldCheck, X, Loader2
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { toast } from 'react-hot-toast';
import { formatDistanceToNow } from 'date-fns';
import { useEntitlements } from '@/context/EntitlementsContext';
import { useUpgradeModal } from '@/context/UpgradeModalContext';
import PremiumBadge from '@/components/shared/PremiumBadge';

type TeamMember = {
    id: string;
    user_id: string;
    role: string;
    users?: { email: string; raw_user_meta_data: { full_name?: string } };
    last_active?: string;
};

type PendingInvite = {
    id: string;
    email: string;
    role: string;
    created_at: string;
};

export default function TeamSettingsPage() {
    const { user } = useAuth();
    const { canUse } = useEntitlements();
    const { openUpgradeModal } = useUpgradeModal();
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [invites, setInvites] = useState<PendingInvite[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    
    // Invite form state
    const [inviteEmail, setInviteEmail] = useState('');
    const [inviteRole, setInviteRole] = useState('Staff');
    const [inviting, setInviting] = useState(false);
    const [cancellingId, setCancellingId] = useState<string | null>(null);
    const [resendingId, setResendingId] = useState<string | null>(null);

    // Map raw server errors to safe, user-friendly messages (SEC-07)
    const sanitizeError = (error: any, fallback: string): string => {
        const msg = typeof error?.message === 'string' ? error.message.toLowerCase() : '';
        if (msg.includes('already') || msg.includes('duplicate')) return 'This email has already been invited.';
        if (msg.includes('not found') || msg.includes('404'))    return 'The invitation could not be found.';
        if (msg.includes('unauthorized') || msg.includes('403')) return 'You do not have permission to perform this action.';
        if (msg.includes('limit') || msg.includes('quota'))     return 'Team member limit reached. Please upgrade your plan.';
        if (msg.includes('invalid') || msg.includes('email'))   return 'Please check the email address and try again.';
        return fallback;
    };

    useEffect(() => {
        if (!user) return;
        fetchTeamData();
    }, [user]);

    const fetchTeamData = async () => {
        setLoading(true);
        try {
            // 1. Get user's primary team
            const { data: teamData } = await supabase
                .from('teams')
                .select('id')
                .eq('owner_id', user!.id)
                .single();
            
            let currentTeamId = teamData?.id;

            if (!currentTeamId) {
                // Check if they are a member of a team instead
                const { data: memberData } = await supabase
                    .from('team_members')
                    .select('team_id')
                    .eq('user_id', user!.id)
                    .single();
                currentTeamId = memberData?.team_id;
            }

            if (!currentTeamId) {
                setLoading(false);
                return;
            }

            // 2. Fetch members
            const { data: teamMembers, error: membersErr } = await supabase
                .from('team_members')
                .select(`
                    id, user_id, role,
                    users ( email, raw_user_meta_data )
                `)
                .eq('team_id', currentTeamId);

            if (teamMembers) {
                // If the owner isn't explicitly in team_members, we should synthesize it for the UI
                const ownerEntry = teamMembers.find(m => m.user_id === user!.id);
                if (!ownerEntry && teamData?.id === currentTeamId) {
                    teamMembers.unshift({
                        id: 'owner-synthetic',
                        user_id: user!.id,
                        role: 'owner',
                        users: { 
                            email: user!.email || '', 
                            raw_user_meta_data: { full_name: user!.user_metadata?.full_name || 'My Account' } 
                        }
                    } as any);
                }
                setMembers(teamMembers as any);
            }

            // 3. Fetch pending invites
            const { data: pendingInvites } = await supabase
                .from('pending_invitations')
                .select('*')
                .eq('team_id', currentTeamId);
            
            if (pendingInvites) {
                setInvites(pendingInvites);
            }

        } catch (error) {
            console.error(error);
            toast.error('Failed to load team data');
        } finally {
            setLoading(false);
        }
    };

    const handleInvite = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inviteEmail) return;

        setInviting(true);
        try {
            // Get team id
            const { data: teamData } = await supabase.from('teams').select('id').eq('owner_id', user!.id).single();
            if (!teamData) throw new Error("Could not find your team. You may not be the team owner.");

            // Call edge function — use fetch directly so we can read the error body
            const session = (await supabase.auth.getSession()).data.session;
            const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/invite-team-member`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.access_token}`,
                    'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                },
                body: JSON.stringify({ email: inviteEmail, role: inviteRole.toLowerCase(), team_id: teamData.id })
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result?.error || `Server error ${res.status}`);
            }

            toast.success('Invitation sent successfully! The staff member will receive an email shortly.');
            setIsInviteModalOpen(false);
            setInviteEmail('');
            setInviteRole('Staff');
            fetchTeamData(); // Refresh lists
        } catch (error: any) {
            console.error('[Invite Error]', error);
            toast.error(sanitizeError(error, 'Failed to send invitation.'));
        } finally {
            setInviting(false);
        }
    };
    
    const handleCancelInvite = async (inviteId: string) => {
        if (!confirm('Are you sure you want to cancel this invitation?')) return;
        setCancellingId(inviteId);
        try {
            const { error } = await supabase
                .from('pending_invitations')
                .delete()
                .eq('id', inviteId);
            if (error) throw error;
            toast.success('Invitation cancelled.');
            setInvites(prev => prev.filter(inv => inv.id !== inviteId));
        } catch (error: any) {
            console.error('[Cancel Invite Error]', error);
            toast.error(sanitizeError(error, 'Failed to cancel invitation.'));
        } finally {
            setCancellingId(null);
        }
    };

    const handleResendInvite = async (inv: PendingInvite) => {
        setResendingId(inv.id);
        try {
            const session = (await supabase.auth.getSession()).data.session;
            const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/resend-team-invite`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.access_token}`,
                    'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                },
                body: JSON.stringify({ invite_id: inv.id })
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result?.error || `Server error ${res.status}`);

            toast.success('Invitation email re-sent and expiry extended by 7 days!');
        } catch (error: any) {
            console.error('[Resend Invite Error]', error);
            toast.error(sanitizeError(error, 'Failed to resend invitation.'));
        } finally {
            setResendingId(null);
        }
    };

    // Filter members
    const filteredMembers = members.filter(m => {
        const email = m.users?.email?.toLowerCase() || '';
        const name = m.users?.raw_user_meta_data?.full_name?.toLowerCase() || '';
        const s = search.toLowerCase();
        return email.includes(s) || name.includes(s);
    });

    return (
        <div className="min-h-full bg-noble-surface p-6 lg:p-8 pb-24 text-noble-text">
            <div className="max-w-[1400px] mx-auto">
                {/* ── Header ────────────────────────────────────────────────────────── */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-[14px] bg-noble-primary/10 flex items-center justify-center border border-noble-primary/20">
                            <Users className="w-6 h-6 text-noble-primary" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-[19px] font-black text-noble-text tracking-tight" style={{ fontFamily: 'Clash Display, Syne, Inter, sans-serif' }}>
                                    Team Management
                                </h1>
                                {!canUse('settings.team') && <PremiumBadge tier="elite" iconOnly />}
                            </div>
                            <p className="text-sm text-noble-muted font-medium">Manage your team members and control their access levels.</p>
                        </div>
                    </div>
                    
                    <button 
                        onClick={() => {
                            if (!canUse('settings.team')) {
                                openUpgradeModal({ featureName: 'Multi-User Team Workspace', requiredPlan: 'elite' });
                                return;
                            }
                            setIsInviteModalOpen(true);
                        }}
                        className="flex items-center gap-2 px-5 py-2.5 bg-noble-primary text-white font-bold text-[13px] rounded-xl hover:opacity-90 transition-opacity shadow-md shadow-noble-primary/20 active:scale-95"
                    >
                        <Plus className="w-4 h-4" />
                        Invite Member
                        {!canUse('settings.team') && <PremiumBadge tier="elite" iconOnly />}
                    </button>
                </div>

                {/* ── KPI Summary Cards ─────────────────────────────────────────────── */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {/* Total Members */}
                    <div className="bg-noble-card rounded-2xl p-5 border border-noble-card-border shadow-sm flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-noble-primary/10 flex items-center justify-center shrink-0 border border-noble-primary/20">
                            <Users className="w-5 h-5 text-noble-primary" />
                        </div>
                        <div>
                            <p className="text-[13px] font-semibold text-noble-muted mb-1">Total Members</p>
                            <p className="text-2xl font-black text-noble-text tracking-tight mb-1">{members.length}</p>
                            <p className="text-[11px] font-bold text-noble-muted">Active team members</p>
                        </div>
                    </div>

                    {/* Active Members */}
                    <div className="bg-noble-card rounded-2xl p-5 border border-noble-card-border shadow-sm flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
                            <ShieldCheck className="w-5 h-5 text-emerald-500" />
                        </div>
                        <div>
                            <p className="text-[13px] font-semibold text-noble-muted mb-1">Active Members</p>
                            <p className="text-2xl font-black text-noble-text tracking-tight mb-1">{members.length}</p>
                            <p className="text-[11px] font-bold text-emerald-500">Currently active</p>
                        </div>
                    </div>

                    {/* Pending Invites */}
                    <div className="bg-noble-card rounded-2xl p-5 border border-noble-card-border shadow-sm flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0 border border-purple-500/20">
                            <User className="w-5 h-5 text-purple-500" />
                        </div>
                        <div>
                            <p className="text-[13px] font-semibold text-noble-muted mb-1">Pending Invites</p>
                            <p className="text-2xl font-black text-noble-text tracking-tight mb-1">{invites.length}</p>
                            <p className="text-[11px] font-bold text-noble-muted">Awaiting acceptance</p>
                        </div>
                    </div>

                    {/* Roles */}
                    <div className="bg-noble-card rounded-2xl p-5 border border-noble-card-border shadow-sm flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0 border border-amber-500/20">
                            <Shield className="w-5 h-5 text-amber-500" />
                        </div>
                        <div>
                            <p className="text-[13px] font-semibold text-noble-muted mb-1">Roles</p>
                            <p className="text-2xl font-black text-noble-text tracking-tight mb-1">3</p>
                            <p className="text-[11px] font-bold text-noble-muted">Different roles</p>
                        </div>
                    </div>
                </div>

                {/* ── Main Grid Layout ──────────────────────────────────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column (Members & Invites) */}
                    <div className="lg:col-span-2 space-y-6">
                        
                        {/* Team Members List */}
                        <div className="bg-noble-card rounded-2xl border border-noble-card-border shadow-sm overflow-hidden">
                            <div className="p-6 pb-0">
                                <h3 className="font-bold text-noble-text text-[15px] mb-4">Team Members</h3>
                                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-noble-muted" />
                                        <input 
                                            type="text" 
                                            placeholder="Search team members..." 
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            className="w-full pl-9 pr-4 py-2 border border-noble-card-border bg-noble-interactive-bg rounded-xl text-[13px] font-medium text-noble-text placeholder:text-noble-muted focus:outline-none focus:ring-1 focus:ring-noble-primary"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="flex items-center gap-2 px-4 py-2 border border-noble-card-border rounded-xl text-[13px] font-bold text-noble-muted hover:bg-noble-interactive-bg hover:text-noble-text transition-colors">
                                            <Filter className="w-4 h-4" /> Filter
                                        </button>
                                        <button className="flex items-center gap-2 px-4 py-2 border border-noble-card-border rounded-xl text-[13px] font-bold text-noble-muted hover:bg-noble-interactive-bg hover:text-noble-text transition-colors">
                                            All Roles <ChevronDown className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-y border-noble-card-border bg-noble-interactive-bg/50">
                                            <th className="px-6 py-3 text-[11px] font-bold text-noble-muted uppercase tracking-wider">Member</th>
                                            <th className="px-6 py-3 text-[11px] font-bold text-noble-muted uppercase tracking-wider">Role</th>
                                            <th className="px-6 py-3 text-[11px] font-bold text-noble-muted uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-[11px] font-bold text-noble-muted uppercase tracking-wider">Last Active</th>
                                            <th className="px-6 py-3 text-[11px] font-bold text-noble-muted uppercase tracking-wider text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-noble-card-border">
                                        {loading ? (
                                            <tr>
                                                <td colSpan={5} className="px-6 py-10 text-center">
                                                    <Loader2 className="w-6 h-6 text-noble-primary animate-spin mx-auto" />
                                                </td>
                                            </tr>
                                        ) : filteredMembers.map((member, i) => {
                                            const name = member.users?.raw_user_meta_data?.full_name || 'My Account';
                                            const email = member.users?.email || '';
                                            const initials = name.substring(0, 2).toUpperCase();
                                            const isOwner = member.role === 'owner';
                                            const bgColor = isOwner ? 'bg-blue-500/10 text-blue-500' : 'bg-purple-500/10 text-purple-500';
                                            
                                            return (
                                                <tr key={member.id} className="hover:bg-noble-interactive-bg transition-colors group">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-[13px] border ${isOwner ? 'border-blue-500/20' : 'border-purple-500/20'} ${bgColor}`}>
                                                                {initials}
                                                            </div>
                                                            <div>
                                                                <p className="text-[13px] font-bold text-noble-text">{name}</p>
                                                                <p className="text-[12px] text-noble-muted">{email}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold border ${
                                                            isOwner 
                                                            ? 'bg-blue-500/10 border-blue-500/20 text-blue-500' 
                                                            : 'bg-purple-500/10 border-purple-500/20 text-purple-500'
                                                        }`}>
                                                            {isOwner ? <ShieldAlert className="w-3 h-3" /> : <Shield className="w-3 h-3" />}
                                                            {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-emerald-500">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                            Active
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="text-[12px] font-medium text-noble-muted">
                                                            Today, 10:24 AM
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button className="p-1.5 border border-noble-card-border hover:border-noble-muted rounded-md text-noble-muted hover:text-noble-text bg-noble-card transition-colors">
                                                                <Edit2 className="w-4 h-4" />
                                                            </button>
                                                            <button className="p-1.5 border border-noble-card-border hover:border-noble-muted rounded-md text-noble-muted hover:text-noble-text bg-noble-card transition-colors">
                                                                <MoreHorizontal className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        {!loading && filteredMembers.length === 0 && (
                                            <tr>
                                                <td colSpan={5} className="px-6 py-10 text-center text-noble-muted text-[13px]">
                                                    No team members found matching your search.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="p-4 border-t border-noble-card-border flex items-center justify-between">
                                <p className="text-[12px] font-medium text-noble-muted">
                                    Showing 1 to {filteredMembers.length} of {members.length} members
                                </p>
                                <div className="flex items-center gap-1">
                                    <button className="w-8 h-8 flex items-center justify-center rounded-md border border-noble-card-border text-noble-muted hover:bg-noble-interactive-bg transition-colors">&lt;</button>
                                    <button className="w-8 h-8 flex items-center justify-center rounded-md bg-noble-primary text-white font-bold shadow-sm shadow-noble-primary/20">1</button>
                                    <button className="w-8 h-8 flex items-center justify-center rounded-md border border-noble-card-border text-noble-muted hover:bg-noble-interactive-bg transition-colors">&gt;</button>
                                </div>
                            </div>
                        </div>

                        {/* Pending Invitations Section */}
                        <div className="bg-noble-card rounded-2xl border border-noble-card-border shadow-sm p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <Mail className="w-5 h-5 text-noble-primary" />
                                <h3 className="font-bold text-noble-text text-[15px]">Pending Invitations</h3>
                            </div>
                            
                            {invites.length > 0 ? (
                                <div className="space-y-4">
                                    {invites.map(inv => (
                                        <div key={inv.id} className="flex items-center justify-between p-4 border border-noble-card-border rounded-xl gap-3">
                                            <div className="min-w-0">
                                                <p className="text-[13px] font-bold text-noble-text truncate">{inv.email}</p>
                                                <p className="text-[12px] text-noble-muted">Invited {formatDistanceToNow(new Date(inv.created_at))} ago • Role: <span className="font-semibold capitalize text-noble-text">{inv.role}</span></p>
                                            </div>
                                            <div className="flex items-center gap-2 shrink-0">
                                                {/* Resend Button */}
                                                <button
                                                    onClick={() => handleResendInvite(inv)}
                                                    disabled={resendingId === inv.id || cancellingId === inv.id}
                                                    className="flex items-center gap-1.5 text-[12px] font-bold text-blue-500 bg-blue-500/10 px-3 py-1.5 rounded-md hover:bg-blue-500/20 border border-transparent hover:border-blue-500/20 transition-all disabled:opacity-50"
                                                >
                                                    {resendingId === inv.id ? (
                                                        <Loader2 className="w-3 h-3 animate-spin" />
                                                    ) : (
                                                        <Mail className="w-3 h-3" />
                                                    )}
                                                    Resend
                                                </button>
                                                {/* Cancel Button */}
                                                <button
                                                    onClick={() => handleCancelInvite(inv.id)}
                                                    disabled={cancellingId === inv.id || resendingId === inv.id}
                                                    className="flex items-center gap-1.5 text-[12px] font-bold text-rose-500 bg-rose-500/10 px-3 py-1.5 rounded-md hover:bg-rose-500/20 border border-transparent hover:border-rose-500/20 transition-all disabled:opacity-50"
                                                >
                                                    {cancellingId === inv.id ? (
                                                        <Loader2 className="w-3 h-3 animate-spin" />
                                                    ) : (
                                                        <X className="w-3 h-3" />
                                                    )}
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-12 flex flex-col items-center justify-center text-center">
                                    <div className="w-14 h-14 bg-noble-primary/10 border border-noble-primary/20 rounded-2xl flex items-center justify-center mb-4 text-noble-primary">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-[15px] font-bold text-noble-text mb-1">No pending invitations</h3>
                                    <p className="text-[13px] text-noble-muted font-medium mb-6">
                                        Invite new team members to get started.
                                    </p>
                                    <button 
                                        onClick={() => setIsInviteModalOpen(true)}
                                        className="flex items-center gap-2 px-5 py-2 border border-noble-card-border rounded-xl text-[13px] font-bold text-noble-text hover:bg-noble-interactive-bg transition-colors"
                                    >
                                        <Users className="w-4 h-4 text-noble-muted" />
                                        Invite Member
                                    </button>
                                </div>
                            )}
                        </div>

                    </div>

                    {/* Right Column (Sidebar) */}
                    <div className="space-y-6">
                        
                        {/* Roles & Permissions Card */}
                        <div className="bg-noble-card rounded-2xl border border-noble-card-border shadow-sm p-6">
                            <div className="flex items-center gap-3 mb-2">
                                <Shield className="w-5 h-5 text-noble-primary" />
                                <h3 className="font-bold text-noble-text text-[15px]">Roles & Permissions</h3>
                            </div>
                            <p className="text-[12px] text-noble-muted font-medium mb-6">Manage roles and their permissions</p>
                            
                            <div className="space-y-3 mb-6">
                                {/* Role items */}
                                <div className="p-4 border border-noble-card-border rounded-xl">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-0.5 w-6 h-6 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                                            <ShieldAlert className="w-3.5 h-3.5 text-blue-500" />
                                        </div>
                                        <div>
                                            <p className="text-[13px] font-bold text-noble-text">Owner</p>
                                            <p className="text-[12px] text-noble-muted">Full access to all features</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 border border-noble-card-border rounded-xl">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-0.5 w-6 h-6 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                                            <Shield className="w-3.5 h-3.5 text-purple-500" />
                                        </div>
                                        <div>
                                            <p className="text-[13px] font-bold text-noble-text">Staff</p>
                                            <p className="text-[12px] text-noble-muted">Access to assigned modules</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 border border-noble-card-border rounded-xl">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-0.5 w-6 h-6 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                                            <User className="w-3.5 h-3.5 text-amber-500" />
                                        </div>
                                        <div>
                                            <p className="text-[13px] font-bold text-noble-text">Viewer</p>
                                            <p className="text-[12px] text-noble-muted">Read-only access</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-noble-card-border rounded-xl text-[13px] font-bold text-noble-text hover:bg-noble-interactive-bg transition-colors">
                                <Shield className="w-4 h-4 text-noble-muted" />
                                Manage Roles
                            </button>
                        </div>

                        {/* Security & Access Card */}
                        <div className="bg-noble-card rounded-2xl border border-noble-card-border shadow-sm p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                                <h3 className="font-bold text-noble-text text-[15px]">Security & Access</h3>
                            </div>
                            
                            <div className="space-y-4 mb-8">
                                <div className="flex items-center gap-3">
                                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                                    <p className="text-[13px] font-medium text-noble-muted">Two-factor authentication enforced</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                                    <p className="text-[13px] font-medium text-noble-muted">Secure role-based access control</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                                    <p className="text-[13px] font-medium text-noble-muted">Activity logs and audit trail</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                                    <p className="text-[13px] font-medium text-noble-muted">Invite links expire in 7 days</p>
                                </div>
                            </div>

                            <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-noble-card-border rounded-xl text-[13px] font-bold text-noble-text hover:bg-noble-interactive-bg transition-colors">
                                <ShieldCheck className="w-4 h-4 text-noble-muted" />
                                Security Settings
                            </button>
                        </div>

                    </div>
                </div>

                {/* ── Invite Modal ────────────────────────────────────────────────── */}
                {isInviteModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 dark:bg-black/40 backdrop-blur-sm p-4">
                        <div className="bg-noble-card w-full max-w-md rounded-2xl shadow-xl overflow-hidden border border-noble-card-border animate-in zoom-in-95 duration-200">
                            <div className="p-6 border-b border-noble-card-border flex items-center justify-between">
                                <h2 className="text-lg font-bold text-noble-text">Invite Team Member</h2>
                                <button onClick={() => setIsInviteModalOpen(false)} className="p-2 hover:bg-noble-interactive-bg rounded-xl text-noble-muted transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <form onSubmit={handleInvite} className="p-6 space-y-5">
                                <div>
                                    <label className="block text-[13px] font-bold text-noble-text mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        value={inviteEmail}
                                        onChange={(e) => setInviteEmail(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-noble-interactive-bg border border-noble-card-border rounded-xl text-sm text-noble-text focus:outline-none focus:ring-1 focus:ring-noble-primary"
                                        placeholder="colleague@company.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[13px] font-bold text-noble-text mb-2">Assign Role</label>
                                    <select 
                                        value={inviteRole}
                                        onChange={(e) => setInviteRole(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-noble-interactive-bg border border-noble-card-border rounded-xl text-sm text-noble-text focus:outline-none focus:ring-1 focus:ring-noble-primary"
                                    >
                                        <option value="Staff">Staff (Module Access)</option>
                                        <option value="Viewer">Viewer (Read Only)</option>
                                    </select>
                                </div>
                                <div className="pt-2">
                                    <button 
                                        type="submit"
                                        disabled={inviting}
                                        className="w-full py-3 bg-noble-primary text-white font-bold text-[14px] rounded-xl hover:opacity-90 transition-opacity shadow-md shadow-noble-primary/20 disabled:opacity-70"
                                    >
                                        {inviting ? 'Sending Invite...' : 'Send Invitation'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
