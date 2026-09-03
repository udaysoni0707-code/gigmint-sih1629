'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  ShieldCheck, 
  User, 
  Building2, 
  Lock, 
  Mail, 
  KeyRound, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Award,
  LogIn,
  UserPlus,
  Check
} from 'lucide-react';
import { INITIAL_FREELANCER } from '@/data/mockData';

export default function LoginPage() {
  const router = useRouter();
  const { loginUser, showToast } = useApp();

  const [authType, setAuthType] = useState<'signin' | 'signup'>('signin');
  const [authRole, setAuthRole] = useState<'freelancer' | 'client'>('freelancer');
  
  // Sign in state
  const [email, setEmail] = useState('gurpreet.dev@psdm.in');
  const [password, setPassword] = useState('••••••••••••');
  const [candidateId, setCandidateId] = useState('PB-PSDM-2024-AI-89421');

  // Sign up state
  const [name, setName] = useState('');
  const [trade, setTrade] = useState('Full Stack Web & Generative AI');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authRole === 'freelancer') {
      loginUser('freelancer', INITIAL_FREELANCER.name, email);
    } else {
      loginUser('client', 'Harjit Chawla', email);
    }
    router.push('/');
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const displayName = name.trim() || (authRole === 'freelancer' ? 'New Trainee' : 'New MSME Employer');
    loginUser(authRole, displayName, signupEmail || 'candidate@techpunjab.in');
    showToast(`🎉 Welcome to TechPunjab, ${displayName}!`);
    router.push('/');
  };

  const handleQuickDemo = (role: 'freelancer' | 'client') => {
    if (role === 'freelancer') {
      loginUser('freelancer', INITIAL_FREELANCER.name, 'gurpreet.dev@psdm.in');
    } else {
      loginUser('client', 'Harjit Chawla', 'harjit@amritsarafro.com');
    }
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-canvas flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      
      {/* Top Navbar */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-11 h-11 rounded-2xl bg-white border border-zinc-200 p-0.5 shadow-md shadow-zinc-200/50 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform shrink-0">
            <img
              src="/techpunjab-logo.png"
              alt="TechPunjab Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg text-zinc-900 group-hover:text-emerald-700 transition-colors">TechPunjab</span>
              <span className="text-[10px] uppercase font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                Govt. of Punjab
              </span>
            </div>
            <p className="text-[10px] text-zinc-500 font-medium">Skilled Tech Workers • Stronger Future</p>
          </div>
        </Link>

        <Link
          href="/"
          className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Main Login/Signup Card */}
      <div className="max-w-md mx-auto w-full my-8">
        <div className="bento-card p-6 sm:p-8 border border-zinc-200/80 shadow-bento">
          
          <div className="text-center mb-5">
            <div className="w-16 h-16 rounded-full bg-white border border-zinc-200 shadow-sm p-1.5 flex items-center justify-center mx-auto mb-3">
              <img
                src="/techpunjab-logo.png"
                alt="TechPunjab Emblem"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-2xl font-extrabold text-zinc-900 tracking-tight">
              {authType === 'signin' ? 'Sign In to TechPunjab' : 'Join TechPunjab (Sign Up)'}
            </h1>
            <p className="text-xs text-zinc-500 mt-1">
              {authType === 'signin'
                ? 'Punjab Skill Development Mission Verified Credentials'
                : 'Register as Certified Trainee or Verified MSME Enterprise'}
            </p>
          </div>

          {/* Mode Switch: Sign In vs Sign Up */}
          <div className="grid grid-cols-2 p-1 bg-zinc-100 rounded-2xl border border-zinc-200 mb-4">
            <button
              type="button"
              onClick={() => setAuthType('signin')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                authType === 'signin'
                  ? 'bg-white text-zinc-950 shadow-sm'
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
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Sign Up</span>
            </button>
          </div>

          {/* Role Toggle: PSDM Trainee vs MSME Client */}
          <div className="grid grid-cols-2 gap-2 mb-5">
            <button
              type="button"
              onClick={() => {
                setAuthRole('freelancer');
                setEmail('gurpreet.dev@psdm.in');
              }}
              className={`p-2.5 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-2 ${
                authRole === 'freelancer'
                  ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
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
              className={`p-2.5 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-2 ${
                authRole === 'client'
                  ? 'bg-zinc-900 border-zinc-900 text-white'
                  : 'bg-white border-zinc-200 text-zinc-600 hover:border-zinc-300'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>MSME Employer</span>
            </button>
          </div>

          {/* SIGN IN FORM */}
          {authType === 'signin' && (
            <div className="space-y-4">
              {/* 1-Click Quick Demo Box */}
              <div className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-200/80 mb-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-indigo-900 flex items-center gap-1 uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                    Demo 1-Click Access
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400">Instant</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleQuickDemo(authRole)}
                  className="w-full py-2 px-3 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-semibold flex items-center justify-between shadow-sm transition-all"
                >
                  <span>
                    {authRole === 'freelancer' 
                      ? 'Sign In as Gurpreet Singh (NSQF L5)' 
                      : 'Sign In as Harjit Chawla (Amritsar AgroFoods)'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-300" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSignInSubmit} className="space-y-3.5">
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
                        placeholder="PB-PSDM-2024-AI-89421"
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
                  <label className="text-xs font-semibold text-zinc-700 block mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs font-mono rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 mt-2"
                >
                  <span>Sign In</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          )}

          {/* SIGN UP FORM */}
          {authType === 'signup' && (
            <form onSubmit={handleSignUpSubmit} className="space-y-3.5 animate-in fade-in duration-200">
              <div>
                <label className="text-xs font-semibold text-zinc-700 block mb-1">
                  Full Name / Enterprise Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={authRole === 'freelancer' ? 'e.g., Simranjit Kaur' : 'e.g., Punjab Auto Works'}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-700 block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-700 block mb-1">
                  {authRole === 'freelancer' ? 'NSQF Certified Specialization' : 'Industry Sector'}
                </label>
                <input
                  type="text"
                  value={trade}
                  onChange={(e) => setTrade(e.target.value)}
                  placeholder={authRole === 'freelancer' ? 'Full Stack, IoT, AI Engineering' : 'Manufacturing, FMCG, Tech'}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-700 block mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  placeholder="Create strong password"
                  className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 mt-2"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Register & Sign In</span>
              </button>
            </form>
          )}

          {/* Bottom Switch link */}
          <div className="pt-4 text-center text-xs text-zinc-500 border-t border-zinc-100 mt-4">
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
                Already have an account?{' '}
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
      </div>

      {/* Footer */}
      <div className="max-w-5xl mx-auto w-full text-center text-xs text-zinc-400">
        Govt. of Punjab • Punjab Skill Development Mission • TechPunjab Official Portal
      </div>

    </div>
  );
}
