// Partner Portals Screen Component (Milestone 7)
export const PartnerPortal = {
  render(state) {
    // Safety check & initialization of partner states if not present
    this.initializeState(state);

    const activeTab = state.activePartnerTab || 'dashboard';
    
    // Detect partner type and set up layout styles
    const role = state.user ? state.user.role : 'Corporate Partner';
    let themeClass = 'partner-theme-corporate';
    let roleBadge = 'Corporate Workspace';

    if (role === 'University Housing') {
      themeClass = 'partner-theme-university';
      roleBadge = 'University Portal';
    } else if (role === 'NGO Coordinator') {
      themeClass = 'partner-theme-ngo';
      roleBadge = 'NGO Support Hub';
    }

    return `
      <div class="partner-wrapper ${themeClass}">
        <!-- Header Section -->
        <div class="partner-header">
          <div>
            <h1 class="page-title" style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
              Partner Workspace
              <span class="partner-type-tag">${roleBadge}</span>
            </h1>
            <p class="text-muted" style="margin-top: 4px;">Allocate housing budgets, approve onboarding rosters, audit co-signed escrows, and monitor placements.</p>
          </div>
          <div style="display: flex; align-items: center; gap: 16px;">
            <div style="text-align: right;" class="hidden-mobile">
              <div style="font-weight: var(--weight-bold); color: var(--color-primary);">${state.user ? state.user.username : 'partner@haven.ng'}</div>
              <div style="font-size: 11px; color: var(--partner-secondary); font-weight: var(--weight-semibold);">Haven Compliance Key: #P-8716</div>
            </div>
            <button class="btn btn-primary btn-sm" id="btn-partner-onboard">+ Add Member</button>
          </div>
        </div>

        <!-- Navigation Tabs -->
        <div class="partner-tabs">
          <button class="partner-tab ${activeTab === 'dashboard' ? 'active' : ''}" data-tab="dashboard">
            Dashboard & Analytics
          </button>
          <button class="partner-tab ${activeTab === 'programs' ? 'active' : ''}" data-tab="programs">
            ${role === 'University Housing' ? 'Hostel Safety & Verification' : 'Housing Programs'}
          </button>
          <button class="partner-tab ${activeTab === 'roster' ? 'active' : ''}" data-tab="roster">
            ${role === 'Corporate Partner' ? 'Employee Tracker' : role === 'University Housing' ? 'Student Allocations' : 'Beneficiary Roster'}
          </button>
          <button class="partner-tab ${activeTab === 'escrow' ? 'active' : ''}" data-tab="escrow">
            Escrow Monitoring
          </button>
        </div>

        <!-- Tab Panel Content -->
        <div class="tab-panel">
          ${this.renderTabContent(state, role, activeTab)}
        </div>
      </div>

      <!-- Add Member Onboard Modal (Hidden by default) -->
      <div class="landlord-modal" id="partner-onboard-modal" style="display: none;">
        <div class="modal-content-panel">
          <div class="modal-header-panel">
            <h3 class="card-title" style="color: var(--color-primary);">Enroll New Member</h3>
            <button class="mobile-menu-btn" id="partner-close-btn" style="font-size: 20px; cursor: pointer;">&times;</button>
          </div>
          <form id="partner-onboard-form">
            <div class="modal-body-panel">
              <div class="form-group-landlord">
                <label for="member-name">Full Name</label>
                <input type="text" id="member-name" class="form-control-landlord" placeholder="e.g. Samuel Okon" required>
              </div>
              
              ${role === 'Corporate Partner' ? `
                <div class="form-group-landlord">
                  <label for="member-email">Corporate Email</label>
                  <input type="email" id="member-email" class="form-control-landlord" placeholder="s.okon@firm.com" required>
                </div>
                <div class="form-grid-2">
                  <div class="form-group-landlord">
                    <label for="member-dept">Department</label>
                    <input type="text" id="member-dept" class="form-control-landlord" placeholder="e.g. Operations" required>
                  </div>
                  <div class="form-group-landlord">
                    <label for="member-budget">Monthly Credit Allocation (₦)</label>
                    <input type="number" id="member-budget" class="form-control-landlord" value="100000" required>
                  </div>
                </div>
              ` : role === 'University Housing' ? `
                <div class="form-grid-2">
                  <div class="form-group-landlord">
                    <label for="member-matric">Student Matric Number</label>
                    <input type="text" id="member-matric" class="form-control-landlord" placeholder="e.g. ULG-2024-998" required>
                  </div>
                  <div class="form-group-landlord">
                    <label for="member-prog">Housing Program</label>
                    <select id="member-prog" class="form-control-landlord">
                      <option value="Off-Campus Verified">Off-Campus Verified</option>
                      <option value="Med-School Housing">Med-School Housing</option>
                      <option value="General Off-Campus">General Off-Campus</option>
                    </select>
                  </div>
                </div>
              ` : `
                <div class="form-grid-2">
                  <div class="form-group-landlord">
                    <label for="member-case">Verified Case ID</label>
                    <input type="text" id="member-case" class="form-control-landlord" value="NGO-${Math.floor(100+Math.random()*900)}-ID" required>
                  </div>
                  <div class="form-group-landlord">
                    <label for="member-subsidy">Monthly Subsidy Funding (₦)</label>
                    <input type="number" id="member-subsidy" class="form-control-landlord" value="80000" required>
                  </div>
                </div>
                <div class="form-group-landlord">
                  <label for="member-program-select">Target Support Program</label>
                  <select id="member-program-select" class="form-control-landlord">
                    <option value="Makoko Relief Project">Makoko Relief Project</option>
                    <option value="Yaba Student Subsidy">Yaba Student Subsidy</option>
                    <option value="Displaced Families Fund">Displaced Families Fund</option>
                  </select>
                </div>
              `}
            </div>
            <div class="modal-footer-panel">
              <button type="button" class="btn btn-outline btn-sm" id="partner-cancel-btn">Cancel</button>
              <button type="submit" class="btn btn-primary btn-sm partner-btn-submit">Enroll Member</button>
            </div>
          </form>
        </div>
      </div>
    `;
  },

  renderTabContent(state, role, tab) {
    switch (tab) {
      case 'dashboard':
        return this.renderDashboardTab(state, role);
      case 'programs':
        return this.renderProgramsTab(state, role);
      case 'roster':
        return this.renderRosterTab(state, role);
      case 'escrow':
        return this.renderEscrowTab(state);
      default:
        return `<div>Tab not found.</div>`;
    }
  },

  renderDashboardTab(state, role) {
    const formatNaira = (val) => '₦' + val.toLocaleString('en-US');

    // Corporate Metrics
    if (role === 'Corporate Partner') {
      const limit = 15000000;
      let spent = 0;
      state.corporateEmployees.forEach(e => {
        if (e.rentStatus === 'Leased') spent += e.budget * 12;
      });
      const remaining = limit - spent;
      const spentPercent = Math.round((spent / limit) * 100);

      return `
        <!-- Corporate Budget allocation Tracker -->
        <div class="budget-meter-card">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <span style="font-size: 13px; text-transform: uppercase; color:#6B7280; font-weight:var(--weight-semibold);">Annual Housing Budget Allocation</span>
              <h2 class="page-title" style="color:var(--color-primary); margin-top:4px;">${formatNaira(spent)} spent <span style="font-size:16px; font-weight:normal; color:#9CA3AF;">of ${formatNaira(limit)} limit</span></h2>
            </div>
            <div style="font-size: 28px; font-weight:var(--weight-bold); color:var(--partner-secondary);">${spentPercent}%</div>
          </div>
          
          <div class="budget-progress-track">
            <div class="budget-progress-bar" style="width: ${spentPercent}%;"></div>
          </div>

          <div class="budget-stats-row">
            <div>
              <div style="font-size:10px; color:#9CA3AF; text-transform:uppercase;">Co-Signed Spent</div>
              <strong style="font-size:16px; color:var(--color-primary);">${formatNaira(spent)}</strong>
            </div>
            <div style="border-left:1px solid #E5E7EB; border-right:1px solid #E5E7EB; padding: 0 16px;">
              <div style="font-size:10px; color:#9CA3AF; text-transform:uppercase;">Remaining Credit</div>
              <strong style="font-size:16px; color:var(--color-primary);">${formatNaira(remaining)}</strong>
            </div>
            <div>
              <div style="font-size:10px; color:#9CA3AF; text-transform:uppercase;">Housed Staff Rate</div>
              <strong style="font-size:16px; color:var(--color-primary);">${state.corporateEmployees.filter(e => e.rentStatus === 'Leased').length} / ${state.corporateEmployees.length} enrolled</strong>
            </div>
          </div>
        </div>

        <!-- Corporate Analytics SVG -->
        <div class="partner-chart-card">
          <h3 class="card-title" style="font-size:16px; color:var(--color-primary); margin-bottom:12px;">Corporate Budget Drawdown Index</h3>
          <div class="chart-container-svg" style="height:150px;">
            <svg width="100%" height="100%" viewBox="0 0 600 150" preserveAspectRatio="none">
              <line x1="20" y1="20" x2="580" y2="20" stroke="#F3F4F6" stroke-dasharray="4,4" />
              <line x1="20" y1="75" x2="580" y2="75" stroke="#F3F4F6" stroke-dasharray="4,4" />
              <line x1="20" y1="130" x2="580" y2="130" stroke="#FAF9F6" stroke-width="2" />
              
              <!-- Drawdown line -->
              <path d="M 40,120 L 140,110 L 240,90 L 340,80 L 440,55 L 540,30" class="partner-svg-line" />
              
              <circle cx="40" cy="120" r="4" class="partner-svg-dot" />
              <circle cx="140" cy="110" r="4" class="partner-svg-dot" />
              <circle cx="240" cy="90" r="4" class="partner-svg-dot" />
              <circle cx="340" cy="80" r="4" class="partner-svg-dot" />
              <circle cx="440" cy="55" r="4" class="partner-svg-dot" />
              <circle cx="540" cy="30" r="4" class="partner-svg-dot" />

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
    }

    // University Metrics
    if (role === 'University Housing') {
      const verifiedHostelsCount = state.safeHostels.filter(h => h.verified).length;
      const allocatedStudentsCount = state.universityStudents.filter(s => s.status === 'Allocated').length;

      return `
        <!-- University Allocations Tracker -->
        <div class="budget-meter-card">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <span style="font-size: 13px; text-transform: uppercase; color:#6B7280; font-weight:var(--weight-semibold);">Student Bedspace Allocations</span>
              <h2 class="page-title" style="color:var(--color-primary); margin-top:4px;">${allocatedStudentsCount} allocated <span style="font-size:16px; font-weight:normal; color:#9CA3AF;">of ${state.universityStudents.length} requested</span></h2>
            </div>
            <div style="font-size: 28px; font-weight:var(--weight-bold); color:var(--partner-secondary);">${Math.round((allocatedStudentsCount / state.universityStudents.length)*100)}%</div>
          </div>
          
          <div class="budget-progress-track">
            <div class="budget-progress-bar" style="width: ${Math.round((allocatedStudentsCount / state.universityStudents.length)*100)}%;"></div>
          </div>

          <div class="budget-stats-row">
            <div>
              <div style="font-size:10px; color:#9CA3AF; text-transform:uppercase;">Verified Safe Hostels</div>
              <strong style="font-size:16px; color:var(--color-primary);">${verifiedHostelsCount} registered</strong>
            </div>
            <div style="border-left:1px solid #E5E7EB; border-right:1px solid #E5E7EB; padding: 0 16px;">
              <div style="font-size:10px; color:#9CA3AF; text-transform:uppercase;">Hostel Bed Spaces</div>
              <strong style="font-size:16px; color:var(--color-primary);">${state.safeHostels.reduce((sum, h) => sum + h.beds, 0)} slots</strong>
            </div>
            <div>
              <div style="font-size:10px; color:#9CA3AF; text-transform:uppercase;">Awaiting Placement</div>
              <strong style="font-size:16px; color:var(--color-primary);">${state.universityStudents.filter(s => s.status === 'Requested').length} students</strong>
            </div>
          </div>
        </div>

        <!-- University Analytics SVG -->
        <div class="partner-chart-card">
          <h3 class="card-title" style="font-size:16px; color:var(--color-primary); margin-bottom:12px;">Safe Student Check-ins (Monthly Cumulative)</h3>
          <div class="chart-container-svg" style="height:150px;">
            <svg width="100%" height="100%" viewBox="0 0 600 150" preserveAspectRatio="none">
              <line x1="20" y1="20" x2="580" y2="20" stroke="#F3F4F6" stroke-dasharray="4,4" />
              <line x1="20" y1="75" x2="580" y2="75" stroke="#F3F4F6" stroke-dasharray="4,4" />
              <line x1="20" y1="130" x2="580" y2="130" stroke="#FAF9F6" stroke-width="2" />
              
              <path d="M 40,128 L 140,110 L 240,80 L 340,75 L 440,40 L 540,20" class="partner-svg-line" />
              
              <circle cx="40" cy="128" r="4" class="partner-svg-dot" />
              <circle cx="140" cy="110" r="4" class="partner-svg-dot" />
              <circle cx="240" cy="80" r="4" class="partner-svg-dot" />
              <circle cx="340" cy="75" r="4" class="partner-svg-dot" />
              <circle cx="440" cy="40" r="4" class="partner-svg-dot" />
              <circle cx="540" cy="20" r="4" class="partner-svg-dot" />

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
    }

    // NGO Metrics
    if (role === 'NGO Coordinator') {
      const fundLimit = 25000000;
      let spentFund = 0;
      state.ngoBeneficiaries.forEach(b => {
        if (b.status === 'Active Shelter') spentFund += b.monthlySubsidy * 12;
      });
      const remainingFund = fundLimit - spentFund;
      const spentFundPercent = Math.round((spentFund / fundLimit) * 100);

      return `
        <!-- NGO Subsidy Fund allocation Tracker -->
        <div class="budget-meter-card">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <span style="font-size: 13px; text-transform: uppercase; color:#6B7280; font-weight:var(--weight-semibold);">NGO Housing Support Program Funding</span>
              <h2 class="page-title" style="color:var(--color-primary); margin-top:4px;">${formatNaira(spentFund)} co-funded <span style="font-size:16px; font-weight:normal; color:#9CA3AF;">of ${formatNaira(fundLimit)} pool</span></h2>
            </div>
            <div style="font-size: 28px; font-weight:var(--weight-bold); color:var(--partner-secondary);">${spentFundPercent}%</div>
          </div>
          
          <div class="budget-progress-track">
            <div class="budget-progress-bar" style="width: ${spentFundPercent}%;"></div>
          </div>

          <div class="budget-stats-row">
            <div>
              <div style="font-size:10px; color:#9CA3AF; text-transform:uppercase;">Subsidies Disbursed</div>
              <strong style="font-size:16px; color:var(--color-primary);">${formatNaira(spentFund)}</strong>
            </div>
            <div style="border-left:1px solid #E5E7EB; border-right:1px solid #E5E7EB; padding: 0 16px;">
              <div style="font-size:10px; color:#9CA3AF; text-transform:uppercase;">Remaining Trust Capital</div>
              <strong style="font-size:16px; color:var(--color-primary);">${formatNaira(remainingFund)}</strong>
            </div>
            <div>
              <div style="font-size:10px; color:#9CA3AF; text-transform:uppercase;">Cases Housed</div>
              <strong style="font-size:16px; color:var(--color-primary);">${state.ngoBeneficiaries.filter(b => b.status === 'Active Shelter').length} Families</strong>
            </div>
          </div>
        </div>

        <!-- NGO Analytics SVG -->
        <div class="partner-chart-card">
          <h3 class="card-title" style="font-size:16px; color:var(--color-primary); margin-bottom:12px;">Active Sheltered Caseload index</h3>
          <div class="chart-container-svg" style="height:150px;">
            <svg width="100%" height="100%" viewBox="0 0 600 150" preserveAspectRatio="none">
              <line x1="20" y1="20" x2="580" y2="20" stroke="#F3F4F6" stroke-dasharray="4,4" />
              <line x1="20" y1="75" x2="580" y2="75" stroke="#F3F4F6" stroke-dasharray="4,4" />
              <line x1="20" y1="130" x2="580" y2="130" stroke="#FAF9F6" stroke-width="2" />
              
              <!-- Drawdown line -->
              <path d="M 40,115 L 140,105 L 240,90 L 340,75 L 440,45 L 540,25" class="partner-svg-line" />
              
              <circle cx="40" cy="115" r="4" class="partner-svg-dot" />
              <circle cx="140" cy="105" r="4" class="partner-svg-dot" />
              <circle cx="240" cy="90" r="4" class="partner-svg-dot" />
              <circle cx="340" cy="75" r="4" class="partner-svg-dot" />
              <circle cx="440" cy="45" r="4" class="partner-svg-dot" />
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
    }
  },

  renderProgramsTab(state, role) {
    const formatNaira = (val) => '₦' + val.toLocaleString('en-US');

    // Corporate Portal: Housing Programs allocation
    if (role === 'Corporate Partner') {
      return `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px;">
          <h3 class="card-title" style="font-size: 16px; color: var(--color-primary);">Corporate Housing Programs</h3>
          <button class="btn btn-primary btn-sm" id="btn-create-program">+ Create Program</button>
        </div>

        <div class="programs-grid">
          ${state.partnerPrograms.map(prog => `
            <div class="program-card">
              <h4 class="program-title">${prog.title}</h4>
              <div style="font-size:12px; color:#6B7280; margin-bottom:16px;">Active Employees: <strong style="color:var(--color-primary);">${prog.members}</strong></div>
              
              <div style="margin-top:auto;">
                <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:6px;">
                  <span>Spent: <strong>${formatNaira(prog.spent)}</strong></span>
                  <span style="color:#9CA3AF;">Limit: ${formatNaira(prog.limit)}</span>
                </div>
                <div class="budget-progress-track" style="margin:0; height:8px;">
                  <div class="budget-progress-bar" style="width: ${Math.round((prog.spent/prog.limit)*100)}%;"></div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    // University Portal: safe hostel verification checklist
    if (role === 'University Housing') {
      return `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px;">
          <h3 class="card-title" style="font-size: 16px; color: var(--color-primary);">Verified Student Accommodations</h3>
          <button class="btn btn-primary btn-sm" id="btn-add-hostel-registry">+ Register Hostel</button>
        </div>

        <div class="table-card">
          <div class="table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Hostel Facility</th>
                  <th>Location Landmark</th>
                  <th>Capacity Limit</th>
                  <th>Safety Checklist Standards</th>
                  <th>Verification Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${state.safeHostels.map(h => `
                  <tr>
                    <td style="font-weight:var(--weight-semibold); color:var(--color-primary);">${h.name}</td>
                    <td>${h.location}</td>
                    <td>${h.beds} bed spaces</td>
                    <td style="font-size: 12px; color:#4B5563;">${h.status}</td>
                    <td>
                      <span class="safe-house-badge ${!h.verified ? 'failed' : ''}">
                        ${h.verified ? '✓ Verified Safe' : '✗ Audit Pending'}
                      </span>
                    </td>
                    <td>
                      ${!h.verified ? `
                        <button class="btn btn-secondary btn-sm btn-verify-hostel" data-id="${h.id}" style="padding:4px 8px; font-size:11px;">Approve Safety</button>
                      ` : `
                        <span class="badge badge-success" style="font-size:10px;">Certified</span>
                      `}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    // NGO Portal: Housing Relief programs
    if (role === 'NGO Coordinator') {
      return `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px;">
          <h3 class="card-title" style="font-size: 16px; color: var(--color-primary);">Support Programs & Subsidies</h3>
          <button class="btn btn-primary btn-sm" id="btn-create-ngo-program">+ Create Relief Fund</button>
        </div>

        <div class="programs-grid">
          ${state.partnerPrograms.map(prog => `
            <div class="program-card">
              <h4 class="program-title">${prog.title}</h4>
              <div style="font-size:12px; color:#6B7280; margin-bottom:16px;">Active Placements: <strong style="color:var(--color-primary);">${prog.members} cases</strong></div>
              
              <div style="margin-top:auto;">
                <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:6px;">
                  <span>Co-funded: <strong>${formatNaira(prog.spent)}</strong></span>
                  <span style="color:#9CA3AF;">Cap: ${formatNaira(prog.limit)}</span>
                </div>
                <div class="budget-progress-track" style="margin:0; height:8px;">
                  <div class="budget-progress-bar" style="width: ${Math.round((prog.spent/prog.limit)*100)}%;"></div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }
  },

  renderRosterTab(state, role) {
    const formatNaira = (val) => '₦' + val.toLocaleString('en-US');

    // Corporate Employee Roster
    if (role === 'Corporate Partner') {
      return `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px;">
          <h3 class="card-title" style="font-size: 16px; color: var(--color-primary);">Employee Housing registry</h3>
          <button class="btn btn-outline btn-sm" id="btn-partner-csv-export">Export Staff CSV</button>
        </div>

        <div class="table-card">
          <div class="table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>Corporate Email</th>
                  <th>Department</th>
                  <th>Monthly Allocation</th>
                  <th>Placement Status</th>
                  <th>Active Residence</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${state.corporateEmployees.map(emp => `
                  <tr>
                    <td style="font-weight:var(--weight-semibold); color:var(--color-primary);">${emp.name}</td>
                    <td>${emp.email}</td>
                    <td>${emp.dept}</td>
                    <td style="font-weight:var(--weight-bold);">${formatNaira(emp.budget)}</td>
                    <td>
                      <span class="badge ${emp.rentStatus === 'Leased' ? 'badge-success' : 'badge-warning'}">
                        ${emp.rentStatus}
                      </span>
                    </td>
                    <td>${emp.address}</td>
                    <td>
                      <button class="btn btn-outline btn-sm btn-delete-member" data-id="${emp.id}" style="padding:4px 8px; border-color:var(--color-error); color:var(--color-error); font-size:11px;">Remove</button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    // University Student Allocation request queue
    if (role === 'University Housing') {
      return `
        <h3 class="card-title" style="font-size: 16px; color: var(--color-primary); margin-bottom: 16px;">Student Housing Requests</h3>
        
        <div class="table-card">
          <div class="table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Matric Number</th>
                  <th>Assigned Program</th>
                  <th>Facility Allocated</th>
                  <th>Bedspace / Room</th>
                  <th>Placement Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${state.universityStudents.map(stud => `
                  <tr>
                    <td style="font-weight:var(--weight-semibold); color:var(--color-primary);">${stud.name}</td>
                    <td>${stud.matric}</td>
                    <td><span class="badge badge-info">${stud.program}</span></td>
                    <td style="font-weight:var(--weight-medium);">${stud.hostelName}</td>
                    <td>${stud.bedspace}</td>
                    <td>
                      <span class="badge ${stud.status === 'Allocated' ? 'badge-success' : 'badge-warning'}">
                        ${stud.status}
                      </span>
                    </td>
                    <td>
                      ${stud.status === 'Requested' ? `
                        <button class="btn btn-primary btn-sm btn-allocate-student" data-id="${stud.id}" style="padding:4px 8px; font-size:11px;">Allocate Bedspace</button>
                      ` : `
                        <span class="badge badge-success">Assigned</span>
                      `}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    // NGO Beneficiary Roster & Case files
    if (role === 'NGO Coordinator') {
      return `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px;">
          <h3 class="card-title" style="font-size: 16px; color: var(--color-primary);">Subsidized Cases & Beneficiaries</h3>
          <button class="btn btn-outline btn-sm" id="btn-partner-csv-export">Export Cases CSV</button>
        </div>

        <div class="table-card">
          <div class="table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Case Name / Family</th>
                  <th>Case File ID</th>
                  <th>Active Program</th>
                  <th>Monthly Support</th>
                  <th>Safety Audit check</th>
                  <th>Shelter Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${state.ngoBeneficiaries.map(ben => `
                  <tr>
                    <td style="font-weight:var(--weight-semibold); color:var(--color-primary);">${ben.name}</td>
                    <td><code>${ben.caseId}</code></td>
                    <td>${ben.program}</td>
                    <td style="font-weight:var(--weight-bold);">${formatNaira(ben.monthlySubsidy)}</td>
                    <td>
                      <span class="safe-house-badge ${!ben.safetyVerified ? 'failed' : ''}">
                        ${ben.safetyVerified ? '✓ Safe Audit' : '✗ Audit Required'}
                      </span>
                    </td>
                    <td>
                      <span class="badge ${ben.status === 'Active Shelter' ? 'badge-success' : 'badge-warning'}">
                        ${ben.status}
                      </span>
                    </td>
                    <td>
                      ${!ben.safetyVerified ? `
                        <button class="btn btn-secondary btn-sm btn-verify-case-safety" data-id="${ben.id}" style="padding:4px 8px; font-size:11px;">Verify Safety</button>
                      ` : `
                        <button class="btn btn-outline btn-sm btn-delete-member" data-id="${ben.id}" style="padding:4px 8px; border-color:var(--color-error); color:var(--color-error); font-size:11px;">De-enroll</button>
                      `}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }
  },

  renderEscrowTab(state) {
    const formatNaira = (val) => '₦' + val.toLocaleString('en-US');

    return `
      <h3 class="card-title" style="font-size: 16px; color: var(--color-primary); margin-bottom: 8px;">Guaranteed Escrow Protection Vaults</h3>
      <p class="text-sm text-muted" style="margin-bottom: 24px;">Financial ledger monitoring security vaults co-funded, co-signed or guaranteed under corporate lease pool covenants.</p>
      
      <div class="table-card">
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>Protected Vault Title</th>
                <th>Guarantee Co-Signer</th>
                <th>Caution Hold</th>
                <th>Locked Rent</th>
                <th>Total Secured</th>
                <th>Lifecycle Status</th>
                <th>Report</th>
              </tr>
            </thead>
            <tbody>
              ${state.partnerEscrows.map(esc => `
                <tr>
                  <td style="font-weight:var(--weight-semibold); color:var(--color-primary);">${esc.title}</td>
                  <td><span class="badge badge-info" style="font-size:10px;">${esc.coSigner}</span></td>
                  <td style="font-weight:var(--weight-bold);">${formatNaira(esc.cautionAmount)}</td>
                  <td style="font-weight:var(--weight-bold);">${formatNaira(esc.rentAmount)}</td>
                  <td style="font-weight:var(--weight-bold);">${formatNaira(esc.cautionAmount + esc.rentAmount)}</td>
                  <td>
                    <span class="badge ${esc.status === 'Funded' ? 'badge-info' : esc.status === 'Released' ? 'badge-success' : 'badge-warning'}">
                      ${esc.status}
                    </span>
                  </td>
                  <td>
                    <button class="btn btn-outline btn-sm btn-download-vault-audit" data-id="${esc.id}" style="padding:4px 8px; font-size:11px;">💾 Audit Log</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  initializeState(state) {
    if (!state.activePartnerTab) state.activePartnerTab = 'dashboard';

    // 1. Corporate Employees
    if (!state.corporateEmployees) {
      state.corporateEmployees = [
        { id: 1, name: 'Tosin Adelami', email: 't.adelami@firm.com', dept: 'Engineering', budget: 120000, rentStatus: 'Leased', address: '4b Admiralty Way, Lekki' },
        { id: 2, name: 'Chioma Nze', email: 'c.nze@firm.com', dept: 'Finance', budget: 150000, rentStatus: 'Leased', address: 'Plot 12 VI Flat 3' },
        { id: 3, name: 'Babatunde Alao', email: 'b.alao@firm.com', dept: 'Product', budget: 100000, rentStatus: 'Searching', address: '—' }
      ];
    }

    // 2. University Students
    if (!state.universityStudents) {
      state.universityStudents = [
        { id: 1, name: 'Chinedu Egwu', matric: 'ULG-2024-819', program: 'Off-Campus Verified', hostelName: 'Yaba Apex Student Hall', bedspace: 'Room 2B', status: 'Allocated' },
        { id: 2, name: 'Halima Musa', matric: 'ULG-2023-451', program: 'Med-School Housing', hostelName: 'VI Scholar Hostels', bedspace: 'Flat 1', status: 'Allocated' },
        { id: 3, name: 'Efe Omowole', matric: 'ULG-2025-108', program: 'General Off-Campus', hostelName: 'Pending Allocation', bedspace: '—', status: 'Requested' }
      ];
    }

    // 3. NGO Beneficiaries
    if (!state.ngoBeneficiaries) {
      state.ngoBeneficiaries = [
        { id: 1, name: 'Adebayo Family', caseId: 'NGO-801-MC', program: 'Makoko Relief Project', monthlySubsidy: 80000, status: 'Active Shelter', safetyVerified: true },
        { id: 2, name: 'Theresa Johnson', caseId: 'NGO-752-YJ', program: 'Yaba Student Subsidy', monthlySubsidy: 50000, status: 'Active Shelter', safetyVerified: true },
        { id: 3, name: 'Mustapha Kabir', caseId: 'NGO-908-MK', program: 'Displaced Families Fund', monthlySubsidy: 120000, status: 'Awaiting Placement', safetyVerified: false }
      ];
    }

    // 4. Safe Hostels (University Checklists)
    if (!state.safeHostels) {
      state.safeHostels = [
        { id: 1, name: 'Yaba Apex Student Hall', location: 'Yaba, near Unilag', beds: 48, status: 'Structural integrity certified. Security guard roster uploaded.', verified: true },
        { id: 2, name: 'VI Scholar Hostels', location: 'Victoria Island', beds: 24, status: 'Fire marshal checked. Clean water treatment operational.', verified: true },
        { id: 3, name: 'Lekki Share-Accommodation', location: 'Lekki Phase 2', beds: 16, status: 'Safety check pending (Access control review required).', verified: false }
      ];
    }

    // 5. Shared Programs
    if (!state.partnerPrograms) {
      state.partnerPrograms = [
        { id: 1, title: 'Tech-Stipend Rent Pool', limit: 8000000, spent: 5400000, members: 4 },
        { id: 2, title: 'Executive VI Allowance', limit: 7000000, spent: 4200000, members: 2 }
      ];
    }

    // 6. Partner Escrow vaults
    if (!state.partnerEscrows) {
      state.partnerEscrows = [
        { id: 1, title: 'Caution Vault: Lekki Duplex (Employee Tosin)', cautionAmount: 250000, rentAmount: 2950000, status: 'Funded', coSigner: 'Corporate Co-sign Guarantee' },
        { id: 2, title: 'Rent Trust: Yaba Hall (Student Chinedu)', cautionAmount: 50000, rentAmount: 450000, status: 'Released', coSigner: 'Unilag Housing Trust' }
      ];
    }
  },

  init(state, navigateTo, updateState) {
    const role = state.user ? state.user.role : 'Corporate Partner';

    // Bind Tab Switching
    document.querySelectorAll('.partner-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const selectedTab = e.currentTarget.getAttribute('data-tab');
        updateState({ activePartnerTab: selectedTab });
        navigateTo('partner');
      });
    });

    // Onboard Modal display
    const onboardModal = document.getElementById('partner-onboard-modal');
    document.getElementById('btn-partner-onboard')?.addEventListener('click', () => {
      if (onboardModal) onboardModal.style.display = 'flex';
    });

    document.getElementById('partner-close-btn')?.addEventListener('click', () => {
      if (onboardModal) onboardModal.style.display = 'none';
    });

    document.getElementById('partner-cancel-btn')?.addEventListener('click', () => {
      if (onboardModal) onboardModal.style.display = 'none';
    });

    // Onboard Form submission handler
    document.getElementById('partner-onboard-form')?.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('member-name').value;

      if (role === 'Corporate Partner') {
        const email = document.getElementById('member-email').value;
        const dept = document.getElementById('member-dept').value;
        const budget = parseInt(document.getElementById('member-budget').value);

        const newEmp = {
          id: state.corporateEmployees.length + 1,
          name,
          email,
          dept,
          budget,
          rentStatus: 'Searching',
          address: '—'
        };

        const updated = [...state.corporateEmployees, newEmp];
        updateState({ corporateEmployees: updated });

      } else if (role === 'University Housing') {
        const matric = document.getElementById('member-matric').value;
        const prog = document.getElementById('member-prog').value;

        const newStud = {
          id: state.universityStudents.length + 1,
          name,
          matric,
          program: prog,
          hostelName: 'Pending Allocation',
          bedspace: '—',
          status: 'Requested'
        };

        const updated = [...state.universityStudents, newStud];
        updateState({ universityStudents: updated });

      } else {
        const caseId = document.getElementById('member-case').value;
        const subsidy = parseInt(document.getElementById('member-subsidy').value);
        const program = document.getElementById('member-program-select').value;

        const newBen = {
          id: state.ngoBeneficiaries.length + 1,
          name,
          caseId,
          program,
          monthlySubsidy: subsidy,
          status: 'Awaiting Placement',
          safetyVerified: false
        };

        const updated = [...state.ngoBeneficiaries, newBen];
        updateState({ ngoBeneficiaries: updated });
      }

      // Log notification
      state.notifications.unshift({
        id: Date.now(),
        type: 'verification',
        text: `Member Enrolled: ${name} registered on Haven partner directory.`,
        time: 'Just now',
        read: false
      });

      if (onboardModal) onboardModal.style.display = 'none';
      alert(`Success! ${name} has been enrolled on the active program roster.`);
      navigateTo('partner');
    });

    // Remove member (Corporate, NGO)
    document.querySelectorAll('.btn-delete-member').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        if (confirm("Are you sure you want to remove this member from the active roster?")) {
          if (role === 'Corporate Partner') {
            const updated = state.corporateEmployees.filter(emp => emp.id !== id);
            updateState({ corporateEmployees: updated });
          } else if (role === 'NGO Coordinator') {
            const updated = state.ngoBeneficiaries.filter(ben => ben.id !== id);
            updateState({ ngoBeneficiaries: updated });
          }
          alert("Member removed.");
          navigateTo('partner');
        }
      });
    });

    // University allocation action
    document.querySelectorAll('.btn-allocate-student').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        const stud = state.universityStudents.find(s => s.id === id);

        if (stud) {
          const updated = state.universityStudents.map(s => {
            if (s.id === id) return { ...s, hostelName: 'Yaba Apex Student Hall', bedspace: 'Room 3C', status: 'Allocated' };
            return s;
          });

          // Add notification
          state.notifications.unshift({
            id: Date.now(),
            type: 'match',
            text: `Housing Allocated: Bedspace assigned to ${stud.name} in Apex Hall.`,
            time: 'Just now',
            read: false
          });

          updateState({ universityStudents: updated });
          alert(`Success! Bedspace assigned for ${stud.name}. Check-in codes dispatched.`);
          navigateTo('partner');
        }
      });
    });

    // NGO safe verification check
    document.querySelectorAll('.btn-verify-case-safety').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        const updated = state.ngoBeneficiaries.map(ben => {
          if (ben.id === id) return { ...ben, safetyVerified: true, status: 'Active Shelter' };
          return ben;
        });

        // Add notification
        state.notifications.unshift({
          id: Date.now(),
          type: 'verification',
          text: `Case Audit Passed: Housing safety certificate issued.`,
          time: 'Just now',
          read: false
        });

        updateState({ ngoBeneficiaries: updated });
        alert("Safety check certified! Relief subsidies activated.");
        navigateTo('partner');
      });
    });

    // University Hostel Safety verification toggle
    document.querySelectorAll('.btn-verify-hostel').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        const updated = state.safeHostels.map(h => {
          if (h.id === id) return { ...h, verified: true, status: 'Integrity certified. Approved by Fire marshal.' };
          return h;
        });

        // Add notification
        state.notifications.unshift({
          id: Date.now(),
          type: 'verification',
          text: `Hostel Approved: Safe housing index updated.`,
          time: 'Just now',
          read: false
        });

        updateState({ safeHostels: updated });
        alert("Hostel certified safe! Students can now be allocated to this facility.");
        navigateTo('partner');
      });
    });

    // Create program simulator
    document.getElementById('btn-create-program')?.addEventListener('click', () => {
      const title = prompt("Enter Program Title:", "Graduate Intern Housing");
      if (!title) return;
      
      const newProg = {
        id: state.partnerPrograms.length + 1,
        title,
        limit: 5000000,
        spent: 0,
        members: 0
      };

      const updated = [...state.partnerPrograms, newProg];
      updateState({ partnerPrograms: updated });
      alert("New Program created successfully.");
      navigateTo('partner');
    });

    // CSV Exporter Simulation
    document.getElementById('btn-partner-csv-export')?.addEventListener('click', () => {
      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += "Name,Email/Matric/Case,Allocation,Status,Address\r\n";
      
      if (role === 'Corporate Partner') {
        state.corporateEmployees.forEach(e => {
          csvContent += `"${e.name}","${e.email}",${e.budget},"${e.rentStatus}","${e.address}"\r\n`;
        });
      } else {
        state.ngoBeneficiaries.forEach(b => {
          csvContent += `"${b.name}","${b.caseId}",${b.monthlySubsidy},"${b.status}","Verified Safe"\r\n`;
        });
      }

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "haven_partner_statement.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      alert("Roster CSV downloaded. Haven compliance ledger locked.");
    });

    // Escrow audit log download
    document.querySelectorAll('.btn-download-vault-audit').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        const esc = state.partnerEscrows.find(ev => ev.id === id);
        alert(`Exporting Audit Trace Envelope for: "${esc.title}"\nReference: ESC-${id}08-CO\nCBN Trust Status: Verified Funded`);
      });
    });
  }
};
