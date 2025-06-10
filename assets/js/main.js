document.addEventListener('DOMContentLoaded', () => {
    const animatedEls = document.querySelectorAll('[data-animate]');
    const animateOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.92;
        animatedEls.forEach(el => {
            const boxTop = el.getBoundingClientRect().top;
            if (boxTop < triggerBottom) {
                el.classList.add('animated');
            }
        });
    };
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
});
