// Footer Component
export const Footer = {
  render() {
    return `
      <footer class="footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-brand">
              <a href="#" class="footer-logo">
                <div class="logo-icon footer-logo-icon">H</div>
                <span>Haven</span>
              </a>
              <p class="text-sm text-muted" style="color: rgba(255,255,255,0.6); max-width: 280px; margin-top: 12px;">
                Nigeria's most trusted rental intelligence platform. Securing leases, verifying identities, and protecting payments.
              </p>
            </div>
            
            <div>
              <h4>Platform</h4>
              <ul class="footer-links">
                <li><a href="#" class="footer-link">AI Tenant Scoring</a></li>
                <li><a href="#" class="footer-link">BVN & NIN Verification</a></li>
                <li><a href="#" class="footer-link">Escrow Rental Protection</a></li>
                <li><a href="#" class="footer-link">Structured Leases</a></li>
              </ul>
            </div>
            
            <div>
              <h4>Resources</h4>
              <ul class="footer-links">
                <li><a href="#" class="footer-link">Landlord Guide</a></li>
                <li><a href="#" class="footer-link">Tenant Knowledgebase</a></li>
                <li><a href="#" class="footer-link">Legal Compliance</a></li>
                <li><a href="#" class="footer-link">API Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h4>Company</h4>
              <ul class="footer-links">
                <li><a href="#" class="footer-link">About Haven</a></li>
                <li><a href="#" class="footer-link">Security Standards</a></li>
                <li><a href="#" class="footer-link">Privacy Policy</a></li>
                <li><a href="#" class="footer-link">Contact Support</a></li>
              </ul>
            </div>
          </div>
          
          <div class="footer-bottom">
            <p>&copy; 2026 Haven Rental Intelligence. All rights reserved.</p>
            <p style="display: flex; gap: 16px;">
              <span style="color: rgba(255,255,255,0.4);">Institutional-grade security</span>
              <span style="color: var(--color-secondary);">&#9679;</span>
              <span style="color: rgba(255,255,255,0.4);">CBN/NIMC Compliant</span>
            </p>
          </div>
        </div>
      </footer>
    `;
  },

  init(state, navigateTo) {
    // Add interactions if necessary (e.g. newsletter form handling)
  }
};
