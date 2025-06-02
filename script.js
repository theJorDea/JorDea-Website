// Performance optimizations
const PERFORMANCE_CONFIG = {
    particleCount: window.innerWidth < 768 ? 20 : window.innerWidth < 1024 ? 30 : 40, // Reduced particles
    animationDelay: 100,
    intersectionThreshold: 0.1,
    debounceDelay: 16 // ~60fps
};

// Theme Management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.setTheme(this.theme);
        this.bindEvents();
    }

    setTheme(theme) {
        this.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.updateThemeIcon();
    }

    toggleTheme() {
        const newTheme = this.theme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    updateThemeIcon() {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return;
        
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = this.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    bindEvents() {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }
}

// Optimized Scroll Animation Manager
class ScrollAnimationManager {
    constructor() {
        this.animatedElements = new Set();
        this.scrollTimeout = null;
        this.init();
    }

    init() {
        this.createObserver();
        this.bindScrollEvents();
    }

    createObserver() {
        if (!('IntersectionObserver' in window)) {
            // Fallback for older browsers
            this.fallbackAnimation();
            return;
        }

        const options = {
            threshold: PERFORMANCE_CONFIG.intersectionThreshold,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
                    this.animateElement(entry.target);
                    this.animatedElements.add(entry.target);
                }
            });
        }, options);

        // Observe all fade-in elements
        requestAnimationFrame(() => {
            document.querySelectorAll('.fade-in').forEach(el => {
                this.observer.observe(el);
            });
        });
    }

    fallbackAnimation() {
        // Simple fallback for older browsers
        document.querySelectorAll('.fade-in').forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    animateElement(element) {
        element.style.animation = 'fadeInUp 0.6s ease forwards';
        
        // Stagger delay for sibling elements
        const siblings = element.parentElement?.querySelectorAll('.fade-in') || [];
        const index = Array.from(siblings).indexOf(element);
        element.style.animationDelay = `${index * 0.05}s`;
    }

    bindScrollEvents() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        let lastScrollY = window.scrollY;
        let ticking = false;

        const updateScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Navbar hide/show - Logic to be removed or commented out
            /* 
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            */
            // Ensure navbar is always visible
            navbar.style.transform = 'translateY(0)';
            
            lastScrollY = currentScrollY;
            this.updateActiveNavLink();
            ticking = false;
        };

        const requestScrollUpdate = () => {
            if (!ticking) {
                requestAnimationFrame(updateScroll);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (!sections.length || !navLinks.length) return;
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    }
}

// Navigation Manager
class NavigationManager {
    constructor() {
        this.init();
    }

    init() {
        this.bindSmoothScrolling();
        this.bindMobileNavigation();
    }

