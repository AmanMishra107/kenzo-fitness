// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu functionality
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuLinks = mobileMenu.querySelectorAll('.nav-link');

    // Store original scroll position
    let scrollPosition = 0;

    // Function to disable body scroll
    function disableBodyScroll() {
        scrollPosition = window.pageYOffset;
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollPosition}px`;
        document.body.style.width = '100%';
    }

    // Function to enable body scroll
    function enableBodyScroll() {
        document.body.style.removeProperty('overflow');
        document.body.style.removeProperty('position');
        document.body.style.removeProperty('top');
        document.body.style.removeProperty('width');
        window.scrollTo(0, scrollPosition);
    }

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');

        // Prevent body scroll when menu is open
        if (mobileMenu.classList.contains('active')) {
            disableBodyScroll();
        } else {
            enableBodyScroll();
        }
    });

    // Close menu when clicking on a link
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            enableBodyScroll();

            // Remove active class from all links
            mobileMenuLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');

            // Also update desktop nav if visible
            const desktopLinks = document.querySelectorAll('.nav-links .nav-link');
            desktopLinks.forEach(l => l.classList.remove('active'));
            const correspondingDesktopLink = document.querySelector(`.nav-links .nav-link[href="${this.getAttribute('href')}"]`);
            if (correspondingDesktopLink) {
                correspondingDesktopLink.classList.add('active');
            }
        });
    });

    // Close menu when clicking outside
    mobileMenu.addEventListener('click', function(e) {
        if (e.target === mobileMenu) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            enableBodyScroll();
        }
    });

    // Handle desktop navigation active states
    const desktopLinks = document.querySelectorAll('.nav-links .nav-link');
    desktopLinks.forEach(link => {
        link.addEventListener('click', function() {
            desktopLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            // Also update mobile nav
            mobileMenuLinks.forEach(l => l.classList.remove('active'));
            const correspondingMobileLink = mobileMenu.querySelector(`.nav-link[href="${this.getAttribute('href')}"]`);
            if (correspondingMobileLink) {
                correspondingMobileLink.classList.add('active');
            }
        });
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            enableBodyScroll();
        }
    });

    // Handle window resize - close mobile menu if window becomes larger
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            enableBodyScroll();
        }
    });

    // Prevent scrolling on touch devices when menu is open
    document.addEventListener('touchmove', function(e) {
        if (mobileMenu.classList.contains('active')) {
            e.preventDefault();
        }
    }, { passive: false });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add floating effect to metric cards
    const metricCards = document.querySelectorAll('.metric-card');

    metricCards.forEach(card => {
        let randomDelay = Math.random() * 2;
        card.style.animation = `float 3s ease-in-out ${randomDelay}s infinite`;
    });

    // Add float animation to CSS
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes float {
        0% {
          transform: translateY(0) rotate(var(--rotate, 0deg));
        }
        50% {
          transform: translateY(-10px) rotate(var(--rotate, 0deg));
        }
        100% {
          transform: translateY(0) rotate(var(--rotate, 0deg));
        }
      }
    `;
    document.head.appendChild(style);

    // Set initial rotation values
    document.querySelector('.hours-card').style.setProperty('--rotate', '-15deg');
    document.querySelector('.poses-card').style.setProperty('--rotate', '15deg');
    document.querySelector('.kcal-card').style.setProperty('--rotate', '-15deg');
    document.querySelector('.sets-card').style.setProperty('--rotate', '15deg');

    // Add parallax effect to hero section
    window.addEventListener('mousemove', function(e) {
        const hero = document.querySelector('.hero');
        const metrics = document.querySelectorAll('.metric-card');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        metrics.forEach(metric => {
            const offsetX = (mouseX - 0.5) * 20;
            const offsetY = (mouseY - 0.5) * 20;
            metric.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(var(--rotate, 0deg))`;
        });
    });

    // Add sticky header on scroll
    const header = document.querySelector('header');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
            header.style.position = 'fixed';
        } else if (window.innerWidth > 768) {
            header.style.background = 'transparent';
            header.style.position = 'absolute';
        }
    });
});
//slide automation
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider-track');
    let isDragging = false;
    let startPosition = 0;
    let currentTranslate = 0;
    let previousTranslate = 0;
    let animationID = 0;

    // Touch events
    slider.addEventListener('touchstart', touchStart);
    slider.addEventListener('touchmove', touchMove);
    slider.addEventListener('touchend', touchEnd);

    // Mouse events
    slider.addEventListener('mousedown', touchStart);
    slider.addEventListener('mousemove', touchMove);
    slider.addEventListener('mouseup', touchEnd);
    slider.addEventListener('mouseleave', touchEnd);

    function touchStart(event) {
        isDragging = true;
        slider.style.cursor = 'grabbing';
        slider.style.animationPlayState = 'paused';

        startPosition = getPositionX(event);
        animationID = requestAnimationFrame(animation);
    }

    function touchMove(event) {
        if (!isDragging) return;
        event.preventDefault();

        const currentPosition = getPositionX(event);
        currentTranslate = previousTranslate + currentPosition - startPosition;
    }

    function touchEnd() {
        isDragging = false;
        cancelAnimationFrame(animationID);
        slider.style.cursor = 'grab';

        previousTranslate = currentTranslate;
        slider.style.animationPlayState = 'running';
    }

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    function animation() {
        setSliderPosition();
        if (isDragging) requestAnimationFrame(animation);
    }

    function setSliderPosition() {
        slider.style.transform = `translateX(${currentTranslate}px)`;
    }

    // Prevent context menu on right click
    slider.addEventListener('contextmenu', e => e.preventDefault());
});
// Card flip functionality
document.addEventListener('DOMContentLoaded', function() {
    const flipButtons = document.querySelectorAll('.flip-btn');

    flipButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.service-card');
            card.classList.toggle('flipped');
        });
    });
});
//testimonial slider
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentIndex = 0;
    const totalItems = testimonialItems.length;

    // Initialize
    function initTestimonials() {
        // Show the first testimonial
        testimonialItems[0].classList.add('active');
        thumbnails[0].classList.add('active');

        // Add click event listeners to navigation buttons
        prevBtn.addEventListener('click', showPreviousTestimonial);
        nextBtn.addEventListener('click', showNextTestimonial);

        // Add click event listeners to thumbnails
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                goToTestimonial(index);
            });
        });
    }

    // Show previous testimonial
    function showPreviousTestimonial() {
        // Add 'prev' class to current testimonial for exit animation
        testimonialItems[currentIndex].classList.add('prev');

        // Remove active classes
        testimonialItems[currentIndex].classList.remove('active');
        thumbnails[currentIndex].classList.remove('active');

        // Update index
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;

        // Show new testimonial with animation
        setTimeout(() => {
            // Remove prev class from all items
            testimonialItems.forEach(item => item.classList.remove('prev'));

            // Add active class to new current testimonial
            testimonialItems[currentIndex].classList.add('active');
            thumbnails[currentIndex].classList.add('active');
        }, 50);
    }

    // Show next testimonial
    function showNextTestimonial() {
        // Remove active classes
        testimonialItems[currentIndex].classList.remove('active');
        thumbnails[currentIndex].classList.remove('active');

        // Update index
        currentIndex = (currentIndex + 1) % totalItems;

        // Show new testimonial with animation
        setTimeout(() => {
            testimonialItems[currentIndex].classList.add('active');
            thumbnails[currentIndex].classList.add('active');
        }, 50);
    }

    // Go to specific testimonial
    function goToTestimonial(index) {
        if (index === currentIndex) return;

        // Determine direction for animation
        const isNext = index > currentIndex;

        // Remove active classes
        testimonialItems[currentIndex].classList.remove('active');
        if (!isNext) {
            testimonialItems[currentIndex].classList.add('prev');
        }
        thumbnails[currentIndex].classList.remove('active');

        // Update index
        currentIndex = index;

        // Show new testimonial with animation
        setTimeout(() => {
            // Remove prev class from all items
            testimonialItems.forEach(item => item.classList.remove('prev'));

            // Add active class to new current testimonial
            testimonialItems[currentIndex].classList.add('active');
            thumbnails[currentIndex].classList.add('active');
        }, 50);
    }

    // Auto advance slides every 6 seconds
    function startAutoSlide() {
        return setInterval(showNextTestimonial, 6000);
    }

    // Initialize the testimonials
    initTestimonials();

    // Start auto sliding
    let autoSlideInterval = startAutoSlide();

    // Reset interval when user interacts
    const resetInterval = () => {
        clearInterval(autoSlideInterval);
        autoSlideInterval = startAutoSlide();
    };

    // Reset interval on user interaction
    prevBtn.addEventListener('click', resetInterval);
    nextBtn.addEventListener('click', resetInterval);
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', resetInterval);
    });

    // Add animation when testimonial enters viewport
    const testimonialSection = document.querySelector('.testimonials-section');

    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    function handleScroll() {
        if (isInViewport(testimonialSection)) {
            testimonialSection.classList.add('animate');
            window.removeEventListener('scroll', handleScroll);
        }
    }

    window.addEventListener('scroll', handleScroll);

    // Check on initial load too
    handleScroll();
});
// Contact Form Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get the modal
    const modal = document.getElementById('contactModal');

    // Get all buttons that open the modal
    const contactButtons = document.querySelectorAll('.btn-contact');

    // Get the <span> element that closes the modal
    const closeBtn = document.querySelector('.close-modal');

    // When the user clicks on the button, open the modal
    contactButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = "block";
            document.body.style.overflow = "hidden"; // Prevent scrolling behind modal
        });
    });

    // When the user clicks on <span> (x), close the modal
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = "none";
            document.body.style.overflow = "auto"; // Re-enable scrolling
        });
    }

    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto"; // Re-enable scrolling
        }
    });

    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent the default form submission

            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            if (submitBtn) {
                submitBtn.innerHTML = "Sending...";
                submitBtn.disabled = true;
            }

            // Get form data
            const formData = new FormData(contactForm);

            // Submit form using fetch API
            fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Network response was not ok.');
                })
                .then(data => {
                    // Success - show success message
                    contactForm.innerHTML = '<div class="success-message"><h3>Thank you!</h3><p>Your message has been sent successfully. We\'ll get back to you soon.</p></div>';

                    // Close the modal after 3 seconds
                    setTimeout(() => {
                        modal.style.display = "none";
                        document.body.style.overflow = "auto"; // Re-enable scrolling

                        // Reset the form (for next time the modal is opened)
                        contactForm.reset();
                        contactForm.innerHTML = contactForm.innerHTML;
                        if (submitBtn) {
                            submitBtn.innerHTML = "Send Message";
                            submitBtn.disabled = false;
                        }
                    }, 3000);
                })
                .catch(error => {
                    // Error - show error message
                    if (submitBtn) {
                        submitBtn.innerHTML = "Send Message";
                        submitBtn.disabled = false;
                    }
                    alert('There was a problem sending your message. Please try again later.');
                    console.error('Error:', error);
                });
        });
    }
});
// Newsletter Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    const newsletterSuccess = document.querySelector('.newsletter-success');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Show loading state
            const submitBtn = newsletterForm.querySelector('.newsletter-btn');
            if (submitBtn) {
                submitBtn.innerHTML = "Sending...";
                submitBtn.disabled = true;
            }

            // Get form data
            const formData = new FormData(newsletterForm);

            // Submit form using fetch API
            fetch(newsletterForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Network response was not ok.');
                })
                .then(data => {
                    // Success - show success message
                    newsletterForm.style.display = 'none';
                    if (newsletterSuccess) {
                        newsletterSuccess.style.display = 'block';
                    }

                    // Reset form for future use
                    newsletterForm.reset();
                    if (submitBtn) {
                        submitBtn.innerHTML = "Join Now";
                        submitBtn.disabled = false;
                    }
                })
                .catch(error => {
                    // Error - show error message
                    if (submitBtn) {
                        submitBtn.innerHTML = "Join Now";
                        submitBtn.disabled = false;
                    }
                    alert('There was a problem submitting your email. Please try again later.');
                    console.error('Error:', error);
                });
        });
    }
});

// Read More functionality for experience cards
document.addEventListener('DOMContentLoaded', function() {
    const readMoreButtons = document.querySelectorAll('.read-more');

    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const expandedContent = this.parentElement.querySelector('.expanded-content');
            expandedContent.classList.add('active');
        });
    });

    // Close button functionality
    const closeButtons = document.querySelectorAll('.close-details');

    closeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event bubbling
            const expandedContent = this.parentElement;
            expandedContent.classList.remove('active');
        });
    });
});