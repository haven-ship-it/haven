// Identity Verification Center Screen
export const VerificationCenter = {
  render(state) {
    const activeTab = state.verifyCenterTab || 'bvn'; // 'bvn', 'nin', 'selfie', 'documents'
    const ver = state.verification || {};
    const userRole = state.user?.role || 'Tenant';

    return `
      <div class="dashboard-wrapper">
        <div class="container" style="max-width: 800px;">
          <div style="margin-bottom:32px;">
            <button class="btn btn-outline btn-sm" id="btn-back-dash" style="margin-bottom:16px;">
              &larr; Return to Dashboard
            </button>
            <h1 class="page-title">Identity Verification Center</h1>
            <p class="text-sm text-muted">Complete verification checks to unlock full features.</p>
          </div>

          <!-- Tabs -->
          <div class="auth-tabs" style="margin-bottom:32px;">
            <button class="auth-tab ${activeTab === 'bvn' ? 'active' : ''}" id="tab-v-bvn">BVN Match</button>
            <button class="auth-tab ${activeTab === 'nin' ? 'active' : ''}" id="tab-v-nin">NIN Match</button>
            <button class="auth-tab ${activeTab === 'selfie' ? 'active' : ''}" id="tab-v-selfie">Liveness Selfie</button>
            <button class="auth-tab ${activeTab === 'documents' ? 'active' : ''}" id="tab-v-docs">Documents Upload</button>
          </div>

          <div class="card" style="padding: 40px 32px;">
            
            <!-- BVN Tab Panel -->
            ${activeTab === 'bvn' ? `
              <div>
                <h3 class="card-title" style="margin-bottom:8px;">Bank Verification Number (BVN)</h3>
                <p class="text-caption text-muted" style="margin-bottom:24px;">Your BVN is matched against official bank profiles to verify full name and birthdate. No funds are accessed.</p>
                
                ${ver.bvnStatus === 'approved' ? `
                  <div class="flex-center" style="flex-direction:column; gap:16px; padding:32px 0;">
                    <div style="font-size:48px;">&#9989;</div>
                    <h4 style="color:var(--color-success); font-weight:bold;">BVN Match Verified</h4>
                    <p class="text-sm text-muted">Your records match correctly.</p>
                  </div>
                ` : `
                  <form id="verify-bvn-form">
                    <div class="form-group">
                      <label class="form-label" for="v-bvn-input">Enter 11-Digit BVN</label>
                      <input class="form-input" type="text" id="v-bvn-input" maxlength="11" placeholder="222XXXXXXXX" required pattern="\\d{11}">
                      <span class="form-error" id="error-bvn"></span>
                    </div>

                    <div id="bvn-loading-overlay" style="display:none; text-align:center; padding:16px 0;">
                      <div class="animate-spin" style="display:inline-block; font-size:24px; margin-bottom:8px;">&#8635;</div>
                      <div class="text-caption text-muted">Contacting banking servers...</div>
                    </div>

                    <button type="submit" class="btn btn-primary" id="btn-submit-bvn" style="width:100%;">Verify BVN Identity</button>
                  </form>
                `}
              </div>
            ` : ''}

            <!-- NIN Tab Panel -->
            ${activeTab === 'nin' ? `
              <div>
                <h3 class="card-title" style="margin-bottom:8px;">National Identification Number (NIN)</h3>
                <p class="text-caption text-muted" style="margin-bottom:24px;">Confirm your citizenship registration records via direct integration with NIMC databases.</p>
                
                ${ver.ninStatus === 'approved' ? `
                  <div class="flex-center" style="flex-direction:column; gap:16px; padding:32px 0;">
                    <div style="font-size:48px;">&#9989;</div>
                    <h4 style="color:var(--color-success); font-weight:bold;">NIN Verification Approved</h4>
                    <p class="text-sm text-muted">Citizen identity records match perfectly.</p>
                  </div>
                ` : `
                  <form id="verify-nin-form">
                    <div class="form-group">
                      <label class="form-label" for="v-nin-input">Enter 11-Digit NIN</label>
                      <input class="form-input" type="text" id="v-nin-input" maxlength="11" placeholder="e.g. 10234567890" required pattern="\\d{11}">
                      <span class="form-error" id="error-nin"></span>
                    </div>

                    <div id="nin-loading-overlay" style="display:none; text-align:center; padding:16px 0;">
                      <div class="animate-spin" style="display:inline-block; font-size:24px; margin-bottom:8px;">&#8635;</div>
                      <div class="text-caption text-muted">Connecting to NIMC gateway...</div>
                    </div>

                    <button type="submit" class="btn btn-primary" id="btn-submit-nin" style="width:100%;">Verify NIMC Record</button>
                  </form>
                `}
              </div>
            ` : ''}

            <!-- Selfie Tab Panel -->
            ${activeTab === 'selfie' ? `
              <div class="text-center">
                <h3 class="card-title" style="margin-bottom:8px;">Liveness Selfie Check</h3>
                <p class="text-caption text-muted" style="margin-bottom:24px;">Matches your live face biometric profile against official BVN and NIN photos to ensure security.</p>
                
                ${ver.selfieStatus === 'approved' ? `
                  <div class="flex-center" style="flex-direction:column; gap:16px; padding:32px 0;">
                    <div style="font-size:48px;">&#9989;</div>
                    <h4 style="color:var(--color-success); font-weight:bold;">Biometric Match Confirmed</h4>
                    <p class="text-sm text-muted">Liveness verification matching completed.</p>
                  </div>
                ` : `
                  <div class="selfie-frame" id="selfie-camera-frame">
                    <div class="selfie-camera-placeholder">
                      <svg class="selfie-avatar-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                      <span id="selfie-prompt-text" style="margin-top:8px; font-weight:bold;">Camera Ready</span>
                    </div>
                    <div class="selfie-scanner-bar"></div>
                  </div>

                  <div id="selfie-instructions" style="margin-bottom:24px; font-size:13px; color:#4B5563; font-weight:500;">
                    Position your face within the circle and keep a neutral expression.
                  </div>

                  <button class="btn btn-primary" id="btn-capture-selfie" style="width:100%;">Initialize Biometric Capture</button>
                `}
              </div>
            ` : ''}

            <!-- Documents Tab Panel -->
            ${activeTab === 'documents' ? `
              <div>
                <h3 class="card-title" style="margin-bottom:8px;">Document Verification Center</h3>
                <p class="text-caption text-muted" style="margin-bottom:24px;">Upload copies of Utility Bills, Employment badges, or student registrations to activate accounts.</p>
                
                <div class="dropzone" id="doc-dropzone">
                  <div class="dropzone-icon">&#8679;</div>
                  <h4 style="font-size:16px; font-weight:bold; margin-bottom:4px;">Drag & Drop documents here</h4>
                  <p class="text-caption text-muted">Accepts PDF, PNG, JPG files up to 10MB</p>
                </div>

                <div class="uploaded-files-list" id="doc-files-list">
                  ${ver.documentStatus === 'approved' ? `
                    <div class="uploaded-file-item">
                      <span>utility_bill_lasg.pdf (1.2 MB)</span>
                      <span class="badge badge-approved">Approved</span>
                    </div>
                  ` : ''}
                  ${userRole === 'Student' && ver.studentIdStatus === 'approved' ? `
                    <div class="uploaded-file-item">
                      <span>student_id_unilag.png (850 KB)</span>
                      <span class="badge badge-approved">Approved</span>
                    </div>
                  ` : ''}
                  ${userRole === 'Tenant' && ver.employeeIdStatus === 'approved' ? `
                    <div class="uploaded-file-item">
                      <span>corporate_id_card.png (910 KB)</span>
                      <span class="badge badge-approved">Approved</span>
                    </div>
                  ` : ''}
                </div>

                ${ver.documentStatus !== 'approved' ? `
                  <button class="btn btn-primary" id="btn-submit-docs" style="width:100%; margin-top:24px;" disabled>Submit Uploaded Files</button>
                ` : ''}
              </div>
            ` : ''}

          </div>
        </div>
      </div>
    `;
  },

  init(state, navigateTo, updateState) {
    const activeTab = state.verifyCenterTab || 'bvn';
    const ver = state.verification || {};
    const userRole = state.user?.role || 'Tenant';

    // Back to dashboard
    document.getElementById('btn-back-dash')?.addEventListener('click', () => {
      navigateTo('dashboard');
    });

    // Tab switcher listeners
    const switchTab = (tabName) => {
      updateState({ verifyCenterTab: tabName });
      navigateTo('verification-center');
    };
    document.getElementById('tab-v-bvn')?.addEventListener('click', () => switchTab('bvn'));
    document.getElementById('tab-v-nin')?.addEventListener('click', () => switchTab('nin'));
    document.getElementById('tab-v-selfie')?.addEventListener('click', () => switchTab('selfie'));
    document.getElementById('tab-v-docs')?.addEventListener('click', () => switchTab('documents'));

    // 1. BVN Verification Logic
    const bvnForm = document.getElementById('verify-bvn-form');
    bvnForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const bvnInput = document.getElementById('v-bvn-input');
      const bvn = bvnInput.value.trim();
      const errorBvn = document.getElementById('error-bvn');
      const loader = document.getElementById('bvn-loading-overlay');
      const submitBtn = document.getElementById('btn-submit-bvn');

      if (errorBvn) errorBvn.innerText = '';
      if (!/^\d{11}$/.test(bvn)) {
        if (errorBvn) errorBvn.innerText = 'Please enter exactly 11 digits.';
        return;
      }

      // Start loading
      if (loader) loader.style.display = 'block';
      if (submitBtn) submitBtn.disabled = true;

      setTimeout(() => {
        if (loader) loader.style.display = 'none';
        if (submitBtn) submitBtn.disabled = false;

        // Exception check
        if (state.mockConfig?.failBVN) {
          if (errorBvn) errorBvn.innerText = 'Verification Failed: Bank registry returns a mismatch on name/date-of-birth. Please verify details.';
        } else {
          // Success
          const newVer = { ...ver, bvnStatus: 'approved' };
          updateState({ verification: newVer });
          navigateTo('verification-center');
        }
      }, 1500);
    });

    // 2. NIN Verification Logic
    const ninForm = document.getElementById('verify-nin-form');
    ninForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const ninInput = document.getElementById('v-nin-input');
      const nin = ninInput.value.trim();
      const errorNin = document.getElementById('error-nin');
      const loader = document.getElementById('nin-loading-overlay');
      const submitBtn = document.getElementById('btn-submit-nin');

      if (errorNin) errorNin.innerText = '';
      if (!/^\d{11}$/.test(nin)) {
        if (errorNin) errorNin.innerText = 'NIN must consist of exactly 11 digits.';
        return;
      }

      // Start loading
      if (loader) loader.style.display = 'block';
      if (submitBtn) submitBtn.disabled = true;

      setTimeout(() => {
        if (loader) loader.style.display = 'none';
        if (submitBtn) submitBtn.disabled = false;

        // Exception check
        if (state.mockConfig?.failNIN) {
          if (errorNin) errorNin.innerText = 'Citizen Lookup Failed: The NIN credential could not be found or match status is negative.';
        } else {
          // Success
          const newVer = { ...ver, ninStatus: 'approved' };
          updateState({ verification: newVer });
          navigateTo('verification-center');
        }
      }, 1500);
    });

    // 3. Selfie verification liveness check simulation
    const captureBtn = document.getElementById('btn-capture-selfie');
    captureBtn?.addEventListener('click', () => {
      const frame = document.getElementById('selfie-camera-frame');
      const text = document.getElementById('selfie-prompt-text');
      const instructions = document.getElementById('selfie-instructions');
      
      captureBtn.disabled = true;
      frame.classList.add('scanning');
      
      // Step 1: Liveness cues
      text.innerText = "Capturing Face...";
      
      setTimeout(() => {
        text.innerText = "BLINK NOW";
        if (instructions) instructions.innerText = "Action required: Blink to confirm liveness.";
      }, 1500);

      setTimeout(() => {
        text.innerText = "LOOK STRAIGHT";
        if (instructions) instructions.innerText = "Please look directly into the camera frame.";
      }, 3000);

      setTimeout(() => {
        text.innerText = "Matching Face...";
        if (instructions) instructions.innerText = "Verifying liveness against official NIMC photograph registries...";
      }, 4500);

      setTimeout(() => {
        // Complete Selfie Approval
        const newVer = { ...ver, selfieStatus: 'approved' };
        updateState({ verification: newVer });
        navigateTo('verification-center');
      }, 6000);
    });

    // 4. Document Dropzone simulation
    const dropzone = document.getElementById('doc-dropzone');
    const submitDocsBtn = document.getElementById('btn-submit-docs');
    const filesList = document.getElementById('doc-files-list');

    dropzone?.addEventListener('click', () => {
      // Create and append mock files
      const mockFiles = [
        { name: 'utility_bill_lasg.pdf', size: '1.2 MB' },
        { name: userRole === 'Student' ? 'student_id_unilag.png' : 'corporate_id_card.png', size: '910 KB' }
      ];

      mockFiles.forEach(f => {
        const item = document.createElement('div');
        item.className = 'uploaded-file-item';
        item.innerHTML = `
          <span>${f.name} (${f.size})</span>
          <span class="badge badge-pending">Uploaded</span>
        `;
        filesList.appendChild(item);
      });

      if (submitDocsBtn) submitDocsBtn.disabled = false;
      alert("Simulated upload: Files selected successfully.");
    });

    submitDocsBtn?.addEventListener('click', () => {
      submitDocsBtn.disabled = true;
      submitDocsBtn.innerText = "Verifying files...";

      setTimeout(() => {
        const newVer = { 
          ...ver, 
          documentStatus: 'approved'
        };
        // Add student ID or employee ID depending on role
        if (userRole === 'Student') {
          newVer.studentIdStatus = 'approved';
        } else {
          newVer.employeeIdStatus = 'approved';
        }

        updateState({ verification: newVer });
        navigateTo('verification-center');
      }, 2000);
    });
  }
};
