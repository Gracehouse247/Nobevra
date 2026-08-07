"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

interface EntitlementsData {
  [featureId: string]: any;
}

interface EntitlementsContextType {
  entitlements: EntitlementsData;
  isLoading: boolean;
  canUse: (featureId: string) => boolean;
  getLimit: (featureId: string) => number | null;
  hasUnlockedTemplate: (templateId: string) => boolean;
  refreshEntitlements: () => Promise<void>;
}

// ─────────────────────────────────────────────────────────────────────────────
// Tier Definitions  (per audit: Gate Scalability & Complexity, Not Core Utility)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * EXPLORER (Free) — Core utility. Enough to build their business on NobleInvoice.
 * Strategy: let free users accept Flutterwave payments (earn on transaction fees),
 * unlimited invoices & clients, and access every core workflow.
 * The "Trojan Horse": a "Powered by NobleInvoice" watermark is the upgrade motivator.
 */
function getFreeEntitlements(): EntitlementsData {
  return {
    // Invoicing — unlimited (key to stickiness)
    'invoice.create':    null,
    'invoice.payments':  null,  // Flutterwave payment collection — FREE per audit
    'estimates.create':  null,

    // Clients & CRM — unlimited
    'client.create':     null,
    'clients.portal':    null,
    'clients.crm':       null,
    'crm.full':          null,

    // Products & services
    'products.catalog':  null,
    'products.passport': null,

    // Expenses — core tracking is free
    'expenses.receipts':     null,
    'expenses.receipt_scan': null,
    'vendor.management':     null,

    // Wallet — basic payments free (revenue via transaction %)
    'wallet.payments':   null,

    // Reports — all reporting is free
    'reports.export':    null,
    'reports.tax':       null,

    // Dashboard — insights are free
    'dashboard.insights':   null,
    'dashboard.predictive': null,

    // QR Generator — all types free
    'qr.premium': null,

    // Templates — free
    'template.premium': null,

    // Networking — basic digital profile free (NFC card is Pulse)
    'networking.basic': null,
  };
}

/**
 * PULSE ($9.99/mo) — Automation, Branding & Multi-Currency.
 * Focus: time-saving features that scale the business.
 * Multi-Currency moved from Elite per audit (common freelancer need in 2026).
 */
function getPulseEntitlements(): EntitlementsData {
  return {
    // Automation
    'invoice.reminders': null,  // Auto payment reminders
    'invoice.recurring':  null,  // Recurring / subscription invoices

    // Branding (the primary upgrade motivator from free)
    'brand.whitelabel': null,   // Remove "Powered by NobleInvoice" watermark

    // Multi-Currency (moved from Elite — common freelancer need)
    'wallet.multicurrency': null,

    // NFC Smart Cards
    'networking.nfc': null,
  };
}

/**
 * ELITE ($24.99/mo) — B2B Complexity: teams, compliance, API.
 * Target: agencies and scaling businesses.
 */
function getEliteEntitlements(): EntitlementsData {
  return {
    // Team & collaboration
    'team.members':   null,
    'team.contracts': null,
    'settings.team':  null,

    // Branding — custom domain
    'brand.customdomain': null,

    // Developer / API access
    'developer.api':      null,
    'developer.webhooks': null,
    'settings.integrations': null,
  };
}

/**
 * Build the complete entitlements map for the given plan.
 * Higher tiers include all lower-tier features.
 */
function buildClientSideEntitlements(plan?: string | null): EntitlementsData {
  const free = getFreeEntitlements();
  const p = (plan || 'explorer').toLowerCase();

  if (p === 'admin' || p === 'elite') {
    return { ...free, ...getPulseEntitlements(), ...getEliteEntitlements() };
  }
  if (p === 'pulse') {
    return { ...free, ...getPulseEntitlements() };
  }
  // explorer / free / unknown → core free features only
  return free;
}

// ─────────────────────────────────────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────────────────────────────────────

