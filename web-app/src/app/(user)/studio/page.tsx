'use client';

import { NobleCardStudio } from '../../../components/identity/studio/NobleCardStudio';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import PremiumGate from '@/components/shared/PremiumGate';

export default function BusinessCardPage() {
  const { loading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (loading || !mounted) {
    return null;
  }

  return (
    <main className="w-full h-screen overflow-hidden bg-slate-50 dark:bg-[#0D1B2E]">
      <PremiumGate featureId="brand.studio" featureName="Professional Identity" tier="pulse">
        <NobleCardStudio />
      </PremiumGate>
    </main>
  );
}
