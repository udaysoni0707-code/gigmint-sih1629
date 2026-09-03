'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Navbar } from '@/components/Navbar';
import { BentoGrid } from '@/components/BentoGrid';
import { ExploreGigs } from '@/components/ExploreGigs';
import { KanbanWorkspace } from '@/components/KanbanWorkspace';
import { EscrowSimulator } from '@/components/EscrowSimulator';
import { AIScoperModal } from '@/components/AIScoperModal';
import { QuickBidDrawer } from '@/components/QuickBidDrawer';
import { SkillLedgerModal } from '@/components/SkillLedgerModal';
import { WelcomeModal } from '@/components/WelcomeModal';
import { LoginModal } from '@/components/LoginModal';
import { StartingSplash } from '@/components/StartingSplash';
import { 
  Sparkles, 
  Lock, 
  Award, 
  User, 
  Building2,
  LogIn,
  Info
} from 'lucide-react';

export default function Home() {
  const { 
    activeTab, 
    role, 
    setRole, 
    setIsEscrowModalOpen, 
    setIsScoperModalOpen, 
    setIsLedgerModalOpen, 
    setIsWelcomeModalOpen,
    setIsLoginModalOpen,
    toastMessage
  } = useApp();

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-indigo-100 selection:text-indigo-900 pb-12">
      
      {/* Attractive Starting Entrance Animation */}
      <StartingSplash />

      {/* Dynamic Toast Alert Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="glass-pill-dark text-white px-4 py-3 rounded-2xl shadow-xl border border-zinc-700 flex items-center gap-3 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Global Navigation */}
      <div className="w-full pt-4">
        <Navbar />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 w-full mt-2">
        {activeTab === 'dashboard' && <BentoGrid />}
        {activeTab === 'explore' && <ExploreGigs />}
        {activeTab === 'workspace' && <KanbanWorkspace />}
        {activeTab === 'escrow' && <BentoGrid />}
        {activeTab === 'ledger' && <BentoGrid />}
      </main>

      {/* Hackathon Judge / Demo Quick Actions Floating Dock */}
      <aside aria-label="Interactive Demo Dock" className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-2xl w-[94%] sm:w-auto">
        <div className="glass-pill-dark px-4 py-2.5 rounded-full shadow-2xl border border-zinc-800 flex items-center justify-between sm:justify-center gap-2 sm:gap-3 text-xs text-white">
          <div className="flex items-center gap-1.5 text-zinc-300 font-semibold shrink-0">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></span>
            <span className="hidden sm:inline text-[11px] uppercase tracking-wider text-zinc-400 font-mono">Demo Controls:</span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
            <button
              onClick={() => setIsEscrowModalOpen(true)}
              className="px-2.5 py-1 rounded-full bg-indigo-600/80 hover:bg-indigo-600 text-white text-[11px] font-semibold transition-colors flex items-center gap-1 shrink-0"
              title="Open UPI Escrow Simulator"
            >
              <Lock className="w-3 h-3 text-indigo-200" />
              <span>Escrow Simulator</span>
            </button>

            <button
              onClick={() => setIsScoperModalOpen(true)}
              className="px-2.5 py-1 rounded-full bg-pink-600/80 hover:bg-pink-600 text-white text-[11px] font-semibold transition-colors flex items-center gap-1 shrink-0"
              title="Test AI Milestone Decomposer"
            >
              <Sparkles className="w-3 h-3 text-pink-200" />
              <span>AI Scoper</span>
            </button>

            <button
              onClick={() => setIsLedgerModalOpen(true)}
              className="px-2.5 py-1 rounded-full bg-emerald-600/80 hover:bg-emerald-600 text-white text-[11px] font-semibold transition-colors flex items-center gap-1 shrink-0"
              title="Inspect Punjab Skill Mission Ledger"
            >
              <Award className="w-3 h-3 text-emerald-200" />
              <span>PSDM Ledger</span>
            </button>

            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="px-2.5 py-1 rounded-full bg-indigo-500/80 hover:bg-indigo-500 text-white text-[11px] font-semibold transition-colors flex items-center gap-1 shrink-0"
              title="Open Sign In / Auth Portal"
            >
              <LogIn className="w-3 h-3 text-indigo-100" />
              <span>Sign In</span>
            </button>

            <button
              onClick={() => setRole(role === 'freelancer' ? 'client' : 'freelancer')}
              className="px-2.5 py-1 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[11px] font-semibold transition-colors flex items-center gap-1 shrink-0"
              title="Toggle Freelancer vs Client View"
            >
              {role === 'freelancer' ? <Building2 className="w-3 h-3 text-amber-400" /> : <User className="w-3 h-3 text-indigo-400" />}
              <span>{role === 'freelancer' ? 'Client View' : 'Freelancer View'}</span>
            </button>

            <button
              onClick={() => setIsWelcomeModalOpen(true)}
              className="p-1 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors shrink-0"
              title="Show Welcome Pop-up"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Global Modals & Drawers */}
      <WelcomeModal />
      <LoginModal />
      <EscrowSimulator />
      <AIScoperModal />
      <QuickBidDrawer />
      <SkillLedgerModal />

      {/* Footer */}
      <footer className="mt-16 border-t border-zinc-200/80 pt-8 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-white border border-zinc-200 p-0.5 flex items-center justify-center overflow-hidden">
              <img
                src="/techpunjab-logo.png"
                alt="TechPunjab"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-extrabold text-zinc-900">TechPunjab</span>
            <span>• Govt. of Punjab</span>
            <span className="hidden sm:inline">• Punjab Skill Development Mission (PSDM)</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>Bento Studio Design System (Theme 3)</span>
            <span>•</span>
            <span className="text-emerald-600 font-semibold">Simulated UPI Escrow Active</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
