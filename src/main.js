// Haven Rental Intelligence Platform - Main entrypoint & coordinator
import { Navbar } from './components/Navbar.js';
import { Footer } from './components/Footer.js';
import { LandingPage } from './screens/LandingPage.js';
import { Register } from './screens/Register.js';
import { Login } from './screens/Login.js';
import { OTPVerification } from './screens/OTPVerification.js';
import { ProfileWizard } from './screens/ProfileWizard.js';
import { VerificationCenter } from './screens/VerificationCenter.js';
import { Dashboard } from './screens/Dashboard.js';
import { PropertyDiscovery } from './screens/PropertyDiscovery.js';
import { LeasingWorkflow } from './screens/LeasingWorkflow.js';
import { EscrowWallet } from './screens/EscrowWallet.js';
import { LandlordPortal } from './screens/LandlordPortal.js';
import { PartnerPortal } from './screens/PartnerPortal.js';
import { AdminConsole } from './screens/AdminConsole.js';

// 1. Core Application State
let state = {
  route: 'landing', // landing | register | login | otp | profile-wizard | verification-center | dashboard | discovery | leasing | wallet
  user: null, // logged in user details { username, role, method }
  registerTab: 'email', // email | phone
  loginTab: 'email', // email | phone
  preselectedRole: 'Tenant', // Tenant | Landlord | Agent | etc.
  verifyCenterTab: 'bvn', // bvn | nin | selfie | documents
  wizardStep: 1,

  // Milestone Navigation
  activeDashboardTab: 'overview', // overview | quality-score | profile | escrow-timeline | settings
  discoveryViewMode: 'grid', // grid | list
  activeDetailsPropertyId: null, // holds property ID currently viewed in details modal
  activeLeasingTab: 'applications', // applications | inspections | lease-studio | chat

  // Registration temporary state
  registrationData: null,

  // Profile Wizard details
  profileData: {
    personalInfo: {
      fullName: 'Osaze Alao',
      dob: '1998-05-12',
      gender: 'Male',
      phone: '+234 812 345 6789',
      email: 'osaze.alao@domain.com'
    },
    locationPreferences: {
      city: 'Lagos',
      neighborhoods: 'Lekki Phase 1, Victoria Island, Yaba',
      budget: '2500000'
    },
    housingPreferences: {
      propertyType: 'Apartment',
      bedrooms: '2',
      amenities: ['Power Backup', 'Security', 'Water Treatment']
    },
    employmentInfo: {
      status: 'Employed',
      employer: 'PropTech Labs Ltd',
      jobTitle: 'Senior UI/UX Analyst'
    },
    incomeInfo: { 
      monthlyIncome: '380000',
      statementUploaded: true 
    },
    lifestylePreferences: {
      pets: false,
      smoking: false,
      quietHours: true,
      sharing: false
    },
    rentalHistory: [
      { id: 1, landlord: 'Chief Alabi', property: '4b Admiralty Way, Lekki', duration: '2 Years (2024-2026)', exitReason: 'Relocating closer to workplace' }
    ],
    references: [
      { id: 1, name: 'Dr. Kunle Benson', relation: 'Former Landlord', contact: '+234 803 111 2222' },
      { id: 2, name: 'Mrs. Funmi Coker', relation: 'Professional Reference', contact: '+234 809 333 4444' }
    ]
  },

  // Verification status check states
  verification: {
    bvnStatus: 'approved',
    ninStatus: 'approved',
    selfieStatus: 'approved',
    employeeIdStatus: 'approved',
    studentIdStatus: 'unverified',
    documentStatus: 'approved'
  },

  // Tenant Quality Score Details
  score: {
    overall: 785,
    financial: 88,
    verification: 96,
    behavior: 90,
    affordability: 82,
    tier: 'Grade A',
    status: 'Excellent'
  },

  // Escrow Ledger Details (Milestone 2 Legacy Ledger)
  escrow: {
    cautionDeposit: 250000,
    advanceRent: 950000,
    totalSecured: 1200000,
    history: [
      { id: 1, type: 'Caution Deposit', amount: 250000, reference: 'ESC-8109-LA', status: 'Secured', date: '2026-06-18' },
      { id: 2, type: 'Advance Rent (10 Months)', amount: 950000, reference: 'ESC-8110-LA', status: 'Secured', date: '2026-06-18' }
    ]
  },

  // Activity Timeline
  timeline: [
    { id: 1, type: 'Agreement', text: 'Structured lease agreement counter-signed.', date: '2026-06-19', status: 'Completed' },
    { id: 2, type: 'Payment', text: 'Escrow caution fee and rent advance cleared.', date: '2026-06-18', status: 'Completed' },
    { id: 3, type: 'Inspection', text: 'Property inspection passed.', date: '2026-06-17', status: 'Completed' },
    { id: 4, type: 'Application', text: 'Qualification application approved.', date: '2026-06-16', status: 'Completed' }
  ],

  // In-app notifications
  notifications: [
    { id: 1, type: 'verification', text: 'Your biometric liveness selfie was matched against NIMC photo registry.', time: '10 mins ago', read: false },
    { id: 2, type: 'escrow', text: 'Caution deposit of ₦250,000 is locked in secure escrow.', time: '2 hrs ago', read: false },
    { id: 3, type: 'match', text: 'New Match: 3 Bed Apartment in Victoria Island fits your location preferences.', time: '1 day ago', read: true }
  ],

  // System Settings
  settings: {
    enable2FA: true,
    hideProfile: false,
    commEmail: true,
    commSMS: true,
    commInApp: true
  },

  // Properties Database
  properties: [
    {
      id: 1,
      title: 'Luxury 2 Bed Penthouse Duplex',
      rent: 3200000,
      bedrooms: 2,
      bathrooms: 2,
      propertyType: 'Apartment',
      location: 'Lekki Phase 1',
      city: 'Lagos',
      mapX: 68,
      mapY: 55,
      amenities: ['Power Backup', 'Security', 'Water Treatment', 'Gym', 'Parking'],
      rules: 'No corporate parties, quiet hours after 10 PM. Domestic pets welcome.',
      availability: 'Available Now',
      analytics: { demand: 94, popularity: 97, views: 142 },
      match: {
        score: 98,
        affordability: 'Excellent (Rent comfortably fits salary)',
        lifestyle: 'Perfect (Quiet hours & pets match preferences)',
        commute: '12 mins commute to PropTech Labs office in Lekki',
        risk: 'Passed (Landlord identity & property deeds verified)'
      },
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600'
    },
    {
      id: 2,
      title: 'Cozy 1 Bedroom Studio Loft',
      rent: 1400000,
      bedrooms: 1,
      bathrooms: 1,
      propertyType: 'Studio',
      location: 'Yaba',
      city: 'Lagos',
      mapX: 35,
      mapY: 32,
      amenities: ['Power Backup', 'Security', 'Water Treatment', 'Parking'],
      rules: 'Single occupancy only, quiet hours preferred, smoking strictly prohibited.',
      availability: 'Available July 1st',
      analytics: { demand: 82, popularity: 85, views: 88 },
      match: {
        score: 92,
        affordability: 'Excellent (Very high affordability margin)',
        lifestyle: 'Very Good (Non-smoking matching)',
        commute: '28 mins drive to Lekki workplace',
        risk: 'Passed (Landlord and utility bills validated)'
      },
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600'
    },
    {
      id: 3,
      title: 'Executive 3 Bed Serviced Flat',
      rent: 5500000,
      bedrooms: 3,
      bathrooms: 3,
      propertyType: 'Apartment',
      location: 'Victoria Island',
      city: 'Lagos',
      mapX: 58,
      mapY: 68,
      amenities: ['Power Backup', 'Security', 'Water Treatment', 'Gym', 'Parking', 'Pool'],
      rules: 'Corporate tenancies preferred. Small pets allowed upon notice.',
      availability: 'Available Now',
      analytics: { demand: 98, popularity: 94, views: 210 },
      match: {
        score: 85,
        affordability: 'Tight Fit (Consumes 48% of monthly income)',
        lifestyle: 'Good (Pool & gym matches recreation profile)',
        commute: '18 mins drive to Lekki',
        risk: 'Passed (Corporate land deeds fully audited)'
      },
      image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600'
    },
    {
      id: 4,
      title: 'GRA Executive 4 Bed Duplex',
      rent: 4500000,
      bedrooms: 4,
      bathrooms: 4,
      propertyType: 'Duplex',
      location: 'Ikeja GRA',
      city: 'Lagos',
      mapX: 20,
      mapY: 20,
      amenities: ['Power Backup', 'Security', 'Gym', 'Parking'],
      rules: 'Family occupancy only. Garden preservation requested.',
      availability: 'Available In 2 Weeks',
      analytics: { demand: 68, popularity: 72, views: 94 },
      match: {
        score: 75,
        affordability: 'Tight Fit (Exceeds monthly salary cap)',
        lifestyle: 'Good (Quiet suburbs matching)',
        commute: '54 mins drive to Lekki (High traffic)',
        risk: 'Passed (Landlord title documents validated)'
      },
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600'
    },
    {
      id: 5,
      title: 'Surulere Shared 2 Bed Flat',
      rent: 900000,
      bedrooms: 2,
      bathrooms: 1,
      propertyType: 'Shared flat',
      location: 'Surulere',
      city: 'Lagos',
      mapX: 30,
      mapY: 52,
      amenities: ['Security', 'Parking'],
      rules: 'Roommate agreement terms apply. Cooking coordinates shared.',
      availability: '1 Room Available Now',
      analytics: { demand: 75, popularity: 78, views: 64 },
      match: {
        score: 78,
        affordability: 'Perfect (Extremely high safety margin)',
        lifestyle: 'Moderate (Must share common lounge areas)',
        commute: '38 mins drive to Lekki office',
        risk: 'Passed (Co-tenant BVN records verified)'
      },
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600'
    },
    {
      id: 6,
      title: 'Modern 2 Bedroom Apartment',
      rent: 2200000,
      bedrooms: 2,
      bathrooms: 2,
      propertyType: 'Apartment',
      location: 'Lekki Phase 2',
      city: 'Lagos',
      mapX: 84,
      mapY: 60,
      amenities: ['Power Backup', 'Security', 'Water Treatment', 'Parking'],
      rules: 'Quiet hours enforced after 10 PM. Strictly non-smoking.',
      availability: 'Available Now',
      analytics: { demand: 91, popularity: 88, views: 112 },
      match: {
        score: 95,
        affordability: 'Very Good (Sits in comfort range)',
        lifestyle: 'Perfect (Quiet hours & non-smoking match)',
        commute: '22 mins drive to Lekki Phase 1',
        risk: 'Passed (Title verify complete)'
      },
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600'
    }
  ],

  // Search filter options
  filters: {
    search: '',
    location: '',
    maxBudget: 6000000,
    bedrooms: '',
    propertyType: '',
    amenities: []
  },

  // Saved properties list
  favorites: [1],
  viewedProperties: [],

  // Applications, Inspections, & Leases
  applications: [
    { id: 1, propertyId: 1, title: 'Luxury 2 Bed Penthouse Duplex', landlord: 'Chief Alabi', landlordId: 'alabi', rent: 3200000, status: 'Under Review', actionRequired: 'Awaiting landlord inspection response' },
    { id: 2, propertyId: 2, title: 'Cozy 1 Bedroom Studio Loft', landlord: 'Mrs. Funmi Coker', landlordId: 'coker', rent: 1400000, status: 'Approved', actionRequired: 'Book Inspection' }
  ],

  inspections: [
    { id: 1, propertyId: 1, title: 'Luxury 2 Bed Penthouse Duplex', landlord: 'Chief Alabi', date: '2026-06-25', time: '11:00 AM', type: 'Physical Walkthrough', status: 'Upcoming' }
  ],

  activeLeaseAgreement: {
    propertyId: 2,
    propertyTitle: 'Cozy 1 Bedroom Studio Loft',
    landlordName: 'Mrs. Funmi Coker',
    rent: 1400000,
    status: 'Pending Signature',
    tenantSignature: '',
    landlordSignature: 'Funmi Coker'
  },

  chats: [
    {
      landlordId: 'alabi',
      landlordName: 'Chief Alabi',
      property: 'Luxury 2 Bed Penthouse Duplex',
      avatar: 'A',
      messages: [
        { id: 1, sender: 'landlord', text: 'Hello Osaze. I received your Haven application with a Grade A score. Impressive. When do you want to inspect the duplex?', time: 'Yesterday 4:30 PM' },
        { id: 2, sender: 'tenant', text: 'Thank you Chief. I would prefer a physical walkthrough this week if possible.', time: 'Yesterday 5:00 PM' }
      ]
    },
    {
      landlordId: 'coker',
      landlordName: 'Mrs. Funmi Coker',
      property: 'Cozy 1 Bedroom Studio Loft',
      avatar: 'C',
      messages: [
        { id: 1, sender: 'landlord', text: 'Hi Osaze, your application has been approved. Please book an inspection using the scheduler.', time: 'Today 9:15 AM' }
      ]
    }
  ],

  activeChatLandlordId: 'alabi',

  // ----------------------------------------------------
  // MILESTONE 5: ESCROW WALLET & PAYMENTS TRACKING STATE
  // ----------------------------------------------------
  walletBalance: 150000, // Available funds inside Haven Wallet

  escrowVaults: [
    {
      id: 1,
      title: 'Caution Vault: Lekki Penthouse',
      landlordName: 'Chief Alabi',
      cautionAmount: 250000,
      rentAmount: 2950000,
      totalSecured: 3200000,
      status: 'Funded', // Created | Awaiting Funding | Funded | Move-In Approved | Disputed | Refunded | Closed
      milestones: {
        leaseSigned: true,
        depositCleared: true,
        inspectionApproved: false,
        fundsReleased: false
      },
      timeline: [
        { text: 'Deposit payments locked in CBN compliance trust account.', date: '2026-06-18' },
        { text: 'Escrow vault envelope created fromCounter-Signed Lease.', date: '2026-06-18' }
      ]
    },
    {
      id: 2,
      title: 'Caution Vault: Yaba Cozy Studio Loft',
      landlordName: 'Mrs. Funmi Coker',
      cautionAmount: 200000,
      rentAmount: 1200000,
      totalSecured: 1400000,
      status: 'Closed',
      milestones: {
        leaseSigned: true,
        depositCleared: true,
        inspectionApproved: true,
        fundsReleased: true
      },
      timeline: [
        { text: 'Lease completed. Vault closed and audit envelope archived.', date: '2026-06-21' },
        { text: 'Escrow caution release payout cleared to Landlord.', date: '2026-06-20' },
        { text: 'Physical move-in inspection check approved by Tenant.', date: '2026-06-19' },
        { text: 'Escrow vault created and fully funded.', date: '2026-06-18' }
      ]
    }
  ],

  transactions: [
    { id: 1, type: 'Payout to Landlord', amount: 1400000, reference: 'TXN-9801-LA', date: '2026-06-20', status: 'Cleared', description: 'Lease rent caution disbursement for Yaba Studio' },
    { id: 2, type: 'Wallet Top-up', amount: 150000, reference: 'TXN-8502-LA', date: '2026-06-19', status: 'Cleared', description: 'Instant bank transfer top-up' },
    { id: 3, type: 'Escrow Lock', amount: 1400000, reference: 'TXN-7118-LA', date: '2026-06-18', status: 'Escrowed', description: 'Caution & Rent advance lock for Yaba Loft' },
    { id: 4, type: 'Escrow Lock', amount: 3200000, reference: 'TXN-6549-LA', date: '2026-06-18', status: 'Escrowed', description: 'Caution & Rent lock for Lekki Penthouse' }
  ],

  // Exception Flow Toggles
  mockConfig: {
    failOTP: false,
    failBVN: false,
    failNIN: false,
    duplicateAccount: false,
    incompleteProfile: false,
    inspectionNoShow: false,
    rejectedApplication: false,
    landlordCancellation: false
  }
};

