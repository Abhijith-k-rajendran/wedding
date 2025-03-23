// scripts.js

// Hamburger Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Toggle hamburger animation
        if (hamburger.classList.contains('active')) {
            hamburger.querySelectorAll('span')[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            hamburger.querySelectorAll('span')[1].style.opacity = '0';
            hamburger.querySelectorAll('span')[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
        } else {
            hamburger.querySelectorAll('span')[0].style.transform = 'none';
            hamburger.querySelectorAll('span')[1].style.opacity = '1';
            hamburger.querySelectorAll('span')[2].style.transform = 'none';
        }
    });

    // Close mobile menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.querySelectorAll('span')[0].style.transform = 'none';
            hamburger.querySelectorAll('span')[1].style.opacity = '1';
            hamburger.querySelectorAll('span')[2].style.transform = 'none';
        });
    });
});

// Countdown Timer
function updateCountdown() {
    const weddingDate = new Date('April 30, 2025 10:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

    // If the countdown is finished
    if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById('countdown').innerHTML = '<p>The wedding has begun!</p>';
    }
}

// Update countdown every second
const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call to avoid delay

// RSVP Form Handling
const rsvpForm = document.getElementById('rsvp-form');
const rsvpMessage = document.getElementById('rsvp-message');

rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(rsvpForm);
    const name = formData.get('name');
    const guests = formData.get('guests');
    const attendance = formData.get('attendance');
    const requests = formData.get('requests');

    // Simple validation
    if (!name || !guests || !attendance) {
        rsvpMessage.textContent = 'Please fill in all required fields.';
        rsvpMessage.style.color = '#D58E82'; // Error color
        return;
    }

    // Here you would typically send this data to a server
    // For this example, we'll just show a confirmation
    let message = '';
    switch(attendance) {
        case 'yes':
            message = `Thank you, ${name}! We're excited to see you and ${guests} guest(s) at our wedding!`;
            break;
        case 'no':
            message = `Thank you for letting us know, ${name}. We'll miss you!`;
            break;
        case 'maybe':
            message = `Thank you, ${name}! We'll keep you posted as plans finalize.`;
            break;
    }

    if (requests) {
        message += ' We’ve noted your special requests.';
    }

    rsvpMessage.textContent = message;
    rsvpMessage.style.color = '#557B83'; // Success color
    
    // Reset form
    rsvpForm.reset();

    // Clear message after 5 seconds
    setTimeout(() => {
        rsvpMessage.textContent = '';
    }, 5000);
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Add active class to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});
