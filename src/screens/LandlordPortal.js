// Landlord & Agent Portal Screen Component
export const LandlordPortal = {
  render(state) {
    // Safety check & initialization of landlord state if not present
    this.initializeState(state);

    const activeTab = state.activeLandlordTab || 'overview';
    const pendingApprovalsCount = state.pipelineApplications.filter(a => a.status === 'Pending Approval').length;

    return `
      <div class="landlord-wrapper">
        <!-- Header Section -->
        <div class="landlord-header-section">
          <div>
            <h1 class="page-title" style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
              Provider Workspace
              <span class="landlord-role-badge">${state.user ? state.user.role : 'Landlord'}</span>
            </h1>
            <p class="text-muted" style="margin-top: 4px;">Track occupancies, verify tenant qualifications via AI, control milestone escrow payouts, and manage lease lifecycles.</p>
          </div>
          <div style="display: flex; align-items: center; gap: 16px;">
            <div style="text-align: right;" class="hidden-mobile">
              <div style="font-weight: var(--weight-bold); color: var(--color-primary);">${state.user ? state.user.username : 'partner@haven.ng'}</div>
              <div style="font-size: 11px; color: var(--color-secondary); font-weight: var(--weight-semibold);">Lagos State License #L-9082</div>
            </div>
            <button class="btn btn-primary btn-sm" id="btn-quick-listing-modal">+ Add Property</button>
          </div>
        </div>

        <!-- Navigation Tabs -->
        <div class="landlord-tabs">
          <button class="landlord-tab ${activeTab === 'overview' ? 'active' : ''}" data-tab="overview">
            Overview & Analytics
          </button>
          <button class="landlord-tab ${activeTab === 'properties' ? 'active' : ''}" data-tab="properties">
            Property Portfolio (${state.landlordProperties.length})
          </button>
          <button class="landlord-tab ${activeTab === 'approvals' ? 'active' : ''}" data-tab="approvals">
            AI Tenant Approvals ${pendingApprovalsCount > 0 ? `<span style="background-color: var(--color-error); color: white; padding: 2px 6px; border-radius: var(--radius-full); font-size: 10px; margin-left: 6px; font-weight: bold;">${pendingApprovalsCount}</span>` : ''}
          </button>
          <button class="landlord-tab ${activeTab === 'escrow' ? 'active' : ''}" data-tab="escrow">
            Escrow & Readiness
          </button>
          <button class="landlord-tab ${activeTab === 'renewals' ? 'active' : ''}" data-tab="renewals">
            Renewals Desk
          </button>
        </div>

        <!-- Tab Panel Content -->
        <div class="tab-panel">
          ${this.renderTabContent(state, activeTab)}
        </div>
      </div>

      <!-- Add Listing Modal (Hidden by default) -->
      <div class="landlord-modal" id="add-property-modal" style="display: none;">
        <div class="modal-content-panel">
          <div class="modal-header-panel">
            <h3 class="card-title" style="color: var(--color-primary);">Create Property Listing</h3>
            <button class="mobile-menu-btn" id="modal-close-btn" style="font-size: 20px; cursor: pointer;">&times;</button>
          </div>
          <form id="add-property-form">
            <div class="modal-body-panel">
              <div class="form-group-landlord">
                <label for="prop-title">Property Title</label>
                <input type="text" id="prop-title" class="form-control-landlord" placeholder="e.g. Executive 2 Bed Serviced Flat" required>
              </div>
              <div class="form-grid-2">
                <div class="form-group-landlord">
                  <label for="prop-location">Neighborhood / Area</label>
                  <input type="text" id="prop-location" class="form-control-landlord" placeholder="e.g. Lekki Phase 1" required>
                </div>
                <div class="form-group-landlord">
                  <label for="prop-city">City</label>
                  <input type="text" id="prop-city" class="form-control-landlord" value="Lagos" required>
                </div>
              </div>
              <div class="form-grid-2">
                <div class="form-group-landlord">
                  <label for="prop-rent">Annual Rent (₦)</label>
                  <input type="number" id="prop-rent" class="form-control-landlord" placeholder="e.g. 3500000" required>
                </div>
                <div class="form-group-landlord">
                  <label for="prop-caution">Caution Deposit (₦)</label>
                  <input type="number" id="prop-caution" class="form-control-landlord" placeholder="e.g. 300000" required>
                </div>
              </div>
              <div class="form-grid-2">
                <div class="form-group-landlord">
                  <label for="prop-bedrooms">Bedrooms</label>
                  <input type="number" id="prop-bedrooms" class="form-control-landlord" value="2" min="1" required>
                </div>
                <div class="form-group-landlord">
                  <label for="prop-bathrooms">Bathrooms</label>
                  <input type="number" id="prop-bathrooms" class="form-control-landlord" value="2" min="1" required>
                </div>
              </div>
              <div class="form-group-landlord">
                <label>Amenities</label>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-top: 8px;">
                  <label style="font-weight: normal; display: flex; align-items: center; gap: 6px;">
                    <input type="checkbox" name="amenity" value="Power Backup" checked> Power Backup
                  </label>
                  <label style="font-weight: normal; display: flex; align-items: center; gap: 6px;">
                    <input type="checkbox" name="amenity" value="Security" checked> Security
                  </label>
                  <label style="font-weight: normal; display: flex; align-items: center; gap: 6px;">
                    <input type="checkbox" name="amenity" value="Water Treatment" checked> Water Treatment
                  </label>
                  <label style="font-weight: normal; display: flex; align-items: center; gap: 6px;">
                    <input type="checkbox" name="amenity" value="Gym"> Gym
                  </label>
                  <label style="font-weight: normal; display: flex; align-items: center; gap: 6px;">
                    <input type="checkbox" name="amenity" value="Pool"> Pool
                  </label>
                  <label style="font-weight: normal; display: flex; align-items: center; gap: 6px;">
                    <input type="checkbox" name="amenity" value="Parking" checked> Parking
                  </label>
                </div>
              </div>
              <div class="form-group-landlord">
                <label for="prop-rules">House Rules Summary</label>
                <textarea id="prop-rules" class="form-control-landlord" rows="2" placeholder="e.g. Quiet hours after 10 PM. Corporate tenancies preferred."></textarea>
              </div>
            </div>
            <div class="modal-footer-panel">
              <button type="button" class="btn btn-outline btn-sm" id="btn-cancel-modal">Cancel</button>
              <button type="submit" class="btn btn-primary btn-sm">Create Listing</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Bulk Upload Modal (Hidden by default) -->
      <div class="landlord-modal" id="bulk-upload-modal" style="display: none;">
        <div class="modal-content-panel">
          <div class="modal-header-panel">
            <h3 class="card-title" style="color: var(--color-primary);">Bulk Units Upload</h3>
            <button class="mobile-menu-btn" id="bulk-close-btn" style="font-size: 20px; cursor: pointer;">&times;</button>
          </div>
          <div class="modal-body-panel">
            <p class="text-sm text-muted" style="margin-bottom: 16px;">Paste your CSV format data below. Format: <code>UnitNumber,BaseRent,Status</code>. Or use the mock generator.</p>
            <div class="form-group-landlord">
              <label for="bulk-property-select">Target Property</label>
              <select id="bulk-property-select" class="form-control-landlord">
                ${state.landlordProperties.map(p => `<option value="${p.id}">${p.title}</option>`).join('')}
              </select>
            </div>
            <div class="form-group-landlord">
              <label for="bulk-csv-data">CSV Data</label>
              <textarea id="bulk-csv-data" class="form-control-landlord" rows="6" style="font-family: monospace; font-size: 13px;" placeholder="Unit 104,2400000,Vacant&#10;Unit 105,2600000,Vacant&#10;Unit 106,2900000,Occupied"></textarea>
            </div>
            <div style="display: flex; gap: 8px;">
              <button class="btn btn-outline btn-sm" id="btn-generate-mock-csv" style="flex: 1;">Generate Sample Data</button>
            </div>
          </div>
          <div class="modal-footer-panel">
            <button type="button" class="btn btn-outline btn-sm" id="btn-cancel-bulk">Cancel</button>
            <button type="button" class="btn btn-primary btn-sm" id="btn-import-csv">Bulk Import</button>
          </div>
        </div>
      </div>
    `;
  },

  renderTabContent(state, tab) {
    switch (tab) {
      case 'overview':
        return this.renderOverviewTab(state);
      case 'properties':
        return this.renderPropertiesTab(state);
      case 'approvals':
        return this.renderApprovalsTab(state);
      case 'escrow':
        return this.renderEscrowTab(state);
      case 'renewals':
        return this.renderRenewalsTab(state);
      default:
        return `<div>Tab view not found.</div>`;
    }
  },

  renderOverviewTab(state) {
    // Calculate stats
    const totalProperties = state.landlordProperties.length;
    let totalUnits = 0;
    let occupiedUnits = 0;
    state.landlordProperties.forEach(p => {
      totalUnits += p.units ? p.units.length : 1;
      occupiedUnits += p.units ? p.units.filter(u => u.status === 'Occupied').length : (p.occupied ? 1 : 0);
    });
    const occupancyRate = totalUnits > 0 ? Math.round((occupiedUnits / totalUnits) * 100) : 0;
    const vacancyRate = 100 - occupancyRate;
    
    // Revenue calculations (YTD)
    let activeMonthlyRevenue = 0;
    state.landlordProperties.forEach(p => {
      if (p.units) {
        p.units.forEach(u => {
          if (u.status === 'Occupied') {
            activeMonthlyRevenue += Math.round(u.rent / 12);
          }
        });
      } else if (p.occupied) {
        activeMonthlyRevenue += Math.round(p.rent / 12);
      }
    });

    const formatNaira = (val) => '₦' + val.toLocaleString('en-US');

    // Filtered lists
    const filterProperty = state.landlordOverviewFilterProperty || 'all';
    const filterStatus = state.landlordOverviewFilterStatus || 'all';
    const searchQuery = state.landlordOverviewSearch || '';

    // Filter recent ledger items or tenant activities
    let activities = [
      { id: 1, date: '2026-06-21', propName: 'Luxury 2 Bed Penthouse Duplex', type: 'Deposit Locked', details: 'Caution deposit locked in Escrow by Osaze Alao', amount: 250000, status: 'Completed' },
      { id: 2, date: '2026-06-20', propName: 'Cozy 1 Bedroom Studio Loft', type: 'Payout Completed', details: 'Mrs. Coker Yaba rent payout cleared', amount: 1200000, status: 'Completed' },
      { id: 3, date: '2026-06-18', propName: 'Executive 3 Bed Serviced Flat', type: 'Inspection Scheduled', details: 'Amara Okafor physical check scheduled', amount: null, status: 'Pending' },
      { id: 4, date: '2026-06-17', propName: 'Luxury 2 Bed Penthouse Duplex', type: 'AI Scoring Passed', details: 'Osaze Alao scored 785 (Grade A)', amount: null, status: 'System' }
    ];

    // Apply filtering
    if (filterProperty !== 'all') {
      const selectedTitle = state.landlordProperties.find(p => p.id === parseInt(filterProperty))?.title || '';
      activities = activities.filter(a => a.propName.includes(selectedTitle));
    }
    if (filterStatus !== 'all') {
      activities = activities.filter(a => a.status.toLowerCase() === filterStatus.toLowerCase());
    }
    if (searchQuery) {
      activities = activities.filter(a => 
        a.propName.toLowerCase().includes(searchQuery.toLowerCase()) || 
        a.details.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return `
      <!-- Stats Summary Row -->
      <div class="landlord-grid">
        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">Portfolio Occupancy</span>
            <span style="font-size: 18px; color: var(--color-secondary);">📊</span>
          </div>
          <div class="stat-value">${occupancyRate}%</div>
          <div class="stat-meta">
            <span>${occupiedUnits} of ${totalUnits} Units leased</span>
          </div>
        </div>

        <div class="stat-card revenue">
          <div class="stat-header">
            <span class="stat-title">Active Mo. Revenue</span>
            <span style="font-size: 18px; color: var(--color-success);">₦</span>
          </div>
          <div class="stat-value">${formatNaira(activeMonthlyRevenue)}</div>
          <div class="stat-meta">
            <span class="stat-trend up">↑ 8.4%</span>
            <span>from previous month</span>
          </div>
        </div>

        <div class="stat-card vacancy">
          <div class="stat-header">
            <span class="stat-title">Vacancy Rate</span>
            <span style="font-size: 18px; color: var(--color-warning);">🏠</span>
          </div>
          <div class="stat-value">${vacancyRate}%</div>
          <div class="stat-meta">
            <span>${totalUnits - occupiedUnits} active empty units</span>
          </div>
        </div>

        <div class="stat-card pipeline">
          <div class="stat-header">
            <span class="stat-title font-small">Pending Qualifications</span>
            <span style="font-size: 18px; color: var(--color-info);">👥</span>
          </div>
          <div class="stat-value">${state.pipelineApplications.filter(a => a.status === 'Pending Approval').length}</div>
          <div class="stat-meta">
            <span>AI scoring analysis completed</span>
          </div>
        </div>
      </div>

      <!-- Charts Section (Custom SVG Graphics) -->
      <div class="table-card" style="padding: 24px; margin-bottom: 32px;">
        <h3 class="card-title" style="margin-bottom: 8px; font-size: 18px; color: var(--color-primary);">Revenue & Demand Analytics</h3>
        <p class="text-sm text-muted">A dynamic projection showing rental yield index and tenant profile search volume in Haven ecosystem.</p>
        
        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px; margin-top: 24px;">
          <!-- SVG Bar Chart -->
          <div style="background-color: #FAF9F6; border-radius: var(--radius-md); padding: 16px; border: 1px solid rgba(13,27,75,0.04);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
              <span style="font-size:12px; font-weight:var(--weight-bold); color:var(--color-primary);">Rental Yield Index (YTD, in Millions ₦)</span>
              <div style="display:flex; gap:8px;">
                <span style="display:inline-block; width:10px; height:10px; background:var(--color-secondary); border-radius:2px;"></span>
                <span style="font-size:10px; color:#6b7280; margin-top:-2px;">Revenue Stream</span>
              </div>
            </div>
            <div class="chart-container-svg">
              <svg width="100%" height="100%" viewBox="0 0 600 200" preserveAspectRatio="none">
                <!-- Grid Lines -->
                <line x1="40" y1="20" x2="580" y2="20" class="chart-grid-line" />
                <line x1="40" y1="60" x2="580" y2="60" class="chart-grid-line" />
                <line x1="40" y1="100" x2="580" y2="100" class="chart-grid-line" />
                <line x1="40" y1="140" x2="580" y2="140" class="chart-grid-line" />
                <line x1="40" y1="170" x2="580" y2="170" class="chart-axis" />
                
                <!-- Bars (Months Jan-Jun) -->
                <!-- Jan (1.2M) -->
                <rect x="75" y="120" width="30" height="50" class="chart-bar" rx="3" />
                <!-- Feb (1.8M) -->
                <rect x="155" y="90" width="30" height="80" class="chart-bar" rx="3" />
                <!-- Mar (2.4M) -->
                <rect x="235" y="70" width="30" height="100" class="chart-bar" rx="3" />
                <!-- Apr (2.8M) -->
                <rect x="315" y="50" width="30" height="120" class="chart-bar" rx="3" />
                <!-- May (3.9M) -->
                <rect x="395" y="30" width="30" height="140" class="chart-bar" rx="3" />
                <!-- Jun (4.8M) -->
                <rect x="475" y="15" width="30" height="155" class="chart-bar" rx="3" />

                <!-- X Axis Labels -->
                <text x="90" y="185" fill="#9CA3AF" font-size="10" text-anchor="middle">Jan</text>
                <text x="170" y="185" fill="#9CA3AF" font-size="10" text-anchor="middle">Feb</text>
                <text x="250" y="185" fill="#9CA3AF" font-size="10" text-anchor="middle">Mar</text>
                <text x="330" y="185" fill="#9CA3AF" font-size="10" text-anchor="middle">Apr</text>
                <text x="410" y="185" fill="#9CA3AF" font-size="10" text-anchor="middle">May</text>
                <text x="490" y="185" fill="#9CA3AF" font-size="10" text-anchor="middle">Jun</text>

                <!-- Y Axis Labels -->
                <text x="30" y="24" fill="#9CA3AF" font-size="10" text-anchor="end">₦5.0M</text>
                <text x="30" y="64" fill="#9CA3AF" font-size="10" text-anchor="end">₦3.0M</text>
                <text x="30" y="104" fill="#9CA3AF" font-size="10" text-anchor="end">₦1.5M</text>
                <text x="30" y="144" fill="#9CA3AF" font-size="10" text-anchor="end">₦0.5M</text>
              </svg>
            </div>
          </div>
          <!-- Demand and Popularity stats list -->
          <div style="background-color: #FAF9F6; border-radius: var(--radius-md); padding: 16px; border: 1px solid rgba(13,27,75,0.04); display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <span style="font-size:12px; font-weight:var(--weight-bold); color:var(--color-primary); display:block; margin-bottom:12px;">Neighborhood Traffic</span>
              <div style="display:flex; flex-direction:column; gap:12px;">
                <div>
                  <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:4px;">
                    <span style="font-weight:var(--weight-medium);">Lekki Phase 1</span>
                    <span style="color:var(--color-secondary); font-weight:bold;">94% Demand</span>
                  </div>
                  <div style="background-color:#E5E7EB; height:6px; border-radius:3px; overflow:hidden;">
                    <div style="width:94%; height:100%; background:var(--color-secondary);"></div>
                  </div>
                </div>
                <div>
                  <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:4px;">
                    <span style="font-weight:var(--weight-medium);">Victoria Island</span>
                    <span style="color:var(--color-secondary); font-weight:bold;">88% Demand</span>
                  </div>
                  <div style="background-color:#E5E7EB; height:6px; border-radius:3px; overflow:hidden;">
                    <div style="width:88%; height:100%; background:var(--color-secondary);"></div>
                  </div>
                </div>
                <div>
                  <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:4px;">
                    <span style="font-weight:var(--weight-medium);">Yaba Tech Hub</span>
                    <span style="color:var(--color-secondary); font-weight:bold;">82% Demand</span>
                  </div>
                  <div style="background-color:#E5E7EB; height:6px; border-radius:3px; overflow:hidden;">
                    <div style="width:82%; height:100%; background:var(--color-secondary);"></div>
                  </div>
                </div>
              </div>
            </div>
            <div style="border-top:1px solid #E5E7EB; padding-top:12px; margin-top:12px; font-size:11px; color:#6b7280;">
              Total Property Views: <strong style="color:var(--color-primary);">440 leads</strong> this week.
            </div>
          </div>
        </div>
      </div>

      <!-- Advanced Ledger and Activity Filterable Table -->
      <div class="table-card">
        <div class="table-header">
          <h3 class="card-title" style="font-size: 16px; color: var(--color-primary);">Transaction Activity Ledger</h3>
          <button class="btn btn-outline btn-sm" id="btn-export-csv" style="border-color: #D1D5DB;">💾 Export CSV Statement</button>
        </div>
        <div style="padding: 16px 24px; background-color: #FAF9F6; border-bottom: 1px solid rgba(13, 27, 75, 0.06); display: flex; gap: 12px; align-items: center; justify-content: space-between; flex-wrap: wrap;">
          <div class="table-filter-bar">
            <!-- Property filter -->
            <select class="filter-select" id="overview-filter-property">
              <option value="all" ${filterProperty === 'all' ? 'selected' : ''}>All Properties</option>
              ${state.landlordProperties.map(p => `<option value="${p.id}" ${filterProperty === String(p.id) ? 'selected' : ''}>${p.title}</option>`).join('')}
            </select>

            <!-- Status filter -->
            <select class="filter-select" id="overview-filter-status">
              <option value="all" ${filterStatus === 'all' ? 'selected' : ''}>All Statuses</option>
              <option value="completed" ${filterStatus === 'completed' ? 'selected' : ''}>Completed</option>
              <option value="pending" ${filterStatus === 'pending' ? 'selected' : ''}>Pending</option>
              <option value="system" ${filterStatus === 'system' ? 'selected' : ''}>System Log</option>
            </select>
          </div>

          <div class="search-input-wrapper" style="max-width: 280px;">
            <span class="search-input-icon">🔍</span>
            <input type="text" id="overview-search" class="search-input-field" placeholder="Search activities..." value="${searchQuery}">
          </div>
        </div>

        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Property</th>
                <th>Event Type</th>
                <th>Details</th>
                <th>Value</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${activities.length > 0 ? activities.map(act => `
                <tr>
                  <td style="white-space: nowrap; color: #6B7280;">${act.date}</td>
                  <td style="font-weight: var(--weight-semibold); color: var(--color-primary);">${act.propName}</td>
                  <td><span class="badge ${act.type.includes('Payout') ? 'badge-success' : act.type.includes('Locked') ? 'badge-info' : 'badge-warning'}">${act.type}</span></td>
                  <td>${act.details}</td>
                  <td style="font-weight: var(--weight-bold);">${act.amount ? formatNaira(act.amount) : '—'}</td>
                  <td><span class="badge ${act.status === 'Completed' ? 'badge-success' : act.status === 'Pending' ? 'badge-warning' : 'badge-info'}">${act.status}</span></td>
                </tr>
              `).join('') : `
                <tr>
                  <td colspan="6" style="text-align: center; padding: 48px; color: #9CA3AF;">No activities found matching your filters.</td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  renderPropertiesTab(state) {
    const formatNaira = (val) => '₦' + val.toLocaleString('en-US') + '/yr';
    return `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <h3 class="card-title" style="font-size: 18px; color: var(--color-primary);">Managed Properties</h3>
        <div style="display: flex; gap: 12px;">
          <button class="btn btn-outline btn-sm" id="btn-open-bulk-modal">📥 Bulk Import Units</button>
          <button class="btn btn-primary btn-sm" id="btn-open-listing-modal">+ Create Listing</button>
        </div>
      </div>

      <div class="property-listings-grid">
        ${state.landlordProperties.map(prop => {
          const totalUnits = prop.units ? prop.units.length : 1;
          const occupiedUnits = prop.units ? prop.units.filter(u => u.status === 'Occupied').length : (prop.occupied ? 1 : 0);
          const vacancies = totalUnits - occupiedUnits;
          const sampleImage = prop.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600';

          return `
            <div class="landlord-property-card">
              <div class="property-card-image" style="background-image: url('${sampleImage}');">
                <span class="badge ${vacancies > 0 ? 'badge-warning' : 'badge-success'} property-card-badge">
                  ${vacancies > 0 ? `${vacancies} Vacant` : 'Fully Leased'}
                </span>
              </div>
              <div class="property-card-body">
                <h4 class="property-card-title">${prop.title}</h4>
                <div class="property-card-location">
                  <span>📍</span> ${prop.location}, ${prop.city}
                </div>

                <div class="property-card-details">
                  <div class="property-detail-item">
                    <div class="property-detail-label">Base Rent</div>
                    <div class="property-detail-val" style="font-size: 11px;">${formatNaira(prop.rent)}</div>
                  </div>
                  <div class="property-detail-item" style="border-left: 1px solid rgba(13, 27, 75, 0.06); border-right: 1px solid rgba(13, 27, 75, 0.06);">
                    <div class="property-detail-label">Total Units</div>
                    <div class="property-detail-val">${totalUnits}</div>
                  </div>
                  <div class="property-detail-item">
                    <div class="property-detail-label">Occupied</div>
                    <div class="property-detail-val">${occupiedUnits}</div>
                  </div>
                </div>

                <!-- Unit breakdown panel -->
                <div style="background-color: #FAF9F6; border-radius: var(--radius-sm); padding: 12px; margin-bottom: 20px; font-size: 12px;">
                  <div style="font-weight: var(--weight-bold); color: var(--color-primary); margin-bottom: 8px; display:flex; justify-content:space-between; align-items:center;">
                    <span>Unit Statuses</span>
                    <span style="font-size:10px; font-weight:normal; color:#6B7280;">Vacancy Tracker</span>
                  </div>
                  <div style="display: flex; flex-direction: column; gap: 6px;">
                    ${prop.units ? prop.units.map(u => `
                      <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span>🚪 ${u.number} (${u.tenant || 'Vacant'})</span>
                        <span class="badge ${u.status === 'Occupied' ? 'badge-success' : 'badge-warning'}" style="font-size: 9px; padding: 2px 6px;">${u.status}</span>
                      </div>
                    `).join('') : `
                      <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span>🚪 General Unit (${prop.tenantName || 'Vacant'})</span>
                        <span class="badge ${prop.occupied ? 'badge-success' : 'badge-warning'}" style="font-size: 9px; padding: 2px 6px;">${prop.occupied ? 'Occupied' : 'Vacant'}</span>
                      </div>
                    `}
                  </div>
                </div>

                <div class="property-card-actions">
                  <button class="btn btn-outline btn-sm btn-edit-listing" data-id="${prop.id}" style="flex: 1; padding: 8px 0; font-size: 12px;">Edit</button>
                  <button class="btn btn-outline btn-sm btn-delete-listing" data-id="${prop.id}" style="flex: 1; padding: 8px 0; border-color: var(--color-error); color: var(--color-error); font-size: 12px;">Delete</button>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  renderApprovalsTab(state) {
    const activeAppId = state.activeLandlordApplicantId || (state.pipelineApplications[0]?.id || null);
    const selectedApp = state.pipelineApplications.find(a => a.id === activeAppId);

    const formatNaira = (val) => '₦' + val.toLocaleString('en-US');

    return `
      <div class="two-panel-layout">
        <!-- Left Panel: Applicants Queue -->
        <div class="sidebar-panel">
          <h3 class="card-title" style="font-size: 16px; color: var(--color-primary); margin-bottom: 16px;">Applicants Pipeline</h3>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            ${state.pipelineApplications.map(app => {
              const isActive = app.id === activeAppId;
              let scoreColor = 'var(--color-success)';
              if (app.matchScore < 75) scoreColor = 'var(--color-warning)';
              if (app.matchScore < 60) scoreColor = 'var(--color-error)';

              return `
                <div class="applicant-card ${isActive ? 'active' : ''}" data-id="${app.id}">
                  <div class="applicant-header">
                    <div>
                      <div class="applicant-name">${app.applicantName}</div>
                      <div class="text-sm text-muted" style="margin-top: 2px;">For: ${app.propertyName}</div>
                    </div>
                    <span class="applicant-match-pill" style="background-color: ${scoreColor};">${app.matchScore}% Match</span>
                  </div>
                  
                  <div class="insight-metric-grid">
                    <div class="insight-metric">
                      <div class="insight-label">Risk</div>
                      <div class="insight-value" style="color: ${app.riskScore.includes('High') ? 'var(--color-error)' : app.riskScore.includes('Medium') ? 'var(--color-warning)' : 'var(--color-success)'};">${app.riskScore.split(' ')[0]}</div>
                    </div>
                    <div class="insight-metric" style="border-left:1px solid #E5E7EB; border-right:1px solid #E5E7EB;">
                      <div class="insight-label">Score</div>
                      <div class="insight-value">${app.details.score}</div>
                    </div>
                    <div class="insight-metric">
                      <div class="insight-label">Status</div>
                      <div class="insight-value" style="font-size:9px;">${app.status}</div>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Right Panel: AI Recommendation & Qualifications Details -->
        <div class="main-content-panel">
          ${selectedApp ? `
            <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid rgba(13,27,75,0.06); padding-bottom: 20px; margin-bottom: 24px;">
              <div>
                <h2 class="card-title" style="color: var(--color-primary);">${selectedApp.applicantName}</h2>
                <p class="text-sm text-muted" style="margin-top: 4px;">Applying for <strong>${selectedApp.propertyName}</strong></p>
              </div>
              <div style="text-align: right;">
                <div style="font-size: 28px; font-weight: var(--weight-bold); color: var(--color-secondary);">${selectedApp.matchScore}<span style="font-size: 14px; font-weight: normal; color: #6B7280;">/100</span></div>
                <div style="font-size: 10px; text-transform: uppercase; color: #9CA3AF; font-weight: var(--weight-bold);">Overall AI Match Score</div>
              </div>
            </div>

            <!-- AI Risk Compatibility & Analysis -->
            <div style="background-color: #FAF9F6; border-radius: var(--radius-md); padding: 20px; border: 1px solid rgba(13,27,75,0.06); margin-bottom: 24px;">
              <h3 class="text-md" style="font-weight: var(--weight-bold); color: var(--color-primary); margin-bottom: 12px; display:flex; align-items:center; gap:8px;">
                <span>🤖</span> AI Underwriting Insights
              </h3>
              
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 16px;">
                <div style="background: white; padding: 12px; border-radius: var(--radius-sm); border:1px solid rgba(13,27,75,0.04);">
                  <div style="font-size: 10px; color: #9CA3AF; font-weight: var(--weight-bold); text-transform: uppercase; margin-bottom: 4px;">Affordability Index</div>
                  <div style="font-size: 14px; font-weight: var(--weight-bold); color: var(--color-primary);">${selectedApp.affordability}</div>
                </div>
                <div style="background: white; padding: 12px; border-radius: var(--radius-sm); border:1px solid rgba(13,27,75,0.04);">
                  <div style="font-size: 10px; color: #9CA3AF; font-weight: var(--weight-bold); text-transform: uppercase; margin-bottom: 4px;">Risk Assessment Profile</div>
                  <div style="font-size: 14px; font-weight: var(--weight-bold); color: ${selectedApp.riskScore.includes('High') ? 'var(--color-error)' : 'var(--color-success)'};">${selectedApp.riskScore}</div>
                </div>
              </div>

              <div style="font-size: var(--font-caption); line-height: 1.5; color: var(--color-black);">
                <strong>Recommendation Verdict:</strong> ${this.getAIRecommendationText(selectedApp)}
              </div>
            </div>

            <!-- Qualification Credentials -->
            <h3 class="text-md" style="font-weight: var(--weight-bold); color: var(--color-primary); margin-bottom: 16px; border-bottom: 1px solid rgba(13,27,75,0.06); padding-bottom: 8px;">Identity & Employment Verification</h3>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 32px;">
              <div>
                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(13,27,75,0.04);">
                  <span class="text-sm text-muted">BVN Verification</span>
                  <span class="badge badge-success" style="font-size: 10px; padding: 2px 8px;">${selectedApp.details.bvnStatus}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(13,27,75,0.04);">
                  <span class="text-sm text-muted">NIN Identity Matching</span>
                  <span class="badge ${selectedApp.details.ninStatus.includes('Failed') ? 'badge-error' : 'badge-success'}" style="font-size: 10px; padding: 2px 8px;">${selectedApp.details.ninStatus}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(13,27,75,0.04);">
                  <span class="text-sm text-muted">Biometric Selfie Validation</span>
                  <span class="badge badge-success" style="font-size: 10px; padding: 2px 8px;">Verified Match</span>
                </div>
              </div>
              <div>
                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(13,27,75,0.04);">
                  <span class="text-sm text-muted">Employer Listed</span>
                  <span style="font-size: 12px; font-weight: var(--weight-semibold);">${selectedApp.details.employer}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(13,27,75,0.04);">
                  <span class="text-sm text-muted">Verified Monthly Income</span>
                  <span style="font-size: 12px; font-weight: var(--weight-bold);">${selectedApp.details.monthlyIncome}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(13,27,75,0.04);">
                  <span class="text-sm text-muted">Bank Statement Analysis</span>
                  <span class="badge badge-success" style="font-size: 10px; padding: 2px 8px;">Cleared Yield</span>
                </div>
              </div>
            </div>

            <!-- Decision Box -->
            <div style="border-top: 1px solid rgba(13,27,75,0.06); padding-top: 24px;">
              <h3 class="text-md" style="font-weight: var(--weight-bold); color: var(--color-primary); margin-bottom: 12px;">Approve or Decline Tenancy Application</h3>
              <p class="text-sm text-muted" style="margin-bottom: 16px;">Approving will lock terms and prompt the tenant to fund the Escrow Vault.</p>
              
              <div class="form-group-landlord">
                <label for="approval-comments">Optional Landlord/Agent Notes</label>
                <textarea id="approval-comments" class="form-control-landlord" rows="3" placeholder="Write any lease clauses or check-in instructions for the tenant..."></textarea>
              </div>

              <div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 20px;">
                ${selectedApp.status === 'Pending Approval' ? `
                  <button class="btn btn-outline btn-sm btn-decline-application" data-id="${selectedApp.id}" style="border-color: var(--color-error); color: var(--color-error);">Decline Application</button>
                  <button class="btn btn-primary btn-sm btn-approve-application" data-id="${selectedApp.id}">Approve Tenancy</button>
                ` : `
                  <div class="badge ${selectedApp.status === 'Approved' ? 'badge-success' : 'badge-error'}" style="padding: 12px 24px; font-size: 14px;">
                    Application ${selectedApp.status}
                  </div>
                `}
              </div>
            </div>
          ` : `
            <div style="text-align: center; padding: 80px 24px; color: #9CA3AF;">
              <h3>No Applicants In Pipeline</h3>
              <p class="text-sm" style="margin-top: 8px;">Create property listings to start receiving qualified tenant profiles.</p>
            </div>
          `}
        </div>
      </div>
    `;
  },

  renderEscrowTab(state) {
    const formatNaira = (val) => '₦' + val.toLocaleString('en-US');

    return `
      <!-- Escrow Status Monitoring -->
      <h3 class="card-title" style="font-size: 18px; color: var(--color-primary); margin-bottom: 16px;">Active Protection Escrows</h3>
      <div class="table-card" style="margin-bottom: 32px;">
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>Property</th>
                <th>Tenant</th>
                <th>Caution Hold</th>
                <th>Rent Locked</th>
                <th>Safety Status</th>
                <th>Ready for Release?</th>
              </tr>
            </thead>
            <tbody>
              ${state.landlordEscrows.map(esc => {
                const readinessCheckedCount = Object.values(esc.readinessChecklist).filter(Boolean).length;
                const isReady = readinessCheckedCount === 4;

                return `
                  <tr>
                    <td style="font-weight: var(--weight-semibold); color: var(--color-primary);">${esc.propertyName}</td>
                    <td>${esc.tenantName}</td>
                    <td style="font-weight: var(--weight-bold);">${formatNaira(esc.cautionAmount)}</td>
                    <td style="font-weight: var(--weight-bold);">${formatNaira(esc.rentAmount)}</td>
                    <td>
                      <span class="badge ${esc.status === 'Funded' ? 'badge-info' : esc.status === 'Released' ? 'badge-success' : 'badge-warning'}">
                        ${esc.status}
                      </span>
                    </td>
                    <td>
                      ${esc.status === 'Funded' ? `
                        <button class="btn btn-primary btn-sm btn-trigger-release" data-id="${esc.id}" ${!isReady ? 'disabled style="opacity: 0.6; cursor: not-allowed;"' : ''}>
                          ${isReady ? 'Release Funds' : `Readiness Checks (${readinessCheckedCount}/4)`}
                        </button>
                      ` : `
                        <span class="badge badge-success">Disbursed</span>
                      `}
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Split panel: Property Readiness Checklist vs Dispute Resolution claim desk -->
      <div class="form-grid-2">
        <!-- Move-In Readiness Checklist -->
        <div class="main-content-panel">
          <h3 class="card-title" style="font-size: 16px; color: var(--color-primary); margin-bottom: 8px;">Property Readiness Checklist</h3>
          <p class="text-sm text-muted" style="margin-bottom: 20px;">Fulfill physical checklists to generate tenant check-in code and trigger rent disbursement.</p>
          
          <div style="margin-bottom: 16px;">
            <label for="checklist-prop-select" class="text-sm font-semibold" style="display:block; margin-bottom:6px;">Select Property</label>
            <select id="checklist-prop-select" class="form-control-landlord" style="padding: 8px 12px; font-size:13px;">
              ${state.landlordEscrows.map(esc => `<option value="${esc.id}">${esc.propertyName}</option>`).join('')}
            </select>
          </div>

          <ul class="readiness-list" id="readiness-checklist-container">
            ${this.renderReadinessItems(state)}
          </ul>
          
          <div style="margin-top: 16px; background-color: #FAF9F6; padding: 12px; border-radius: var(--radius-sm); font-size:11px; border:1px solid rgba(13,27,75,0.04);">
            💡 <em>Complete all 4 verifications to satisfy the tenancy readiness compliance standards.</em>
          </div>
        </div>

        <!-- Dispute Claim desk -->
        <div class="main-content-panel" style="border-color: var(--color-error);">
          <h3 class="card-title" style="font-size: 16px; color: var(--color-error); margin-bottom: 8px;">Dispute Claims Center</h3>
          <p class="text-sm text-muted" style="margin-bottom: 20px;">CBN compliant arbitration desk for caution deductions, premature lease terminations, or rent holds.</p>

          ${state.landlordDisputes.length > 0 ? state.landlordDisputes.map(disp => `
            <div style="background-color: var(--color-error-bg); padding: 16px; border-radius: var(--radius-md); border: 1px solid rgba(239, 68, 68, 0.2); margin-bottom: 16px;">
              <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                <strong style="font-size:13px; color:var(--color-primary);">${disp.propertyName}</strong>
                <span class="badge badge-error" style="font-size:9px;">${disp.status}</span>
              </div>
              <p class="text-xs text-muted" style="margin-bottom: 10px;">Tenant: <strong>${disp.tenantName}</strong> | Disputed Amount: <strong>${formatNaira(disp.cautionAmount)}</strong></p>
              
              <div style="font-size:12px; color:var(--color-black); margin-bottom:12px; background:white; padding:8px; border-radius:4px; border:1px solid rgba(0,0,0,0.05);">
                <strong>Incident Summary:</strong> ${disp.reason}
              </div>

              ${disp.landlordDefense ? `
                <div style="font-size:12px; color:var(--color-secondary); background:rgba(26,122,138,0.05); padding:8px; border-radius:4px; border:1px solid rgba(26,122,138,0.1);">
                  <strong>Your Defense Statement:</strong> ${disp.landlordDefense}
                </div>
              ` : `
                <div class="form-group-landlord" style="margin-bottom: 12px;">
                  <label for="dispute-defense-${disp.id}" style="font-size: 11px;">Your Response / Proof Statement</label>
                  <textarea id="dispute-defense-${disp.id}" class="form-control-landlord" rows="2" style="font-size:12px;" placeholder="Upload utility logs, paint purchase receipts or pictures to support claim..."></textarea>
                </div>
                <button class="btn btn-secondary btn-sm btn-submit-defense" data-id="${disp.id}" style="width: 100%; padding: 8px 0; font-size:12px;">Submit Defense Evidence</button>
              `}
            </div>
          `).join('') : `
            <div style="text-align: center; padding: 48px; color: #9CA3AF;">
              <p style="font-size: 13px;">No active dispute files. Your portfolio is fully compliant.</p>
            </div>
          `}
        </div>
      </div>
    `;
  },

  renderReadinessItems(state) {
    const selectedEscrowId = state.landlordSelectedReadinessEscrowId || (state.landlordEscrows[0]?.id || null);
    const escrow = state.landlordEscrows.find(e => e.id === selectedEscrowId);
    if (!escrow) return `<div style="padding:16px; color:#9CA3AF; text-align:center;">No checklist available.</div>`;

    const checklist = escrow.readinessChecklist;

    const items = [
      { key: 'painted', label: 'Walls freshly painted & disinfected' },
      { key: 'clean', label: 'Deep cleaning and sanitation completed' },
      { key: 'electricity', label: 'Electricity grid, meters & DB board certified' },
      { key: 'water', label: 'Borehole & water treatment system functional' }
    ];

    return items.map(item => {
      const isChecked = checklist[item.key];
      return `
        <li class="readiness-item" data-escrow="${escrow.id}" data-key="${item.key}">
          <div class="readiness-checkbox ${isChecked ? 'checked' : ''}" style="flex-shrink:0;"></div>
          <span class="readiness-text" style="text-decoration: ${isChecked ? 'line-through' : 'none'}; color: ${isChecked ? '#9CA3AF' : 'var(--color-black)'};">${item.label}</span>
        </li>
      `;
    }).join('');
  },

  renderRenewalsTab(state) {
    const formatNaira = (val) => '₦' + val.toLocaleString('en-US');

    return `
      <h3 class="card-title" style="font-size: 18px; color: var(--color-primary); margin-bottom: 8px;">Lease Renewal Desk</h3>
      <p class="text-sm text-muted" style="margin-bottom: 24px;">Expiries tracker. Propose rent updates directly to the tenant's dashboard before lease locks trigger.</p>

      <div class="table-card">
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>Property</th>
                <th>Tenant</th>
                <th>Lease Expiry</th>
                <th>Current Rent</th>
                <th>Proposed Rent</th>
                <th>Increment (%)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${state.landlordProperties.filter(p => p.occupied).map(prop => {
                const formatExpiry = prop.leaseEnd ? prop.leaseEnd : '2026-08-30';
                const currentStatus = prop.renewalStatus || 'Pending Review';

                return `
                  <tr>
                    <td style="font-weight: var(--weight-semibold); color: var(--color-primary);">${prop.title}</td>
                    <td>${prop.tenantName || 'Osaze Alao'}</td>
                    <td style="color: var(--color-error); font-weight: var(--weight-medium);">${formatExpiry}</td>
                    <td style="font-weight: var(--weight-bold);">${formatNaira(prop.rent)}/yr</td>
                    <td id="val-proposed-${prop.id}">${prop.proposedRent ? formatNaira(prop.proposedRent) + '/yr' : '—'}</td>
                    <td>
                      ${currentStatus === 'Pending Review' ? `
                        <div style="display:flex; align-items:center; gap:8px; max-width: 120px;">
                          <input type="number" class="form-control-landlord input-increment" data-id="${prop.id}" data-rent="${prop.rent}" value="10" min="0" max="50" style="padding: 6px 8px; font-size:12px; text-align:center;">
                          <span style="font-size:12px; font-weight:bold;">%</span>
                        </div>
                      ` : `
                        <span class="badge badge-info">${prop.incrementPercent}%</span>
                      `}
                    </td>
                    <td>
                      ${currentStatus === 'Pending Review' ? `
                        <button class="btn btn-secondary btn-sm btn-propose-renewal" data-id="${prop.id}">Propose</button>
                      ` : `
                        <span class="badge badge-success">Proposal Sent</span>
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

  getAIRecommendationText(applicant) {
    if (applicant.matchScore >= 90) {
      return `Outstanding candidate. Bank statements verify clean salary inflows on the 26th of every month. Debt-to-income ratio is low at 22%. BVN matches criminal databases with zero anomalies. Rental references indicate exit reason was lease natural end. <span style="color:var(--color-success); font-weight:bold;">Strongly Recommended.</span>`;
    } else if (applicant.matchScore >= 75) {
      return `Good candidate with steady income. Verification scores match register. Rent consumes 35% of monthly salary, leaving normal disposable funds. Recommend caution deposit of standard 10% to offset minimal variance. <span style="color:var(--color-secondary); font-weight:bold;">Recommended.</span>`;
    } else {
      return `High financial stress noted. Rent advance represents 52% of stated monthly earnings. Verification signals flagged a minor NIMC registry mismatch. Recommend seeking a guarantor or co-signer before signing the lease agreement. <span style="color:var(--color-error); font-weight:bold;">Review with Caution.</span>`;
    }
  },

  initializeState(state) {
    // Tab tracking
    if (!state.activeLandlordTab) {
      state.activeLandlordTab = 'overview';
    }

    // Properties list owned by landlord
    if (!state.landlordProperties) {
      state.landlordProperties = [
        {
          id: 1,
          title: 'Luxury 2 Bed Penthouse Duplex',
          rent: 3200000,
          bedrooms: 2,
          bathrooms: 2,
          propertyType: 'Apartment',
          location: 'Lekki Phase 1',
          city: 'Lagos',
          occupied: true,
          tenantName: 'Osaze Alao',
          leaseEnd: '2026-08-30',
          renewalStatus: 'Pending Review',
          image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600',
          units: [
            { id: 101, number: 'Duplex A', status: 'Occupied', rent: 3200000, tenant: 'Osaze Alao' },
            { id: 102, number: 'Duplex B', status: 'Vacant', rent: 3000000, tenant: null }
          ]
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
          occupied: true,
          tenantName: 'Kunle Benson',
          leaseEnd: '2026-10-15',
          renewalStatus: 'Pending Review',
          image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600',
          units: [
            { id: 201, number: 'Studio Loft 1', status: 'Occupied', rent: 1400000, tenant: 'Kunle Benson' }
          ]
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
          occupied: false,
          tenantName: null,
          leaseEnd: null,
          renewalStatus: 'N/A',
          image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600',
          units: [
            { id: 301, number: 'Serviced Flat 1A', status: 'Vacant', rent: 5500000, tenant: null },
            { id: 302, number: 'Serviced Flat 1B', status: 'Vacant', rent: 5500000, tenant: null }
          ]
        }
      ];
    }

    // Qualification Applicants queue
    if (!state.pipelineApplications) {
      state.pipelineApplications = [
        {
          id: 1,
          applicantName: 'Osaze Alao',
          propertyName: 'Luxury 2 Bed Penthouse Duplex',
          matchScore: 98,
          riskScore: 'Low Risk Profile',
          affordability: 'Excellent (Rent is 22% of salary)',
          status: 'Pending Approval',
          details: {
            bvnStatus: 'Verified Matches',
            ninStatus: 'Verified (NIMC records checked)',
            monthlyIncome: '₦1,200,000',
            employer: 'PropTech Labs Ltd',
            score: 785
          }
        },
        {
          id: 2,
          applicantName: 'Amara Okafor',
          propertyName: 'Executive 3 Bed Serviced Flat',
          matchScore: 82,
          riskScore: 'Medium Risk Profile',
          affordability: 'Good (Rent fits monthly limits)',
          status: 'Pending Approval',
          details: {
            bvnStatus: 'Verified Matches',
            ninStatus: 'Verified (NIMC check complete)',
            monthlyIncome: '₦1,500,000',
            employer: 'Access Bank PLC',
            score: 690
          }
        },
        {
          id: 3,
          applicantName: 'Tunde Bakare',
          propertyName: 'Cozy 1 Bedroom Studio Loft',
          matchScore: 58,
          riskScore: 'High Risk Profile',
          affordability: 'Strained (Rent exceeds income threshold)',
          status: 'Pending Approval',
          details: {
            bvnStatus: 'Verified Matches',
            ninStatus: 'Failed (NIMC mismatch alert)',
            monthlyIncome: '₦220,000',
            employer: 'Freelance Designer',
            score: 510
          }
        }
      ];
    }

    // Landlord Active Escrows and milestones check
    if (!state.landlordEscrows) {
      state.landlordEscrows = [
        {
          id: 1,
          propertyName: 'Luxury 2 Bed Penthouse Duplex (Duplex A)',
          tenantName: 'Osaze Alao',
          cautionAmount: 250000,
          rentAmount: 2950000,
          status: 'Funded',
          readinessChecklist: {
            painted: true,
            clean: true,
            electricity: false,
            water: false
          }
        },
        {
          id: 2,
          propertyName: 'Cozy 1 Bedroom Studio Loft (Loft 1)',
          tenantName: 'Kunle Benson',
          cautionAmount: 200000,
          rentAmount: 1200000,
          status: 'Released',
          readinessChecklist: {
            painted: true,
            clean: true,
            electricity: true,
            water: true
          }
        }
      ];
    }

    // Disputes tracker
    if (!state.landlordDisputes) {
      state.landlordDisputes = [
        {
          id: 1,
          propertyName: 'Cozy 1 Bedroom Studio Loft',
          tenantName: 'Kunle Benson',
          cautionAmount: 200000,
          reason: 'Tenant claims water damage on floorboards was present prior to tenancy. Landlord claims caution deductible required to repaint damaged drywall.',
          tenantEvidence: 'Lease check-in photos showing baseline drywall moisture marks.',
          landlordDefense: '',
          status: 'Awaiting Response'
        }
      ];
    }

    if (!state.landlordOverviewFilterProperty) state.landlordOverviewFilterProperty = 'all';
    if (!state.landlordOverviewFilterStatus) state.landlordOverviewFilterStatus = 'all';
    if (!state.landlordOverviewSearch) state.landlordOverviewSearch = '';
    if (!state.landlordSelectedReadinessEscrowId) state.landlordSelectedReadinessEscrowId = state.landlordEscrows[0]?.id || null;
  },

  init(state, navigateTo, updateState) {
    // Bind Tab Switching
    document.querySelectorAll('.landlord-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const selectedTab = e.currentTarget.getAttribute('data-tab');
        updateState({ activeLandlordTab: selectedTab });
        navigateTo('landlord');
      });
    });

    // ----------------------------------------------------
    // TAB: OVERVIEW & ANALYTICS BINDINGS
    // ----------------------------------------------------
    document.getElementById('overview-filter-property')?.addEventListener('change', (e) => {
      updateState({ landlordOverviewFilterProperty: e.target.value });
      navigateTo('landlord');
    });

    document.getElementById('overview-filter-status')?.addEventListener('change', (e) => {
      updateState({ landlordOverviewFilterStatus: e.target.value });
      navigateTo('landlord');
    });

    document.getElementById('overview-search')?.addEventListener('input', (e) => {
      // Don't re-render instantly on every keystroke, let user type, but for simple app:
      state.landlordOverviewSearch = e.target.value;
    });

    document.getElementById('overview-search')?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        updateState({ landlordOverviewSearch: e.target.value });
        navigateTo('landlord');
      }
    });

    // CSV Exporter Simulation
    document.getElementById('btn-export-csv')?.addEventListener('click', () => {
      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += "Date,Property,Event,Details,Value,Status\r\n";
      csvContent += "2026-06-21,Lekki Duplex,Deposit Locked,Caution deposit locked in Escrow by Osaze Alao,250000,Completed\r\n";
      csvContent += "2026-06-20,Yaba Studio Loft,Payout Completed,Mrs. Coker Yaba rent payout cleared,1200000,Completed\r\n";
      csvContent += "2026-06-18,VI Serviced Flat,Inspection Scheduled,Amara Okafor physical check scheduled,0,Pending\r\n";
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "haven_portfolio_statement.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      alert("Havens Ledger CSV downloaded successfully. CBN Compliance Verified.");
    });

    // ----------------------------------------------------
    // TAB: PROPERTY PORTFOLIO & MODAL FORM BINDINGS
    // ----------------------------------------------------
    const addModal = document.getElementById('add-property-modal');
    const bulkModal = document.getElementById('bulk-upload-modal');

    // Quick add floating button
    document.getElementById('btn-quick-listing-modal')?.addEventListener('click', () => {
      if (addModal) addModal.style.display = 'flex';
    });

    document.getElementById('btn-open-listing-modal')?.addEventListener('click', () => {
      if (addModal) addModal.style.display = 'flex';
    });

    document.getElementById('modal-close-btn')?.addEventListener('click', () => {
      if (addModal) addModal.style.display = 'none';
    });

    document.getElementById('btn-cancel-modal')?.addEventListener('click', () => {
      if (addModal) addModal.style.display = 'none';
    });

    // Handle create listing form submission
    document.getElementById('add-property-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const title = document.getElementById('prop-title').value;
      const location = document.getElementById('prop-location').value;
      const city = document.getElementById('prop-city').value;
      const rent = parseInt(document.getElementById('prop-rent').value);
      const caution = parseInt(document.getElementById('prop-caution').value);
      const bedrooms = parseInt(document.getElementById('prop-bedrooms').value);
      const bathrooms = parseInt(document.getElementById('prop-bathrooms').value);
      const rules = document.getElementById('prop-rules').value || 'Standard rules apply.';
      
      // Get checked amenities
      const amenities = [];
      document.querySelectorAll('input[name="amenity"]:checked').forEach(c => {
        amenities.push(c.value);
      });

      const newProp = {
        id: state.landlordProperties.length + 1,
        title,
        location,
        city,
        rent,
        cautionDeposit: caution,
        bedrooms,
        bathrooms,
        propertyType: 'Apartment',
        occupied: false,
        tenantName: null,
        leaseEnd: null,
        renewalStatus: 'N/A',
        image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600',
        units: [
          { id: Date.now() + 1, number: 'Unit A', status: 'Vacant', rent: rent, tenant: null }
        ]
      };

      const updatedProperties = [...state.landlordProperties, newProp];
      
      // Log event
      state.notifications.unshift({
        id: Date.now(),
        type: 'verification',
        text: `New Listing Approved: "${title}" registered on Haven Property index.`,
        time: 'Just now',
        read: false
      });

      updateState({ landlordProperties: updatedProperties });
      if (addModal) addModal.style.display = 'none';
      alert(`Property Listing "${title}" created successfully! It is now live on the Discovery maps.`);
      navigateTo('landlord');
    });

    // Delete listing
    document.querySelectorAll('.btn-delete-listing').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        if (confirm("Are you sure you want to delete this listing from Haven? This will remove it from search listings.")) {
          const updated = state.landlordProperties.filter(p => p.id !== id);
          updateState({ landlordProperties: updated });
          alert("Listing deleted.");
          navigateTo('landlord');
        }
      });
    });

    // Edit listing simulation
    document.querySelectorAll('.btn-edit-listing').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        const prop = state.landlordProperties.find(p => p.id === id);
        if (prop) {
          alert(`Editing "${prop.title}": Pre-populating Listing Builder.`);
          // Populate fields
          document.getElementById('prop-title').value = prop.title;
          document.getElementById('prop-location').value = prop.location;
          document.getElementById('prop-rent').value = prop.rent;
          document.getElementById('prop-caution').value = prop.cautionDeposit;
          if (addModal) addModal.style.display = 'flex';
        }
      });
    });

    // ----------------------------------------------------
    // BULK UNIT UPLOAD BINDINGS
    // ----------------------------------------------------
    document.getElementById('btn-open-bulk-modal')?.addEventListener('click', () => {
      if (bulkModal) bulkModal.style.display = 'flex';
    });

    document.getElementById('bulk-close-btn')?.addEventListener('click', () => {
      if (bulkModal) bulkModal.style.display = 'none';
    });

    document.getElementById('btn-cancel-bulk')?.addEventListener('click', () => {
      if (bulkModal) bulkModal.style.display = 'none';
    });

    document.getElementById('btn-generate-mock-csv')?.addEventListener('click', () => {
      const csvBox = document.getElementById('bulk-csv-data');
      if (csvBox) {
        csvBox.value = `Unit 3A,3400000,Vacant\nUnit 3B,3400000,Vacant\nUnit 3C,3600000,Occupied\nUnit 3D,3800000,Vacant`;
      }
    });

    document.getElementById('btn-import-csv')?.addEventListener('click', () => {
      const propertyId = parseInt(document.getElementById('bulk-property-select').value);
      const csvText = document.getElementById('bulk-csv-data').value;

      if (!csvText.trim()) {
        alert("Please enter CSV rows first.");
        return;
      }

      // Parse lines
      const rows = csvText.split('\n');
      const parsedUnits = [];
      rows.forEach(row => {
        const cols = row.split(',');
        if (cols.length >= 2) {
          parsedUnits.push({
            id: Date.now() + Math.random(),
            number: cols[0].trim(),
            rent: parseInt(cols[1].trim()) || 2000000,
            status: cols[2]?.trim() || 'Vacant',
            tenant: cols[2]?.trim() === 'Occupied' ? 'Assigned Tenant' : null
          });
        }
      });

      // Update property units
      const updated = state.landlordProperties.map(p => {
        if (p.id === propertyId) {
          const currentUnits = p.units || [];
          return { ...p, units: [...currentUnits, ...parsedUnits] };
        }
        return p;
      });

      updateState({ landlordProperties: updated });
      if (bulkModal) bulkModal.style.display = 'none';
      alert(`Successfully imported ${parsedUnits.length} units into the property tracker!`);
      navigateTo('landlord');
    });

    // ----------------------------------------------------
    // TAB: AI TENANT APPROVAL PIPELINE BINDINGS
    // ----------------------------------------------------
    document.querySelectorAll('.applicant-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        updateState({ activeLandlordApplicantId: id });
        navigateTo('landlord');
      });
    });

    // Approve applicant
    document.querySelector('.btn-approve-application')?.addEventListener('click', (e) => {
      const id = parseInt(e.currentTarget.getAttribute('data-id'));
      const applicant = state.pipelineApplications.find(a => a.id === id);
      const comments = document.getElementById('approval-comments')?.value || '';

      if (applicant) {
        // Update pipeline application status
        const updatedPipeline = state.pipelineApplications.map(app => {
          if (app.id === id) return { ...app, status: 'Approved' };
          return app;
        });

        // Add application to global leasing pipeline if applicant name matches tenant
        if (applicant.applicantName === 'Osaze Alao') {
          // Update global state applications status
          state.applications = state.applications.map(app => {
            if (app.propertyId === 1) return { ...app, status: 'Approved', actionRequired: 'Fund Escrow to release move-in checklist' };
            return app;
          });
        }

        // Add notification
        state.notifications.unshift({
          id: Date.now(),
          type: 'escrow',
          text: `Application Approved: Tenancy approved for ${applicant.applicantName}. Escrow pending funding.`,
          time: 'Just now',
          read: false
        });

        updateState({ pipelineApplications: updatedPipeline });
        alert(`Application for ${applicant.applicantName} approved! Tenant has been notified to fund the Escrow Vault.`);
        navigateTo('landlord');
      }
    });

    // Decline applicant
    document.querySelector('.btn-decline-application')?.addEventListener('click', (e) => {
      const id = parseInt(e.currentTarget.getAttribute('data-id'));
      const applicant = state.pipelineApplications.find(a => a.id === id);

      if (applicant) {
        if (confirm(`Are you sure you want to decline ${applicant.applicantName}? This will reject their application.`)) {
          const updatedPipeline = state.pipelineApplications.map(app => {
            if (app.id === id) return { ...app, status: 'Rejected' };
            return app;
          });

          // Add notification
          state.notifications.unshift({
            id: Date.now(),
            type: 'verification',
            text: `Application Rejected: Tenancy application declined for ${applicant.applicantName}.`,
            time: 'Just now',
            read: false
          });

          updateState({ pipelineApplications: updatedPipeline });
          alert(`Application rejected.`);
          navigateTo('landlord');
        }
      }
    });

    // ----------------------------------------------------
    // TAB: ESCROW MONITORING & READINESS CHECKLIST
    // ----------------------------------------------------
    // Dropdown change for readiness checklist
    document.getElementById('checklist-prop-select')?.addEventListener('change', (e) => {
      updateState({ landlordSelectedReadinessEscrowId: parseInt(e.target.value) });
      navigateTo('landlord');
    });

    // Toggle checklist checkbox
    document.querySelectorAll('.readiness-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const escrowId = parseInt(e.currentTarget.getAttribute('data-escrow'));
        const checkKey = e.currentTarget.getAttribute('data-key');
        
        const updatedEscrows = state.landlordEscrows.map(esc => {
          if (esc.id === escrowId) {
            const checklist = { ...esc.readinessChecklist };
            checklist[checkKey] = !checklist[checkKey];
            
            // Check if all checklist items are now true
            const allPassed = Object.values(checklist).every(Boolean);
            let currentStatus = esc.status;
            if (allPassed && esc.status === 'Funded') {
              // Mark as ready or keep funded
            }
            return { ...esc, readinessChecklist: checklist };
          }
          return esc;
        });

        updateState({ landlordEscrows: updatedEscrows });
        navigateTo('landlord');
      });
    });

    // Trigger Escrow Release
    document.querySelectorAll('.btn-trigger-release').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        const esc = state.landlordEscrows.find(e => e.id === id);

        if (esc) {
          const updatedEscrows = state.landlordEscrows.map(e => {
            if (e.id === id) return { ...e, status: 'Released' };
            return e;
          });

          // Add a mock transaction of payout
          state.transactions.unshift({
            id: Date.now(),
            type: 'Payout to Landlord',
            amount: esc.rentAmount,
            reference: `TXN-${Math.floor(1000 + Math.random()*9000)}-LA`,
            date: '2026-06-22',
            status: 'Cleared',
            description: `Rent advance disbursement for ${esc.propertyName}`
          });

          // Add notification
          state.notifications.unshift({
            id: Date.now(),
            type: 'escrow',
            text: `Escrow Released: Rent payout of ${formatNaira(esc.rentAmount)} released to your wallet.`,
            time: 'Just now',
            read: false
          });

          // Update wallet balance for landlord if we wanted to (currently mocked)
          updateState({ 
            landlordEscrows: updatedEscrows,
            walletBalance: state.walletBalance + esc.rentAmount
          });

          alert(`Escrow Released! Payout of ₦${esc.rentAmount.toLocaleString()} has been credited to your active wallet.`);
          navigateTo('landlord');
        }
      });
    });

    // Submit dispute defense response
    document.querySelectorAll('.btn-submit-defense').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        const defenseText = document.getElementById(`dispute-defense-${id}`).value;

        if (!defenseText.trim()) {
          alert("Please enter a response statement first.");
          return;
        }

        const updatedDisputes = state.landlordDisputes.map(disp => {
          if (disp.id === id) return { ...disp, landlordDefense: defenseText, status: 'Under Arbitration (CBN Mediation)' };
          return disp;
        });

        // Add notification
        state.notifications.unshift({
          id: Date.now(),
          type: 'verification',
          text: `Dispute Defense Filed: Documents logged for CBN trust arbitration.`,
          time: 'Just now',
          read: false
        });

        updateState({ landlordDisputes: updatedDisputes });
        alert("Your defense statement and proof have been submitted to the compliance arbitrator.");
        navigateTo('landlord');
      });
    });

    // Helper for currency format
    function formatNaira(val) {
      return '₦' + val.toLocaleString('en-US');
    }

    // ----------------------------------------------------
    // TAB: RENEWAL MANAGER BINDINGS
    // ----------------------------------------------------
    // Update live proposal preview when increment is input
    document.querySelectorAll('.input-increment').forEach(input => {
      input.addEventListener('input', (e) => {
        const id = parseInt(e.target.getAttribute('data-id'));
        const baseRent = parseInt(e.target.getAttribute('data-rent'));
        const percent = parseInt(e.target.value) || 0;
        
        const proposedRent = Math.round(baseRent * (1 + percent / 100));
        const previewElement = document.getElementById(`val-proposed-${id}`);
        if (previewElement) {
          previewElement.innerHTML = `<strong>${formatNaira(proposedRent)}/yr</strong>`;
        }
      });
    });

    // Submit renewal proposal
    document.querySelectorAll('.btn-propose-renewal').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        const input = document.querySelector(`.input-increment[data-id="${id}"]`);
        const baseRent = parseInt(input.getAttribute('data-rent'));
        const percent = parseInt(input.value) || 10;
        const proposedRent = Math.round(baseRent * (1 + percent / 100));

        const updatedProperties = state.landlordProperties.map(p => {
          if (p.id === id) {
            return {
              ...p,
              renewalStatus: 'Proposal Sent',
              incrementPercent: percent,
              proposedRent: proposedRent
            };
          }
          return p;
        });

        // Add notification
        state.notifications.unshift({
          id: Date.now(),
          type: 'match',
          text: `Renewal Proposal: Offered 12-month extension with ${percent}% increment on ${state.landlordProperties.find(p => p.id === id).title}.`,
          time: 'Just now',
          read: false
        });

        updateState({ landlordProperties: updatedProperties });
        alert(`Renewal lease proposal sent! Proposed rent: ₦${proposedRent.toLocaleString()}/yr. Tenant will receive a push alert.`);
        navigateTo('landlord');
      });
    });
  }
};
