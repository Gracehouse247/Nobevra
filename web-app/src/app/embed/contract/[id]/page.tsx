'use client';
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { useParams } from 'next/navigation';
import { FileSignature, CheckCircle, ShieldCheck, Download, Eraser } from 'lucide-react';
import SignatureCanvas from 'react-signature-canvas';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export default function PublicContractView() {
    const params = useParams();
    const contractId = params.id as string;

    const [contract, setContract] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [signing, setSigning] = useState(false);
    
    // Form State
    const [signerName, setSignerName] = useState('');
    const [signerEmail, setSignerEmail] = useState('');
    const [auditHash, setAuditHash] = useState('');
    
    const sigCanvas = useRef<any>(null);
    const contractRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchContract = async () => {
            const { data } = await supabase.from('contracts').select('*').eq('id', contractId).single();
            setContract(data);
            setLoading(false);
        };
        fetchContract();
    }, [contractId]);

    const handleClearSignature = () => {
        if (sigCanvas.current) {
            sigCanvas.current.clear();
        }
    };

    const handleSign = async () => {
        if (!signerName.trim() || !signerEmail.trim()) {
            return alert("Please enter your name and email.");
        }
        if (sigCanvas.current.isEmpty()) {
            return alert("Please draw your signature.");
        }
        
        setSigning(true);
        const signatureDataUrl = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
        
        try {
            const res = await fetch(`/api/contracts/${contractId}/sign`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    signer_name: signerName,
                    signer_email: signerEmail,
                    signature_data_url: signatureDataUrl
                })
            });
            
            const data = await res.json();
            
            if (data.success) {
                setContract({ 
                    ...contract, 
                    status: 'signed', 
                    signature_data: signatureDataUrl, 
                    signed_by: signerName, 
                    signed_at: new Date().toISOString() 
                });
                setAuditHash(data.audit_hash);
            } else {
                alert("Error signing contract: " + data.error);
            }
        } catch (error) {
            alert("Error signing contract. Please try again.");
            console.error(error);
        }
        setSigning(false);
    };

    const handleDownloadPDF = async () => {
        if (!contractRef.current) return;
        
        try {
            const canvas = await html2canvas(contractRef.current, { scale: 2 });
            const imgData = canvas.toDataURL('image/png');
            
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: 'a4'
            });
            
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${contract.title.replace(/\s+/g, '_')}_Signed.pdf`);
        } catch (error) {
            console.error("PDF generation failed:", error);
            alert("Failed to generate PDF. Please try again.");
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">Loading document...</div>;
    if (!contract) return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-red-500">Contract not found or invalid link.</div>;

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
            <div className="max-w-3xl mx-auto space-y-6">
                
                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-blue-600/20">
                        <FileSignature className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 mt-4">{contract.title}</h1>
                    <p className="text-slate-500 flex items-center justify-center gap-2 text-sm">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        Secure E-Signature Portal
                    </p>
                </div>

                {/* Document Container */}
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden" ref={contractRef}>
                    <div className="p-8 md:p-12 prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: contract.terms_html || '' }} />
                    
                    <div className="border-t border-slate-100 bg-slate-50 p-8 md:p-12">
                        {contract.status === 'signed' ? (
                            <div className="space-y-6">
                                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center">
                                    <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                                    <h3 className="text-lg font-bold text-emerald-900">Document Signed & Legally Binding</h3>
                                    <p className="text-emerald-700 text-sm mt-1">This agreement was electronically signed by {contract.signed_by} on {new Date(contract.signed_at).toLocaleString()}.</p>
                                    {auditHash && (
                                        <p className="text-emerald-600/70 text-xs mt-3 font-mono break-all">Audit Hash: {auditHash}</p>
                                    )}
                                </div>
                                
                                {contract.signature_data && (
                                    <div className="border border-slate-200 rounded-xl p-6 bg-white max-w-sm mx-auto">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Official Signature</p>
                                        <img src={contract.signature_data} alt="Signature" className="max-h-24 w-auto" />
                                    </div>
                                )}
                                
                                <button 
                                    onClick={handleDownloadPDF}
                                    className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                                >
                                    <Download className="w-5 h-5" /> Download Signed PDF
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900">E-Signature Required</h3>
                                    <p className="text-slate-500 text-sm">By signing below, you agree to be legally bound by the terms outlined above.</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Full Legal Name</label>
                                            <input 
                                                type="text" 
                                                value={signerName}
                                                onChange={(e) => setSignerName(e.target.value)}
                                                placeholder="John Doe"
                                                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent font-medium"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                                            <input 
                                                type="email" 
                                                value={signerEmail}
                                                onChange={(e) => setSignerEmail(e.target.value)}
                                                placeholder="john@example.com"
                                                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent font-medium"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <div className="flex items-center justify-between mb-1">
                                            <label className="block text-sm font-medium text-slate-700">Draw Signature</label>
                                            <button onClick={handleClearSignature} className="text-xs text-slate-500 hover:text-slate-700 flex items-center gap-1">
                                                <Eraser className="w-3 h-3" /> Clear
                                            </button>
                                        </div>
                                        <div className="border border-slate-300 rounded-xl overflow-hidden bg-white">
                                            <SignatureCanvas 
                                                ref={sigCanvas}
                                                penColor="black"
                                                canvasProps={{className: "w-full h-40"}}
                                            />
                                        </div>
                                    </div>
                                    
                                    <button 
                                        onClick={handleSign}
                                        disabled={signing}
                                        className="w-full py-4 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 mt-6"
                                    >
                                        {signing ? "Processing..." : "Sign & Lock Document"}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="text-center text-slate-400 text-xs">
                    Powered by NobleInvoice E-Signature Technology
                </div>
            </div>
        </div>
    );
}
