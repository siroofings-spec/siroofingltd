document.addEventListener('DOMContentLoaded', () => {
    // 1. Service Modals Data & Logic
    const serviceData = {
        velux: {
            title: "Velux Windows Installation & Leak Repairs",
            description: "Transform your home with natural daylight and ventilation. S&I Roofing Ltd is certified to supply, install, and seal all Velux roof windows across Ireland.",
            features: [
                "✓ Original Velux window frames & flashing kits",
                "✓ Replacement of old leaking or fogged roof skylights",
                "✓ Thermal double/triple glazing insulation",
                "✓ 15 Year written installation guarantee"
            ],
            icon: `<svg viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="12" fill="#EEF2FF"/><rect x="10" y="10" width="28" height="28" rx="4" stroke="#3B52CA" stroke-width="3" fill="#FFFFFF"/><path d="M10 24H38M24 10V38" stroke="#3B52CA" stroke-width="3"/><circle cx="17" cy="17" r="2" fill="#F59E0B"/></svg>`
        },
        repairs: {
            title: "Emergency Roof Leak & Storm Damage Repairs",
            description: "Fast mobile repair crews dispatched across Ireland for storm damage, broken slates, ridge tile re-pointing, and emergency water leaks.",
            features: [
                "✓ Under 2 hour average emergency response",
                "✓ Slate, tile, and ridge tile replacements",
                "✓ Chimney lead flashing leak sealing",
                "✓ 100% Free on-site inspection & photo diagnostic"
            ],
            icon: `<svg viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="12" fill="#3B52CA"/><path d="M12 28L24 14L36 28V36H12V28Z" fill="#FFFFFF"/><path d="M20 28H28V36H20V28Z" fill="#F59E0B"/></svg>`
        },
        gutters: {
            title: "Gutters, Downpipes & Rainwater Systems",
            description: "Complete seamless aluminum and UPVC gutter supply, cleaning, leak fixing, and downpipe installations to safely direct rainwater.",
            features: [
                "✓ Heavy-duty seamless aluminum & UPVC gutters",
                "✓ Anti-clog leaf guards & hopper boxes",
                "✓ Gutter cleaning, realigning, and leak sealing",
                "✓ Wide range of colors (Black, White, Brown, Anthracite)"
            ],
            icon: `<svg viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="12" fill="#EEF2FF"/><path d="M12 18H36C36 26 30 32 24 32C18 32 12 26 12 18Z" fill="#3B52CA"/><path d="M24 32V38M20 38H28" stroke="#3B52CA" stroke-width="3" stroke-linecap="round"/></svg>`
        },
        dryverge: {
            title: "Dry Verge Roof Edge Protection Systems",
            description: "Upgrade your roof with maintenance-free gable dry verge caps that lock roof tiles in place against storm winds without deteriorating mortar.",
            features: [
                "✓ Eliminates cracking mortar joints forever",
                "✓ Weather-tight seal against driven wind and rain",
                "✓ Prevents birds and pests from nesting under eaves",
                "✓ 20 Year maintenance-free durability"
            ],
            icon: `<svg viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="12" fill="#EEF2FF"/><path d="M14 14L24 24L34 14M14 24L24 34L34 24" stroke="#3B52CA" stroke-width="4" stroke-linecap="round"/></svg>`
        },
        cleaning: {
            title: "Soft-Wash Roof Moss Removal & Protective Coating",
            description: "Restore your roof's original beauty and extend tile lifespan with professional moss scraping, biocide treatment, and waterproof sealing.",
            features: [
                "✓ Safe soft-wash moss and lichen removal",
                "✓ Fungicidal biocide treatment against regrowth",
                "✓ Waterproof protective tile sealing coating",
                "✓ Cleans gutters & surrounding property post-service"
            ],
            icon: `<svg viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="12" fill="#EEF2FF"/><path d="M24 10C24 10 14 22 14 28C14 33.5228 18.4772 38 24 38C29.5228 38 34 33.5228 34 28C34 22 24 10 24 10Z" fill="#3B52CA"/></svg>`
        },
        fascia: {
            title: "UPVC Fascia & Soffit Replacement",
            description: "Replace old rotting timber eave boards with durable, weather-resistant UPVC fascia and ventilated soffits.",
            features: [
                "✓ Zero maintenance required (no painting needed)",
                "✓ Ventilated soffits to prevent attic condensation",
                "✓ Rot-proof and termite-resistant materials",
                "✓ Clean architectural finish for your roof edges"
            ],
            icon: `<svg viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="12" fill="#EEF2FF"/><rect x="10" y="16" width="28" height="16" rx="3" fill="#3B52CA"/><line x1="14" y1="24" x2="34" y2="24" stroke="#FFFFFF" stroke-width="2"/></svg>`
        },
        attic: {
            title: "Attic Thermal Insulation Upgrades",
            description: "Up to 35% of home heat escapes through uninsulated roofs. Our high-density attic insulation slashes heating bills and boosts home comfort.",
            features: [
                "✓ High-grade Earthwool & fiberglass insulation roll out",
                "✓ Cold water tank & pipe lagging included",
                "✓ SEAI energy efficiency compliant materials",
                "✓ Immediate reduction in winter home heating costs"
            ],
            icon: `<svg viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="12" fill="#EEF2FF"/><path d="M12 34V20L24 10L36 20V34H12Z" stroke="#3B52CA" stroke-width="3" fill="#FFFFFF"/><path d="M16 28C16 28 20 24 24 28C28 32 32 28 32 28" stroke="#F59E0B" stroke-width="3"/></svg>`
        },
        leadvalleys: {
            title: "Lead Valleys & Chimney Flashing Repairs",
            description: "Master leadwork craftsmanship. We repair, weld, and replace lead valley gutters and chimney apron flashings to stop internal ceiling leaks.",
            features: [
                "✓ Code 4 & Code 5 sheet lead fabrication",
                "✓ Chimney step flashing & back gutter renewal",
                "✓ Waterproof lead valley gutter replacements",
                "✓ 25 Year warranty on all leadwork projects"
            ],
            icon: `<svg viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="12" fill="#EEF2FF"/><polygon points="24,10 38,38 10,38" stroke="#3B52CA" stroke-width="3" fill="#FFFFFF"/><line x1="24" y1="10" x2="24" y2="38" stroke="#3B52CA" stroke-width="3"/></svg>`
        }
    };

    // Service Modals Logic
    const serviceModal = document.getElementById('serviceModal');
    const closeServiceModal = document.getElementById('closeServiceModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalFeatureList = document.getElementById('modalFeatureList');
    const modalIcon = document.getElementById('modalIcon');
    const modalCta = document.getElementById('modalCta');

    document.querySelectorAll('.service-box').forEach(box => {
        box.addEventListener('click', () => {
            const key = box.getAttribute('data-service');
            const data = serviceData[key];
            if (data && serviceModal) {
                modalTitle.textContent = data.title;
                modalDescription.textContent = data.description;
                modalIcon.innerHTML = data.icon;
                modalFeatureList.innerHTML = data.features.map(f => `<li>${f}</li>`).join('');
                serviceModal.classList.add('active');
            }
        });
    });

    if (closeServiceModal) {
        closeServiceModal.addEventListener('click', () => {
            serviceModal.classList.remove('active');
        });
    }

    if (modalCta) {
        modalCta.addEventListener('click', () => {
            serviceModal.classList.remove('active');
        });
    }

    // 2. Portfolio Gallery Filter & Lightbox
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryCards = document.querySelectorAll('.gallery-card');
    const lightboxModal = document.getElementById('lightboxModal');
    const closeLightboxModal = document.getElementById('closeLightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDesc = document.getElementById('lightboxDesc');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            galleryCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    galleryCards.forEach(card => {
        card.addEventListener('click', () => {
            const imgSrc = card.getAttribute('data-img');
            const title = card.getAttribute('data-title');
            const desc = card.getAttribute('data-desc');

            if (lightboxModal && lightboxImage) {
                lightboxImage.src = imgSrc;
                lightboxTitle.textContent = title;
                lightboxDesc.textContent = desc;
                lightboxModal.classList.add('active');
            }
        });
    });

    if (closeLightboxModal) {
        closeLightboxModal.addEventListener('click', () => {
            lightboxModal.classList.remove('active');
        });
    }

    // Close Modals on Overlay Click
    window.addEventListener('click', (e) => {
        if (e.target === serviceModal) serviceModal.classList.remove('active');
        if (e.target === lightboxModal) lightboxModal.classList.remove('active');
    });

    // 3. Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            const isVisible = navMenu.style.display === 'flex';
            navMenu.style.display = isVisible ? 'none' : 'flex';
            if (!isVisible) {
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '100%';
                navMenu.style.left = '0';
                navMenu.style.width = '100%';
                navMenu.style.background = '#FFFFFF';
                navMenu.style.padding = '1.5rem';
                navMenu.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
            }
        });
    }

    // 4. FAQ Accordion
    document.querySelectorAll('.faq-item').forEach(item => {
        const header = item.querySelector('.faq-header');
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    // 5. Form Submissions
    const heroLeadForm = document.getElementById('heroLeadForm');
    if (heroLeadForm) {
        heroLeadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('clientName').value;
            const phone = document.getElementById('clientPhone').value;
            alert(`Thank you ${name}! Your free inspection request has been received. Our team will call you at ${phone} shortly.`);
            heroLeadForm.reset();
        });
    }

    const mainContactForm = document.getElementById('mainContactForm');
    if (mainContactForm) {
        mainContactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for contacting S&I Roofing Ltd! We will respond promptly.');
            mainContactForm.reset();
        });
    }
});
