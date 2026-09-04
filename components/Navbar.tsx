'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layers, 
  Search, 
  Briefcase, 
  Lock, 
  Award, 
  User, 
  Building2, 
  Sparkles, 
  ArrowRight,
  Menu,
  X,
  ChevronRight
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
    currentUser
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation Items Specification matching the attached design
  const navItems = [
    {
      id: 'dashboard' as const,
      label: 'Dashboard',
      icon: Layers,
      iconColor: 'text-indigo-500',
      action: () => setActiveTab('dashboard')
    },
    {
      id: 'explore' as const,
      line1: 'Explore',
      line2: 'Projects',
      icon: Search,
      iconColor: 'text-pink-500',
      action: () => setActiveTab('explore')
    },
    {
      id: 'workspace' as const,
      label: 'Workspace',
      icon: Briefcase,
      iconColor: 'text-amber-500',
      action: () => setActiveTab('workspace')
    },
    {
      id: 'escrow' as const,
      line1: 'Escrow',
      line2: 'Vault',
      icon: Lock,
      iconColor: 'text-indigo-500',
      hasIndicator: true,
      action: () => {
        setActiveTab('escrow');
        setIsEscrowModalOpen(true);
      }
    },
    {
      id: 'ledger' as const,
      line1: 'PSDM',
      line2: 'Ledger',
      icon: Award,
      iconColor: 'text-emerald-500',
      action: () => {
        setActiveTab('ledger');
        setIsLedgerModalOpen(true);
      }
    }
  ];

  return (
    <>
      <header className="sticky top-3 sm:top-4 z-40 px-2 sm:px-4 lg:px-8 max-w-[1360px] mx-auto w-full transition-all">
        <nav 
          aria-label="Main Navigation"
          className="bg-white/95 backdrop-blur-md rounded-full px-3 py-2 sm:px-4 sm:py-2.5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-zinc-200/80 flex items-center justify-between gap-2 sm:gap-3 relative"
        >
          {/* ======================================================== */}
          {/* LEFT SECTION: Brand Logo, Title & Tagline               */}
          {/* ======================================================== */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <button 
              onClick={() => setIsWelcomeModalOpen(true)}
              className="flex items-center gap-2 sm:gap-2.5 group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-full"
              title="Click for TechPunjab Overview"
            >
              {/* Circular Logo Avatar */}
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-zinc-200/90 p-0.5 shadow-sm flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-105 transition-transform">
                <img
                  src="/techpunjab-logo.png"
                  alt="TechPunjab Government Emblem"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Title, Badge & Subtitle */}
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-[15px] sm:text-base tracking-tight text-zinc-900 group-hover:text-emerald-700 transition-colors">
                    TechPunjab
                  </span>
                  
                  {/* GOVT. OF PUNJAB Mint Pill Badge */}
                  <span className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-100/90 text-emerald-800 border border-emerald-300/60 shadow-xs">
                    <span className="w-1 h-2 sm:h-2.5 rounded-full bg-emerald-600 shrink-0"></span>
                    <span className="flex flex-col text-[7.5px] sm:text-[8.5px] font-mono font-bold leading-[1.05] uppercase tracking-wider">
                      <span>GOVT. OF</span>
                      <span>PUNJAB</span>
                    </span>
                  </span>
                </div>

                <p className="text-[9.5px] sm:text-[10px] text-zinc-500 font-medium whitespace-nowrap leading-tight mt-0.5 hidden xs:block">
                  Skilled Tech Workers • Stronger Future
                </p>
              </div>
            </button>
          </div>

          {/* ======================================================== */}
          {/* CENTER SECTION: Grouped Nav Pills Container              */}
          {/* ======================================================== */}
          <div className="hidden lg:flex items-center bg-zinc-100/90 p-1 rounded-full border border-zinc-200/70 shadow-inner shrink-0">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  className={`relative px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200/60 font-bold'
                      : 'text-zinc-600 hover:text-zinc-900 hover:bg-white/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${item.iconColor}`} />
                  
                  {item.label ? (
                    <span className="whitespace-nowrap">{item.label}</span>
                  ) : (
                    <span className="flex flex-col text-[10.5px] leading-tight text-left whitespace-nowrap">
                      <span>{item.line1}</span>
                      <span>{item.line2}</span>
                    </span>
                  )}

                  {/* Vertical Indicator Pill for Escrow Vault */}
                  {item.hasIndicator && (
                    <span className="w-1.5 h-3.5 rounded-full bg-indigo-500/90 shrink-0 ml-0.5 shadow-xs" />
                  )}
                </button>
              );
            })}
          </div>

          {/* ======================================================== */}
          {/* RIGHT SECTION: Role Switcher, Profile & AI Scoper CTA    */}
          {/* ======================================================== */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Segmented Role Switcher (Desktop & Tablet) */}
            <div className="hidden md:flex items-center bg-zinc-100/90 p-1 rounded-full border border-zinc-200/70 text-xs font-semibold">
              <button
                onClick={() => setRole('freelancer')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all text-xs ${
                  role === 'freelancer'
                    ? 'bg-[#4f46e5] text-white shadow-xs font-semibold'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-white/40'
                }`}
                title="Switch to Freelancer / Trainee Mode"
              >
                <User className="w-3.5 h-3.5 shrink-0" />
                <span>Freelancer</span>
              </button>

              <button
                onClick={() => setRole('client')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all text-xs ${
                  role === 'client'
                    ? 'bg-zinc-900 text-white shadow-xs font-semibold'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-white/40'
                }`}
                title="Switch to MSME / Client Mode"
              >
                <Building2 className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                <span className="flex flex-col text-[10px] leading-tight text-left font-medium">
                  <span>MSME</span>
                  <span>/ Client</span>
                </span>
              </button>
            </div>

            {/* User Profile Pill */}
            {currentUser && (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="flex items-center gap-2 py-1 px-2 sm:px-2.5 rounded-full bg-white border border-zinc-200/90 hover:border-indigo-300 shadow-xs hover:shadow-sm transition-all focus:outline-none"
                title={`Logged in as ${currentUser.name}. Click to switch account or sign out.`}
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-6 h-6 rounded-full object-cover border border-zinc-200"
                />
                <span className="text-xs font-bold text-zinc-800 hidden sm:inline">
                  {currentUser.name.split(' ')[0]}
                </span>
              </button>
            )}

            {/* AI Scoper Action Button */}
            <button
              onClick={() => setIsScoperModalOpen(true)}
              className="flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white shadow-sm hover:shadow transition-all group hover:scale-[1.02] active:scale-[0.98] shrink-0"
              title="Launch AI Project Scoper & Milestone Generator"
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-400 shrink-0 group-hover:rotate-12 transition-transform" />
              <div className="flex flex-col text-[10px] sm:text-[10.5px] leading-none text-left font-extrabold tracking-tight">
                <span>AI</span>
                <span>Scoper</span>
              </div>
              <ArrowRight className="w-3 h-3 text-zinc-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </button>

            {/* Mobile Hamburger Menu Toggle Button (< lg) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200/80 text-zinc-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* ======================================================== */}
      {/* MOBILE SLIDE-OVER DRAWER MENU (< lg screens)            */}
      {/* ======================================================== */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 lg:hidden"
            />

            {/* Drawer Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl z-50 p-5 flex flex-col justify-between overflow-y-auto lg:hidden border-l border-zinc-200"
            >
              <div>
                {/* Header inside Drawer */}
                <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-white border border-zinc-200 p-0.5 flex items-center justify-center overflow-hidden">
                      <img
                        src="/techpunjab-logo.png"
                        alt="TechPunjab Logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <span className="font-extrabold text-sm text-zinc-900">TechPunjab</span>
                      <p className="text-[10px] text-zinc-500">Platform Navigation</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1.5 rounded-full hover:bg-zinc-100 text-zinc-500 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Role Switcher in Mobile Drawer */}
                <div className="mt-5">
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider font-mono block mb-2">
                    Active Perspective
                  </span>
                  <div className="grid grid-cols-2 gap-2 bg-zinc-100 p-1 rounded-2xl border border-zinc-200">
                    <button
                      onClick={() => setRole('freelancer')}
                      className={`flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold transition-all ${
                        role === 'freelancer'
                          ? 'bg-[#4f46e5] text-white shadow-sm'
                          : 'text-zinc-600 hover:text-zinc-900'
                      }`}
                    >
                      <User className="w-3.5 h-3.5" />
                      <span>Freelancer</span>
                    </button>
                    <button
                      onClick={() => setRole('client')}
                      className={`flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold transition-all ${
                        role === 'client'
                          ? 'bg-zinc-900 text-white shadow-sm'
                          : 'text-zinc-600 hover:text-zinc-900'
                      }`}
                    >
                      <Building2 className="w-3.5 h-3.5" />
                      <span>MSME / Client</span>
                    </button>
                  </div>
                </div>

                {/* Navigation Links in Mobile Drawer */}
                <div className="mt-6">
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider font-mono block mb-2">
                    Navigation
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      const displayText = item.label || `${item.line1} ${item.line2}`;

                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            item.action();
                            setIsMobileMenuOpen(false);
                          }}
                          className={`flex items-center justify-between w-full px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all text-left ${
                            isActive
                              ? 'bg-zinc-900 text-white shadow-sm'
                              : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-700'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.iconColor}`} />
                            <span className="text-[13px]">{displayText}</span>
                            {item.hasIndicator && (
                              <span className={`w-1.5 h-3 rounded-full ${isActive ? 'bg-indigo-300' : 'bg-indigo-500'}`} />
                            )}
                          </div>
                          <ChevronRight className={`w-4 h-4 ${isActive ? 'text-zinc-400' : 'text-zinc-300'}`} />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Drawer Bottom Actions */}
              <div className="pt-6 border-t border-zinc-100 mt-6 flex flex-col gap-2.5">
                {/* User card */}
                {currentUser && (
                  <div 
                    onClick={() => {
                      setIsLoginModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 p-2.5 rounded-2xl bg-zinc-50 border border-zinc-200 cursor-pointer hover:bg-zinc-100 transition-colors"
                  >
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-9 h-9 rounded-full object-cover border border-zinc-200"
                    />
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-xs font-bold text-zinc-900 truncate">{currentUser.name}</p>
                      <p className="text-[10px] text-zinc-500 truncate">{currentUser.email}</p>
                    </div>
                    <span className="text-[10px] font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
                      Switch
                    </span>
                  </div>
                )}

                {/* AI Scoper Full CTA */}
                <button
                  onClick={() => {
                    setIsScoperModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold shadow-md transition-all"
                >
                  <Sparkles className="w-4 h-4 text-pink-400" />
                  <span>Launch AI Project Scoper</span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-400 ml-1" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
