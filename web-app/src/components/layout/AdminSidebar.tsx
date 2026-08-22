'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
    LayoutDashboard, FileText, Settings, Users, 
    MessageSquare, BarChart3, CreditCard, LogOut,
    Plus, ImageIcon, Send, Star
} from 'lucide-react';
import { clearAdminSession } from '@/lib/cmsApi';
import { brand } from '@/lib/brand';

const SidebarItem = ({ 
    icon: Icon, 
    label, 
    href, 
    active = false 
}: { 
    icon: any, 
    label: string, 
    href: string, 
    active?: boolean 
}) => (
    <Link href={href}>
        <div className={`flex items-center gap-2.5 px-3 py-1.5 rounded-md cursor-pointer transition-colors duration-150 ${
            active 
            ? 'bg-[#f0fafa] text-[#006970] font-medium' 
            : 'text-slate-600 dark:text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 dark:bg-[#112030] hover:text-noble-text font-medium'
        }`}>
            <Icon className={`w-4 h-4 ${active ? 'text-[#006970]' : 'text-slate-400 dark:text-slate-500'}`} />
            <span className="text-[13px]">{label}</span>
        </div>
    </Link>
);

const SectionHeader = ({ label }: { label: string }) => (
    <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 mt-5 mb-1.5">
        {label}
    </div>
);

export default function AdminSidebar({ isOpen = false, onClose = () => {} }: { isOpen?: boolean, onClose?: () => void }) {
    const pathname = usePathname();
    const router = useRouter();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    // Close sidebar on mobile when route changes
    React.useEffect(() => {
        if (isOpen) {
            onClose();
        }
    }, [pathname]);

    const handleSignOut = () => {
        if (!confirm('Sign out from admin panel?')) return;
        clearAdminSession();
        router.push('/admin/login');
    };

    if (!mounted) return null;

    return (
        <>
        {isOpen && (
            <div className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm" onClick={onClose} />
        )}
        <aside className={`w-64 bg-noble-surface dark:bg-noble-card border-r border-noble-border flex flex-col h-screen fixed lg:sticky top-0 left-0 z-50 shrink-0 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
            {/* Logo Area */}
            <div className="h-14 flex items-center px-6 border-b border-slate-100 dark:border-noble-border shrink-0">
                <Link href="/admin/dashboard" className="flex items-center gap-3 group">
                    <img 
                        src={brand.assets.logo} 
                        alt="Nobevra" 
                        className="h-6 w-auto object-contain" 
                    />
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto custom-scrollbar px-3 py-4 flex flex-col gap-0.5">
                <SectionHeader label="Overview" />
                <SidebarItem icon={LayoutDashboard} label="Dashboard" href="/admin/dashboard" active={pathname === '/admin/dashboard'} />
                <SidebarItem icon={BarChart3} label="Analytics" href="/admin/analytics" active={pathname === '/admin/analytics'} />
                
                <SectionHeader label="Content Hub" />
                <SidebarItem icon={FileText} label="CMS Hub" href="/admin/cms" active={pathname === '/admin/cms' || pathname.startsWith('/admin/cms/')} />
                <SidebarItem icon={Settings} label="SEO Engine" href="/admin/seo" active={pathname === '/admin/seo'} />

                <SectionHeader label="Operations" />
                <SidebarItem icon={Users} label="User Management" href="/admin/users" active={pathname === '/admin/users'} />
                <SidebarItem icon={MessageSquare} label="Support Desk" href="/admin/support" active={pathname === '/admin/support'} />
                <SidebarItem icon={Star} label="Help Ratings" href="/admin/help-ratings" active={pathname === '/admin/help-ratings'} />
                <SidebarItem icon={Send} label="Marketing" href="/admin/marketing" active={pathname === '/admin/marketing'} />
                
                <div className="my-3 border-t border-slate-100 dark:border-noble-border mx-3" />
                <SidebarItem icon={FileText} label="Audit Log" href="/admin/audit" active={pathname === '/admin/audit'} />
                <SidebarItem icon={Settings} label="System Settings" href="/admin/settings" active={pathname === '/admin/settings'} />
            </nav>

            {/* Footer / Sign Out */}
            <div className="p-4 border-t border-slate-100 dark:border-noble-border shrink-0">
                <button onClick={handleSignOut} className="w-full">
                    <div className="flex items-center gap-2.5 px-3 py-2 rounded-md cursor-pointer transition-colors text-slate-600 dark:text-slate-400 dark:text-slate-500 hover:bg-red-50 hover:text-red-600 font-medium">
                        <LogOut className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-red-500" />
                        <span className="text-[13px]">Sign Out</span>
                    </div>
                </button>
            </div>
        </aside>
        </>
    );
}
