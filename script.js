// Analytics tracking function
function trackEvent(eventName, parameters = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, parameters);
    }
}

// Carousel functionality
let currentSlide = 1;
const totalSlides = 2;
let carouselInterval;
let isTransitioning = false;

function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    console.log('Carousel initialized with', slides.length, 'slides');
    console.log('First slide src:', slides[0].src);
    console.log('Second slide src:', slides[1].src);
    
    function showSlide(slideNumber) {
        console.log('Attempting to show slide:', slideNumber);
        if (isTransitioning) {
            console.log('Transition in progress, skipping');
            return; // Prevent multiple transitions
        }
        isTransitioning = true;
        
        // Remove active class from all slides and indicators
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Show new slide and activate indicator
        const newSlideElement = document.querySelector(`[data-slide="${slideNumber}"]`);
        const newIndicator = document.querySelector(`.indicator[data-slide="${slideNumber}"]`);
        
        if (newSlideElement) {
            newSlideElement.classList.add('active');
            console.log('Activated slide:', newSlideElement.src);
            console.log('Slide number:', slideNumber);
            console.log('Expected image:', slideNumber === 1 ? 'front_2.png' : 'front_4.png');
        }
        
        if (newIndicator) {
            newIndicator.classList.add('active');
        }
        
        // Complete transition after fade
        setTimeout(() => {
            isTransitioning = false;
            console.log('Transition completed');
        }, 1200); // Match CSS transition duration
        
        // Track carousel slide change
        trackEvent('carousel_slide_change', {
            slide_number: slideNumber,
            slide_image: slideNumber === 1 ? 'front_2.png' : 'front_4.png'
        });
    }
    
    function nextSlide() {
        currentSlide = currentSlide >= totalSlides ? 1 : currentSlide + 1;
        console.log('Next slide triggered:', currentSlide);
        showSlide(currentSlide);
    }
    
    // Set up automatic carousel (20 seconds)
    carouselInterval = setInterval(nextSlide, 20000);
    console.log('Carousel interval set for 20 seconds');
    
    // Set up indicator clicks
    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            const slideNumber = parseInt(indicator.getAttribute('data-slide'));
            console.log('Indicator clicked for slide:', slideNumber);
            if (slideNumber === currentSlide) {
                console.log('Same slide clicked, ignoring');
                return; // Don't transition to same slide
            }
            
            currentSlide = slideNumber;
            showSlide(slideNumber);
            
            // Reset the interval
            clearInterval(carouselInterval);
            carouselInterval = setInterval(nextSlide, 20000);
            
            // Track manual carousel navigation
            trackEvent('carousel_manual_navigation', {
                slide_number: slideNumber,
                slide_image: slideNumber === 1 ? 'front_2.png' : 'front_4.png'
            });
        });
    });
    
    // Initialize with first slide
    console.log('Initializing with slide 1');
    showSlide(1);
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
});

// Track page views
document.addEventListener('DOMContentLoaded', () => {
    trackEvent('page_view', {
        page_title: document.title,
        page_location: window.location.href
    });
});

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    
    // Track mobile menu usage
    trackEvent('mobile_menu_toggle', {
        menu_state: navMenu.classList.contains('active') ? 'opened' : 'closed'
    });
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        
        // Track navigation clicks
        trackEvent('navigation_click', {
            link_text: link.textContent.trim(),
            link_href: link.getAttribute('href')
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Track smooth scroll navigation
            trackEvent('smooth_scroll', {
                target_section: this.getAttribute('href'),
                link_text: this.textContent.trim()
            });
        }
    });
});

// Track button clicks
document.addEventListener('DOMContentLoaded', () => {
    // Track download button clicks
    document.querySelectorAll('a[href="#download"], .btn-primary').forEach(button => {
        button.addEventListener('click', () => {
            trackEvent('download_button_click', {
                button_text: button.textContent.trim(),
                button_location: getButtonLocation(button)
            });
        });
    });
    
    // Track membership plan interactions
    document.querySelectorAll('.membership-card .btn').forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.membership-card');
            const planName = card.querySelector('h3').textContent;
            
            trackEvent('membership_plan_click', {
                plan_name: planName,
                button_text: button.textContent.trim(),
                is_featured: card.classList.contains('featured')
            });
        });
    });
    
    // Track feature card interactions
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('click', () => {
            const featureName = card.querySelector('h3').textContent;
            trackEvent('feature_card_click', {
                feature_name: featureName
            });
        });
    });
    
    // Track testimonial interactions
    document.querySelectorAll('.testimonial-card').forEach(card => {
        card.addEventListener('click', () => {
            const authorName = card.querySelector('.author-info h4').textContent;
            trackEvent('testimonial_click', {
                author_name: authorName
            });
        });
    });
});

// Helper function to determine button location
function getButtonLocation(button) {
    if (button.closest('.hero-buttons')) return 'hero_section';
    if (button.closest('.cta-buttons')) return 'download_cta';
    if (button.closest('.membership-card')) return 'membership_section';
    return 'other';
}

// Track scroll depth
let maxScrollDepth = 0;
window.addEventListener('scroll', () => {
    const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
    
    if (scrollPercent > maxScrollDepth) {
        maxScrollDepth = scrollPercent;
        
        // Track scroll milestones
        if (scrollPercent >= 25 && maxScrollDepth < 50) {
            trackEvent('scroll_depth', { depth: '25%' });
        } else if (scrollPercent >= 50 && maxScrollDepth < 75) {
            trackEvent('scroll_depth', { depth: '50%' });
        } else if (scrollPercent >= 75 && maxScrollDepth < 100) {
            trackEvent('scroll_depth', { depth: '75%' });
        } else if (scrollPercent >= 100) {
            trackEvent('scroll_depth', { depth: '100%' });
        }
    }
});

