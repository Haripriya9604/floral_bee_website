document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    // 2. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // 3. Intersection Observer for soft scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve for better performance after animating once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-up, .fade-in');
    animatedElements.forEach(el => observer.observe(el));

    // 4. Cinematic Story Scroll Logic (Optimized)
    const stickyContainer = document.querySelector('.sticky-container');
    const texts = document.querySelectorAll('.story-text');
    const storyBg = document.querySelector('.story-bg');

    const storyImages = [
        'assets/images/hero_bouquet_1778839567701.png',
        'assets/images/gallery_details_1778839797857.png',
        'assets/images/gallery_wrapping_1778839604886.png',
        'assets/images/collection_pastel_1778839952464.png'
    ];

    if (stickyContainer && texts.length > 0) {
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollRect = stickyContainer.getBoundingClientRect();
                    
                    // Progress from 0 to 1
                    const startScroll = window.scrollY + scrollRect.top;
                    const scrollHeight = scrollRect.height - window.innerHeight;
                    
                    if (window.scrollY >= startScroll && window.scrollY <= startScroll + scrollHeight) {
                        let progress = (window.scrollY - startScroll) / scrollHeight;
                        progress = Math.max(0, Math.min(1, progress));
                        
                        const totalStages = texts.length;
                        let activeIndex = Math.floor(progress * totalStages);
                        if (activeIndex >= totalStages) activeIndex = totalStages - 1;

                        // Update texts
                        texts.forEach((text, index) => {
                            if (index === activeIndex) {
                                text.classList.add('active');
                            } else {
                                text.classList.remove('active');
                            }
                        });

                        // Update background image
                        const currentImage = storyBg.style.backgroundImage;
                        const newImage = `url("${storyImages[activeIndex]}")`;
                        
                        if (!currentImage.includes(storyImages[activeIndex])) {
                            storyBg.style.backgroundImage = newImage;
                        }
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // 5. Smooth Drag-to-Scroll for Signature Blooms
    const slider = document.getElementById('drag-scroll');
    if (slider) {
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.style.cursor = 'grabbing';
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.style.cursor = 'grab';
        });
        
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.style.cursor = 'grab';
        });
        
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2; // scroll-fast multiplier
            slider.scrollLeft = scrollLeft - walk;
        });
    }

});

// WhatsApp Enquiry Function
function openWhatsApp() {
    const phone = "1234567890"; // Placeholder phone number
    const message = "Hi floral_beee_! I'd love to enquire about a custom bouquet.";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}
