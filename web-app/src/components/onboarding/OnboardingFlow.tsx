import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { StepIndicator } from '@/components/onboarding/StepIndicator';
import { IdentityForm } from '@/components/onboarding/IdentityForm';
import { BrandingForm } from '@/components/onboarding/BrandingForm';
import { InvoicingForm } from '@/components/onboarding/InvoicingForm';
import { completeOnboardingAction } from '@/app/actions/onboarding';
import { toast } from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';

interface OnboardingFlowProps {
  onComplete?: () => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    country: '',
    brandColor: '#2563EB',
    secondaryColor: '#1E293B',
    brandVoice: 'Professional',
    logoUrl: '',
    taxNumber: '',
    invoiceFooter: '',
  });

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 2));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const handleFinish = async () => {
    setIsSubmitting(true);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      const res = await completeOnboardingAction(data);
      if (res.success) {
        toast.success('Setup complete! Welcome to your dashboard.');
        if (onComplete) {
            onComplete();
        } else {
            router.push('/dashboard');
        }
      } else {
        toast.error(res.error || 'Failed to complete setup');
      }
    } catch (error) {
      toast.error('An unexpected error occurred.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <IdentityForm
            businessName={formData.businessName}
            industry={formData.industry}
            country={formData.country}
            onChange={updateFormData}
            onSubmit={nextStep}
          />
        );
      case 1:
        return (
          <BrandingForm
            brandColor={formData.brandColor}
            secondaryColor={formData.secondaryColor}
            brandVoice={formData.brandVoice}
            onChange={updateFormData}
            onNext={nextStep}
            onSkip={nextStep}
          />
        );
      case 2:
        return (
          <InvoicingForm
            taxNumber={formData.taxNumber}
            invoiceFooter={formData.invoiceFooter}
            onChange={updateFormData}
            onSubmit={handleFinish}
            onSkip={handleFinish}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 0: return 'Business Identity';
      case 1: return 'Brand Settings';
      case 2: return 'Invoicing Defaults';
      default: return '';
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 0: return "Let's get your workspace set up with the basics.";
      case 1: return 'Customize how your brand looks and sounds.';
      case 2: return 'Set up your default invoice information.';
      default: return '';
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8 relative">
        {currentStep > 0 && (
          <button
            onClick={prevStep}
            disabled={isSubmitting}
            className="absolute -top-2 left-0 text-slate-400 hover:text-slate-600 transition-colors disabled:opacity-50"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        )}
        <div className="flex items-center justify-between mb-6">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center border border-blue-200">
            <span className="text-blue-600 font-bold text-sm">N</span>
          </div>
          <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
            Step {currentStep + 1} of 3
          </span>
        </div>

        <StepIndicator currentStep={currentStep} totalSteps={3} />

        <div className="mt-6">
          <h1 className="text-2xl font-black text-noble-text mb-1 tracking-tight">
            {getStepTitle()}
          </h1>
          <p className="text-slate-500 text-xs">
            {getStepDescription()}
          </p>
        </div>
      </div>

      <div className="relative">
        {renderStepContent()}
      </div>
    </div>
  );
}