// 2. Navigation Routing & Rendering Engine
function navigateTo(route) {
  state.route = route;

  // Guard screens if not logged in
  const protectedRoutes = ['dashboard', 'profile-wizard', 'verification-center', 'discovery', 'leasing', 'wallet', 'landlord', 'partner', 'admin'];
  if (protectedRoutes.includes(route) && !state.user) {
    state.route = 'login';
  }

  renderApp();
}

function updateState(newState) {
  state = { ...state, ...newState };
}

// Map route identifiers to screen components
const screens = {
  landing: LandingPage,
  register: Register,
  login: Login,
  otp: OTPVerification,
  'profile-wizard': ProfileWizard,
  'verification-center': VerificationCenter,
  dashboard: Dashboard,
  discovery: PropertyDiscovery,
  leasing: LeasingWorkflow,
  wallet: EscrowWallet,
  landlord: LandlordPortal,
  partner: PartnerPortal,
  admin: AdminConsole
};

function renderApp() {
  const appContainer = document.getElementById('app');
  if (!appContainer) return;

  const currentScreen = screens[state.route] || LandingPage;

  // Render components layout structure
  appContainer.innerHTML = `
    ${Navbar.render(state)}
    <main style="flex: 1; display: flex; flex-direction: column;">
      ${currentScreen.render(state)}
    </main>
    ${Footer.render()}
  `;

  // Attach visual event listeners & run initialization code
  Navbar.init(state, navigateTo, updateState);
  Footer.init(state, navigateTo);
  currentScreen.init(state, navigateTo, updateState);

  // Maintain visibility of testing controls overlay
  renderMockControlPanel();
}