    bindSmoothScrolling() {
        document.addEventListener('click', (e) => {
            const anchor = e.target.closest('a[href^="#"]');
            if (!anchor) return;
            
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    bindMobileNavigation() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (!hamburger || !navMenu) return;

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        navMenu.addEventListener('click', (e) => {
            if (e.target.classList.contains('nav-link')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Optimized Typing Animation
class TypingAnimation {
    constructor(element, texts, typeSpeed = 120, deleteSpeed = 60, pauseTime = 2000) {
        this.element = element;
        this.texts = texts;
        this.typeSpeed = typeSpeed;
        this.deleteSpeed = deleteSpeed;
        this.pauseTime = pauseTime;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.timeoutId = null;
        this.init();
    }

    init() {
        if (this.element && this.texts.length > 0) {
            this.type();
        }
    }

    type() {
        const currentText = this.texts[this.textIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        let typeSpeedCurrent = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeedCurrent = this.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
        }

        this.timeoutId = setTimeout(() => this.type(), typeSpeedCurrent);
    }

    destroy() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    }
}

// Optimized Particle Background Effect
class ParticleBackground {
    constructor(container) {
        this.container = container;
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.particleCount = PERFORMANCE_CONFIG.particleCount;
        this.animationId = null;
        this.isVisible = true;
        
        // Only create particles on larger screens
        if (window.innerWidth >= 768) {
            this.init();
        }
    }

    init() {
        if (!this.container) return;
        
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.container.appendChild(this.canvas);
        
        this.canvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        
        this.resize();
        this.createParticles();
        this.animate();
        
        // Pause animation when not visible
        document.addEventListener('visibilitychange', () => {
            this.isVisible = !document.hidden;
            if (this.isVisible && !this.animationId) {
                this.animate();
            }
        });
        
        window.addEventListener('resize', this.debounce(() => this.resize(), 250));
    }

    resize() {
        if (!this.canvas) return;
        
        const rect = this.container.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3,
                opacity: Math.random() * 0.3 + 0.1
            });
        }
    }

    animate() {
        if (!this.isVisible || !this.ctx) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const particleColor = isDark ? '255, 255, 255' : '0, 0, 0';
        
        this.particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Wrap around edges
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.y > this.canvas.height) particle.y = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            
            // Draw particle
            this.ctx.fillStyle = `rgba(${particleColor}, ${particle.opacity})`;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

// Loading Manager
class LoadingManager {
    constructor() {
        this.loadingScreen = document.getElementById('loadingScreen');
        this.init();
    }

    init() {
        // Show loading screen immediately
        if (this.loadingScreen) {
            this.loadingScreen.style.display = 'flex';
        }
        
        // Hide loading when everything is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.hideLoading());
        } else {
            this.hideLoading();
        }
    }

    hideLoading() {
        // Wait for fonts and external resources
        Promise.all([
            document.fonts.ready,
            new Promise(resolve => {
                if (document.readyState === 'complete') {
                    resolve();
                } else {
                    window.addEventListener('load', resolve);
                }
            })
        ]).then(() => {
            setTimeout(() => {
                if (this.loadingScreen) {
                    this.loadingScreen.classList.add('hidden');
                    setTimeout(() => {
                        this.loadingScreen.style.display = 'none';
                    }, 300);
                }
                this.startInitialAnimations();
            }, 300);
        });
    }

    startInitialAnimations() {
        // Trigger initial animations for visible elements
        const visibleElements = document.querySelectorAll('.fade-in');
        visibleElements.forEach((el, index) => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                setTimeout(() => {
                    el.style.animation = 'fadeInUp 0.6s ease forwards';
                }, index * 50);
            }
        });
    }
}

// Utility Functions
const utils = {
    // Optimized debounce
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    },

    // Throttle for better performance
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Optimized number animation
    animateNumber(element, start, end, duration = 1500) {
        if (!element) return;
        
        const startTime = performance.now();
        const range = end - start;
        
        const updateNumber = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(start + range * easeOut);
            
            element.textContent = current + (element.dataset.suffix || '');
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        };
        
        requestAnimationFrame(updateNumber);
    }
};

// Image Loading Handler
function initializeImageLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    images.forEach(img => {
        // Handle successful image load
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        // Handle image load error
        img.addEventListener('error', function() {
            console.warn('Failed to load image:', this.src);
            this.alt = 'Изображение недоступно';
            this.style.backgroundColor = 'var(--accent)';
            this.style.minHeight = '200px';
        });
        
        // If image is already loaded (cached)
        if (img.complete && img.naturalHeight !== 0) {
            img.classList.add('loaded');
        }
    });
    
    // Handle all images, not just lazy loaded
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
        if (!img.hasAttribute('loading')) {
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
            
            img.addEventListener('error', function() {
                console.warn('Failed to load image:', this.src);
                this.alt = 'Изображение недоступно';
                this.style.backgroundColor = 'var(--accent)';
                this.style.minHeight = '200px';
            });
        }
    });
}

