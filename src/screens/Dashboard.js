// Dashboard Screen (Updated for Milestone 2)
export const Dashboard = {
  render(state) {
    const userRole = state.user?.role || 'Tenant';
    const username = state.user?.username || 'user';
    const ver = state.verification || {};
    const activeTab = state.activeDashboardTab || 'overview';

    // 1. Evaluate Overall Verification Status (Legacy logic retained for header summary)
    let overallStatus = 'approved';
    let bannerClass = 'status-banner-approved';
    let bannerIcon = '&#9989;';
    let bannerTitle = 'Identity Fully Verified';
    let bannerDesc = 'Your Haven Trust profile is active. You have been graded Grade A (785/900 Quality Score).';

    const statuses = [ver.bvnStatus, ver.ninStatus, ver.selfieStatus, ver.employeeIdStatus, ver.studentIdStatus];
    if (statuses.includes('failed')) {
      overallStatus = 'rejected';
      bannerClass = 'status-banner-rejected';
      bannerIcon = '&#10060;';
      bannerTitle = 'Verification Rejected';
      bannerDesc = 'One or more of your identity credentials failed verification.';
    } else if (statuses.includes('unverified')) {
      overallStatus = 'action';
      bannerClass = 'status-banner-action';
      bannerIcon = '&#9888;';
      bannerTitle = 'Requires Action';
      bannerDesc = 'You have pending checklist actions. Please upload documents or complete API matching.';
    } else if (statuses.includes('pending')) {
      overallStatus = 'pending';
      bannerClass = 'status-banner-pending';
      bannerIcon = '&#8987;';
      bannerTitle = 'Verification Processing';
      bannerDesc = 'NIMC and banking API servers are verifying your records.';
    }

    // Sidebar navigation buttons
    const sidebarTabs = [
      { id: 'overview', name: 'Dashboard Overview', icon: '&#128100;' },
      { id: 'quality-score', name: 'Quality Score Analytics', icon: '&#128200;' },
      { id: 'profile', name: 'Profile Management', icon: '&#128221;' },
      { id: 'escrow-timeline', name: 'Escrow & Timeline', icon: '&#128184;' },
      { id: 'settings', name: 'Platform Settings', icon: '&#9881;' }
    ];

    const sidebarHTML = sidebarTabs.map(tab => `
      <button class="dashboard-tab-btn ${activeTab === tab.id ? 'active' : ''}" data-tab="${tab.id}">
        <span>${tab.icon}</span>
        ${tab.name}
      </button>
    `).join('');

    return `
      <div class="dashboard-wrapper">
        <div class="container">
          
          <div class="dashboard-layout">
            <!-- Left Sidebar Navigation -->
            <div class="dashboard-sidebar-menu">
              <div style="text-align:center; padding-bottom:16px; margin-bottom:16px; border-bottom:1px solid #F3F4F6;">
                <div style="width:60px; height:60px; border-radius:var(--radius-full); background-color:var(--color-primary); color:white; font-size:24px; font-weight:bold; margin:0 auto 12px auto; display:flex; align-items:center; justify-content:center;">
                  ${username.charAt(0).toUpperCase()}
                </div>
                <h4 style="font-weight:bold; font-size:15px; color:var(--color-primary);">${username.split('@')[0]}</h4>
                <span class="badge badge-${overallStatus}" style="font-size:10px; margin-top:8px;">${overallStatus}</span>
              </div>
              ${sidebarHTML}
            </div>

            <!-- Right Content Area -->
            <div class="dashboard-content-area">
              
              <!-- TAB 1: OVERVIEW -->
              ${activeTab === 'overview' ? this.renderOverviewTab(state, overallStatus, bannerClass, bannerIcon, bannerTitle, bannerDesc) : ''}

              <!-- TAB 2: QUALITY SCORE -->
              ${activeTab === 'quality-score' ? this.renderQualityScoreTab(state) : ''}

              <!-- TAB 3: PROFILE MANAGER -->
              ${activeTab === 'profile' ? this.renderProfileTab(state) : ''}

              <!-- TAB 4: ESCROW & TIMELINE -->
              ${activeTab === 'escrow-timeline' ? this.renderEscrowTimelineTab(state) : ''}

              <!-- TAB 5: SETTINGS -->
              ${activeTab === 'settings' ? this.renderSettingsTab(state) : ''}

            </div>
          </div>

        </div>
      </div>

      <!-- Deposit Funds Simulator Modal Overlay -->
      <div class="modal-overlay" id="escrow-deposit-modal" style="display:none;">
        <div class="modal-content-card">
          <h3 class="card-title" style="margin-bottom:8px;">Simulate Escrow Payment</h3>
          <p class="text-caption text-muted" style="margin-bottom:20px;">Add funds to caution deposit or advance rent escrow accounts.</p>
          <form id="escrow-deposit-form">
            <div class="form-group">
              <label class="form-label" for="deposit-amount">Amount (₦)</label>
              <input class="form-input" type="number" id="deposit-amount" placeholder="e.g. 150000" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="deposit-type">Target Balance</label>
              <select class="form-input" id="deposit-type">
                <option value="Caution Deposit">Caution Deposit</option>
                <option value="Advance Rent">Advance Rent</option>
                <option value="Rent Payment">Monthly Rent Payment</option>
              </select>
            </div>
            <div style="display:flex; justify-content:flex-end; gap:12px; margin-top:24px;">
              <button type="button" class="btn btn-outline btn-sm" id="close-deposit-modal">Cancel</button>
              <button type="submit" class="btn btn-primary btn-sm">Confirm Deposit</button>
            </div>
          </form>
        </div>
      </div>
    `;
  },

  // Overview Tab Renderer
  renderOverviewTab(state, overallStatus, bannerClass, bannerIcon, bannerTitle, bannerDesc) {
    const ver = state.verification || {};
    const scoreVal = state.score?.overall || 785;
    const progressOffset = 440 - (440 * (scoreVal / 900));

    return `
      <!-- Overall Status Banner -->
      <div class="status-banner ${bannerClass}">
        <div class="status-banner-icon" style="background: white;">${bannerIcon}</div>
        <div class="status-banner-content">
          <h3>${bannerTitle}</h3>
          <p>${bannerDesc}</p>
        </div>
      </div>

      <!-- Dashboard Widgets Grid -->
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:24px; align-items:start;">
        
        <!-- Score Circular Gauge Widget -->
        <div class="score-circle-container">
          <div class="score-svg-box">
            <svg width="160" height="160">
              <circle class="score-circle-bg" cx="80" cy="80" r="70" />
              <circle class="score-circle-fill" cx="80" cy="80" r="70" style="stroke-dasharray: 440; stroke-dashoffset: ${progressOffset};" />
            </svg>
            <div class="score-text-overlay">
              <span class="score-number">${scoreVal}</span>
              <span class="score-label">Haven Score</span>
            </div>
          </div>
          <div style="flex:1;">
            <h3 style="font-weight:bold; margin-bottom:8px; font-size:18px;">Tenant Rating: ${state.score?.tier}</h3>
            <p class="text-caption text-muted" style="line-height:1.4; margin-bottom:12px;">This indicates an <strong>${state.score?.status}</strong> qualification score. Landlords prioritize profiles above 700.</p>
            <button class="btn btn-outline btn-sm" id="goto-score-tab">View Score Details</button>
          </div>
        </div>

        <!-- Escrow Balance Widget -->
        <div class="card" style="padding: 24px; display:flex; flex-direction:column; gap:16px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <h4 class="kpi-label">Secured Escrow Rent</h4>
            <span class="badge badge-approved">Safe</span>
          </div>
          <div style="font-size:36px; font-weight:bold; color:var(--color-primary);">
            ₦ ${(state.escrow?.totalSecured || 0).toLocaleString()}
          </div>
          <div class="text-caption text-muted" style="display:flex; justify-content:space-between; border-top:1px solid #F3F4F6; padding-top:12px;">
            <span>Caution: ₦ ${(state.escrow?.cautionDeposit || 0).toLocaleString()}</span>
            <span>Advance: ₦ ${(state.escrow?.advanceRent || 0).toLocaleString()}</span>
          </div>
          <button class="btn btn-primary btn-sm" id="btn-open-deposit-modal" style="width:100%;">Simulate Deposit</button>
        </div>

      </div>

      <!-- Verification Mini-Checklist -->
      <div class="card" style="padding:24px;">
        <h3 class="card-title" style="font-size:16px; margin-bottom:16px;">Verification Checklist</h3>
        <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:12px;">
          <div style="border: 1px solid #F3F4F6; padding:12px; border-radius:12px; text-align:center;">
            <div style="font-size:18px; margin-bottom:4px;">${ver.bvnStatus === 'approved' ? '&#9989;' : '&#9898;'}</div>
            <div style="font-weight:bold; font-size:11px;">BVN match</div>
            <span style="font-size:10px;" class="badge badge-${ver.bvnStatus === 'approved' ? 'approved' : 'action'}">${ver.bvnStatus}</span>
          </div>
          <div style="border: 1px solid #F3F4F6; padding:12px; border-radius:12px; text-align:center;">
            <div style="font-size:18px; margin-bottom:4px;">${ver.ninStatus === 'approved' ? '&#9989;' : '&#9898;'}</div>
            <div style="font-weight:bold; font-size:11px;">NIN citizen</div>
            <span style="font-size:10px;" class="badge badge-${ver.ninStatus === 'approved' ? 'approved' : 'action'}">${ver.ninStatus}</span>
          </div>
          <div style="border: 1px solid #F3F4F6; padding:12px; border-radius:12px; text-align:center;">
            <div style="font-size:18px; margin-bottom:4px;">${ver.selfieStatus === 'approved' ? '&#9989;' : '&#9898;'}</div>
            <div style="font-weight:bold; font-size:11px;">Selfie matches</div>
            <span style="font-size:10px;" class="badge badge-${ver.selfieStatus === 'approved' ? 'approved' : 'action'}">${ver.selfieStatus}</span>
          </div>
          <div style="border: 1px solid #F3F4F6; padding:12px; border-radius:12px; text-align:center;">
            <div style="font-size:18px; margin-bottom:4px;">${ver.documentStatus === 'approved' ? '&#9989;' : '&#9898;'}</div>
            <div style="font-weight:bold; font-size:11px;">Documents</div>
            <span style="font-size:10px;" class="badge badge-${ver.documentStatus === 'approved' ? 'approved' : 'action'}">${ver.documentStatus}</span>
          </div>
        </div>
      </div>

      <!-- Recommended Properties Grid -->
      <div>
        <h2 class="section-header" style="margin-bottom:16px; font-size:20px;">Recommended High-Match Properties</h2>
        <div class="property-card-grid">
          
          <div class="property-card">
            <div class="property-img-placeholder" style="background:linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400'); background-size:cover;">
              <span class="property-badge-match">98% Match</span>
            </div>
            <div class="property-info">
              <span class="property-price">₦ 3,200,000 / Yr</span>
              <span class="property-title">Luxury 2 Bedroom Apartment</span>
              <span style="font-size:12px; color:#6B7280;">Lekki Phase 1, Lagos</span>
              <div class="property-specs">
                <span>&#128704; 2 Baths</span>
                <span>&bull;</span>
                <span>&#128719; 2 Beds</span>
              </div>
              <button class="btn btn-primary btn-sm btn-apply-property" data-title="Luxury 2 Bed Apartment" data-location="Lekki Phase 1" style="width:100%;">Apply Now</button>
            </div>
          </div>

          <div class="property-card">
            <div class="property-img-placeholder" style="background:linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400'); background-size:cover;">
              <span class="property-badge-match">92% Match</span>
            </div>
            <div class="property-info">
              <span class="property-price">₦ 1,800,000 / Yr</span>
              <span class="property-title">Modern 1 Bed Studio Loft</span>
              <span style="font-size:12px; color:#6B7280;">Yaba, Lagos</span>
              <div class="property-specs">
                <span>&#128704; 1 Bath</span>
                <span>&bull;</span>
                <span>&#128719; 1 Bed</span>
              </div>
              <button class="btn btn-primary btn-sm btn-apply-property" data-title="Modern 1 Bed Studio" data-location="Yaba" style="width:100%;">Apply Now</button>
            </div>
          </div>

          <div class="property-card">
            <div class="property-img-placeholder" style="background:linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400'); background-size:cover;">
              <span class="property-badge-match">85% Match</span>
            </div>
            <div class="property-info">
              <span class="property-price">₦ 5,500,000 / Yr</span>
              <span class="property-title">3 Bed Serviced Penthouse</span>
              <span style="font-size:12px; color:#6B7280;">Victoria Island, Lagos</span>
              <div class="property-specs">
                <span>&#128704; 3 Baths</span>
                <span>&bull;</span>
                <span>&#128719; 3 Beds</span>
              </div>
              <button class="btn btn-primary btn-sm btn-apply-property" data-title="3 Bed Serviced Penthouse" data-location="Victoria Island" style="width:100%;">Apply Now</button>
            </div>
          </div>

        </div>
      </div>
    `;
  },

  // Quality Score Tab Renderer
  renderQualityScoreTab(state) {
    const scoreVal = state.score?.overall || 785;
    const progressOffset = 440 - (440 * (scoreVal / 900));

    return `
      <div style="margin-bottom:16px;">
        <h2 class="section-header">Tenant Quality Score</h2>
        <p class="text-sm text-muted">A multidimensional assessment of credit standing, identity checks validation, and rental reliability.</p>
      </div>

      <!-- Large analytics card -->
      <div style="display:grid; grid-template-columns: 1.2fr 1.8fr; gap:32px; background:white; padding:32px; border-radius:var(--radius-lg); box-shadow:var(--shadow-sm); border:1px solid rgba(13, 27, 75, 0.04);">
        <div style="display:flex; flex-direction:column; align-items:center; gap:20px; border-right:1px solid #E5E7EB; padding-right:32px;">
          <div class="score-svg-box">
            <svg width="160" height="160">
              <circle class="score-circle-bg" cx="80" cy="80" r="70" />
              <circle class="score-circle-fill" cx="80" cy="80" r="70" style="stroke-dasharray: 440; stroke-dashoffset: ${progressOffset};" />
            </svg>
            <div class="score-text-overlay">
              <span class="score-number">${scoreVal}</span>
              <span class="score-label">Out of 900</span>
            </div>
          </div>
          <div class="text-center">
            <div style="font-weight:bold; font-size:18px; color:var(--color-primary);">${state.score?.tier}</div>
            <div style="font-size:13px; color:var(--color-success); font-weight:bold;">Excellent Standing</div>
          </div>
        </div>

        <div>
          <h3 style="font-size:16px; font-weight:bold; margin-bottom:12px; color:var(--color-primary);">What does your score mean?</h3>
          <p class="text-caption text-muted" style="line-height:1.6; margin-bottom:16px;">Your Haven score represents institutional-grade rental credit. Landlords and institutional funds look at this score to waive heavy advance payments, allowing you to pay caution deposits and monthly rent with ease.</p>
          <div style="background:#F9FAFB; padding:16px; border-radius:12px; border:1px solid #E5E7EB; display:flex; flex-direction:column; gap:8px; font-size:12px; color:#4B5563;">
            <div style="display:flex; justify-content:space-between;"><span>750 - 900</span> <span style="font-weight:bold; color:var(--color-success);">Excellent (Grade A)</span></div>
            <div style="display:flex; justify-content:space-between;"><span>650 - 749</span> <span style="font-weight:bold; color:var(--color-secondary);">Good (Grade B)</span></div>
            <div style="display:flex; justify-content:space-between;"><span>500 - 649</span> <span style="font-weight:bold; color:var(--color-warning);">Average (Grade C)</span></div>
            <div style="display:flex; justify-content:space-between;"><span>Below 500</span> <span style="font-weight:bold; color:var(--color-error);">High Risk (Grade D)</span></div>
          </div>
        </div>
      </div>

      <!-- Subscores breakdown -->
      <div>
        <h3 class="section-header" style="font-size:18px; margin-bottom:16px;">Scoring Breakdown Details</h3>
        <div class="subscore-card-grid">
          
          <div class="subscore-item">
            <div style="display:flex; justify-content:space-between; font-weight:bold; font-size:13px;">
              <span>Financial Security Score</span>
              <span>${state.score?.financial}/100</span>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar-fill" style="width: ${state.score?.financial}%;"></div>
            </div>
            <p style="font-size:11px; color:#6B7280; line-height:1.4;">Based on debt ratios, income history validations, and salary deposits credit matches.</p>
          </div>

          <div class="subscore-item">
            <div style="display:flex; justify-content:space-between; font-weight:bold; font-size:13px;">
              <span>Identity Match Assurance</span>
              <span>${state.score?.verification}/100</span>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar-fill" style="width: ${state.score?.verification}%;"></div>
            </div>
            <p style="font-size:11px; color:#6B7280; line-height:1.4;">Direct checks against NIMC, BVN bank registries, and liveness biometrics matches.</p>
          </div>

          <div class="subscore-item">
            <div style="display:flex; justify-content:space-between; font-weight:bold; font-size:13px;">
              <span>Affordability Rating</span>
              <span>${state.score?.affordability}/100</span>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar-fill" style="width: ${state.score?.affordability}%;"></div>
            </div>
            <p style="font-size:11px; color:#6B7280; line-height:1.4;">Evaluates preferred budget levels relative to validated income streams.</p>
          </div>

          <div class="subscore-item">
            <div style="display:flex; justify-content:space-between; font-weight:bold; font-size:13px;">
              <span>Rental Behavior History</span>
              <span>${state.score?.behavior}/100</span>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar-fill" style="width: ${state.score?.behavior}%;"></div>
            </div>
            <p style="font-size:11px; color:#6B7280; line-height:1.4;">Formulated from past landlord reviews, payment timeliness logs, and occupancy terms.</p>
          </div>

        </div>
      </div>

      <!-- Risk Assessment Engine UI -->
      <div class="card" style="padding:24px;">
        <h3 class="card-title" style="font-size:16px; margin-bottom:16px;">Risk Assessment Engine Logs</h3>
        
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:24px;">
          <!-- Positive signals -->
          <div>
            <h4 style="font-size:13px; font-weight:bold; color:var(--color-success); margin-bottom:12px;">&#9989; Positive Indicators</h4>
            <div style="display:flex; flex-direction:column; gap:8px; font-size:12px;">
              <div style="padding:10px; background:#F0FDF4; border-radius:8px; border-left:4px solid var(--color-success);">
                <strong>Stable Employer Link:</strong> Verified senior UI/UX analyst position at PropTech Labs.
              </div>
              <div style="padding:10px; background:#F0FDF4; border-radius:8px; border-left:4px solid var(--color-success);">
                <strong>Perfect Identity Audit:</strong> BVN, NIN, and biometric match confirmed.
              </div>
            </div>
          </div>

          <!-- Risk Warnings -->
          <div>
            <h4 style="font-size:13px; font-weight:bold; color:var(--color-warning); margin-bottom:12px;">&#9888; Risk Alerts / Recommendations</h4>
            <div style="display:flex; flex-direction:column; gap:8px; font-size:12px;">
              <div style="padding:10px; background:#FFFBEB; border-radius:8px; border-left:4px solid var(--color-warning);">
                <strong>Rent-to-Income alert:</strong> Preferred Lekki rent budget consumes 38% of validated income flow.
              </div>
              <div style="padding:10px; background:#EFF6FF; border-radius:8px; border-left:4px solid var(--color-info);">
                <strong>Improvement Recommendation:</strong> Link a verified co-signer or guarantor to push score to 800+.
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // Profile Management Tab Renderer
  renderProfileTab(state) {
    const profile = state.profileData || {};

    return `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
        <div>
          <h2 class="section-header">Profile Management</h2>
          <p class="text-sm text-muted">Keep your renter credentials and guarantor references validated.</p>
        </div>
        <button class="btn btn-primary btn-sm" id="btn-save-profile">Save Changes</button>
      </div>

      <form id="profile-edit-form" style="display:flex; flex-direction:column; gap:24px;">
        
        <!-- Personal info -->
        <div class="card" style="padding:24px;">
          <h3 class="card-title" style="font-size:16px; margin-bottom:16px;">Personal Coordinates</h3>
          <div class="grid-cols-2">
            <div class="form-group">
              <label class="form-label">Full Legal Name</label>
              <input class="form-input" type="text" id="prof-name" value="${profile.personalInfo?.fullName || ''}">
            </div>
            <div class="form-group">
              <label class="form-label">Phone Number</label>
              <input class="form-input" type="tel" id="prof-phone" value="${profile.personalInfo?.phone || ''}">
            </div>
          </div>
          <div class="form-group" style="margin-top:16px;">
            <label class="form-label">Email Address</label>
            <input class="form-input" type="email" id="prof-email" value="${profile.personalInfo?.email || ''}">
          </div>
        </div>

        <!-- Employment & Income -->
        <div class="card" style="padding:24px;">
          <h3 class="card-title" style="font-size:16px; margin-bottom:16px;">Employment Coordinates</h3>
          <div class="grid-cols-2">
            <div class="form-group">
              <label class="form-label">Current Employer</label>
              <input class="form-input" type="text" id="prof-employer" value="${profile.employmentInfo?.employer || ''}">
            </div>
            <div class="form-group">
              <label class="form-label">Job Title</label>
              <input class="form-input" type="text" id="prof-job" value="${profile.employmentInfo?.jobTitle || ''}">
            </div>
          </div>
          <div class="form-group" style="margin-top:16px;">
            <label class="form-label">Monthly Income (₦)</label>
            <input class="form-input" type="number" id="prof-income" value="${profile.incomeInfo?.monthlyIncome || ''}">
          </div>
        </div>

        <!-- Rental History -->
        <div class="card" style="padding:24px;">
          <h3 class="card-title" style="font-size:16px; margin-bottom:16px;">Rental History Logs</h3>
          <div id="rental-history-rows" style="display:flex; flex-direction:column; gap:16px; margin-bottom:16px;">
            ${profile.rentalHistory && profile.rentalHistory.length > 0 ? profile.rentalHistory.map(h => `
              <div style="padding:12px; background:#FAF9F6; border-radius:8px; border:1px solid #E5E7EB; font-size:12px; display:flex; justify-content:space-between; align-items:center;">
                <div>
                  <strong>${h.property}</strong> &bull; Landlord: ${h.landlord}
                  <div style="color:#6B7280; margin-top:2px;">Duration: ${h.duration} &bull; Exit: ${h.exitReason}</div>
                </div>
                <button type="button" class="btn btn-outline btn-sm delete-history-btn" data-id="${h.id}" style="padding:4px 8px; font-size:10px; border-color:var(--color-error); color:var(--color-error);">Delete</button>
              </div>
            `).join('') : '<div class="text-caption text-muted">No rental history logged.</div>'}
          </div>

          <!-- Add rental history block -->
          <div style="background:#F9FAFB; padding:16px; border-radius:12px; border:1px dashed #D1CDCA; display:flex; flex-direction:column; gap:12px; margin-top:16px;">
            <div style="font-weight:bold; font-size:12px; color:var(--color-primary);">Add Tenancy Log</div>
            <div class="grid-cols-2">
              <input class="form-input" style="padding:8px 12px; font-size:12px;" type="text" id="add-rent-prop" placeholder="Property Address">
              <input class="form-input" style="padding:8px 12px; font-size:12px;" type="text" id="add-rent-landlord" placeholder="Landlord Name">
            </div>
            <div class="grid-cols-2">
              <input class="form-input" style="padding:8px 12px; font-size:12px;" type="text" id="add-rent-dur" placeholder="Duration (e.g. 2022-2024)">
              <input class="form-input" style="padding:8px 12px; font-size:12px;" type="text" id="add-rent-reason" placeholder="Reason for leaving">
            </div>
            <button type="button" class="btn btn-secondary btn-sm" id="btn-add-tenancy" style="align-self:flex-start; padding:6px 12px; font-size:11px;">Add Log</button>
          </div>
        </div>

        <!-- References -->
        <div class="card" style="padding:24px;">
          <h3 class="card-title" style="font-size:16px; margin-bottom:16px;">Renter Reference Contacts</h3>
          <div style="display:flex; flex-direction:column; gap:12px;">
            ${profile.references && profile.references.length > 0 ? profile.references.map(r => `
              <div style="padding:12px; background:#FAF9F6; border-radius:8px; border:1px solid #E5E7EB; font-size:12px; display:flex; justify-content:space-between;">
                <div>
                  <strong>${r.name}</strong> (${r.relation})
                  <div style="color:#6B7280; margin-top:2px;">Phone: ${r.contact}</div>
                </div>
                <span class="badge badge-approved" style="font-size:9px; height:18px;">Checked</span>
              </div>
            `).join('') : '<div class="text-caption text-muted">No reference contacts logged.</div>'}
          </div>
        </div>

      </form>
    `;
  },

  // Escrow & Activity Timeline Tab Renderer
  renderEscrowTimelineTab(state) {
    const esc = state.escrow || {};
    const timeline = state.timeline || [];

    return `
      <div style="margin-bottom:16px;">
        <h2 class="section-header">Escrow & Timeline Ledger</h2>
        <p class="text-sm text-muted">A verified record of rent caution deposits and application processes timelines.</p>
      </div>

      <!-- Escrow Banner -->
      <div class="escrow-amount-card">
        <div>
          <span class="kpi-label" style="color:rgba(255,255,255,0.7);">Total Funds Escrowed</span>
          <div style="font-size:36px; font-weight:bold; margin-top:4px;">
            ₦ ${(esc.totalSecured || 0).toLocaleString()}
          </div>
        </div>
        <button class="btn btn-secondary btn-sm" id="btn-escrow-deposit-timeline" style="border:1px solid rgba(255,255,255,0.2);">Simulate Escrow deposit</button>
      </div>

      <div style="display:grid; grid-template-columns: 1.8fr 1.2fr; gap:32px; align-items:start;">
        <!-- Timeline -->
        <div>
          <h3 class="card-title" style="font-size:16px; margin-bottom:20px;">Activity Timeline Logs</h3>
          <div class="timeline-box">
            ${timeline.map(node => `
              <div class="timeline-node ${node.status === 'Completed' ? 'completed' : ''}">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                    <span class="badge ${node.status === 'Completed' ? 'badge-approved' : 'badge-pending'}" style="font-size:10px;">${node.type}</span>
                    <span style="font-size:10px; color:#9CA3AF;">${node.date}</span>
                  </div>
                  <p style="font-size:12px; color:var(--color-primary); font-weight:var(--weight-semibold);">${node.text}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Escrow transaction history -->
        <div class="card" style="padding:20px;">
          <h3 class="card-title" style="font-size:15px; margin-bottom:16px;">Escrow Ledger Logs</h3>
          <div style="display:flex; flex-direction:column; gap:12px;">
            ${esc.history && esc.history.length > 0 ? esc.history.map(item => `
              <div style="border-bottom:1px solid #F3F4F6; padding-bottom:10px; font-size:11px;">
                <div style="display:flex; justify-content:space-between; font-weight:bold; color:var(--color-primary); margin-bottom:2px;">
                  <span>${item.type}</span>
                  <span>₦ ${item.amount.toLocaleString()}</span>
                </div>
                <div style="display:flex; justify-content:space-between; color:#6B7280; font-size:10px;">
                  <span>Ref: ${item.reference}</span>
                  <span>${item.date}</span>
                </div>
              </div>
            `).join('') : '<div class="text-caption text-muted">No transactions.</div>'}
          </div>
        </div>
      </div>
    `;
  },

  // Settings Tab Renderer
  renderSettingsTab(state) {
    const settings = state.settings || {};

    return `
      <div style="margin-bottom:16px;">
        <h2 class="section-header">Platform Settings</h2>
        <p class="text-sm text-muted">Customize privacy sharing, security authorizations, and alerts.</p>
      </div>

      <div style="display:flex; flex-direction:column; gap:24px;">
        
        <!-- Security -->
        <div class="card" style="padding:24px;">
          <h3 class="card-title" style="font-size:16px; margin-bottom:16px;">Security Preferences</h3>
          
          <div class="toggle-switch-container">
            <div>
              <div style="font-weight:bold; font-size:13px; color:var(--color-primary);">Enable Two-Factor Authentication (2FA)</div>
              <div style="font-size:11px; color:#6B7280;">Secure account logins with mobile SMS OTP matches.</div>
            </div>
            <label class="switch">
              <input type="checkbox" id="sett-2fa" ${settings.enable2FA ? 'checked' : ''}>
              <span class="slider"></span>
            </label>
          </div>

          <div style="margin-top:20px; border-top:1px solid #F3F4F6; padding-top:20px;">
            <div style="font-weight:bold; font-size:13px; color:var(--color-primary); margin-bottom:12px;">Change Password</div>
            <div class="grid-cols-2">
              <input class="form-input" style="padding:10px; font-size:12px;" type="password" placeholder="Current Password">
              <input class="form-input" style="padding:10px; font-size:12px;" type="password" placeholder="New Password">
            </div>
          </div>
        </div>

        <!-- Privacy controls -->
        <div class="card" style="padding:24px;">
          <h3 class="card-title" style="font-size:16px; margin-bottom:16px;">Privacy Controls</h3>
          
          <div class="toggle-switch-container">
            <div>
              <div style="font-weight:bold; font-size:13px; color:var(--color-primary);">Public Profile Visibility</div>
              <div style="font-size:11px; color:#6B7280;">Allow verified agents and landlords to search and view your score.</div>
            </div>
            <label class="switch">
              <input type="checkbox" id="sett-privacy" ${!settings.hideProfile ? 'checked' : ''}>
              <span class="slider"></span>
            </label>
          </div>
        </div>

        <!-- Communication preferences -->
        <div class="card" style="padding:24px;">
          <h3 class="card-title" style="font-size:16px; margin-bottom:16px;">Communication Alert Preferences</h3>
          
          <div class="toggle-switch-container">
            <div>
              <div style="font-weight:bold; font-size:13px; color:var(--color-primary);">Email updates channel</div>
              <div style="font-size:11px; color:#6B7280;">Receive transaction receipts and matching property listings.</div>
            </div>
            <label class="switch">
              <input type="checkbox" id="sett-comm-email" ${settings.commEmail ? 'checked' : ''}>
              <span class="slider"></span>
            </label>
          </div>

          <div class="toggle-switch-container">
            <div>
              <div style="font-weight:bold; font-size:13px; color:var(--color-primary);">SMS updates channel</div>
              <div style="font-size:11px; color:#6B7280;">Urgent alerts regarding escrow caution deposits and verification checks.</div>
            </div>
            <label class="switch">
              <input type="checkbox" id="sett-comm-sms" ${settings.commSMS ? 'checked' : ''}>
              <span class="slider"></span>
            </label>
          </div>
        </div>

        <button class="btn btn-primary" id="btn-save-settings" style="align-self:flex-start;">Save Platform Settings</button>
      </div>
    `;
  },

  init(state, navigateTo, updateState) {
    // 1. Sidebar Tab Clicks
    document.querySelectorAll('.dashboard-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        updateState({ activeDashboardTab: tab });
        navigateTo('dashboard');
      });
    });

    // Overview "View Score Details" button
    document.getElementById('goto-score-tab')?.addEventListener('click', () => {
      updateState({ activeDashboardTab: 'quality-score' });
      navigateTo('dashboard');
    });

    // 2. recommended properties "Apply Now" trigger
    document.querySelectorAll('.btn-apply-property').forEach(btn => {
      btn.addEventListener('click', () => {
        const propTitle = btn.getAttribute('data-title');
        const propLoc = btn.getAttribute('data-location');
        
        // Add to timeline
        const newTimeline = [
          {
            id: Date.now(),
            type: 'Application',
            text: `Submitted rental application for: ${propTitle} (${propLoc})`,
            date: new Date().toISOString().split('T')[0],
            status: 'Pending'
          },
          ...state.timeline
        ];

        // Add to notifications
        const newNotifications = [
          {
            id: Date.now(),
            type: 'application',
            text: `Application for ${propTitle} has been submitted. Check progress on timeline.`,
            time: 'Just now',
            read: false
          },
          ...state.notifications
        ];

        updateState({
          timeline: newTimeline,
          notifications: newNotifications
        });

        alert(`Application Submitted! \nYour credentials and Haven Tenant Quality Score (Grade A) have been securely sent to the landlord of "${propTitle}".`);
        navigateTo('dashboard');
      });
    });

    // 3. Deposit Modal Controls
    const depositModal = document.getElementById('escrow-deposit-modal');
    const openModalBtn = document.getElementById('btn-open-deposit-modal');
    const openModalBtnTimeline = document.getElementById('btn-escrow-deposit-timeline');
    const closeModalBtn = document.getElementById('close-deposit-modal');
    const depositForm = document.getElementById('escrow-deposit-form');

    const openModal = () => { if (depositModal) depositModal.style.display = 'flex'; };
    const closeModal = () => { if (depositModal) depositModal.style.display = 'none'; };

    openModalBtn?.addEventListener('click', openModal);
    openModalBtnTimeline?.addEventListener('click', openModal);
    closeModalBtn?.addEventListener('click', closeModal);
    
    depositModal?.addEventListener('click', (e) => {
      if (e.target === depositModal) closeModal();
    });

    depositForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const amountVal = parseInt(document.getElementById('deposit-amount').value);
      const typeVal = document.getElementById('deposit-type').value;

      if (isNaN(amountVal) || amountVal <= 0) {
        alert("Please enter a valid deposit amount.");
        return;
      }

      // Add to escrow balances
      const totalSecured = (state.escrow?.totalSecured || 0) + amountVal;
      let caution = state.escrow?.cautionDeposit || 0;
      let advance = state.escrow?.advanceRent || 0;

      if (typeVal === 'Caution Deposit') caution += amountVal;
      else advance += amountVal;

      const newHistory = [
        {
          id: Date.now(),
          type: typeVal,
          amount: amountVal,
          reference: `ESC-${Math.floor(1000 + Math.random()*9000)}-LA`,
          status: 'Secured',
          date: new Date().toISOString().split('T')[0]
        },
        ...(state.escrow?.history || [])
      ];

      const newTimeline = [
        {
          id: Date.now(),
          type: 'Payment',
          text: `Escrow deposit of ₦${amountVal.toLocaleString()} for ${typeVal} confirmed.`,
          date: new Date().toISOString().split('T')[0],
          status: 'Completed'
        },
        ...state.timeline
      ];

      const newNotifications = [
        {
          id: Date.now(),
          type: 'escrow',
          text: `Payment Alert: ₦${amountVal.toLocaleString()} received and secured in escrow.`,
          time: 'Just now',
          read: false
        },
        ...state.notifications
      ];

      updateState({
        escrow: {
          cautionDeposit: caution,
          advanceRent: advance,
          totalSecured: totalSecured,
          history: newHistory
        },
        timeline: newTimeline,
        notifications: newNotifications
      });

      closeModal();
      alert(`Simulation Success: ₦${amountVal.toLocaleString()} deposited and secured under CBN compliance guidelines.`);
      navigateTo('dashboard');
    });

    // 4. Settings tab alerts
    document.getElementById('btn-save-settings')?.addEventListener('click', () => {
      const is2FA = document.getElementById('sett-2fa')?.checked;
      const isHidden = !document.getElementById('sett-privacy')?.checked;
      const email = document.getElementById('sett-comm-email')?.checked;
      const sms = document.getElementById('sett-comm-sms')?.checked;

      updateState({
        settings: {
          enable2FA: is2FA,
          hideProfile: isHidden,
          commEmail: email,
          commSMS: sms,
          commInApp: true
        }
      });
      alert("Platform Settings Saved Successfully!");
    });

    // 5. Profile Tab addition logic
    document.getElementById('btn-add-tenancy')?.addEventListener('click', () => {
      const address = document.getElementById('add-rent-prop').value.trim();
      const landlord = document.getElementById('add-rent-landlord').value.trim();
      const duration = document.getElementById('add-rent-dur').value.trim();
      const reason = document.getElementById('add-rent-reason').value.trim();

      if (!address || !landlord || !duration) {
        alert("Please complete address, landlord name, and lease duration.");
        return;
      }

      const updatedHistory = [
        ...state.profileData.rentalHistory,
        { id: Date.now(), landlord, property: address, duration, exitReason: reason || 'N/A' }
      ];

      updateState({
        profileData: {
          ...state.profileData,
          rentalHistory: updatedHistory
        }
      });

      alert("Rental history log appended. Review and save changes next.");
      navigateTo('dashboard');
    });

    // Delete tenancy log
    document.querySelectorAll('.delete-history-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const id = parseInt(btn.getAttribute('data-id'));
        const filtered = state.profileData.rentalHistory.filter(h => h.id !== id);
        updateState({
          profileData: {
            ...state.profileData,
            rentalHistory: filtered
          }
        });
        navigateTo('dashboard');
      });
    });

    // Save profile changes
    document.getElementById('btn-save-profile')?.addEventListener('click', () => {
      const name = document.getElementById('prof-name').value;
      const phone = document.getElementById('prof-phone').value;
      const email = document.getElementById('prof-email').value;
      const employer = document.getElementById('prof-employer').value;
      const job = document.getElementById('prof-job').value;
      const income = document.getElementById('prof-income').value;

      updateState({
        profileData: {
          ...state.profileData,
          personalInfo: {
            ...state.profileData.personalInfo,
            fullName: name,
            phone: phone,
            email: email
          },
          employmentInfo: {
            ...state.profileData.employmentInfo,
            employer: employer,
            jobTitle: job
          },
          incomeInfo: {
            ...state.profileData.incomeInfo,
            monthlyIncome: income
          }
        }
      });
      alert("Tenant Profile updated and saved successfully!");
    });
  }
};
