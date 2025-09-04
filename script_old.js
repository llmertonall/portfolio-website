// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const progressBar = document.querySelector('.loading-progress');
    const percentage = document.querySelector('.loading-percentage');
    
    let progress = 0;
    const duration = 1500; // 1.5 seconds (reduced from 2.5)
    const interval = 50; // Update every 50ms
    const increment = (interval / duration) * 100;
    
    const loadingInterval = setInterval(() => {
        progress += increment;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            
            // Complete loading
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                document.body.classList.remove('loading');
                
                // Remove loading screen after animation
                setTimeout(() => {
                    loadingScreen.remove();
                }, 500);
            }, 300);
        }
        
        progressBar.style.width = progress + '%';
        percentage.textContent = Math.round(progress) + '%';
    }, interval);
    
    // Simulate loading tasks
    setTimeout(() => {
        // Preload images, fonts, etc.
        const images = document.querySelectorAll('img');
        let imagesLoaded = 0;
        
        if (images.length === 0) return;
        
        images.forEach(img => {
            if (img.complete) {
                imagesLoaded++;
            } else {
                img.addEventListener('load', () => {
                    imagesLoaded++;
                });
            }
        });
    }, 100);
}

// Initialize loading screen on DOM load
window.addEventListener('DOMContentLoaded', function() {
    initLoadingScreen();
});

// Particles.js Configuration
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 60, // Reduced from 80
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle"
                },
                "opacity": {
                    "value": 0.3,
                    "random": true
                },
                "size": {
                    "value": 3,
                    "random": true
                },
                "line_linked": {
                    "enable": true,
                    "distance": 120, // Reduced from 150
                    "color": "#ffffff",
                    "opacity": 0.2, // Reduced from 0.4
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 3, // Reduced from 6
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out"
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    }
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.5
                        }
                    },
                    "push": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    } else {
        console.log('Particles.js library not loaded');
    }
}

// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

// Check for saved theme preference or default to light
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);

// Update icon based on current theme
if (currentTheme === 'dark') {
    themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update icon with animation
    themeIcon.style.transform = 'rotate(360deg)';
    
    setTimeout(() => {
        if (newTheme === 'dark') {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        }
        themeIcon.style.transform = 'rotate(0deg)';
    }, 150);
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
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
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Contact Form Handler with Real Email
const contactForm = document.getElementById('contactForm');

// EmailJS Configuration
const EMAIL_CONFIG = {
    serviceID: 'service_7dqjm4j', // EmailJS Service ID - Gmail bağlantın
    templateID: 'template_pg7wgnw', // EmailJS Template ID - Contact Us template
    userID: 'vd-CZI6ZRxc2SF5El' // EmailJS Public Key - Aktif!
};

// Initialize EmailJS
function initEmailJS() {
    // EmailJS CDN'den yüklenmesini bekle
    const checkEmailJS = () => {
        if (typeof emailjs !== 'undefined') {
            try {
                emailjs.init(EMAIL_CONFIG.userID); // Eski sürüm için
                window.emailjsLoaded = true;
                console.log('EmailJS initialized successfully!');
            } catch (error) {
                console.error('EmailJS init error:', error);
                window.emailjsLoaded = false;
            }
        } else {
            console.log('EmailJS not loaded yet, retrying...');
            setTimeout(checkEmailJS, 100);
        }
    };
    
    checkEmailJS();
}

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !subject || !message) {
        showNotification('Lütfen tüm alanları doldurun!', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Lütfen geçerli bir email adresi girin!', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gönderiliyor...';
    submitBtn.disabled = true;
    
    // Prepare email data for EmailJS Contact Us template
    const emailData = {
        user_name: name,        // Contact Us template için
        user_email: email,      // Contact Us template için  
        user_subject: subject,  // Contact Us template için
        message: message        // Contact Us template için
    };
    
    // Send email via EmailJS
    if (typeof emailjs !== 'undefined' && window.emailjsLoaded) {
        emailjs.send(EMAIL_CONFIG.serviceID, EMAIL_CONFIG.templateID, emailData)
            .then(function(response) {
                console.log('Email sent successfully:', response);
                showNotification('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağım.', 'success');
                contactForm.reset();
            })
            .catch(function(error) {
                console.error('Email sending failed:', error);
                showNotification('Email gönderiminde hata oluştu: ' + error.text, 'error');
            })
            .finally(function() {
                // Restore button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
    } else {
        // Fallback to mailto if EmailJS is not available
        console.log('EmailJS not available, using fallback');
        sendViaMailto(emailData);
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

// Fallback mailto function
function sendViaMailto(emailData) {
    const subject = encodeURIComponent(`[Website Contact] ${emailData.subject}`);
    const body = encodeURIComponent(
        `İsim: ${emailData.from_name}\n` +
        `Email: ${emailData.from_email}\n` +
        `Konu: ${emailData.subject}\n\n` +
        `Mesaj:\n${emailData.message}`
    );
    
    const mailtoLink = `mailto:your_email@example.com?subject=${subject}&body=${body}`;
    window.open(mailtoLink);
    
    showNotification('Email uygulamanız açılıyor. EmailJS servisini aktifleştirmek için README dosyasını inceleyin.', 'info');
    contactForm.reset();
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        max-width: 400px;
        padding: 1rem;
        border-radius: 10px;
        background: ${type === 'success' ? '#2ecc71' : '#e74c3c'};
        color: white;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: auto;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button handler
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Skill bars animation on scroll
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillsSection = document.querySelector('#about');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 200);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

// Portfolio item hover effects
function initPortfolioEffects() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Typing effect for hero subtitle
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Social media links (you can replace these with your actual links)
function initSocialLinks() {
    const socialLinks = {
        linkedin: 'https://linkedin.com/in/your-profile',
        github: 'https://github.com/your-username',
        twitter: 'https://twitter.com/your-username',
        instagram: 'https://instagram.com/your-username'
    };
    
    // Update LinkedIn links
    document.querySelectorAll('a[href="#"]').forEach(link => {
        const icon = link.querySelector('i');
        if (icon) {
            if (icon.classList.contains('fa-linkedin')) {
                link.href = socialLinks.linkedin;
            } else if (icon.classList.contains('fa-github')) {
                link.href = socialLinks.github;
            } else if (icon.classList.contains('fa-twitter')) {
                link.href = socialLinks.twitter;
            } else if (icon.classList.contains('fa-instagram')) {
                link.href = socialLinks.instagram;
            }
        }
    });
}

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat h4');
    const aboutSection = document.querySelector('#about');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    const target = parseInt(counter.innerText);
                    let current = 0;
                    const increment = target / 50;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            counter.innerText = target + (counter.innerText.includes('+') ? '+' : '') + 
                                              (counter.innerText.includes('%') ? '%' : '');
                            clearInterval(timer);
                        } else {
                            counter.innerText = Math.floor(current) + (counter.innerText.includes('+') ? '+' : '') + 
                                              (counter.innerText.includes('%') ? '%' : '');
                        }
                    }, 50);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (aboutSection) {
        observer.observe(aboutSection);
    }
}

// Parallax effect for hero section
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
}

