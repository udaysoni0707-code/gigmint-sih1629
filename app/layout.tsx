import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';

export const metadata: Metadata = {
  title: 'GigMint | Smart Freelance Platform (SIH1629 - Punjab Skill Development Mission)',
  description: 'Next-generation freelance platform connecting PSDM-certified vocational trainees and developers with MSMEs. Featuring Bento Studio aesthetics, simulated native UPI milestone escrow, AI scoping, and on-chain skill verification.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="min-h-screen bg-canvas text-charcoal flex flex-col selection:bg-indigo-100 selection:text-indigo-900">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
