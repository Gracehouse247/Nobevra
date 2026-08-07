'use client';

import React, { useState, useEffect } from 'react';
import { 
    Bell, Smartphone, Mail, Eye, Loader2, MessageSquare, 
    Calendar, ShieldCheck, Database, Settings, User, Globe, DollarSign 
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { toast } from 'react-hot-toast';
import { useEntitlements } from '@/context/EntitlementsContext';
import { useUpgradeModal } from '@/context/UpgradeModalContext';
import PremiumBadge from '@/components/shared/PremiumBadge';

interface Preferences {
    emailReminders: boolean;
    pushFocusAlerts: boolean;
    teamMentions: boolean;
    invoiceReminders: boolean;
    securityAlerts: boolean;
    publicProfile: boolean;
    aiDataSharing: boolean;
    autoDetectCurrency: boolean;
    multiCurrency: boolean;
}

const DEFAULT_PREFS: Preferences = {
    emailReminders: true,
    pushFocusAlerts: true,
    teamMentions: false,
    invoiceReminders: true,
    securityAlerts: true,
    publicProfile: true,
    aiDataSharing: false,
    autoDetectCurrency: true,
    multiCurrency: true,
};

function ToggleSwitch({ 
    checked, 
    onChange, 
    disabled, 
    labelOn = 'Enabled', 
    labelOff = 'Disabled' 
}: { 
    checked: boolean; 
    onChange: () => void; 
    disabled?: boolean;
    labelOn?: string;
    labelOff?: string;
}) {
    return (
        <div className="flex items-center gap-4">
            <button
                type="button"
                onClick={onChange}
                disabled={disabled}
                className={`w-[44px] h-[24px] rounded-full p-[2px] transition-colors duration-300 ease-in-out relative disabled:opacity-50 flex items-center ${checked ? 'bg-[#166FBB]' : 'bg-slate-300'}`}
            >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform duration-300 shadow-sm ${checked ? 'translate-x-[20px]' : 'translate-x-0'}`} />
            </button>
            <span className={`text-[12px] font-bold w-12 text-left ${checked ? 'text-slate-600' : 'text-slate-400'}`}>
                {checked ? labelOn : labelOff}
            </span>
        </div>
    );
}

function PreferenceRow({ 
    icon, 
    iconBg,
    iconColor,
    title, 
    description, 
    checked, 
    onChange, 
    disabled,
    labelOn,
    labelOff,
    isLast = false,
    premium,
}: {
    icon: React.ElementType;
    iconBg: string;
    iconColor: string;
    title: string;
    description: string;
    checked: boolean;
    onChange: () => void;
    disabled: boolean;
    labelOn?: string;
    labelOff?: string;
    isLast?: boolean;
    premium?: 'pulse' | 'elite';
}) {
    const Icon = icon;
    return (
        <div className={`flex items-center justify-between p-6 ${!isLast ? 'border-b border-slate-100' : ''}`}>
            <div className="flex items-center gap-5">
                <div className={`p-3 rounded-2xl ${iconBg}`}>
                    <Icon className={`w-5 h-5 ${iconColor}`} strokeWidth={2.5} />
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <p className="text-[14px] font-bold text-slate-800">{title}</p>
                        {premium && <PremiumBadge tier={premium} iconOnly />}
                    </div>
                    <p className="text-[12px] text-slate-500 font-medium mt-0.5">{description}</p>
                </div>
            </div>
            <ToggleSwitch 
                checked={checked} 
                onChange={onChange} 
                disabled={disabled} 
                labelOn={labelOn}
                labelOff={labelOff}
            />
        </div>
    );
}

export default function PreferencesPage() {
    const { user, userData, refreshUserData } = useAuth();
    const { canUse } = useEntitlements();
    const { openUpgradeModal } = useUpgradeModal();
    const [preferences, setPreferences] = useState<Preferences>(DEFAULT_PREFS);
    const [saving, setSaving] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (userData && !loaded) {
            const prefs = (userData as any).notification_preferences;
            if (prefs) {
                setPreferences({ ...DEFAULT_PREFS, ...prefs });
            }
            setLoaded(true);
        }
    }, [userData, loaded]);

    const handleToggle = async (key: keyof Preferences) => {
        if (!user) return;
        const updated = { ...preferences, [key]: !preferences[key] };
        setPreferences(updated);
        setSaving(true);
        try {
            const { error } = await supabase
                .from('profiles')
                .update({
                    notification_preferences: updated,
                    updated_at: new Date().toISOString(),
                })
                .eq('id', user.id);

            if (error) throw error;

            await refreshUserData();
            toast.success('Preference saved.', { duration: 1500 });
        } catch (error) {
            console.error('Preference save error:', error);
            setPreferences(preferences); // Revert
            toast.error('Failed to save preference.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="max-w-[900px] text-slate-800 pb-16">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-5">
                    <div className="p-3.5 bg-blue-50 rounded-2xl">
                        <Settings className="w-6 h-6 text-[#166FBB]" strokeWidth={2} />
                    </div>
                    <div>
                        <h1 className="text-[19px] font-black text-slate-900 tracking-tight">
                            System Preferences
                        </h1>
                        <p className="text-[13px] text-slate-500 font-medium mt-1">
                            Configure your notifications, privacy, and system behavior.
                        </p>
                    </div>
                </div>
                {saving && (
                    <div className="flex items-center gap-2 text-[#166FBB] text-[11px] font-bold bg-blue-50/50 px-4 py-2 rounded-full border border-blue-100">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving...
                    </div>
                )}
            </div>

            {/* Notifications Section */}
            <div className="mb-10">
                <div className="flex items-center gap-2 mb-4 px-1">
                    <Bell className="w-5 h-5 text-[#166FBB]" strokeWidth={2.5} />
                    <h2 className="text-[16px] font-black text-slate-900">Notifications</h2>
                </div>
                
                <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm overflow-hidden">
                    <PreferenceRow 
                        icon={Mail} iconBg="bg-blue-50" iconColor="text-[#166FBB]"
                        title="Daily Digest Emails" description="Receive a summary of your tasks and focus metrics."
                        checked={preferences.emailReminders} onChange={() => handleToggle('emailReminders')} disabled={saving}
                    />
                    <PreferenceRow 
                        icon={Smartphone} iconBg="bg-emerald-50" iconColor="text-emerald-500"
                        title="Focus Alerts (Mobile)" description="Get mobile notifications for important updates."
                        checked={preferences.pushFocusAlerts} onChange={() => handleToggle('pushFocusAlerts')} disabled={saving}
                    />
                    <PreferenceRow 
                        icon={MessageSquare} iconBg="bg-fuchsia-50" iconColor="text-fuchsia-500"
                        title="Team Mentions" description="Get notified when someone mentions you in comments."
                        checked={preferences.teamMentions} onChange={() => handleToggle('teamMentions')} disabled={saving}
                    />
                    <PreferenceRow 
                        icon={Calendar} iconBg="bg-amber-50" iconColor="text-amber-500"
                        title="Invoice Reminders" description="Receive reminders for upcoming and overdue invoices."
                        checked={preferences.invoiceReminders} 
                        onChange={() => {
                            if (!canUse('invoice.reminders')) {
                                openUpgradeModal({ featureName: 'Auto Payment Reminders', requiredPlan: 'pulse' });
                                return;
                            }
                            handleToggle('invoiceReminders');
                        }} 
                        disabled={saving}
                        premium={!canUse('invoice.reminders') ? 'pulse' : undefined}
                    />
                    <PreferenceRow 
                        icon={ShieldCheck} iconBg="bg-teal-50" iconColor="text-teal-500"
                        title="Security Alerts" description="Get notified about suspicious activity and security events."
                        checked={preferences.securityAlerts} onChange={() => handleToggle('securityAlerts')} disabled={saving} isLast
                    />
                </div>
            </div>

            {/* Privacy & AI Data Section */}
            <div className="mb-10">
                <div className="flex items-center gap-2 mb-4 px-1">
                    <ShieldCheck className="w-5 h-5 text-[#166FBB]" strokeWidth={2.5} />
                    <h2 className="text-[16px] font-black text-slate-900">Privacy & AI Data</h2>
                </div>

                <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm overflow-hidden">
                    <PreferenceRow 
                        icon={User} iconBg="bg-purple-50" iconColor="text-purple-600"
                        title="Public Profile Identity" description="Make your professional profile visible to the public."
                        checked={preferences.publicProfile} onChange={() => handleToggle('publicProfile')} disabled={saving}
                        labelOn="Visible" labelOff="Hidden"
                    />
                    <PreferenceRow 
                        icon={Database} iconBg="bg-blue-50" iconColor="text-[#166FBB]"
                        title="Allow AI to Use My Data" description="Help improve NobleInvoice with anonymous usage data."
                        checked={preferences.aiDataSharing} onChange={() => handleToggle('aiDataSharing')} disabled={saving} isLast
                    />
                </div>
            </div>

            {/* Localization & Currency Section */}
            <div>
                <div className="flex items-center gap-2 mb-4 px-1">
                    <Globe className="w-5 h-5 text-[#166FBB]" strokeWidth={2.5} />
                    <h2 className="text-[16px] font-black text-slate-900">Localization & Currency</h2>
                </div>

                <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm overflow-hidden">
                    <PreferenceRow 
                        icon={Globe} iconBg="bg-indigo-50" iconColor="text-indigo-500"
                        title="Auto-Detect Region" description="Automatically detect user's country and default currency."
                        checked={preferences.autoDetectCurrency} onChange={() => handleToggle('autoDetectCurrency')} disabled={saving}
                    />
                    <PreferenceRow 
                        icon={DollarSign} iconBg="bg-emerald-50" iconColor="text-emerald-500"
                        title="Multi-Currency Invoicing" description="Allow creating invoices in currencies other than your default."
                        checked={preferences.multiCurrency} 
                        onChange={() => {
                            if (!canUse('wallet.multicurrency')) {
                                openUpgradeModal({ featureName: 'Multi-Currency Support', requiredPlan: 'pulse' });
                                return;
                            }
                            handleToggle('multiCurrency');
                        }} 
                        disabled={saving} 
                        isLast
                        premium={!canUse('wallet.multicurrency') ? 'pulse' : undefined}
                    />
                </div>
            </div>
        </div>
    );
}
