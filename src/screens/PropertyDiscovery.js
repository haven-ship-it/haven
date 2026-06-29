// Property Discovery & AI Matching Screen
export const PropertyDiscovery = {
  render(state) {
    const properties = state.properties || [];
    const filters = state.filters || {};
    const viewMode = state.discoveryViewMode || 'grid';
    const activeDetailsId = state.activeDetailsPropertyId;
    const favs = state.favorites || [];

    // 1. Filtering Logic
    const filteredProps = properties.filter(p => {
      // Search text match
      if (filters.search && !p.title.toLowerCase().includes(filters.search.toLowerCase()) && !p.location.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      // Location dropdown
      if (filters.location && p.location !== filters.location) {
        return false;
      }
      // Max budget cap
      if (p.rent > filters.maxBudget) {
        return false;
      }
      // Bedrooms scale
      if (filters.bedrooms && p.bedrooms !== parseInt(filters.bedrooms)) {
        return false;
      }
      // Property type selection
      if (filters.propertyType && p.propertyType !== filters.propertyType) {
        return false;
      }
      // Amenities filter
      if (filters.amenities && filters.amenities.length > 0) {
        const matchesAll = filters.amenities.every(a => p.amenities.includes(a));
        if (!matchesAll) return false;
      }
      return true;
    });

    // 2. Render Property Cards
    const resultsHTML = filteredProps.map(p => {
      const isFav = favs.includes(p.id);
      
      if (viewMode === 'grid') {
        return `
          <div class="property-card" id="prop-card-${p.id}" data-id="${p.id}">
            <div class="property-img-placeholder" style="background-image: url('${p.image}'); background-size:cover; background-position:center; height:180px;">
              <span class="property-badge-match">${p.match.score}% Match</span>
              <button class="btn-fav-toggle" data-id="${p.id}" style="position:absolute; top:12px; left:12px; background:white; border:none; width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer; box-shadow:var(--shadow-sm);">
                <span style="color:${isFav ? 'var(--color-error)' : '#9CA3AF'}; font-size:18px;">${isFav ? '&#9829;' : '&#9825;'}</span>
              </button>
            </div>
            <div class="property-info" style="cursor:pointer;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                <span class="property-price">₦ ${p.rent.toLocaleString()} / Yr</span>
                <span style="font-size:10px; font-weight:bold; color:var(--color-secondary);">${p.propertyType}</span>
              </div>
              <span class="property-title" style="font-size:14px; font-weight:bold; color:var(--color-primary);">${p.title}</span>
              <span style="font-size:12px; color:#6B7280;">${p.location}, ${p.city}</span>
              <div class="property-specs" style="margin-top:8px; border-bottom:none; padding-bottom:0; margin-bottom:0;">
                <span>&#128719; ${p.bedrooms} Beds</span>
                <span>&bull;</span>
                <span>&#128704; ${p.bathrooms} Baths</span>
              </div>
              <button class="btn btn-outline btn-sm btn-open-details" data-id="${p.id}" style="width:100%; margin-top:12px;">View AI Insights</button>
            </div>
          </div>
        `;
      } else {
        // List View Card
        return `
          <div class="property-list-card" id="prop-card-${p.id}" data-id="${p.id}">
            <div class="property-list-img" style="background-image: url('${p.image}');">
              <span class="property-badge-match">${p.match.score}% Match</span>
              <button class="btn-fav-toggle" data-id="${p.id}" style="position:absolute; top:12px; left:12px; background:white; border:none; width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer; box-shadow:var(--shadow-sm);">
                <span style="color:${isFav ? 'var(--color-error)' : '#9CA3AF'}; font-size:18px;">${isFav ? '&#9829;' : '&#9825;'}</span>
              </button>
            </div>
            <div class="property-list-content">
              <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                <div>
                  <h3 style="font-size:16px; font-weight:bold; color:var(--color-primary); margin:0;">${p.title}</h3>
                  <span style="font-size:12px; color:#6B7280;">${p.location}, ${p.city}</span>
                </div>
                <span class="property-price" style="font-size:18px;">₦ ${p.rent.toLocaleString()} / Yr</span>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid #F3F4F6; padding-top:12px; margin-top:8px;">
                <div style="display:flex; gap:12px; font-size:12px; color:#6B7280;">
                  <span>&#128719; ${p.bedrooms} Beds</span>
                  <span>&#128704; ${p.bathrooms} Baths</span>
                  <span>&bull;</span>
                  <span>${p.propertyType}</span>
                </div>
                <button class="btn btn-primary btn-sm btn-open-details" data-id="${p.id}" style="padding:6px 12px; font-size:11px;">View AI Insights</button>
              </div>
            </div>
          </div>
        `;
      }
    }).join('');

    // 3. Map price pins rendering
    const mapPinsHTML = filteredProps.map(p => {
      const isSelected = activeDetailsId === p.id;
      const formattedRent = p.rent >= 1000000 ? `${(p.rent / 1000000).toFixed(1)}M` : `${p.rent / 1000}k`;
      return `
        <div class="map-price-pin ${isSelected ? 'selected' : ''}" data-id="${p.id}" style="left: ${p.mapX}%; top: ${p.mapY}%;">
          ₦ ${formattedRent}
        </div>
      `;
    }).join('');

    // 4. Property Details Modal (If activeDetailsId set)
    let detailsModalHTML = '';
    if (activeDetailsId) {
      const p = properties.find(item => item.id === activeDetailsId);
      if (p) {
        const isFav = favs.includes(p.id);
        const matchPercent = p.match.score;
        const progressOffset = 188 - (188 * (matchPercent / 100)); // concentric match visualizer

        // Similar properties list (filtering same neighborhood or close price range)
        const similarProps = properties.filter(item => item.id !== p.id).slice(0, 2);

        detailsModalHTML = `
          <div class="modal-overlay" id="prop-details-modal">
            <div class="modal-content-card" style="max-width: 780px; padding: 0; overflow:hidden; display:flex; flex-direction:column; max-height:90vh;">
              
              <!-- Gallery Header -->
              <div class="modal-gallery-container">
                <div class="modal-gallery-img" style="background-image: url('${p.image}');"></div>
                <button id="close-details-modal" style="position:absolute; top:16px; right:16px; background:rgba(13,27,75,0.7); color:white; border:none; width:36px; height:36px; border-radius:50%; font-size:18px; font-weight:bold; cursor:pointer; display:flex; align-items:center; justify-content:center;">&times;</button>
                <div style="position:absolute; bottom:16px; left:16px; display:flex; gap:8px;">
                  <span class="badge badge-approved" style="background:var(--color-primary); color:white; border:none;">${p.availability}</span>
                  <span class="badge badge-approved">${p.propertyType}</span>
                </div>
              </div>

              <!-- Main details scroll section -->
              <div style="flex:1; overflow-y:auto; padding:24px 32px; display:flex; flex-direction:column; gap:24px;">
                
                <!-- Title Row -->
                <div style="display:flex; justify-content:space-between; align-items:flex-start; border-bottom:1px solid #E5E7EB; padding-bottom:16px;">
                  <div>
                    <h2 style="font-size:22px; font-weight:bold; color:var(--color-primary); margin:0;">${p.title}</h2>
                    <p style="font-size:13px; color:#6B7280; margin-top:4px;">${p.location}, ${p.city} &bull; &#128719; ${p.bedrooms} Bedrooms &bull; &#128704; ${p.bathrooms} Bathrooms</p>
                  </div>
                  <div style="text-align:right;">
                    <div class="property-price" style="font-size:24px;">₦ ${p.rent.toLocaleString()} <span style="font-size:13px; font-weight:normal; color:#6B7280;">/ Yr</span></div>
                    <span style="font-size:10px; color:#9CA3AF;">Caution Fee: ₦ 250,000</span>
                  </div>
                </div>

                <!-- AI Matching Insights block -->
                <div class="card" style="padding:20px; border-color:rgba(26,122,138,0.15); background-color:rgba(26,122,138,0.02);">
                  <div style="display:flex; align-items:center; gap:20px; margin-bottom:16px;">
                    <!-- Concentric Circle Match -->
                    <div style="position:relative; width:68px; height:68px;">
                      <svg width="68" height="68">
                        <circle cx="34" cy="34" r="30" fill="none" stroke="#E5E7EB" stroke-width="6"/>
                        <circle cx="34" cy="34" r="30" fill="none" stroke="var(--color-secondary)" stroke-width="6" stroke-linecap="round" stroke-dasharray="188" stroke-dashoffset="${progressOffset}" transform="rotate(-90 34 34)"/>
                      </svg>
                      <div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); font-weight:bold; font-size:15px; color:var(--color-primary);">${matchPercent}%</div>
                    </div>
                    <div>
                      <h4 style="font-weight:bold; color:var(--color-primary); margin:0;">AI Qualification Match Insights</h4>
                      <p style="font-size:12px; color:#6B7280; margin-top:2px;">Calculated dynamically against your verified Haven tenant profile details.</p>
                    </div>
                  </div>

                  <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px; font-size:12px;">
                    <div style="padding:8px 12px; background:white; border:1px solid #E5E7EB; border-radius:8px;">
                      <strong>Affordability Fit:</strong> <span style="color:var(--color-success); font-weight:500;">Excellent</span>
                      <div style="color:#6B7280; font-size:11px; margin-top:2px;">Rent represents 32% of monthly income.</div>
                    </div>
                    <div style="padding:8px 12px; background:white; border:1px solid #E5E7EB; border-radius:8px;">
                      <strong>Lifestyle preferences:</strong> <span style="color:var(--color-success); font-weight:500;">100% Match</span>
                      <div style="color:#6B7280; font-size:11px; margin-top:2px;">Quiet hours align with preferences.</div>
                    </div>
                    <div style="padding:8px 12px; background:white; border:1px solid #E5E7EB; border-radius:8px;">
                      <strong>Commute Analysis:</strong> <span style="font-weight:500;">${p.match.commute.split(' ')[0]} ${p.match.commute.split(' ')[1]}</span>
                      <div style="color:#6B7280; font-size:11px; margin-top:2px;">${p.match.commute}</div>
                    </div>
                    <div style="padding:8px 12px; background:white; border:1px solid #E5E7EB; border-radius:8px;">
                      <strong>Legal Audit Check:</strong> <span style="color:var(--color-success); font-weight:500;">Deeds Passed</span>
                      <div style="color:#6B7280; font-size:11px; margin-top:2px;">Property title cleared against land logs.</div>
                    </div>
                  </div>
                </div>

                <!-- Amenities & Rules -->
                <div style="display:grid; grid-template-columns:1.2fr 0.8fr; gap:24px;">
                  <div>
                    <h3 style="font-size:14px; font-weight:bold; color:var(--color-primary); margin-bottom:8px;">Key Amenities</h3>
                    <div style="display:flex; flex-wrap:wrap; gap:8px;">
                      ${p.amenities.map(a => `<span class="badge" style="background:#F3F4F6; color:var(--color-primary); font-size:11px;">${a}</span>`).join('')}
                    </div>
                  </div>
                  <div>
                    <h3 style="font-size:14px; font-weight:bold; color:var(--color-primary); margin-bottom:8px;">Property Rules</h3>
                    <p style="font-size:11px; color:#6B7280; line-height:1.4;">${p.rules}</p>
                  </div>
                </div>

                <!-- Property Analytics -->
                <div style="background:#FAF9F6; padding:16px; border-radius:12px; border:1px solid #E5E7EB; display:flex; justify-content:space-around; text-align:center;">
                  <div>
                    <div style="font-size:20px; font-weight:bold; color:var(--color-secondary);">${p.analytics.demand}%</div>
                    <span style="font-size:10px; color:#6B7280; text-transform:uppercase; font-weight:bold;">Demand Index</span>
                  </div>
                  <div>
                    <div style="font-size:20px; font-weight:bold; color:var(--color-secondary);">${p.analytics.popularity}%</div>
                    <span style="font-size:10px; color:#6B7280; text-transform:uppercase; font-weight:bold;">Popularity Percentile</span>
                  </div>
                  <div>
                    <div style="font-size:20px; font-weight:bold; color:var(--color-primary);">${p.analytics.views}</div>
                    <span style="font-size:10px; color:#6B7280; text-transform:uppercase; font-weight:bold;">Weekly Views</span>
                  </div>
                </div>

                <!-- Similar properties recommendation -->
                <div>
                  <h4 style="font-size:13px; font-weight:bold; color:var(--color-primary); margin-bottom:12px;">Similar Properties Recommendations</h4>
                  <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
                    ${similarProps.map(sp => `
                      <div style="padding:10px; background:white; border:1px solid #E5E7EB; border-radius:10px; display:flex; gap:12px; align-items:center; cursor:pointer;" class="similar-prop-card" data-id="${sp.id}">
                        <div style="width:50px; height:50px; border-radius:6px; background-image:url('${sp.image}'); background-size:cover; background-position:center; flex-shrink:0;"></div>
                        <div style="flex:1; overflow:hidden;">
                          <div style="font-size:11px; font-weight:bold; text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">${sp.title}</div>
                          <div style="font-size:10px; color:var(--color-secondary); font-weight:bold; margin-top:2px;">₦ ${sp.rent.toLocaleString()} / Yr</div>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                </div>

              </div>

              <!-- Footer Actions -->
              <div style="padding:20px 32px; border-top:1px solid #E5E7EB; display:flex; justify-content:space-between; align-items:center; background:#FAF9F6;">
                <button class="btn btn-outline btn-sm btn-details-fav-toggle" data-id="${p.id}" style="display:flex; align-items:center; gap:6px;">
                  <span style="color:${isFav ? 'var(--color-error)' : '#9CA3AF'}; font-size:16px;">${isFav ? '&#9829;' : '&#9825;'}</span>
                  ${isFav ? 'Saved in Favorites' : 'Save to Favorites'}
                </button>
                
                <button class="btn btn-primary btn-sm btn-details-apply" data-id="${p.id}" data-title="${p.title}" data-location="${p.location}">Submit Application</button>
              </div>

            </div>
          </div>
        `;
      }
    }

    // 5. Compare drawer rendering (Visible if favorites has at least 1 item)
    let compareDrawerHTML = '';
    const isCompareOpen = state.compareOpen || false;
    
    if (favs.length > 0) {
      const favProperties = properties.filter(item => favs.includes(item.id));
      
      compareDrawerHTML = `
        <div class="compare-drawer ${isCompareOpen ? 'open' : ''}" id="discovery-compare-drawer">
          <div class="compare-drawer-header">
            <div>
              <span style="font-weight:bold; color:var(--color-primary); font-size:14px;">Favorites & Comparison Pool</span>
              <span class="badge badge-approved" style="font-size:10px; margin-left:8px; background:var(--color-secondary); color:white;">${favs.length} Saved</span>
            </div>
            <div style="display:flex; gap:12px;">
              <button class="btn btn-outline btn-sm" id="btn-toggle-compare" style="padding:6px 12px; font-size:11px;">
                ${isCompareOpen ? 'Collapse Comparison' : 'Compare Saved Properties'}
              </button>
              <button class="btn btn-outline btn-sm" id="btn-clear-favs" style="padding:6px 12px; font-size:11px; border-color:var(--color-error); color:var(--color-error); background:none;">Clear All</button>
            </div>
          </div>

          <!-- Side-by-Side Comparison grid tables -->
          ${isCompareOpen ? `
            <div class="compare-drawer-content animate-slide-up">
              <table class="compare-table">
                <thead>
                  <tr>
                    <th>Attributes</th>
                    ${favProperties.map(p => `
                      <th style="min-width:180px;">
                        <div style="font-weight:bold; font-size:12px; margin-bottom:4px; text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">${p.title}</div>
                        <span class="badge badge-approved" style="font-size:9px;">${p.match.score}% AI Match</span>
                      </th>
                    `).join('')}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Annual rent</strong></td>
                    ${favProperties.map(p => `<td style="font-weight:bold; color:var(--color-primary);">₦ ${p.rent.toLocaleString()}</td>`).join('')}
                  </tr>
                  <tr>
                    <td><strong>Location</strong></td>
                    ${favProperties.map(p => `<td>${p.location}</td>`).join('')}
                  </tr>
                  <tr>
                    <td><strong>Bedrooms</strong></td>
                    ${favProperties.map(p => `<td>${p.bedrooms} Beds / ${p.bathrooms} Baths</td>`).join('')}
                  </tr>
                  <tr>
                    <td><strong>Affordability Fit</strong></td>
                    ${favProperties.map(p => `<td>${p.match.affordability.split(' ')[0]}</td>`).join('')}
                  </tr>
                  <tr>
                    <td><strong>Commute time</strong></td>
                    ${favProperties.map(p => `<td>${p.match.commute}</td>`).join('')}
                  </tr>
                  <tr>
                    <td><strong>Amenities</strong></td>
                    ${favProperties.map(p => `<td style="font-size:10px;">${p.amenities.slice(0,3).join(', ')}...</td>`).join('')}
                  </tr>
                  <tr>
                    <td><strong>Action</strong></td>
                    ${favProperties.map(p => `
                      <td>
                        <button class="btn btn-primary btn-sm btn-details-apply" data-id="${p.id}" data-title="${p.title}" data-location="${p.location}" style="padding:4px 8px; font-size:10px;">Apply Now</button>
                        <button class="btn btn-outline btn-sm btn-fav-toggle" data-id="${p.id}" style="padding:4px 8px; font-size:10px; margin-left:4px; border-color:var(--color-error); color:var(--color-error);">Remove</button>
                      </td>
                    `).join('')}
                  </tr>
                </tbody>
              </table>
            </div>
          ` : ''}
        </div>
      `;
    }

    return `
      <div class="discovery-split-layout">
        
        <!-- Left: Property Results list -->
        <div class="discovery-results-panel">
          
          <!-- Search header & Filters -->
          <div class="search-filter-header">
            <div class="search-bar-row">
              <div class="search-input-wrapper">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input class="search-bar-input" type="text" id="disc-search-box" placeholder="Search by neighborhood, street name, address..." value="${filters.search || ''}">
              </div>
              
              <!-- Grid/List Toggle buttons -->
              <div class="view-mode-tabs">
                <button class="view-mode-btn ${viewMode === 'grid' ? 'active' : ''}" id="btn-mode-grid" aria-label="Grid View">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                </button>
                <button class="view-mode-btn ${viewMode === 'list' ? 'active' : ''}" id="btn-mode-list" aria-label="List View">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                </button>
              </div>
            </div>

            <!-- Filters Selection row -->
            <div class="advanced-filters-drawer">
              <!-- Location -->
              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label" style="font-size:11px;">Neighborhood</label>
                <select class="form-input" style="padding:8px 10px; font-size:12px;" id="filt-location">
                  <option value="">All Areas</option>
                  <option value="Lekki Phase 1" ${filters.location === 'Lekki Phase 1' ? 'selected' : ''}>Lekki Phase 1</option>
                  <option value="Lekki Phase 2" ${filters.location === 'Lekki Phase 2' ? 'selected' : ''}>Lekki Phase 2</option>
                  <option value="Victoria Island" ${filters.location === 'Victoria Island' ? 'selected' : ''}>Victoria Island</option>
                  <option value="Yaba" ${filters.location === 'Yaba' ? 'selected' : ''}>Yaba</option>
                  <option value="Surulere" ${filters.location === 'Surulere' ? 'selected' : ''}>Surulere</option>
                  <option value="Ikeja GRA" ${filters.location === 'Ikeja GRA' ? 'selected' : ''}>Ikeja GRA</option>
                </select>
              </div>
              
              <!-- Budget slider cap -->
              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label" style="font-size:11px; display:flex; justify-content:space-between;">
                  <span>Max Rent Cap</span> 
                  <strong>₦ ${(filters.maxBudget / 1000000).toFixed(1)}M</strong>
                </label>
                <input type="range" id="filt-budget" min="800000" max="6000000" step="100000" value="${filters.maxBudget}" style="accent-color:var(--color-secondary); margin-top:8px;">
              </div>

              <!-- Bedrooms -->
              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label" style="font-size:11px;">Bedrooms count</label>
                <select class="form-input" style="padding:8px 10px; font-size:12px;" id="filt-bedrooms">
                  <option value="">Any Bedrooms</option>
                  <option value="1" ${filters.bedrooms === '1' ? 'selected' : ''}>1 Bedroom</option>
                  <option value="2" ${filters.bedrooms === '2' ? 'selected' : ''}>2 Bedrooms</option>
                  <option value="3" ${filters.bedrooms === '3' ? 'selected' : ''}>3 Bedrooms</option>
                  <option value="4" ${filters.bedrooms === '4' ? 'selected' : ''}>4 Bedrooms</option>
                </select>
              </div>

              <!-- Property type -->
              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label" style="font-size:11px;">Property type</label>
                <select class="form-input" style="padding:8px 10px; font-size:12px;" id="filt-proptype">
                  <option value="">Any Type</option>
                  <option value="Apartment" ${filters.propertyType === 'Apartment' ? 'selected' : ''}>Apartment</option>
                  <option value="Studio" ${filters.propertyType === 'Studio' ? 'selected' : ''}>Studio Loft</option>
                  <option value="Duplex" ${filters.propertyType === 'Duplex' ? 'selected' : ''}>Duplex</option>
                  <option value="Shared flat" ${filters.propertyType === 'Shared flat' ? 'selected' : ''}>Shared Flat</option>
                </select>
              </div>
            </div>

          </div>

          <!-- Cards output -->
          <div style="font-size:13px; font-weight:bold; color:var(--color-primary);">
            Showing ${filteredProps.length} verified listings in Lagos matching filters
          </div>

          <div class="${viewMode === 'grid' ? 'grid-cols-2' : 'verification-check-list'}" id="discovery-results-grid">
            ${resultsHTML}
          </div>
        </div>

        <!-- Right: Stylized CSS map panel -->
        <div class="discovery-map-panel">
          <!-- Vector SVG Map of Lagos -->
          <svg class="lagos-vector-map" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
            <!-- Water Landmass -->
            <rect width="800" height="600" class="map-water"/>
            
            <!-- Mainland (Ikeja, Yaba, Surulere) -->
            <path d="M 50,50 L 300,50 L 350,150 L 400,280 L 280,480 L 100,480 L 50,200 Z" class="map-landmass"/>
            
            <!-- Victoria Island & Lekki Peninsulas -->
            <path d="M 400,320 L 580,320 L 780,350 L 780,500 L 500,500 L 400,400 Z" class="map-landmass"/>
            
            <!-- Bridges grids lines -->
            <line x1="300" y1="280" x2="420" y2="350" stroke="#94A3B8" stroke-width="8" stroke-linecap="round"/>
            <line x1="320" y1="290" x2="440" y2="360" stroke="white" stroke-width="2" stroke-dasharray="4"/>
            
            <!-- District Label nodes text -->
            <text x="120" y="100" fill="#475569" font-size="16" font-weight="bold">Ikeja GRA</text>
            <text x="270" y="220" fill="#475569" font-size="16" font-weight="bold">Yaba</text>
            <text x="210" y="360" fill="#475569" font-size="16" font-weight="bold">Surulere</text>
            <text x="460" y="440" fill="#475569" font-size="16" font-weight="bold">Victoria Island</text>
            <text x="640" y="420" fill="#475569" font-size="16" font-weight="bold">Lekki Phase 1</text>
            <text x="680" y="480" fill="#475569" font-size="13" font-weight="bold">Lekki Phase 2</text>
          </svg>

          <!-- Floating Price Pins -->
          <div id="map-pins-container">
            ${mapPinsHTML}
          </div>
        </div>

      </div>

      <!-- Property Details Modal overlay -->
      ${detailsModalHTML}

      <!-- Bottom compare drawer overlay -->
      ${compareDrawerHTML}
    `;
  },

  init(state, navigateTo, updateState) {
    const activeDetailsId = state.activeDetailsPropertyId;
    const favs = state.favorites || [];

    // 1. Grid/List view toggles
    document.getElementById('btn-mode-grid')?.addEventListener('click', () => {
      updateState({ discoveryViewMode: 'grid' });
      navigateTo('discovery');
    });
    document.getElementById('btn-mode-list')?.addEventListener('click', () => {
      updateState({ discoveryViewMode: 'list' });
      navigateTo('discovery');
    });

    // 2. Search inputs & filter modifications
    const searchBox = document.getElementById('disc-search-box');
    searchBox?.addEventListener('input', () => {
      updateState({
        filters: { ...state.filters, search: searchBox.value }
      });
      // Defer render briefly for input smooth responsiveness
      clearTimeout(this.searchTimer);
      this.searchTimer = setTimeout(() => navigateTo('discovery'), 300);
    });

    // Neighborhood select
    const locationSelect = document.getElementById('filt-location');
    locationSelect?.addEventListener('change', () => {
      updateState({
        filters: { ...state.filters, location: locationSelect.value }
      });
      navigateTo('discovery');
    });

    // Budget slider
    const budgetSlider = document.getElementById('filt-budget');
    budgetSlider?.addEventListener('input', () => {
      updateState({
        filters: { ...state.filters, maxBudget: parseInt(budgetSlider.value) }
      });
      clearTimeout(this.budgetTimer);
      this.budgetTimer = setTimeout(() => navigateTo('discovery'), 100);
    });

    // Bedrooms dropdown
    const bedroomsSelect = document.getElementById('filt-bedrooms');
    bedroomsSelect?.addEventListener('change', () => {
      updateState({
        filters: { ...state.filters, bedrooms: bedroomsSelect.value }
      });
      navigateTo('discovery');
    });

    // Property Type
    const propTypeSelect = document.getElementById('filt-proptype');
    propTypeSelect?.addEventListener('change', () => {
      updateState({
        filters: { ...state.filters, propertyType: propTypeSelect.value }
      });
      navigateTo('discovery');
    });

    // 3. Open Details modal callbacks
    document.querySelectorAll('.btn-open-details').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = parseInt(btn.getAttribute('data-id'));
        updateState({ activeDetailsPropertyId: id });
        navigateTo('discovery');
      });
    });

    // Close details modal
    document.getElementById('close-details-modal')?.addEventListener('click', () => {
      updateState({ activeDetailsPropertyId: null });
      navigateTo('discovery');
    });

    // Details Modal apply button click handler
    document.querySelectorAll('.btn-details-apply').forEach(btn => {
      btn.addEventListener('click', () => {
        const propTitle = btn.getAttribute('data-title');
        const propLoc = btn.getAttribute('data-location');
        
        // Push application events
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
          notifications: newNotifications,
          activeDetailsPropertyId: null // Close modal
        });

        alert(`Application Submitted! \nYour credentials and Haven Tenant Quality Score (Grade A) have been securely sent to the landlord of "${propTitle}".`);
        navigateTo('dashboard');
      });
    });

    // 4. Favorites & Comparison Toggles
    document.querySelectorAll('.btn-fav-toggle, .btn-details-fav-toggle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = parseInt(btn.getAttribute('data-id'));
        let newFavs = [...favs];
        
        if (newFavs.includes(id)) {
          newFavs = newFavs.filter(favId => favId !== id);
          // If clearing comparisons
        } else {
          newFavs.push(id);
        }

        updateState({ favorites: newFavs });
        navigateTo('discovery');
      });
    });

    // Compare Drawer actions
    document.getElementById('btn-toggle-compare')?.addEventListener('click', () => {
      updateState({ compareOpen: !state.compareOpen });
      navigateTo('discovery');
    });

    // Clear all favorites
    document.getElementById('btn-clear-favs')?.addEventListener('click', () => {
      updateState({ favorites: [], compareOpen: false });
      navigateTo('discovery');
    });

    // 5. Similar Property Cards clicks inside modal
    document.querySelectorAll('.similar-prop-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = parseInt(card.getAttribute('data-id'));
        updateState({ activeDetailsPropertyId: id });
        navigateTo('discovery');
      });
    });

    // 6. Map pin clicks matching grid property highlights
    document.querySelectorAll('.map-price-pin').forEach(pin => {
      pin.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = parseInt(pin.getAttribute('data-id'));
        
        // Toggle selected state visual glow on card & pin
        updateState({ activeDetailsPropertyId: id });
        navigateTo('discovery');

        // Scroll results card into view
        const targetCard = document.getElementById(`prop-card-${id}`);
        if (targetCard) {
          targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
          targetCard.classList.add('highlighted');
          setTimeout(() => targetCard.classList.remove('highlighted'), 2000);
        }
      });
    });
  }
};
