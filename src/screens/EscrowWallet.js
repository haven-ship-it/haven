// Escrow Wallet & Rental Protection Screen
export const EscrowWallet = {
  render(state) {
    const balance = state.walletBalance || 0;
    const vaults = state.escrowVaults || [];
    const txns = state.transactions || [];

    // Calculate total escrowed
    const totalEscrowed = vaults.filter(v => v.status !== 'Closed' && v.status !== 'Refunded')
      .reduce((sum, v) => sum + v.totalSecured, 0);

    // Active vaults HTML
    const vaultsHTML = vaults.map(v => {
      let badgeClass = 'badge-escrow-created';
      if (v.status === 'Funded') badgeClass = 'badge-escrow-funded';
      else if (v.status === 'Awaiting Funding') badgeClass = 'badge-escrow-awaiting';
      else if (v.status === 'Move-In Approved') badgeClass = 'badge-escrow-movein';
      else if (v.status === 'Disputed') badgeClass = 'badge-escrow-disputed';
      else if (v.status === 'Closed') badgeClass = 'badge-escrow-closed';
      else if (v.status === 'Refunded') badgeClass = 'badge-escrow-refunded';

      return `
        <div class="escrow-vault-card" id="vault-card-${v.id}">
          <div class="vault-header-row">
            <div>
              <h3 style="font-size:16px; font-weight:bold; color:var(--color-primary); margin:0;">${v.title}</h3>
              <p style="font-size:11px; color:#6B7280; margin:4px 0 0 0;">Compliance Trustee: <strong>${v.landlordName}</strong></p>
            </div>
            <span class="badge ${badgeClass}">${v.status}</span>
          </div>

          <div class="vault-body-content">
            <!-- Left side: Milestones & Actions -->
            <div>
              <h4 style="font-size:13px; font-weight:bold; color:var(--color-primary); margin-bottom:16px;">Rental Protection Milestones</h4>
              
              <div class="milestone-checklist-box">
                <div class="milestone-checklist-item ${v.milestones.leaseSigned ? 'checked' : ''}">
                  <div class="milestone-checkbox-indicator">&#10003;</div>
                  <span>Standard Tenancy Lease counter-signed</span>
                </div>
                
                <div class="milestone-checklist-item ${v.milestones.depositCleared ? 'checked' : ''}">
                  <div class="milestone-checkbox-indicator">&#10003;</div>
                  <span>Caution Fee & Advance Rent deposit funded</span>
                </div>

                <div class="milestone-checklist-item ${v.milestones.inspectionApproved ? 'checked' : ''}" id="milestone-check-insp-${v.id}">
                  <div class="milestone-checkbox-indicator">${v.milestones.inspectionApproved ? '&#10003;' : ''}</div>
                  <span>Move-In property condition inspection approved</span>
                </div>

                <div class="milestone-checklist-item ${v.milestones.fundsReleased ? 'checked' : ''}">
                  <div class="milestone-checkbox-indicator">${v.milestones.fundsReleased ? '&#10003;' : ''}</div>
                  <span>Deposit payouts released to Landlord</span>
                </div>
              </div>

              <!-- Vault Actions -->
              <div style="margin-top:24px; border-top:1px solid #E5E7EB; padding-top:20px; display:flex; gap:12px;">
                ${v.status === 'Funded' ? `
                  <button class="btn btn-primary btn-sm btn-approve-movein" data-id="${v.id}">Approve Move-In & Release Payout</button>
                ` : ''}
                
                ${v.status !== 'Closed' && v.status !== 'Disputed' && v.status !== 'Refunded' ? `
                  <button class="btn btn-outline btn-sm btn-raise-dispute" data-id="${v.id}" style="border-color:var(--color-error); color:var(--color-error); background:none;">Raise Lease Dispute</button>
                  <button class="btn btn-outline btn-sm btn-request-refund" data-id="${v.id}">Request Refund</button>
                ` : ''}
              </div>
            </div>

            <!-- Right side: Ledger values & Timelines -->
            <div style="border-left:1px solid #E5E7EB; padding-left:32px; display:flex; flex-direction:column; gap:16px;">
              <div style="background:#FAF9F6; padding:12px; border-radius:8px;">
                <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:4px;">
                  <span>Caution Portion:</span> <strong>₦ ${v.cautionAmount.toLocaleString()}</strong>
                </div>
                <div style="display:flex; justify-content:space-between; font-size:11px;">
                  <span>Rent Portion:</span> <strong>₦ ${v.rentAmount.toLocaleString()}</strong>
                </div>
                <div style="display:flex; justify-content:space-between; font-size:11px; font-weight:bold; color:var(--color-primary); border-top:1px solid #E5E7EB; margin-top:8px; padding-top:8px;">
                  <span>Total Escrowed:</span> <span>₦ ${v.totalSecured.toLocaleString()}</span>
                </div>
              </div>

              <div>
                <div style="font-weight:bold; font-size:11px; text-transform:uppercase; color:#9CA3AF; margin-bottom:8px;">Vault Timeline</div>
                <div class="vault-timeline-logs">
                  ${v.timeline.map(t => `
                    <div class="vault-timeline-row">
                      <span style="color:var(--color-primary); text-align:left;">${t.text}</span>
                      <span style="color:#9CA3AF; font-size:10px; flex-shrink:0;">${t.date}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Transaction rows HTML
    const txnsHTML = txns.map(t => {
      let amtClass = 'escrowed';
      let amtPrefix = '';
      if (t.type.includes('Top-up')) { amtClass = 'inflow'; amtPrefix = '+'; }
      else if (t.type.includes('Payout') || t.type.includes('Withdrawal')) { amtClass = 'outflow'; amtPrefix = '-'; }

      return `
        <tr>
          <td><span style="font-weight:bold; color:var(--color-primary);">${t.type}</span></td>
          <td><span class="tx-amount ${amtClass}">${amtPrefix} ₦ ${t.amount.toLocaleString()}</span></td>
          <td><code style="background:#F3F4F6; padding:2px 6px; border-radius:4px; font-size:11px;">${t.reference}</code></td>
          <td style="color:#6B7280;">${t.date}</td>
          <td><span class="badge badge-approved" style="font-size:10px; ${t.status === 'Escrowed' ? 'background:var(--color-info-bg); color:var(--color-info);' : ''}">${t.status}</span></td>
          <td style="color:#6B7280; font-size:11px;">${t.description}</td>
        </tr>
      `;
    }).join('');

    return `
      <div class="dashboard-wrapper">
        <div class="container">
          
          <div style="margin-bottom:32px;">
            <h1 class="page-title">Escrow Wallet & Rental Protection</h1>
            <p class="text-sm text-muted">Fund lease caution fees, manage security withdrawals, and track milestone disbursements.</p>
          </div>

          <!-- Balance Dashboard Grid -->
          <div class="wallet-dashboard-grid">
            <!-- Available balance -->
            <div class="wallet-balance-card">
              <div>
                <span class="kpi-label" style="color:rgba(255,255,255,0.7);">Available Wallet Balance</span>
                <div class="wallet-balance-amount">₦ ${balance.toLocaleString()}</div>
              </div>
              <div style="display:flex; flex-direction:column; gap:10px;">
                <button class="btn btn-secondary btn-sm" id="btn-wallet-topup" style="background-color:var(--color-white); color:var(--color-primary); border:none; padding:10px 20px;">Fund Wallet</button>
                <button class="btn btn-outline btn-sm" id="btn-wallet-withdraw" style="border-color:rgba(255,255,255,0.4); color:white; background:none; padding:10px 20px;">Withdraw Funds</button>
              </div>
            </div>

            <!-- Escrowed balance -->
            <div class="card" style="padding:32px; display:flex; justify-content:space-between; align-items:center;">
              <div>
                <span class="kpi-label">Secured Rental Escrow</span>
                <div style="font-size:36px; font-weight:bold; color:var(--color-primary); margin-top:8px;">
                  ₦ ${totalEscrowed.toLocaleString()}
                </div>
              </div>
              <div style="width:48px; height:48px; border-radius:50%; background-color:var(--color-success-bg); color:var(--color-success); font-size:24px;" class="flex-center">
                &#128737;
              </div>
            </div>
          </div>

          <!-- Active Escrow Vaults -->
          <div style="margin-bottom:32px; text-align:left;">
            <h2 class="section-header" style="font-size:20px; margin-bottom:16px;">Active Rent Protection Vaults</h2>
            <div class="escrow-vaults-grid">
              ${vaultsHTML}
            </div>
          </div>

          <!-- Financial Audit Table Ledger -->
          <div class="ledger-table-card">
            <div class="ledger-table-header">
              <h3 style="font-size:16px; font-weight:bold; color:var(--color-primary); margin:0;">Transaction Ledger Logs</h3>
              <button class="btn btn-outline btn-sm" id="btn-download-audit-pdf" style="font-size:11px; padding:6px 12px;">Download Financial Audit Report (PDF)</button>
            </div>
            
            <div style="overflow-x:auto;">
              <table class="ledger-table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Reference</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  ${txnsHTML}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>

      <!-- Fund Wallet Modal -->
      <div class="modal-overlay" id="wallet-topup-modal" style="display:none;">
        <div class="modal-content-card">
          <h3 class="card-title" style="margin-bottom:8px;">Fund Haven Wallet</h3>
          <p class="text-caption text-muted" style="margin-bottom:20px;">Top-up available balance via bank transfer or card processor.</p>
          <form id="wallet-topup-form">
            <div class="form-group">
              <label class="form-label" for="topup-amount">Top-up Amount (₦)</label>
              <input class="form-input" type="number" id="topup-amount" placeholder="e.g. 50000" required>
            </div>
            <div class="form-group">
              <label class="form-label">Payment Method</label>
              <select class="form-input">
                <option value="bank">Instant Bank Transfer</option>
                <option value="card">Visa / Mastercard Processor</option>
                <option value="ussd">USSD Payment Code</option>
              </select>
            </div>
            <div style="display:flex; justify-content:flex-end; gap:12px; margin-top:24px;">
              <button type="button" class="btn btn-outline btn-sm id-close-topup-modal">Cancel</button>
              <button type="submit" class="btn btn-primary btn-sm">Authorize Top-up</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Withdraw Wallet Modal -->
      <div class="modal-overlay" id="wallet-withdraw-modal" style="display:none;">
        <div class="modal-content-card">
          <h3 class="card-title" style="margin-bottom:8px;">Withdraw Wallet Funds</h3>
          <p class="text-caption text-muted" style="margin-bottom:20px;">Disburse available wallet balance to your linked Nigerian bank account.</p>
          <form id="wallet-withdraw-form">
            <div class="form-group">
              <label class="form-label" for="withdraw-bank">Select Bank</label>
              <select class="form-input" id="withdraw-bank">
                <option value="gtb">Guaranty Trust Bank</option>
                <option value="access">Access Bank</option>
                <option value="zenith">Zenith Bank</option>
                <option value="first">First Bank</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label" for="withdraw-acct">Account Number</label>
              <input class="form-input" type="text" id="withdraw-acct" maxlength="10" placeholder="0123456789" required pattern="\\d{10}">
            </div>
            <div class="form-group">
              <label class="form-label" for="withdraw-amount">Amount (₦)</label>
              <input class="form-input" type="number" id="withdraw-amount" placeholder="e.g. 20000" required>
            </div>
            <div style="display:flex; justify-content:flex-end; gap:12px; margin-top:24px;">
              <button type="button" class="btn btn-outline btn-sm id-close-withdraw-modal">Cancel</button>
              <button type="submit" class="btn btn-primary btn-sm">Authorize Withdrawal</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Raise Dispute Modal -->
      <div class="modal-overlay" id="raise-dispute-modal" style="display:none;">
        <div class="modal-content-card">
          <h3 class="card-title" style="margin-bottom:8px; color:var(--color-error);">Raise Rental Dispute</h3>
          <p class="text-caption text-muted" style="margin-bottom:20px;">Raise an official audit dispute on caution deposits. Funds will be frozen until resolved.</p>
          <form id="raise-dispute-form">
            <input type="hidden" id="dispute-vault-id">
            <div class="form-group">
              <label class="form-label" for="dispute-reason">Dispute Reason Details</label>
              <textarea class="form-input" id="dispute-reason" rows="4" placeholder="Describe the unresolved issues (e.g. landlord refused move-out refund without backing reasons)..." required></textarea>
            </div>
            <div class="form-group">
              <label class="checkbox-label" style="font-size:11px; line-height:1.4;">
                <input type="checkbox" required>
                I confirm that I have attempted to contact the landlord first, and that I request Haven compliance auditors to lock the caution portion in dispute hold.
              </label>
            </div>
            <div style="display:flex; justify-content:flex-end; gap:12px; margin-top:24px;">
              <button type="button" class="btn btn-outline btn-sm id-close-dispute-modal">Cancel</button>
              <button type="submit" class="btn btn-primary btn-sm" style="background-color:var(--color-error); border-color:var(--color-error);">Lock Vault & Open Dispute</button>
            </div>
          </form>
        </div>
      </div>
    `;
  },

  init(state, navigateTo, updateState) {
    const vaults = state.escrowVaults || [];
    const balance = state.walletBalance || 0;
    const txns = state.transactions || [];

    // Modals references
    const topupModal = document.getElementById('wallet-topup-modal');
    const withdrawModal = document.getElementById('wallet-withdraw-modal');
    const disputeModal = document.getElementById('raise-dispute-modal');

    // Close buttons helper
    const closeAllModals = () => {
      if (topupModal) topupModal.style.display = 'none';
      if (withdrawModal) withdrawModal.style.display = 'none';
      if (disputeModal) disputeModal.style.display = 'none';
    };

    document.querySelectorAll('.id-close-topup-modal, .id-close-withdraw-modal, .id-close-dispute-modal').forEach(btn => {
      btn.addEventListener('click', closeAllModals);
    });

    // Toggle Top-up modal
    document.getElementById('btn-wallet-topup')?.addEventListener('click', () => {
      if (topupModal) topupModal.style.display = 'flex';
    });

    // Toggle Withdrawal modal
    document.getElementById('btn-wallet-withdraw')?.addEventListener('click', () => {
      if (withdrawModal) withdrawModal.style.display = 'flex';
    });

    // Close modals on background click
    [topupModal, withdrawModal, disputeModal].forEach(m => {
      m?.addEventListener('click', (e) => {
        if (e.target === m) closeAllModals();
      });
    });

    // 1. Submit Wallet Funding Top-Up
    const topupForm = document.getElementById('wallet-topup-form');
    topupForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const amountVal = parseInt(document.getElementById('topup-amount').value);
      
      if (isNaN(amountVal) || amountVal <= 0) {
        alert("Please enter a valid amount.");
        return;
      }

      const newBalance = balance + amountVal;
      const newTx = {
        id: Date.now(),
        type: 'Wallet Top-up',
        amount: amountVal,
        reference: `TXN-${Math.floor(1000 + Math.random()*9000)}-LA`,
        date: new Date().toISOString().split('T')[0],
        status: 'Cleared',
        description: 'Instant bank transfer top-up'
      };

      const newNotif = {
        id: Date.now(),
        type: 'escrow',
        text: `Wallet Top-up: ₦${amountVal.toLocaleString()} added to your Available Balance.`,
        time: 'Just now',
        read: false
      };

      updateState({
        walletBalance: newBalance,
        transactions: [newTx, ...txns],
        notifications: [newNotif, ...state.notifications]
      });

      closeAllModals();
      alert(`Top-up Cleared! \n₦${amountVal.toLocaleString()} added successfully to Available Wallet.`);
      navigateTo('wallet');
    });

    // 2. Submit Wallet Withdrawal
    const withdrawForm = document.getElementById('wallet-withdraw-form');
    withdrawForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const bank = document.getElementById('withdraw-bank').value;
      const acct = document.getElementById('withdraw-acct').value;
      const amountVal = parseInt(document.getElementById('withdraw-amount').value);

      if (isNaN(amountVal) || amountVal <= 0) {
        alert("Enter a valid amount.");
        return;
      }
      if (amountVal > balance) {
        alert("Insufficient available balance. Max withdrawal: ₦" + balance.toLocaleString());
        return;
      }

      const newBalance = balance - amountVal;
      const newTx = {
        id: Date.now(),
        type: 'Wallet Withdrawal',
        amount: amountVal,
        reference: `TXN-${Math.floor(1000 + Math.random()*9000)}-LA`,
        date: new Date().toISOString().split('T')[0],
        status: 'Cleared',
        description: `Disbursement to bank account ${acct} (${bank.toUpperCase()})`
      };

      const newNotif = {
        id: Date.now(),
        type: 'escrow',
        text: `Wallet Withdrawal: ₦${amountVal.toLocaleString()} disbursed to bank account.`,
        time: 'Just now',
        read: false
      };

      updateState({
        walletBalance: newBalance,
        transactions: [newTx, ...txns],
        notifications: [newNotif, ...state.notifications]
      });

      closeAllModals();
      alert(`Withdrawal Approved! \n₦${amountVal.toLocaleString()} successfully sent to bank account.`);
      navigateTo('wallet');
    });

    // 3. Payout Move-In Release Payout (Disburse Rent)
    document.querySelectorAll('.btn-approve-movein').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'));
        
        const updatedVaults = vaults.map(v => {
          if (v.id === id) {
            const rentReleaseAmount = v.rentAmount;
            
            // Add release timeline log
            const newTimeline = [
              { text: `Move-in approved by tenant. Rent portion of ₦${rentReleaseAmount.toLocaleString()} released.`, date: new Date().toISOString().split('T')[0] },
              ...v.timeline
            ];

            return {
              ...v,
              status: 'Move-In Approved',
              milestones: {
                ...v.milestones,
                inspectionApproved: true,
                fundsReleased: true
              },
              timeline: newTimeline
            };
          }
          return v;
        });

        const targetVault = vaults.find(v => v.id === id);
        
        // Add payout transaction
        const newTx = {
          id: Date.now(),
          type: 'Payout to Landlord',
          amount: targetVault.rentAmount,
          reference: `TXN-${Math.floor(1000 + Math.random()*9000)}-LA`,
          date: new Date().toISOString().split('T')[0],
          status: 'Cleared',
          description: `Disbursed rent advance payout to ${targetVault.landlordName}`
        };

        const newNotif = {
          id: Date.now(),
          type: 'escrow',
          text: `Payout released: Rent advance of ₦${targetVault.rentAmount.toLocaleString()} disbursed to landlord.`,
          time: 'Just now',
          read: false
        };

        // Log to global timeline
        const newGlobalTimeline = [
          {
            id: Date.now(),
            type: 'Payment',
            text: `Rent payout of ₦${targetVault.rentAmount.toLocaleString()} released to ${targetVault.landlordName}.`,
            date: new Date().toISOString().split('T')[0],
            status: 'Completed'
          },
          ...state.timeline
        ];

        updateState({
          escrowVaults: updatedVaults,
          transactions: [newTx, ...txns],
          notifications: [newNotif, ...state.notifications],
          timeline: newGlobalTimeline
        });

        alert(`Move-In Approved! \nCaution Deposit (₦${targetVault.cautionAmount.toLocaleString()}) remains locked in escrow protection. \nRent portion disbursed to ${targetVault.landlordName}.`);
        navigateTo('wallet');
      });
    });

    // 4. Raise Dispute Modal Toggle
    document.querySelectorAll('.btn-raise-dispute').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const inputId = document.getElementById('dispute-vault-id');
        if (inputId) inputId.value = id;
        if (disputeModal) disputeModal.style.display = 'flex';
      });
    });

    // Submit Dispute Form
    const disputeForm = document.getElementById('raise-dispute-form');
    disputeForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = parseInt(document.getElementById('dispute-vault-id').value);
      const reason = document.getElementById('dispute-reason').value.trim();

      const updatedVaults = vaults.map(v => {
        if (v.id === id) {
          const newTimeline = [
            { text: `Dispute Raised: Caution locked in escrow hold. Reason: ${reason.substring(0, 40)}...`, date: new Date().toISOString().split('T')[0] },
            ...v.timeline
          ];
          return {
            ...v,
            status: 'Disputed',
            timeline: newTimeline
          };
        }
        return v;
      });

      const targetVault = vaults.find(v => v.id === id);

      const newNotif = {
        id: Date.now(),
        type: 'verification',
        text: `Caution vault for ${targetVault.title} has been put under dispute hold.`,
        time: 'Just now',
        read: false
      };

      updateState({
        escrowVaults: updatedVaults,
        notifications: [newNotif, ...state.notifications]
      });

      closeAllModals();
      alert(`Dispute Filed successfully! \nThe caution fee of ₦${targetVault.cautionAmount.toLocaleString()} has been locked in safe hold. A compliance auditor has been assigned.`);
      navigateTo('wallet');
    });

    // 5. Refund Requests
    document.querySelectorAll('.btn-request-refund').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'));
        const target = vaults.find(v => v.id === id);

        const confirmRefund = confirm(`Confirm request for caution refund of ₦${target.cautionAmount.toLocaleString()}? \nThis notifies ${target.landlordName} to approve caution release.`);
        if (!confirmRefund) return;

        const updatedVaults = vaults.map(v => {
          if (v.id === id) {
            const newTimeline = [
              { text: `Refund request filed by Tenant. Awaiting Landlord release clearance.`, date: new Date().toISOString().split('T')[0] },
              ...v.timeline
            ];
            return {
              ...v,
              status: 'Verification Pending',
              timeline: newTimeline
            };
          }
          return v;
        });

        updateState({ escrowVaults: updatedVaults });
        alert("Refund request submitted successfully.");
        navigateTo('wallet');
      });
    });

    // 6. Download Audit PDF report
    document.getElementById('btn-download-audit-pdf')?.addEventListener('click', () => {
      alert("Preparing PDF Audit Logs... \nGenerated verified CBN-compliant audit trail with cryptographic seals. \n\nFile downloaded: Haven_Audit_Ledger_June_2026.pdf (142 KB)");
    });
  }
};
