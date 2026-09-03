'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  Sparkles, 
  ArrowRight, 
  User, 
  Building2, 
  Award, 
  CheckCircle2, 
  Zap,
  LogIn
} from 'lucide-react';

export const WelcomeModal: React.FC = () => {
  const { 
    isWelcomeModalOpen, 
    setIsWelcomeModalOpen, 
    setRole, 
    setIsLoginModalOpen,
    showToast 
  } = useApp();

  if (!isWelcomeModalOpen) return null;

  const handleSelectRole = (role: 'freelancer' | 'client') => {
    setRole(role);
    setIsWelcomeModalOpen(false);
    showToast(
      role === 'freelancer' 
        ? '🧑‍💻 Switched to PSDM Certified Freelancer Mode' 
        : '🏢 Switched to Punjab MSME Client Mode'
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-md animate-in fade-in duration-300">
      <div 
        className="bg-white rounded-[32px] border border-zinc-200/90 shadow-2xl w-full max-w-xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-pink-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={() => setIsWelcomeModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors z-20"
          title="Close Welcome Window"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content Header with Prominent Logo */}
        <div className="p-6 sm:p-8 text-center flex flex-col items-center">
          
          {/* Animated Glowing Logo Badge */}
          <div className="relative mb-4 group cursor-pointer" onClick={() => showToast('✨ GigMint Protocol v1.0 • Punjab Skill Development Mission')}>
            <div className="w-20 h-20 rounded-3xl p-1 bg-gradient-to-tr from-indigo-600 via-pink-500 to-emerald-400 shadow-xl shadow-indigo-200 animate-pulse-subtle flex items-center justify-center group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-zinc-950 rounded-[20px] flex items-center justify-center text-white font-extrabold text-3xl shadow-inner">
                <span className="bg-gradient-to-br from-white to-zinc-300 bg-clip-text text-transparent">G</span>
              </div>
            </div>
            <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-1 border-2 border-white shadow-md">
              <ShieldCheck className="w-4 h-4" />
            </span>
          </div>

          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase font-mono font-bold tracking-wider px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              Smart India Hackathon #SIH1629
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 mt-1">
            Welcome to <span className="bg-gradient-to-r from-indigo-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">GigMint</span>
          </h2>

          <p className="text-xs sm:text-sm text-zinc-500 mt-2 max-w-md">
            Punjab Skill Development Mission (Govt. of Punjab) verified smart gig portal connecting certified trainees directly with MSME employers.
          </p>

          {/* Key Feature Highlights Pill Strip */}
          <div className="grid grid-cols-3 gap-2 w-full mt-6 text-left">
            <div className="p-2.5 rounded-2xl bg-zinc-50 border border-zinc-200/80">
              <div className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center mb-1.5">
                <Lock className="w-3.5 h-3.5" />
              </div>
              <div className="text-[11px] font-bold text-zinc-900 leading-tight">UPI Escrow</div>
              <div className="text-[10px] text-zinc-500">100% Milestone Safety</div>
            </div>

            <div className="p-2.5 rounded-2xl bg-zinc-50 border border-zinc-200/80">
              <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-1.5">
                <Award className="w-3.5 h-3.5" />
              </div>
              <div className="text-[11px] font-bold text-zinc-900 leading-tight">PSDM Ledger</div>
              <div className="text-[10px] text-zinc-500">On-Chain SHA-256 Proof</div>
            </div>

            <div className="p-2.5 rounded-2xl bg-zinc-50 border border-zinc-200/80">
              <div className="w-6 h-6 rounded-lg bg-pink-100 text-pink-700 flex items-center justify-center mb-1.5">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div className="text-[11px] font-bold text-zinc-900 leading-tight">AI Scoper</div>
              <div className="text-[10px] text-zinc-500">98% Semantic Match</div>
            </div>
          </div>

          {/* Quick Choice: Select Mode to Enter */}
          <div className="w-full mt-6 space-y-2.5">
            <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider text-center">
              Choose your persona to get started:
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => handleSelectRole('freelancer')}
                className="p-3.5 rounded-2xl border-2 border-indigo-500 bg-indigo-50/50 hover:bg-indigo-50 text-indigo-950 font-bold text-xs flex items-center justify-between group transition-all shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-zinc-900">PSDM Trainee</div>
                    <div className="text-[10px] text-indigo-700 font-normal">Explore Gigs & Bids</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-indigo-600 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => handleSelectRole('client')}
                className="p-3.5 rounded-2xl border-2 border-zinc-200 hover:border-zinc-900 bg-white hover:bg-zinc-50 text-zinc-900 font-bold text-xs flex items-center justify-between group transition-all shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-zinc-900 text-white flex items-center justify-center">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-zinc-900">MSME Employer</div>
                    <div className="text-[10px] text-zinc-500 font-normal">Post & Fund Projects</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-900 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Alternative: Open Full Login Page Modal */}
          <div className="mt-5 pt-4 border-t border-zinc-100 w-full flex items-center justify-between text-xs text-zinc-500">
            <span>Need custom credentials?</span>
            <button
              onClick={() => {
                setIsWelcomeModalOpen(false);
                setIsLoginModalOpen(true);
              }}
              className="font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 hover:underline"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Go to Login Portal</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
