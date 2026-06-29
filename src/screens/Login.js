// Login Screen
export const Login = {
  render(state) {
    const activeTab = state.loginTab || 'email'; // 'email' or 'phone'

    return `
      <div class="auth-wrapper flex-center">
        <div class="card auth-card animate-slide-up">
          <div class="auth-header">
            <h2>Welcome Back</h2>
            <p class="text-sm text-muted">Log in to manage your rental qualifications and secure escrow.</p>
          </div>

          <div class="auth-tabs">
            <button class="auth-tab ${activeTab === 'email' ? 'active' : ''}" id="tab-login-email" data-tab="email">Email Login</button>
            <button class="auth-tab ${activeTab === 'phone' ? 'active' : ''}" id="tab-login-phone" data-tab="phone">Phone Login</button>
          </div>

          <form id="login-form" novalidate>
            <!-- Dynamic Input Based on Tab -->
            ${activeTab === 'email' ? `
              <div class="form-group">
                <label class="form-label" for="login-email">Email Address</label>
                <input class="form-input" type="email" id="login-email" placeholder="name@domain.com" required>
                <span class="form-error" id="error-login-email"></span>
              </div>
            ` : `
              <div class="form-group">
                <label class="form-label" for="login-phone">Nigerian Phone Number</label>
                <div style="display:flex; gap:8px;">
                  <span class="form-input" style="width:70px; background:#F3F4F6; display:flex; align-items:center; justify-content:center; border:1px solid #D1CDCA; border-radius:12px; font-weight:bold;">+234</span>
                  <input class="form-input" type="tel" id="login-phone" placeholder="8012345678" style="flex:1;" required>
                </div>
                <span class="form-error" id="error-login-phone"></span>
              </div>
            `}

            <div class="form-group">
              <label class="form-label" for="login-password">Password</label>
              <input class="form-input" type="password" id="login-password" placeholder="Enter password" required>
              <span class="form-error" id="error-login-password"></span>
            </div>

            <div class="form-row">
              <label class="checkbox-label">
                <input type="checkbox" id="remember-me">
                Remember me
              </label>
              <a href="#" class="auth-link" id="forgot-password">Forgot password?</a>
            </div>

            <button type="submit" class="btn btn-primary" style="width:100%;">Log In</button>
          </form>

          <div class="divider">or log in with</div>

          <div class="social-login-grid">
            <button class="btn-social" id="social-login-google">
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.62-.78-1.04-1.63-1.18-2.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
              Google
            </button>
            <button class="btn-social" id="social-login-apple">
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#000000" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.17.67-2.88 1.5-.63.73-1.18 1.87-1.03 2.98 1.12.09 2.21-.57 2.92-1.42z"/></svg>
              Apple
            </button>
          </div>

          <p class="text-caption text-muted">Don't have an account? <a href="#" class="auth-link" id="go-to-register">Sign Up</a></p>
        </div>
      </div>
    `;
  },

  init(state, navigateTo, updateState) {
    // Tab switching
    document.getElementById('tab-login-email')?.addEventListener('click', () => {
      updateState({ loginTab: 'email' });
      navigateTo('login');
    });
    document.getElementById('tab-login-phone')?.addEventListener('click', () => {
      updateState({ loginTab: 'phone' });
      navigateTo('login');
    });

    // Forgot password modal simulation
    document.getElementById('forgot-password')?.addEventListener('click', (e) => {
      e.preventDefault();
      alert("A reset link has been dispatched to your verified security coordinates. Please verify your inbox/SMS.");
    });

    // Go to registration
    document.getElementById('go-to-register')?.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo('register');
    });

    // OAuth mock logins
    const handleSocial = (provider) => {
      updateState({
        user: {
          username: `social_${provider}_user@haven.ng`,
          role: 'Tenant',
          method: 'oauth'
        }
      });
      navigateTo('dashboard');
    };
    document.getElementById('social-login-google')?.addEventListener('click', () => handleSocial('google'));
    document.getElementById('social-login-apple')?.addEventListener('click', () => handleSocial('apple'));

    // Form submission validation
    const form = document.getElementById('login-form');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();

      const tab = state.loginTab || 'email';
      const password = document.getElementById('login-password').value;

      // Clear errors
      document.querySelectorAll('.form-error').forEach(el => el.innerText = '');
      document.querySelectorAll('.form-input').forEach(el => el.classList.remove('error'));

      let isValid = true;
      let contactVal = '';

      if (tab === 'email') {
        const emailEl = document.getElementById('login-email');
        const email = emailEl.value.trim();
        if (!email) {
          document.getElementById('error-login-email').innerText = 'Email address is required';
          emailEl.classList.add('error');
          isValid = false;
        } else {
          contactVal = email;
        }
      } else {
        const phoneEl = document.getElementById('login-phone');
        const phone = phoneEl.value.trim();
        if (!phone) {
          document.getElementById('error-login-phone').innerText = 'Phone number is required';
          phoneEl.classList.add('error');
          isValid = false;
        } else {
          contactVal = `+234${phone}`;
        }
      }

      if (!password) {
        document.getElementById('error-login-password').innerText = 'Password is required';
        document.getElementById('login-password').classList.add('error');
        isValid = false;
      }

      if (!isValid) return;

      // Successful login state simulation
      // If mock config "incompleteProfile" is true, empty out user profileData
      if (state.mockConfig?.incompleteProfile) {
        updateState({
          profileData: {
            personalInfo: {},
            locationPreferences: {},
            housingPreferences: {},
            employmentInfo: {},
            incomeInfo: {},
            lifestylePreferences: {}
          },
          verification: {
            bvnStatus: 'unverified',
            ninStatus: 'unverified',
            selfieStatus: 'unverified',
            employeeIdStatus: 'unverified',
            studentIdStatus: 'unverified',
            documentStatus: 'unverified'
          }
        });
      }

      updateState({
        user: {
          username: contactVal,
          role: state.registrationData?.role || 'Tenant',
          method: tab
        }
      });

      const isLandlordOrAgent = (state.registrationData?.role === 'Landlord' || state.registrationData?.role === 'Agent' || state.preselectedRole === 'Landlord' || state.preselectedRole === 'Agent');
      const isPartner = (state.registrationData?.role === 'Corporate Partner' || state.registrationData?.role === 'University Housing' || state.registrationData?.role === 'NGO Coordinator' || state.preselectedRole === 'Corporate Partner' || state.preselectedRole === 'University Housing' || state.preselectedRole === 'NGO Coordinator');
      const isAdmin = (state.registrationData?.role === 'Admin' || state.preselectedRole === 'Admin');
      
      if (isLandlordOrAgent) {
        navigateTo('landlord');
      } else if (isPartner) {
        navigateTo('partner');
      } else if (isAdmin) {
        navigateTo('admin');
      } else {
        navigateTo('dashboard');
      }
    });
  }
};
