'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Search, Filter, Download, ArrowLeft, Mail, Phone, Building2, UserPlus, Trash2, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function LeadsCRMPage() {
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Fetch identities for this user
        const { data: identities } = await supabase
            .from('identities')
            .select('id')
            .eq('user_id', user.id);
            
        if (identities && identities.length > 0) {
            const identityIds = identities.map((i: any) => i.id);
            const { data: leadsData } = await supabase
                .from('identity_leads')
                .select('*')
                .in('identity_id', identityIds)
                .order('created_at', { ascending: false });
                
            setLeads(leadsData || []);
        }
        setLoading(false);
    };

    const updateLeadStatus = async (id: string, newStatus: string) => {
        setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
        await supabase
            .from('identity_leads')
            .update({ status: newStatus })
            .eq('id', id);
    };

    const deleteLead = async (id: string) => {
        if (!confirm('Are you sure you want to delete this lead?')) return;
        setLeads(leads.filter(l => l.id !== id));
        await supabase.from('identity_leads').delete().eq('id', id);
    };

    const filteredLeads = leads.filter(lead => {
        const matchesSearch = (lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              lead.company?.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesStatus = statusFilter === 'all' || (lead.status || 'new') === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const exportCSV = () => {
        const headers = ['Name', 'Email', 'Phone', 'Company', 'Job Title', 'Status', 'Date Captured'];
        const csvContent = [
            headers.join(','),
            ...filteredLeads.map(l => [
                `"${l.name || ''}"`,
                `"${l.email || ''}"`,
                `"${l.phone || ''}"`,
                `"${l.company || ''}"`,
                `"${l.job_title || ''}"`,
                `"${l.status || 'new'}"`,
                `"${new Date(l.created_at).toLocaleDateString()}"`
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', 'leads_export.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'converted': return 'bg-purple-50 text-purple-600 border-purple-100';
            case 'qualified': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'contacted': return 'bg-blue-50 text-blue-600 border-blue-100';
            default: return 'bg-slate-50 dark:bg-[#0D1B2E] text-slate-600 dark:text-slate-400 dark:text-slate-500 border-noble-border';
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-transparent dark:bg-[#060D1A] pb-24 font-inter text-slate-800 dark:text-slate-100">
            <div className="max-w-[1400px] mx-auto px-8 pt-8">
                <Link href="/networking" className="inline-flex items-center gap-2 text-[13px] font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:text-noble-text transition-colors mb-6">
                    <ArrowLeft size={16} /> Back to Smart Connect
                </Link>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-[24px] font-bold text-noble-text leading-tight mb-1">
                            Lead Management (CRM)
                        </h1>
                        <p className="text-[14px] text-slate-500 dark:text-slate-400 dark:text-slate-500">Manage and track contacts captured from your networking cards.</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2 bg-noble-surface dark:bg-noble-card border border-noble-border rounded-xl text-[13px] font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-[#0D1B2E] transition-colors shadow-sm">
                            <Download size={16} /> Export CSV
                        </button>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-1 max-w-md">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                        <input 
                            type="text" 
                            placeholder="Search name, email, or company..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-noble-surface dark:bg-noble-card border border-noble-border rounded-xl text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                        />
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <select 
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="appearance-none pl-10 pr-8 py-2.5 bg-noble-surface dark:bg-noble-card border border-noble-border rounded-xl text-[13px] font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer shadow-sm"
                            >
                                <option value="all">All Statuses</option>
                                <option value="new">New Leads</option>
                                <option value="contacted">Contacted</option>
                                <option value="qualified">Qualified</option>
                                <option value="converted">Converted</option>
                            </select>
                            <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                        </div>
                    </div>
                </div>

                <div className="bg-noble-surface dark:bg-noble-card rounded-2xl border border-noble-border shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-100 dark:border-noble-border bg-slate-50 dark:bg-[#0D1B2E]/50 text-[11px] font-bold text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                                    <th className="px-6 py-4">Contact Detail</th>
                                    <th className="px-6 py-4">Company & Role</th>
                                    <th className="px-6 py-4">Captured</th>
                                    <th className="px-6 py-4">Pipeline Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="py-12 text-center text-slate-500 dark:text-slate-400 dark:text-slate-500 text-[13px]">
                                            Loading CRM data...
                                        </td>
                                    </tr>
                                ) : filteredLeads.length > 0 ? (
                                    filteredLeads.map((lead) => (
                                        <tr key={lead.id} className="border-b border-slate-50 hover:bg-slate-50 dark:hover:bg-white/5 dark:bg-[#0D1B2E]/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-[13px] font-bold shrink-0">
                                                        {lead.name?.substring(0,2).toUpperCase() || '??'}
                                                    </div>
                                                    <div>
                                                        <div className="text-[14px] font-bold text-noble-text">{lead.name}</div>
                                                        <div className="text-[12px] text-slate-500 dark:text-slate-400 dark:text-slate-500 flex items-center gap-2 mt-0.5">
                                                            <Mail size={12} /> {lead.email}
                                                        </div>
                                                        {lead.phone && (
                                                            <div className="text-[12px] text-slate-500 dark:text-slate-400 dark:text-slate-500 flex items-center gap-2 mt-0.5">
                                                                <Phone size={12} /> {lead.phone}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-[13px] font-semibold text-noble-text mb-0.5">
                                                    <Building2 size={14} className="text-slate-400 dark:text-slate-500" /> {lead.company || 'Unknown Company'}
                                                </div>
                                                <div className="text-[12px] text-slate-500 dark:text-slate-400 dark:text-slate-500 ml-6">
                                                    {lead.job_title || 'Marketing Manager'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-[13px] font-semibold text-noble-text">
                                                    {new Date(lead.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </div>
                                                <div className="text-[12px] text-slate-500 dark:text-slate-400 dark:text-slate-500 mt-0.5 flex items-center gap-1">
                                                    <Calendar size={12} /> {new Date(lead.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <select 
                                                    value={lead.status || 'new'}
                                                    onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                                                    className={`px-3 py-1.5 rounded-lg text-[12px] font-bold uppercase tracking-wider border cursor-pointer focus:outline-none transition-colors ${getStatusStyle(lead.status || 'new')}`}
                                                >
                                                    <option value="new">New</option>
                                                    <option value="contacted">Contacted</option>
                                                    <option value="qualified">Qualified</option>
                                                    <option value="converted">Converted</option>
                                                </select>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <a href={`mailto:${lead.email}`} className="w-8 h-8 rounded-lg bg-blue-50 text-[#166FBB] flex items-center justify-center hover:bg-blue-100 transition-colors" title="Send Email">
                                                        <Mail size={14} />
                                                    </a>
                                                    <button onClick={() => deleteLead(lead.id)} className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition-colors" title="Delete">
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="py-16 text-center">
                                            <div className="w-16 h-16 bg-slate-50 dark:bg-[#0D1B2E] rounded-2xl flex items-center justify-center mx-auto mb-4">
                                                <UserPlus size={24} className="text-slate-400 dark:text-slate-500" />
                                            </div>
                                            <h3 className="text-[15px] font-bold text-noble-text mb-1">No leads found</h3>
                                            <p className="text-[13px] text-slate-500 dark:text-slate-400 dark:text-slate-500">
                                                {searchTerm || statusFilter !== 'all' 
                                                    ? 'Try adjusting your search filters.' 
                                                    : 'Share your digital card to start capturing leads.'}
                                            </p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
