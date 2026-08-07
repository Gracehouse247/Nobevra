import { supabase } from '@/lib/supabase';
import { GamificationModel, UserData } from '@/types';

export const XP_PER_PAYMENT_RECEIVED = 100;
export const XP_PER_INVOICE_SENT = 50;
export const XP_PER_RECEIPT_SCANNED = 25;

export const XP_THRESHOLDS: Record<number, number> = {
    1: 200, 2: 500, 3: 900, 4: 1400, 5: 2000, 6: 2800, 7: 3800, 8: 5000, 9: 6500, 10: 99999,
};

export const computeLevel = (xp: number): number => {
    let level = 1;
    for (let i = 1; i <= 10; i++) {
        if (xp >= XP_THRESHOLDS[i]) {
            level = i + 1;
        } else {
            break;
        }
    }
    return Math.min(Math.max(level, 1), 10);
};

export const BADGES = [
    { id: 'b1', name: 'First Blood', desc: 'Send your first invoice', icon: '🥇', xp: 50, isUnlocked: (g: GamificationModel) => g.invoicesSent >= 1 },
    { id: 'b2', name: 'Cash Flow King', desc: 'Receive 5 payments', icon: '👑', xp: 100, isUnlocked: (g: GamificationModel) => g.paymentsReceived >= 5 },
    { id: 'b3', name: 'Automation Pro', desc: 'Scan 10 receipts', icon: '🤖', xp: 200, isUnlocked: (g: GamificationModel) => g.receiptsScanned >= 10 },
];

export interface GamificationResult {
    leveledUp: boolean;
    newBadges: string[];
    streakMilestone?: number;
    streakLabel?: string;
    updatedModel: GamificationModel;
}

export const gamificationService = {
    async initIfNeeded(uid: string): Promise<void> {
        const { error } = await supabase
            .from('user_gamification')
            .select('*')
            .eq('user_id', uid)
            .single();

        if (error && error.code === 'PGRST116') {
            await supabase.from('user_gamification').insert({ user_id: uid });
        }
    },

    subscribeToGamification(uid: string, callback: (model: GamificationModel) => void): () => void {
        supabase.from('user_gamification').select('*').eq('user_id', uid).single().then(({ data }) => {
            if (data) {
                callback({
                    uid: data.user_id,
                    xp: data.xp,
                    level: data.level,
                    unlockedBadges: data.unlocked_badges || [],
                    invoicesSent: data.invoices_sent || 0,
                    paymentsReceived: data.payments_received || 0,
                    receiptsScanned: data.receipts_scanned || 0,
                    currentStreak: data.current_streak || 0
                });
            }
        });

        const channel = supabase
            .channel(`gamification:${uid}`)
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'user_gamification',
                filter: `user_id=eq.${uid}`
            }, (payload) => {
                const data = payload.new as any;
                if (data) {
                    callback({
                        uid: data.user_id,
                        xp: data.xp,
                        level: data.level,
                        unlockedBadges: data.unlocked_badges || [],
                        invoicesSent: data.invoices_sent || 0,
                        paymentsReceived: data.payments_received || 0,
                        receiptsScanned: data.receipts_scanned || 0,
                        currentStreak: data.current_streak || 0
                    });
                }
            })
            .subscribe();

        return () => { supabase.removeChannel(channel); };
    },

    subscribeToLeaderboard(callback: (users: UserData[]) => void): () => void {
        supabase
            .from('user_gamification')
            .select(`user_id, xp, level, unlocked_badges`)
            .order('xp', { ascending: false })
            .limit(10)
            .then(async ({ data, error }) => {
                if (error || !data) {
                    console.warn('[gamificationService.subscribeToLeaderboard]', error?.message);
                    callback([]);
                    return;
                }
                
                const userIds = data.map(d => d.user_id);
                const { data: profiles } = await supabase
                    .from('public_profiles')
                    .select('id, display_name, brand_logo_url')
                    .in('id', userIds);
                
                const profileMap = new Map((profiles || []).map(p => [p.id, p]));

                const users = data.map((d: any) => {
                    const prof = profileMap.get(d.user_id);
                    return {
                        id: d.user_id,
                        email: '',
                        name: prof?.display_name || 'Noble User',
                        photoUrl: prof?.brand_logo_url || undefined,
                        gamification: {
                            uid: d.user_id,
                            xp: d.xp,
                            level: d.level,
                            unlockedBadges: d.unlocked_badges || [],
                            invoicesSent: 0,
                            paymentsReceived: 0,
                            receiptsScanned: 0,
                            currentStreak: 0
                        }
                    };
                }) as unknown as UserData[];
                
                callback(users);
            });
        return () => {};
    },

    async _processEvent(uid: string, eventType: 'invoice' | 'payment' | 'receipt'): Promise<GamificationResult | null> {
        const { data: current, error } = await supabase
            .from('user_gamification')
            .select('*')
            .eq('user_id', uid)
            .single();

        if (error || !current) return null;

        let xpAdded = 0;
        let updateData: any = {};
        
        let currentBadges = Array.isArray(current.unlocked_badges) ? [...current.unlocked_badges] : [];

        if (eventType === 'invoice') {
            xpAdded = XP_PER_INVOICE_SENT;
            updateData.invoices_sent = (current.invoices_sent || 0) + 1;
        } else if (eventType === 'payment') {
            xpAdded = XP_PER_PAYMENT_RECEIVED;
            updateData.payments_received = (current.payments_received || 0) + 1;
        } else if (eventType === 'receipt') {
            xpAdded = XP_PER_RECEIPT_SCANNED;
            updateData.receipts_scanned = (current.receipts_scanned || 0) + 1;
        }

        const newXp = current.xp + xpAdded;
        const newLevel = computeLevel(newXp);
        const leveledUp = newLevel > current.level;

        updateData.xp = newXp;
        updateData.level = newLevel;

        const modelForBadges: GamificationModel = {
            uid,
            xp: newXp,
            level: newLevel,
            unlockedBadges: currentBadges,
            invoicesSent: updateData.invoices_sent ?? current.invoices_sent,
            paymentsReceived: updateData.payments_received ?? current.payments_received,
            receiptsScanned: updateData.receipts_scanned ?? current.receipts_scanned,
            currentStreak: current.current_streak
        };

        const newBadgesUnlocked: string[] = [];
        BADGES.forEach(b => {
            if (!currentBadges.includes(b.id) && b.isUnlocked(modelForBadges)) {
                newBadgesUnlocked.push(b.id);
                currentBadges.push(b.id);
            }
        });

        if (newBadgesUnlocked.length > 0) {
            updateData.unlocked_badges = currentBadges;
        }

        await supabase.from('user_gamification').update(updateData).eq('user_id', uid);

        return {
            leveledUp,
            newBadges: newBadgesUnlocked,
            streakMilestone: updateData.current_streak,
            streakLabel: updateData.current_streak ? `${updateData.current_streak} Day Streak!` : undefined,
            updatedModel: {
                ...modelForBadges,
                unlockedBadges: currentBadges
            }
        };
    },

    async onInvoiceSent(uid: string) { return this._processEvent(uid, 'invoice'); },
    async onPaymentReceived(uid: string) { return this._processEvent(uid, 'payment'); },
    async onReceiptScanned(uid: string) { return this._processEvent(uid, 'receipt'); }
};
