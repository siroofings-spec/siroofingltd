document.addEventListener('DOMContentLoaded', () => {
    // 1. Calculator Preț Interactiv
    const serviceType = document.getElementById('serviceType');
    const surfaceArea = document.getElementById('surfaceArea');
    const areaValue = document.getElementById('areaValue');
    const estimatedTotal = document.getElementById('estimatedTotal');

    function updatePrice() {
        if (!serviceType || !surfaceArea) return;
        const pricePerUnit = parseFloat(serviceType.value);
        const area = parseInt(surfaceArea.value);
        areaValue.textContent = `${area} m²`;
        
        const total = pricePerUnit * area;
        estimatedTotal.textContent = `${total.toLocaleString('ro-RO')} €`;
    }

    if (serviceType && surfaceArea) {
        serviceType.addEventListener('change', updatePrice);
        surfaceArea.addEventListener('input', updatePrice);
        updatePrice();
    }

    // 2. FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            item.classList.toggle('active');
        });
    });

    // 3. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = '#0F172A';
                navLinks.style.padding = '1.5rem';
            }
        });
    }

    // 4. Formular Contact Simulation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Îți mulțumim pentru mesaj! Echipa S&I Roofing Ltd te va contacta în cel mai scurt timp.');
            contactForm.reset();
        });
    }
});
