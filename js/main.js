// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    if (currentScroll === 0) {
        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
    } else {
        navbar.style.background = 'rgba(26, 26, 26, 0.98)';
    }
    
    lastScroll = currentScroll;
});

// Scroll animations
const scrollElements = document.querySelectorAll('.scroll-animation');

const elementInView = (el, offset = 0) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= 
        (window.innerHeight || document.documentElement.clientHeight) - offset
    );
};

const displayScrollElement = (element) => {
    element.classList.add('active');
};

const hideScrollElement = (element) => {
    element.classList.remove('active');
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 100)) {
            displayScrollElement(el);
        } else {
            hideScrollElement(el);
        }
    });
};

window.addEventListener('scroll', () => {
    handleScrollAnimation();
});

// Initialize scroll animations
handleScrollAnimation();

// Menu item hover effect
const menuItems = document.querySelectorAll('.menu-item');

menuItems.forEach(item => {
    item.addEventListener('mouseover', () => {
        item.style.transform = 'scale(1.05)';
        item.style.transition = 'transform 0.3s ease';
    });

    item.addEventListener('mouseout', () => {
        item.style.transform = 'scale(1)';
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add parallax effect to hero section
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scroll = window.pageYOffset;
    if (hero) {
        hero.style.backgroundPositionY = `${scroll * 0.5}px`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Intersection Observer for menu sections
const menuSections = document.querySelectorAll('.menu-section');

const menuObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

menuSections.forEach(section => {
    menuObserver.observe(section);
});

// Add dynamic price color change on scroll
const prices = document.querySelectorAll('.price');
let hue = 0;

function updatePriceColors() {
    hue = (hue + 1) % 360;
    prices.forEach(price => {
        price.style.color = `hsl(${hue}, 70%, 50%)`;
    });
    requestAnimationFrame(updatePriceColors);
}

// updatePriceColors(); // Uncomment to enable rainbow price effect

// Add touch support for mobile devices
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', e => {
    touchStartY = e.changedTouches[0].screenY;
}, false);

document.addEventListener('touchend', e => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
}, false);

function handleSwipe() {
    const difference = touchStartY - touchEndY;
    if (Math.abs(difference) > 50) {
        if (difference > 0) {
            // Swipe up
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Swipe down
            navbar.style.transform = 'translateY(0)';
        }
    }
}

// Dish category filtering
const categoryButtons = document.querySelectorAll('.category-btn');
const dishCards = document.querySelectorAll('.dish-card');

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const category = button.dataset.category;
        
        dishCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Animate stats when in viewport
const stats = document.querySelectorAll('.stat-item');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelector('.circle').style.strokeDasharray = 
                entry.target.querySelector('.circle').getAttribute('stroke-dasharray');
            entry.target.querySelector('.stat-number').style.opacity = '1';
        }
    });
}, {
    threshold: 0.5
});

stats.forEach(stat => {
    statsObserver.observe(stat);
});

// Add hover effect to dish cards
dishCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 10px 30px rgba(255, 215, 0, 0.2)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'none';
    });
});
