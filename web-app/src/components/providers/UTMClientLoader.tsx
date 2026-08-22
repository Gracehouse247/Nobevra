'use client';

import { useUTM } from '@/hooks/useUTM';

export default function UTMClientLoader() {
  useUTM();
  return null;
}
