document.addEventListener('DOMContentLoaded', () => {
    // 1. Service Modals Data & Logic
    const serviceData = {
        velux: {
            number: "01",
            title: "Velux Windows Installation & Leak Repairs",
            description: "Transform your home with natural daylight and ventilation. S&I Roofing Ltd is certified to supply, install, and seal all Velux roof windows across Ireland.",
            features: [
                "✓ Original Velux window frames & flashing kits",
                "✓ Replacement of old leaking or fogged roof skylights",
                "✓ Thermal double/triple glazing insulation",
                "✓ 15 Year written installation guarantee"
            ]
        },
        repairs: {
            number: "02",
            title: "Emergency Roof Leak & Storm Damage Repairs",
            description: "Fast mobile repair crews dispatched across Ireland for storm damage, broken slates, ridge tile re-pointing, and emergency water leaks.",
            features: [
                "✓ Under 2 hour average emergency response",
                "✓ Slate, tile, and ridge tile replacements",
                "✓ Chimney lead flashing leak sealing",
                "✓ 100% Free on-site inspection & photo diagnostic"
            ]
        },
        gutters: {
            number: "03",
            title: "Gutters, Downpipes & Rainwater Systems",
            description: "Complete seamless aluminum and UPVC gutter supply, cleaning, leak fixing, and downpipe installations to safely direct rainwater.",
            features: [
                "✓ Heavy-duty seamless aluminum & UPVC gutters",
                "✓ Anti-clog leaf guards & hopper boxes",
                "✓ Gutter cleaning, realigning, and leak sealing",
                "✓ Wide range of colors (Black, White, Brown, Anthracite)"
            ]
        },
        dryverge: {
            number: "04",
            title: "Dry Verge Roof Edge Protection Systems",
            description: "Upgrade your roof with maintenance-free gable dry verge caps that lock roof tiles in place against storm winds without deteriorating mortar.",
            features: [
                "✓ Eliminates cracking mortar joints forever",
                "✓ Weather-tight seal against driven wind and rain",
                "✓ Prevents birds and pests from nesting under eaves",
                "✓ 20 Year maintenance-free durability"
            ]
        },
        cleaning: {
            number: "05",
            title: "Soft-Wash Roof Moss Removal & Protective Coating",
            description: "Restore your roof's original beauty and extend tile lifespan with professional moss scraping, biocide treatment, and waterproof sealing.",
            features: [
                "✓ Safe soft-wash moss and lichen removal",
                "✓ Fungicidal biocide treatment against regrowth",
                "✓ Waterproof protective tile sealing coating",
                "✓ Cleans gutters & surrounding property post-service"
            ]
        },
        fascia: {
            number: "06",
            title: "UPVC Fascia & Soffit Replacement",
            description: "Replace old rotting timber eave boards with durable, weather-resistant UPVC fascia and ventilated soffits.",
            features: [
                "✓ Zero maintenance required (no painting needed)",
                "✓ Ventilated soffits to prevent attic condensation",
                "✓ Rot-proof and termite-resistant materials",
                "✓ Clean architectural finish for your roof edges"
            ]
        },
        attic: {
            number: "07",
            title: "Attic Thermal Insulation Upgrades",
            description: "Up to 35% of home heat escapes through uninsulated roofs. Our high-density attic insulation slashes heating bills and boosts home comfort.",
            features: [
                "✓ High-grade Earthwool & fiberglass insulation roll out",
                "✓ Cold water tank & pipe lagging included",
                "✓ SEAI energy efficiency compliant materials",
                "✓ Immediate reduction in winter home heating costs"
            ]
        },
        leadvalleys: {
            number: "08",
            title: "Lead Valleys & Chimney Flashing Repairs",
            description: "Master leadwork craftsmanship. We repair, weld, and replace lead valley gutters and chimney apron flashings to stop internal ceiling leaks.",
            features: [
                "✓ Code 4 & Code 5 sheet lead fabrication",
                "✓ Chimney step flashing & back gutter renewal",
                "✓ Waterproof lead valley gutter replacements",
                "✓ 25 Year warranty on all leadwork projects"
            ]
        }
    };

    // Service Modal Trigger
    const serviceModal = document.getElementById('serviceModal');
    const closeServiceModal = document.getElementById('closeServiceModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalFeatureList = document.getElementById('modalFeatureList');
    const modalNumberBadge = document.getElementById('modalNumberBadge');

    document.querySelectorAll('.service-box').forEach(box => {
        box.addEventListener('click', () => {
            const key = box.getAttribute('data-service');
            const data = serviceData[key];
            if (data && serviceModal) {
                modalTitle.textContent = data.title;
                modalDescription.textContent = data.description;
                if (modalNumberBadge) modalNumberBadge.textContent = data.number;
                modalFeatureList.innerHTML = data.features.map(f => `<li>${f}</li>`).join('');
                serviceModal.classList.add('active');
            }
        });
    });

    if (closeServiceModal) {
        closeServiceModal.addEventListener('click', () => serviceModal.classList.remove('active'));
    }

    // 2. Portfolio Marquee Carousel & Lightbox
    const marqueeViewport = document.getElementById('marqueeViewport');
    const prevMarquee = document.getElementById('prevMarquee');
    const nextMarquee = document.getElementById('nextMarquee');
    const lightboxModal = document.getElementById('lightboxModal');
    const closeLightboxModal = document.getElementById('closeLightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDesc = document.getElementById('lightboxDesc');

    if (marqueeViewport && prevMarquee && nextMarquee) {
        const scrollAmount = 380;
        nextMarquee.addEventListener('click', () => {
            marqueeViewport.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        prevMarquee.addEventListener('click', () => {
            marqueeViewport.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        // Continuous Auto-scroll timer
        let autoScrollTimer = setInterval(() => {
            if (marqueeViewport.scrollLeft + marqueeViewport.clientWidth >= marqueeViewport.scrollWidth - 10) {
                marqueeViewport.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                marqueeViewport.scrollBy({ left: 2, behavior: 'auto' });
            }
        }, 30);

        marqueeViewport.addEventListener('mouseenter', () => clearInterval(autoScrollTimer));
        marqueeViewport.addEventListener('mouseleave', () => {
            autoScrollTimer = setInterval(() => {
                if (marqueeViewport.scrollLeft + marqueeViewport.clientWidth >= marqueeViewport.scrollWidth - 10) {
                    marqueeViewport.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    marqueeViewport.scrollBy({ left: 2, behavior: 'auto' });
                }
            }, 30);
        });
    }

    // Lightbox Modal Trigger for Portfolio Items
    document.querySelectorAll('.portfolio-item-card').forEach(card => {
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
        closeLightboxModal.addEventListener('click', () => lightboxModal.classList.remove('active'));
    }

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
            alert(`Thank you ${name}! Your free inspection request has been received. Our team will call you back at ${phone} shortly.`);
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
