import { supabase } from '../supabase';

export const teamService = {
    async getTeamByUserId(userId: string) {
        const { data: team, error: teamError } = await supabase
            .from('teams')
            .select('id, name, logo_url, primary_color')
            .eq('owner_id', userId)
            .maybeSingle();

        if (teamError) {
            console.warn('[teamService] Teams query skipped (RLS/auth mismatch):', teamError.message || teamError.code);
        }

        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('id, display_name, preferred_currency, brand_logo_url, brand_color, brand_signature_url, business_name')
            .eq('id', userId)
            .maybeSingle();

        if (profileError) {
            console.warn('[teamService] Profile query failed:', profileError.message || profileError.code);
        }

        if (!profile) {
            return {
                id: userId,
                display_name: 'User',
                brand_color: '#166FBB',
                ...(team || {})
            };
        }

        return {
            ...profile,
            ...(team || {}),
            business_name: profile?.business_name || (team as any)?.name,
            preferred_currency: profile.preferred_currency || 'NGN',
            brand_logo_url: (team as any)?.logo_url || profile.brand_logo_url,
            brand_color: (team as any)?.primary_color || profile.brand_color || '#166FBB',
            brand_signature_url: profile.brand_signature_url
        };
    },
    async updateTeamLogo(teamId: string, logoUrl: string) {
        const { error } = await supabase
            .from('teams')
            .update({ logo_url: logoUrl })
            .eq('id', teamId);
        if (error) throw error;
    },

    async updateProfileLogo(userId: string, logoUrl: string) {
        const { error } = await supabase
            .from('profiles')
            .update({ brand_logo_url: logoUrl })
            .eq('id', userId);
        if (error) throw error;
    },

    async updateProfileSignature(userId: string, signatureUrl: string) {
        const { error } = await supabase
            .from('profiles')
            .update({ brand_signature_url: signatureUrl })
            .eq('id', userId);
        if (error) throw error;
    },

    async updateBrandKit(userId: string, updates: any) {
        const { error: profileError } = await supabase
            .from('profiles')
            .update({
                display_name: updates.fullName,
                brand_color: updates.brandColor,
                brand_logo_url: updates.logoUrl,
                business_name: updates.companyName || updates.fullName,
                business_email: updates.email,
                business_phone: updates.phone,
                business_address: updates.address,
                tax_number: updates.taxId,
                updated_at: new Date().toISOString()
            })
            .eq('id', userId);
            
        if (profileError) throw profileError;

        const { data: team } = await supabase
            .from('teams')
            .select('id')
            .eq('owner_id', userId)
            .maybeSingle();

        if (team) {
            const { error: teamError } = await supabase
                .from('teams')
                .update({
                    name: updates.companyName || updates.fullName,
                    primary_color: updates.brandColor,
                    logo_url: updates.logoUrl,
                    updated_at: new Date().toISOString()
                })
                .eq('id', team.id);
            if (teamError) throw teamError;
        }
    },

    async completeOnboarding(userId: string, data: any) {
        // Update profile
        const { error: profileError } = await supabase
            .from('profiles')
            .update({
                business_name: data.businessName,
                brand_color: data.brandColor,
                brand_logo_url: data.logoUrl,
                tax_number: data.taxNumber,
                onboarding_completed: true,
                updated_at: new Date().toISOString()
            })
            .eq('id', userId);
            
        if (profileError) throw profileError;

        // Update team if exists
        const { data: team } = await supabase
            .from('teams')
            .select('id')
            .eq('owner_id', userId)
            .maybeSingle();

        if (team) {
            const { error: teamError } = await supabase
                .from('teams')
                .update({
                    name: data.businessName,
                    primary_color: data.brandColor,
                    logo_url: data.logoUrl,
                    updated_at: new Date().toISOString()
                })
                .eq('id', team.id);
            if (teamError) throw teamError;
        }
        
        return true;
    }
};

