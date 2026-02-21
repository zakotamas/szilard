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

// Téma ellenőrzése (van e mentve)
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

// Témaváltó
function updateThemeIcon(theme) {
    if (theme === 'dark') {
        // Világító körte
        themeIcon.classList.replace('fa-regular', 'fa-solid');
    } else {
        // Kikapcsolt körte
        themeIcon.classList.replace('fa-solid', 'fa-regular');
    }
}