// Track time on page
let startTime = Date.now();
window.addEventListener('beforeunload', () => {
    const timeOnPage = Math.round((Date.now() - startTime) / 1000);
    trackEvent('time_on_page', {
        seconds: timeOnPage
    });
});

// Track form interactions (if any forms are added later)
document.addEventListener('submit', (e) => {
    trackEvent('form_submit', {
        form_id: e.target.id || 'unknown',
        form_action: e.target.action || 'unknown'
    });
});

// Track external link clicks
document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link && link.hostname !== window.location.hostname) {
        trackEvent('external_link_click', {
            link_url: link.href,
            link_text: link.textContent.trim()
        });
    }
});

// Track social media clicks
document.querySelectorAll('.social-links a').forEach(link => {
    link.addEventListener('click', () => {
        const platform = link.querySelector('i').className.includes('twitter') ? 'twitter' :
                        link.querySelector('i').className.includes('facebook') ? 'facebook' :
                        link.querySelector('i').className.includes('instagram') ? 'instagram' :
                        link.querySelector('i').className.includes('linkedin') ? 'linkedin' : 'other';
        
        trackEvent('social_media_click', {
            platform: platform,
            link_url: link.href
        });
    });
});

// Track section visibility
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionName = entry.target.id || entry.target.className.split(' ')[0];
            trackEvent('section_view', {
                section_name: sectionName,
                section_title: entry.target.querySelector('h2')?.textContent || 'unknown'
            });
        }
    });
}, { threshold: 0.5 });

// Observe all major sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});

// Track device and browser information
document.addEventListener('DOMContentLoaded', () => {
    trackEvent('page_load', {
        user_agent: navigator.userAgent,
        screen_resolution: `${screen.width}x${screen.height}`,
        viewport_size: `${window.innerWidth}x${window.innerHeight}`,
        language: navigator.language,
        referrer: document.referrer || 'direct'
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Animate feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Animate membership cards
    const membershipCards = document.querySelectorAll('.membership-card');
    membershipCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Animate lesson cards
    const lessonCards = document.querySelectorAll('.lesson-card');
    lessonCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Animate testimonial cards
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Animate section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        header.style.opacity = '0';
        header.style.transform = 'translateY(30px)';
        header.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(header);
    });

    // Animate about content
    const aboutContent = document.querySelector('.about-content');
    if (aboutContent) {
        aboutContent.style.opacity = '0';
        aboutContent.style.transform = 'translateY(30px)';
        aboutContent.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(aboutContent);
    }

    // Animate CTA content
    const ctaContent = document.querySelector('.cta-content');
    if (ctaContent) {
        ctaContent.style.opacity = '0';
        ctaContent.style.transform = 'translateY(30px)';
        ctaContent.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(ctaContent);
    }
});

// Parallax effect for floating elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Interactive hover effects for cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.feature-card, .lesson-card, .testimonial-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Counter animation for stats
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
};

// Observe stats for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statElement = entry.target.querySelector('h3');
            const text = statElement.textContent;
            const target = parseInt(text.replace(/[^\d]/g, ''));
            
            if (text.includes('M')) {
                animateCounter(statElement, target, 2000);
            } else if (text.includes('K')) {
                animateCounter(statElement, target, 2000);
            } else if (text.includes('%')) {
                animateCounter(statElement, target, 2000);
            }
            
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const stats = document.querySelectorAll('.stat');
    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
});

// Smooth reveal animation for hero section
document.addEventListener('DOMContentLoaded', () => {
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(50px)';
        heroContent.style.transition = 'opacity 1s ease 0.3s, transform 1s ease 0.3s';
        
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
    
    if (heroImage) {
        heroImage.style.opacity = '0';
        heroImage.style.transform = 'translateX(50px)';
        heroImage.style.transition = 'opacity 1s ease 0.6s, transform 1s ease 0.6s';
        
        setTimeout(() => {
            heroImage.style.opacity = '1';
            heroImage.style.transform = 'translateX(0)';
        }, 100);
    }
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
    });
});

// Interactive button hover effects
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });
});

// Add ripple effect to buttons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add scroll progress indicator
document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #3b82f6, #8b5cf6);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
});

// Add back to top button
document.addEventListener('DOMContentLoaded', () => {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #3b82f6;
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    `;
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Track back to top clicks
        trackEvent('back_to_top_click');
    });
    
    backToTop.addEventListener('mouseenter', () => {
        backToTop.style.transform = 'translateY(-3px)';
        backToTop.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.4)';
    });
    
    backToTop.addEventListener('mouseleave', () => {
        backToTop.style.transform = 'translateY(0)';
        backToTop.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
    });
});

// Add CSS for mobile menu
const styleMobile = document.createElement('style');
styleMobile.textContent = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background-color: white;
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
            padding: 2rem 0;
        }

        .nav-menu.active {
            left: 0;
        }

        .nav-toggle {
            display: flex;
        }

        .nav-toggle.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }

        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }

        .nav-toggle.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    }
`;
document.head.appendChild(styleMobile); 