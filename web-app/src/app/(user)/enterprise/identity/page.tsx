'use client';

import React, { useState, useEffect } from 'react';
import { 
    Users, Download, Plus, Search, Filter, LayoutGrid, 
    ChevronDown, MoreHorizontal, Shield, Zap, Sparkles,
    Building2, FileText, Info, ArrowRight, UserPlus, Loader2
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';

type TeamMember = {
    id: string;
    initials: string;
    color: string;
    name: string;
    email: string;
    role: string;
    roleColor: string;
    status: string;
    statusColor: string;
    dotColor: string;
    performance: string;
    lastActive: string;
};

export default function EnterpriseIdentityPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('Members Directory');
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    
    // Real Metrics State
    const [identityVelocity, setIdentityVelocity] = useState(0);
    const [leadIntelligence, setLeadIntelligence] = useState(0);

    // Multi-currency aware formatting function (placeholder for actual implementation)
    const [userCurrency, setUserCurrency] = useState('USD');
    useEffect(() => {
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (timeZone.includes('Europe')) setUserCurrency('EUR');
        else if (timeZone.includes('Africa/Lagos')) setUserCurrency('NGN');
        else if (timeZone.includes('London')) setUserCurrency('GBP');
    }, []);

    useEffect(() => {
        if (user) {
            fetchMembers();
        }
    }, [user]);

    const fetchMembers = async () => {
        try {
            setLoading(true);
            
            // 1. Get user's primary team
            let currentTeamId = null;
            const { data: teamData } = await supabase
                .from('teams')
                .select('id')
                .eq('owner_id', user!.id)
                .single();
            
            currentTeamId = teamData?.id;

            if (!currentTeamId) {
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

            // 2. Fetch team members
            const { data: teamMembers, error: membersErr } = await supabase
                .from('team_members')
                .select('id, user_id, role')
                .eq('team_id', currentTeamId);

            if (membersErr) {
                console.error("Error fetching members:", membersErr);
                setLoading(false);
                return;
            }

            const rawMembers = teamMembers || [];
            
            // 3. Fetch corresponding profiles for these users
            const userIds = rawMembers.map(m => m.user_id).filter(Boolean);
            
            // Make sure the current user is included if they are the owner but not explicitly in team_members
            if (teamData?.id === currentTeamId && !userIds.includes(user!.id)) {
                userIds.push(user!.id);
                rawMembers.unshift({
                    id: 'owner-synthetic',
                    user_id: user!.id,
                    role: 'owner'
                } as any);
            }

            let profilesMap: Record<string, any> = {};
            if (userIds.length > 0) {
                const { data: profilesData, error: profilesErr } = await supabase
                    .from('profiles')
                    .select('id, email, display_name')
                    .in('id', userIds);
                    
                if (!profilesErr && profilesData) {
                    profilesData.forEach(p => {
                        profilesMap[p.id] = p;
                    });
                }
            }

            // 4. Fetch Real Metrics (Identity Velocity & Lead Intelligence)
            // Note: RLS will automatically scope these to the user's accessible data
            const { count: scansCount } = await supabase
                .from('scan_logs')
                .select('*', { count: 'exact', head: true });
                
            const { count: leadsCount } = await supabase
                .from('identity_leads')
                .select('*', { count: 'exact', head: true });

            setIdentityVelocity(scansCount || 0);
            setLeadIntelligence(leadsCount || 0);

            // Fetch leads explicitly for performance mapping
            const { data: userLeads } = await supabase
                .from('identity_leads')
                .select('identity_id, identities(user_id)');

            const leadsPerUser = (userLeads || []).reduce((acc: any, lead: any) => {
                const uid = lead.identities?.user_id;
                if (uid) {
                    acc[uid] = (acc[uid] || 0) + 1;
                }
                return acc;
            }, {});

            // Map DB data to UI format
            const colors = [
                { color: 'bg-blue-50 text-blue-600' },
                { color: 'bg-purple-50 text-purple-600' },
                { color: 'bg-amber-50 text-amber-600' },
                { color: 'bg-emerald-50 text-emerald-600' }
            ];

            const mappedMembers = rawMembers.map((m: any, index: number) => {
                const profile = profilesMap[m.user_id] || {};
                
                // Fallbacks
                let fullName = profile.display_name;
                let email = profile.email;
                
                // If it's the current user, we can fallback to auth object
                if (m.user_id === user!.id) {
                    fullName = fullName || user!.user_metadata?.full_name || 'My Account';
                    email = email || user!.email;
                }
                
                fullName = fullName || email?.split('@')[0] || 'Unknown User';
                email = email || '';
                
                const roleStr = m.role || 'Member';
                
                // Get initials
                const initials = fullName
                    .split(' ')
                    .map((n: string) => n[0])
                    .join('')
                    .substring(0, 2)
                    .toUpperCase() || '??';

                const colorObj = colors[index % colors.length];

                // Role colors
                let roleColor = 'text-slate-600 bg-slate-50';
                if (roleStr.toLowerCase() === 'owner') roleColor = 'text-blue-600 bg-blue-50';
                else if (roleStr.toLowerCase() === 'admin') roleColor = 'text-purple-600 bg-purple-50';
                else if (roleStr.toLowerCase() === 'staff') roleColor = 'text-emerald-600 bg-emerald-50';

                return {
                    id: m.id,
                    initials,
                    color: colorObj.color,
                    name: fullName,
                    email,
                    role: roleStr.charAt(0).toUpperCase() + roleStr.slice(1),
                    roleColor,
                    status: 'Active',
                    statusColor: 'text-emerald-600 bg-emerald-50',
                    dotColor: 'bg-emerald-500',
                    performance: (leadsPerUser[m.user_id] || 0).toString(),
                    lastActive: 'Just now'
                };
            });

            setMembers(mappedMembers);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat(undefined, { style: 'currency', currency: userCurrency }).format(amount);
    };

    const stats = [
        { label: 'Total Members', value: members.length.toString(), trend: '+0 new this month', trendBadge: '+ 0', icon: Users },
        { label: 'Identity Velocity', value: identityVelocity.toLocaleString(), trend: '+0% vs last month', trendBadge: '+ 0%', icon: Zap },
        { label: 'Lead Intelligence', value: leadIntelligence.toLocaleString(), trend: '+0 new leads', trendBadge: '+ 0', icon: Shield },
    ];

    const tabs = ['Members Directory', 'Brand & Assets', 'Identity Presets', 'Access Control', 'Activity Log'];

    const filteredMembers = members.filter(m => 
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleExportAnalytics = () => {
        if (members.length === 0) return;
        
        const headers = ['Name', 'Email', 'Role', 'Status', 'Performance', 'Last Active'];
        const csvRows = [headers.join(',')];
        
        filteredMembers.forEach(m => {
            const row = [
                `"${m.name}"`, 
                `"${m.email}"`, 
                `"${m.role}"`, 
                `"${m.status}"`, 
                `"${m.performance}"`, 
                `"${m.lastActive}"`
            ];
            csvRows.push(row.join(','));
        });
        
        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', `Identity_Hub_Analytics_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const handleProvisionMembers = () => {
        router.push('/settings/team');
    };

    return (
        <div className="min-h-screen bg-white pb-24 font-inter text-slate-800">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto px-8 pt-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-50 text-[#166FBB] rounded-xl flex items-center justify-center shrink-0">
                            <Building2 size={24} className="fill-[#166FBB]/20" />
                        </div>
                        <div>
                            <h1 className="text-[19px] font-bold text-slate-900 mb-1 leading-tight">
                                Organization <span className="text-[#166FBB]">Identity Hub</span>
                            </h1>
                            <p className="text-[13px] text-slate-500">
                                Configure organization branding presets and manage corporate assets.
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={handleExportAnalytics}
                            disabled={loading || members.length === 0}
                            className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50"
                        >
                            <Download size={16} />
                            Export Analytics
                        </button>
                        <button 
                            onClick={handleProvisionMembers}
                            className="px-5 py-2.5 bg-[#166FBB] text-white rounded-xl text-[13px] font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-[0_4px_14px_rgba(22,111,187,0.25)]"
                        >
                            <UserPlus size={16} />
                            Provision Members
                        </button>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-10 h-10 rounded-xl bg-blue-50/50 border border-blue-100 flex items-center justify-center text-[#166FBB]">
                                    <stat.icon size={20} />
                                </div>
                                <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded-md text-[11px] font-bold tracking-wide">
                                    {stat.trendBadge}
                                </span>
                            </div>
                            <div>
                                <p className="text-[13px] text-slate-500 font-medium mb-1">{stat.label}</p>
                                <h3 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">{stat.value}</h3>
                                <p className="text-[12px] font-semibold text-emerald-600">{stat.trend}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div className="flex items-center border-b border-slate-200 mb-6 relative">
                    <div className="flex items-center gap-8 overflow-x-auto no-scrollbar w-full">
                        {tabs.map(tab => (
                            <button 
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-4 text-[13px] font-bold whitespace-nowrap transition-colors relative ${
                                    activeTab === tab 
                                        ? 'text-[#166FBB]' 
                                        : 'text-slate-500 hover:text-slate-800'
                                }`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#166FBB] rounded-t-full" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Search & Filters */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative w-full md:w-[320px]">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input 
                                type="text"
                                placeholder="Search by name, role, or department..."
                                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:border-[#166FBB] focus:ring-1 focus:ring-[#166FBB]"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                            <Filter size={16} /> Filter
                        </button>
                        <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-[#166FBB] hover:bg-slate-50">
                            <LayoutGrid size={18} />
                        </button>
                    </div>
                    
                    <div className="w-full md:w-auto">
                        <button className="w-full md:w-auto px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-between gap-4">
                            All Status <ChevronDown size={14} className="text-slate-400" />
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden mb-6 min-h-[300px]">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                            <Loader2 className="w-8 h-8 animate-spin mb-4 text-[#166FBB]" />
                            <p className="text-[13px] font-medium">Loading organization members...</p>
                        </div>
                    ) : filteredMembers.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                            <Users className="w-10 h-10 mb-4 opacity-20" />
                            <p className="text-[13px] font-medium">No members found.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                        <th className="px-6 py-4">Member</th>
                                        <th className="px-6 py-4">Role</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Performance</th>
                                        <th className="px-6 py-4">Last Active</th>
                                        <th className="px-6 py-4 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filteredMembers.map((member, idx) => (
                                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-bold ${member.color}`}>
                                                        {member.initials}
                                                    </div>
                                                    <div>
                                                        <p className="text-[14px] font-bold text-slate-900">{member.name}</p>
                                                        <p className="text-[12px] text-slate-500">{member.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide capitalize ${member.roleColor}`}>
                                                    {member.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide ${member.statusColor}`}>
                                                    <div className={`w-1.5 h-1.5 rounded-full ${member.dotColor}`} />
                                                    {member.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-[14px] font-bold text-slate-900">{member.performance}</p>
                                                <p className="text-[11px] text-slate-500">Captured Leads</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-[13px] font-medium text-slate-600">{member.lastActive}</span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors">
                                                    <MoreHorizontal size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    
                    {/* Pagination */}
                    <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[13px] font-medium text-slate-500">
                            Showing 1 to {filteredMembers.length} of {members.length} members
                        </span>
                        <div className="flex items-center gap-1">
                            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-50" disabled>
                                &lt;
                            </button>
                            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#166FBB] text-white font-bold text-[13px]">
                                1
                            </button>
                            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50" disabled>
                                &gt;
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Tip Banner */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center shrink-0">
                            <Info size={16} className="text-slate-400" />
                        </div>
                        <p className="text-[13px] text-slate-600 font-medium">
                            Keep your organization identity up to date for better security and performance insights.
                        </p>
                    </div>
                    <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-[13px] font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2 shrink-0">
                        View Identity Best Practices <ArrowRight size={14} />
                    </button>
                </div>
                
            </div>
        </div>
    );
}
