'use client';

import { NobleCardStudio } from '../../../components/identity/studio/NobleCardStudio';
import { useAuth } from '@/context/AuthContext';
import { useEntitlements } from '@/context/EntitlementsContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

export default function BusinessCardPage() {
  const { canUse, isLoading: entLoading } = useEntitlements();
  const { loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !entLoading && !canUse('brand.studio')) {
      router.push('/upgrade');
    }
  }, [canUse, entLoading, loading, router]);

  if (loading || entLoading || !canUse('brand.studio')) {
    return null;
  }

  return (
    <main className="w-full h-screen overflow-hidden bg-slate-50">
      <NobleCardStudio />
    </main>
  );
}
