'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { TemplateEngine } from '@/components/invoice/TemplateEngine';
import { invoiceService } from '@/lib/services/supabaseService';
import { supabase } from '@/lib/supabase';
import { TEMPLATES, INVOICE_TEMPLATES } from '@/lib/templates/templateRegistry';

export default function EmbedInvoicePage() {
  const params = useParams();
  const id = params.id as string;
  
  const [invoice, setInvoice] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        // Wait for token injection from Flutter WebView if necessary
        // In a real WebView, Flutter sets cookies or passes token via URL/PostMessage
        // We'll rely on Supabase Auth session being active (either shared or passed)

        const data = await invoiceService.getInvoiceById(id);
        
        // Fetch Sender (Team/Profile)
        const { data: teamData } = await supabase
            .from('teams')
            .select('*')
            .eq('id', data.team_id)
            .single();

        const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user_id)
            .single();

        const formattedData = {
          invoiceNumber: data.invoice_number,
          date: new Date(data.issue_date).toLocaleDateString(),
          dueDate: new Date(data.due_date).toLocaleDateString(),
          currencySymbol: data.currency_code === 'NGN' ? '₦' : '$', // Simplify for embed
          sender: {
            full_name: (teamData as any)?.name || (profileData as any)?.business_name || (profileData as any)?.display_name,
            address: (profileData as any)?.business_address,
            phone_number: (profileData as any)?.business_phone || (profileData as any)?.phone,
            email: (profileData as any)?.business_email || (profileData as any)?.email,
            brand_logo_url: (teamData as any)?.logo_url || (profileData as any)?.brand_logo_url,
          },
          client: {
            name: data.clients?.name,
            address: data.clients?.address,
            email: data.clients?.email,
          },
          items: data.invoice_items?.map((item: any) => ({
            name: item.description,
            quantity: item.quantity,
            price: item.unit_price,
            total: item.total
          })) || [],
          subtotal: data.subtotal,
          taxTotal: data.tax_amount,
          discountTotal: data.discount_amount,
          total: data.total_amount,
          notes: data.notes,
          signatureUrl: data.metadata?.signature_url,
          templateId: data.metadata?.template_id
        };

        setInvoice(formattedData);
      } catch (err: any) {
        console.error('Failed to load invoice embed:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchInvoice();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><div className="w-8 h-8 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div></div>;
  if (error) return <div className="min-h-screen flex items-center justify-center bg-white text-red-500 font-bold p-8 text-center">{error}</div>;
  if (!invoice) return null;

  const template = TEMPLATES.find(t => t.id === invoice.templateId) || INVOICE_TEMPLATES[0];

  return (
    <div className="w-full bg-white min-h-screen pb-20">
      <TemplateEngine 
        template={template} 
        data={invoice} 
      />
    </div>
  );
}
