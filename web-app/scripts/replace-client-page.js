const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/app/(user)/clients/new/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// We need to add website to the formData object
content = content.replace(
    /notes: ''\n\s*\}\);/,
    "notes: '',\n        website: ''\n    });"
);

// Add website to clientPayload
content = content.replace(
    /user_id: user\.id\n\s*\};/,
    "user_id: user.id,\n                website: formData.website\n            };"
);

// Add ChevronRight and CloudDownload to lucide imports if needed
content = content.replace(/Plus,/g, 'Plus, ChevronRight, CloudDownload,');

// Find the return block start and the end of the NewClientForm
const returnStartIndex = content.indexOf('return (');
const endOfFormIndex = content.indexOf('export default function NewClientPage()');

const topPart = content.substring(0, returnStartIndex);
const bottomPart = content.substring(endOfFormIndex);

// Extract countries list
const selectMatch = content.match(/<select[\s\S]*?>([\s\S]*?)<\/select>/);
const countriesHtml = selectMatch ? selectMatch[1] : '<option value="+234">🇳🇬 +234</option>';

const newReturnBlock = `return (
        <div className="h-full bg-[#F4F5F7] min-h-screen font-[Inter,sans-serif]">
            <form onSubmit={handleSubmit} className="p-5 lg:p-8 max-w-7xl mx-auto space-y-6 pb-20">
                
                {/* ── Top Header ── */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-2">
                    <div>
                        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 mb-2 font-[Inter,sans-serif] uppercase tracking-wider">
                            <span>Clients</span>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-[#0599D5]">Add New Client</span>
                        </div>
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight font-[Inter,sans-serif]">Add New Client</h1>
                        <p className="text-[13px] text-slate-500 font-medium font-[Inter,sans-serif] mt-1">Create a new client profile to manage invoices, payments & communications</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button 
                            type="button"
                            onClick={() => fromInvoice ? router.push('/invoices/new') : router.back()}
                            className="h-10 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-[13px] flex items-center gap-2 transition-all shadow-sm font-[Inter,sans-serif]"
                        >
                            <ChevronLeft className="w-4 h-4" /> Back to Clients
                        </button>
                        <button 
                            type="button" 
                            onClick={() => setShowImportModal(true)}
                            className="h-10 px-4 rounded-xl border border-[#0599D5]/20 bg-[#EBF7FD] text-[#0599D5] font-bold text-[13px] flex items-center gap-2 hover:bg-[#DDF2FC] transition-all shadow-sm font-[Inter,sans-serif]"
                        >
                            <CloudDownload className="w-4 h-4" /> Import from contacts
                        </button>
                    </div>
                </div>

                {/* ── Main Layout Grid ── */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                    
                    {/* Left Area (9 cols) */}
                    <div className="xl:col-span-8 space-y-6">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Contact Information Card */}
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                                <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
                                    <div className="w-8 h-8 rounded-lg bg-[#EBF7FD] flex items-center justify-center shrink-0">
                                        <User className="w-4 h-4 text-[#0599D5]" />
                                    </div>
                                    <div>
                                        <h3 className="text-[14px] font-bold text-slate-800 font-[Inter,sans-serif]">Contact Information</h3>
                                        <p className="text-[11px] text-slate-500 font-[Inter,sans-serif] mt-0.5">Basic details about your client</p>
                                    </div>
                                </div>
                                <div className="p-6 space-y-4 flex-1">
                                    <div className="space-y-1.5">
                                        <label className="text-[12px] font-bold text-slate-700 font-[Inter,sans-serif]">Client Name <span className="text-red-500">*</span></label>
                                        <input 
                                            required type="text"
                                            className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-slate-800 text-[13px] focus:outline-none focus:border-[#0599D5] focus:ring-2 focus:ring-[#0599D5]/10 transition-all placeholder-slate-400 font-medium font-[Inter,sans-serif]"
                                            placeholder="e.g. Major EC Opumie"
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[12px] font-bold text-slate-700 font-[Inter,sans-serif]">Email Address <span className="text-red-500">*</span></label>
                                        <input 
                                            required type="email"
                                            className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-slate-800 text-[13px] focus:outline-none focus:border-[#0599D5] focus:ring-2 focus:ring-[#0599D5]/10 transition-all placeholder-slate-400 font-medium font-[Inter,sans-serif]"
                                            placeholder="e.g. info@majoropumie.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[12px] font-bold text-slate-700 font-[Inter,sans-serif]">Phone Number</label>
                                        <div className="flex gap-2">
                                            <div className="relative w-28 shrink-0">
                                                <Flag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-emerald-600 pointer-events-none" />
                                                <select 
                                                    className="w-full h-10 pl-9 pr-2 bg-white border border-slate-200 rounded-lg text-slate-800 text-[13px] focus:outline-none focus:border-[#0599D5] focus:ring-2 focus:ring-[#0599D5]/10 transition-all font-medium font-[Inter,sans-serif] appearance-none cursor-pointer"
                                                    value={formData.country_code}
                                                    onChange={(e) => setFormData({...formData, country_code: e.target.value})}
                                                >
                                                    ${countriesHtml}
                                                </select>
                                                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                                            </div>
                                            <input 
                                                type="tel"
                                                className="flex-1 h-10 px-3 bg-white border border-slate-200 rounded-lg text-slate-800 text-[13px] focus:outline-none focus:border-[#0599D5] focus:ring-2 focus:ring-[#0599D5]/10 transition-all placeholder-slate-400 font-medium font-[Inter,sans-serif]"
                                                placeholder="803 123 4567"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[12px] font-bold text-slate-700 font-[Inter,sans-serif]">Website <span className="text-slate-400 font-normal">(Optional)</span></label>
                                        <input 
                                            type="url"
                                            className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-slate-800 text-[13px] focus:outline-none focus:border-[#0599D5] focus:ring-2 focus:ring-[#0599D5]/10 transition-all placeholder-slate-400 font-medium font-[Inter,sans-serif]"
                                            placeholder="e.g. www.majoropumie.com"
                                            value={formData.website}
                                            onChange={(e) => setFormData({...formData, website: e.target.value})}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Business Information Card */}
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                                <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
                                    <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                                        <Building className="w-4 h-4 text-indigo-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-[14px] font-bold text-slate-800 font-[Inter,sans-serif]">Business Information</h3>
                                        <p className="text-[11px] text-slate-500 font-[Inter,sans-serif] mt-0.5">Business details and address</p>
                                    </div>
                                </div>
                                <div className="p-6 space-y-4 flex-1">
                                    <div className="space-y-1.5">
                                        <label className="text-[12px] font-bold text-slate-700 font-[Inter,sans-serif]">Business Name <span className="text-slate-400 font-normal">(Optional)</span></label>
                                        <input 
                                            type="text"
                                            className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-slate-800 text-[13px] focus:outline-none focus:border-[#0599D5] focus:ring-2 focus:ring-[#0599D5]/10 transition-all placeholder-slate-400 font-medium font-[Inter,sans-serif]"
                                            placeholder="e.g. Major EC Opumie Enterprises"
                                            value={formData.company}
                                            onChange={(e) => setFormData({...formData, company: e.target.value})}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[12px] font-bold text-slate-700 font-[Inter,sans-serif]">Position / Role <span className="text-slate-400 font-normal">(Optional)</span></label>
                                        <div className="relative">
                                            <select 
                                                className="w-full h-10 px-3 pr-8 bg-white border border-slate-200 rounded-lg text-slate-800 text-[13px] focus:outline-none focus:border-[#0599D5] focus:ring-2 focus:ring-[#0599D5]/10 transition-all font-medium font-[Inter,sans-serif] appearance-none cursor-pointer"
                                                value={formData.position}
                                                onChange={(e) => setFormData({...formData, position: e.target.value})}
                                            >
                                                <option value="" disabled>Select position or role</option>
                                                <option value="CEO">CEO</option>
                                                <option value="Director">Director</option>
                                                <option value="Manager">Manager</option>
                                                <option value="Procurement">Procurement</option>
                                                <option value="Other">Other</option>
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5 h-full flex flex-col">
                                        <label className="text-[12px] font-bold text-slate-700 font-[Inter,sans-serif]">Business Address</label>
                                        <textarea 
                                            className="w-full flex-1 min-h-[90px] p-3 bg-white border border-slate-200 rounded-lg text-slate-800 text-[13px] focus:outline-none focus:border-[#0599D5] focus:ring-2 focus:ring-[#0599D5]/10 transition-all placeholder-slate-400 font-medium font-[Inter,sans-serif] resize-y"
                                            placeholder="e.g. 32 Mobolaji Bank Anthony Way, Maryland, Lagos, Nigeria"
                                            value={formData.address}
                                            onChange={(e) => setFormData({...formData, address: e.target.value})}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Advanced CRM Card */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                            <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
                                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                                    <Tag className="w-4 h-4 text-emerald-600" />
                                </div>
                                <div>
                                    <h3 className="text-[14px] font-bold text-slate-800 font-[Inter,sans-serif]">Advanced CRM Details <span className="text-slate-400 font-normal text-[12px]">(Optional)</span></h3>
                                    <p className="text-[11px] text-slate-500 font-[Inter,sans-serif] mt-0.5">Add tags, notes and CRM preferences</p>
                                </div>
                            </div>
                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-5">
                                    <div className="space-y-1.5">
                                        <label className="text-[12px] font-bold text-slate-700 font-[Inter,sans-serif]">CRM Lead Status</label>
                                        <div className="relative">
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-emerald-500 pointer-events-none" />
                                            <select 
                                                className="w-full h-10 pl-7 pr-8 bg-white border border-slate-200 rounded-lg text-slate-800 text-[13px] focus:outline-none focus:border-[#0599D5] focus:ring-2 focus:ring-[#0599D5]/10 transition-all font-medium font-[Inter,sans-serif] appearance-none cursor-pointer"
                                                value={formData.lead_status}
                                                onChange={(e) => setFormData({...formData, lead_status: e.target.value})}
                                            >
                                                <option value="active">Active Client</option>
                                                <option value="lead">Lead (Potential)</option>
                                                <option value="vip">VIP Client</option>
                                                <option value="churned">Archived / Inactive</option>
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[12px] font-bold text-slate-700 font-[Inter,sans-serif]">Tags</label>
                                        <input 
                                            type="text"
                                            className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-slate-800 text-[13px] focus:outline-none focus:border-[#0599D5] focus:ring-2 focus:ring-[#0599D5]/10 transition-all placeholder-slate-400 font-medium font-[Inter,sans-serif]"
                                            placeholder="e.g. VIP, B2B, Tech"
                                            value={formData.tags}
                                            onChange={(e) => setFormData({...formData, tags: e.target.value})}
                                        />
                                        <p className="text-[11px] text-slate-500 mt-1 font-[Inter,sans-serif]">Add tags separated by commas</p>
                                        <div className="flex flex-wrap gap-2 pt-2">
                                            <span className="text-[11px] font-bold text-slate-700 font-[Inter,sans-serif] flex items-center mr-1">Suggested tags:</span>
                                            {['VIP', 'B2B', 'Tech', 'Wholesale', 'Retail'].map(t => (
                                                <button 
                                                    key={t} type="button" 
                                                    onClick={() => setFormData(prev => ({...prev, tags: prev.tags ? prev.tags + ', ' + t : t}))}
                                                    className="px-2.5 py-1 rounded-full bg-[#EBF7FD] text-[#0599D5] text-[11px] font-bold hover:bg-[#DDF2FC] transition-colors font-[Inter,sans-serif]"
                                                >
                                                    {t}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-1.5 h-full flex flex-col">
                                    <label className="text-[12px] font-bold text-slate-700 font-[Inter,sans-serif]">Notes</label>
                                    <textarea 
                                        className="w-full flex-1 min-h-[140px] p-3 bg-[#F8FAFC] border border-slate-200 rounded-lg text-slate-800 text-[13px] focus:outline-none focus:border-[#0599D5] focus:ring-2 focus:ring-[#0599D5]/10 transition-all placeholder-slate-400 font-medium font-[Inter,sans-serif] resize-none"
                                        placeholder="Additional notes about this client..."
                                        value={formData.notes}
                                        onChange={(e) => setFormData({...formData, notes: e.target.value})}
                                    />
                                    <div className="text-right text-[10px] font-bold text-slate-400 font-[Inter,sans-serif]">{formData.notes.length} / 500</div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Action Bar */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <button 
                                type="button" 
                                onClick={() => router.back()} 
                                className="h-11 px-6 rounded-xl border border-slate-200 text-slate-600 font-bold text-[13px] hover:bg-slate-50 transition-all font-[Inter,sans-serif] order-2 sm:order-1"
                            >
                                Cancel
                            </button>
                            <div className="flex flex-col sm:flex-row items-center gap-3 order-1 sm:order-2 w-full sm:w-auto">
                                <button 
                                    disabled={loading}
                                    type="submit" 
                                    className="w-full sm:w-auto h-11 px-6 rounded-xl border border-slate-200 bg-white text-[#0599D5] font-bold text-[13px] hover:bg-slate-50 transition-all flex items-center justify-center gap-2 font-[Inter,sans-serif]"
                                >
                                    <User className="w-4 h-4" /> {loading ? 'Saving...' : 'Save Client'}
                                </button>
                                <button 
                                    disabled={loading}
                                    type="button" 
                                    onClick={(e) => handleSubmit(e as any, true)} 
                                    className="w-full sm:w-auto h-11 px-6 rounded-xl bg-[#0599D5] text-white font-bold text-[13px] hover:bg-[#0482B5] transition-all flex items-center justify-center gap-2 shadow-sm font-[Inter,sans-serif]"
                                >
                                    <FileText className="w-4 h-4" /> Save & Create Invoice <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                    </div>

                    {/* Right Area (4 cols) */}
                    <div className="xl:col-span-4 space-y-6">
                        {/* Why add clients card */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                            <h3 className="font-bold text-slate-900 text-[15px] font-[Inter,sans-serif] mb-1">Why add clients?</h3>
                            <p className="text-slate-500 text-[12px] font-medium font-[Inter,sans-serif] mb-6">Adding clients helps you:</p>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-[13px] font-bold text-slate-800 font-[Inter,sans-serif]">Create invoices faster</h4>
                                        <p className="text-[11px] text-slate-500 font-medium mt-0.5 font-[Inter,sans-serif]">Pre-fill client details automatically</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                                        <Zap className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-[13px] font-bold text-slate-800 font-[Inter,sans-serif]">Track payment history</h4>
                                        <p className="text-[11px] text-slate-500 font-medium mt-0.5 font-[Inter,sans-serif]">View all transactions in one place</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-[13px] font-bold text-slate-800 font-[Inter,sans-serif]">Better communication</h4>
                                        <p className="text-[11px] text-slate-500 font-medium mt-0.5 font-[Inter,sans-serif]">Send reminders and updates</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
                                        <TrendingUp className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-[13px] font-bold text-slate-800 font-[Inter,sans-serif]">Business insights</h4>
                                        <p className="text-[11px] text-slate-500 font-medium mt-0.5 font-[Inter,sans-serif]">Analyze client performance</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Tips card */}
                        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 flex gap-3 items-start">
                            <div className="mt-0.5 text-slate-400">
                                <Zap className="w-4 h-4 fill-slate-300" />
                            </div>
                            <div>
                                <h4 className="text-[13px] font-bold text-slate-800 font-[Inter,sans-serif]">Tips</h4>
                                <p className="text-[12px] text-slate-500 mt-1 leading-relaxed font-[Inter,sans-serif]">
                                    You can always edit client details later from the client profile.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            {/* Import from Contacts Modal */}
            {showImportModal && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in duration-200 font-[Inter,sans-serif]">
                        <div className="w-16 h-16 bg-[#EBF7FD] text-[#0599D5] rounded-full flex items-center justify-center mx-auto mb-6">
                            <CloudDownload className="w-8 h-8" />
                        </div>
                        <h2 className="text-xl font-black text-slate-900 text-center mb-2">Import from Contacts</h2>
                        <p className="text-slate-500 text-center text-[13px] font-medium leading-relaxed mb-8">
                            Native contact importing is an exclusive feature of the NobleInvoice Mobile App. Download the app to seamlessly sync your phone's address book.
                        </p>
                        <div className="space-y-3">
                            <button onClick={() => alert('App Store link coming soon!')} className="w-full h-11 bg-slate-900 text-white rounded-xl font-bold text-[13px] hover:bg-slate-800 transition-colors">Download on the App Store</button>
                            <button onClick={() => alert('Play Store link coming soon!')} className="w-full h-11 bg-slate-900 text-white rounded-xl font-bold text-[13px] hover:bg-slate-800 transition-colors">Get it on Google Play</button>
                            <button onClick={() => setShowImportModal(false)} className="w-full h-11 bg-transparent text-slate-500 hover:bg-slate-50 rounded-xl font-bold text-[13px] transition-colors mt-2">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
`
fs.writeFileSync(filePath, topPart + newReturnBlock + bottomPart);
console.log('Done!');
