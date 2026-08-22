import { renderBackgroundExt } from './templates/BackgroundRenderers';
import { renderHeaderExt } from './templates/HeaderRenderers';
import { renderFooterExt } from './templates/FooterRenderers';
import React from 'react';
import { TemplateDefinition } from '@/lib/templates/templateRegistry';
import { Mail, Phone, Globe, MapPin, User, Calendar, FileText, Diamond, Building2, CheckCircle2, Star, ShieldCheck, Signature } from 'lucide-react';
import { brand as nobevra } from '@/lib/brand';

interface TemplateEngineProps {
  template: TemplateDefinition;
  data: any; // Flexible data to support both Invoice and Identity
}

export const TemplateEngine: React.FC<TemplateEngineProps> = ({ template, data }) => {
  const { accentColor, headerStyle, footerStyle, tableStyle, logoPosition, category, isPremium, id, name } = template;
  const { sender, client } = data;
  
  // Dynamic font based on category
  const isSerif = id.includes('prof-brick');
  const isMono = false;
  const fontClass = isSerif ? 'font-serif' : isMono ? 'font-mono' : 'font-sans';

  // Branding Color Engine - Generates professional shades from accentColor
  const getBrandingColors = (hex: string) => {
    // Simple hex to rgba-like opacity variants
    return {
      main: hex,
      fade: `${hex}1A`, // 10%
      soft: `${hex}33`, // 20%
      medium: `${hex}80`, // 50%
      deep: `${hex}CC`, // 80%
      white: '#FFFFFF',
      black: '#000000',
      slate: '#64748B'
    };
  };

  const brand = getBrandingColors(accentColor);

  // Determine Edge Design Style
  const containerRounding = category.includes('creative') ? 'rounded-[3rem]' : 'rounded-3xl';

  const renderLogo = (size = "w-24 h-24", light = false) => {
    if ((sender as any)?.brand_logo_url) {
      return (
        <div className={`${size} rounded-2xl overflow-hidden shadow-sm flex items-center justify-center bg-noble-surface/10 backdrop-blur-md transition-all duration-500`}>
          <img src={(sender as any).brand_logo_url} alt="Logo" className="w-full h-full object-contain p-2" />
        </div>
      );
    }
    
    const borderColor = light ? 'border-white/30' : 'border-noble-border';
    const textColor = light ? 'text-white/40' : 'text-slate-300';
    const bgColor = light ? 'bg-noble-surface/5' : 'bg-slate-50/50';

    return (
      <div className={`${size} rounded-2xl border-2 border-dashed ${borderColor} flex flex-col items-center justify-center gap-2 ${bgColor} backdrop-blur-sm group transition-all`}>
        <Building2 className={`w-8 h-8 ${textColor} opacity-50`} />
        <span className={`text-[8px] font-black uppercase tracking-widest ${textColor} text-center px-2`}>Your Logo</span>
      </div>
    );
  };

  const renderBackground = () => renderBackgroundExt({
      id, data, brand, containerRounding, isSerif, fontClass, renderLogo
    });

  const renderHeader = () => renderHeaderExt({
      id, data, brand, containerRounding, isSerif, fontClass, renderLogo
    });

  const renderSenderInfo = () => {
    return (
      <div className="flex flex-col gap-2">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
           <Building2 className="w-3 h-3" /> Sender Details
        </p>
        <p className="font-black text-noble-text text-2xl tracking-tighter leading-tight mb-2">{sender?.full_name || 'Business Name'}</p>
        <div className="space-y-2">
          <div className="flex items-start gap-3 text-slate-500">
             <MapPin className="w-3.5 h-3.5 mt-1 shrink-0 opacity-50" />
             <p className="text-xs font-bold leading-relaxed">{sender?.address || 'Primary Office Address'}</p>
          </div>
          <div className="flex items-center gap-3 text-slate-500">
             <Phone className="w-3.5 h-3.5 shrink-0 opacity-50" />
             <p className="text-xs font-bold">{sender?.phone_number || '+1 (000) 000-0000'}</p>
          </div>
          <div className="flex items-center gap-3 text-slate-500">
             <Mail className="w-3.5 h-3.5 shrink-0 opacity-50" />
             <p className="text-xs font-bold">{sender?.email || 'contact@business.com'}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderClientInfo = () => {
    return (
      <div className="flex flex-col gap-2">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
           <User className="w-3 h-3" /> Recipient
        </p>
        <p className="font-black text-noble-text text-2xl tracking-tighter leading-tight mb-2">{client?.name || 'Client Name'}</p>
        <div className="space-y-2">
          <div className="flex items-start gap-3 text-slate-500">
             <MapPin className="w-3.5 h-3.5 mt-1 shrink-0 opacity-50" />
             <p className="text-xs font-bold leading-relaxed">{client?.address || 'No address provided'}</p>
          </div>
          {client?.email && (
            <div className="flex items-center gap-3 text-slate-500">
               <Mail className="w-3.5 h-3.5 shrink-0 opacity-50" />
               <p className="text-xs font-bold">{client.email}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderTable = () => {
    let thClass = "py-6 px-10 font-black text-[10px] uppercase tracking-[0.4em] text-white";
    let tableContainerClass = "overflow-hidden mb-16 relative z-10";
    
    // Table Style Variants
    const isStriped = tableStyle === 'striped' || id.startsWith('creative-') || id.startsWith('prof-');
    const isBordered = tableStyle === 'bordered' || id === 'geo-proforma';
    const isClean = tableStyle === 'clean' || id === 'ess-skyline' || id === 'geo-austen';
    
    // Geometric, Creative & Professional specific table overrides
    const isGeoBlackTable = id === 'geo-purple' || id === 'geo-navy' || id === 'geo-green' || id === 'creative-swirl' || id === 'creative-gold-swirl' || id === 'creative-teal-brush' || id === 'ess-azure-wave' || id === 'ess-geo-prism' || id === 'ess-purple-bloom';
    const isProfessionalTable = id.startsWith('prof-') || id === 'ess-steel-minimal';
    const isDarkHeader = tableStyle === 'dark-header' || isGeoBlackTable || isProfessionalTable;
    
    let headerBgColor = brand.main; 
    if (id === 'prof-brick') headerBgColor = '#D97706';
    if (id === 'prof-dark-gold') headerBgColor = '#0F172A';
    if (id === 'prof-navy-ribbon') headerBgColor = '#1E3A8A';
    if (id === 'prof-slate-angle') headerBgColor = brand.black;
    if (id === 'prof-construction') headerBgColor = '#000000';
    if (id.startsWith('creative-')) headerBgColor = brand.fade;
    if (id === 'ess-azure-wave') headerBgColor = '#1E3A8A';
    if (id === 'ess-geo-prism') headerBgColor = '#1E3A8A';
    if (id === 'ess-purple-bloom') headerBgColor = '#7C3AED';
    if (id === 'plat-red-geo' || id === 'plat-modern-red') headerBgColor = '#1F2937';
    if (id === 'plat-minimal-grey') headerBgColor = '#E2E8F0';
    if (id === 'plat-blue-wave') headerBgColor = '#1F2937';
    if (id === 'plat-corp-teal') headerBgColor = '#002E5B';
    if (id === 'ess-steel-minimal') headerBgColor = '#8BA5BC';
    if (id === 'geo-banner') headerBgColor = '#1E293B';
    if (id === 'geo-proforma') headerBgColor = '#CBD5E1';
    if (id === 'geo-green-angle') headerBgColor = '#10B981';
    if (id === 'geo-triangle') headerBgColor = '#312E81';
    if (id === 'geo-austen') headerBgColor = 'transparent';
    if (id === 'ess-blue-geo') headerBgColor = '#1E3A8A';
    if (id === 'ess-modern-swish') headerBgColor = '#334155';
    if (id === 'ess-azure-pattern') headerBgColor = '#1E40AF';
    if (id === 'ess-urban-skyline') headerBgColor = '#0F172A';
    if (id === 'ess-corporate-clean') headerBgColor = '#0F172A';
    if (id === 'ess-green-abstract') headerBgColor = '#4CAF50';
    if (id === 'ess-teal-abstract') headerBgColor = '#008080';
    if (id === 'ess-minimal-grid') headerBgColor = '#F1F5F9';
    if (id === 'ess-purple-bubble') headerBgColor = '#8B5CF6';
    if (id === 'ess-navy-angle') headerBgColor = '#1E3A8A';
    if (id === 'creative-yellow-geo') headerBgColor = '#FBBF24';
    if (id === 'creative-blue-poly') headerBgColor = '#1E3A8A';
    if (id === 'creative-teal-grunge') headerBgColor = '#14B8A6';
    if (id === 'creative-fluid-wave') headerBgColor = '#64748B';
    if (id === 'creative-azure-wave') headerBgColor = '#3B82F6';
    if (id === 'creative-iso-grid') headerBgColor = '#2563EB';
    if (id === 'creative-soft-ripples') headerBgColor = '#0EA5E9';
    if (id === 'creative-teal-liquid') headerBgColor = '#14B8A6';
    if (id === 'creative-grey-topography') headerBgColor = '#64748B';
    if (id === 'creative-dual-geo') headerBgColor = '#002E5B';
    if (id === 'ess-navy-lines') headerBgColor = '#1E3A8A';
    if (id === 'ess-orange-blob') headerBgColor = '#F97316';
    if (id === 'ess-blue-angle') headerBgColor = '#1E3A8A';
    if (id === 'ess-blue-curve') headerBgColor = '#3B82F6';
    if (id === 'prof-blue-horizon') headerBgColor = '#3B82F6';
    if (id === 'prof-red-diamond') headerBgColor = '#DC2626';
    if (id === 'prof-navy-geometric') headerBgColor = '#1E3A8A';
    if (id === 'prof-teal-geometric') headerBgColor = '#14B8A6';
    if (id === 'prof-orange-geometric') headerBgColor = '#F97316';
    if (id === 'prof-yellow-sharp' || id === 'prof-yellow-minimal-geo' || id === 'prof-black-yellow-geo' || id === 'prof-yellow-blue-pill') headerBgColor = '#FBBF24';
    if (id === 'prof-blue-wave-premium') headerBgColor = '#1E40AF';
    if (id === 'prof-blue-curved-banner') headerBgColor = '#1D4ED8';
    if (id === 'prof-cyan-black-geo') headerBgColor = '#06B6D4';
    if (id === 'prof-carbon-fiber') headerBgColor = '#1C1C1C';
    if (id === 'prof-sage-minimal') headerBgColor = '#6B8F71';
    if (id === 'prof-crimson-ledger') headerBgColor = '#991B1B';
    if (id === 'prof-cobalt-split') headerBgColor = '#1D4ED8';
    if (id === 'prof-slate-grid') headerBgColor = '#475569';
    if (id === 'prof-forest-premium') headerBgColor = '#14532D';
    if (id === 'ess-dark-orange-wave') headerBgColor = '#0F172A';

    // Determine text color for header based on background
    const isHeaderDark = (!id.startsWith('creative-') || id === 'creative-fluid-wave' || id === 'creative-grey-topography' || id === 'creative-teal-grunge' || id === 'creative-dual-geo' || id === 'creative-blue-poly' || id === 'creative-azure-wave' || id === 'creative-iso-grid' || id === 'creative-soft-ripples' || id === 'creative-teal-liquid') && id !== 'geo-austen' && id !== 'geo-proforma' && id !== 'ess-minimal-grid';
    const thColorClass = id === 'geo-austen' ? 'text-[#1E3A8A]' : (isHeaderDark ? 'text-white' : 'text-noble-text');
    thClass = thClass.replace('text-white', thColorClass);

    const rowBgColor = id.startsWith('creative-') ? 'bg-noble-surface/70 backdrop-blur-sm' : 'bg-noble-surface';
    const altRowBgColor = id.startsWith('creative-') ? 'bg-slate-100/70 backdrop-blur-sm' : 'bg-slate-50';
    
    if (isBordered) {
      if (id === 'geo-proforma') {
         tableContainerClass += " border-2 border-[#1E293B]";
      } else {
         tableContainerClass += " rounded-[2.5rem] border-4 border-slate-50";
      }
    }
    if (!isDarkHeader && id !== 'geo-austen' && id !== 'geo-proforma' && !id.startsWith('ess-')) thClass = thClass.replace('text-white', 'text-slate-400');

    const isTotalBar = id === 'ess-geo-prism' || id === 'ess-purple-bloom' || id === 'ess-blue-geo' || id === 'ess-azure-pattern';
    const totalBarColor = (id === 'ess-geo-prism' || id === 'ess-blue-geo' || id === 'ess-azure-pattern') ? '#1E3A8A' : '#7C3AED';

    return (
      <div className="px-16 mb-12">
        <div className={`${tableContainerClass} overflow-x-auto scrollbar-hide`}>
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr 
                style={{ backgroundColor: headerBgColor }}
                className={`${id === 'plat-blue-wave' ? 'rounded-full' : ''} ${id === 'geo-austen' ? 'border-y border-[#1E3A8A]' : ''}`}
              >
                <th className={`${thClass} w-[45%] ${id === 'plat-blue-wave' ? 'rounded-l-full' : ''}`}>Description</th>
                <th className={`${thClass} w-[15%] text-center`}>Qty</th>
                <th className={`${thClass} w-[20%] text-right`}>Price</th>
                <th className={`${thClass} w-[20%] text-right ${id === 'plat-blue-wave' ? 'rounded-r-full' : ''}`}>Amount</th>
              </tr>
            </thead>
            <tbody className={isClean ? "divide-y divide-slate-200" : "divide-y-2 divide-slate-50"}>
              {data.items.map((item: any, index: number) => {
                const tdClass = id === 'geo-proforma' ? 'py-10 px-10 border border-[#1E293B]' : 'py-10 px-10';
                return (
                <tr 
                  key={index} 
                  className={`${isClean ? "border-b border-slate-100" : "border-b border-slate-100/50"} transition-colors ${
                    isStriped && index % 2 === 1 ? altRowBgColor : rowBgColor
                  }`}
                >
                  <td className={tdClass}>
                    <p className="font-black text-noble-text text-[18px] mb-2">{item.name || 'Untitled Item'}</p>
                  </td>
                  <td className={`${tdClass} text-center`}>
                    <span className="font-black text-slate-600 text-lg">{item.quantity}</span>
                  </td>
                  <td className={`${tdClass} text-right font-bold text-slate-600 text-lg`}>
                    {data.currencySymbol}{(item.price || 0).toLocaleString()}
                  </td>
                  <td className={`${tdClass} text-right font-black text-noble-text text-xl`}>
                    {data.currencySymbol}{((item.quantity || 0) * (item.price || 0)).toLocaleString()}
                  </td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {isTotalBar && (
           <div className="w-full h-24 flex items-center justify-between px-16 text-white" style={{ backgroundColor: totalBarColor }}>
              <span className="text-4xl font-black uppercase tracking-widest">Total</span>
              <span className="text-5xl font-black">{data.currencySymbol}{data.total.toLocaleString()}</span>
           </div>
        )}

        {(id === 'plat-blue-wave' || id === 'ess-blue-geo') && (
          <div className={`h-2 w-full ${id === 'ess-blue-geo' ? 'bg-[#3B82F6]' : 'bg-[#00B4FF]'} mt-4`} />
        )}
      </div>
    );
  };

  const renderSummary = () => {

    // Skip summary for templates with total bar
    if (id === 'ess-geo-prism' || id === 'ess-purple-bloom') return null;

    // Standard summary for all high-fidelity templates
    const isProfessionalTotal = id.startsWith('prof-');
    let totalBgColor = brand.main;
    
    if (id === 'prof-brick') totalBgColor = '#D97706';
    if (id === 'prof-dark-gold') totalBgColor = '#EAB308';
    if (id === 'prof-navy-ribbon') totalBgColor = '#1E3A8A';
    if (id === 'prof-slate-angle') totalBgColor = '#1E293B';
    if (id === 'prof-construction') totalBgColor = '#000000';
    if (id === 'prof-modern-minimal') totalBgColor = '#0F172A';
    if (id === 'prof-pastel-bloom') totalBgColor = '#F472B6';
    if (id === 'prof-blue-precision') totalBgColor = '#1E3A8A';
    if (id === 'prof-orange-orbit') totalBgColor = '#F97316';
    if (id === 'prof-oceanic-wave') totalBgColor = '#3B82F6';
    if (id === 'prof-emerald-nexus') totalBgColor = '#064E3B';
    if (id === 'prof-royal-purple') totalBgColor = '#6D28D9';
    if (id === 'geo-navy-prism') totalBgColor = '#1E3A8A';
    if (id === 'geo-cyan-edge') totalBgColor = '#06B6D4';
    if (id === 'geo-cobalt-stripe') totalBgColor = '#1E3A8A';
    if (id === 'geo-onyx-glass') totalBgColor = '#000000';
    if (id === 'geo-slate-minimal') totalBgColor = '#334155';
    if (id === 'creative-yellow-geo') totalBgColor = '#FBBF24';
    if (id === 'creative-blue-poly') totalBgColor = '#1E3A8A';
    if (id === 'creative-teal-grunge') totalBgColor = '#14B8A6';
    if (id === 'creative-fluid-wave') totalBgColor = '#64748B';
    if (id === 'creative-azure-wave') totalBgColor = '#3B82F6';
    if (id === 'creative-iso-grid') totalBgColor = '#2563EB';
    if (id === 'creative-soft-ripples') totalBgColor = '#0EA5E9';
    if (id === 'creative-teal-liquid') totalBgColor = '#14B8A6';
    if (id === 'creative-grey-topography') totalBgColor = '#64748B';
    if (id === 'creative-dual-geo') totalBgColor = '#002E5B';
    if (id === 'ess-navy-lines') totalBgColor = '#1E3A8A';
    if (id === 'ess-orange-blob') totalBgColor = '#F97316';
    if (id === 'ess-blue-angle') totalBgColor = '#1E3A8A';
    if (id === 'ess-blue-curve') totalBgColor = '#3B82F6';
    if (id === 'prof-blue-horizon') totalBgColor = '#3B82F6';
    if (id === 'prof-red-diamond') totalBgColor = '#DC2626';
    if (id === 'prof-navy-geometric') totalBgColor = '#1E3A8A';
    if (id === 'prof-teal-geometric') totalBgColor = '#14B8A6';
    if (id === 'prof-orange-geometric') totalBgColor = '#F97316';
    if (id === 'prof-yellow-sharp' || id === 'prof-yellow-minimal-geo' || id === 'prof-black-yellow-geo' || id === 'prof-yellow-blue-pill') totalBgColor = '#FBBF24';
    if (id === 'prof-blue-wave-premium') totalBgColor = '#2563EB';
    if (id === 'prof-blue-curved-banner') totalBgColor = '#1D4ED8';
    if (id === 'prof-cyan-black-geo') totalBgColor = '#06B6D4';
    if (id === 'prof-carbon-fiber') totalBgColor = '#1C1C1C';
    if (id === 'prof-sage-minimal') totalBgColor = '#6B8F71';
    if (id === 'prof-crimson-ledger') totalBgColor = '#991B1B';
    if (id === 'prof-cobalt-split') totalBgColor = '#1D4ED8';
    if (id === 'prof-slate-grid') totalBgColor = '#475569';
    if (id === 'prof-forest-premium') totalBgColor = '#14532D';
    if (id === 'ess-dark-orange-wave') totalBgColor = '#0F172A';
    
    // Specific total block color variants for hierarchy
    if (id === 'creative-wave') totalBgColor = brand.black;
    if (id.startsWith('geo-')) totalBgColor = brand.main;
    if (id === 'geo-banner') totalBgColor = '#1E293B';
    if (id === 'geo-triangle') totalBgColor = '#312E81';
    if (id === 'creative-pastel') totalBgColor = brand.main;
    if (id === 'ess-green-abstract') totalBgColor = '#4CAF50';
    if (id === 'ess-teal-abstract') totalBgColor = '#008080';
    if (id === 'ess-purple-bubble') totalBgColor = '#8B5CF6';
    if (id === 'ess-navy-angle') totalBgColor = '#1E3A8A';

    const isTransparentSummary = id === 'geo-proforma' || id === 'geo-green-angle' || id === 'ess-minimal-grid';

    if (id === 'prof-oceanic-wave') {
      return (
        <div className="px-16 flex justify-between items-end mb-16 relative z-10">
           <div className="bg-[#3B82F6] text-white p-8 rounded-[2rem] shadow-2xl flex flex-col gap-2 min-w-[280px]">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60">Total Amount Due</p>
              <h3 className="text-5xl font-black tracking-tighter">{data.currencySymbol}{data.total.toLocaleString()}</h3>
           </div>
           <div className="w-[40%] text-right">
              <div className="flex justify-between py-2 font-bold text-slate-400 text-sm">
                 <span>Subtotal</span>
                 <span className="text-noble-text">{data.currencySymbol}{(data.subtotal || 0).toLocaleString()}</span>
              </div>
              {data.taxTotal > 0 && (
                <div className="flex justify-between py-2 font-bold text-slate-400 text-sm">
                   <span>Tax Total</span>
                   <span className="text-noble-text">{data.currencySymbol}{(data.taxTotal || 0).toLocaleString()}</span>
                </div>
              )}
              <div className="h-1 w-full bg-slate-100 mt-4 rounded-full" />
           </div>
        </div>
      );
    }

    return (
      <div className="px-16 flex justify-end mb-16 relative z-10">
        <div className="w-[50%]">
           <div className="flex justify-between py-3 border-b border-slate-800/10 font-bold text-slate-800 text-sm">
              <span>Subtotal</span>
              <span>{data.currencySymbol}{(data.subtotal || 0).toLocaleString()}</span>
           </div>
           {data.taxTotal > 0 && (
             <div className="flex justify-between py-3 border-b border-slate-800/10 font-bold text-slate-800 text-sm">
                <span>Tax Total</span>
                <span>{data.currencySymbol}{(data.taxTotal || 0).toLocaleString()}</span>
             </div>
           )}
           {data.discountTotal > 0 && (
             <div className="flex justify-between py-3 border-b border-slate-800/10 font-bold text-slate-800 text-sm">
                <span>Discount</span>
                <span>-{data.currencySymbol}{(data.discountTotal || 0).toLocaleString()}</span>
             </div>
           )}
           <div className="flex justify-between items-center py-6 border-t-4 mt-2" style={{ borderTopColor: isTransparentSummary ? 'transparent' : totalBgColor }}>
              <span className="font-black uppercase tracking-[0.3em] text-noble-text text-sm">Amount Due In Full</span>
              <span className="font-black text-4xl tracking-tighter" style={{ color: isTransparentSummary ? '#1E293B' : totalBgColor }}>{data.currencySymbol}{(data.total || 0).toLocaleString()}</span>
           </div>
        </div>
      </div>
    );
  };

  const renderFooter = () => renderFooterExt({
      id, data, brand, containerRounding, isSerif, fontClass, renderLogo
    });

    // Determine if the header already handles logo/sender info
    const headerHandlesLogo = id.startsWith('geo-') || id.startsWith('creative-') || id.startsWith('prof-') || id.startsWith('plat-') || id.startsWith('ess-') || id === 'ess-purple-bloom';
    const headerHandlesSender = id.startsWith('creative-') || id.startsWith('prof-') || id.startsWith('plat-') || id === 'ess-steel-minimal' || id === 'ess-navy-lines' || id === 'ess-orange-blob' || id === 'ess-blue-angle' || id === 'ess-blue-curve' || id === 'ess-dark-orange-wave' || id === 'prof-blue-wave-premium' || id === 'prof-blue-curved-banner';

    return (
    <div className={`bg-noble-surface shadow-[0_48px_128px_-32px_rgba(0,0,0,0.2)] ${containerRounding} w-full h-full flex flex-col overflow-hidden ${fontClass} relative border border-slate-100 transition-all duration-700 ease-in-out`}>
      {renderBackground()}

      {/* Design Flourish for Premium/Creative - Subtle and Professional */}
      {isPremium && !id.startsWith('geo-') && !id.startsWith('prof-') && (
        <div className="absolute top-12 right-12 z-[20] opacity-5 rotate-12 pointer-events-none">
          <Star className="w-32 h-32 text-slate-400" />
        </div>
      )}

      {renderHeader()}
      
      {/* Strict 2-Column Body Layout (Bill To / Invoice Details) */}
      <div className="relative z-10 flex-1 flex flex-col p-20">
          
          {/* UNIFIED 2-COLUMN BODY LAYOUT (Standardized for ALL Templates) */}
          <div className="grid grid-cols-2 gap-24 mb-16 px-16">
             {/* LEFT COLUMN: BILL TO */}
             <div className="flex flex-col gap-6">
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] mb-2 flex items-center gap-2">
                   <User className="w-3.5 h-3.5" /> BILL TO
                </p>
                <div className="space-y-4">
                   <p className="font-black text-noble-text text-3xl tracking-tighter leading-tight">{client?.name || 'Client Name'}</p>
                   <div className="space-y-2 text-slate-500 font-bold text-sm leading-relaxed">
                      {client?.address && (
                        <div className="flex items-start gap-3">
                           <MapPin className="w-3.5 h-3.5 mt-1 shrink-0 opacity-40" />
                           <p className="whitespace-pre-line">{client.address}</p>
                        </div>
                      )}
                      {client?.email && (
                        <div className="flex items-center gap-3">
                           <Mail className="w-3.5 h-3.5 shrink-0 opacity-40" />
                           <p>{client.email}</p>
                        </div>
                      )}
                   </div>
                </div>
             </div>

             {/* RIGHT COLUMN: INVOICE DETAILS */}
             <div className="flex flex-col items-end gap-6 text-right">
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] mb-2 flex items-center gap-2 justify-end">
                   <FileText className="w-3.5 h-3.5" /> INVOICE
                </p>
                <div className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-3">
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">INVOICE NUMBER</span>
                   <span className="text-sm font-black text-noble-text">: # {data.invoiceNumber}</span>
                   
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">DATE</span>
                   <span className="text-sm font-bold text-slate-600">: {data.date}</span>
                   
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">DUE DATE</span>
                   <span className="text-sm font-bold text-slate-600">: {data.dueDate}</span>
                   
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">CURRENCY</span>
                   <span className="text-sm font-black text-noble-text">: {data.currencySymbol}</span>
                </div>
             </div>
          </div>
                {/* LOGO PLACEHOLDER IN BODY (Nobevra Rule: Show if not in Header) */}
                {!headerHandlesLogo && (
                  <div className="mt-8 pt-8 border-t border-slate-100 flex justify-end">
                     {renderLogo("w-20 h-20")}
                  </div>
                )}

          {renderTable()}
          {renderSummary()}
        </div>

      <div className="px-16 mb-12">
        <div className="grid grid-cols-12 gap-8 items-start">
          <div className="col-span-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 relative group transition-all flex flex-col justify-center min-h-[140px]">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded-full bg-noble-surface flex items-center justify-center shadow-sm">
                <FileText className="w-3 h-3 text-slate-400" />
              </div>
              <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Terms & Policy</h3>
            </div>
            <p className="text-slate-500 text-[9px] font-bold leading-relaxed italic pr-2">
              {data.notes || 'Remit payment to the specified account. Direct all billing inquiries to our finance department. Subject to Nobevra standard terms.'}
            </p>
          </div>
          
          <div className="col-span-9 flex flex-col items-end justify-end pt-2">
            {data.signatureUrl ? (
              <div className="text-right space-y-3 group">
                <div className="relative inline-block">
                  <img src={data.signatureUrl} alt="Signature" className="h-16 w-auto object-contain transform group-hover:-rotate-1 group-hover:scale-105 transition-all duration-700 drop-shadow-sm" />
                  <div className="absolute -bottom-1 right-0 w-full h-0.5 rounded-full opacity-20" style={{ backgroundColor: brand.main }} />
                </div>
                <div className="flex flex-col items-end">
                   <div className="flex items-center gap-1.5 mb-0.5">
                     <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" />
                     <p className="text-[8px] font-black text-noble-text uppercase tracking-[0.2em]">Verified Official Seal</p>
                   </div>
                   <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{sender?.full_name || 'Authorized Official'}</p>
                </div>
              </div>
            ) : (
              <div className="w-full max-w-[240px] aspect-[2.4/1] border-2 border-dashed border-noble-border rounded-2xl flex flex-col items-center justify-center gap-3 bg-slate-50/50 group hover:border-slate-300 transition-all cursor-default overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-100/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Signature className="w-8 h-8 text-slate-300 group-hover:scale-110 transition-transform duration-500" />
                <div className="text-center">
                  <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.4em]">Authorized Signature</span>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1" style={{ backgroundColor: brand.fade }} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Powered by Nobevra Watermark */}
      {!data.canRemoveWatermark && (
        <div className="absolute bottom-6 right-8 z-[100] text-[9px] font-black uppercase tracking-widest text-slate-300 pointer-events-none">
          {nobevra.copy.watermarkText.split('Nobevra')[0]}
          <span className="text-[#01A0E2]">{nobevra.shortName}</span>
        </div>
      )}
      {renderFooter()}
    </div>
  );
};
