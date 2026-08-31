import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nobevra — Business Operating System',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://nobevra.noblesworld.com.ng',
  },
};

export default function FormalHomepageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
