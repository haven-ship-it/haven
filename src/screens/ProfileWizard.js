// Profile Setup Wizard (7 Steps)
export const ProfileWizard = {
  render(state) {
    const wizardStep = state.wizardStep || 1;
    const profile = state.profileData || {};
    
    // Sidebar steps list metadata
    const stepItems = [
      { num: 1, name: 'Personal Info' },
      { num: 2, name: 'Location Prefs' },
      { num: 3, name: 'Housing Prefs' },
      { num: 4, name: 'Employment' },
      { num: 5, name: 'Income Details' },
      { num: 6, name: 'Lifestyle Prefs' },
      { num: 7, name: 'Review & Submit' }
    ];

    // Build sidebar HTML
    const stepsHTML = stepItems.map(item => {
      let statusClass = '';
      if (item.num === wizardStep) statusClass = 'active';
      else if (item.num < wizardStep) statusClass = 'completed';

      return `
        <li class="wizard-step-item ${statusClass}">
          <div class="step-indicator-bubble">
            ${item.num < wizardStep ? '&#10003;' : item.num}
          </div>
          <span class="step-label">${item.name}</span>
        </li>
      `;
    }).join('');

    // Mobile progress bar width
    const progressPercent = Math.round(((wizardStep - 1) / 6) * 100);

    return `
      <div class="dashboard-wrapper" style="padding: 20px 0;">
        <div class="container" style="max-width:1100px;">
          
          <!-- Wizard Card Container -->
          <div class="wizard-container">
            <!-- Sidebar (desktop) -->
            <div class="wizard-sidebar">
              <div class="wizard-sidebar-title">Profile Setup</div>
              <ul class="wizard-steps">
                ${stepsHTML}
              </ul>
            </div>

            <!-- Main Content Area -->
            <div class="wizard-main">
              <!-- Mobile progress bar -->
              <div class="mobile-progress-bar-container">
                <div class="mobile-progress-bar" style="width: ${progressPercent}%;"></div>
              </div>

              <div class="wizard-header">
                <h2>Step ${wizardStep} of 7: ${stepItems[wizardStep - 1].name}</h2>
                <p>Provide your information to help match and qualify you for rental properties.</p>
              </div>

              <div class="wizard-content">
                <form id="wizard-form" novalidate>
                  
                  <!-- STEP 1: Personal Info -->
                  ${wizardStep === 1 ? `
                    <div class="grid-cols-2">
                      <div class="form-group">
                        <label class="form-label" for="wz-fullname">Full Legal Name</label>
                        <input class="form-input" type="text" id="wz-fullname" placeholder="e.g. Osaze Alao" value="${profile.personalInfo?.fullName || ''}" required>
                        <span class="form-error" id="err-fullname"></span>
                      </div>
                      <div class="form-group">
                        <label class="form-label" for="wz-dob">Date of Birth</label>
                        <input class="form-input" type="date" id="wz-dob" value="${profile.personalInfo?.dob || ''}" required>
                        <span class="form-error" id="err-dob"></span>
                      </div>
                    </div>
                    <div class="grid-cols-2" style="margin-top:16px;">
                      <div class="form-group">
                        <label class="form-label" for="wz-gender">Gender</label>
                        <select class="form-input" id="wz-gender" required>
                          <option value="">Select Gender</option>
                          <option value="Male" ${profile.personalInfo?.gender === 'Male' ? 'selected' : ''}>Male</option>
                          <option value="Female" ${profile.personalInfo?.gender === 'Female' ? 'selected' : ''}>Female</option>
                          <option value="Other" ${profile.personalInfo?.gender === 'Other' ? 'selected' : ''}>Other</option>
                        </select>
                        <span class="form-error" id="err-gender"></span>
                      </div>
                      <div class="form-group">
                        <label class="form-label" for="wz-phone">Phone Number</label>
                        <input class="form-input" type="tel" id="wz-phone" placeholder="e.g. 08012345678" value="${profile.personalInfo?.phone || ''}" required>
                        <span class="form-error" id="err-phone"></span>
                      </div>
                    </div>
                    <div class="form-group" style="margin-top:16px;">
                      <label class="form-label" for="wz-email">Email Address</label>
                      <input class="form-input" type="email" id="wz-email" placeholder="name@domain.com" value="${profile.personalInfo?.email || ''}" required>
                      <span class="form-error" id="err-email"></span>
                    </div>
                  ` : ''}

                  <!-- STEP 2: Location Preferences -->
                  ${wizardStep === 2 ? `
                    <div class="form-group">
                      <label class="form-label">Preferred City</label>
                      <select class="form-input" id="wz-city" required>
                        <option value="">Select City</option>
                        <option value="Lagos" ${profile.locationPreferences?.city === 'Lagos' ? 'selected' : ''}>Lagos</option>
                        <option value="Abuja" ${profile.locationPreferences?.city === 'Abuja' ? 'selected' : ''}>Abuja</option>
                        <option value="Port Harcourt" ${profile.locationPreferences?.city === 'Port Harcourt' ? 'selected' : ''}>Port Harcourt</option>
                        <option value="Ibadan" ${profile.locationPreferences?.city === 'Ibadan' ? 'selected' : ''}>Ibadan</option>
                      </select>
                      <span class="form-error" id="err-city"></span>
                    </div>
                    <div class="form-group" style="margin-top:16px;">
                      <label class="form-label" for="wz-neighborhoods">Preferred Neighborhoods (Comma separated)</label>
                      <input class="form-input" type="text" id="wz-neighborhoods" placeholder="e.g. Lekki Phase 1, Ikeja, Yaba" value="${profile.locationPreferences?.neighborhoods || ''}" required>
                      <span class="form-error" id="err-neighborhoods"></span>
                    </div>
                    <div class="form-group" style="margin-top:16px;">
                      <label class="form-label" for="wz-budget">Maximum Rent Budget (Annual ₦)</label>
                      <input class="form-input" type="number" id="wz-budget" placeholder="e.g. 2500000" value="${profile.locationPreferences?.budget || ''}" required>
                      <span class="form-error" id="err-budget"></span>
                    </div>
                  ` : ''}

                  <!-- STEP 3: Housing Preferences -->
                  ${wizardStep === 3 ? `
                    <div class="grid-cols-2">
                      <div class="form-group">
                        <label class="form-label" for="wz-proptype">Property Type</label>
                        <select class="form-input" id="wz-proptype" required>
                          <option value="">Select Type</option>
                          <option value="Apartment" ${profile.housingPreferences?.propertyType === 'Apartment' ? 'selected' : ''}>Self-contained Apartment</option>
                          <option value="Shared flat" ${profile.housingPreferences?.propertyType === 'Shared flat' ? 'selected' : ''}>Shared Flat</option>
                          <option value="Duplex" ${profile.housingPreferences?.propertyType === 'Duplex' ? 'selected' : ''}>Duplex / Townhouse</option>
                          <option value="Bungalow" ${profile.housingPreferences?.propertyType === 'Bungalow' ? 'selected' : ''}>Bungalow</option>
                        </select>
                        <span class="form-error" id="err-proptype"></span>
                      </div>
                      <div class="form-group">
                        <label class="form-label" for="wz-bedrooms">Bedrooms</label>
                        <select class="form-input" id="wz-bedrooms" required>
                          <option value="">Select Bedrooms</option>
                          <option value="1" ${profile.housingPreferences?.bedrooms === '1' ? 'selected' : ''}>1 Bedroom</option>
                          <option value="2" ${profile.housingPreferences?.bedrooms === '2' ? 'selected' : ''}>2 Bedrooms</option>
                          <option value="3" ${profile.housingPreferences?.bedrooms === '3' ? 'selected' : ''}>3 Bedrooms</option>
                          <option value="4+" ${profile.housingPreferences?.bedrooms === '4+' ? 'selected' : ''}>4+ Bedrooms</option>
                        </select>
                        <span class="form-error" id="err-bedrooms"></span>
                      </div>
                    </div>
                    <div class="form-group" style="margin-top:24px;">
                      <label class="form-label">Key Desired Amenities</label>
                      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:8px;">
                        <label class="checkbox-label">
                          <input type="checkbox" name="amenity" value="Power Backup" ${profile.housingPreferences?.amenities?.includes('Power Backup') ? 'checked' : ''}>
                          24/7 Power Backup
                        </label>
                        <label class="checkbox-label">
                          <input type="checkbox" name="amenity" value="Parking" ${profile.housingPreferences?.amenities?.includes('Parking') ? 'checked' : ''}>
                          Dedicated Parking space
                        </label>
                        <label class="checkbox-label">
                          <input type="checkbox" name="amenity" value="Security" ${profile.housingPreferences?.amenities?.includes('Security') ? 'checked' : ''}>
                          Gated Estate Security
                        </label>
                        <label class="checkbox-label">
                          <input type="checkbox" name="amenity" value="Water Treatment" ${profile.housingPreferences?.amenities?.includes('Water Treatment') ? 'checked' : ''}>
                          Water Treatment Plant
                        </label>
                      </div>
                    </div>
                  ` : ''}

                  <!-- STEP 4: Employment Information -->
                  ${wizardStep === 4 ? `
                    <div class="form-group">
                      <label class="form-label" for="wz-employment">Employment Status</label>
                      <select class="form-input" id="wz-employment" required>
                        <option value="">Select Status</option>
                        <option value="Employed" ${profile.employmentInfo?.status === 'Employed' ? 'selected' : ''}>Salary Earner (Employed)</option>
                        <option value="Self-Employed" ${profile.employmentInfo?.status === 'Self-Employed' ? 'selected' : ''}>Self-Employed / Business owner</option>
                        <option value="Student" ${profile.employmentInfo?.status === 'Student' ? 'selected' : ''}>Student</option>
                        <option value="Contractor" ${profile.employmentInfo?.status === 'Contractor' ? 'selected' : ''}>Freelancer / Contractor</option>
                      </select>
                      <span class="form-error" id="err-employment"></span>
                    </div>
                    <div class="grid-cols-2" style="margin-top:16px;">
                      <div class="form-group">
                        <label class="form-label" for="wz-employer">Employer / Company Name</label>
                        <input class="form-input" type="text" id="wz-employer" placeholder="e.g. Flutterwave" value="${profile.employmentInfo?.employer || ''}">
                        <span class="form-error" id="err-employer"></span>
                      </div>
                      <div class="form-group">
                        <label class="form-label" for="wz-jobtitle">Job Title</label>
                        <input class="form-input" type="text" id="wz-jobtitle" placeholder="e.g. Software Engineer" value="${profile.employmentInfo?.jobTitle || ''}">
                        <span class="form-error" id="err-jobtitle"></span>
                      </div>
                    </div>
                  ` : ''}

                  <!-- STEP 5: Income Information -->
                  ${wizardStep === 5 ? `
                    <div class="form-group">
                      <label class="form-label" for="wz-income">Average Monthly Income (₦)</label>
                      <input class="form-input" type="number" id="wz-income" placeholder="e.g. 350000" value="${profile.incomeInfo?.monthlyIncome || ''}" required>
                      <span class="form-error" id="err-income"></span>
                    </div>
                    
                    <div class="form-group" style="margin-top:24px;">
                      <label class="form-label">Simulate Bank Statement Upload (Qualifying Proof)</label>
                      <div class="dropzone" id="wz-bank-dropzone">
                        <div class="dropzone-icon">&#128196;</div>
                        <h4 style="font-size:14px; font-weight:bold; margin-bottom:4px;">Select 3-Month Bank PDF Statement</h4>
                        <p class="text-caption text-muted">Secured via bank-gate API.</p>
                      </div>
                      <div id="wz-bank-file" style="margin-top:8px; font-size:12px; font-weight:bold; color:var(--color-secondary);">
                        ${profile.incomeInfo?.statementUploaded ? '&#128196; statement_validated.pdf (1.8 MB)' : ''}
                      </div>
                      <span class="form-error" id="err-statement"></span>
                    </div>
                  ` : ''}

                  <!-- STEP 6: Lifestyle Preferences -->
                  ${wizardStep === 6 ? `
                    <div class="form-group">
                      <label class="form-label">Lifestyle Toggles (Select all that apply)</label>
                      <div class="lifestyle-tags">
                        <button type="button" class="tag-btn ${profile.lifestylePreferences?.pets ? 'selected' : ''}" id="tag-pets">Pet Owner</button>
                        <button type="button" class="tag-btn ${profile.lifestylePreferences?.smoking ? 'selected' : ''}" id="tag-smoking">Smoker</button>
                        <button type="button" class="tag-btn ${profile.lifestylePreferences?.quietHours ? 'selected' : ''}" id="tag-quiet">Quiet Hours Preferred</button>
                        <button type="button" class="tag-btn ${profile.lifestylePreferences?.sharing ? 'selected' : ''}" id="tag-sharing">Open to house sharing</button>
                      </div>
                    </div>
                  ` : ''}

                  <!-- STEP 7: Review & Submit -->
                  ${wizardStep === 7 ? `
                    <div style="display:flex; flex-direction:column; gap:20px;">
                      <div class="review-section">
                        <div class="review-section-title">Personal Details</div>
                        <div class="review-grid">
                          <div class="review-item">
                            <span class="review-item-label">Full Name</span>
                            <span class="review-item-value">${profile.personalInfo?.fullName || 'N/A'}</span>
                          </div>
                          <div class="review-item">
                            <span class="review-item-label">Date of Birth</span>
                            <span class="review-item-value">${profile.personalInfo?.dob || 'N/A'}</span>
                          </div>
                          <div class="review-item">
                            <span class="review-item-label">Gender</span>
                            <span class="review-item-value">${profile.personalInfo?.gender || 'N/A'}</span>
                          </div>
                          <div class="review-item">
                            <span class="review-item-label">Contact Coordinates</span>
                            <span class="review-item-value">${profile.personalInfo?.phone || 'N/A'} / ${profile.personalInfo?.email || 'N/A'}</span>
                          </div>
                        </div>
                      </div>

                      <div class="review-section">
                        <div class="review-section-title">Housing & Location Preferences</div>
                        <div class="review-grid">
                          <div class="review-item">
                            <span class="review-item-label">Preferred City</span>
                            <span class="review-item-value">${profile.locationPreferences?.city || 'N/A'}</span>
                          </div>
                          <div class="review-item">
                            <span class="review-item-label">Annual Budget Cap</span>
                            <span class="review-item-value">₦ ${(parseInt(profile.locationPreferences?.budget) || 0).toLocaleString()}</span>
                          </div>
                          <div class="review-item">
                            <span class="review-item-label">Property Preference</span>
                            <span class="review-item-value">${profile.housingPreferences?.propertyType || 'N/A'} (${profile.housingPreferences?.bedrooms || '0'} Bed)</span>
                          </div>
                          <div class="review-item">
                            <span class="review-item-label">Key Amenities</span>
                            <span class="review-item-value">${profile.housingPreferences?.amenities?.join(', ') || 'None selected'}</span>
                          </div>
                        </div>
                      </div>

                      <div class="review-section">
                        <div class="review-section-title">Income & Professional Standing</div>
                        <div class="review-grid">
                          <div class="review-item">
                            <span class="review-item-label">Employment Status</span>
                            <span class="review-item-value">${profile.employmentInfo?.status || 'N/A'}</span>
                          </div>
                          <div class="review-item">
                            <span class="review-item-label">Company & Job Title</span>
                            <span class="review-item-value">${profile.employmentInfo?.employer || 'N/A'} - ${profile.employmentInfo?.jobTitle || 'N/A'}</span>
                          </div>
                          <div class="review-item">
                            <span class="review-item-label">Monthly Income Flow</span>
                            <span class="review-item-value">₦ ${(parseInt(profile.incomeInfo?.monthlyIncome) || 0).toLocaleString()}</span>
                          </div>
                          <div class="review-item">
                            <span class="review-item-label">Bank Statement Verification</span>
                            <span class="review-item-value">${profile.incomeInfo?.statementUploaded ? 'Verified: Bank PDF Uploaded' : 'Not Uploaded'}</span>
                          </div>
                        </div>
                      </div>

                      <div class="review-section">
                        <div class="review-section-title">Lifestyle Tags</div>
                        <div style="font-size:14px; font-weight:bold; color:var(--color-primary);">
                          ${[
                            profile.lifestylePreferences?.pets ? 'Pet Owner' : '',
                            profile.lifestylePreferences?.smoking ? 'Smoker' : '',
                            profile.lifestylePreferences?.quietHours ? 'Quiet Preference' : '',
                            profile.lifestylePreferences?.sharing ? 'Shares Spaces' : ''
                          ].filter(Boolean).join(', ') || 'No custom toggles activated'}
                        </div>
                      </div>
                    </div>
                  ` : ''}

                  <!-- Actions footer inside form -->
                  <div class="wizard-footer">
                    ${wizardStep > 1 ? `
                      <button type="button" class="btn btn-outline" id="wz-back-btn">Back</button>
                    ` : `
                      <div></div>
                    `}
                    
                    ${wizardStep < 7 ? `
                      <button type="submit" class="btn btn-primary" id="wz-next-btn">Next Step</button>
                    ` : `
                      <button type="button" class="btn btn-secondary" id="wz-submit-btn">Submit Profile</button>
                    `}
                  </div>

                </form>
              </div>

            </div>
          </div>

        </div>
      </div>
    `;
  },

  init(state, navigateTo, updateState) {
    const wizardStep = state.wizardStep || 1;
    const profile = state.profileData || {};

    // Form element
    const form = document.getElementById('wizard-form');

    // Setup helper: clear errors
    const clearErrors = () => {
      document.querySelectorAll('.form-error').forEach(el => el.innerText = '');
      document.querySelectorAll('.form-input').forEach(el => el.classList.remove('error'));
    };

    // 1. Back button listener
    document.getElementById('wz-back-btn')?.addEventListener('click', () => {
      if (wizardStep > 1) {
        updateState({ wizardStep: wizardStep - 1 });
        navigateTo('profile-wizard');
      }
    });

    // 2. Lifestyle Tag toggle events (Step 6)
    if (wizardStep === 6) {
      const toggleTag = (id, fieldName) => {
        const btn = document.getElementById(id);
        btn?.addEventListener('click', () => {
          const isSelected = btn.classList.contains('selected');
          
          const newPrefs = { 
            ...profile.lifestylePreferences, 
            [fieldName]: !isSelected 
          };
          
          updateState({
            profileData: {
              ...profile,
              lifestylePreferences: newPrefs
            }
          });
          
          btn.classList.toggle('selected');
        });
      };
      toggleTag('tag-pets', 'pets');
      toggleTag('tag-smoking', 'smoking');
      toggleTag('tag-quiet', 'quietHours');
      toggleTag('tag-sharing', 'sharing');
    }

    // 3. Bank dropzone statement simulation (Step 5)
    if (wizardStep === 5) {
      const dropzone = document.getElementById('wz-bank-dropzone');
      dropzone?.addEventListener('click', () => {
        updateState({
          profileData: {
            ...profile,
            incomeInfo: {
              ...profile.incomeInfo,
              statementUploaded: true
            }
          }
        });
        const label = document.getElementById('wz-bank-file');
        if (label) label.innerHTML = '&#128196; statement_validated.pdf (1.8 MB)';
        alert("Simulated banking check: PDF verified by mock bank connection.");
      });
    }

    // 4. Submit validation & progressions (Steps 1-6)
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      clearErrors();
      let isValid = true;

      // STEP 1 VALIDATION
      if (wizardStep === 1) {
        const fullnameEl = document.getElementById('wz-fullname');
        const dobEl = document.getElementById('wz-dob');
        const genderEl = document.getElementById('wz-gender');
        const phoneEl = document.getElementById('wz-phone');
        const emailEl = document.getElementById('wz-email');

        if (!fullnameEl.value.trim()) {
          document.getElementById('err-fullname').innerText = 'Legal Name is required';
          fullnameEl.classList.add('error');
          isValid = false;
        }
        if (!dobEl.value) {
          document.getElementById('err-dob').innerText = 'Birthdate is required';
          dobEl.classList.add('error');
          isValid = false;
        }
        if (!genderEl.value) {
          document.getElementById('err-gender').innerText = 'Please select a gender';
          genderEl.classList.add('error');
          isValid = false;
        }
        if (!phoneEl.value.trim()) {
          document.getElementById('err-phone').innerText = 'Phone number is required';
          phoneEl.classList.add('error');
          isValid = false;
        }
        if (!emailEl.value.trim()) {
          document.getElementById('err-email').innerText = 'Email coordinates required';
          emailEl.classList.add('error');
          isValid = false;
        }

        if (isValid) {
          updateState({
            profileData: {
              ...profile,
              personalInfo: {
                fullName: fullnameEl.value.trim(),
                dob: dobEl.value,
                gender: genderEl.value,
                phone: phoneEl.value.trim(),
                email: emailEl.value.trim()
              }
            }
          });
        }
      }

      // STEP 2 VALIDATION
      if (wizardStep === 2) {
        const cityEl = document.getElementById('wz-city');
        const neighborhoodsEl = document.getElementById('wz-neighborhoods');
        const budgetEl = document.getElementById('wz-budget');

        if (!cityEl.value) {
          document.getElementById('err-city').innerText = 'Preferred City is required';
          cityEl.classList.add('error');
          isValid = false;
        }
        if (!neighborhoodsEl.value.trim()) {
          document.getElementById('err-neighborhoods').innerText = 'Neighborhood keywords are required';
          neighborhoodsEl.classList.add('error');
          isValid = false;
        }
        if (!budgetEl.value || parseInt(budgetEl.value) <= 0) {
          document.getElementById('err-budget').innerText = 'Budget budget cap required';
          budgetEl.classList.add('error');
          isValid = false;
        }

        if (isValid) {
          updateState({
            profileData: {
              ...profile,
              locationPreferences: {
                city: cityEl.value,
                neighborhoods: neighborhoodsEl.value.trim(),
                budget: budgetEl.value
              }
            }
          });
        }
      }

      // STEP 3 VALIDATION
      if (wizardStep === 3) {
        const proptypeEl = document.getElementById('wz-proptype');
        const bedroomsEl = document.getElementById('wz-bedrooms');
        const checkedAmenities = Array.from(document.querySelectorAll('input[name="amenity"]:checked')).map(el => el.value);

        if (!proptypeEl.value) {
          document.getElementById('err-proptype').innerText = 'Select a property type';
          proptypeEl.classList.add('error');
          isValid = false;
        }
        if (!bedroomsEl.value) {
          document.getElementById('err-bedrooms').innerText = 'Select bedroom scale';
          bedroomsEl.classList.add('error');
          isValid = false;
        }

        if (isValid) {
          updateState({
            profileData: {
              ...profile,
              housingPreferences: {
                propertyType: proptypeEl.value,
                bedrooms: bedroomsEl.value,
                amenities: checkedAmenities
              }
            }
          });
        }
      }

      // STEP 4 VALIDATION
      if (wizardStep === 4) {
        const statusEl = document.getElementById('wz-employment');
        const employerEl = document.getElementById('wz-employer');
        const jobEl = document.getElementById('wz-jobtitle');

        if (!statusEl.value) {
          document.getElementById('err-employment').innerText = 'Employment standing is required';
          statusEl.classList.add('error');
          isValid = false;
        }
        if (statusEl.value === 'Employed') {
          if (!employerEl.value.trim()) {
            document.getElementById('err-employer').innerText = 'Company name required for Salary Earner';
            employerEl.classList.add('error');
            isValid = false;
          }
          if (!jobEl.value.trim()) {
            document.getElementById('err-jobtitle').innerText = 'Job Title required';
            jobEl.classList.add('error');
            isValid = false;
          }
        }

        if (isValid) {
          updateState({
            profileData: {
              ...profile,
              employmentInfo: {
                status: statusEl.value,
                employer: employerEl.value.trim(),
                jobTitle: jobEl.value.trim()
              }
            }
          });
        }
      }

      // STEP 5 VALIDATION
      if (wizardStep === 5) {
        const incomeEl = document.getElementById('wz-income');
        
        if (!incomeEl.value || parseInt(incomeEl.value) <= 0) {
          document.getElementById('err-income').innerText = 'Average monthly flow is required';
          incomeEl.classList.add('error');
          isValid = false;
        }
        if (!profile.incomeInfo?.statementUploaded) {
          document.getElementById('err-statement').innerText = 'Please click dropzone to upload qualifying bank statement.';
          isValid = false;
        }

        if (isValid) {
          updateState({
            profileData: {
              ...profile,
              incomeInfo: {
                ...profile.incomeInfo,
                monthlyIncome: incomeEl.value
              }
            }
          });
        }
      }

      if (!isValid) return;

      // Move to next step
      updateState({ wizardStep: wizardStep + 1 });
      navigateTo('profile-wizard');
    });

    // 5. Final Step Submit Click
    document.getElementById('wz-submit-btn')?.addEventListener('click', () => {
      // Simulate profile submission completed
      // Initialize verification check parameters to 'pending' once submitted
      // (Tenant profile details are sent, BVN/NIN/Selfie checks are still pending user completion)
      updateState({
        wizardStep: 1,
        verification: {
          bvnStatus: 'unverified',
          ninStatus: 'unverified',
          selfieStatus: 'unverified',
          employeeIdStatus: 'unverified',
          studentIdStatus: 'unverified',
          documentStatus: 'unverified'
        }
      });
      alert("Tenant Profile Setup Submitted Successfully! Complete identity matching next.");
      navigateTo('dashboard');
    });
  }
};
