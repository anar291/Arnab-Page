// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Theme Toggle ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body; // We define 'body' here once
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeIcon.classList.remove('bi-moon-fill');
        themeIcon.classList.add('bi-sun-fill');
    }

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // Save the user's preference
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.remove('bi-moon-fill');
            themeIcon.classList.add('bi-sun-fill');
        } else {
            localStorage.setItem('theme', 'light');
            themeIcon.classList.remove('bi-sun-fill');
            themeIcon.classList.add('bi-moon-fill');
        }
    });


    // --- 2. Fade-in on Scroll Animation ---
    
    // Select all elements with the .hidden-fade class
    const hiddenElements = document.querySelectorAll('.hidden-fade');

    // Set up the Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If the element is on screen
            if (entry.isIntersecting) {
                // Add the 'show' class to make it visible
                entry.target.classList.add('show');
                // We can unobserve it so it only animates once
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    // Tell the observer to watch each .hidden-fade element
    hiddenElements.forEach(el => observer.observe(el));


    // --- 3. Active Nav Link on Scroll ---
    const sections = document.querySelectorAll('section[id]');
    // Select only the links that scroll to a section
    const scrollSpyLinks = document.querySelectorAll('.main-nav a[href^="#"]');

    function updateActiveNavLink() {
        let currentSectionId = '';
        
        // Find which section is currently in view
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // 81px offset for the fixed header + 1px border
            if (window.scrollY >= sectionTop - 81) { 
                currentSectionId = section.getAttribute('id');
            }
        });

        // Add 'active' class to the matching nav link and remove it from others
        scrollSpyLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    // Run the function on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    // Run it once on load
    updateActiveNavLink();


    // --- 4. Mobile Menu Toggle ---
    const menuToggleBtn = document.getElementById('mobile-menu-toggle');
    const mobileMenuIcon = menuToggleBtn.querySelector('i');
    const mainNav = document.querySelector('.main-nav');
    // We can re-use the 'body' variable from Section 1

    menuToggleBtn.addEventListener('click', () => {
        // Toggle the 'is-open' class on the nav menu
        mainNav.classList.toggle('is-open');

        // Toggle the icon between 'bi-list' (hamburger) and 'bi-x' (close)
        if (mainNav.classList.contains('is-open')) {
            mobileMenuIcon.classList.remove('bi-list');
            mobileMenuIcon.classList.add('bi-x');
            menuToggleBtn.setAttribute('aria-expanded', 'true');
            
            // Prevent the page from scrolling when the menu is open
            body.style.overflow = 'hidden'; 
        } else {
            mobileMenuIcon.classList.remove('bi-x');
            mobileMenuIcon.classList.add('bi-list');
            menuToggleBtn.setAttribute('a_ria-expanded', 'false');
            
            // Allow the page to scroll again
            body.style.overflow = '';
        }
    });

    // --- 5. Close Mobile Menu on Link Click ---
    // This is a nice touch for a good user experience!
    // We select ALL links in the nav for this
    const allNavLinks = document.querySelectorAll('.main-nav a'); 
    
    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Check if the mobile menu is open
            if (mainNav.classList.contains('is-open')) {
                // Programmatically 'click' the toggle button to close it
                // This is great because it also resets the icon and overflow!
                menuToggleBtn.click();
            }
        });
    });

}); 
