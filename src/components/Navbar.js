// Navbar Component (Updated with Find Properties, Leasing, & Wallet Links)
export const Navbar = {
  render(state) {
    const isLoggedIn = !!state.user;
    const currentRoute = state.route;
    
    // Evaluate notification details
    const unreadNotifications = state.notifications?.filter(n => !n.read) || [];
    const unreadCount = unreadNotifications.length;

    let actionButtons = '';
    
    if (isLoggedIn) {
      actionButtons = `
        <div class="nav-actions" style="position: relative; display: flex; align-items: center; gap: 16px;">
          <!-- Notification Bell -->
          <button class="mobile-menu-btn" id="nav-bell-btn" style="position: relative; display: block; border-radius: var(--radius-full); padding: 6px;" aria-label="Notifications">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            ${unreadCount > 0 ? `
              <span id="bell-badge" style="position: absolute; top: 0; right: 0; background-color: var(--color-error); color: white; border-radius: var(--radius-full); width: 18px; height: 18px; font-size: 10px; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 2px solid var(--color-white);">
                ${unreadCount}
              </span>
            ` : ''}
          </button>

          <!-- Notification Dropdown Panel -->
          <div id="nav-notification-dropdown" style="display: none; position: absolute; top: 44px; right: 0; width: 340px; background-color: var(--color-white); border-radius: var(--radius-md); box-shadow: var(--shadow-lg); border: 1px solid rgba(13, 27, 75, 0.08); z-index: 500; overflow: hidden; animation: slideUp 200ms ease;">
            <div style="padding: 16px; border-bottom: 1px solid #E5E7EB; display: flex; justify-content: space-between; align-items: center;">
              <span style="font-weight: var(--weight-bold); color: var(--color-primary); font-size: 14px;">Notifications</span>
              ${unreadCount > 0 ? `<button id="nav-clear-notifications" style="background: none; border: none; color: var(--color-secondary); font-size: 11px; cursor: pointer; font-weight: var(--weight-semibold);">Mark all read</button>` : ''}
            </div>
            
            <div style="max-height: 280px; overflow-y: auto;" id="nav-notifications-list">
              ${state.notifications && state.notifications.length > 0 ? state.notifications.map(n => `
                <div class="notification-dropdown-item" data-id="${n.id}" style="padding: 12px 16px; border-bottom: 1px solid #F3F4F6; cursor: pointer; transition: background-color var(--transition-fast); display: flex; gap: 12px; align-items: flex-start; background-color: ${n.read ? 'transparent' : 'rgba(26,122,138,0.03)'};">
                  <div style="width: 8px; height: 8px; border-radius: var(--radius-full); background-color: ${n.read ? 'transparent' : 'var(--color-secondary)'}; margin-top: 6px; flex-shrink: 0;"></div>
                  <div style="flex: 1; text-align: left;">
                    <div style="font-size: 12px; color: var(--color-black); line-height: 1.4; font-weight: ${n.read ? 'normal' : '500'}">${n.text}</div>
                    <div style="font-size: 10px; color: #9CA3AF; margin-top: 4px;">${n.time}</div>
                  </div>
                </div>
              `).join('') : `
                <div style="padding: 32px 16px; text-align: center; color: #9CA3AF; font-size: 13px;">No notifications.</div>
              `}
            </div>
            
            <div style="padding: 10px; text-align: center; border-top: 1px solid #E5E7EB; background: #FAF9F6;">
              <a href="#" id="nav-view-timeline" style="font-size: 11px; font-weight: var(--weight-bold); color: var(--color-primary); text-decoration: none;">View Activity Timeline</a>
            </div>
          </div>

          <button class="btn btn-outline btn-sm" id="nav-dashboard-btn">Dashboard</button>
          <button class="btn btn-primary btn-sm" id="nav-logout-btn">Log Out</button>
        </div>
      `;
    } else {
      actionButtons = `
        <div class="nav-actions">
          <button class="btn btn-outline btn-sm" id="nav-login-btn">Log In</button>
          <button class="btn btn-primary btn-sm" id="nav-register-btn">Get Started</button>
        </div>
      `;
    }

    // Determine navigation links
    let navLinks = '';
    const inAppRoutes = ['dashboard', 'profile-wizard', 'verification-center', 'discovery', 'leasing', 'wallet'];
    if (!inAppRoutes.includes(currentRoute)) {
      navLinks = `
        <ul class="nav-links">
          <li><a href="#" class="nav-link" data-route="landing" id="nav-home">Home</a></li>
          <li><a href="#value-proposition" class="nav-link">Features</a></li>
          <li><a href="#trust-statistics" class="nav-link">Trust & Security</a></li>
          <li><a href="#faq" class="nav-link">FAQs</a></li>
        </ul>
      `;
    } else {
      navLinks = `
        <ul class="nav-links">
          <li><a href="#" class="nav-link" id="nav-dash-link">${state.user && (state.user.role === 'Landlord' || state.user.role === 'Agent') ? 'Landlord Portal' : (state.user && (state.user.role === 'Corporate Partner' || state.user.role === 'University Housing' || state.user.role === 'NGO Coordinator')) ? 'Partner Portal' : (state.user && state.user.role === 'Admin') ? 'Admin Console' : 'Dashboard'}</a></li>
          <li><a href="#" class="nav-link" id="nav-discovery-link">Find Properties</a></li>
          <li><a href="#" class="nav-link" id="nav-leasing-link">Leasing & Chat</a></li>
          <li><a href="#" class="nav-link" id="nav-wallet-link">Wallet & Escrow</a></li>
          <li><a href="#" class="nav-link" id="nav-profile-link">Profile Wizard</a></li>
          <li><a href="#" class="nav-link" id="nav-verify-link">Identity Verification</a></li>
        </ul>
      `;
    }

    return `
      <header class="header">
        <div class="container header-container">
          <a href="#" class="logo" id="nav-logo">
            <div class="logo-icon">H</div>
            <span>Haven</span>
          </a>
          
          ${navLinks}
          
          ${actionButtons}

          <button class="mobile-menu-btn" id="mobile-menu-toggle" aria-label="Toggle navigation menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </header>
    `;
  },

  init(state, navigateTo, updateState) {
    // Nav logo link
    document.getElementById('nav-logo')?.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo('landing');
    });

    // Landing Page Anchor Links
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // Static Navigation Links
    document.getElementById('nav-home')?.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo('landing');
    });

    // In-app internal nav links
    document.getElementById('nav-dash-link')?.addEventListener('click', (e) => {
      e.preventDefault();
      if (state.user && (state.user.role === 'Landlord' || state.user.role === 'Agent')) {
        navigateTo('landlord');
      } else if (state.user && (state.user.role === 'Corporate Partner' || state.user.role === 'University Housing' || state.user.role === 'NGO Coordinator')) {
        navigateTo('partner');
      } else if (state.user && state.user.role === 'Admin') {
        navigateTo('admin');
      } else {
        navigateTo('dashboard');
      }
    });
    document.getElementById('nav-discovery-link')?.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo('discovery');
    });
    document.getElementById('nav-leasing-link')?.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo('leasing');
    });
    document.getElementById('nav-wallet-link')?.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo('wallet');
    });
    document.getElementById('nav-profile-link')?.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo('profile-wizard');
    });
    document.getElementById('nav-verify-link')?.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo('verification-center');
    });

    // Auth actions
    document.getElementById('nav-login-btn')?.addEventListener('click', () => navigateTo('login'));
    document.getElementById('nav-register-btn')?.addEventListener('click', () => navigateTo('register'));
    document.getElementById('nav-dashboard-btn')?.addEventListener('click', () => {
      if (state.user && (state.user.role === 'Landlord' || state.user.role === 'Agent')) {
        navigateTo('landlord');
      } else if (state.user && (state.user.role === 'Corporate Partner' || state.user.role === 'University Housing' || state.user.role === 'NGO Coordinator')) {
        navigateTo('partner');
      } else if (state.user && state.user.role === 'Admin') {
        navigateTo('admin');
      } else {
        navigateTo('dashboard');
      }
    });
    
    document.getElementById('nav-logout-btn')?.addEventListener('click', () => {
      updateState({ user: null });
      navigateTo('landing');
    });

    // Notification Dropdown Toggle
    const bellBtn = document.getElementById('nav-bell-btn');
    const dropdown = document.getElementById('nav-notification-dropdown');

    bellBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      if (dropdown) {
        const isHidden = dropdown.style.display === 'none';
        dropdown.style.display = isHidden ? 'block' : 'none';
      }
    });

    // Close dropdown on click outside
    document.addEventListener('click', () => {
      if (dropdown) dropdown.style.display = 'none';
    });

    // Inside dropdown clicks
    dropdown?.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    // Clear notifications (Mark all as read)
    document.getElementById('nav-clear-notifications')?.addEventListener('click', () => {
      const updated = state.notifications.map(n => ({ ...n, read: true }));
      updateState({ notifications: updated });
      navigateTo(state.route); // trigger render
    });

    // Mark single notification as read
    document.querySelectorAll('.notification-dropdown-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = parseInt(item.getAttribute('data-id'));
        const updated = state.notifications.map(n => {
          if (n.id === id) return { ...n, read: true };
          return n;
        });
        updateState({ notifications: updated });
        navigateTo(state.route);
      });
    });

    // Click "View Activity Timeline"
    document.getElementById('nav-view-timeline')?.addEventListener('click', (e) => {
      e.preventDefault();
      if (dropdown) dropdown.style.display = 'none';
      updateState({ activeDashboardTab: 'escrow-timeline' });
      navigateTo('dashboard');
    });

    // Mobile Menu Toggle
    document.getElementById('mobile-menu-toggle')?.addEventListener('click', () => {
      alert("Mobile menu opened. Fully responsive.");
    });
  }
};
