'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { teamService } from '@/lib/services/supabaseService';
import { toast } from 'react-hot-toast';
import { IdentityStep } from './steps/IdentityStep';
import { BrandingStep } from './steps/BrandingStep';
import { InvoicingStep } from './steps/InvoicingStep';

interface OnboardingData {
    businessName: string;
    industry: string;
    country: string;
    logoUrl: string | null;
    brandColor: string;
    brandVoice: string;
    taxNumber: string;
    invoiceFooter: string;
}

export const OnboardingWizard = () => {
    const router = useRouter();
    const { user, refreshUserData } = useAuth();
    
    const [currentStep, setCurrentStep] = useState(0);
    const [isSaving, setIsSaving] = useState(false);
    
    const [data, setData] = useState<OnboardingData>({
        businessName: '',
        industry: 'Technology',
        country: 'United Kingdom',
        logoUrl: null,
        brandColor: '#166FBB',
        brandVoice: 'Professional',
        taxNumber: '',
        invoiceFooter: ''
    });

    const updateData = (fields: Partial<OnboardingData>) => {
        setData(prev => ({ ...prev, ...fields }));
    };

    const handleNext = async () => {
        if (currentStep === 0 && !data.businessName.trim()) {
            toast.error('Please enter your business name');
            return;
        }

        if (currentStep < 2) {
            setCurrentStep(prev => prev + 1);
        } else {
            await handleFinish();
        }
    };

    const handleFinish = async () => {
        if (!user) return;
        
        try {
            setIsSaving(true);
            toast.loading('Finalizing setup...', { id: 'onboarding-save' });
            
            await teamService.completeOnboarding(user.id, data);
            
            await refreshUserData();
            toast.success('Setup Complete!', { id: 'onboarding-save' });
            
            router.push('/dashboard');
        } catch (error: any) {
            console.error('Setup failed:', error);
            toast.error(error.message || 'Failed to complete setup', { id: 'onboarding-save' });
            setIsSaving(false);
        }
    };

    return (
        <div className="w-full h-full flex flex-col bg-[#F8FAFC] relative">
            {isSaving && (
                <div className="absolute inset-0 z-50 bg-noble-surface/80 backdrop-blur-sm flex flex-col items-center justify-center">
                    <div className="w-12 h-12 border-4 border-noble-border rounded-full animate-spin border-t-[#166FBB] mb-4" />
                    <p className="font-bold text-slate-700">Syncing your business DNA...</p>
                </div>
            )}
            
            {/* Header / Progress */}
            <div className="px-8 py-6 w-full max-w-4xl mx-auto flex items-center justify-between">
                <div className="font-black text-xl text-noble-text tracking-tighter">NobleInvoice</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Step {currentStep + 1} of 3
                </div>
            </div>
            
            <div className="w-full max-w-4xl mx-auto px-8 mb-8 flex gap-2">
                {[0, 1, 2].map(step => (
                    <div 
                        key={step} 
                        className={`h-2 flex-1 rounded-full transition-colors duration-500 ${step <= currentStep ? 'bg-[#166FBB]' : 'bg-slate-200'}`} 
                        style={{ backgroundColor: step <= currentStep ? data.brandColor : undefined }}
                    />
                ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto pb-32">
                {currentStep === 0 && (
                    <IdentityStep data={data} updateData={updateData} activeColor={data.brandColor} />
                )}
                {currentStep === 1 && (
                    <BrandingStep data={data} updateData={updateData} activeColor={data.brandColor} />
                )}
                {currentStep === 2 && (
                    <InvoicingStep data={data} updateData={updateData} activeColor={data.brandColor} />
                )}
            </div>

            {/* Footer Actions */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-noble-surface border-t border-noble-border">
                <div className="w-full max-w-4xl mx-auto flex gap-4">
                    {currentStep > 0 && (
                        <button 
                            onClick={() => setCurrentStep(prev => prev - 1)}
                            className="px-8 py-4 bg-noble-surface border border-noble-border text-slate-700 font-bold rounded-2xl hover:bg-slate-50 transition-colors"
                        >
                            Back
                        </button>
                    )}
                    <button 
                        onClick={handleNext}
                        className="flex-1 py-4 text-white font-bold rounded-2xl transition-colors shadow-lg"
                        style={{ backgroundColor: data.brandColor, boxShadow: `0 10px 15px -3px ${data.brandColor}40` }}
                    >
                        {currentStep === 2 ? 'Finalize Setup' : 'Continue'}
                    </button>
                </div>
            </div>
        </div>
    );
};
