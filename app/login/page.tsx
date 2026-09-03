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
  Award
} from 'lucide-react';
import { INITIAL_FREELANCER } from '@/data/mockData';

export default function LoginPage() {
  const router = useRouter();
  const { loginUser, showToast } = useApp();

  const [authRole, setAuthRole] = useState<'freelancer' | 'client'>('freelancer');
  const [email, setEmail] = useState('gurpreet.dev@psdm.in');
  const [password, setPassword] = useState('••••••••••••');
  const [candidateId, setCandidateId] = useState('PB-PSDM-2024-AI-89421');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authRole === 'freelancer') {
      loginUser('freelancer', INITIAL_FREELANCER.name, email);
    } else {
      loginUser('client', 'Harjit Chawla', email);
    }
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
          <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
            <span className="text-xl">G</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg text-zinc-900">GigMint</span>
              <span className="text-[10px] uppercase font-mono font-semibold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
                SIH 1629
              </span>
            </div>
            <p className="text-[10px] text-zinc-500 font-medium">Govt. of Punjab • Skill Mission Hub</p>
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

      {/* Main Login Card */}
      <div className="max-w-md mx-auto w-full my-8">
        <div className="bento-card p-6 sm:p-8 border border-zinc-200/80 shadow-bento">
          
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center mx-auto mb-3">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-extrabold text-zinc-900 tracking-tight">
              Sign In to GigMint
            </h1>
            <p className="text-xs text-zinc-500 mt-1">
              Punjab Skill Development Mission Verified Credentials
            </p>
          </div>

          {/* Role Toggle */}
          <div className="grid grid-cols-2 p-1 bg-zinc-100 rounded-2xl border border-zinc-200 mb-5">
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

          {/* 1-Click Quick Demo Box */}
          <div className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-200/80 mb-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-indigo-900 flex items-center gap-1 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                Hackathon Demo 1-Click Access
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
                  ? 'Login as Gurpreet Singh (NSQF L5)' 
                  : 'Login as Harjit Chawla (Amritsar AgroFoods)'}
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-300" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
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
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs font-medium rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                  className="w-full pl-9 pr-3 py-2 text-xs font-mono rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 mt-2"
            >
              <span>Sign In</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      </div>

      {/* Footer */}
      <div className="max-w-5xl mx-auto w-full text-center text-xs text-zinc-400">
        Govt. of Punjab • Punjab Skill Development Mission • Smart India Hackathon #SIH1629
      </div>

    </div>
  );
}
