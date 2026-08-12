import React, { useEffect, useState } from 'react';
import { Package } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { productPassportService, teamService } from '@/lib/services/supabaseService';
import { Loader2 } from 'lucide-react';

interface Props {
    onChange: (payload: Record<string, any>) => void;
    onPreviewValueChange: (val: string) => void;
    initialData?: Record<string, any>;
}

export default function ProductForm({ onChange, onPreviewValueChange, initialData }: Props) {
    const { user } = useAuth();
    const [passports, setPassports] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedPassportId, setSelectedPassportId] = useState(initialData?.passportId || '');

    useEffect(() => {
        if (!user) return;
        const fetchPassports = async () => {
            try {
                const tData = await teamService.getTeamByUserId(user.id);
                const teamId = tData?.id || user.id;
                const data = await productPassportService.getPassports(teamId);
                setPassports(data || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPassports();
    }, [user]);

    useEffect(() => {
        if (selectedPassportId) {
            const passport = passports.find(p => p.id === selectedPassportId);
            if (passport) {
                const url = `${window.location.origin}/p/${passport.slug}`;
                onPreviewValueChange(url);
                onChange({
                    passportId: selectedPassportId,
                    displayName: passport.products?.name || 'Product',
                    destinationUrl: url
                });
            }
        } else {
            onPreviewValueChange('');
            onChange({});
        }
    }, [selectedPassportId, passports, onChange, onPreviewValueChange]);

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Select Product</label>
                <div className="relative">
                    <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    {loading ? (
                         <div className="w-full bg-slate-50 border border-noble-border rounded-xl pl-11 pr-4 py-3 flex items-center gap-2 text-sm text-slate-500">
                             <Loader2 className="w-4 h-4 animate-spin" /> Loading inventory passports...
                         </div>
                    ) : (
                        <select 
                            className="w-full bg-noble-surface border border-noble-border rounded-xl pl-11 pr-4 py-3 font-bold text-sm focus:outline-none focus:border-noble-blue transition-all"
                            value={selectedPassportId}
                            onChange={(e) => setSelectedPassportId(e.target.value)}
                        >
                            <option value="">-- Choose a product passport --</option>
                            {passports.map(p => (
                                <option key={p.id} value={p.id}>
                                    {p.products?.name} {p.products?.sku ? `(${p.products?.sku})` : ''}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-noble-border text-sm font-medium text-slate-600 flex items-start gap-3">
                <div className="mt-0.5">
                    <Package className="w-4 h-4 text-noble-blue" />
                </div>
                <div>
                    <p>The generated QR code will link directly to this product's Digital Passport.</p>
                    <p className="mt-2 text-xs">Don't see your product? <Link href="/products/new" className="text-noble-blue hover:underline font-bold">Create a Product Passport first</Link>.</p>
                </div>
            </div>
        </div>
    );
}
