import { ThemeProvider } from '@/components/providers/theme-provider';

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-theme-force="light" className="min-h-screen bg-[#F8FAFC]">
      {children}
    </div>
  );
}
