import { supabase } from '../supabase';

export const clientService = {
    async getClients(teamId: string) {
        const { data, error } = await supabase
            .from('clients')
            .select('*')
            .eq('team_id', teamId)
            .order('name');
        
        if (error) {
            console.warn('[clientService.getClients]', error.message, { teamId, code: error.code });
            return [];
        }
        return data ?? [];
    },

    async createClient(clientData: any) {
        const { data, error } = await supabase
            .from('clients')
            .insert(clientData)
            .select()
            .single();
        
        if (error) {
            console.error('[clientService.createClient] Supabase error:', {
                message: error.message,
                code: error.code,
                details: error.details,
                hint: error.hint,
            });
            throw error;
        }
        return data;
    },

    async createClients(clientsData: any[]) {
        const { data, error } = await supabase
            .from('clients')
            .insert(clientsData)
            .select();
            
        if (error) throw error;
        return data;
    },

    async getPortalData(token: string) {
        const { data, error } = await supabase.rpc('get_client_portal_data', { p_token: token });
        if (error) {
            console.error('[clientService.getPortalData] RPC failed:', error);
            throw error;
        }
        return data;
    },

    async getClient(id: string) {
        const { data, error } = await supabase
            .from('clients')
            .select('*')
            .eq('id', id)
            .single();
        if (error) throw error;
        return data;
    },

    async getClientNotes(clientId: string) {
        const { data, error } = await supabase
            .from('client_notes')
            .select('*')
            .eq('client_id', clientId)
            .order('created_at', { ascending: false });
        if (error) throw error;
        return data;
    },

    async getClientDocuments(clientId: string) {
        const { data, error } = await supabase
            .from('client_documents')
            .select('*')
            .eq('client_id', clientId)
            .order('created_at', { ascending: false });
        if (error) throw error;
        return data;
    },

    async getCommunicationLogs(clientId: string) {
        const { data, error } = await supabase
            .from('communication_logs')
            .select('*')
            .eq('client_id', clientId)
            .order('logged_at', { ascending: false });
        if (error) throw error;
        return data;
    },

    async updateClient(clientId: string, updates: any, lastUpdatedAt?: string) {
        // Whitelist only columns that exist in the clients table.
        // Note: the DB column is 'company_name', not 'company'. We remap it here
        // so the frontend form key ('company') is saved to the correct column.
        const FIELD_MAP: Record<string, string> = {
            company: 'company_name', // form key → actual DB column
        };
        const ALLOWED_FIELDS = [
            'name', 'email', 'phone', 'company_name', 'address', 'city', 'country',
            'country_code', 'lead_status', 'notes', 'tags', 'metadata',
            'position', 'website',
        ];
        // Remap any aliased keys then keep only allowed columns
        const remapped = Object.fromEntries(
            Object.entries(updates).map(([k, v]) => [FIELD_MAP[k] ?? k, v])
        );
        const safeUpdates = Object.fromEntries(
            Object.entries(remapped).filter(([k]) => ALLOWED_FIELDS.includes(k))
        );

        let query = supabase
            .from('clients')
            .update({ ...safeUpdates, updated_at: new Date().toISOString() })
            .eq('id', clientId);
        
        if (lastUpdatedAt) {
            query = query.lte('updated_at', lastUpdatedAt);
        }

        const { data, error } = await query.select().single();
        
        if (error) {
            // JSON.stringify is required — Supabase error properties are non-enumerable
            console.error('[clientService.updateClient] Supabase error:', JSON.stringify({
                message: error.message,
                code: error.code,
                details: error.details,
                hint: error.hint,
            }), { clientId, safeUpdates });
            if (error.code === 'PGRST116') {
                throw new Error('Conflict: Data was modified by another device since last sync.');
            }
            throw error;
        }
        return data;
    },


    async deleteClient(clientId: string) {
        const { error } = await supabase
            .from('clients')
            .delete()
            .eq('id', clientId);
            
        if (error) throw error;
    }
};