// 3. Testing drawer controls (to simulate exception flows)
function renderMockControlPanel() {
  // Check if drawer already exists, if so update states, else build
  let panel = document.getElementById('dev-mock-panel');

  const buildPanelHTML = () => `
    <div class="mock-panel-header" id="dev-panel-title">
      <span>&#9881; Exception Flow Simulator</span>
      <span id="dev-toggle-icon">&plus;</span>
    </div>
    <div class="mock-panel-body" id="dev-panel-body">
      <div class="mock-toggle-row">
        <span>Fail OTP Validation</span>
        <button class="mock-toggle-btn ${state.mockConfig.failOTP ? 'active' : ''}" id="mock-fail-otp">
          ${state.mockConfig.failOTP ? 'ON' : 'OFF'}
        </button>
      </div>
      <div class="mock-toggle-row">
        <span>Fail BVN Verification</span>
        <button class="mock-toggle-btn ${state.mockConfig.failBVN ? 'active' : ''}" id="mock-fail-bvn">
          ${state.mockConfig.failBVN ? 'ON' : 'OFF'}
        </button>
      </div>
      <div class="mock-toggle-row">
        <span>Fail NIN Verification</span>
        <button class="mock-toggle-btn ${state.mockConfig.failNIN ? 'active' : ''}" id="mock-fail-nin">
          ${state.mockConfig.failNIN ? 'ON' : 'OFF'}
        </button>
      </div>
      <div class="mock-toggle-row">
        <span>Duplicate Acc Register</span>
        <button class="mock-toggle-btn ${state.mockConfig.duplicateAccount ? 'active' : ''}" id="mock-dup-acc">
          ${state.mockConfig.duplicateAccount ? 'ON' : 'OFF'}
        </button>
      </div>
      <div class="mock-toggle-row">
        <span>Incomplete Profile LogIn</span>
        <button class="mock-toggle-btn ${state.mockConfig.incompleteProfile ? 'active' : ''}" id="mock-inc-prof">
          ${state.mockConfig.incompleteProfile ? 'ON' : 'OFF'}
        </button>
      </div>
      <!-- Milestone 4 Exception Toggles -->
      <div style="border-top: 1px solid rgba(255,255,255,0.15); margin-top: 8px; padding-top: 8px; font-weight:bold; color:var(--color-secondary);">Leasing Exceptions</div>
      <div class="mock-toggle-row">
        <span>Inspection No-show</span>
        <button class="mock-toggle-btn ${state.mockConfig.inspectionNoShow ? 'active' : ''}" id="mock-no-show">
          ${state.mockConfig.inspectionNoShow ? 'ON' : 'OFF'}
        </button>
      </div>
      <div class="mock-toggle-row">
        <span>Reject Application</span>
        <button class="mock-toggle-btn ${state.mockConfig.rejectedApplication ? 'active' : ''}" id="mock-reject-app">
          ${state.mockConfig.rejectedApplication ? 'ON' : 'OFF'}
        </button>
      </div>
      <div class="mock-toggle-row">
        <span>Landlord Cancellation</span>
        <button class="mock-toggle-btn ${state.mockConfig.landlordCancellation ? 'active' : ''}" id="mock-cancel-insp">
          ${state.mockConfig.landlordCancellation ? 'ON' : 'OFF'}
        </button>
      </div>
      <!-- Partner Portals Role Switcher -->
      <div style="border-top: 1px solid rgba(255,255,255,0.15); margin-top: 8px; padding-top: 8px; font-weight:bold; color:var(--color-secondary); font-size:11px;">Developer Workspace Switcher</div>
      <div style="display:flex; flex-direction:column; gap:4px; margin-top:4px;">
        <button class="btn btn-outline btn-sm" id="btn-switch-tenant" style="border-color:rgba(255,255,255,0.4); color:white; background:none; font-size:10px; padding:4px;">Tenant Dashboard</button>
        <button class="btn btn-outline btn-sm" id="btn-switch-landlord" style="border-color:rgba(255,255,255,0.4); color:white; background:none; font-size:10px; padding:4px;">Landlord Portal</button>
        <button class="btn btn-outline btn-sm" id="btn-switch-corporate" style="border-color:rgba(255,255,255,0.4); color:white; background:none; font-size:10px; padding:4px;">Corporate Partner</button>
        <button class="btn btn-outline btn-sm" id="btn-switch-university" style="border-color:rgba(255,255,255,0.4); color:white; background:none; font-size:10px; padding:4px;">University Housing</button>
        <button class="btn btn-outline btn-sm" id="btn-switch-ngo" style="border-color:rgba(255,255,255,0.4); color:white; background:none; font-size:10px; padding:4px;">NGO Coordinator</button>
        <button class="btn btn-outline btn-sm" id="btn-switch-admin" style="border-color:rgba(255,255,255,0.4); color:white; background:none; font-size:10px; padding:4px;">Admin Console</button>
      </div>

      <button class="btn btn-outline btn-sm" id="mock-reset-state" style="margin-top:12px; border-color:rgba(255,255,255,0.4); color:white; background:none; font-size:11px;">
        Reset State to Defaults
      </button>
    </div>
  `;

  if (!panel) {
    panel = document.createElement('div');
    panel.id = 'dev-mock-panel';
    panel.className = 'mock-control-panel collapsed';
    document.body.appendChild(panel);
  }

  panel.innerHTML = buildPanelHTML();

  // Collapsing Drawer Actions
  document.getElementById('dev-panel-title')?.addEventListener('click', (e) => {
    e.stopPropagation();
    panel.classList.toggle('collapsed');
    const isCollapsed = panel.classList.contains('collapsed');
    document.getElementById('dev-toggle-icon').innerHTML = isCollapsed ? '&plus;' : '&minus;';
  });

  // Action toggles
  const attachToggle = (btnId, stateKey) => {
    document.getElementById(btnId)?.addEventListener('click', (e) => {
      e.stopPropagation();
      state.mockConfig[stateKey] = !state.mockConfig[stateKey];
      
      // Update workflows instantly on toggling
      if (stateKey === 'rejectedApplication') {
        state.applications = state.applications.map(app => {
          if (app.propertyId === 1) return { ...app, status: state.mockConfig.rejectedApplication ? 'Rejected' : 'Under Review', actionRequired: state.mockConfig.rejectedApplication ? 'Landlord rejected credit scores' : 'None - Under Review' };
          return app;
        });
      }
      
      renderMockControlPanel();
      renderApp();
    });
  };
  attachToggle('mock-fail-otp', 'failOTP');
  attachToggle('mock-fail-bvn', 'failBVN');
  attachToggle('mock-fail-nin', 'failNIN');
  attachToggle('mock-dup-acc', 'duplicateAccount');
  attachToggle('mock-inc-prof', 'incompleteProfile');
  attachToggle('mock-no-show', 'inspectionNoShow');
  attachToggle('mock-reject-app', 'rejectedApplication');
  attachToggle('mock-cancel-insp', 'landlordCancellation');

  // Workspace Switch Triggers
  document.getElementById('btn-switch-tenant')?.addEventListener('click', (e) => {
    e.stopPropagation();
    updateState({ user: { username: 'osaze.alao@domain.com', role: 'Tenant', method: 'email' } });
    navigateTo('dashboard');
  });
  document.getElementById('btn-switch-landlord')?.addEventListener('click', (e) => {
    e.stopPropagation();
    updateState({ user: { username: 'partner@haven.ng', role: 'Landlord', method: 'email' } });
    navigateTo('landlord');
  });
  document.getElementById('btn-switch-corporate')?.addEventListener('click', (e) => {
    e.stopPropagation();
    updateState({ user: { username: 'partner.ops@firm.com', role: 'Corporate Partner', method: 'email' } });
    navigateTo('partner');
  });
  document.getElementById('btn-switch-university')?.addEventListener('click', (e) => {
    e.stopPropagation();
    updateState({ user: { username: 'unilag.housing@unilag.edu.ng', role: 'University Housing', method: 'email' } });
    navigateTo('partner');
  });
  document.getElementById('btn-switch-ngo')?.addEventListener('click', (e) => {
    e.stopPropagation();
    updateState({ user: { username: 'relief.director@ngo.org', role: 'NGO Coordinator', method: 'email' } });
    navigateTo('partner');
  });
  document.getElementById('btn-switch-admin')?.addEventListener('click', (e) => {
    e.stopPropagation();
    updateState({ user: { username: 'admin.ops@haven.ng', role: 'Admin', method: 'email' } });
    navigateTo('admin');
  });

  // Hard Reset App States
  document.getElementById('mock-reset-state')?.addEventListener('click', (e) => {
    e.stopPropagation();
    state = {
      route: 'landing',
      user: null,
      registerTab: 'email',
      loginTab: 'email',
      preselectedRole: 'Tenant',
      verifyCenterTab: 'bvn',
      wizardStep: 1,
      activeDashboardTab: 'overview',
      discoveryViewMode: 'grid',
      activeDetailsPropertyId: null,
      activeLeasingTab: 'applications',
      registrationData: null,
      profileData: {
        personalInfo: {
          fullName: 'Osaze Alao',
          dob: '1998-05-12',
          gender: 'Male',
          phone: '+234 812 345 6789',
          email: 'osaze.alao@domain.com'
        },
        locationPreferences: {
          city: 'Lagos',
          neighborhoods: 'Lekki Phase 1, Victoria Island, Yaba',
          budget: '2500000'
        },
        housingPreferences: {
          propertyType: 'Apartment',
          bedrooms: '2',
          amenities: ['Power Backup', 'Security', 'Water Treatment']
        },
        employmentInfo: {
          status: 'Employed',
          employer: 'PropTech Labs Ltd',
          jobTitle: 'Senior UI/UX Analyst'
        },
        incomeInfo: { 
          monthlyIncome: '380000',
          statementUploaded: true 
        },
        lifestylePreferences: {
          pets: false,
          smoking: false,
          quietHours: true,
          sharing: false
        },
        rentalHistory: [
          { id: 1, landlord: 'Chief Alabi', property: '4b Admiralty Way, Lekki', duration: '2 Years (2024-2026)', exitReason: 'Relocating closer to workplace' }
        ],
        references: [
          { id: 1, name: 'Dr. Kunle Benson', relation: 'Former Landlord', contact: '+234 803 111 2222' },
          { id: 2, name: 'Mrs. Funmi Coker', relation: 'Professional Reference', contact: '+234 809 333 4444' }
        ]
      },
      verification: {
        bvnStatus: 'approved',
        ninStatus: 'approved',
        selfieStatus: 'approved',
        employeeIdStatus: 'approved',
        studentIdStatus: 'unverified',
        documentStatus: 'approved'
      },
      score: {
        overall: 785,
        financial: 88,
        verification: 96,
        behavior: 90,
        affordability: 82,
        tier: 'Grade A',
        status: 'Excellent'
      },
      escrow: {
        cautionDeposit: 250000,
        advanceRent: 950000,
        totalSecured: 1200000,
        history: [
          { id: 1, type: 'Caution Deposit', amount: 250000, reference: 'ESC-8109-LA', status: 'Secured', date: '2026-06-18' },
          { id: 2, type: 'Advance Rent (10 Months)', amount: 950000, reference: 'ESC-8110-LA', status: 'Secured', date: '2026-06-18' }
        ]
      },
      timeline: [
        { id: 1, type: 'Agreement', text: 'Structured lease agreement counter-signed.', date: '2026-06-19', status: 'Completed' },
        { id: 2, type: 'Payment', text: 'Escrow caution fee and rent advance cleared.', date: '2026-06-18', status: 'Completed' },
        { id: 3, type: 'Inspection', text: 'Property inspection passed.', date: '2026-06-17', status: 'Completed' },
        { id: 4, type: 'Application', text: 'Qualification application approved.', date: '2026-06-16', status: 'Completed' }
      ],
      notifications: [
        { id: 1, type: 'verification', text: 'Your biometric liveness selfie was matched against NIMC photo registry.', time: '10 mins ago', read: false },
        { id: 2, type: 'escrow', text: 'Caution deposit of ₦250,000 is locked in secure escrow.', time: '2 hrs ago', read: false },
        { id: 3, type: 'match', text: 'New Match: 3 Bed Apartment in Victoria Island fits your location preferences.', time: '1 day ago', read: true }
      ],
      settings: {
        enable2FA: true,
        hideProfile: false,
        commEmail: true,
        commSMS: true,
        commInApp: true
      },
      properties: [
        {
          id: 1,
          title: 'Luxury 2 Bed Penthouse Duplex',
          rent: 3200000,
          bedrooms: 2,
          bathrooms: 2,
          propertyType: 'Apartment',
          location: 'Lekki Phase 1',
          city: 'Lagos',
          mapX: 68,
          mapY: 55,
          amenities: ['Power Backup', 'Security', 'Water Treatment', 'Gym', 'Parking'],
          rules: 'No corporate parties, quiet hours after 10 PM. Domestic pets welcome.',
          availability: 'Available Now',
          analytics: { demand: 94, popularity: 97, views: 142 },
          match: {
            score: 98,
            affordability: 'Excellent (Rent comfortably fits salary)',
            lifestyle: 'Perfect (Quiet hours & pets match preferences)',
            commute: '12 mins commute to PropTech Labs office in Lekki',
            risk: 'Passed (Landlord identity & property deeds verified)'
          },
          image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600'
        },
        {
          id: 2,
          title: 'Cozy 1 Bedroom Studio Loft',
          rent: 1400000,
          bedrooms: 1,
          bathrooms: 1,
          propertyType: 'Studio',
          location: 'Yaba',
          city: 'Lagos',
          mapX: 35,
          mapY: 32,
          amenities: ['Power Backup', 'Security', 'Water Treatment', 'Parking'],
          rules: 'Single occupancy only, quiet hours preferred, smoking strictly prohibited.',
          availability: 'Available July 1st',
          analytics: { demand: 82, popularity: 85, views: 88 },
          match: {
            score: 92,
            affordability: 'Excellent (Very high affordability margin)',
            lifestyle: 'Very Good (Non-smoking matching)',
            commute: '28 mins drive to Lekki workplace',
            risk: 'Passed (Landlord and utility bills validated)'
          },
          image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600'
        },
        {
          id: 3,
          title: 'Executive 3 Bed Serviced Flat',
          rent: 5500000,
          bedrooms: 3,
          bathrooms: 3,
          propertyType: 'Apartment',
          location: 'Victoria Island',
          city: 'Lagos',
          mapX: 58,
          mapY: 68,
          amenities: ['Power Backup', 'Security', 'Water Treatment', 'Gym', 'Parking', 'Pool'],
          rules: 'Corporate tenancies preferred. Small pets allowed upon notice.',
          availability: 'Available Now',
          analytics: { demand: 98, popularity: 94, views: 210 },
          match: {
            score: 85,
            affordability: 'Tight Fit (Consumes 48% of monthly income)',
            lifestyle: 'Good (Pool & gym matches recreation profile)',
            commute: '18 mins drive to Lekki',
            risk: 'Passed (Corporate land deeds fully audited)'
          },
          image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600'
        },
        {
          id: 4,
          title: 'GRA Executive 4 Bed Duplex',
          rent: 4500000,
          bedrooms: 4,
          bathrooms: 4,
          propertyType: 'Duplex',
          location: 'Ikeja GRA',
          city: 'Lagos',
          mapX: 20,
          mapY: 20,
          amenities: ['Power Backup', 'Security', 'Gym', 'Parking'],
          rules: 'Family occupancy only. Garden preservation requested.',
          availability: 'Available In 2 Weeks',
          analytics: { demand: 68, popularity: 72, views: 94 },
          match: {
            score: 75,
            affordability: 'Tight Fit (Exceeds monthly salary cap)',
            lifestyle: 'Good (Quiet suburbs matching)',
            commute: '54 mins drive to Lekki (High traffic)',
            risk: 'Passed (Landlord title documents validated)'
          },
          image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600'
        },
        {
          id: 5,
          title: 'Surulere Shared 2 Bed Flat',
          rent: 900000,
          bedrooms: 2,
          bathrooms: 1,
          propertyType: 'Shared flat',
          location: 'Surulere',
          city: 'Lagos',
          mapX: 30,
          mapY: 52,
          amenities: ['Security', 'Parking'],
          rules: 'Roommate agreement terms apply. Cooking coordinates shared.',
          availability: '1 Room Available Now',
          analytics: { demand: 75, popularity: 78, views: 64 },
          match: {
            score: 78,
            affordability: 'Perfect (Extremely high safety margin)',
            lifestyle: 'Moderate (Must share common lounge areas)',
            commute: '38 mins drive to Lekki office',
            risk: 'Passed (Co-tenant BVN records verified)'
          },
          image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600'
        },
        {
          id: 6,
          title: 'Modern 2 Bedroom Apartment',
          rent: 2200000,
          bedrooms: 2,
          bathrooms: 2,
          propertyType: 'Apartment',
          location: 'Lekki Phase 2',
          city: 'Lagos',
          mapX: 84,
          mapY: 60,
          amenities: ['Power Backup', 'Security', 'Water Treatment', 'Parking'],
          rules: 'Quiet hours enforced after 10 PM. Strictly non-smoking.',
          availability: 'Available Now',
          analytics: { demand: 91, popularity: 88, views: 112 },
          match: {
            score: 95,
            affordability: 'Very Good (Sits in comfort range)',
            lifestyle: 'Perfect (Quiet hours & non-smoking match)',
            commute: '22 mins drive to Lekki Phase 1',
            risk: 'Passed (Title verify complete)'
          },
          image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600'
        }
      ],
      filters: {
        search: '',
        location: '',
        maxBudget: 6000000,
        bedrooms: '',
        propertyType: '',
        amenities: []
      },
      favorites: [1],
      viewedProperties: [],
      applications: [
        { id: 1, propertyId: 1, title: 'Luxury 2 Bed Penthouse Duplex', landlord: 'Chief Alabi', landlordId: 'alabi', rent: 3200000, status: 'Under Review', actionRequired: 'Awaiting landlord inspection response' },
        { id: 2, propertyId: 2, title: 'Cozy 1 Bedroom Studio Loft', landlord: 'Mrs. Funmi Coker', landlordId: 'coker', rent: 1400000, status: 'Approved', actionRequired: 'Book Inspection' }
      ],
      inspections: [
        { id: 1, propertyId: 1, title: 'Luxury 2 Bed Penthouse Duplex', landlord: 'Chief Alabi', date: '2026-06-25', time: '11:00 AM', type: 'Physical Walkthrough', status: 'Upcoming' }
      ],
      activeLeaseAgreement: {
        propertyId: 2,
        propertyTitle: 'Cozy 1 Bedroom Studio Loft',
        landlordName: 'Mrs. Funmi Coker',
        rent: 1400000,
        status: 'Pending Signature',
        tenantSignature: '',
        landlordSignature: 'Funmi Coker'
      },
      chats: [
        {
          landlordId: 'alabi',
          landlordName: 'Chief Alabi',
          property: 'Luxury 2 Bed Penthouse Duplex',
          avatar: 'A',
          messages: [
            { id: 1, sender: 'landlord', text: 'Hello Osaze. I received your Haven application with a Grade A score. Impressive. When do you want to inspect the duplex?', time: 'Yesterday 4:30 PM' },
            { id: 2, sender: 'tenant', text: 'Thank you Chief. I would prefer a physical walkthrough this week if possible.', time: 'Yesterday 5:00 PM' }
          ]
        },
        {
          landlordId: 'coker',
          landlordName: 'Mrs. Funmi Coker',
          property: 'Cozy 1 Bedroom Studio Loft',
          avatar: 'C',
          messages: [
            { id: 1, sender: 'landlord', text: 'Hi Osaze, your application has been approved. Please book an inspection using the scheduler.', time: 'Today 9:15 AM' }
          ]
        }
      ],
      activeChatLandlordId: 'alabi',
      walletBalance: 150000,
      escrowVaults: [
        {
          id: 1,
          title: 'Caution Vault: Lekki Penthouse',
          landlordName: 'Chief Alabi',
          cautionAmount: 250000,
          rentAmount: 2950000,
          totalSecured: 3200000,
          status: 'Funded',
          milestones: {
            leaseSigned: true,
            depositCleared: true,
            inspectionApproved: false,
            fundsReleased: false
          },
          timeline: [
            { text: 'Deposit payments locked in CBN compliance trust account.', date: '2026-06-18' },
            { text: 'Escrow vault envelope created from Counter-Signed Lease.', date: '2026-06-18' }
          ]
        },
        {
          id: 2,
          title: 'Caution Vault: Yaba Cozy Studio Loft',
          landlordName: 'Mrs. Funmi Coker',
          cautionAmount: 200000,
          rentAmount: 1200000,
          totalSecured: 1400000,
          status: 'Closed',
          milestones: {
            leaseSigned: true,
            depositCleared: true,
            inspectionApproved: true,
            fundsReleased: true
          },
          timeline: [
            { text: 'Lease completed. Vault closed and audit envelope archived.', date: '2026-06-21' },
            { text: 'Escrow caution release payout cleared to Landlord.', date: '2026-06-20' },
            { text: 'Physical move-in inspection check approved by Tenant.', date: '2026-06-19' },
            { text: 'Escrow vault created and fully funded.', date: '2026-06-18' }
          ]
        }
      ],
      transactions: [
        { id: 1, type: 'Payout to Landlord', amount: 1400000, reference: 'TXN-9801-LA', date: '2026-06-20', status: 'Cleared', description: 'Lease rent caution disbursement for Yaba Studio' },
        { id: 2, type: 'Wallet Top-up', amount: 150000, reference: 'TXN-8502-LA', date: '2026-06-19', status: 'Cleared', description: 'Instant bank transfer top-up' },
        { id: 3, type: 'Escrow Lock', amount: 1400000, reference: 'TXN-7118-LA', date: '2026-06-18', status: 'Escrowed', description: 'Caution & Rent advance lock for Yaba Loft' },
        { id: 4, type: 'Escrow Lock', amount: 3200000, reference: 'TXN-6549-LA', date: '2026-06-18', status: 'Escrowed', description: 'Caution & Rent lock for Lekki Penthouse' }
      ],
      mockConfig: {
        failOTP: false,
        failBVN: false,
        failNIN: false,
        duplicateAccount: false,
        incompleteProfile: false,
        inspectionNoShow: false,
        rejectedApplication: false,
        landlordCancellation: false
      }
    };
    alert("Application state reset. Navigating back to landing page.");
    navigateTo('landing');
  });
}

// 4. Initial boot sequence
window.addEventListener('DOMContentLoaded', () => {
  state.user = {
    username: 'admin.ops@haven.ng',
    role: 'Admin',
    method: 'email'
  };

  renderApp();
});
