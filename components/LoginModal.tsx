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
  KeyRound, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  UserPlus,
  LogIn,
  Check
} from 'lucide-react';
import { INITIAL_FREELANCER } from '@/data/mockData';

export const LoginModal: React.FC = () => {
  const { 
    isLoginModalOpen, 
    setIsLoginModalOpen, 
    loginUser, 
    showToast 
  } = useApp();

  const [authType, setAuthType] = useState<'signin' | 'signup'>('signin');
  const [authRole, setAuthRole] = useState<'freelancer' | 'client'>('freelancer');
  
  // Sign In state
  const [email, setEmail] = useState('gurpreet.dev@psdm.in');
  const [password, setPassword] = useState('••••••••••••');
  const [candidateId, setCandidateId] = useState('PB-PSDM-2024-AI-89421');
  const [isOtpMode, setIsOtpMode] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  // Sign Up state
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpTrade, setSignUpTrade] = useState('Full Stack & Generative AI');
  const [signUpPassword, setSignUpPassword] = useState('');

  if (!isLoginModalOpen) return null;

  const handleQuickLogin = (role: 'freelancer' | 'client') => {
    if (role === 'freelancer') {
      loginUser('freelancer', INITIAL_FREELANCER.name, 'gurpreet.dev@psdm.in');
    } else {
      loginUser('client', 'Harjit Chawla', 'harjit@amritsarafro.com');
    }
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authRole === 'freelancer') {
      loginUser('freelancer', 'Gurpreet Singh', email);
    } else {
      loginUser('client', 'Harjit Chawla', email);
    }
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const displayName = signUpName.trim() || (authRole === 'freelancer' ? 'New Trainee' : 'New MSME Employer');
    loginUser(authRole, displayName, signUpEmail || 'user@techpunjab.in');
    showToast(`🎉 Registration complete! Welcome to TechPunjab, ${displayName}!`);
  };

  const handleSendOtp = () => {
    setOtpSent(true);
    showToast('📲 Demo OTP sent: 8942');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/75 backdrop-blur-md animate-in fade-in duration-300">
      <div 
        className="bg-white rounded-[32px] border border-zinc-200/90 shadow-2xl w-full max-w-lg overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Banner with TechPunjab Logo */}
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
                <h3 className="text-base font-extrabold text-zinc-900">
                  {authType === 'signin' ? 'TechPunjab Sign In' : 'Join TechPunjab (Sign Up)'}
                </h3>
                <span className="text-[10px] uppercase font-mono font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
                  Govt. of Punjab SSO
                </span>
              </div>
              <p className="text-xs text-zinc-500">
                {authType === 'signin' 
                  ? 'Access certified vocational gigs & MSME smart escrow' 
                  : 'Register as certified candidate or verified MSME enterprise'}
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

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          
          {/* Main Mode Toggle: Sign In vs Sign Up */}
          <div className="grid grid-cols-2 p-1 bg-zinc-100 rounded-2xl border border-zinc-200/90">
            <button
              type="button"
              onClick={() => setAuthType('signin')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                authType === 'signin'
                  ? 'bg-white text-zinc-950 shadow-sm ring-1 ring-zinc-200'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>

            <button
              type="button"
              onClick={() => setAuthType('signup')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                authType === 'signup'
                  ? 'bg-emerald-600 text-white shadow-sm ring-1 ring-emerald-600'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Sign Up</span>
            </button>
          </div>

          {/* Persona Picker: PSDM Trainee vs MSME Client */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={() => {
                setAuthRole('freelancer');
                setEmail('gurpreet.dev@psdm.in');
              }}
              className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                authRole === 'freelancer'
                  ? 'bg-indigo-50/80 border-indigo-300 text-indigo-700 ring-1 ring-indigo-400/20'
                  : 'bg-white border-zinc-200 text-zinc-600 hover:border-zinc-300'
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
              className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                authRole === 'client'
                  ? 'bg-zinc-900 border-zinc-900 text-white'
                  : 'bg-white border-zinc-200 text-zinc-600 hover:border-zinc-300'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>MSME Employer</span>
            </button>
          </div>

          {/* SIGN IN VIEW */}
          {authType === 'signin' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Quick Demo 1-Click Access Box */}
              <div className="p-3 rounded-2xl bg-gradient-to-r from-indigo-50 via-emerald-50 to-pink-50 border border-indigo-200/70">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold text-indigo-950 flex items-center gap-1 uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                    Demo 1-Click Instant Access
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono">No Typing Required</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleQuickLogin(authRole)}
                  className="w-full py-2 px-3 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-semibold flex items-center justify-between shadow-sm transition-all"
                >
                  <span>
                    {authRole === 'freelancer' 
                      ? 'Sign In as Gurpreet Singh (PSDM Level 5)' 
                      : 'Sign In as Harjit Chawla (Amritsar AgroFoods)'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-300" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSignInSubmit} className="space-y-3">
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
                        className="w-full pl-9 pr-3 py-2 text-xs font-mono font-semibold rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                        className="w-full pl-9 pr-3 py-2 text-xs font-mono font-semibold rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-xs font-semibold text-zinc-700 block mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs font-medium rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-zinc-700">Password</label>
                    <button
                      type="button"
                      onClick={() => setIsOtpMode(!isOtpMode)}
                      className="text-[11px] text-emerald-700 hover:underline"
                    >
                      {isOtpMode ? 'Use Password' : 'Use Phone OTP'}
                    </button>
                  </div>

                  {!isOtpMode ? (
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs font-mono rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={otpInput}
                        onChange={(e) => setOtpInput(e.target.value)}
                        placeholder="Enter 4-digit OTP (8942)"
                        className="w-full px-3 py-2 text-xs font-mono font-bold rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Sign In to Dashboard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* SIGN UP VIEW */}
          {authType === 'signup' && (
            <form onSubmit={handleSignUpSubmit} className="space-y-3 animate-in fade-in duration-200">
              <div>
                <label className="text-xs font-semibold text-zinc-700 block mb-1">
                  Full Name / Enterprise Name
                </label>
                <input
                  type="text"
                  required
                  value={signUpName}
                  onChange={(e) => setSignUpName(e.target.value)}
                  placeholder={authRole === 'freelancer' ? 'e.g., Simranjit Kaur' : 'e.g., Punjab Auto Works Pvt Ltd'}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-700 block mb-1">
                  Official Email or Mobile Number
                </label>
                <input
                  type="email"
                  required
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  placeholder="name@punjab.gov.in or email@domain.com"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-700 block mb-1">
                  {authRole === 'freelancer' ? 'Vocational Trade / NSQF Skill' : 'Industry Cluster & Location'}
                </label>
                <input
                  type="text"
                  value={signUpTrade}
                  onChange={(e) => setSignUpTrade(e.target.value)}
                  placeholder={authRole === 'freelancer' ? 'Full Stack, IoT, CAD, AI Builder' : 'Ludhiana Focal Point / Mohali IT City'}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-700 block mb-1">
                  Create Account Password
                </label>
                <input
                  type="password"
                  required
                  value={signUpPassword}
                  onChange={(e) => setSignUpPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Create TechPunjab Account & Sign In</span>
                </button>
              </div>
            </form>
          )}

          {/* Bottom Switch between Sign In and Sign Up */}
          <div className="pt-2 text-center text-xs text-zinc-500">
            {authType === 'signin' ? (
              <p>
                Don&apos;t have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => setAuthType('signup')}
                  className="font-bold text-emerald-700 hover:underline"
                >
                  Sign Up now
                </button>
              </p>
            ) : (
              <p>
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => setAuthType('signin')}
                  className="font-bold text-indigo-600 hover:underline"
                >
                  Sign In here
                </button>
              </p>
            )}
          </div>

        </div>

        {/* Footer Note */}
        <div className="p-3.5 bg-zinc-50 border-t border-zinc-100 text-center text-[11px] text-zinc-500">
          Govt. of Punjab • Punjab Skill Development Mission (PSDM) SSO
        </div>

      </div>
    </div>
  );
};