// Initialize everything
function initializeApp() {
    // Initialize core managers
    const themeManager = new ThemeManager();
    const loadingManager = new LoadingManager();
    const scrollAnimationManager = new ScrollAnimationManager();
    const navigationManager = new NavigationManager();
    
    // Initialize image loading handlers
    initializeImageLoading();
    
    // Initialize typing animation (only after DOM is ready)
    const heroSubtitle = document.querySelector('.title-sub');
    let typingAnimation;
    if (heroSubtitle) {
        typingAnimation = new TypingAnimation(
            heroSubtitle, 
            ['Developer', 'Frontend', 'Fullstack', 'Creator'], 
            120, 60, 2000
        );
    }
    
    // Initialize particle background (only on larger screens)
    let particleBackground;
    if (window.innerWidth >= 768) {
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            particleBackground = new ParticleBackground(heroSection);
        }
    }
    
    // Calculate and set about image height
    function setAboutImageHeight() {
        const sectionTitle = document.querySelector('.about .section-title');
        const aboutStats = document.querySelector('.about-stats');
        const imageContainer = document.querySelector('.about-image .image-container');
        const aboutImageCell = document.querySelector('.about-image'); // Родительский элемент-ячейка грида для imageContainer

        if (sectionTitle && aboutStats && imageContainer && aboutImageCell && window.innerWidth >= 1024) {
            const titleRect = sectionTitle.getBoundingClientRect();
            const statsRect = aboutStats.getBoundingClientRect();
            const imageCellRect = aboutImageCell.getBoundingClientRect(); // Прямоугольник ячейки грида, в которой находится изображение

            // 1. Рассчитать и установить высоту для imageContainer
            // Высота от верха sectionTitle до низа aboutStats
            const calculatedHeight = statsRect.bottom - titleRect.top;
            imageContainer.style.height = `${calculatedHeight}px`;
            imageContainer.style.minHeight = `${calculatedHeight}px`; // Важно для предотвращения сжатия

            // 2. Рассчитать и установить вертикальное смещение для imageContainer
            // Смещение необходимо, чтобы верх imageContainer совпал с верхом sectionTitle.
            // imageContainer находится внутри aboutImageCell. По умолчанию, верх imageContainer
            // совпадает с верхом imageCellRect.top. Нам нужно сместить его вверх.
            const verticalOffset = titleRect.top - imageCellRect.top;
            
            // imageContainer уже имеет position: relative из CSS, что позволяет использовать 'top'
            imageContainer.style.top = `${verticalOffset}px`;

            const img = imageContainer.querySelector('img');
            if (img) {
                img.style.height = '100%'; // Изображение должно заполнять всю высоту контейнера
                img.style.objectFit = 'cover';
                img.style.removeProperty('aspect-ratio'); // Убираем aspect-ratio, чтобы высота работала корректно
            }
        } else if (window.innerWidth < 1024) {
            // Сброс стилей для мобильных устройств и планшетов, чтобы CSS из медиа-запросов работал
            if (imageContainer) {
                imageContainer.style.removeProperty('height');
                imageContainer.style.removeProperty('min-height');
                imageContainer.style.removeProperty('top');
                // position: relative остается из CSS, сброс 'top' вернет его в исходное положение в потоке
            }
            const img = imageContainer?.querySelector('img');
            if (img) {
                img.style.removeProperty('height');
                // aspect-ratio и object-fit будут взяты из CSS для соответствующего размера экрана
                // Убедитесь, что CSS для img содержит нужные aspect-ratio для мобильных версий
            }
        }
    }

    // Set initial height
    setTimeout(setAboutImageHeight, 100);
    
    // Recalculate on window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(setAboutImageHeight, 100);
    });
    
    // Recalculate when fonts load
    if (document.fonts) {
        document.fonts.ready.then(setAboutImageHeight);
    }
    
    // Optimize statistics animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                if (statNumber && !statNumber.classList.contains('animated')) {
                    statNumber.classList.add('animated');
                    const value = parseInt(statNumber.textContent.replace(/\D/g, ''));
                    utils.animateNumber(statNumber, 0, value, 1200);
                }
                // Recalculate image height after stats animation
                setTimeout(setAboutImageHeight, 100);
            }
        });
    }, { threshold: 0.3 });
    
    document.querySelectorAll('.stat-item').forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // Optimize social links interactions
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        }, { passive: true });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        }, { passive: true });
    });
    
    // Copy email functionality
    const emailElement = document.querySelector('.contact-item span[title*="email"], .contact-item span:nth-child(2)');
    if (emailElement && emailElement.textContent.includes('@')) {
        emailElement.style.cursor = 'pointer';
        emailElement.title = 'Нажмите, чтобы скопировать email';
        
        emailElement.addEventListener('click', async () => {
            if (navigator.clipboard) {
                try {
                    await navigator.clipboard.writeText(emailElement.textContent);
                    const originalText = emailElement.textContent;
                    emailElement.textContent = 'Email скопирован!';
                    setTimeout(() => {
                        emailElement.textContent = originalText;
                    }, 2000);
                } catch (err) {
                    console.log('Не удалось скопировать email');
                }
            }
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const hamburger = document.getElementById('hamburger');
            const navMenu = document.querySelector('.nav-menu');
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        if (typingAnimation) typingAnimation.destroy();
        if (particleBackground) particleBackground.destroy();
    });
}

// Start the application
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Add CSS for loading state and mobile menu
const additionalStyles = `
    .loading * {
        animation-play-state: paused !important;
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 80px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 80px);
            background: var(--bg-primary);
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 2rem;
            transition: left 0.3s ease;
            border-top: 1px solid var(--border);
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
    
    .nav-link.active {
        color: var(--text-primary);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet); 