// Active navigation link highlighting
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    animateSkillBars();
    initPortfolioEffects();
    initSocialLinks();
    animateCounters();
    updateActiveNav();
    initProfileImage();
    
    // Add typing effect to hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        setTimeout(() => {
            typeWriter(heroSubtitle, originalText, 100);
        }, 1000);
    }
});

// Profile image error handling
function initProfileImage() {
    const profileImg = document.getElementById('profilePhoto');
    if (profileImg) {
        profileImg.addEventListener('error', function() {
            // If image fails to load, show placeholder
            const heroImage = document.querySelector('.hero-image');
            heroImage.innerHTML = `
                <div class="image-placeholder">
                    <i class="fas fa-user"></i>
                    <p>Fotoğrafınızı 'profil.jpg' olarak kaydedin</p>
                </div>
            `;
        });
    }
}

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #3498db !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Portfolio modal functionality
function initPortfolioModal() {
    const portfolioLinks = document.querySelectorAll('.portfolio-link');
    const modals = document.querySelectorAll('.modal');
    const modalCloses = document.querySelectorAll('.modal-close');
    
    // Open modal
    portfolioLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scroll
            }
        });
    });
    
    // Close modal
    modalCloses.forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.classList.remove('active');
            document.body.style.overflow = 'auto'; // Restore scroll
        });
    });
    
    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Close modal with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                activeModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });
}

// Initialize portfolio modal on load
document.addEventListener('DOMContentLoaded', function() {
    initPortfolioModal();
});

// Download CV functionality
document.querySelector('.contact-download .btn').addEventListener('click', function(e) {
    e.preventDefault();
    showNotification('CV indirme özelliği yakında aktif olacak!', 'info');
});

// WhatsApp Integration
function initWhatsApp() {
    const whatsappNumber = '905050376160'; // Gerçek telefon numaranız
    const defaultMessage = 'Merhaba Mert! Web sitenizi gördüm ve iş imkanları hakkında görüşmek istiyorum. Müsait olduğunuzda konuşabilir miyiz?';
    
    // WhatsApp button in contact section
    const whatsappBtn = document.getElementById('whatsappBtn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openWhatsApp(whatsappNumber, defaultMessage);
        });
    }
    
    // Floating WhatsApp button
    const whatsappFloat = document.getElementById('whatsappFloat');
    if (whatsappFloat) {
        whatsappFloat.addEventListener('click', function(e) {
            e.preventDefault();
            openWhatsApp(whatsappNumber, defaultMessage);
        });
    }
}

function openWhatsApp(phoneNumber, message) {
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Open in new tab
    window.open(whatsappURL, '_blank');
    
    // Show notification
    showNotification('WhatsApp açılıyor...', 'info');
}

// WhatsApp floating button scroll behavior
function handleWhatsAppFloat() {
    const whatsappFloat = document.getElementById('whatsappFloat');
    const footer = document.querySelector('.footer');
    
    if (!whatsappFloat || !footer) return;
    
    const footerRect = footer.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    // Hide when footer is visible
    if (footerRect.top < viewportHeight) {
        whatsappFloat.style.bottom = `${viewportHeight - footerRect.top + 20}px`;
    } else {
        whatsappFloat.style.bottom = '20px';
    }
}

// Add scroll event for WhatsApp button
window.addEventListener('scroll', handleWhatsAppFloat);

// Add notification style for info type
function showInfoNotification(message) {
    showNotification(message, 'info');
}

// Add info notification styles
const infoStyle = document.createElement('style');
infoStyle.textContent = `
    .notification-info {
        background: #3498db !important;
    }
`;
document.head.appendChild(infoStyle);

// Scroll reveal animations
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Add scroll event listener
window.addEventListener('scroll', revealOnScroll);

// Initial check for elements already in view and hero animations
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    initEmailJS();
    
    // Initialize particles after loading screen
    setTimeout(() => {
        initParticles();
    }, 2000); // 2 seconds (reduced from 3)
    
    // Initialize portfolio modal
    initPortfolioModal();
    
    // Initialize WhatsApp
    initWhatsApp();
    
    // Check for elements already in view
    revealOnScroll();
    
    // Add a small delay for initial hero animations
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero .reveal, .hero .reveal-left, .hero .reveal-right');
        heroElements.forEach(element => {
            element.classList.add('active');
        });
    }, 500);
});
