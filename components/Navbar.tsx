'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Sparkles, 
  Lock, 
  Briefcase, 
  Layers, 
  Search, 
  Award, 
  ArrowRight,
  User,
  Building2,
  LogIn
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    role, 
    setRole, 
    activeTab, 
    setActiveTab, 
    setIsScoperModalOpen,
    setIsEscrowModalOpen,
    setIsLedgerModalOpen,
    setIsWelcomeModalOpen,
    setIsLoginModalOpen,
    currentUser,
    escrowAmount
  } = useApp();

  return (
    <header className="sticky top-4 z-40 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full transition-all">
      <nav className="glass-pill rounded-full px-4 py-2.5 shadow-bento flex items-center justify-between border border-zinc-200/80">
        
        {/* Brand Logo & PSDM Tag (Clicking pops up welcome window) */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsWelcomeModalOpen(true)}
            className="flex items-center gap-2.5 group text-left"
            title="Click for GigMint & PSDM Overview"
          >
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
              <span className="text-xl tracking-tight">G</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight text-zinc-900 group-hover:text-indigo-600 transition-colors">GigMint</span>
                <span className="text-[10px] uppercase font-mono font-semibold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  SIH 1629
                </span>
              </div>
              <p className="text-[10px] text-zinc-500 font-medium hidden sm:block">
                Govt. of Punjab • Skill Mission Hub
              </p>
            </div>
          </button>
        </div>

        {/* Navigation Pill Links */}
        <div className="hidden md:flex items-center gap-1 bg-zinc-100/80 p-1 rounded-full border border-zinc-200/60">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'dashboard' 
                ? 'bg-white text-zinc-900 shadow-sm' 
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-indigo-500" />
            Dashboard
          </button>
          
          <button
            onClick={() => setActiveTab('explore')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'explore' 
                ? 'bg-white text-zinc-900 shadow-sm' 
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Search className="w-3.5 h-3.5 text-pink-500" />
            Explore Projects
          </button>

          <button
            onClick={() => setActiveTab('workspace')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'workspace' 
                ? 'bg-white text-zinc-900 shadow-sm' 
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-amber-500" />
            Workspace
          </button>

          <button
            onClick={() => {
              setActiveTab('escrow');
              setIsEscrowModalOpen(true);
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'escrow' 
                ? 'bg-white text-zinc-900 shadow-sm' 
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Lock className="w-3.5 h-3.5 text-indigo-600" />
            Escrow Vault
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></span>
          </button>

          <button
            onClick={() => {
              setActiveTab('ledger');
              setIsLedgerModalOpen(true);
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'ledger' 
                ? 'bg-white text-zinc-900 shadow-sm' 
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            PSDM Ledger
          </button>
        </div>

        {/* Right Actions: Role Switcher & Post Project CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Switchable Role Toggle */}
          <div className="flex items-center bg-zinc-100 p-1 rounded-full border border-zinc-200 text-xs font-semibold">
            <button
              onClick={() => setRole('freelancer')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full transition-all text-[11px] sm:text-xs ${
                role === 'freelancer'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
              title="Switch to Freelancer / Trainee Mode"
            >
              <User className="w-3.5 h-3.5" />
              <span>Freelancer</span>
            </button>
            <button
              onClick={() => setRole('client')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full transition-all text-[11px] sm:text-xs ${
                role === 'client'
                  ? 'bg-zinc-900 text-white shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
              title="Switch to MSME / Client Mode"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>MSME / Client</span>
            </button>
          </div>

          {/* Sign In / User Profile Pill */}
          {currentUser ? (
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="flex items-center gap-1.5 p-1 sm:pr-2.5 rounded-full bg-white border border-zinc-200/90 hover:border-indigo-300 shadow-sm transition-all"
              title={`Logged in as ${currentUser.name}. Click to switch account.`}
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-6 h-6 rounded-full object-cover border border-zinc-200"
              />
              <span className="hidden md:inline text-[11px] font-bold text-zinc-800">
                {currentUser.name.split(' ')[0]}
              </span>
            </button>
          ) : (
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold border border-indigo-200 transition-colors"
            >
              <LogIn className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline">Sign In</span>
            </button>
          )}

          {/* Post a Project CTA */}
          <button
            onClick={() => setIsScoperModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold transition-all shadow-sm hover:shadow group hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-400 group-hover:rotate-12 transition-transform" />
            <span>AI Scoper</span>
            <ArrowRight className="w-3 h-3 text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

      </nav>
    </header>
  );
};
