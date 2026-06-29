// Leasing Workflow Screen
export const LeasingWorkflow = {
  render(state) {
    const activeTab = state.activeLeasingTab || 'applications';
    const apps = state.applications || [];
    const inspections = state.inspections || [];
    const activeLandlordId = state.activeChatLandlordId || 'alabi';
    const chats = state.chats || [];
    
    // Sidebar tabs definition
    const tabs = [
      { id: 'applications', name: 'Applications Tracking', icon: '&#128196;' },
      { id: 'inspections', name: 'Inspection Scheduler', icon: '&#128197;' },
      { id: 'lease-studio', name: 'Digital Lease Studio', icon: '&#9997;' }
    ];

    const tabsHTML = tabs.map(t => `
      <button class="dashboard-tab-btn ${activeTab === t.id ? 'active' : ''}" data-tab="${t.id}">
        <span>${t.icon}</span> ${t.name}
      </button>
    `).join('');

    return `
      <div class="dashboard-wrapper">
        <div class="container">
          
          <div class="dashboard-layout">
            <!-- Sidebar Navigation -->
            <div class="dashboard-sidebar-menu">
              <div style="font-weight:bold; font-size:12px; color:var(--color-secondary); padding:0 16px 8px 16px; border-bottom:1px solid #E5E7EB; margin-bottom:12px; text-transform:uppercase; letter-spacing:0.05em;">Leasing Workflow</div>
              ${tabsHTML}
            </div>

            <!-- Main Workflows area -->
            <div class="dashboard-content-area">
              
              <!-- TAB 1: APPLICATIONS & TRACKING -->
              ${activeTab === 'applications' ? this.renderApplicationsTab(state, apps) : ''}

              <!-- TAB 2: INSPECTIONS SCHEDULER -->
              ${activeTab === 'inspections' ? this.renderInspectionsTab(state, inspections) : ''}

              <!-- TAB 3: LEASE SIGN STUDIO -->
              ${activeTab === 'lease-studio' ? this.renderLeaseStudioTab(state) : ''}

              <!-- TAB 4: LANDLORD CHAT CENTER REMOVED -->

            </div>
          </div>

        </div>
      </div>
    `;
  },

  // Applications Tab
  renderApplicationsTab(state, apps) {
    const appRowsHTML = apps.map(app => {
      let badgeClass = 'badge-pending';
      if (app.status === 'Approved') badgeClass = 'badge-approved';
      if (app.status === 'Rejected') badgeClass = 'badge-rejected';
      if (app.status === 'Withdrawn') badgeClass = 'badge-action';

      let actionsHTML = '';
      if (app.status === 'Approved') {
        actionsHTML = `
          <div style="display:flex; gap:12px; margin-top:12px;">
            <button class="btn btn-primary btn-sm btn-link-schedule" data-id="${app.propertyId}">Schedule Inspection</button>
            <button class="btn btn-outline btn-sm btn-link-lease" data-id="${app.propertyId}">Review Lease</button>
          </div>
        `;
      } else if (app.status === 'Under Review') {
        actionsHTML = `<p style="font-size:12px; color:#6B7280; font-style:italic; margin-top:8px;">Landlord is currently auditing credit matching statements. No action required.</p>`;
      } else if (app.status === 'Rejected') {
        actionsHTML = `<p style="font-size:12px; color:var(--color-error); font-weight:500; margin-top:8px;">Reason: ${app.actionRequired}</p>`;
      }

      return `
        <div class="card" style="padding:24px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
          <div style="flex:1; text-align:left;">
            <div style="display:flex; align-items:center; gap:12px; margin-bottom:8px;">
              <h3 style="font-size:16px; font-weight:bold; margin:0; color:var(--color-primary);">${app.title}</h3>
              <span class="badge ${badgeClass}">${app.status}</span>
            </div>
            <p style="font-size:12px; color:#6B7280; margin:0;">Landlord: <strong>${app.landlord}</strong> &bull; Rent: <strong>₦ ${app.rent.toLocaleString()} / Yr</strong></p>
            <p style="font-size:12px; margin-top:8px; color:var(--color-primary);">Next Action: <strong>${app.actionRequired}</strong></p>
            ${actionsHTML}
          </div>
          
          ${app.status !== 'Withdrawn' && app.status !== 'Rejected' ? `
            <button class="btn btn-outline btn-sm btn-withdraw-app" data-id="${app.id}" style="border-color:var(--color-error); color:var(--color-error); background:none; padding:6px 12px; font-size:11px;">Withdraw Application</button>
          ` : ''}
        </div>
      `;
    }).join('');

    return `
      <div style="margin-bottom:16px;">
        <h2 class="section-header">Rental Applications Tracking</h2>
        <p class="text-sm text-muted">Verify qualification status logs and lease executions for applied properties.</p>
      </div>
      
      <div style="display:flex; flex-direction:column; gap:20px;">
        ${appRowsHTML}
      </div>
    `;
  },

  // Inspections Tab
  renderInspectionsTab(state, inspections) {
    const activeDate = state.selectedInspectionDate || 25;
    const activeSlot = state.selectedTimeSlot || '10:30 AM';
    const isVirtual = state.isVirtualInspection !== false;

    // Exception banners
    let exceptionAlerts = '';
    if (state.mockConfig?.inspectionNoShow) {
      exceptionAlerts += `
        <div style="background-color:var(--color-error-bg); border-left:6px solid var(--color-error); padding:16px; border-radius:12px; margin-bottom:20px; font-size:13px; color:var(--color-primary); font-weight:500;">
          &#9888; <strong>Inspection No-Show Registered:</strong> Landlord Chief Alabi logged a physical no-show for Lekki Penthouse. Please reschedule within 48 hours to maintain eligibility.
        </div>
      `;
    }
    if (state.mockConfig?.landlordCancellation) {
      exceptionAlerts += `
        <div style="background-color:var(--color-warning-bg); border-left:6px solid var(--color-warning); padding:16px; border-radius:12px; margin-bottom:20px; font-size:13px; color:var(--color-primary); font-weight:500;">
          &#9888; <strong>Landlord Cancelled Scheduled Walkthrough:</strong> Mrs. Funmi Coker cancelled the Yaba Studio Loft walkthrough due to building inspection scheduling conflicts. Please book another date below.
        </div>
      `;
    }

    // Render calendar cells (Lagos timezone - June 2026 starting Monday)
    const daysHTML = [];
    // June 1st Monday -> offset 1 blank cell for Sunday
    daysHTML.push('<div class="calendar-cell muted"></div>');
    for (let i = 1; i <= 30; i++) {
      const isSelected = activeDate === i;
      daysHTML.push(`
        <div class="calendar-cell ${isSelected ? 'active' : ''} btn-calendar-select" data-day="${i}">
          ${i}
        </div>
      `);
    }

    return `
      <div style="margin-bottom:16px;">
        <h2 class="section-header">Property Walkthrough & Inspection Scheduler</h2>
        <p class="text-sm text-muted">Book virtual HD video tours or schedule physical viewings with verified landlords.</p>
      </div>

      ${exceptionAlerts}

      <div style="display:grid; grid-template-columns: 1.2fr 0.8fr; gap:24px; align-items:start;">
        <!-- Booking Panel -->
        <div class="card" style="padding:24px; display:flex; flex-direction:column; gap:20px;">
          <h3 class="card-title" style="font-size:15px; margin:0;">Select Date & Time</h3>
          
          <!-- Mode Toggle -->
          <div style="display:flex; background:#F3F4F6; padding:4px; border-radius:12px;">
            <button class="auth-tab ${isVirtual ? 'active' : ''}" id="btn-toggle-virtual" style="padding:8px; font-size:12px;">Virtual Tour (Zoom/Meet)</button>
            <button class="auth-tab ${!isVirtual ? 'active' : ''}" id="btn-toggle-physical" style="padding:8px; font-size:12px;">Physical Walkthrough</button>
          </div>

          <!-- Calendar -->
          <div class="calendar-widget">
            <div class="calendar-header-row">
              <span>June 2026</span>
              <span style="font-size:12px; color:#6B7280;">Lagos Timezone</span>
            </div>
            <div class="calendar-days-grid">
              <div class="calendar-day-label">Su</div>
              <div class="calendar-day-label">Mo</div>
              <div class="calendar-day-label">Tu</div>
              <div class="calendar-day-label">We</div>
              <div class="calendar-day-label">Th</div>
              <div class="calendar-day-label">Fr</div>
              <div class="calendar-day-label">Sa</div>
              ${daysHTML.join('')}
            </div>
          </div>

          <!-- Time slots -->
          <div>
            <label class="form-label" style="font-size:12px; margin-bottom:8px; display:block;">Select Time Slot</label>
            <div class="time-slots-grid">
              <button class="time-slot-btn ${activeSlot === '09:00 AM' ? 'active' : ''}" data-time="09:00 AM">09:00 AM</button>
              <button class="time-slot-btn ${activeSlot === '10:30 AM' ? 'active' : ''}" data-time="10:30 AM">10:30 AM</button>
              <button class="time-slot-btn ${activeSlot === '01:00 PM' ? 'active' : ''}" data-time="01:00 PM">01:00 PM</button>
              <button class="time-slot-btn ${activeSlot === '04:00 PM' ? 'active' : ''}" data-time="04:00 PM">04:00 PM</button>
            </div>
          </div>

          <button class="btn btn-primary" id="btn-schedule-insp-submit" style="width:100%;">Schedule Walkthrough</button>
        </div>

        <!-- Upcoming / History -->
        <div class="card" style="padding:20px; display:flex; flex-direction:column; gap:16px;">
          <h3 class="card-title" style="font-size:15px; margin:0;">Upcoming Schedules</h3>
          <div style="display:flex; flex-direction:column; gap:12px;">
            ${inspections.length > 0 ? inspections.map(insp => `
              <div style="padding:12px; background:#FAF9F6; border:1px solid #E5E7EB; border-radius:10px; font-size:11px; text-align:left;">
                <div style="font-weight:bold; color:var(--color-primary); margin-bottom:4px;">${insp.title}</div>
                <div style="color:#4B5563; margin-bottom:2px;">Date: <strong>June ${insp.date}, 2026</strong> &bull; Time: <strong>${insp.time}</strong></div>
                <div style="color:#6B7280;">Type: <strong>${insp.type}</strong> &bull; Status: <span class="badge badge-approved" style="font-size:9px; padding:2px 6px;">${insp.status}</span></div>
                <div style="display:flex; gap:8px; margin-top:8px; border-top:1px solid #E5E7EB; padding-top:8px;">
                  <button class="btn btn-outline btn-sm reschedule-insp-btn" data-id="${insp.id}" style="padding:4px 8px; font-size:9px;">Reschedule</button>
                  <button class="btn btn-outline btn-sm cancel-insp-btn" data-id="${insp.id}" style="padding:4px 8px; font-size:9px; border-color:var(--color-error); color:var(--color-error);">Cancel</button>
                </div>
              </div>
            `).join('') : '<div class="text-caption text-muted">No inspections booked.</div>'}
          </div>
        </div>
      </div>
    `;
  },

  // Lease Sign Studio Tab
  renderLeaseStudioTab(state) {
    const lease = state.activeLeaseAgreement || {};
    const isSigned = lease.status === 'Signed' || lease.status === 'Executed';

    return `
      <div style="margin-bottom:16px;">
        <h2 class="section-header">Digital Lease Studio</h2>
        <p class="text-sm text-muted">Review, countersign, and execute standardized digital tenancy agreements.</p>
      </div>

      <div style="display:grid; grid-template-columns: 1.7fr 1.3fr; gap:32px; align-items:start;">
        <!-- Lease Paper -->
        <div class="lease-document-paper">
          <h3>Residential Tenancy Agreement</h3>
          <p class="text-xs text-muted" style="text-align:center; margin-bottom:16px;">SECURED VIA HAVEN PLATFORM COMPLIANCE ENVELOPE</p>
          
          <div class="lease-clause-block">
            <div class="lease-clause-title">1. Parting Entities</div>
            <p>This agreement is Counter-Signed between landlord <strong>${lease.landlordName}</strong> and qualified tenant <strong>Osaze Alao</strong> on June 22, 2026.</p>
          </div>

          <div class="lease-clause-block">
            <div class="lease-clause-title">2. Property details & Rent Dues</div>
            <p>The tenancy is subject to lease on <strong>${lease.propertyTitle}</strong>. Annual rent dues are fixed at <strong>₦ ${lease.rent.toLocaleString()}</strong>, caution deposits locked in Haven Escrow at ₦ 250,000.</p>
          </div>

          <div class="lease-clause-block">
            <div class="lease-clause-title">3. Repair Obligations</div>
            <p>Landlord guarantees structural structural maintenance (plumbing, structural cracks, power grids). Tenant represents internal repairs matches up to ₦ 50,000 caution thresholds.</p>
          </div>

          <div class="lease-clause-block">
            <div class="lease-clause-title">4. Termination Terms</div>
            <p>Either entity requires a minimum of 3-month written notice period before vacating. Refund of caution deposit is fully handled under Haven Escrow dispute resolutions protocols.</p>
          </div>
        </div>

        <!-- Signature panel -->
        <div class="card" style="padding:24px; text-align:left;">
          <h3 class="card-title" style="font-size:15px; margin-bottom:16px;">Agreement Execution</h3>
          
          ${isSigned ? `
            <div class="text-center" style="padding:16px 0;">
              <div class="executed-stamp-mark">Executed</div>
              <p style="font-size:12px; font-weight:bold; color:var(--color-primary); margin-top:12px;">Signed by Tenant: <span style="font-family:'Brush Script MT', cursive; font-size:20px; color:#1E3A8A;">${lease.tenantSignature}</span></p>
              <p style="font-size:12px; font-weight:bold; color:var(--color-primary);">Signed by Landlord: <span style="font-family:'Brush Script MT', cursive; font-size:20px; color:#1E3A8A;">${lease.landlordSignature}</span></p>
              <div style="background:#F0FDF4; padding:12px; border-radius:8px; font-size:11px; margin-top:20px; border:1px solid rgba(34,197,94,0.2); color:var(--color-success); font-weight:bold;">
                Lease Counter-Signed. Rent payment caution is due in Escrow.
              </div>
            </div>
          ` : `
            <form id="lease-signature-form">
              <div class="form-group">
                <label class="form-label" for="lease-sig-input">Type Your Full Name to Sign</label>
                <input class="form-input" style="padding:10px;" type="text" id="lease-sig-input" placeholder="e.g. Osaze Alao" required>
              </div>

              <!-- Cursive preview -->
              <div style="border:1px solid #E5E7EB; border-radius:12px; padding:24px; text-align:center; background:#F9FAFB; margin-bottom:20px; height:80px; display:flex; align-items:center; justify-content:center; overflow:hidden;">
                <span id="cursive-sig-preview" style="font-family:'Brush Script MT', cursive; font-size:32px; color:#1E3A8A; display:none;"></span>
                <span id="cursive-sig-placeholder" style="color:#9CA3AF; font-size:12px; font-style:italic;">Signature Preview</span>
              </div>

              <div class="form-group">
                <label class="checkbox-label" style="font-size:11px; line-height:1.4;">
                  <input type="checkbox" required>
                  I certify that I have read the clauses, agree to the rent deposit rates, and validate this signature as legally counter-binding.
                </label>
              </div>

              <button type="submit" class="btn btn-primary" style="width:100%; margin-top:16px;">Apply Digital Signature</button>
            </form>
          `}
        </div>
      </div>
    `;
  },

  init(state, navigateTo, updateState) {
    const activeTab = state.activeLeasingTab || 'applications';
    const activeLandlordId = state.activeChatLandlordId || 'alabi';
    const chats = state.chats || [];

    // 1. Tab switches
    document.querySelectorAll('.dashboard-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        updateState({ activeLeasingTab: tab });
        navigateTo('leasing');
      });
    });

    // 2. Application actions (Withdraw, links)
    document.querySelectorAll('.btn-withdraw-app').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = parseInt(btn.getAttribute('data-id'));
        
        const updatedApps = state.applications.map(app => {
          if (app.id === id) return { ...app, status: 'Withdrawn', actionRequired: 'Application withdrawn by tenant' };
          return app;
        });

        // Log timeline
        const targetApp = state.applications.find(app => app.id === id);
        const newTimeline = [
          {
            id: Date.now(),
            type: 'Application',
            text: `Withdrew application for: ${targetApp?.title}`,
            date: new Date().toISOString().split('T')[0],
            status: 'Completed'
          },
          ...state.timeline
        ];

        updateState({
          applications: updatedApps,
          timeline: newTimeline
        });

        alert("Application successfully withdrawn.");
        navigateTo('leasing');
      });
    });

    // Links to Inspections Tab
    document.querySelectorAll('.btn-link-schedule').forEach(btn => {
      btn.addEventListener('click', () => {
        updateState({ activeLeasingTab: 'inspections', selectedInspectionDate: 25 });
        navigateTo('leasing');
      });
    });

    // Links to Lease Studio Tab
    document.querySelectorAll('.btn-link-lease').forEach(btn => {
      btn.addEventListener('click', () => {
        updateState({ activeLeasingTab: 'lease-studio' });
        navigateTo('leasing');
      });
    });

    // 3. Inspection scheduler date/time slots clicks
    document.querySelectorAll('.btn-calendar-select').forEach(cell => {
      cell.addEventListener('click', () => {
        const day = parseInt(cell.getAttribute('data-day'));
        updateState({ selectedInspectionDate: day });
        navigateTo('leasing');
      });
    });

    // Time slots selectors
    document.querySelectorAll('.time-slot-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const time = btn.getAttribute('data-time');
        updateState({ selectedTimeSlot: time });
        navigateTo('leasing');
      });
    });

    // Virtual / Physical toggle buttons
    document.getElementById('btn-toggle-virtual')?.addEventListener('click', () => {
      updateState({ isVirtualInspection: true });
      navigateTo('leasing');
    });
    document.getElementById('btn-toggle-physical')?.addEventListener('click', () => {
      updateState({ isVirtualInspection: false });
      navigateTo('leasing');
    });

    // Submit Inspection Booking
    document.getElementById('btn-schedule-insp-submit')?.addEventListener('click', () => {
      const day = state.selectedInspectionDate || 25;
      const time = state.selectedTimeSlot || '10:30 AM';
      const isVirtual = state.isVirtualInspection !== false;

      const newInsp = {
        id: Date.now(),
        propertyId: 2,
        title: 'Cozy 1 Bedroom Studio Loft',
        landlord: 'Mrs. Funmi Coker',
        date: `June ${day}, 2026`,
        time: time,
        type: isVirtual ? 'Virtual HD Tour (Zoom)' : 'Physical Walkthrough',
        status: 'Scheduled'
      };

      // Update application action to next step
      const updatedApps = state.applications.map(app => {
        if (app.propertyId === 2) return { ...app, actionRequired: 'Inspection Scheduled. Once passed, review lease.' };
        return app;
      });

      // Update timeline
      const newTimeline = [
        {
          id: Date.now(),
          type: 'Inspection',
          text: `Scheduled walkthrough for Cozy Loft: June ${day} at ${time}`,
          date: new Date().toISOString().split('T')[0],
          status: 'Completed'
        },
        ...state.timeline
      ];

      // Update notifications
      const newNotifications = [
        {
          id: Date.now(),
          type: 'verification',
          text: `Inspection Scheduled: ${newInsp.type} on June ${day} at ${time}.`,
          time: 'Just now',
          read: false
        },
        ...state.notifications
      ];

      updateState({
        inspections: [...state.inspections, newInsp],
        applications: updatedApps,
        timeline: newTimeline,
        notifications: newNotifications
      });

      alert(`Walkthrough Scheduled Successfully! \nType: ${newInsp.type} \nDate: June ${day}, 2026 \nTime: ${time}`);
      
      // Auto-simulate passing walkthrough -> switches Yaba Loft next action to Lease Review
      setTimeout(() => {
        const passedApps = state.applications.map(app => {
          if (app.propertyId === 2) return { ...app, actionRequired: 'Review & Sign Lease' };
          return app;
        });
        updateState({ applications: passedApps });
      }, 3000);

      navigateTo('leasing');
    });

    // Reschedule upcoming inspection
    document.querySelectorAll('.reschedule-insp-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        alert("Select a new date/time on the scheduler calendar on the left, then click schedule.");
      });
    });

    // Cancel upcoming inspection
    document.querySelectorAll('.cancel-insp-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'));
        const filtered = state.inspections.filter(insp => insp.id !== id);
        updateState({ inspections: filtered });
        alert("Inspection cancelled successfully.");
        navigateTo('leasing');
      });
    });

    // 4. Lease signature script preview
    const sigInput = document.getElementById('lease-sig-input');
    sigInput?.addEventListener('input', () => {
      const preview = document.getElementById('cursive-sig-preview');
      const placeholder = document.getElementById('cursive-sig-placeholder');
      
      if (preview && placeholder) {
        if (sigInput.value.trim()) {
          preview.innerText = sigInput.value.trim();
          preview.style.display = 'block';
          placeholder.style.display = 'none';
        } else {
          preview.style.display = 'none';
          placeholder.style.display = 'block';
        }
      }
    });

    // Submit Lease Signature
    const sigForm = document.getElementById('lease-signature-form');
    sigForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = sigInput.value.trim();

      const newLease = {
        ...state.activeLeaseAgreement,
        status: 'Signed',
        tenantSignature: val
      };

      // Update application next action
      const updatedApps = state.applications.map(app => {
        if (app.propertyId === 2) return { ...app, actionRequired: 'Agreement Counter-Signed. Rent payment caution due.' };
        return app;
      });

      // Update timeline
      const newTimeline = [
        {
          id: Date.now(),
          type: 'Agreement',
          text: `Countersigned tenancy lease agreement for Cozy Loft.`,
          date: new Date().toISOString().split('T')[0],
          status: 'Completed'
        },
        ...state.timeline
      ];

      // Update notifications
      const newNotifications = [
        {
          id: Date.now(),
          type: 'escrow',
          text: `Lease Agreement counter-signed for Yaba Cozy Loft.`,
          time: 'Just now',
          read: false
        },
        ...state.notifications
      ];

      updateState({
        activeLeaseAgreement: newLease,
        applications: updatedApps,
        timeline: newTimeline,
        notifications: newNotifications
      });

      alert("Lease Countersigned! \nYour document is digitally sealed under CBN compliance archives. caution deposits due next.");
      navigateTo('leasing');
    });

  }
};
