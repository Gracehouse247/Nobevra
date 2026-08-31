import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nobevra — Preview Sandbox',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://nobevra.noblesworld.com.ng',
  },
};

export default function HomeV2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
