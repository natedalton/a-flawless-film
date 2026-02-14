// ============================================
// A FLAWLESS FILM, LLC - Main JavaScript
// ============================================

(function() {
    'use strict';

    // ============================================
    // HERO SLIDESHOW
    // ============================================
    function initHeroSlideshow() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        // Extract poster URLs from films
        const slideshowImages = films.filter(f => f.poster).map(f => f.poster);

        if (slideshowImages.length === 0) return;

        // Create slideshow container
        const slideshow = document.createElement('div');
        slideshow.className = 'hero-slideshow';

        // Create slides using DOM methods
        slideshowImages.forEach(url => {
            const slide = document.createElement('div');
            slide.className = 'slide';
            slide.style.backgroundImage = `url('${url}')`;
            slideshow.appendChild(slide);
        });

        // Insert slideshow at beginning of hero
        hero.insertBefore(slideshow, hero.firstChild);

        // Start slideshow
        let currentSlide = 0;
        const slides = slideshow.querySelectorAll('.slide');

        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }

        // Show first slide
        slides[0]?.classList.add('active');

        // Change slide every 8 seconds
        setInterval(nextSlide, 8000);
    }

    // ============================================
    // EXTRACT YOUTUBE VIDEO ID
    // ============================================
    function getYouTubeId(url) {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }

    // ============================================
    // GET YOUTUBE THUMBNAIL URL
    // ============================================
    function getYouTubeThumbnail(videoId) {
        return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }

    // ============================================
    // RENDER FILMS
    // ============================================
    function renderFilms() {
        const filmsGrid = document.getElementById('films-grid');

        if (!filmsGrid) return;

        // Clear existing content
        filmsGrid.innerHTML = '';

        films.forEach(film => {
            const trailerId = film.trailer ? getYouTubeId(film.trailer) : null;
            const trailerThumbnail = trailerId ? getYouTubeThumbnail(trailerId) : null;

            // Create film card
            const article = document.createElement('article');
            article.className = 'film-card';

            // Poster container
            const posterDiv = document.createElement('div');
            posterDiv.className = 'film-poster';

            const img = document.createElement('img');
            img.src = film.poster;
            img.alt = `${film.title} poster`;
            img.loading = 'lazy';
            posterDiv.appendChild(img);

            // Info container
            const infoDiv = document.createElement('div');
            infoDiv.className = 'film-info';

            // Year badge
            const yearSpan = document.createElement('span');
            yearSpan.className = 'film-year';
            yearSpan.textContent = film.year;
            infoDiv.appendChild(yearSpan);

            // Title
            const title = document.createElement('h3');
            title.className = 'film-title';
            title.textContent = film.title;
            infoDiv.appendChild(title);

            // Trailer thumbnail
            if (trailerThumbnail) {
                const thumbnailDiv = document.createElement('div');
                thumbnailDiv.className = 'film-thumbnail';

                const thumbImg = document.createElement('img');
                thumbImg.src = trailerThumbnail;
                thumbImg.alt = `${film.title} trailer thumbnail`;
                thumbImg.loading = 'lazy';
                thumbnailDiv.appendChild(thumbImg);

                const overlay = document.createElement('div');
                overlay.className = 'thumbnail-overlay';
                overlay.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
                thumbnailDiv.appendChild(overlay);

                thumbnailDiv.addEventListener('click', () => window.open(film.trailer, '_blank'));

                infoDiv.appendChild(thumbnailDiv);
            }

            // Description
            const desc = document.createElement('p');
            desc.className = 'film-description';
            desc.textContent = film.description;
            infoDiv.appendChild(desc);

            // Streaming links
            if (film.streaming && film.streaming.length > 0) {
                const linksDiv = document.createElement('div');
                linksDiv.className = 'film-links';

                film.streaming.forEach(link => {
                    const a = document.createElement('a');
                    a.href = link.url;
                    a.target = '_blank';
                    a.rel = 'noopener';
                    a.className = 'film-link streaming-link';
                    if (link.name.includes('Tubi')) {
                        a.classList.add('tubi-link');
                    }
                    a.innerHTML = `<span>📺</span> ${link.name}`;
                    linksDiv.appendChild(a);
                });

                infoDiv.appendChild(linksDiv);
            }

            // IMDb link
            const imdbDiv = document.createElement('div');
            imdbDiv.className = 'film-imdb';

            const imdbLink = document.createElement('a');
            imdbLink.href = film.imdb;
            imdbLink.target = '_blank';
            imdbLink.rel = 'noopener';
            imdbLink.className = 'imdb-link';
            imdbLink.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM8.5 15H6.75V9h1.75v6zm4.25 0h-1.75V9h1.75v6zm4.25 0h-1.75V9h1.75v6z"/></svg> View on IMDb';

            imdbDiv.appendChild(imdbLink);
            infoDiv.appendChild(imdbDiv);

            article.appendChild(posterDiv);
            article.appendChild(infoDiv);
            filmsGrid.appendChild(article);
        });
    }

    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    function setupMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        if (!menuToggle || !navLinks) return;

        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.nav-container')) {
                menuToggle.classList.remove('active');
                        navLinks.classList.remove('active');
                    }
                });
    }

    // ============================================
    // SMOOTH SCROLL FOR NAVIGATION
    // ============================================
    function setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const navHeight = document.querySelector('.nav').offsetHeight;
                    const targetPosition = target.offsetTop - navHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ============================================
    // CONTACT FORM HANDLER
    // ============================================
    function setupContactForm() {
        const contactForm = document.getElementById('contact-form');

        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();

                // Get form data
                const formData = new FormData(this);
                const data = Object.fromEntries(formData);

                // Validate form
                if (!data.name || !data.email || !data.message) {
                    alert('Please fill in all required fields.');
                    return;
                }

                // Email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(data.email)) {
                    alert('Please enter a valid email address.');
                    return;
                }

                // In production, you would send this data to a server
                // For now, we'll show a success message
                alert('Thank you for your message! We\'ll get back to you soon.');

                // Reset form
                contactForm.reset();

                // Log the data (for testing)
                console.log('Form submitted:', data);
            });
        }
    }

    // ============================================
    // SCROLL ANIMATIONS
    // ============================================
    function setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe service cards
        document.querySelectorAll('.service-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        // Observe film cards (after they're rendered)
        setTimeout(() => {
            document.querySelectorAll('.film-card').forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            });
        }, 100);
    }

    // ============================================
    // INITIALIZE
    // ============================================
    document.addEventListener('DOMContentLoaded', () => {
        initHeroSlideshow();
        initBTSSlideshow();
        renderFilms();
        setupMobileMenu();
        setupSmoothScroll();
        setupContactForm();
        setupScrollAnimations();
    });

    // ============================================
    // BTS SLIDESHOW FOR SERVICES SECTION
    // ============================================
    function initBTSSlideshow() {
        const services = document.querySelector('.services');
        if (!services) return;

        // BTS images from Shady Grove
        const btsImages = [
            'assets/bts-1.jpg',
            'assets/bts-2.jpg',
            'assets/bts-3.jpg',
            'assets/bts-4.jpg'
        ];

        // Create slideshow container
        const slideshow = document.createElement('div');
        slideshow.className = 'bts-slideshow';
        slideshow.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            overflow: hidden;
            z-index: 0;
        `;

        // Create slides
        btsImages.forEach((imgUrl, index) => {
            const slide = document.createElement('div');
            slide.className = 'bts-slide';
            slide.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-image: url('${imgUrl}');
                background-size: cover;
                background-position: center;
                opacity: 0;
                transition: opacity 2s ease-in-out;
            `;
            slideshow.appendChild(slide);
        });

        // Insert slideshow at beginning of services section
        services.insertBefore(slideshow, services.firstChild);

        // Start slideshow
        let currentSlide = 0;
        const slides = slideshow.querySelectorAll('.bts-slide');

        function nextSlide() {
            slides[currentSlide].style.opacity = '0';
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].style.opacity = '1';
        }

        // Show first slide
        slides[0].style.opacity = '1';

        // Change slide every 5 seconds
        setInterval(nextSlide, 5000);
    }

})();
