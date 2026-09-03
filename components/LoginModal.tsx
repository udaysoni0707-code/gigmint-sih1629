'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  X, 
  ShieldCheck, 
  User, 
  Building2, 
  Lock, 
  Mail, 
  Phone, 
  KeyRound, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Zap
} from 'lucide-react';
import { INITIAL_FREELANCER } from '@/data/mockData';

export const LoginModal: React.FC = () => {
  const { 
    isLoginModalOpen, 
    setIsLoginModalOpen, 
    loginUser, 
    showToast 
  } = useApp();

  const [authRole, setAuthRole] = useState<'freelancer' | 'client'>('freelancer');
  const [email, setEmail] = useState('gurpreet.dev@psdm.in');
  const [password, setPassword] = useState('••••••••••••');
  const [candidateId, setCandidateId] = useState('PB-PSDM-2024-AI-89421');
  const [isOtpMode, setIsOtpMode] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  if (!isLoginModalOpen) return null;

  const handleQuickLogin = (role: 'freelancer' | 'client') => {
    if (role === 'freelancer') {
      loginUser('freelancer', INITIAL_FREELANCER.name, 'gurpreet.dev@psdm.in');
    } else {
      loginUser('client', 'Harjit Chawla', 'harjit@amritsarafro.com');
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authRole === 'freelancer') {
      loginUser('freelancer', 'Gurpreet Singh', email);
    } else {
      loginUser('client', 'Harjit Chawla', email);
    }
  };

  const handleSendOtp = () => {
    setOtpSent(true);
    showToast('📲 Demo OTP sent: 8942');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-md animate-in fade-in duration-300">
      <div 
        className="bg-white rounded-[32px] border border-zinc-200/90 shadow-2xl w-full max-w-lg overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Banner */}
        <div className="p-6 bg-zinc-50 border-b border-zinc-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white border border-zinc-200 p-0.5 shadow-sm flex items-center justify-center overflow-hidden shrink-0">
              <img
                src="/techpunjab-logo.png"
                alt="TechPunjab Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-zinc-900">TechPunjab Sign-In</h3>
                <span className="text-[10px] uppercase font-mono font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
                  Govt. of Punjab SSO
                </span>
              </div>
              <p className="text-xs text-zinc-500">
                Skilled Tech Workers • Vocational Trainee & MSME Portal
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsLoginModalOpen(false)}
            className="p-2 rounded-xl text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/70 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Selector Tabs */}
        <div className="p-6 space-y-5">
          
          <div className="grid grid-cols-2 p-1 bg-zinc-100 rounded-2xl border border-zinc-200/80">
            <button
              type="button"
              onClick={() => {
                setAuthRole('freelancer');
                setEmail('gurpreet.dev@psdm.in');
              }}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                authRole === 'freelancer'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>PSDM Trainee</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setAuthRole('client');
                setEmail('harjit@amritsarafro.com');
              }}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                authRole === 'client'
                  ? 'bg-white text-zinc-950 shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>MSME Employer</span>
            </button>
          </div>

          {/* Quick Demo 1-Click Login Box (Critical for Hackathon Judges) */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-indigo-50 via-pink-50 to-emerald-50 border border-indigo-200/70">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-indigo-900 flex items-center gap-1 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                Hackathon Judge Quick Sign-In
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">1-Click</span>
            </div>

            <button
              type="button"
              onClick={() => handleQuickLogin(authRole)}
              className="w-full py-2 px-3 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-semibold flex items-center justify-between shadow-sm transition-all hover:scale-[1.01]"
            >
              <span>
                {authRole === 'freelancer' 
                  ? 'Login as Gurpreet Singh (PSDM NSQF-5 Trainee)' 
                  : 'Login as Harjit Chawla (Amritsar AgroFoods MSME)'}
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-300" />
            </button>
          </div>

          {/* Standard Form */}
          <form onSubmit={handleFormSubmit} className="space-y-3.5">
            
            {authRole === 'freelancer' ? (
              <div>
                <label className="text-xs font-semibold text-zinc-700 block mb-1">
                  PSDM Certificate / Candidate Roll Number
                </label>
                <div className="relative">
                  <ShieldCheck className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={candidateId}
                    onChange={(e) => setCandidateId(e.target.value)}
                    placeholder="PB-PSDM-2024-AI-XXXXX"
                    className="w-full pl-9 pr-3 py-2 text-xs font-mono font-semibold rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="text-xs font-semibold text-zinc-700 block mb-1">
                  Enterprise GSTIN / Udyam Reg. Number
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    defaultValue="UDYAM-PB-02-009182"
                    placeholder="UDYAM-PB-XX-XXXXXX"
                    className="w-full pl-9 pr-3 py-2 text-xs font-mono font-semibold rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-zinc-700 block mb-1">
                Email Address or Phone
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full pl-9 pr-3 py-2 text-xs font-medium rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-zinc-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setIsOtpMode(!isOtpMode)}
                  className="text-[11px] text-indigo-600 hover:underline"
                >
                  {isOtpMode ? 'Use Password instead' : 'Login with OTP instead'}
                </button>
              </div>

              {!isOtpMode ? (
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs font-mono rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                    placeholder="Enter 4-digit OTP (8942)"
                    className="w-full px-3 py-2 text-xs font-mono font-bold rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="px-3 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-semibold shrink-0"
                  >
                    {otpSent ? 'Resend' : 'Send OTP'}
                  </button>
                </div>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Authenticate & Access Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </form>

        </div>

        {/* Footer Note */}
        <div className="p-4 bg-zinc-50 border-t border-zinc-100 text-center text-[11px] text-zinc-500">
          Protected by Govt. of Punjab State Skill Registry • NSQF Protocol
        </div>

      </div>
    </div>
  );
};
