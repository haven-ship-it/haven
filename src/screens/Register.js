// Register Screen
export const Register = {
  render(state) {
    const roles = [
      { id: 'Tenant', label: 'Tenant', desc: 'Secure deposits & pass qualification' },
      { id: 'Landlord', label: 'Landlord', desc: 'Attract qualified tenants & secure escrow' },
      { id: 'Agent', label: 'Agent', desc: 'Represent properties with verified details' },
      { id: 'Corporate Partner', label: 'Corporate Partner', desc: 'Co-sign employee housing credit' },
      { id: 'University Housing', label: 'University Officer', desc: 'Verify and manage student housing' },
      { id: 'NGO Coordinator', label: 'NGO Coordinator', desc: 'Subsidize housing programs safely' }
    ];

    const activeRole = state.preselectedRole || 'Tenant';
    const activeTab = state.registerTab || 'email'; // 'email' or 'phone'

    const roleCardsHTML = roles.map(role => `
      <label class="user-type-card ${role.id === activeRole ? 'active' : ''}" data-role="${role.id}">
        <input type="radio" name="userRole" value="${role.id}" ${role.id === activeRole ? 'checked' : ''}>
        <span class="user-type-title">${role.label}</span>
        <span class="user-type-desc">${role.desc}</span>
      </label>
    `).join('');

    return `
      <div class="auth-wrapper flex-center">
        <div class="card auth-card animate-slide-up">
          <div class="auth-header">
            <h2>Create Your Account</h2>
            <p class="text-sm text-muted">Join Haven to unlock rental identity & trust assurances.</p>
          </div>
          
          <div class="auth-tabs">
            <button class="auth-tab ${activeTab === 'email' ? 'active' : ''}" id="tab-reg-email" data-tab="email">Email Signup</button>
            <button class="auth-tab ${activeTab === 'phone' ? 'active' : ''}" id="tab-reg-phone" data-tab="phone">Phone Signup</button>
          </div>

          <form id="register-form" novalidate>
            <!-- Select User Type -->
            <div class="form-group">
              <label class="form-label">Select Your Account Type</label>
              <div class="user-type-grid">
                ${roleCardsHTML}
              </div>
            </div>

            <!-- Dynamic Input Based on Tab -->
            ${activeTab === 'email' ? `
              <div class="form-group">
                <label class="form-label" for="reg-email">Email Address</label>
                <input class="form-input" type="email" id="reg-email" placeholder="e.g. name@domain.com" required>
                <span class="form-error" id="error-email"></span>
              </div>
            ` : `
              <div class="form-group">
                <label class="form-label" for="reg-phone">Nigerian Phone Number</label>
                <div style="display:flex; gap:8px;">
                  <span class="form-input" style="width:70px; background:#F3F4F6; display:flex; align-items:center; justify-content:center; border:1px solid #D1CDCA; border-radius:12px; font-weight:bold;">+234</span>
                  <input class="form-input" type="tel" id="reg-phone" placeholder="8012345678" style="flex:1;" required>
                </div>
                <span class="form-error" id="error-phone"></span>
              </div>
            `}

            <div class="form-group">
              <label class="form-label" for="reg-password">Password</label>
              <input class="form-input" type="password" id="reg-password" placeholder="Create secure password" required>
              <span class="form-error" id="error-password"></span>
            </div>

            <div class="form-group">
              <label class="form-label" for="reg-confirm">Confirm Password</label>
              <input class="form-input" type="password" id="reg-confirm" placeholder="Repeat password" required>
              <span class="form-error" id="error-confirm"></span>
            </div>

            <div id="duplicate-error-box" class="form-error" style="display:none; margin-bottom:16px; padding:12px; background:var(--color-error-bg); border-radius:var(--radius-sm); font-size:13px; border:1px solid rgba(239, 68, 68, 0.2);"></div>

            <button type="submit" class="btn btn-primary" style="width:100%;">Create Account</button>
          </form>

          <div class="divider">or sign up with</div>

          <div class="social-login-grid">
            <button class="btn-social" id="social-reg-google">
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.62-.78-1.04-1.63-1.18-2.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
              Google
            </button>
            <button class="btn-social" id="social-reg-apple">
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#000000" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.17.67-2.88 1.5-.63.73-1.18 1.87-1.03 2.98 1.12.09 2.21-.57 2.92-1.42z"/></svg>
              Apple
            </button>
          </div>

          <p class="text-caption text-muted">Already have an account? <a href="#" class="auth-link" id="go-to-login">Log In</a></p>
        </div>
      </div>
    `;
  },

  init(state, navigateTo, updateState) {
    // 1. Handle Account Type selections
    document.querySelectorAll('.user-type-card').forEach(card => {
      card.addEventListener('click', (e) => {
        // Prevent default label click double triggering
        e.preventDefault();
        
        const selectedRole = card.getAttribute('data-role');
        updateState({ preselectedRole: selectedRole });
        
        // Visual toggle
        document.querySelectorAll('.user-type-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        card.querySelector('input[type="radio"]').checked = true;
      });
    });

    // 2. Tab switching between Email / Phone
    document.getElementById('tab-reg-email')?.addEventListener('click', () => {
      updateState({ registerTab: 'email' });
      navigateTo('register');
    });
    document.getElementById('tab-reg-phone')?.addEventListener('click', () => {
      updateState({ registerTab: 'phone' });
      navigateTo('register');
    });

    // 3. Login link
    document.getElementById('go-to-login')?.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo('login');
    });

    // 4. Social Register (Google/Apple) Mocking
    const handleSocial = (provider) => {
      const selectedRole = document.querySelector('input[name="userRole"]:checked')?.value || 'Tenant';
      updateState({
        registrationData: {
          username: `oauth_${provider}_user`,
          contact: `social_${provider}@haven.ng`,
          role: selectedRole,
          method: 'oauth'
        }
      });
      navigateTo('otp');
    };
    document.getElementById('social-reg-google')?.addEventListener('click', () => handleSocial('google'));
    document.getElementById('social-reg-apple')?.addEventListener('click', () => handleSocial('apple'));

    // 5. Submit Form and Validate
    const form = document.getElementById('register-form');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const tab = state.registerTab || 'email';
      const role = document.querySelector('input[name="userRole"]:checked')?.value || 'Tenant';
      const password = document.getElementById('reg-password').value;
      const confirm = document.getElementById('reg-confirm').value;

      // Clear errors
      document.querySelectorAll('.form-error').forEach(el => el.innerText = '');
      document.querySelectorAll('.form-input').forEach(el => el.classList.remove('error'));
      const duplicateErrorBox = document.getElementById('duplicate-error-box');
      if (duplicateErrorBox) duplicateErrorBox.style.display = 'none';

      let isValid = true;
      let contactVal = '';

      if (tab === 'email') {
        const emailEl = document.getElementById('reg-email');
        const email = emailEl.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
          document.getElementById('error-email').innerText = 'Email address is required';
          emailEl.classList.add('error');
          isValid = false;
        } else if (!emailRegex.test(email)) {
          document.getElementById('error-email').innerText = 'Please enter a valid email address';
          emailEl.classList.add('error');
          isValid = false;
        } else {
          contactVal = email;
        }
      } else {
        const phoneEl = document.getElementById('reg-phone');
        const phone = phoneEl.value.trim();
        const phoneRegex = /^[789]\d{9}$/;
        if (!phone) {
          document.getElementById('error-phone').innerText = 'Phone number is required';
          phoneEl.classList.add('error');
          isValid = false;
        } else if (!phoneRegex.test(phone)) {
          document.getElementById('error-phone').innerText = 'Enter 10 digits without leading 0 (e.g. 8012345678)';
          phoneEl.classList.add('error');
          isValid = false;
        } else {
          contactVal = `+234${phone}`;
        }
      }

      // Password Validation
      if (!password) {
        document.getElementById('error-password').innerText = 'Password is required';
        document.getElementById('reg-password').classList.add('error');
        isValid = false;
      } else if (password.length < 6) {
        document.getElementById('error-password').innerText = 'Password must be at least 6 characters';
        document.getElementById('reg-password').classList.add('error');
        isValid = false;
      }

      // Confirm Password
      if (password !== confirm) {
        document.getElementById('error-confirm').innerText = 'Passwords do not match';
        document.getElementById('reg-confirm').classList.add('error');
        isValid = false;
      }

      if (!isValid) return;

      // Duplicate Account Mock Check
      if (state.mockConfig?.duplicateAccount) {
        if (duplicateErrorBox) {
          duplicateErrorBox.innerText = `Error: The credentials '${contactVal}' are already linked to an active Haven account. Please log in or use different details.`;
          duplicateErrorBox.style.display = 'block';
        }
        return;
      }

      // Successful Registration state update
      updateState({
        registrationData: {
          username: contactVal,
          contact: contactVal,
          role: role,
          method: tab
        }
      });

      // Advance to OTP screen
      navigateTo('otp');
    });
  }
};