const EntitlementsContext = createContext<EntitlementsContextType>({
  entitlements: {},
  isLoading: true,
  canUse: () => false,
  getLimit: () => 0,
  hasUnlockedTemplate: () => false,
  refreshEntitlements: async () => {},
});

export const useEntitlements = () => useContext(EntitlementsContext);

export const EntitlementsProvider = ({ children }: { children: ReactNode }) => {
  const { user, userData } = useAuth();
  const [entitlements, setEntitlements] = useState<EntitlementsData>({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchEntitlements = async () => {
    if (!user) {
      setEntitlements({});
      setIsLoading(false);
      return;
    }

    // Build client-side entitlements from the user's plan as the reliable baseline.
    // This works even before the DB features table is fully seeded (per audit).
    const plan = (userData as any)?.plan || 'explorer';
    const planDefaults = buildClientSideEntitlements(plan);

    try {
      setIsLoading(true);

      // Attempt to augment with backend entitlements (resolve_team_entitlements).
      // Backend data ALWAYS takes precedence over plan defaults.
      // This lets the backend restrict or extend features independently of the plan tier.
      const { data: teamData } = await supabase
        .from('teams')
        .select('id')
        .eq('owner_id', user.id)
        .order('created_at', { ascending: true })
        .limit(1)
        .single();

      if (teamData) {
        const { data: backendData, error } = await supabase.rpc('resolve_team_entitlements', {
          p_team_id: teamData.id,
        });

        if (error) throw error;

        // The backend might still have legacy '0' or 'false' values for features that are now unlocked.
        // To enforce the new generous frontend gating, we take the backend data but 
        // DO NOT let it override a 'null' (unlimited) plan default with a falsy/0 value.
        const merged = { ...planDefaults };
        for (const [key, val] of Object.entries(backendData || {})) {
            // If the plan says it's unlimited (null), ignore backend '0', 'false', string '0', or string 'null'
            if (planDefaults[key] === null && (val === 0 || val === '0' || val === false || val === 'false' || val === 'null')) {
                continue;
            }
            merged[key] = val;
        }
        setEntitlements(merged);
      } else {
        // No team record yet — use plan-based defaults
        setEntitlements(planDefaults);
      }
    } catch (error) {
      console.error('Error fetching entitlements:', error);
      // On any error, fall back to plan defaults — never lock the user out
      setEntitlements(planDefaults);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEntitlements();
  }, [user, userData]);

  /**
   * Returns true if the user can use this feature.
   * null  = unlimited (true)
   * n > 0 = quota remaining (true)
   * 0     = quota exhausted (false)
   * undefined = feature not granted at this tier (false)
   */
  const canUse = (featureId: string): boolean => {
    const val = entitlements[featureId];
    if (val === undefined) return false;
    if (val === null || val === 'null') return true;
    if (val === true || val === 'true') return true;
    
    // Convert string numbers to real numbers for limit checking
    const num = Number(val);
    if (!isNaN(num)) {
      return num > 0;
    }
    
    return false;
  };

  const getLimit = (featureId: string): number | null => {
    const val = entitlements[featureId];
    if (val === undefined || typeof val === 'object') return 0;
    return val as number | null;
  };

  const hasUnlockedTemplate = (templateId: string): boolean => {
    // Unlimited template access → all templates unlocked
    if (canUse('template.premium') && getLimit('template.premium') === null) return true;
    // Check PAYG-unlocked template IDs from the metadata ledger
    const unlocked = entitlements?.metadata?.unlocked_templates;
    if (Array.isArray(unlocked) && unlocked.includes(templateId)) return true;
    return false;
  };

  return (
    <EntitlementsContext.Provider
      value={{
        entitlements,
        isLoading,
        canUse,
        getLimit,
        hasUnlockedTemplate,
        refreshEntitlements: fetchEntitlements,
      }}
    >
      {children}
    </EntitlementsContext.Provider>
  );
};