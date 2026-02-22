// 1. Hamburger menü logika
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    if(navLinks.classList.contains('active')){
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.querySelector('i').classList.replace('fa-times', 'fa-bars');
    });
});

// 2. Sötét / Világos téma váltó logika
const themeBtn = document.getElementById('theme-btn');
const htmlElement = document.documentElement;
const themeIcon = themeBtn.querySelector('i');

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

themeBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.replace('fa-regular', 'fa-solid');
    } else {
        themeIcon.classList.replace('fa-solid', 'fa-regular');
    }
}

// 3. Kapcsolat Modal Logika (Árajánlatkérés gombhoz)
const ctaTrigger = document.getElementById('cta-trigger');
const contactModal = document.getElementById('contact-modal');
const closeContact = document.getElementById('close-contact');

ctaTrigger.addEventListener('click', (e) => {
    e.preventDefault(); // Ne ugorjon el a link miatt
    contactModal.classList.add('show');
});

closeContact.addEventListener('click', () => {
    contactModal.classList.remove('show');
});

// 4. Galéria Modal Logika
const galleryTriggers = document.querySelectorAll('.gallery-trigger');
const galleryModal = document.getElementById('gallery-modal');
const closeGallery = document.getElementById('close-gallery');
const galleryImage = document.getElementById('gallery-image');
const prevBtn = document.getElementById('prev-img');
const nextBtn = document.getElementById('next-img');

// Képek útvonala a galeria mappából
const images = [
    'galeria/g1.png',
    'galeria/g2.png',
    'galeria/g3.png',
    'galeria/g4.png',
    'galeria/g5.png'
];
let currentImageIndex = 0;

// Galéria megnyitása bármelyik portfólió elemre kattintva
galleryTriggers.forEach(item => {
    item.addEventListener('click', () => {
        currentImageIndex = 0; // Mindig az első képpel induljon
        updateGalleryImage();
        galleryModal.classList.add('show');
    });
});

closeGallery.addEventListener('click', () => {
    galleryModal.classList.remove('show');
});

function updateGalleryImage() {
    galleryImage.src = images[currentImageIndex];
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateGalleryImage();
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateGalleryImage();
}

nextBtn.addEventListener('click', nextImage);
prevBtn.addEventListener('click', prevImage);

// 5. Kattintás a modálon kívül mindkettő bezárásához
window.addEventListener('click', (e) => {
    if (e.target === contactModal) {
        contactModal.classList.remove('show');
    }
    if (e.target === galleryModal) {
        galleryModal.classList.remove('show');
    }
});

// 6. Érintés (Swipe) érzékelés mobil galériához
let touchStartX = 0;
let touchEndX = 0;

galleryImage.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

galleryImage.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    // Ha az ujjunkkal balra húztunk (minimum 50px-t) -> Következő kép
    if (touchStartX - touchEndX > 50) {
        nextImage();
    }
    // Ha az ujjunkkal jobbra húztunk -> Előző kép
    if (touchEndX - touchStartX > 50) {
        prevImage();
    }
}