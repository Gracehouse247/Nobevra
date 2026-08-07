import { supabase } from '../supabase';

export interface Product {
    id: string;
    team_id: string;
    user_id?: string;
    category_id?: number | null;
    name: string;
    sku?: string | null;
    description?: string | null;
    unit_price: number;
    stock_quantity?: number | null;
    track_inventory?: boolean;
    type: 'product' | 'service';
    tax_rate?: number | null;
    is_active?: boolean;
    unit?: string | null;
    cost_price?: number | null;
    min_stock_alert?: number | null;
    tags?: string[] | null;
    image_url?: string | null;
    created_at?: string;
    updated_at?: string;
}

export const productService = {
    async getProducts(teamId: string): Promise<Product[]> {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('team_id', teamId)
            .order('created_at', { ascending: false });

        if (error) {
            console.warn('[productService.getProducts]', error.message, { teamId, code: error.code });
            return [];
        }
        return (data ?? []) as Product[];
    },

    async getProductById(id: string): Promise<Product | null> {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.warn('[productService.getProductById]', error.message);
            return null;
        }
        return data as Product;
    },

    async resolveCategory(teamId: string, categoryName: string): Promise<number | null> {
        if (!categoryName || !categoryName.trim()) return null;
        const nameTrimmed = categoryName.trim();

        const { data } = await supabase
            .from('product_categories')
            .select('id')
            .eq('team_id', teamId)
            .ilike('name', nameTrimmed)
            .maybeSingle();

        if (data) return Number(data.id);

        const { data: newCat, error: insertError } = await supabase
            .from('product_categories')
            .insert({ team_id: teamId, name: nameTrimmed })
            .select('id')
            .single();

        if (insertError) {
            console.error('[productService.resolveCategory] failed to insert category:', insertError);
            return null;
        }
        return newCat ? Number(newCat.id) : null;
    },

    async createProduct(productData: Partial<Product>): Promise<Product> {
        const { data, error } = await supabase
            .from('products')
            .insert(productData)
            .select()
            .single();

        if (error) throw error;
        return data as Product;
    },

    async updateProduct(id: string, updates: Partial<Product>, lastUpdatedAt?: string): Promise<Product> {
        let query = supabase
            .from('products')
            .update({ ...updates, updated_at: new Date().toISOString() })
            .eq('id', id);

        if (lastUpdatedAt) {
            query = query.lte('updated_at', lastUpdatedAt);
        }

        const { data, error } = await query.select().single();

        if (error) {
            if (error.code === 'PGRST116') {
                throw new Error('Conflict: Data was modified by another device since last sync.');
            }
            throw error;
        }
        return data as Product;
    },

    async toggleActive(id: string, is_active: boolean): Promise<void> {
        const { error } = await supabase
            .from('products')
            .update({ is_active, updated_at: new Date().toISOString() })
            .eq('id', id);
        if (error) throw error;
    },

    async deleteProduct(id: string): Promise<void> {
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id);
        if (error) throw error;
    },

    /**
     * Returns aggregate stats for the dashboard strip.
     * Computed client-side from the products list to avoid extra DB calls.
     */
    computeStats(products: Product[]) {
        const productCount = products.filter(p => (p.type || 'product') === 'product').length;
        const serviceCount = products.filter(p => p.type === 'service').length;
        const lowStock = products.filter(p =>
            p.type !== 'service' &&
            p.track_inventory !== false &&
            p.stock_quantity !== null &&
            p.stock_quantity !== undefined &&
            p.stock_quantity <= 5 &&
            p.stock_quantity > 0
        ).length;
        const outOfStock = products.filter(p =>
            p.type !== 'service' &&
            p.track_inventory !== false &&
            (p.stock_quantity === 0 || p.stock_quantity === null)
        ).length;
        const totalValue = products.reduce((sum, p) => sum + (p.unit_price || 0), 0);

        return { productCount, serviceCount, lowStock, outOfStock, totalValue };
    }
};
