/**
 * N Solutions Solar Company - Master Application Controller
 * Manages view routing, interactive rendering, dynamic filtering,
 * Solar ROI Calculator, and Admin Portal with LocalStorage persistence.
 */

import { createIcons, icons } from 'lucide';
import { sound } from './audio.js';
import {
  COMPANY_INFO,
  CERTIFICATIONS,
  AWARDS,
  WORK_PROCESS,
  ENERGY_FLOW,
  WHY_CHOOSE_US,
  CHAIRMAN_MESSAGE,
  SERVICES,
  PRODUCTS,
  PROJECTS,
  TESTIMONIALS,
  JOURNEY_TIMELINE,
  LEADERSHIP,
  CAREER_JOBS,
  INITIAL_LEADS,
  INITIAL_ENQUIRIES,
  MEDIA_GALLERY
} from './solarData.js';

class NSolutionsApp {
  constructor() {
    this.currentView = 'home';
    this.currentAdminTab = 'dashboard';
    this.leads = this.loadStorage('ns_leads', INITIAL_LEADS);
    this.projects = this.loadStorage('ns_projects', PROJECTS);
    this.products = this.loadStorage('ns_products', PRODUCTS);
    this.gallery = this.loadStorage('ns_gallery', MEDIA_GALLERY);
    this.testimonials = this.loadStorage('ns_testimonials', TESTIMONIALS);
    this.enquiries = this.loadStorage('ns_enquiries', INITIAL_ENQUIRIES);

    // Active Filters
    this.homeProjectFilter = 'All';
    this.productsCategoryFilter = 'all';
    this.productsSearchQuery = '';
    this.projectsCategoryFilter = 'All';
    this.projectsStateFilter = 'All';
    this.projectsStatusFilter = 'All';
    this.mediaTabFilter = 'all';

    // Calculator State
    this.calcState = {
      category: 'residential',
      bill: 4500,
      area: 400,
      tech: 'topcon'
    };
  }

