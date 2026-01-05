// ==========================================
// Theme Toggle
// ==========================================

const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;

// Load saved theme or default to light
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// ==========================================
// Active Navigation Link on Scroll
// ==========================================

const navLinks = document.querySelectorAll('.nav-link');
const sections = Array.from(navLinks).map(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
        const section = document.querySelector(href);
        return { link, section, id: href.substring(1) };
    }
    return null;
}).filter(Boolean);

function updateActiveLink() {
    const scrollPosition = window.scrollY + 100;
    
    let activeSection = null;
    
    // Find the current section
    for (const item of sections) {
        if (item.section) {
            const sectionTop = item.section.offsetTop;
            const sectionBottom = sectionTop + item.section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSection = item;
                break;
            }
        }
    }
    
    // Update active class
    navLinks.forEach(link => link.classList.remove('active'));
    
    if (activeSection) {
        activeSection.link.classList.add('active');
    } else if (scrollPosition < 300) {
        // Default to "About" when at the top
        const aboutLink = Array.from(navLinks).find(link => 
            link.getAttribute('href') === '#about'
        );
        if (aboutLink) {
            aboutLink.classList.add('active');
        }
    }
}

// Throttle scroll event for performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
        updateActiveLink();
    });
}, { passive: true });

// Initial active link on page load
updateActiveLink();

// ==========================================
// Smooth Scroll Enhancement
// ==========================================

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = 80;
                const targetPosition = target.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ==========================================
// Download CV Button
// ==========================================

const cvButton = document.querySelector('.btn-cv');

cvButton.addEventListener('click', () => {
    alert('CV download would start here.');
});

// ==========================================
// Keyboard Navigation Enhancement
// ==========================================

document.addEventListener('keydown', (e) => {
    // Allow Tab navigation
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});
