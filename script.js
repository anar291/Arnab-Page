// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

    // === 1. SMOOTH SCROLLING for Nav Links ===
    const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent the default jump
            e.preventDefault();
            
            // Get the target element's ID from the href
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Get header height to offset the scroll
                const headerOffset = document.querySelector('.main-header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset - 20; // 20px extra padding
                
                // Scroll smoothly to the target
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // === 2. FADE-IN ON SCROLL Animation ===
    
    // Select all elements to fade in
    const fadeElements = document.querySelectorAll('.hidden-fade');
    
    const observerOptions = {
        root: null, // observes intersections relative to the viewport
        threshold: 0.1 // triggers when 10% of the element is visible
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If element is visible, add the 'show-fade' class
                entry.target.classList.add('show-fade');
                // Stop observing this element to save resources
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe each fade-in element
    fadeElements.forEach(el => observer.observe(el));


    // === 3. DARK MODE TOGGLE ===
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement; // The <html> tag
    const icon = themeToggle.querySelector('i');

    // Function to set the theme
    function setTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        if (theme === 'dark') {
            icon.classList.remove('bi-moon-fill');
            icon.classList.add('bi-brightness-high-fill'); // Sun icon
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.remove('bi-brightness-high-fill');
            icon.classList.add('bi-moon-fill'); // Moon icon
            localStorage.setItem('theme', 'light');
        }
    }

    // Check for saved theme in localStorage on page load
    const currentTheme = localStorage.getItem('theme') || 'light';
    setTheme(currentTheme);

    // Add click event listener to the toggle button
    themeToggle.addEventListener('click', () => {
        // Get the current theme
        const newTheme = htmlElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

});
