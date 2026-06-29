// Operations and Administration Console Screen Component (Milestone 8)
export const AdminConsole = {
  render(state) {
    // Safety check & initialization of admin states if not present
    this.initializeState(state);

    const activeTab = state.activeAdminTab || 'overview';
    const pendingVerificationsCount = state.adminVerifications.filter(v => v.status === 'Pending Review').length;
    const activeDisputesCount = state.adminDisputes.filter(d => d.status === 'Active Dispute' || d.status === 'Awaiting Response').length;
    const activeFraudCount = state.adminFraudAlerts.filter(a => a.status === 'Active Warning').length;

    return `
      <div class="partner-wrapper">
        <!-- Header Section -->
        <div class="partner-header" style="border-bottom-color: rgba(239, 68, 68, 0.15);">
          <div>
            <h1 class="page-title" style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
              Operations Command Center
              <span class="landlord-role-badge" style="background-color: var(--color-error-bg); color: var(--color-error);">PLATFORM OPERATOR</span>
            </h1>
            <p class="text-muted" style="margin-top: 4px;">Monitor global CBN-escrow pools, audit identity verifications, resolve caution disputes, and configure system rules.</p>
          </div>
          <div style="display: flex; align-items: center; gap: 16px;">
            <div style="text-align: right;" class="hidden-mobile">
              <div style="font-weight: var(--weight-bold); color: var(--color-primary);">${state.user ? state.user.username : 'admin.ops@haven.ng'}</div>
              <div style="font-size: 11px; color: var(--color-error); font-weight: var(--weight-bold); display:flex; align-items:center; gap:4px;">
                <span class="pulsing-dot-red"></span> Systems Live (AML Guard Active)
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Tabs -->
        <div class="partner-tabs" style="border-color: rgba(13,27,75,0.08);">
          <button class="partner-tab ${activeTab === 'overview' ? 'active' : ''}" data-tab="overview" style="color: var(--color-primary);">
            Overview & KPIs
          </button>
          <button class="partner-tab ${activeTab === 'verifications' ? 'active' : ''}" data-tab="verifications" style="color: var(--color-primary);">
            Verification Queue ${pendingVerificationsCount > 0 ? `<span style="background-color: var(--color-warning); color: var(--color-primary); padding: 2px 6px; border-radius: var(--radius-full); font-size: 10px; margin-left: 6px; font-weight: bold;">${pendingVerificationsCount}</span>` : ''}
          </button>
          <button class="partner-tab ${activeTab === 'disputes' ? 'active' : ''}" data-tab="disputes" style="color: var(--color-primary);">
            Disputes & Escrows ${activeDisputesCount > 0 ? `<span style="background-color: var(--color-error); color: white; padding: 2px 6px; border-radius: var(--radius-full); font-size: 10px; margin-left: 6px; font-weight: bold;">${activeDisputesCount}</span>` : ''}
          </button>
          <button class="partner-tab ${activeTab === 'fraud' ? 'active' : ''}" data-tab="fraud" style="color: var(--color-primary);">
            Fraud Alerts ${activeFraudCount > 0 ? `<span style="background-color: var(--color-error); color: white; padding: 2px 6px; border-radius: var(--radius-full); font-size: 10px; margin-left: 6px; font-weight: bold; animation: dotPulse 1s infinite alternate;">${activeFraudCount}</span>` : ''}
          </button>
          <button class="partner-tab ${activeTab === 'config' ? 'active' : ''}" data-tab="config" style="color: var(--color-primary);">
            System Config & Audits
          </button>
        </div>

        <!-- Tab Panel Content -->
        <div class="tab-panel">
          ${this.renderTabContent(state, activeTab)}
        </div>
      </div>
    `;
  },

  renderTabContent(state, tab) {
    switch (tab) {
      case 'overview':
        return this.renderOverviewTab(state);
      case 'verifications':
        return this.renderVerificationsTab(state);
      case 'disputes':
        return this.renderDisputesTab(state);
      case 'fraud':
        return this.renderFraudTab(state);
      case 'config':
        return this.renderConfigTab(state);
      default:
        return `<div>Tab panel not found.</div>`;
    }
  },

  renderOverviewTab(state) {
    const formatNaira = (val) => '₦' + val.toLocaleString('en-US');

    // Stats calculations
    const totalUsers = 420;
    const escrowVolume = 48500000;
    const conversionsRate = 84;
    const activeEscrows = state.partnerEscrows ? state.partnerEscrows.length : 2;

    return `
      <!-- Stats Row -->
      <div class="admin-kpi-grid">
        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">Total Active Users</span>
            <span style="font-size: 18px; color: var(--color-secondary);">👥</span>
          </div>
          <div class="stat-value">${totalUsers}</div>
          <div class="stat-meta">
            <span class="stat-trend up">↑ 12.4%</span>
            <span>growth this month</span>
          </div>
        </div>

        <div class="stat-card revenue">
          <div class="stat-header">
            <span class="stat-title">CBN Escrow Pool</span>
            <span style="font-size: 18px; color: var(--color-success);">🔒</span>
          </div>
          <div class="stat-value" style="font-size:24px; padding-top:4px;">${formatNaira(escrowVolume)}</div>
          <div class="stat-meta">
            <span>${activeEscrows} active safety vaults</span>
          </div>
        </div>

        <div class="stat-card vacancy">
          <div class="stat-header">
            <span class="stat-title">System Fee Revenue</span>
            <span style="font-size: 18px; color: var(--color-warning);">₦</span>
          </div>
          <div class="stat-value">${formatNaira(Math.round(escrowVolume * (state.systemConfig.escrowFeePercent / 100)))}</div>
          <div class="stat-meta">
            <span>At ${state.systemConfig.escrowFeePercent}% platform fee</span>
          </div>
        </div>

        <div class="stat-card pipeline">
          <div class="stat-header">
            <span class="stat-title">Platform Match Rate</span>
            <span style="font-size: 18px; color: var(--color-info);">🎯</span>
          </div>
          <div class="stat-value">${conversionsRate}%</div>
          <div class="stat-meta">
            <span>Verification matches conversion</span>
          </div>
        </div>
      </div>

      <!-- Analytics Chart Section -->
      <div class="partner-chart-card">
        <h3 class="card-title" style="font-size:16px; color:var(--color-primary); margin-bottom:8px;">Platform Conversion Ratios</h3>
        <p class="text-sm text-muted" style="margin-bottom:20px;">Percentage of users successfully clearing NIMC/BVN verification logs MoM.</p>
        
        <div class="chart-container-svg" style="height:150px;">
          <svg width="100%" height="100%" viewBox="0 0 600 150" preserveAspectRatio="none">
            <line x1="20" y1="20" x2="580" y2="20" stroke="#F3F4F6" stroke-dasharray="4,4" />
            <line x1="20" y1="75" x2="580" y2="75" stroke="#F3F4F6" stroke-dasharray="4,4" />
            <line x1="20" y1="130" x2="580" y2="130" stroke="#FAF9F6" stroke-width="2" />
            
            <path d="M 40,110 L 140,90 L 240,60 L 340,40 L 440,30 L 540,25" class="partner-svg-line" style="stroke: var(--color-success);" />
            
            <circle cx="40" cy="110" r="4" class="partner-svg-dot" />
            <circle cx="140" cy="90" r="4" class="partner-svg-dot" />
            <circle cx="240" cy="60" r="4" class="partner-svg-dot" />
            <circle cx="340" cy="40" r="4" class="partner-svg-dot" />
            <circle cx="440" cy="30" r="4" class="partner-svg-dot" />
            <circle cx="540" cy="25" r="4" class="partner-svg-dot" />

            <text x="40" y="145" fill="#9CA3AF" font-size="9" text-anchor="middle">Jan</text>
            <text x="140" y="145" fill="#9CA3AF" font-size="9" text-anchor="middle">Feb</text>
            <text x="240" y="145" fill="#9CA3AF" font-size="9" text-anchor="middle">Mar</text>
            <text x="340" y="145" fill="#9CA3AF" font-size="9" text-anchor="middle">Apr</text>
            <text x="440" y="145" fill="#9CA3AF" font-size="9" text-anchor="middle">May</text>
            <text x="540" y="145" fill="#9CA3AF" font-size="9" text-anchor="middle">Jun</text>
          </svg>
        </div>
      </div>
    `;
  },

  renderVerificationsTab(state) {
    const activeVerId = state.activeAdminVerificationId || (state.adminVerifications[0]?.id || null);
    const selectedVer = state.adminVerifications.find(v => v.id === activeVerId);

    return `
      <div class="two-panel-layout">
        <!-- Left Panel: Requests Queue -->
        <div class="sidebar-panel">
          <h3 class="card-title" style="font-size: 16px; color: var(--color-primary); margin-bottom: 16px;">Identity Audit Requests</h3>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            ${state.adminVerifications.map(ver => {
              const isActive = ver.id === activeVerId;
              const typeBadge = ver.type === 'BVN' ? 'badge-info' : ver.type === 'NIN' ? 'badge-success' : 'badge-warning';

              return `
                <div class="applicant-card ${isActive ? 'active' : ''}" data-id="${ver.id}">
                  <div class="applicant-header">
                    <div>
                      <div class="applicant-name" style="font-size:14px;">${ver.userName}</div>
                      <div class="text-sm text-muted" style="margin-top: 2px;">Role: ${ver.userRole}</div>
                    </div>
                    <span class="badge ${typeBadge}" style="font-size:9px; padding:2px 8px;">${ver.type}</span>
                  </div>
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px; font-size:11px;">
                    <span style="color:#9CA3AF;">Status</span>
                    <strong style="color:${ver.status === 'Pending Review' ? 'var(--color-warning)' : 'var(--color-success)'};">${ver.status}</strong>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Right Panel: Data Comparisons & Actions -->
        <div class="main-content-panel">
          ${selectedVer ? `
            <div style="border-bottom: 1px solid rgba(13,27,75,0.06); padding-bottom: 16px; margin-bottom: 20px;">
              <h2 class="card-title" style="color: var(--color-primary);">${selectedVer.userName}</h2>
              <p class="text-sm text-muted">Auditing verification credential: <strong>${selectedVer.type}</strong></p>
            </div>

            <!-- Comparison details grid -->
            <h3 class="text-md" style="font-weight: var(--weight-bold); color: var(--color-primary); margin-bottom: 12px;">Data Integrity Crosscheck</h3>
            
            <div class="verify-split-container">
              <!-- Provided Details -->
              <div class="verify-data-card">
                <h4 style="font-size:12px; margin-bottom:12px; color:var(--color-secondary);">User Input Details</h4>
                <div class="verify-data-row">
                  <span class="verify-data-label">FullName</span>
                  <span class="verify-data-value">${selectedVer.providedDetails.fullName}</span>
                </div>
                <div class="verify-data-row">
                  <span class="verify-data-label">DOB</span>
                  <span class="verify-data-value">${selectedVer.providedDetails.dob}</span>
                </div>
                <div class="verify-data-row">
                  <span class="verify-data-label">Credential Number</span>
                  <span class="verify-data-value">${selectedVer.providedDetails.number}</span>
                </div>
              </div>

              <!-- Government registry records -->
              <div class="verify-data-card">
                <h4 style="font-size:12px; margin-bottom:12px; color:var(--color-primary);">Government Registry Records</h4>
                <div class="verify-data-row">
                  <span class="verify-data-label">NIMC/NIBSS Name</span>
                  <span class="verify-data-value ${selectedVer.providedDetails.fullName === selectedVer.registryDetails.fullName ? 'match' : 'mismatch'}">${selectedVer.registryDetails.fullName}</span>
                </div>
                <div class="verify-data-row">
                  <span class="verify-data-label">NIMC/NIBSS DOB</span>
                  <span class="verify-data-value ${selectedVer.providedDetails.dob === selectedVer.registryDetails.dob ? 'match' : 'mismatch'}">${selectedVer.registryDetails.dob}</span>
                </div>
                <div class="verify-data-row">
                  <span class="verify-data-label">Biometric Verification</span>
                  <span class="verify-data-value match">${selectedVer.registryDetails.biometricMatch}</span>
                </div>
              </div>
            </div>

            ${selectedVer.type === 'Document' ? `
              <div class="verify-data-card" style="margin-bottom:20px; background:#FAF9F6;">
                <h4 style="font-size:12px; margin-bottom:6px; color:var(--color-primary);">Uploaded Document Preview</h4>
                <div style="border:1px solid #D1D5DB; background:white; padding:12px; text-align:center; font-size:12px; border-radius:4px; font-weight:bold; color:var(--color-secondary);">
                  📄 ${selectedVer.providedDetails.documentName} (1.2 MB)
                </div>
              </div>
            ` : ''}

            <!-- Verdict & Decision -->
            <div style="border-top:1px solid rgba(13,27,75,0.06); padding-top:20px;">
              <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
                <div>
                  <div style="font-size:11px; text-transform:uppercase; color:#9CA3AF;">System Underwriting Verdict</div>
                  <strong style="font-size:14px; color:${selectedVer.underwritingVerdict.includes('Match') ? 'var(--color-success)' : 'var(--color-error)'};">${selectedVer.underwritingVerdict}</strong>
                </div>
                
                <div style="display:flex; gap:12px;">
                  ${selectedVer.status === 'Pending Review' ? `
                    <button class="btn btn-outline btn-sm btn-admin-reject-ver" data-id="${selectedVer.id}" style="border-color:var(--color-error); color:var(--color-error);">Reject Verification</button>
                    <button class="btn btn-primary btn-sm btn-admin-approve-ver" data-id="${selectedVer.id}">Approve Identity</button>
                  ` : `
                    <span class="badge ${selectedVer.status === 'Approved' ? 'badge-success' : 'badge-error'}" style="padding:10px 20px;">
                      ${selectedVer.status}
                    </span>
                  `}
                </div>
              </div>
            </div>
          ` : `
            <div style="text-align: center; padding: 80px 24px; color: #9CA3AF;">
              <h3>No verification requests pending review.</h3>
            </div>
          `}
        </div>
      </div>
    `;
  },

  renderDisputesTab(state) {
    const formatNaira = (val) => '₦' + val.toLocaleString('en-US');

    return `
      <!-- Global Escrow Balances monitoring -->
      <h3 class="card-title" style="font-size: 16px; color: var(--color-primary); margin-bottom: 12px;">Global CBN Trust Pools</h3>
      <div class="table-card" style="margin-bottom: 32px;">
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>Protected Vault Reference</th>
                <th>Guarantee Co-Signer</th>
                <th>Caution Amount</th>
                <th>Rent Advance Locked</th>
                <th>Lifecycle Status</th>
              </tr>
            </thead>
            <tbody>
              ${state.partnerEscrows.map(esc => `
                <tr>
                  <td style="font-weight:var(--weight-semibold); color:var(--color-primary);">${esc.title}</td>
                  <td><span class="badge badge-info">${esc.coSigner}</span></td>
                  <td style="font-weight:var(--weight-bold);">${formatNaira(esc.cautionAmount)}</td>
                  <td style="font-weight:var(--weight-bold);">${formatNaira(esc.rentAmount)}</td>
                  <td>
                    <span class="badge ${esc.status === 'Funded' ? 'badge-info' : esc.status === 'Released' ? 'badge-success' : 'badge-warning'}">
                      ${esc.status}
                    </span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Disputes Resolution center -->
      <h3 class="card-title" style="font-size: 16px; color: var(--color-error); margin-bottom: 12px;">Disputes Arbitration desk</h3>
      <div class="table-card">
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>Dispute Case Reference</th>
                <th>Tenant Statement</th>
                <th>Landlord Response</th>
                <th>Caution fee</th>
                <th>Arbitration Split (Tenant / Landlord)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${state.adminDisputes.map(disp => {
                const totalCaution = disp.cautionAmount;
                const percentTenant = state[`disputeSplitTenant_${disp.id}`] !== undefined ? state[`disputeSplitTenant_${disp.id}`] : 50;
                const percentLandlord = 100 - percentTenant;

                return `
                  <tr>
                    <td style="font-weight:var(--weight-semibold); color:var(--color-primary);">
                      ${disp.propertyName}
                      <div style="font-size:10px; color:#6B7280; margin-top:2px;">Case: <strong>${disp.tenantName}</strong></div>
                    </td>
                    <td style="font-size:11px; max-width:180px;">${disp.reason}</td>
                    <td style="font-size:11px; max-width:180px; color:var(--color-secondary);">${disp.landlordDefense || '<em>No response filed yet</em>'}</td>
                    <td style="font-weight:var(--weight-bold);">${formatNaira(totalCaution)}</td>
                    <td>
                      ${disp.status !== 'Resolved' ? `
                        <div style="display:flex; align-items:center; gap:8px;">
                          <input type="number" class="form-control-landlord input-split-tenant" data-id="${disp.id}" value="${percentTenant}" min="0" max="100" style="padding:6px; font-size:11px; text-align:center; width:50px;">
                          <span style="font-size:10px; color:#9ca3af;">/</span>
                          <input type="number" class="form-control-landlord input-split-landlord" data-id="${disp.id}" value="${percentLandlord}" disabled style="padding:6px; font-size:11px; text-align:center; width:50px; background:#FAF9F6;">
                        </div>
                        <div style="font-size:9px; color:#9CA3AF; margin-top:4px;">Split: ${formatNaira(Math.round(totalCaution * percentTenant/100))} / ${formatNaira(Math.round(totalCaution * percentLandlord/100))}</div>
                      ` : `
                        <span class="badge badge-success">${disp.resolvedSplit.tenant}% / ${disp.resolvedSplit.landlord}% Split</span>
                      `}
                    </td>
                    <td>
                      ${disp.status !== 'Resolved' ? `
                        <button class="btn btn-secondary btn-sm btn-arbitrate-dispute" data-id="${disp.id}">Arbitrate Release</button>
                      ` : `
                        <span class="badge badge-success">Closed Case</span>
                      `}
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  renderFraudTab(state) {
    return `
      <h3 class="card-title" style="font-size: 16px; color: var(--color-error); margin-bottom: 8px;">Suspicious Risk Signals</h3>
      <p class="text-sm text-muted" style="margin-bottom: 20px;">AML monitoring modules scanning large bank deposits, BVN registries mismatch, and concurrent IP login events.</p>

      <div style="display:grid; grid-template-columns: 2fr 1fr; gap:24px;">
        <!-- Left: alerts list -->
        <div style="display:flex; flex-direction:column; gap:16px;">
          ${state.adminFraudAlerts.map(alert => {
            const isWarning = alert.status === 'Active Warning';

            return `
              <div class="table-card ${isWarning ? 'fraud-card-alert' : ''}" style="padding:20px; margin-bottom:0;">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
                  <div>
                    <strong style="color:var(--color-primary); font-size:15px; display:flex; align-items:center; gap:6px;">
                      ${isWarning ? '<span class="pulsing-dot-red"></span>' : ''} ${alert.title}
                    </strong>
                    <div style="font-size:11px; color:#6B7280; margin-top:2px;">User: <strong>${alert.user}</strong> | Reference: <code>${alert.reference}</code></div>
                  </div>
                  <span class="badge ${alert.riskLevel === 'High' ? 'badge-error' : 'badge-warning'}">${alert.riskLevel} Risk</span>
                </div>
                
                <div style="font-size:13px; color:var(--color-black); margin-bottom:16px; background:#FAF9F6; padding:10px; border-radius:4px; border:1px solid rgba(0,0,0,0.03);">
                  <strong>Indicators:</strong> ${alert.indicators}
                </div>

                <div style="display:flex; gap:12px; justify-content:flex-end;">
                  ${isWarning ? `
                    <button class="btn btn-outline btn-sm btn-dismiss-alert" data-id="${alert.id}" style="border-color:#D1D5DB; color:#6B7280;">Dismiss Alert</button>
                    <button class="btn btn-outline btn-sm btn-freeze-account" data-id="${alert.id}" style="border-color:var(--color-error); color:var(--color-error);">Freeze Account</button>
                    <button class="btn btn-secondary btn-sm btn-investigate-alert" data-id="${alert.id}">AML Hold</button>
                  ` : `
                    <span class="badge ${alert.status === 'Dismissed' ? 'badge-success' : 'badge-error'}" style="padding:6px 12px;">
                      Status: ${alert.status}
                    </span>
                  `}
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Right: investigation settings & guides -->
        <div class="main-content-panel" style="align-self:start;">
          <h4 style="font-size:14px; margin-bottom:12px; color:var(--color-primary);">Operator Risk Manual</h4>
          <div style="font-size:12px; line-height:1.5; color:#4B5563;">
            <p style="margin-bottom:8px;">According to CBN AML guidelines:</p>
            <ol style="margin-left:16px; margin-bottom:16px;">
              <li>Verify BVN numbers align matching government database records.</li>
              <li>Escrow locks above ₦5,000,000 trigger structural validation logs.</li>
              <li>Arbitration splits must be co-funded within 24 hours of dispute settlements.</li>
            </ol>
            <div style="background:#FAF9F6; padding:10px; border-radius:4px; border:1px solid rgba(13,27,75,0.04); font-size:11px;">
              🔒 AML Security clearance rate is currently operating at <strong>99.8% compliance efficiency</strong>.
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderConfigTab(state) {
    return `
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:24px;">
        <!-- Left: configs -->
        <div class="config-setting-card" style="margin-bottom:0;">
          <h3 class="card-title" style="font-size:16px; color:var(--color-primary); margin-bottom:20px;">Platform System Configurations</h3>
          
          <div class="form-group-landlord">
            <label for="config-escrow-fee" style="display:flex; justify-content:space-between;">
              <span>Escrow Service Fee (%)</span>
              <strong id="label-fee-percent" style="color:var(--color-secondary);">${state.systemConfig.escrowFeePercent}%</strong>
            </label>
            <input type="range" id="config-escrow-fee" min="0.5" max="5.0" step="0.1" value="${state.systemConfig.escrowFeePercent}" class="form-control-landlord" style="padding:0; margin-top:8px;">
          </div>

          <div style="margin-top:24px; border-top:1px solid #FAF9F6; padding-top:20px; display:flex; flex-direction:column; gap:16px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div>
                <strong style="font-size:13px; color:var(--color-primary); display:block;">Enforce 2FA Toggles</strong>
                <span style="font-size:11px; color:#9CA3AF;">Require biometric pin logins for all escrow withdraw actions.</span>
              </div>
              <label class="toggle-switch-slider">
                <input type="checkbox" id="config-toggle-2fa" ${state.systemConfig.enforce2FA ? 'checked' : ''}>
                <span class="slider-switch-element"></span>
              </label>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; border-top: 1px solid #FAF9F6; padding-top:16px;">
              <div>
                <strong style="font-size:13px; color:var(--color-primary); display:block;">AML Verification Sandbox</strong>
                <span style="font-size:11px; color:#9CA3AF;">Simulate live government registry checks.</span>
              </div>
              <label class="toggle-switch-slider">
                <input type="checkbox" id="config-toggle-sandbox" ${state.systemConfig.sandboxMode ? 'checked' : ''}>
                <span class="slider-switch-element"></span>
              </label>
            </div>
          </div>
          
          <button class="btn btn-primary btn-sm" id="btn-save-system-config" style="width:100%; margin-top:28px;">Save Configurations</button>
        </div>

        <!-- Right: Audits matrix logger console -->
        <div class="config-setting-card" style="margin-bottom:0; display:flex; flex-direction:column;">
          <h3 class="card-title" style="font-size:16px; color:var(--color-primary); margin-bottom:8px;">Real-time Audit Logs</h3>
          <p class="text-sm text-muted" style="margin-bottom:20px;">Operator activities log streams.</p>
          
          <div class="audit-logs-console" id="admin-audit-logs-container" style="flex:1;">
            ${state.adminAuditLogs.map(log => `
              <div class="audit-log-line">
                <span class="audit-log-time">[${log.time}]</span>
                <span>${log.text}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  initializeState(state) {
    if (!state.activeAdminTab) state.activeAdminTab = 'overview';

    // 1. Identity verifications queue
    if (!state.adminVerifications) {
      state.adminVerifications = [
        {
          id: 1,
          userName: 'Osaze Alao',
          userRole: 'Tenant',
          type: 'BVN',
          status: 'Pending Review',
          providedDetails: {
            fullName: 'Osaze Alao',
            dob: '1998-05-12',
            number: '22289081702'
          },
          registryDetails: {
            fullName: 'Osaze Alao',
            dob: '1998-05-12',
            biometricMatch: '98% match (liveness approved)'
          },
          underwritingVerdict: 'Verified Identity Match'
        },
        {
          id: 2,
          userName: 'Tunde Bakare',
          userRole: 'Tenant',
          type: 'NIN',
          status: 'Pending Review',
          providedDetails: {
            fullName: 'Tunde Bakare',
            dob: '1992-04-18',
            number: '81092801928'
          },
          registryDetails: {
            fullName: 'Tunde Adegoke Bakare',
            dob: '1991-04-18',
            biometricMatch: 'Failed (Biometric mismatch alert)'
          },
          underwritingVerdict: 'Verification Mismatch Warning'
        },
        {
          id: 3,
          userName: 'Kunle Benson',
          userRole: 'Landlord',
          type: 'Document',
          status: 'Pending Review',
          providedDetails: {
            fullName: 'Kunle Benson',
            dob: '1980-11-22',
            number: 'Land Deed #8102',
            documentName: 'C-of-O_LekkiProperty.pdf'
          },
          registryDetails: {
            fullName: 'Kunle Benson',
            dob: '1980-11-22',
            biometricMatch: 'Not Applicable'
          },
          underwritingVerdict: 'Manual Document Audit Required'
        }
      ];
    }

    // 2. Admin disputes arbitration
    if (!state.adminDisputes) {
      state.adminDisputes = [
        {
          id: 1,
          propertyName: 'Cozy 1 Bedroom Studio Loft (Caution hold)',
          tenantName: 'Kunle Benson',
          cautionAmount: 200000,
          reason: 'Tenant claims water damage on floorboards was pre-existing. Landlord claims caution deductible required to repaint damaged drywall.',
          landlordDefense: 'Submitted drywall utility invoice of N180,000 for paint work.',
          status: 'Awaiting Response'
        }
      ];
    }

    // 3. Platform suspicious fraud alerts
    if (!state.adminFraudAlerts) {
      state.adminFraudAlerts = [
        {
          id: 1,
          title: 'Suspicious Concurrent Logins',
          user: 'osaze.alao@domain.com',
          reference: 'ALERT-908',
          riskLevel: 'Medium',
          indicators: 'IP login logs indicate concurrent sessions from Yaba, Lagos and London, UK within 10 minutes.',
          status: 'Active Warning'
        },
        {
          id: 2,
          title: 'Large Escrow Deposit Hold',
          user: 'unilag.housing@unilag.edu.ng',
          reference: 'ALERT-851',
          riskLevel: 'High',
          indicators: 'Escrow caution guarantee pool transfer exceeds N5,000,000 threshold limit check.',
          status: 'Active Warning'
        }
      ];
    }

    // 4. Scrolling system audits logs
    if (!state.adminAuditLogs) {
      state.adminAuditLogs = [
        { time: '14:52:10', text: '[SYS] AML validation scanner running live.' },
        { time: '14:51:05', text: '[OPR-92] Checked security vaults clearance thresholds.' },
        { time: '14:48:00', text: '[SYS] CBN Escrow bank trust reconciliation completed.' }
      ];
    }

    // 5. System configuration defaults
    if (!state.systemConfig) {
      state.systemConfig = {
        escrowFeePercent: 1.5,
        enforce2FA: true,
        sandboxMode: false
      };
    }
  },

  init(state, navigateTo, updateState) {
    // Bind Tab Switching
    document.querySelectorAll('.partner-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const selectedTab = e.currentTarget.getAttribute('data-tab');
        updateState({ activeAdminTab: selectedTab });
        navigateTo('admin');
      });
    });

    // Helper to log administrative operations
    const logActivity = (text) => {
      const date = new Date();
      const timeStr = date.toTimeString().split(' ')[0];
      state.adminAuditLogs.unshift({ time: timeStr, text: `[OPR] ${text}` });
    };

    // ----------------------------------------------------
    // TAB: VERIFICATION QUEUE BINDINGS
    // ----------------------------------------------------
    document.querySelectorAll('.applicant-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        updateState({ activeAdminVerificationId: id });
        navigateTo('admin');
      });
    });

    // Approve Verification
    document.querySelector('.btn-admin-approve-ver')?.addEventListener('click', (e) => {
      const id = parseInt(e.currentTarget.getAttribute('data-id'));
      const ver = state.adminVerifications.find(v => v.id === id);

      if (ver) {
        const updated = state.adminVerifications.map(v => {
          if (v.id === id) return { ...v, status: 'Approved' };
          return v;
        });

        logActivity(`Approved ${ver.type} credentials check for ${ver.userName}`);
        
        // Add push notification
        state.notifications.unshift({
          id: Date.now(),
          type: 'verification',
          text: `Verification Approved: Your platform ${ver.type} verification was approved by operations audit.`,
          time: 'Just now',
          read: false
        });

        // Set global verification statuses
        if (ver.userName === 'Osaze Alao') {
          if (ver.type === 'BVN') state.verification.bvnStatus = 'approved';
          if (ver.type === 'NIN') state.verification.ninStatus = 'approved';
        }

        updateState({ adminVerifications: updated });
        alert(`Verification approved for ${ver.userName}. Status synced to database.`);
        navigateTo('admin');
      }
    });

    // Reject Verification
    document.querySelector('.btn-admin-reject-ver')?.addEventListener('click', (e) => {
      const id = parseInt(e.currentTarget.getAttribute('data-id'));
      const ver = state.adminVerifications.find(v => v.id === id);

      if (ver) {
        if (confirm(`Reject verification check for ${ver.userName}?`)) {
          const updated = state.adminVerifications.map(v => {
            if (v.id === id) return { ...v, status: 'Rejected' };
            return v;
          });

          logActivity(`Rejected ${ver.type} credentials for ${ver.userName} (Underwriting Mismatch)`);

          // Add notification
          state.notifications.unshift({
            id: Date.now(),
            type: 'verification',
            text: `Verification Flagged: Platform ${ver.type} verification failed security crosschecks.`,
            time: 'Just now',
            read: false
          });

          updateState({ adminVerifications: updated });
          alert("Verification declined. Identity status flagged.");
          navigateTo('admin');
        }
      }
    });

    // ----------------------------------------------------
    // TAB: DISPUTES MEDIATION SPLITS BINDINGS
    // ----------------------------------------------------
    // Update live splits
    document.querySelectorAll('.input-split-tenant').forEach(input => {
      input.addEventListener('input', (e) => {
        const id = parseInt(e.target.getAttribute('data-id'));
        const valTenant = parseInt(e.target.value) || 0;
        const valLandlord = Math.max(0, 100 - valTenant);
        
        // Temporarily store inside state
        state[`disputeSplitTenant_${id}`] = valTenant;

        // Find companion landlord field and update value
        const row = e.target.closest('tr');
        const inputLandlord = row.querySelector('.input-split-landlord');
        if (inputLandlord) {
          inputLandlord.value = valLandlord;
        }

        // Render preview sums in row
        const valLabel = row.querySelector('div[style*="font-size:9px"]');
        const disp = state.adminDisputes.find(d => d.id === id);
        if (valLabel && disp) {
          const formatN = (v) => '₦' + v.toLocaleString('en-US');
          valLabel.innerHTML = `Split: ${formatN(Math.round(disp.cautionAmount * valTenant/100))} / ${formatN(Math.round(disp.cautionAmount * valLandlord/100))}`;
        }
      });
    });

    // Resolve split payout release
    document.querySelectorAll('.btn-arbitrate-dispute').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        const disp = state.adminDisputes.find(d => d.id === id);

        if (disp) {
          const tenantSplitPercent = state[`disputeSplitTenant_${id}`] !== undefined ? state[`disputeSplitTenant_${id}`] : 50;
          const landlordSplitPercent = 100 - tenantSplitPercent;

          const updated = state.adminDisputes.map(d => {
            if (d.id === id) return { 
              ...d, 
              status: 'Resolved',
              resolvedSplit: { tenant: tenantSplitPercent, landlord: landlordSplitPercent }
            };
            return d;
          });

          // Disburse funds split logs
          const tenantCash = Math.round(disp.cautionAmount * tenantSplitPercent / 100);
          const landlordCash = Math.round(disp.cautionAmount * landlordSplitPercent / 100);

          logActivity(`Arbitrated Case "${disp.propertyName}": Release splits N${tenantCash} (Tenant) / N${landlordCash} (Landlord)`);

          // Update tenant application wallet balances
          updateState({ 
            adminDisputes: updated,
            walletBalance: state.walletBalance + tenantCash
          });

          // Add notification
          state.notifications.unshift({
            id: Date.now(),
            type: 'escrow',
            text: `Arbitration Completed: Caution dispute settled. Split payout of ₦${tenantCash.toLocaleString()} returned to wallet.`,
            time: 'Just now',
            read: false
          });

          alert(`Dispute Resolved! Arbitrated split disbursed: ₦${tenantCash.toLocaleString()} to Tenant wallet | ₦${landlordCash.toLocaleString()} to Landlord account.`);
          navigateTo('admin');
        }
      });
    });

    // ----------------------------------------------------
    // TAB: FRAUD & ALERTS MONITORING BINDINGS
    // ----------------------------------------------------
    // Dismiss alert
    document.querySelectorAll('.btn-dismiss-alert').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        const alertObj = state.adminFraudAlerts.find(a => a.id === id);

        if (alertObj) {
          const updated = state.adminFraudAlerts.map(a => {
            if (a.id === id) return { ...a, status: 'Dismissed' };
            return a;
          });

          logActivity(`Dismissed fraud alert ${alertObj.reference} for ${alertObj.user}`);
          updateState({ adminFraudAlerts: updated });
          alert("Risk alert dismissed. Flag removed.");
          navigateTo('admin');
        }
      });
    });

    // Freeze account
    document.querySelectorAll('.btn-freeze-account').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        const alertObj = state.adminFraudAlerts.find(a => a.id === id);

        if (alertObj) {
          const updated = state.adminFraudAlerts.map(a => {
            if (a.id === id) return { ...a, status: 'Account Frozen' };
            return a;
          });

          logActivity(`FREEZE ACCOUNT security trigger executed on user ID: ${alertObj.user}`);
          updateState({ adminFraudAlerts: updated });
          alert(`Security lock completed! Account ${alertObj.user} has been restricted from all withdrawals.`);
          navigateTo('admin');
        }
      });
    });

    // AML Hold investigation
    document.querySelectorAll('.btn-investigate-alert').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        const alertObj = state.adminFraudAlerts.find(a => a.id === id);

        if (alertObj) {
          const updated = state.adminFraudAlerts.map(a => {
            if (a.id === id) return { ...a, status: 'AML Audited Hold' };
            return a;
          });

          logActivity(`Placed CBN-AML investigation audit lock on transfer ref: ${alertObj.reference}`);
          updateState({ adminFraudAlerts: updated });
          alert("Escrow funds put on compliance review hold. Disbursal paused.");
          navigateTo('admin');
        }
      });
    });

    // ----------------------------------------------------
    // TAB: CONFIGURATIONS & SETTINGS BINDINGS
    // ----------------------------------------------------
    // Slide range indicator live label update
    document.getElementById('config-escrow-fee')?.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value).toFixed(1);
      const indicator = document.getElementById('label-fee-percent');
      if (indicator) {
        indicator.innerText = `${val}%`;
      }
    });

    // Save configurations
    document.getElementById('btn-save-system-config')?.addEventListener('click', () => {
      const fee = parseFloat(document.getElementById('config-escrow-fee').value);
      const is2FA = document.getElementById('config-toggle-2fa').checked;
      const isSand = document.getElementById('config-toggle-sandbox').checked;

      const updatedConfig = {
        escrowFeePercent: fee,
        enforce2FA: is2FA,
        sandboxMode: isSand
      };

      logActivity(`Saved Platform Config: Fee=${fee}%, 2FA=${is2FA}, Sandbox=${isSand}`);
      
      updateState({ systemConfig: updatedConfig });
      alert("System configurations saved successfully!");
      navigateTo('admin');
    });
  }
};
