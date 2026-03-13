
// Navbar background on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 2px 20px var(--shadow)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Smooth reveal animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for scroll animation
document.querySelectorAll('.timeline-item, .project-card, .contact-item, .accordion-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Accordion functionality
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const accordionItem = header.parentElement;
        const isActive = accordionItem.classList.contains('active');

        // Close all other accordions
        document.querySelectorAll('.accordion-item').forEach(item => {
            item.classList.remove('active');
        });

        // Toggle current accordion
        if (!isActive) {
            accordionItem.classList.add('active');
        }
    });
});

// Add revealed class styles
const style = document.createElement('style');
style.textContent = `
    .revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--accent)';
        }
    });
});


// Menu hamburger mobile
const navBurger = document.getElementById('nav-burger');
const navLinksList = document.querySelector('.nav-links');

if (navBurger && navLinksList) {
    navBurger.addEventListener('click', () => {
        const isOpen = navLinksList.classList.toggle('open');
        navBurger.classList.toggle('open');
        navBurger.setAttribute('aria-expanded', isOpen);
    });

    // Fermer le menu au clic sur un lien
    navLinksList.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinksList.classList.remove('open');
            navBurger.classList.remove('open');
            navBurger.setAttribute('aria-expanded', 'false');
        });
    });

    // Fermer le menu au clic en dehors
    document.addEventListener('click', (e) => {
        if (!navBurger.contains(e.target) && !navLinksList.contains(e.target)) {
            navLinksList.classList.remove('open');
            navBurger.classList.remove('open');
            navBurger.setAttribute('aria-expanded', 'false');
        }
    });
}
