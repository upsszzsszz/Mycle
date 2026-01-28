document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileBtn.addEventListener('click', () => {
        const isFlex = navLinks.style.display === 'flex';
        navLinks.style.display = isFlex ? 'none' : 'flex';

        if (!isFlex) {
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'var(--surface-color)';
            navLinks.style.padding = '2rem';
            navLinks.style.borderBottom = '1px solid var(--border-color)';
        }
    });

    // Sticky Navigation Style
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(5, 5, 5, 0.9)';
            navbar.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.5)';
        } else {
            navbar.style.background = 'var(--glass-bg)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Smooth Scroll for Internal Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (window.innerWidth <= 900) {
                    navLinks.style.display = 'none';
                }
            }
        });
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible to run animation only once
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up');
    animatedElements.forEach(el => observer.observe(el));

    // Parallax/Tilt Effect for Hero Image
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        document.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.pageX) / 50;
            const y = (window.innerHeight / 2 - e.pageY) / 50;

            // Limit the effect
            const clampedX = Math.max(-10, Math.min(10, x));
            const clampedY = Math.max(-10, Math.min(10, y));

            heroImage.style.transform = `perspective(1000px) rotateY(${clampedX * -1}deg) rotateX(${clampedY}deg)`;
        });
    }

    // 5. Custom Cursor Follow Logic
    const cursor = document.querySelector('.custom-cursor');
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            targetX = e.clientX;
            targetY = e.clientY;
        });

        document.addEventListener('mousedown', () => cursor.classList.add('pressing'));
        document.addEventListener('mouseup', () => cursor.classList.remove('pressing'));

        const follow = () => {
            mouseX += (targetX - mouseX) * 0.25;
            mouseY += (targetY - mouseY) * 0.25;

            cursor.style.setProperty('--cursor-x', `${mouseX}px`);
            cursor.style.setProperty('--cursor-y', `${mouseY}px`);

            requestAnimationFrame(follow);
        };
        follow();
    }
});

// Toggle Feature Image Slider (Generic)
window.toggleFeatureImage = function (event) {
    event.stopPropagation();
    const card = event.target.closest('.feature-reveal-card');
    const images = card.querySelectorAll('.card-bg img');
    let activeIndex = 0;

    images.forEach((img, index) => {
        if (img.classList.contains('active')) {
            activeIndex = index;
            img.classList.remove('active');
        }
    });

    const nextIndex = (activeIndex + 1) % images.length;
    images[nextIndex].classList.add('active');
};
