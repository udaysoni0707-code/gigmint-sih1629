'use client';

import React, { createContext, useContext, useState } from 'react';
import { 
  UserRole, 
  FreelancerProfile, 
  GigProject, 
  Milestone, 
  KanbanTask, 
  EscrowStatus,
  ProposalBid,
  PSDMCertification
} from '@/types';
import { 
  INITIAL_FREELANCER, 
  INITIAL_GIGS, 
  INITIAL_KANBAN_TASKS, 
  PSDM_VERIFIED_LEDGER 
} from '@/data/mockData';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  activeTab: 'dashboard' | 'explore' | 'workspace' | 'escrow' | 'ledger';
  setActiveTab: (tab: 'dashboard' | 'explore' | 'workspace' | 'escrow' | 'ledger') => void;
  
  freelancer: FreelancerProfile;
  gigs: GigProject[];
  activeGig: GigProject;
  setActiveGig: (gig: GigProject) => void;
  kanbanTasks: KanbanTask[];
  ledger: PSDMCertification[];

  // Escrow state & simulator
  escrowStatus: EscrowStatus;
  escrowAmount: number;
  activeMilestoneIndex: number;
  lockEscrowFunds: (amount?: number) => void;
  submitDeliverable: (note: string, fileName?: string) => void;
  approveAndDisburse: () => void;
  requestRevision: (feedback: string) => void;
  resetEscrowDemo: () => void;

  // Modals
  isEscrowModalOpen: boolean;
  setIsEscrowModalOpen: (open: boolean) => void;
  isScoperModalOpen: boolean;
  setIsScoperModalOpen: (open: boolean) => void;
  isQuickBidOpen: boolean;
  setIsQuickBidOpen: (open: boolean) => void;
  isLedgerModalOpen: boolean;
  setIsLedgerModalOpen: (open: boolean) => void;
  selectedGigForBid: GigProject | null;
  openQuickBid: (gig: GigProject) => void;

  // Kanban
  updateTaskColumn: (taskId: string, newColumn: KanbanTask['column']) => void;

  // Project Scoper
  addNewProject: (newGig: GigProject) => void;

  // Auth & Welcome
  isWelcomeModalOpen: boolean;
  setIsWelcomeModalOpen: (open: boolean) => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  currentUser: {
    name: string;
    role: UserRole;
    avatar: string;
    email: string;
    psdmId?: string;
  } | null;
  loginUser: (role: UserRole, customName?: string, email?: string) => void;
  logoutUser: () => void;

  // Notification / Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('freelancer');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'explore' | 'workspace' | 'escrow' | 'ledger'>('dashboard');
  
  const [freelancer, setFreelancer] = useState<FreelancerProfile>(INITIAL_FREELANCER);
  const [gigs, setGigs] = useState<GigProject[]>(INITIAL_GIGS);
  const [activeGig, setActiveGig] = useState<GigProject>(INITIAL_GIGS[0]);
  const [kanbanTasks, setKanbanTasks] = useState<KanbanTask[]>(INITIAL_KANBAN_TASKS);
  const [ledger] = useState<PSDMCertification[]>(PSDM_VERIFIED_LEDGER);

  // Escrow Simulator State
  const [escrowStatus, setEscrowStatus] = useState<EscrowStatus>('ESCROW_LOCKED');
  const [escrowAmount, setEscrowAmount] = useState<number>(10000);
  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState<number>(1); // Milestone 2

  // Modals state
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isEscrowModalOpen, setIsEscrowModalOpen] = useState(false);
  const [isScoperModalOpen, setIsScoperModalOpen] = useState(false);
  const [isQuickBidOpen, setIsQuickBidOpen] = useState(false);
  const [isLedgerModalOpen, setIsLedgerModalOpen] = useState(false);
  const [selectedGigForBid, setSelectedGigForBid] = useState<GigProject | null>(INITIAL_GIGS[0]);

  // Current User Auth State
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    role: UserRole;
    avatar: string;
    email: string;
    psdmId?: string;
  } | null>({
    name: INITIAL_FREELANCER.name,
    role: 'freelancer',
    avatar: INITIAL_FREELANCER.avatar,
    email: 'gurpreet.dev@psdm.in',
    psdmId: 'PB-PSDM-2024-AI-89421',
  });

  const loginUser = (newRole: UserRole, customName?: string, email?: string) => {
    setRole(newRole);
    if (newRole === 'freelancer') {
      setCurrentUser({
        name: customName || INITIAL_FREELANCER.name,
        role: 'freelancer',
        avatar: INITIAL_FREELANCER.avatar,
        email: email || 'gurpreet.dev@psdm.in',
        psdmId: 'PB-PSDM-2024-AI-89421',
      });
    } else {
      setCurrentUser({
        name: customName || 'Harjit Chawla',
        role: 'client',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        email: email || 'harjit@amritsarafro.com',
        psdmId: 'PB-MSME-2024-9182',
      });
    }
    setIsLoginModalOpen(false);
    showToast(`🎉 Logged in as ${customName || (newRole === 'freelancer' ? INITIAL_FREELANCER.name : 'Harjit Chawla')} (${newRole === 'freelancer' ? 'PSDM Trainee' : 'MSME Employer'})!`);
  };

  const logoutUser = () => {
    setCurrentUser(null);
    showToast('👋 You have been logged out.');
  };

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Step 1: Client locks funds in Escrow
  const lockEscrowFunds = (amount = 10000) => {
    setEscrowAmount(amount);
    setEscrowStatus('ESCROW_LOCKED');
    
    // update current gig milestone
    setGigs(prev => prev.map(g => {
      if (g.id === activeGig.id) {
        const updatedMs = [...g.milestones];
        if (updatedMs[activeMilestoneIndex]) {
          updatedMs[activeMilestoneIndex].status = 'LOCKED';
        }
        return { ...g, milestones: updatedMs, escrowLockedAmount: amount };
      }
      return g;
    }));

    showToast(`🔒 ₹${amount.toLocaleString('en-IN')} deposited & locked into Smart Escrow!`);
  };

  // Step 2: Freelancer submits deliverable
  const submitDeliverable = (note: string, fileName = 'build-v1.2-preview.zip') => {
    setEscrowStatus('WORK_SUBMITTED');
    setGigs(prev => prev.map(g => {
      if (g.id === activeGig.id) {
        const updatedMs = [...g.milestones];
        if (updatedMs[activeMilestoneIndex]) {
          updatedMs[activeMilestoneIndex].status = 'IN_REVIEW';
          updatedMs[activeMilestoneIndex].submissionNote = note;
          updatedMs[activeMilestoneIndex].submissionFile = fileName;
          updatedMs[activeMilestoneIndex].submissionDate = 'Just now';
        }
        return { ...g, milestones: updatedMs };
      }
      return g;
    }));

    // Update corresponding kanban task to IN_REVIEW
    setKanbanTasks(prev => prev.map(t => {
      if (t.milestoneTitle.includes('Milestone 2')) {
        return { ...t, column: 'IN_REVIEW' };
      }
      return t;
    }));

    showToast('🚀 Deliverable submitted! Client notified for milestone review.');
  };

  // Step 3: Client review & approve -> releases funds via UPI simulation
  const approveAndDisburse = () => {
    setEscrowStatus('DISBURSED_TO_FREELANCER');
    
    // Update freelancer earnings
    setFreelancer(prev => ({
      ...prev,
      totalEarnings: prev.totalEarnings + escrowAmount,
    }));

    // Update milestone in gig
    setGigs(prev => prev.map(g => {
      if (g.id === activeGig.id) {
        const updatedMs = [...g.milestones];
        if (updatedMs[activeMilestoneIndex]) {
          updatedMs[activeMilestoneIndex].status = 'COMPLETED';
          updatedMs[activeMilestoneIndex].upiRefNumber = `UPI/${Date.now().toString().slice(-10)}/SUCCESS`;
          updatedMs[activeMilestoneIndex].transactionHash = `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`;
        }
        return { 
          ...g, 
          milestones: updatedMs,
          escrowLockedAmount: Math.max(0, g.escrowLockedAmount - escrowAmount)
        };
      }
      return g;
    }));

    // Update kanban task
    setKanbanTasks(prev => prev.map(t => {
      if (t.milestoneTitle.includes('Milestone 2')) {
        return { ...t, column: 'COMPLETED' };
      }
      return t;
    }));

    showToast(`✅ Milestone Approved! ₹${escrowAmount.toLocaleString('en-IN')} disbursed to UPI VPA.`);
  };

  // Step 4: Dispute / Revision request
  const requestRevision = (feedback: string) => {
    setEscrowStatus('REVISION_REQUESTED');
    setGigs(prev => prev.map(g => {
      if (g.id === activeGig.id) {
        const updatedMs = [...g.milestones];
        if (updatedMs[activeMilestoneIndex]) {
          updatedMs[activeMilestoneIndex].status = 'REVISION';
          updatedMs[activeMilestoneIndex].feedbackNote = feedback;
        }
        return { ...g, milestones: updatedMs };
      }
      return g;
    }));

    // Update kanban task to IN_PROGRESS
    setKanbanTasks(prev => prev.map(t => {
      if (t.milestoneTitle.includes('Milestone 2')) {
        return { ...t, column: 'IN_PROGRESS' };
      }
      return t;
    }));

    showToast('⚠️ Revision requested. Escrow remains securely locked.');
  };

  const resetEscrowDemo = () => {
    setEscrowStatus('ESCROW_LOCKED');
    setEscrowAmount(10000);
    showToast('🔄 Escrow Simulator reset to default state.');
  };

  const openQuickBid = (gig: GigProject) => {
    setSelectedGigForBid(gig);
    setIsQuickBidOpen(true);
  };

  const updateTaskColumn = (taskId: string, newColumn: KanbanTask['column']) => {
    setKanbanTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return { ...t, column: newColumn };
      }
      return t;
    }));
    showToast(`Sprint board updated to ${newColumn.replace('_', ' ')}`);
  };

  const addNewProject = (newGig: GigProject) => {
    setGigs(prev => [newGig, ...prev]);
    setActiveGig(newGig);
    showToast(`✨ Project "${newGig.title}" created with AI milestones!`);
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        activeTab,
        setActiveTab,
        freelancer,
        gigs,
        activeGig,
        setActiveGig,
        kanbanTasks,
        ledger,
        escrowStatus,
        escrowAmount,
        activeMilestoneIndex,
        lockEscrowFunds,
        submitDeliverable,
        approveAndDisburse,
        requestRevision,
        resetEscrowDemo,
        isEscrowModalOpen,
        setIsEscrowModalOpen,
        isScoperModalOpen,
        setIsScoperModalOpen,
        isQuickBidOpen,
        setIsQuickBidOpen,
        isLedgerModalOpen,
        setIsLedgerModalOpen,
        selectedGigForBid,
        openQuickBid,
        updateTaskColumn,
        addNewProject,
        isWelcomeModalOpen,
        setIsWelcomeModalOpen,
        isLoginModalOpen,
        setIsLoginModalOpen,
        currentUser,
        loginUser,
        logoutUser,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
