document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('mainNavbar');
    const handleNavbar = () => {
        if (!navbar) return;
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleNavbar);
    handleNavbar();

    const animatedEls = document.querySelectorAll('[data-animate]');
    const animateOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.92;
        animatedEls.forEach(el => {
            const boxTop = el.getBoundingClientRect().top;
            if (boxTop < triggerBottom && !el.classList.contains('animate__animated')) {
                const anim = el.dataset.animate || 'fadeInUp';
                el.classList.add('animate__animated', `animate__${anim}`);
            }
        });
    };
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
});
