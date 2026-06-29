// Landing Page Screen
export const LandingPage = {
  render(state) {
    return `
      <!-- Hero Section -->
      <section class="hero">
        <div class="container hero-grid">
          <div>
            <div class="hero-tag">
              <span class="partner-dot"></span>
              Institutional-grade verification for Nigerian PropTech
            </div>
            <h1 class="hero-title">Eliminating Trust Issues in Rental Housing</h1>
            <p class="hero-desc">
              Haven is Nigeria's premier rental intelligence platform. We safeguard landlords, qualify tenants using AI-powered insights, and protect rental deposits in secure escrow accounts.
            </p>
            <div class="hero-ctas">
              <button class="btn btn-primary btn-lg" id="hero-tenant-cta">Get Started as Tenant</button>
              <button class="btn btn-outline btn-lg" id="hero-landlord-cta">Landlord Portal</button>
            </div>
          </div>
          
          <div class="hero-visual">
            <div class="mockup-container">
              <div class="mockup-screen">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="font-size:12px; font-weight:bold; color:var(--color-primary);">Haven Mobile</span>
                  <span class="badge badge-approved" style="font-size:10px; padding:2px 8px;">Secure</span>
                </div>
                
                <div style="background: white; border-radius:12px; padding:12px; box-shadow: var(--shadow-sm); display:flex; flex-direction:column; gap:8px;">
                  <div style="font-size:11px; color:#6B7280; font-weight:bold; text-transform:uppercase;">AI Tenant Qualification</div>
                  <div style="font-size:20px; font-weight:bold; color:var(--color-primary); display:flex; align-items:baseline; gap:4px;">
                    94% <span style="font-size:12px; color:var(--color-success); font-weight:bold;">Grade A</span>
                  </div>
                  <div style="background:#E5E7EB; height:6px; border-radius:3px; overflow:hidden;">
                    <div style="background:var(--color-secondary); width:94%; height:100%;"></div>
                  </div>
                </div>

                <div style="background: white; border-radius:12px; padding:12px; box-shadow: var(--shadow-sm); display:flex; flex-direction:column; gap:6px;">
                  <div style="font-size:11px; color:#6B7280;">VERIFIED INTEGRITY CHECK</div>
                  <div style="display:flex; justify-content:space-between; font-size:12px;">
                    <span>BVN Identity Match</span>
                    <span style="color:var(--color-success); font-weight:bold;">Passed</span>
                  </div>
                  <div style="display:flex; justify-content:space-between; font-size:12px;">
                    <span>NIN Record Match</span>
                    <span style="color:var(--color-success); font-weight:bold;">Passed</span>
                  </div>
                  <div style="display:flex; justify-content:space-between; font-size:12px;">
                    <span>Criminal Screening</span>
                    <span style="color:var(--color-success); font-weight:bold;">Clear</span>
                  </div>
                </div>

                <div style="background: var(--color-primary); color:white; border-radius:12px; padding:12px; display:flex; justify-content:space-between; align-items:center;">
                  <div>
                    <div style="font-size:9px; opacity:0.7;">ESCROW DEPOSIT</div>
                    <div style="font-size:14px; font-weight:bold;">₦1,200,000</div>
                  </div>
                  <span class="badge badge-approved" style="background:rgba(34,197,94,0.2); color:#4ade80; border:none; font-size:10px;">Protected</span>
                </div>
              </div>
            </div>
            
            <!-- Glass cards -->
            <div class="floating-glass-card right">
              <div class="floating-icon" style="background-color: var(--color-secondary);">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div>
                <div style="font-size: 13px; font-weight: bold; color: var(--color-primary);">100% Secure</div>
                <div style="font-size: 11px; color: #6B7280;">NIMC & CBN Approved</div>
              </div>
            </div>

            <div class="floating-glass-card left">
              <div class="floating-icon" style="background-color: var(--color-success);">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <div>
                <div style="font-size: 13px; font-weight: bold; color: var(--color-primary);">AI Qualified</div>
                <div style="font-size: 11px; color: #6B7280;">Zero Paperwork</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Partner Showcase -->
      <section class="partners">
        <div class="container">
          <div class="partners-title">Trusted by Nigeria's Leading Real Estate and Security Authorities</div>
          <div class="partners-grid">
            <div class="partner-logo">nimc<span class="partner-dot"></span>gov</div>
            <div class="partner-logo">nigerian<span class="partner-dot"></span>banks</div>
            <div class="partner-logo">prophaven<span class="partner-dot"></span></div>
            <div class="partner-logo">lagos<span class="partner-dot"></span>housing</div>
            <div class="partner-logo">escrow<span class="partner-dot"></span>trust</div>
          </div>
        </div>
      </section>

      <!-- Value Propositions Section -->
      <section class="value-prop" id="value-proposition">
        <div class="container">
          <span class="section-tag">Value Proposition</span>
          <h2 class="section-title">Core Tenants of Rental Security</h2>
          <p class="section-desc">We build digital infrastructure that replaces mutual suspicion with absolute verifiability, safeguarding transactions and tenant-landlord relations.</p>
          
          <div class="grid-cols-4">
            <div class="prop-card card card-hover">
              <div class="prop-icon flex-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <h3>AI Qualification</h3>
              <p>Verify tenant employment, income statements, credit references, and history autonomously to yield an institutional-grade qualification score.</p>
            </div>
            
            <div class="prop-card card card-hover">
              <div class="prop-icon flex-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
              <h3>Escrow Protection</h3>
              <p>Secure caution deposits and advance rents in compliance-safe escrow vaults. Funds are released strictly based on lease milestones and conditions.</p>
            </div>
            
            <div class="prop-card card card-hover">
              <div class="prop-icon flex-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              </div>
              <h3>Structured Workflows</h3>
              <p>Standardize rent inspections, legal leases, and repair requests through legally binding, automated steps, reducing legal disputes to zero.</p>
            </div>
            
            <div class="prop-card card card-hover">
              <div class="prop-icon flex-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <h3>Identity Assurance</h3>
              <p>Direct API integration with the National Identity Management Commission (NIMC) and central BVN databases for immediate identity verification.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Trust Statistics Section -->
      <section class="trust-stats" id="trust-statistics">
        <div class="container">
          <h2>Proven Trust in Figures</h2>
          <div class="grid-cols-4">
            <div class="stat-box">
              <div class="stat-number" id="stat-tenants" data-target="14200">0</div>
              <div class="stat-label">Verified Tenants</div>
            </div>
            <div class="stat-box">
              <div class="stat-number" id="stat-landlords" data-target="3800">0</div>
              <div class="stat-label">Registered Landlords</div>
            </div>
            <div class="stat-box">
              <div class="stat-number" id="stat-escrow" data-target="18">0</div>
              <div class="stat-label">₦Billion Escrow Guarded</div>
            </div>
            <div class="stat-box">
              <div class="stat-number" id="stat-accuracy" data-target="99">0</div>
              <div class="stat-label">% Check Accuracy</div>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ Section -->
      <section class="faq-section" id="faq">
        <div class="container">
          <span class="section-tag text-center">Support</span>
          <h2 class="section-title text-center">Frequently Asked Questions</h2>
          <p class="section-desc text-center">Quick answers to clarify the operation of our platform.</p>
          
          <div class="faq-grid">
            <div class="faq-item">
              <div class="faq-header">
                <h3>What is Haven Rental Intelligence?</h3>
                <span class="faq-icon">+</span>
              </div>
              <div class="faq-body">
                <p>Haven is an ecosystem designed to bring trust and verification to Nigerian rental markets. We integrate BVN/NIN databases, employer registries, and transaction accounts to score tenants and run automated, legally compliant lease management with escrow safeguards.</p>
              </div>
            </div>

            <div class="faq-item">
              <div class="faq-header">
                <h3>How does the Escrow Rental Protection work?</h3>
                <span class="faq-icon">+</span>
              </div>
              <div class="faq-body">
                <p>Caution fees and advance rent payments are deposited in a secure partner-bank trust account. The landlord cannot unilaterally seize a caution deposit, and the tenant cannot default on valid repair assessments. Release is coordinated through inspect-and-verify workflows in the app.</p>
              </div>
            </div>

            <div class="faq-item">
              <div class="faq-header">
                <h3>Is Haven compliant with BVN and NIMC regulations?</h3>
                <span class="faq-icon">+</span>
              </div>
              <div class="faq-body">
                <p>Yes. Haven accesses NIMC and CBN verification gateways via certified third-party verification partners. We strictly enforce NDPR data privacy standards and require clear tenant consents (such as OTP inputs) before retrieving official records.</p>
              </div>
            </div>

            <div class="faq-item">
              <div class="faq-header">
                <h3>What happens if a tenant's qualification fails?</h3>
                <span class="faq-icon">+</span>
              </div>
              <div class="faq-body">
                <p>If qualification fails due to discrepancies or negative histories, tenants are provided with a "Requires Action" notification indicating where the dispute lies (e.g. mismatched NIN, invalid employment link). They can resolve details or upload supplementary proof (like corporate co-signers).</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  init(state, navigateTo, updateState) {
    // Buttons in hero
    document.getElementById('hero-tenant-cta')?.addEventListener('click', () => {
      updateState({ preselectedRole: 'Tenant' });
      navigateTo('register');
    });

    document.getElementById('hero-landlord-cta')?.addEventListener('click', () => {
      updateState({ preselectedRole: 'Landlord' });
      navigateTo('register');
    });

    // FAQs Accordion toggle
    document.querySelectorAll('.faq-header').forEach(header => {
      header.addEventListener('click', () => {
        const item = header.parentElement;
        const isActive = item.classList.contains('active');
        
        // Collapse all others
        document.querySelectorAll('.faq-item').forEach(otherItem => {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-body').style.maxHeight = null;
        });

        if (!isActive) {
          item.classList.add('active');
          const body = item.querySelector('.faq-body');
          body.style.maxHeight = body.scrollHeight + "px";
        }
      });
    });

    // Animate stats numbers if in viewport
    const animateStats = () => {
      const stats = [
        { id: 'stat-tenants', suffix: '+' },
        { id: 'stat-landlords', suffix: '+' },
        { id: 'stat-escrow', prefix: '₦', suffix: 'B+' },
        { id: 'stat-accuracy', suffix: '.4%' }
      ];

      stats.forEach(s => {
        const el = document.getElementById(s.id);
        if (!el) return;
        
        const target = parseFloat(el.getAttribute('data-target'));
        const prefix = s.prefix || '';
        const suffix = s.suffix || '';
        
        let start = 0;
        const duration = 1200; // ms
        const stepTime = 20;
        const steps = duration / stepTime;
        const increment = target / steps;
        
        const timer = setInterval(() => {
          start += increment;
          if (start >= target) {
            el.innerText = prefix + target.toLocaleString() + suffix;
            clearInterval(timer);
          } else {
            const displayVal = Math.floor(start);
            el.innerText = prefix + displayVal.toLocaleString() + suffix;
          }
        }, stepTime);
      });
    };

    // Trigger stat counter animations
    setTimeout(animateStats, 300);
  }
};