  loadStorage(key, defaultVal) {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultVal;
    } catch (e) {
      return defaultVal;
    }
  }

  saveStorage(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }

  init() {
    // 1. Setup Global Navigation
    this.setupNavigation();

    // 2. Setup Header Actions (Sound, Mobile Menu, Consult)
    this.setupHeaderControls();

    // 3. Render Initial Dynamic Views
    this.renderHomeContent();
    this.renderAboutContent();
    this.renderProductsContent();
    this.renderServicesContent();
    this.renderProjectsContent();
    this.renderMediaContent();
    this.renderCareersContent();
    this.renderAdminPortal();

    // 4. Initialize Interactive Calculator
    this.setupCalculator();

    // 5. Setup Contact Consultation Form
    this.setupContactForm();

    // 6. Setup Admin Portal Interactivity & Modals
    this.setupAdminInteractivity();

    // 7. Initialize Lucide Icons
    this.refreshIcons();

    // 8. Setup Global Scroll Progress & Floating Controls
    this.setupScrollAndFloatingControls();

    // 9. Setup Scroll Reveal Animations & Live Number Counters
    this.setupScrollReveals();

    // 10. Welcome Toast
    this.showToast('N Solutions Solar Portal Ready: 500+ Sites Delivered');
  }

  refreshIcons() {
    createIcons({ icons });
  }

  showToast(msg) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.innerHTML = `
      <i data-lucide="check-circle" style="width: 16px; height: 16px; color: #10b981;"></i>
      <span>${msg}</span>
    `;
    container.appendChild(toast);
    createIcons({ icons, nameAttr: 'data-lucide', root: toast });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  /* ==========================================================================
     NAVIGATION & VIEW ROUTING
     ========================================================================== */
  setupNavigation() {
    // Top Nav buttons
    document.querySelectorAll('[data-view]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const view = btn.dataset.view;
        if (view) {
          this.switchView(view);
          // Close mobile drawer if open
          const drawer = document.getElementById('mobile-drawer');
          if (drawer) drawer.classList.remove('open');
        }
      });
    });

    // Mobile nav links
    document.querySelectorAll('.mobile-nav-link').forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.dataset.view;
        if (view) {
          this.switchView(view);
          const drawer = document.getElementById('mobile-drawer');
          if (drawer) drawer.classList.remove('open');
        }
      });
    });
  }

  setupHeaderControls() {
    // Sound toggle
    const soundBtn = document.getElementById('btn-sound-toggle');
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        const isEnabled = sound.toggle();
        soundBtn.classList.toggle('active', isEnabled);
        this.showToast(isEnabled ? 'Audio Feedback Enabled' : 'Audio Feedback Muted');
        if (isEnabled) sound.playClick();
      });
    }

    // Mobile menu toggle
    const mobileBtn = document.getElementById('btn-mobile-menu');
    const drawer = document.getElementById('mobile-drawer');
    if (mobileBtn && drawer) {
      mobileBtn.addEventListener('click', () => {
        drawer.classList.toggle('open');
        sound.playClick();
      });
    }
  }

  switchView(viewName) {
    if (this.currentView === viewName) return;
    sound.playClick();

    // Update main nav active state
    document.querySelectorAll('#main-nav .nav-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.view === viewName);
    });

    // Update mobile nav active state
    document.querySelectorAll('.mobile-nav-link').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.view === viewName);
    });

    // Hide all views
    document.querySelectorAll('.view-section').forEach(sec => {
      sec.classList.remove('active-view');
    });

    // Show target view
    const target = document.getElementById(`view-${viewName}`);
    if (target) {
      target.classList.add('active-view');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    this.currentView = viewName;
    this.refreshIcons();

    // Trigger scroll reveals in new view
    setTimeout(() => {
      this.setupScrollReveals();
    }, 50);

    // If switching to admin, refresh dashboard KPIs
    if (viewName === 'admin') {
      this.updateAdminDashboardKPIs();
    }
  }

  /* ==========================================================================
     HOME PAGE RENDERING
     ========================================================================== */
  renderHomeContent() {
    // 1. Render Filterable Projects on Home
    this.renderHomeProjects();

    // Project filter pill clicks
    const filterContainer = document.getElementById('home-project-filters');
    if (filterContainer) {
      filterContainer.querySelectorAll('.filter-pill-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          filterContainer.querySelectorAll('.filter-pill-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.homeProjectFilter = btn.dataset.filter;
          this.renderHomeProjects();
          sound.playClick();
        });
      });
    }

    // 2. Render Testimonials
    const testContainer = document.getElementById('home-testimonials-container');
    if (testContainer) {
      testContainer.innerHTML = this.testimonials.slice(0, 3).map(t => `
        <div class="testimonial-card">
          <div>
            <div class="testimonial-rating">
              ${'★'.repeat(t.rating || 5)}
            </div>
            <p class="testimonial-quote">"${t.text}"</p>
          </div>
          <div class="testimonial-author">
            <span class="author-name">${t.name}</span>
            <span class="author-comp">${t.company} — ${t.project || 'Solar EPC'}</span>
          </div>
        </div>
      `).join('');
    }

    // 3. Render Approved Certifications
    const certContainer = document.getElementById('home-certifications-container');
    if (certContainer) {
      certContainer.innerHTML = CERTIFICATIONS.slice(0, 6).map(c => `
        <div class="cert-card">
          <span class="cert-badge-tag">${c.badge}</span>
          <h4 class="cert-title">${c.title}</h4>
          <span class="cert-issuer">${c.issuer}</span>
          <p class="cert-desc">${c.desc}</p>
        </div>
      `).join('');
    }

    // 4. Render Awards
    const awardContainer = document.getElementById('home-awards-container');
    if (awardContainer) {
      awardContainer.innerHTML = AWARDS.map(a => `
        <div class="award-card">
          <span class="award-year-tag">${a.year} • ${a.org}</span>
          <h4 class="award-title">${a.title}</h4>
          <p class="award-desc">${a.desc}</p>
        </div>
      `).join('');
    }

    // 5. Render Why Choose Us
    const whyContainer = document.getElementById('home-why-choose-container');
    if (whyContainer) {
      whyContainer.innerHTML = WHY_CHOOSE_US.map((w, idx) => `
        <div class="why-card">
          <div class="why-card-icon">
            <i data-lucide="${idx === 0 ? 'shield-check' : idx === 1 ? 'map-pin' : idx === 2 ? 'award' : idx === 3 ? 'file-check' : idx === 4 ? 'cpu' : 'wrench'}"></i>
          </div>
          <h4 class="why-card-title">${w.title}</h4>
          <p class="why-card-desc">${w.desc}</p>
        </div>
      `).join('');
    }
  }

  renderHomeProjects() {
    const container = document.getElementById('home-projects-container');
    if (!container) return;

    const filtered = this.homeProjectFilter === 'All'
      ? this.projects.slice(0, 6)
      : this.projects.filter(p => p.category === this.homeProjectFilter).slice(0, 6);

    container.innerHTML = filtered.map(p => `
      <div class="project-card">
        <div class="project-img-wrap">
          <img src="${p.image}" alt="${p.title}" class="project-img" loading="lazy">
          <span class="project-badge-cat">${p.category}</span>
          <span class="project-badge-cap">${p.capacity}</span>
        </div>
        <div class="project-card-body">
          <h3 class="project-card-title">${p.title}</h3>
          <div class="project-loc-row">
            <i data-lucide="map-pin"></i>
            <span>${p.location}, ${p.state}</span>
          </div>
          <p class="project-card-desc">${p.desc}</p>
          <span class="project-scope-tag">${p.scope}</span>
        </div>
      </div>
    `).join('');

    this.refreshIcons();
  }

  /* ==========================================================================
     INTERACTIVE SOLAR PV SIZING & ROI CALCULATOR
     ========================================================================== */
  setupCalculator() {
    const billSlider = document.getElementById('calc-bill-slider');
    const areaSlider = document.getElementById('calc-area-slider');
    const techSelect = document.getElementById('calc-tech-select');
    const catButtons = document.querySelectorAll('#calc-consumer-category .cat-toggle-btn');
    const quoteBtn = document.getElementById('btn-calc-request-quote');

    // Category Buttons
    catButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        catButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.calcState.category = btn.dataset.cat;
        sound.playClick();
        this.recalculateSolar();
      });
    });

    // Bill Slider
    if (billSlider) {
      billSlider.addEventListener('input', (e) => {
        this.calcState.bill = parseFloat(e.target.value);
        document.getElementById('calc-bill-display').textContent = `₹${this.calcState.bill.toLocaleString('en-IN')} / month`;
        this.recalculateSolar();
      });
    }

    // Area Slider
    if (areaSlider) {
      areaSlider.addEventListener('input', (e) => {
        this.calcState.area = parseFloat(e.target.value);
        const sqM = Math.round(this.calcState.area * 0.0929);
        document.getElementById('calc-area-display').textContent = `${this.calcState.area} sq. ft (${sqM} m²)`;
        this.recalculateSolar();
      });
    }

    // Technology Select
    if (techSelect) {
      techSelect.addEventListener('change', (e) => {
        this.calcState.tech = e.target.value;
        this.recalculateSolar();
      });
    }

    // Request quote button from calculator
    if (quoteBtn) {
      quoteBtn.addEventListener('click', () => {
        sound.playClick();
        this.switchView('contact');
        // Pre-fill message
        const msgField = document.getElementById('form-message');
        const capText = document.getElementById('calc-res-capacity')?.textContent || '3.0 kWp';
        const billVal = this.calcState.bill;
        if (msgField) {
          msgField.value = `I am interested in installing a ${capText} solar system. My current electricity bill is approx ₹${billVal.toLocaleString('en-IN')}/month with ${this.calcState.area} sq.ft rooftop area. Please provide an official feasibility report and quotation.`;
        }
        const billInput = document.getElementById('form-bill');
        if (billInput) billInput.value = `₹${billVal.toLocaleString('en-IN')} / month`;
      });
    }

    this.recalculateSolar();
  }

  recalculateSolar() {
    const { bill, area, category } = this.calcState;

    // Solar calculation heuristics for Indian Sunbelt:
    // Avg tariff ~ ₹8/unit residential, ₹11/unit commercial, ₹9/unit industrial
    let tariff = 8.0;
    if (category === 'commercial') tariff = 11.0;
    if (category === 'industrial') tariff = 9.2;

    const monthlyUnits = bill / tariff;
    const dailyUnits = monthlyUnits / 30;

    // In India, 1 kWp produces ~4.2 kWh (units) per day on average
    let recommendedKW = dailyUnits / 4.2;
    // Check rooftop area constraint: 1 kWp requires ~80 sq. ft
    const maxRoofKW = area / 80;
    let finalKW = Math.min(recommendedKW, maxRoofKW);
    finalKW = Math.max(1, Math.round(finalKW * 2) / 2); // Round to nearest 0.5 kW

    const panelCount = Math.ceil((finalKW * 1000) / 440);
    const monthlyGen = Math.round(finalKW * 4.2 * 30);

    // Subsidy (PM Surya Ghar Scheme):
    // 1 kW: ₹30,000 | 2 kW: ₹60,000 | 3 kW and above: ₹78,000 (for residential only)
    let subsidy = 0;
    if (category === 'residential') {
      if (finalKW >= 3) subsidy = 78000;
      else if (finalKW >= 2) subsidy = 60000;
      else if (finalKW >= 1) subsidy = 30000;
    }

    // Costing estimates: ~₹60,000/kWp residential, ~₹48,000/kWp commercial/industrial
    const ratePerKW = category === 'residential' ? 62000 : 49000;
    const grossCost = Math.round(finalKW * ratePerKW);
    const netCost = Math.max(grossCost - subsidy, 0);

    const annualSavings = Math.round(monthlyGen * tariff * 12);
    const simplePaybackYears = netCost > 0 && annualSavings > 0 ? (netCost / annualSavings).toFixed(1) : '3.0';
    const lifetimeSavings = Math.round(annualSavings * 25 - netCost);
    const co2Offset = (finalKW * 1.25).toFixed(1);
    const trees = Math.round(finalKW * 55);

    // Update UI elements
    const capElem = document.getElementById('calc-res-capacity');
    if (capElem) capElem.textContent = `${finalKW.toFixed(1)} kWp`;

    const panelsElem = document.getElementById('calc-res-panels');
    if (panelsElem) panelsElem.textContent = `~${panelCount} Panels (440W)`;

    const subElem = document.getElementById('calc-res-subsidy');
    if (subElem) {
      subElem.textContent = subsidy > 0 ? `₹${subsidy.toLocaleString('en-IN')}` : 'Tax Depreciation (40%)';
    }

    const annSavElem = document.getElementById('calc-res-annual-savings');
    if (annSavElem) {
      annSavElem.textContent = `₹${annualSavings.toLocaleString('en-IN')} / yr`;
    }

    const monthGenElem = document.getElementById('calc-res-monthly-gen');
    if (monthGenElem) monthGenElem.textContent = `${monthlyGen.toLocaleString('en-IN')} kWh / Month`;

    const grossCostElem = document.getElementById('calc-res-gross-cost');
    if (grossCostElem) grossCostElem.textContent = `₹${grossCost.toLocaleString('en-IN')}`;

    const netCostElem = document.getElementById('calc-res-net-cost');
    if (netCostElem) netCostElem.textContent = `₹${netCost.toLocaleString('en-IN')}`;

    const lifeSavElem = document.getElementById('calc-res-lifetime-savings');
    if (lifeSavElem) lifeSavElem.textContent = `₹${lifetimeSavings.toLocaleString('en-IN')}`;

    const co2Elem = document.getElementById('calc-res-co2');
    if (co2Elem) co2Elem.textContent = `${co2Offset} tons / year (~${trees} Trees)`;

    // Update Grid Independence Quotient Gauge
    const independencePct = Math.min(98, Math.max(68, Math.round((monthlyGen / Math.max(monthlyUnits, 1)) * 100)));
    const gaugePctElem = document.getElementById('calc-gauge-percent');
    const gaugeFillElem = document.getElementById('calc-gauge-fill');
    const gaugeOffsetElem = document.getElementById('calc-gauge-offset');
    if (gaugePctElem) gaugePctElem.textContent = `${independencePct}%`;
    if (gaugeFillElem) gaugeFillElem.style.width = `${independencePct}%`;
    if (gaugeOffsetElem) {
      gaugeOffsetElem.textContent = `~${Math.min(98, independencePct)}% of facility daytime power`;
    }
  }

  /* ==========================================================================
     ABOUT PAGE RENDERING
     ========================================================================== */
  renderAboutContent() {
    // 1. Leadership
    const leaderContainer = document.getElementById('about-leadership-container');
    if (leaderContainer) {
      leaderContainer.innerHTML = LEADERSHIP.map(l => `
        <div class="leader-card">
          <div class="leader-avatar-banner">
            <div class="leader-avatar-circle">
              <span>${l.initials || l.name.charAt(0)}</span>
            </div>
            <div class="leader-badge"><i data-lucide="shield-check"></i> Executive Board</div>
          </div>
          <div class="leader-body">
            <h4 class="leader-name">${l.name}</h4>
            <span class="leader-role">${l.role}</span>
            <p class="leader-bio">${l.bio}</p>
          </div>
        </div>
      `).join('');
      createIcons({ icons });
    }

    // 2. Journey Timeline
    const journeyContainer = document.getElementById('about-journey-container');
    if (journeyContainer) {
      journeyContainer.innerHTML = JOURNEY_TIMELINE.map(j => `
        <div class="timeline-item">
          <div class="timeline-year-box">
            <span class="timeline-year-badge">${j.year}</span>
          </div>
          <div class="timeline-content-box">
            <h4>${j.title}</h4>
            <p>${j.desc}</p>
          </div>
        </div>
      `).join('');
    }
  }

  /* ==========================================================================
     PRODUCTS PAGE RENDERING & MODALS
     ========================================================================== */
  renderProductsContent() {
    // Category tabs
    const tabsContainer = document.getElementById('product-category-tabs');
    if (tabsContainer) {
      tabsContainer.querySelectorAll('.filter-pill-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          tabsContainer.querySelectorAll('.filter-pill-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.productsCategoryFilter = btn.dataset.cat;
          this.filterProducts();
          sound.playClick();
        });
      });
    }

    // Search input
    const searchInput = document.getElementById('product-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.productsSearchQuery = e.target.value.toLowerCase();
        this.filterProducts();
      });
    }

    this.filterProducts();
  }

  filterProducts() {
    const container = document.getElementById('products-list-container');
    if (!container) return;

    const query = this.productsSearchQuery;
    const cat = this.productsCategoryFilter;

    const filtered = this.products.filter(p => {
      const matchCat = cat === 'all' || p.category === cat;
      const matchQuery = !query ||
        p.name.toLowerCase().includes(query) ||
        p.desc.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query);
      return matchCat && matchQuery;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #94A3B8;">
          <i data-lucide="package-search" style="width: 48px; height: 48px; margin: 0 auto 1rem auto; color: var(--solar-gold);"></i>
          <h3>No products match your search</h3>
          <p>Try clearing filters or search for panels, inverters, cables, or earth pits.</p>
        </div>
      `;
    } else {
      container.innerHTML = filtered.map(p => `
        <div class="product-card">
          <div class="product-img-wrap">
            <img src="${p.image}" alt="${p.name}" class="product-img" loading="lazy">
          </div>
          <div class="product-card-body">
            <span class="product-brand-tag">${p.brand}</span>
            <h3 class="product-name">${p.name}</h3>
            <span class="product-specs">${p.specs}</span>
            <p class="product-desc">${p.desc}</p>
            <div class="product-footer-row">
              <button class="btn-pill btn-view-specs" data-prod-id="${p.id}">
                <span>View Specs</span>
                <i data-lucide="info" style="width: 12px; height: 12px;"></i>
              </button>
              <button class="btn-primary" style="padding: 0.4rem 0.85rem; font-size: 0.78rem;" data-prod-id="${p.id}" data-action="quote">
                <span>Request Quote</span>
              </button>
            </div>
          </div>
        </div>
      `).join('');
    }

    this.refreshIcons();

    // Hook spec and quote buttons
    container.querySelectorAll('.btn-view-specs, [data-action="quote"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const prodId = btn.dataset.prodId;
        const prod = this.products.find(x => x.id === prodId);
        if (prod) this.openProductModal(prod);
      });
    });
  }

  openProductModal(prod) {
    const modal = document.getElementById('product-modal');
    const body = document.getElementById('product-modal-body');
    const closeBtn = document.getElementById('btn-close-product-modal');
    if (!modal || !body) return;

    sound.playClick();
    body.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <span class="label-tag">${prod.categoryName || 'Solar Equipment'}</span>
        <h2 style="font-family: var(--font-display); font-size: 1.8rem; color: #fff; margin-bottom: 0.35rem;">${prod.name}</h2>
        <span style="color: var(--solar-gold); font-family: var(--font-mono); font-weight: 700; font-size: 0.95rem;">Manufacturer: ${prod.brand}</span>
      </div>

      <img src="${prod.image}" alt="${prod.name}" style="width: 100%; height: 260px; object-fit: cover; border-radius: 12px; margin-bottom: 1.5rem; border: 1px solid var(--border-bright);">

      <div style="background: rgba(11, 32, 48, 0.8); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 1.25rem; margin-bottom: 1.5rem;">
        <h4 style="color: #fff; margin-bottom: 0.5rem; font-size: 0.95rem;">Technical Parameters & Standards</h4>
        <p style="color: #CBD5E1; font-size: 0.9rem; line-height: 1.6; margin-bottom: 0.75rem;">${prod.specs}</p>
        <p style="color: #94A3B8; font-size: 0.86rem; line-height: 1.5;">${prod.desc}</p>
      </div>

      <div style="margin-bottom: 1.75rem;">
        <h4 style="color: #fff; font-size: 0.9rem; margin-bottom: 0.5rem;">Recommended Applications:</h4>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          ${(prod.applications || ['Commercial', 'Residential', 'Industrial']).map(app => `
            <span style="background: rgba(0, 136, 199, 0.15); color: var(--blue-electric); border: 1px solid var(--border-cyan); padding: 0.3rem 0.75rem; border-radius: 6px; font-size: 0.8rem; font-weight: 600;">
              ${app}
            </span>
          `).join('')}
        </div>
      </div>

      <div style="display: flex; gap: 1rem;">
        <button class="btn-primary w-full" id="btn-modal-prod-quote">
          <i data-lucide="zap"></i>
          <span>Get Quote for ${prod.name}</span>
        </button>
      </div>
    `;

    modal.classList.add('open');
    this.refreshIcons();

    if (closeBtn) {
      closeBtn.onclick = () => modal.classList.remove('open');
    }
    modal.onclick = (e) => {
      if (e.target === modal) modal.classList.remove('open');
    };

    const quoteBtn = document.getElementById('btn-modal-prod-quote');
    if (quoteBtn) {
      quoteBtn.onclick = () => {
        modal.classList.remove('open');
        this.switchView('contact');
        const msgField = document.getElementById('form-message');
        if (msgField) {
          msgField.value = `I would like to request technical specifications and bulk pricing for: ${prod.name} (Brand: ${prod.brand}).`;
        }
      };
    }
  }

  /* ==========================================================================
     SERVICES PAGE RENDERING
     ========================================================================== */
  renderServicesContent() {
    const container = document.getElementById('services-full-container');
    if (!container) return;

    container.innerHTML = SERVICES.map(s => `
      <div class="service-panel-card" style="margin-bottom: 2rem;">
        <div class="section-two-col" style="gap: 2.5rem;">
          <div>
            <div class="service-card-header">
              <span class="label-tag">SERVICE ${s.num}</span>
              <span class="service-card-num">${s.id.toUpperCase()}</span>
            </div>
            <h2 style="font-family: var(--font-display); font-size: 1.8rem; font-weight: 800; color: #fff; margin-bottom: 0.35rem;">
              ${s.label}
            </h2>
            <p style="color: var(--solar-gold); font-size: 0.92rem; font-weight: 600; margin-bottom: 1rem;">${s.tagline}</p>
            <p class="service-card-desc" style="font-size: 0.96rem;">${s.summary}</p>
            
            <h4 style="color: #fff; font-size: 0.9rem; margin-bottom: 0.5rem; margin-top: 1rem;">Key Service Highlights:</h4>
            <ul class="service-key-points">
              ${s.benefits.map(b => `<li>${b}</li>`).join('')}
            </ul>

            <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-subtle); padding: 0.85rem 1rem; border-radius: 8px; margin-bottom: 1.5rem;">
              <span style="font-size: 0.8rem; color: #94A3B8; display: block; font-weight: 600;">Applicable Sectors:</span>
              <span style="font-size: 0.88rem; color: #F1F5F9;">${s.applications}</span>
            </div>

            <button class="btn-primary" data-view="contact">
              <span>Schedule Free Site Survey for this Solution</span>
              <i data-lucide="arrow-right"></i>
            </button>
          </div>

          <div>
            <img src="${s.image}" alt="${s.label}" class="rounded-img" style="height: 380px;" loading="lazy">
          </div>
        </div>
      </div>
    `).join('');

    this.refreshIcons();

    // Bind action buttons on services page
    container.querySelectorAll('[data-view="contact"]').forEach(btn => {
      btn.addEventListener('click', () => this.switchView('contact'));
    });
  }

  /* ==========================================================================
     PROJECTS PAGE RENDERING & MULTI-FILTER
     ========================================================================== */
  renderProjectsContent() {
    // Category buttons
    const catGroup = document.getElementById('proj-filter-category');
    if (catGroup) {
      catGroup.querySelectorAll('.filter-pill-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          catGroup.querySelectorAll('.filter-pill-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.projectsCategoryFilter = btn.dataset.filter;
          this.filterAllProjects();
          sound.playClick();
        });
      });
    }

    // State select
    const stateSelect = document.getElementById('proj-filter-state');
    if (stateSelect) {
      stateSelect.addEventListener('change', (e) => {
        this.projectsStateFilter = e.target.value;
        this.filterAllProjects();
      });
    }

    // Status select
    const statusSelect = document.getElementById('proj-filter-status');
    if (statusSelect) {
      statusSelect.addEventListener('change', (e) => {
        this.projectsStatusFilter = e.target.value;
        this.filterAllProjects();
      });
    }

    this.filterAllProjects();
  }

  filterAllProjects() {
    const container = document.getElementById('all-projects-container');
    if (!container) return;

    const cat = this.projectsCategoryFilter;
    const state = this.projectsStateFilter;
    const status = this.projectsStatusFilter;

    const filtered = this.projects.filter(p => {
      const matchCat = cat === 'All' || p.category === cat;
      const matchState = state === 'All' || p.state === state;
      const matchStatus = status === 'All' || p.status === status;
      return matchCat && matchState && matchStatus;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem; color: #94A3B8;">
          <i data-lucide="filter-x" style="width: 48px; height: 48px; margin: 0 auto 1rem auto; color: var(--solar-gold);"></i>
          <h3>No projects match the selected filters</h3>
          <p>Please adjust your state, sector, or completion status filters.</p>
        </div>
      `;
    } else {
      container.innerHTML = filtered.map(p => `
        <div class="project-card">
          <div class="project-img-wrap">
            <img src="${p.image}" alt="${p.title}" class="project-img" loading="lazy">
            <span class="project-badge-cat">${p.category}</span>
            <span class="project-badge-cap">${p.capacity}</span>
          </div>
          <div class="project-card-body">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
              <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--solar-gold); font-weight: 700;">${p.year || '2024'}</span>
              <span class="admin-badge-status ${p.status === 'Completed' ? 'status-qualified' : 'status-progress'}">${p.status}</span>
            </div>
            <h3 class="project-card-title">${p.title}</h3>
            <div class="project-loc-row">
              <i data-lucide="map-pin"></i>
              <span>${p.location}, ${p.state}</span>
            </div>
            <p class="project-card-desc">${p.desc}</p>
            <span class="project-scope-tag">${p.scope}</span>
          </div>
        </div>
      `).join('');
    }

    this.refreshIcons();
  }

  /* ==========================================================================
     MEDIA & MILESTONES PAGE
     ========================================================================== */
  renderMediaContent() {
    const tabsContainer = document.getElementById('media-category-tabs');
    if (tabsContainer) {
      tabsContainer.querySelectorAll('.filter-pill-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          tabsContainer.querySelectorAll('.filter-pill-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.mediaTabFilter = btn.dataset.mediaTab;
          this.filterMedia();
          sound.playClick();
        });
      });
    }

    this.filterMedia();
  }

  filterMedia() {
    const container = document.getElementById('media-items-container');
    if (!container) return;

    const tab = this.mediaTabFilter;

    if (tab === 'videos') {
      container.innerHTML = `
        <div class="panel-card" style="grid-column: 1 / -1; padding: 2.5rem; text-align: center;">
          <div style="max-width: 700px; margin: 0 auto;">
            <div class="service-icon-box gold" style="margin: 0 auto 1.25rem auto;"><i data-lucide="play"></i></div>
            <h3 style="font-family: var(--font-display); font-size: 1.6rem; color: #fff; margin-bottom: 0.75rem;">N Solutions: 500+ PM Surya Ghar Sites Showcase Video</h3>
            <p style="color: #CBD5E1; font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.75rem;">
              Watch how our field engineering teams surveyed, installed, and commissioned 500+ residential rooftop solar systems in Vizianagaram within 7 months under the National Solar Portal.
            </p>
            <div style="position: relative; border-radius: 16px; overflow: hidden; border: 1px solid var(--border-cyan); box-shadow: var(--shadow-md);">
              <img src="https://images.unsplash.com/photo-1780445392692-a26e723dcf89?w=1200&h=600&fit=crop&auto=format" alt="Video preview" style="width: 100%; height: 380px; object-fit: cover;">
              <div style="position: absolute; inset: 0; background: rgba(6, 20, 28, 0.6); display: flex; align-items: center; justify-content: center;">
                <button class="btn-primary" id="btn-play-simulated-video" style="padding: 1rem 2rem; font-size: 1.1rem; border-radius: 9999px;">
                  <i data-lucide="play"></i>
                  <span>Watch Walkthrough (2m 45s)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;

      const playBtn = document.getElementById('btn-play-simulated-video');
      if (playBtn) {
        playBtn.addEventListener('click', () => {
          this.showToast('Playing PM Surya Ghar Vizianagaram Drone Documentary');
        });
      }
    } else {
      const filtered = this.gallery.filter(m => tab === 'all' || m.category === tab);
      container.innerHTML = filtered.map(m => `
        <div class="project-card media-card-item" data-img="${m.image}" data-title="${m.title}">
          <div class="project-img-wrap" style="height: 240px; cursor: pointer;">
            <img src="${m.image}" alt="${m.title}" class="project-img" loading="lazy">
            <span class="project-badge-cat">${m.tag || m.category}</span>
          </div>
          <div class="project-card-body">
            <span style="font-size: 0.75rem; color: var(--solar-gold); font-family: var(--font-mono);">${m.date || 'Project Milestone'}</span>
            <h3 class="project-card-title" style="margin-top: 0.25rem;">${m.title}</h3>
            <p class="project-card-desc">${m.desc}</p>
          </div>
        </div>
      `).join('');

      // Open Lightbox on card click
      container.querySelectorAll('.media-card-item').forEach(card => {
        card.addEventListener('click', () => {
          this.openGalleryLightbox(card.dataset.img, card.dataset.title);
        });
      });
    }

    this.refreshIcons();
  }

  openGalleryLightbox(imgUrl, title) {
    const modal = document.getElementById('gallery-modal');
    const body = document.getElementById('gallery-modal-body');
    const closeBtn = document.getElementById('btn-close-gallery-modal');
    if (!modal || !body) return;

    sound.playClick();
    body.innerHTML = `
      <img src="${imgUrl}" alt="${title}" style="width: 100%; max-height: 70vh; object-fit: contain; border-radius: 10px; margin-bottom: 1rem;">
      <h3 style="font-family: var(--font-display); font-size: 1.3rem; color: #fff; text-align: center;">${title}</h3>
    `;

    modal.classList.add('open');
    if (closeBtn) closeBtn.onclick = () => modal.classList.remove('open');
    modal.onclick = (e) => {
      if (e.target === modal) modal.classList.remove('open');
    };
  }

  /* ==========================================================================
     CAREERS PAGE RENDERING & APPLY MODAL
     ========================================================================== */
  renderCareersContent() {
    const container = document.getElementById('careers-jobs-container');
    if (!container) return;

    container.innerHTML = CAREER_JOBS.map(job => `
      <div class="job-item-card">
        <div>
          <h3 class="job-title">${job.title}</h3>
          <div class="job-meta-row">
            <span><i data-lucide="briefcase"></i> ${job.dept}</span>
            <span><i data-lucide="map-pin"></i> ${job.location}</span>
            <span><i data-lucide="clock"></i> ${job.experience}</span>
            <span class="badge-tag">${job.type}</span>
          </div>
          <p class="job-desc">${job.desc}</p>
        </div>
        <button class="btn-primary btn-apply-job" data-job-id="${job.id}" data-job-title="${job.title}" style="flex-shrink: 0;">
          <span>Apply Now</span>
          <i data-lucide="arrow-right"></i>
        </button>
      </div>
    `).join('');

    this.refreshIcons();

    container.querySelectorAll('.btn-apply-job').forEach(btn => {
      btn.addEventListener('click', () => {
        this.openJobApplyModal(btn.dataset.jobTitle);
      });
    });
  }

  openJobApplyModal(jobTitle) {
    const modal = document.getElementById('job-apply-modal');
    const body = document.getElementById('job-modal-body');
    const closeBtn = document.getElementById('btn-close-job-modal');
    if (!modal || !body) return;

    sound.playClick();
    body.innerHTML = `
      <h3 style="font-family: var(--font-display); font-size: 1.6rem; color: #fff; margin-bottom: 0.35rem;">Apply for ${jobTitle}</h3>
      <p style="color: #94A3B8; font-size: 0.88rem; margin-bottom: 1.5rem;">Join N Solutions Solar EPC engineering team. Submit your details below.</p>

      <form id="job-apply-form" class="consult-form">
        <div class="form-group">
          <label>Full Name *</label>
          <input type="text" id="apply-name" required placeholder="e.g. Anand Sharma">
        </div>
        <div class="form-two-col">
          <div class="form-group">
            <label>Email Address *</label>
            <input type="email" id="apply-email" required placeholder="e.g. anand@gmail.com">
          </div>
          <div class="form-group">
            <label>Phone Number *</label>
            <input type="tel" id="apply-phone" required placeholder="e.g. +91 98480 12345">
          </div>
        </div>
        <div class="form-two-col">
          <div class="form-group">
            <label>Years of Experience *</label>
            <input type="text" id="apply-exp" required placeholder="e.g. 3.5 Years">
          </div>
          <div class="form-group">
            <label>Current Location *</label>
            <input type="text" id="apply-loc" required placeholder="e.g. Visakhapatnam">
          </div>
        </div>
        <div class="form-group">
          <label>Summary / LinkedIn Profile URL</label>
          <textarea id="apply-notes" rows="3" placeholder="Brief note on your solar experience and certifications..."></textarea>
        </div>
        <button type="submit" class="btn-primary w-full" style="margin-top: 0.5rem;">
          <i data-lucide="send"></i>
          <span>Submit Application</span>
        </button>
      </form>
    `;

    modal.classList.add('open');
    this.refreshIcons();

    if (closeBtn) closeBtn.onclick = () => modal.classList.remove('open');
    modal.onclick = (e) => {
      if (e.target === modal) modal.classList.remove('open');
    };

    const form = document.getElementById('job-apply-form');
    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        modal.classList.remove('open');
        this.showToast(`Application submitted for ${jobTitle}. HR will contact you!`);
      };
    }
  }

  /* ==========================================================================
     CONTACT PAGE & FORM SUBMISSION
     ========================================================================== */
  setupContactForm() {
    const form = document.getElementById('contact-consult-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name').value.trim();
      const phone = document.getElementById('form-phone').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const company = document.getElementById('form-company').value.trim() || 'Direct Homeowner';
      const location = document.getElementById('form-location').value.trim();
      const projectType = document.getElementById('form-project-type').value;
      const bill = document.getElementById('form-bill').value.trim() || 'Not specified';
      const message = document.getElementById('form-message').value.trim();

      const newLead = {
        id: `lead-${Date.now()}`,
        name,
        phone,
        email,
        company,
        location,
        type: projectType,
        bill,
        status: 'New',
        date: new Date().toISOString().split('T')[0]
      };

      const newEnquiry = {
        id: `enq-${Date.now()}`,
        name,
        email,
        phone,
        subject: `${projectType} Consultation Enquiry`,
        message: message || `Consultation requested for ${location} (Monthly Bill: ${bill})`,
        date: new Date().toISOString().split('T')[0],
        status: 'Unread'
      };

      // Add to leads & enquiries
      this.leads.unshift(newLead);
      this.enquiries.unshift(newEnquiry);
      this.saveStorage('ns_leads', this.leads);
      this.saveStorage('ns_enquiries', this.enquiries);

      // Reset form
      form.reset();
      sound.playClick();
      this.showToast('Your Solar Consultation request has been received!');

      // Update admin portal tables
      this.renderAdminLeads();
      this.renderAdminEnquiries();
      this.updateAdminDashboardKPIs();
    });
  }

  /* ==========================================================================
     ADMIN PORTAL DASHBOARD & CRUD
     ========================================================================== */
  setupAdminInteractivity() {
    // Admin Tab Navigation
    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.adminTab;
        if (tab) {
          this.switchAdminTab(tab);
          sound.playClick();
        }
      });
    });

    // Quick jumps from dashboard
    const jumpLeads = document.getElementById('btn-jump-leads');
    if (jumpLeads) jumpLeads.onclick = () => this.switchAdminTab('leads');

    const jumpEnq = document.getElementById('btn-jump-enquiries');
    if (jumpEnq) jumpEnq.onclick = () => this.switchAdminTab('enquiries');

    // Leads search & filter
    const leadSearch = document.getElementById('admin-leads-search');
    const leadStatusFilter = document.getElementById('admin-leads-status-filter');
    if (leadSearch) leadSearch.oninput = () => this.renderAdminLeads();
    if (leadStatusFilter) leadStatusFilter.onchange = () => this.renderAdminLeads();

    // Add Lead Modal trigger
    const addLeadBtn = document.getElementById('btn-open-add-lead');
    if (addLeadBtn) {
      addLeadBtn.onclick = () => this.openAddLeadModal();
    }

    // Add Project Modal trigger
    const addProjBtn = document.getElementById('btn-open-add-project');
    if (addProjBtn) {
      addProjBtn.onclick = () => this.openAddProjectModal();
    }

    // Add Product Modal trigger
    const addProdBtn = document.getElementById('btn-open-add-product');
    if (addProdBtn) {
      addProdBtn.onclick = () => this.openAddProductModal();
    }

    // Add Gallery Image Modal trigger
    const addGalBtn = document.getElementById('btn-open-add-gallery');
    if (addGalBtn) {
      addGalBtn.onclick = () => this.openAddGalleryModal();
    }

    // Add Testimonial Modal trigger
    const addTestBtn = document.getElementById('btn-open-add-testimonial');
    if (addTestBtn) {
      addTestBtn.onclick = () => this.openAddTestimonialModal();
    }

    // Admin Password Change Form
    const passForm = document.getElementById('admin-change-password-form');
    if (passForm) {
      passForm.onsubmit = (e) => {
        e.preventDefault();
        const curr = document.getElementById('admin-curr-pass').value;
        const newP = document.getElementById('admin-new-pass').value;
        const conf = document.getElementById('admin-confirm-pass').value;

        if (newP.length < 6) {
          alert('New password must be at least 6 characters long.');
          return;
        }
        if (newP !== conf) {
          alert('New password and confirmation do not match.');
          return;
        }

        passForm.reset();
        sound.playClick();
        this.showToast('Admin password successfully updated!');
      };
    }
  }

  switchAdminTab(tabName) {
    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.adminTab === tabName);
    });

    document.querySelectorAll('.admin-tab-pane').forEach(pane => {
      pane.classList.toggle('active', pane.id === `pane-admin-${tabName}`);
    });

    const titleElem = document.getElementById('admin-header-title');
    if (titleElem) {
      const titles = {
        dashboard: 'Dashboard Overview',
        leads: 'Leads & Inquiries Management',
        projects: 'Projects Manager',
        products: 'Products Catalog Manager',
        gallery: 'Gallery & Media Manager',
        testimonials: 'Customer Testimonials Manager',
        enquiries: 'Customer Contact Enquiries',
        profile: 'Admin Security & Settings'
      };
      titleElem.textContent = titles[tabName] || 'Admin Console';
    }

    this.currentAdminTab = tabName;
    this.refreshIcons();
  }

  renderAdminPortal() {
    this.updateAdminDashboardKPIs();
    this.renderAdminDashboardTables();
    this.renderAdminLeads();
    this.renderAdminProjects();
    this.renderAdminProducts();
    this.renderAdminGallery();
    this.renderAdminTestimonials();
    this.renderAdminEnquiries();
  }

  updateAdminDashboardKPIs() {
    const leadsCount = document.getElementById('admin-stat-leads');
    const projCount = document.getElementById('admin-stat-projects');
    const prodCount = document.getElementById('admin-stat-products');
    const enqCount = document.getElementById('admin-stat-enquiries');

    if (leadsCount) leadsCount.textContent = this.leads.length;
    if (projCount) projCount.textContent = this.projects.length;
    if (prodCount) prodCount.textContent = this.products.length;
    if (enqCount) enqCount.textContent = this.enquiries.length;
  }

  renderAdminDashboardTables() {
    // Recent Leads
    const leadsTbody = document.getElementById('dashboard-recent-leads');
    if (leadsTbody) {
      leadsTbody.innerHTML = this.leads.slice(0, 5).map(l => `
        <tr>
          <td><strong>${l.name}</strong><br><small style="color: #94A3B8;">${l.company || ''}</small></td>
          <td>${l.type}</td>
          <td>${l.location}</td>
          <td><span class="admin-badge-status ${this.getStatusBadgeClass(l.status)}">${l.status}</span></td>
        </tr>
      `).join('');
    }

    // Recent Enquiries
    const enqTbody = document.getElementById('dashboard-recent-enquiries');
    if (enqTbody) {
      enqTbody.innerHTML = this.enquiries.slice(0, 5).map(e => `
        <tr>
          <td><strong>${e.name}</strong><br><small style="color: #94A3B8;">${e.email}</small></td>
          <td>${e.subject}</td>
          <td><span class="admin-badge-status ${e.status === 'Resolved' ? 'status-qualified' : 'status-new'}">${e.status}</span></td>
        </tr>
      `).join('');
    }
  }

  getStatusBadgeClass(status) {
    switch (status) {
      case 'New': return 'status-new';
      case 'Contacted': return 'status-contacted';
      case 'Site Survey': return 'status-survey';
      case 'In Progress': return 'status-progress';
      case 'Qualified': return 'status-qualified';
      case 'Closed': return 'status-closed';
      default: return 'status-contacted';
    }
  }

  renderAdminLeads() {
    const tbody = document.getElementById('admin-leads-table-body');
    if (!tbody) return;

    const query = document.getElementById('admin-leads-search')?.value.toLowerCase() || '';
    const statusFilter = document.getElementById('admin-leads-status-filter')?.value || 'All';

    const filtered = this.leads.filter(l => {
      const matchStatus = statusFilter === 'All' || l.status === statusFilter;
      const matchQuery = !query ||
        l.name.toLowerCase().includes(query) ||
        (l.company && l.company.toLowerCase().includes(query)) ||
        l.location.toLowerCase().includes(query) ||
        l.type.toLowerCase().includes(query);
      return matchStatus && matchQuery;
    });

    tbody.innerHTML = filtered.map(l => `
      <tr>
        <td>
          <strong>${l.name}</strong>
          ${l.company ? `<br><small style="color: #94A3B8;">${l.company}</small>` : ''}
        </td>
        <td>${l.type}</td>
        <td>${l.location}</td>
        <td>
          <small>${l.phone}</small><br>
          <small style="color: var(--blue-electric);">${l.email}</small>
        </td>
        <td>
          <select class="select-custom lead-status-select" data-id="${l.id}" style="padding: 0.25rem 0.5rem; font-size: 0.78rem;">
            <option value="New" ${l.status === 'New' ? 'selected' : ''}>New</option>
            <option value="Contacted" ${l.status === 'Contacted' ? 'selected' : ''}>Contacted</option>
            <option value="Site Survey" ${l.status === 'Site Survey' ? 'selected' : ''}>Site Survey</option>
            <option value="In Progress" ${l.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
            <option value="Qualified" ${l.status === 'Qualified' ? 'selected' : ''}>Qualified</option>
            <option value="Closed" ${l.status === 'Closed' ? 'selected' : ''}>Closed</option>
          </select>
        </td>
        <td>${l.date || 'Recent'}</td>
        <td>
          <button class="action-icon-btn delete btn-delete-lead" data-id="${l.id}" title="Delete Lead">
            <i data-lucide="trash-2"></i>
          </button>
        </td>
      </tr>
    `).join('');

    this.refreshIcons();

    // Bind Status Change
    tbody.querySelectorAll('.lead-status-select').forEach(sel => {
      sel.onchange = (e) => {
        const id = sel.dataset.id;
        const newStatus = e.target.value;
        const target = this.leads.find(x => x.id === id);
        if (target) {
          target.status = newStatus;
          this.saveStorage('ns_leads', this.leads);
          this.showToast(`Lead status updated to ${newStatus}`);
          this.renderAdminDashboardTables();
        }
      };
    });

    // Bind Delete Lead
    tbody.querySelectorAll('.btn-delete-lead').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        if (confirm('Are you sure you want to delete this lead?')) {
          this.leads = this.leads.filter(x => x.id !== id);
          this.saveStorage('ns_leads', this.leads);
          this.renderAdminLeads();
          this.updateAdminDashboardKPIs();
          this.renderAdminDashboardTables();
          this.showToast('Lead deleted.');
        }
      };
    });
  }

  renderAdminProjects() {
    const tbody = document.getElementById('admin-projects-table-body');
    if (!tbody) return;

    tbody.innerHTML = this.projects.map(p => `
      <tr>
        <td><strong>${p.title}</strong></td>
        <td>${p.category}</td>
        <td>${p.capacity}</td>
        <td>${p.state}</td>
        <td><span class="admin-badge-status ${p.status === 'Completed' ? 'status-qualified' : 'status-progress'}">${p.status}</span></td>
        <td>
          <button class="action-icon-btn delete btn-delete-project" data-id="${p.id}" title="Delete Project">
            <i data-lucide="trash-2"></i>
          </button>
        </td>
      </tr>
    `).join('');

    this.refreshIcons();

    tbody.querySelectorAll('.btn-delete-project').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        if (confirm('Delete this project from catalog?')) {
          this.projects = this.projects.filter(x => x.id !== id);
          this.saveStorage('ns_projects', this.projects);
          this.renderAdminProjects();
          this.renderProjectsContent();
          this.renderHomeProjects();
          this.updateAdminDashboardKPIs();
          this.showToast('Project removed.');
        }
      };
    });
  }

  renderAdminProducts() {
    const tbody = document.getElementById('admin-products-table-body');
    if (!tbody) return;

    tbody.innerHTML = this.products.map(p => `
      <tr>
        <td><strong>${p.name}</strong></td>
        <td>${p.categoryName || p.category}</td>
        <td><span style="color: var(--solar-gold);">${p.brand}</span></td>
        <td><small>${p.specs}</small></td>
        <td>
          <button class="action-icon-btn delete btn-delete-prod" data-id="${p.id}" title="Delete Product">
            <i data-lucide="trash-2"></i>
          </button>
        </td>
      </tr>
    `).join('');

    this.refreshIcons();

    tbody.querySelectorAll('.btn-delete-prod').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        if (confirm('Delete this product from catalog?')) {
          this.products = this.products.filter(x => x.id !== id);
          this.saveStorage('ns_products', this.products);
          this.renderAdminProducts();
          this.filterProducts();
          this.updateAdminDashboardKPIs();
          this.showToast('Product removed.');
        }
      };
    });
  }

  renderAdminGallery() {
    const tbody = document.getElementById('admin-gallery-table-body');
    if (!tbody) return;

    tbody.innerHTML = this.gallery.map(g => `
      <tr>
        <td><img src="${g.image}" alt="" style="width: 50px; height: 36px; object-fit: cover; border-radius: 4px;"></td>
        <td><strong>${g.title}</strong></td>
        <td><span class="badge-tag">${g.tag || 'Gallery'}</span></td>
        <td>${g.category}</td>
        <td>
          <button class="action-icon-btn delete btn-delete-gallery" data-id="${g.id}" title="Delete Photo">
            <i data-lucide="trash-2"></i>
          </button>
        </td>
      </tr>
    `).join('');

    this.refreshIcons();

    tbody.querySelectorAll('.btn-delete-gallery').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        if (confirm('Remove this gallery photo?')) {
          this.gallery = this.gallery.filter(x => x.id !== id);
          this.saveStorage('ns_gallery', this.gallery);
          this.renderAdminGallery();
          this.filterMedia();
          this.showToast('Gallery item removed.');
        }
      };
    });
  }

  renderAdminTestimonials() {
    const tbody = document.getElementById('admin-testimonials-table-body');
    if (!tbody) return;

    tbody.innerHTML = this.testimonials.map(t => `
      <tr>
        <td><strong>${t.name}</strong></td>
        <td>${t.company}</td>
        <td>${t.project || 'Solar EPC'}</td>
        <td style="color: var(--solar-gold);">${'★'.repeat(t.rating || 5)}</td>
        <td>
          <button class="action-icon-btn delete btn-delete-test" data-id="${t.id}" title="Delete Testimonial">
            <i data-lucide="trash-2"></i>
          </button>
        </td>
      </tr>
    `).join('');

    this.refreshIcons();

    tbody.querySelectorAll('.btn-delete-test').forEach(btn => {
      btn.onclick = () => {
        const id = Number(btn.dataset.id);
        if (confirm('Delete this testimonial?')) {
          this.testimonials = this.testimonials.filter(x => x.id !== id);
          this.saveStorage('ns_testimonials', this.testimonials);
          this.renderAdminTestimonials();
          this.renderHomeContent();
          this.showToast('Testimonial removed.');
        }
      };
    });
  }

  renderAdminEnquiries() {
    const tbody = document.getElementById('admin-enquiries-table-body');
    if (!tbody) return;

    tbody.innerHTML = this.enquiries.map(e => `
      <tr>
        <td><strong>${e.name}</strong></td>
        <td>
          <strong>${e.subject}</strong><br>
          <small style="color: #94A3B8;">${e.message}</small>
        </td>
        <td>
          <small>${e.phone}</small><br>
          <small style="color: var(--blue-electric);">${e.email}</small>
        </td>
        <td>${e.date}</td>
        <td>
          <span class="admin-badge-status ${e.status === 'Resolved' ? 'status-qualified' : 'status-new'}">${e.status}</span>
        </td>
        <td>
          <div class="action-btn-row">
            ${e.status !== 'Resolved' ? `
              <button class="action-icon-btn btn-resolve-enq" data-id="${e.id}" title="Mark as Resolved">
                <i data-lucide="check"></i>
              </button>
            ` : ''}
            <button class="action-icon-btn delete btn-delete-enq" data-id="${e.id}" title="Delete Enquiry">
              <i data-lucide="trash-2"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join('');

    this.refreshIcons();

    tbody.querySelectorAll('.btn-resolve-enq').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        const target = this.enquiries.find(x => x.id === id);
        if (target) {
          target.status = 'Resolved';
          this.saveStorage('ns_enquiries', this.enquiries);
          this.renderAdminEnquiries();
          this.renderAdminDashboardTables();
          this.showToast('Enquiry marked as resolved.');
        }
      };
    });

    tbody.querySelectorAll('.btn-delete-enq').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        if (confirm('Delete this message?')) {
          this.enquiries = this.enquiries.filter(x => x.id !== id);
          this.saveStorage('ns_enquiries', this.enquiries);
          this.renderAdminEnquiries();
          this.renderAdminDashboardTables();
          this.updateAdminDashboardKPIs();
          this.showToast('Enquiry deleted.');
        }
      };
    });
  }

  /* ==========================================================================
     ADMIN MODALS FOR ADDING RECORDS
     ========================================================================== */
  openAddLeadModal() {
    this.openCrudModal('Add New Solar Lead', `
      <form id="crud-lead-form" class="consult-form">
        <div class="form-group">
          <label>Lead Full Name *</label>
          <input type="text" id="m-lead-name" required placeholder="e.g. Satish Rao">
        </div>
        <div class="form-two-col">
          <div class="form-group">
            <label>Phone Number *</label>
            <input type="tel" id="m-lead-phone" required placeholder="e.g. +91 94400 11223">
          </div>
          <div class="form-group">
            <label>Email Address</label>
            <input type="email" id="m-lead-email" placeholder="e.g. satish@company.com">
          </div>
        </div>
        <div class="form-two-col">
          <div class="form-group">
            <label>Organization / Company</label>
            <input type="text" id="m-lead-comp" placeholder="e.g. Coastal Cold Storage">
          </div>
          <div class="form-group">
            <label>Project Location *</label>
            <input type="text" id="m-lead-loc" required placeholder="e.g. Vizianagaram">
          </div>
        </div>
        <div class="form-two-col">
          <div class="form-group">
            <label>Solution Category</label>
            <select class="select-custom" id="m-lead-type">
              <option value="Commercial Solar">Commercial Solar</option>
              <option value="Industrial Solar">Industrial Solar</option>
              <option value="Residential Rooftop">Residential Rooftop</option>
              <option value="Solar Pump">Solar Pump</option>
            </select>
          </div>
          <div class="form-group">
            <label>Lead Status</label>
            <select class="select-custom" id="m-lead-status">
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Site Survey">Site Survey</option>
              <option value="In Progress">In Progress</option>
              <option value="Qualified">Qualified</option>
            </select>
          </div>
        </div>
        <button type="submit" class="btn-primary w-full" style="margin-top: 1rem;">Save Lead to Database</button>
      </form>
    `, (modal) => {
      const form = document.getElementById('crud-lead-form');
      form.onsubmit = (e) => {
        e.preventDefault();
        const newLead = {
          id: `lead-${Date.now()}`,
          name: document.getElementById('m-lead-name').value,
          phone: document.getElementById('m-lead-phone').value,
          email: document.getElementById('m-lead-email').value || 'N/A',
          company: document.getElementById('m-lead-comp').value || '',
          location: document.getElementById('m-lead-loc').value,
          type: document.getElementById('m-lead-type').value,
          status: document.getElementById('m-lead-status').value,
          date: new Date().toISOString().split('T')[0]
        };
        this.leads.unshift(newLead);
        this.saveStorage('ns_leads', this.leads);
        this.renderAdminLeads();
        this.updateAdminDashboardKPIs();
        this.renderAdminDashboardTables();
        modal.classList.remove('open');
        this.showToast('New lead added to database.');
      };
    });
  }

  openAddProjectModal() {
    this.openCrudModal('Add Project to Portfolio', `
      <form id="crud-project-form" class="consult-form">
        <div class="form-group">
          <label>Project Title *</label>
          <input type="text" id="m-proj-title" required placeholder="e.g. Coastal Pharma 500 kWp Rooftop">
        </div>
        <div class="form-two-col">
          <div class="form-group">
            <label>Category *</label>
            <select class="select-custom" id="m-proj-cat">
              <option value="Commercial">Commercial</option>
              <option value="Industrial">Industrial</option>
              <option value="Residential">Residential</option>
              <option value="Government">Government</option>
            </select>
          </div>
          <div class="form-group">
            <label>Capacity (kW / MW) *</label>
            <input type="text" id="m-proj-cap" required placeholder="e.g. 500 kWp">
          </div>
        </div>
        <div class="form-two-col">
          <div class="form-group">
            <label>Location / City *</label>
            <input type="text" id="m-proj-loc" required placeholder="e.g. Visakhapatnam">
          </div>
          <div class="form-group">
            <label>State *</label>
            <select class="select-custom" id="m-proj-state">
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Telangana">Telangana</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Odisha">Odisha</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label>Scope of Work</label>
          <input type="text" id="m-proj-scope" placeholder="e.g. Turnkey EPC: Design, Supply, Installation, Net Metering">
        </div>
        <div class="form-group">
          <label>Description</label>
          <textarea id="m-proj-desc" rows="3" placeholder="Brief project summary and savings achieved..."></textarea>
        </div>
        <div class="form-group">
          <label>Project Photo URL</label>
          <input type="text" id="m-proj-img" value="https://images.unsplash.com/photo-1786913507799-0ddbb3e7dbb6?w=900&h=600&fit=crop&auto=format">
        </div>
        <button type="submit" class="btn-primary w-full" style="margin-top: 1rem;">Add Project</button>
      </form>
    `, (modal) => {
      const form = document.getElementById('crud-project-form');
      form.onsubmit = (e) => {
        e.preventDefault();
        const newProj = {
          id: `proj-${Date.now()}`,
          title: document.getElementById('m-proj-title').value,
          category: document.getElementById('m-proj-cat').value,
          capacity: document.getElementById('m-proj-cap').value,
          location: document.getElementById('m-proj-loc').value,
          state: document.getElementById('m-proj-state').value,
          scope: document.getElementById('m-proj-scope').value || 'Turnkey EPC',
          desc: document.getElementById('m-proj-desc').value || 'Grid-connected solar power installation.',
          image: document.getElementById('m-proj-img').value,
          status: 'Completed',
          year: new Date().getFullYear().toString()
        };
        this.projects.unshift(newProj);
        this.saveStorage('ns_projects', this.projects);
        this.renderAdminProjects();
        this.renderProjectsContent();
        this.renderHomeProjects();
        this.updateAdminDashboardKPIs();
        modal.classList.remove('open');
        this.showToast('New project published to website.');
      };
    });
  }

  openAddProductModal() {
    this.openCrudModal('Add Product to Catalog', `
      <form id="crud-product-form" class="consult-form">
        <div class="form-group">
          <label>Product Name *</label>
          <input type="text" id="m-prod-name" required placeholder="e.g. Bifacial TOPCon 550W Modules">
        </div>
        <div class="form-two-col">
          <div class="form-group">
            <label>Category *</label>
            <select class="select-custom" id="m-prod-cat">
              <option value="solar-panels">Solar Panels</option>
              <option value="solar-inverters">Solar Inverters</option>
              <option value="earth-pits">Earth Pits & Arrestors</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>
          <div class="form-group">
            <label>Brand / Manufacturer *</label>
            <input type="text" id="m-prod-brand" required placeholder="e.g. Goldi Solar / Vikram">
          </div>
        </div>
        <div class="form-group">
          <label>Technical Specifications *</label>
          <input type="text" id="m-prod-specs" required placeholder="e.g. 550W | 22.8% Efficiency | ALMM Tier-1">
        </div>
        <div class="form-group">
          <label>Product Description</label>
          <textarea id="m-prod-desc" rows="3" placeholder="Key technical characteristics, cell technology, warranty..."></textarea>
        </div>
        <div class="form-group">
          <label>Product Image URL</label>
          <input type="text" id="m-prod-img" value="https://images.unsplash.com/photo-1770936994282-8811fb7129ac?w=800&h=600&fit=crop&auto=format">
        </div>
        <button type="submit" class="btn-primary w-full" style="margin-top: 1rem;">Save Product</button>
      </form>
    `, (modal) => {
      const form = document.getElementById('crud-product-form');
      form.onsubmit = (e) => {
        e.preventDefault();
        const cat = document.getElementById('m-prod-cat').value;
        const catMap = {
          'solar-panels': 'Solar Panels',
          'solar-inverters': 'Solar Inverters',
          'earth-pits': 'Earth Pits & Arrestors',
          'accessories': 'Accessories'
        };
        const newProd = {
          id: `prod-${Date.now()}`,
          name: document.getElementById('m-prod-name').value,
          category: cat,
          categoryName: catMap[cat] || 'Equipment',
          brand: document.getElementById('m-prod-brand').value,
          specs: document.getElementById('m-prod-specs').value,
          desc: document.getElementById('m-prod-desc').value || 'High quality solar component.',
          image: document.getElementById('m-prod-img').value,
          applications: ['Commercial', 'Residential', 'Industrial']
        };
        this.products.unshift(newProd);
        this.saveStorage('ns_products', this.products);
        this.renderAdminProducts();
        this.filterProducts();
        this.updateAdminDashboardKPIs();
        modal.classList.remove('open');
        this.showToast('Product added to catalog.');
      };
    });
  }

  openAddGalleryModal() {
    this.openCrudModal('Upload Image to Gallery / Media', `
      <form id="crud-gallery-form" class="consult-form">
        <div class="form-group">
          <label>Photo Title *</label>
          <input type="text" id="m-gal-title" required placeholder="e.g. 500kW Industrial Shed Array">
        </div>
        <div class="form-two-col">
          <div class="form-group">
            <label>Tag / Category</label>
            <select class="select-custom" id="m-gal-cat">
              <option value="Gallery">Photo Gallery</option>
              <option value="Milestones">Project Milestone</option>
            </select>
          </div>
          <div class="form-group">
            <label>Date / Status</label>
            <input type="text" id="m-gal-date" placeholder="e.g. February 2025">
          </div>
        </div>
        <div class="form-group">
          <label>Image URL *</label>
          <input type="text" id="m-gal-img" required value="https://images.unsplash.com/photo-1786913507799-0ddbb3e7dbb6?w=900&h=600&fit=crop&auto=format">
        </div>
        <div class="form-group">
          <label>Caption / Notes</label>
          <textarea id="m-gal-desc" rows="2" placeholder="Brief context about this installation..."></textarea>
        </div>
        <button type="submit" class="btn-primary w-full" style="margin-top: 1rem;">Add to Gallery</button>
      </form>
    `, (modal) => {
      const form = document.getElementById('crud-gallery-form');
      form.onsubmit = (e) => {
        e.preventDefault();
        const newGal = {
          id: `med-${Date.now()}`,
          title: document.getElementById('m-gal-title').value,
          category: document.getElementById('m-gal-cat').value,
          tag: document.getElementById('m-gal-cat').value === 'Milestones' ? 'Milestone' : 'Gallery',
          date: document.getElementById('m-gal-date').value || 'Recent',
          image: document.getElementById('m-gal-img').value,
          desc: document.getElementById('m-gal-desc').value || 'Solar EPC installation milestone.'
        };
        this.gallery.unshift(newGal);
        this.saveStorage('ns_gallery', this.gallery);
        this.renderAdminGallery();
        this.filterMedia();
        modal.classList.remove('open');
        this.showToast('Gallery image uploaded.');
      };
    });
  }

  openAddTestimonialModal() {
    this.openCrudModal('Add Client Testimonial', `
      <form id="crud-test-form" class="consult-form">
        <div class="form-group">
          <label>Client Full Name *</label>
          <input type="text" id="m-test-name" required placeholder="e.g. K. V. Subrahmanyam">
        </div>
        <div class="form-two-col">
          <div class="form-group">
            <label>Company / Organization *</label>
            <input type="text" id="m-test-comp" required placeholder="e.g. Annapurna Agro Mills">
          </div>
          <div class="form-group">
            <label>Project Type</label>
            <input type="text" id="m-test-proj" placeholder="e.g. 150 kWp Rooftop Solar">
          </div>
        </div>
        <div class="form-group">
          <label>Client Feedback Quote *</label>
          <textarea id="m-test-text" rows="4" required placeholder="Client statement regarding energy bill savings, execution speed, and quality..."></textarea>
        </div>
        <button type="submit" class="btn-primary w-full" style="margin-top: 1rem;">Save Testimonial</button>
      </form>
    `, (modal) => {
      const form = document.getElementById('crud-test-form');
      form.onsubmit = (e) => {
        e.preventDefault();
        const newTest = {
          id: Date.now(),
          name: document.getElementById('m-test-name').value,
          company: document.getElementById('m-test-comp').value,
          project: document.getElementById('m-test-proj').value || 'Solar Installation',
          text: document.getElementById('m-test-text').value,
          rating: 5,
          date: 'Recent'
        };
        this.testimonials.unshift(newTest);
        this.saveStorage('ns_testimonials', this.testimonials);
        this.renderAdminTestimonials();
        this.renderHomeContent();
        modal.classList.remove('open');
        this.showToast('Client testimonial published.');
      };
    });
  }

  openCrudModal(title, formHtml, onBind) {
    const modal = document.getElementById('admin-crud-modal');
    const body = document.getElementById('admin-crud-modal-body');
    const closeBtn = document.getElementById('btn-close-crud-modal');
    if (!modal || !body) return;

    sound.playClick();
    body.innerHTML = `
      <h3 style="font-family: var(--font-display); font-size: 1.5rem; color: #fff; margin-bottom: 1.25rem;">${title}</h3>
      ${formHtml}
    `;

    modal.classList.add('open');
    this.refreshIcons();

    if (closeBtn) closeBtn.onclick = () => modal.classList.remove('open');
    modal.onclick = (e) => {
      if (e.target === modal) modal.classList.remove('open');
    };

    if (onBind) onBind(modal);
  }

  /* ==========================================================================
     SCROLL PROGRESS & FLOATING CONTROLS DOCK
     ========================================================================== */
  setupScrollAndFloatingControls() {
    const progressBar = document.getElementById('scroll-progress-bar');
    const backToTopBtn = document.getElementById('btn-back-to-top');
    const floatingConsultBtn = document.getElementById('btn-floating-consult');

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

      if (progressBar) {
        progressBar.style.width = `${progress}%`;
      }

      if (backToTopBtn) {
        if (scrollTop > 350) {
          backToTopBtn.classList.add('visible');
        } else {
          backToTopBtn.classList.remove('visible');
        }
      }
    }, { passive: true });

    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        sound.playClick();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    if (floatingConsultBtn) {
      floatingConsultBtn.addEventListener('click', () => {
        sound.playClick();
        this.switchView('contact');
      });
    }
  }

  /* ==========================================================================
     SCROLL REVEAL ENGINE & NUMBER COUNTERS
     ========================================================================== */
  setupScrollReveals() {
    const revealSelectors = [
      '.section-block',
      '.service-panel-card',
      '.process-step-card',
      '.hero-stat-box',
      '.chairman-message-card',
      '.panel-card',
      '.calc-box-wrapper',
      '.testimonial-card',
      '.certification-card',
      '.award-card',
      '.why-choose-card',
      '.stat-highlight-pair > div',
      '.final-cta-banner',
      '.job-item-card',
      '.leader-card',
      '.timeline-item'
    ];

    const elements = document.querySelectorAll(revealSelectors.join(', '));

    elements.forEach((el, index) => {
      if (!el.classList.contains('reveal-init')) {
        el.classList.add('reveal-init');
        const delayClass = `reveal-delay-${(index % 5) + 1}`;
        el.classList.add(delayClass);
      }
    });

    if ('IntersectionObserver' in window) {
      if (this.revealObserver) {
        this.revealObserver.disconnect();
      }

      this.revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            this.checkAndAnimateCounters(entry.target);
            this.revealObserver.unobserve(entry.target);
          }
        });
      }, {
        root: null,
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px'
      });

      elements.forEach(el => {
        if (!el.classList.contains('revealed')) {
          this.revealObserver.observe(el);
        }
      });
    } else {
      // Fallback for browsers without IntersectionObserver
      elements.forEach(el => el.classList.add('revealed'));
    }
  }

  checkAndAnimateCounters(element) {
    const counters = element.querySelectorAll('.metric-big-val, .exp-val, .num, .stat-big-num');
    counters.forEach(counter => {
      if (counter.dataset.animated) return;
      const text = counter.textContent.trim();
      const match = text.match(/^(\d+(?:\.\d+)?)(.*)$/);
      if (match) {
        counter.dataset.animated = 'true';
        const targetNum = parseFloat(match[1]);
        const suffix = match[2];
        const isDecimal = match[1].includes('.');
        const duration = 1400;
        const startTime = performance.now();

        const updateCount = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const currentVal = targetNum * easeOut;

          counter.textContent = (isDecimal ? currentVal.toFixed(1) : Math.floor(currentVal)) + suffix;

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            counter.textContent = text;
          }
        };

        requestAnimationFrame(updateCount);
      }
    });
  }
}

// Instantiate on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new NSolutionsApp();
  app.init();
  window.nSolutionsApp = app; // Expose for testing
});
