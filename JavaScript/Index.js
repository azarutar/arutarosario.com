document.addEventListener('DOMContentLoaded', function() {
    // Effetto luce che segue il movimento del mouse/touch
    const lightEffect = document.getElementById('light-effect');
    
    document.addEventListener('mousemove', (e) => {
        moveLight(e.clientX, e.clientY);
    });
    
    document.addEventListener('touchmove', (e) => {
        moveLight(e.touches[0].clientX, e.touches[0].clientY);
    });
    
    function moveLight(x, y) {
        lightEffect.style.left = (x - 100) + 'px';
        lightEffect.style.top = (y - 100) + 'px';
    }
    
    // Animazione di caricamento per gli elementi
    const animatedElements = document.querySelectorAll('.animate');
    
    // Intersection Observer per animare gli elementi quando entrano nella viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = element.classList.contains('delay-1') ? 200 :
                            element.classList.contains('delay-2') ? 400 :
                            element.classList.contains('delay-3') ? 600 :
                            element.classList.contains('delay-4') ? 800 :
                            element.classList.contains('delay-5') ? 1000 : 0;
                
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, delay);
                
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Effetto di tilt sulle card al movimento del device
    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', (e) => {
            const tilt = e.gamma / 15; // gamma è l'inclinazione sinistra-destra
            const cards = document.querySelectorAll('.link-card');
            
            cards.forEach(card => {
                card.style.transform = `rotateY(${tilt}deg) translateZ(0)`;
            });
        });
    }
});