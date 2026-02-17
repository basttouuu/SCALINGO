// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    // ===== Profile Image Carousel =====
    const profileImages = [
        '/static/img/profil1.png',
        '/static/img/profil2.png',
        '/static/img/profil3.png',
        '/static/img/profil4.png'
    ];

    let currentProfileIndex = 0;
    const profileImg = document.querySelector('.profile-carousel');

    if (!profileImg) {
        console.error('Profile carousel element not found!');
        return;
    }

    console.log('Profile carousel initialized');

    // Préchargement des images
    const preloadedImages = [];
    profileImages.forEach((src, index) => {
        const img = new Image();
        img.onload = () => console.log(`Image ${index + 1} loaded:`, src);
        img.onerror = () => console.error(`Failed to load image ${index + 1}:`, src);
        img.src = src;
        preloadedImages.push(img);
    });

    function changeProfileImage() {
        currentProfileIndex = (currentProfileIndex + 1) % profileImages.length;
        const newSrc = profileImages[currentProfileIndex];
        
        profileImg.style.opacity = '0';
        
        setTimeout(() => {
            profileImg.src = newSrc;
            profileImg.style.opacity = '1';
            console.log('Changed to:', newSrc);
        }, 500);
    }

    // Démarrer le carousel après 3 secondes
    console.log('Carousel will start in 3 seconds...');
    setInterval(changeProfileImage, 3000);
});

// ===== Menu Toggle =====
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('nav');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('fa-times');
    navbar.classList.toggle('active');
});

// ===== Navigation Active Link =====
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');
const header = document.querySelector('header');

// Throttle scroll event for better performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = window.requestAnimationFrame(() => {
        const current = window.pageYOffset;

        // Ajouter classe au header quand on scroll
        if (current > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (current >= sectionTop && current < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });

        // Fermer le menu mobile au scroll
        navbar.classList.remove('active');
        menuIcon.classList.remove('fa-times');
    });
}, { passive: true });

// Fermer le menu mobile au clic sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
        menuIcon.classList.remove('fa-times');
    });
});

// ===== Theme Toggle (Mode Sombre/Clair) =====
const themeToggle = document.querySelector('#theme-toggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

// Charger le thème sauvegardé
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'light') {
    body.classList.add('light-theme');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    
    if (body.classList.contains('light-theme')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'light');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'dark');
    }
});

// ===== Effet de typing pour le métier =====
const typingText = document.querySelector('.typing-text span');
const jobs = ['Développeur Web', 'Créateur de Contenu', 'Développeur de Jeux', 'Étudiant en Informatique', 'Passionné d\'IA'];
let jobIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentJob = jobs[jobIndex];
    
    if (isDeleting) {
        typingText.textContent = currentJob.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentJob.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentJob.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        jobIndex = (jobIndex + 1) % jobs.length;
        typeSpeed = 500;
    }
    
    setTimeout(typeEffect, typeSpeed);
}

// Démarrer l'animation après un court délai
if (typingText) {
    setTimeout(typeEffect, 1000);
}

// ===== Compteur de Visites =====
let visitCount = localStorage.getItem('visitCount');
if (!visitCount) {
    visitCount = 0;
}
visitCount = parseInt(visitCount) + 1;
localStorage.setItem('visitCount', visitCount);

const visitCountElement = document.querySelector('#visit-count');
if (visitCountElement) {
    visitCountElement.textContent = visitCount;
}

// ===== Animation des barres de compétences =====
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width = entry.target.style.width || entry.target.getAttribute('data-width');
        }
    });
}, observerOptions);

// Observer toutes les barres de compétences
document.querySelectorAll('.bar span').forEach(bar => {
    observer.observe(bar);
});

// ===== Filtrage des Projets =====
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Retirer la classe active de tous les boutons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        projectCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (filterValue === 'all' || cardCategory === filterValue) {
                card.classList.remove('hidden');
                card.style.animation = 'fadeIn 0.6s ease-in-out';
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// ===== Carrousel de Projets =====
let currentIndex = 0;
const projectsPerPage = 4;
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

function updateCarousel() {
    const visibleProjects = Array.from(projectCards).filter(card => 
        !card.classList.contains('hidden')
    );
    
    visibleProjects.forEach((card, index) => {
        if (index >= currentIndex && index < currentIndex + projectsPerPage) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        const visibleProjects = Array.from(projectCards).filter(card => 
            !card.classList.contains('hidden')
        );
        
        if (currentIndex > 0) {
            currentIndex -= projectsPerPage;
            updateCarousel();
        }
    });

    nextBtn.addEventListener('click', () => {
        const visibleProjects = Array.from(projectCards).filter(card => 
            !card.classList.contains('hidden')
        );
        
        if (currentIndex + projectsPerPage < visibleProjects.length) {
            currentIndex += projectsPerPage;
            updateCarousel();
        }
    });
}

// ===== Validation du Formulaire de Contact =====
const contactForm = document.querySelector('#contact-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const phoneInput = document.querySelector('#phone');
const subjectInput = document.querySelector('#subject');
const messageInput = document.querySelector('#message');
const formStatus = document.querySelector('#form-status');

// Fonction de validation en temps réel
function validateInput(input, validationFunction) {
    const errorElement = document.querySelector(`#${input.id}-error`);
    
    input.addEventListener('input', () => {
        const result = validationFunction(input.value);
        
        if (result.isValid) {
            input.classList.remove('error');
            input.classList.add('success');
            errorElement.textContent = '';
        } else {
            input.classList.remove('success');
            input.classList.add('error');
            errorElement.textContent = result.message;
        }
    });
}

// Validations
function validateName(value) {
    if (value.trim().length < 2) {
        return { isValid: false, message: 'Le nom doit contenir au moins 2 caractères' };
    }
    if (!/^[a-zA-ZÀ-ÿ\s-]+$/.test(value)) {
        return { isValid: false, message: 'Le nom ne doit contenir que des lettres' };
    }
    return { isValid: true, message: '' };
}

function validateEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
        return { isValid: false, message: 'Adresse email invalide' };
    }
    return { isValid: true, message: '' };
}

function validatePhone(value) {
    if (value.trim() === '') {
        return { isValid: true, message: '' }; // Optionnel
    }
    const phoneRegex = /^[0-9+\s()-]{10,}$/;
    if (!phoneRegex.test(value)) {
        return { isValid: false, message: 'Numéro de téléphone invalide' };
    }
    return { isValid: true, message: '' };
}

function validateSubject(value) {
    if (value.trim().length < 3) {
        return { isValid: false, message: 'Le sujet doit contenir au moins 3 caractères' };
    }
    return { isValid: true, message: '' };
}

function validateMessage(value) {
    if (value.trim().length < 10) {
        return { isValid: false, message: 'Le message doit contenir au moins 10 caractères' };
    }
    if (value.trim().length > 1000) {
        return { isValid: false, message: 'Le message est trop long (max 1000 caractères)' };
    }
    return { isValid: true, message: '' };
}

// Appliquer la validation en temps réel
if (nameInput) validateInput(nameInput, validateName);
if (emailInput) validateInput(emailInput, validateEmail);
if (phoneInput) validateInput(phoneInput, validatePhone);
if (subjectInput) validateInput(subjectInput, validateSubject);
if (messageInput) validateInput(messageInput, validateMessage);

// Soumission du formulaire
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Valider tous les champs
        const isNameValid = validateName(nameInput.value).isValid;
        const isEmailValid = validateEmail(emailInput.value).isValid;
        const isPhoneValid = validatePhone(phoneInput.value).isValid;
        const isSubjectValid = validateSubject(subjectInput.value).isValid;
        const isMessageValid = validateMessage(messageInput.value).isValid;

        if (isNameValid && isEmailValid && isPhoneValid && isSubjectValid && isMessageValid) {
            // Créer l'objet avec les données du formulaire
            const contactData = {
                nom: nameInput.value,
                email: emailInput.value,
                telephone: phoneInput.value || 'Non renseigné',
                sujet: subjectInput.value,
                message: messageInput.value,
                date: new Date().toLocaleString('fr-FR')
            };

            // Sauvegarder dans localStorage
            let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
            contacts.push(contactData);
            localStorage.setItem('contacts', JSON.stringify(contacts));

            // Télécharger le fichier JSON
            const dataStr = JSON.stringify(contactData, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `contact_${Date.now()}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            formStatus.textContent = '✓ Message envoyé avec succès ! Fichier téléchargé.';
            formStatus.className = 'form-status success';
            
            // Réinitialiser le formulaire
            setTimeout(() => {
                contactForm.reset();
                formStatus.className = 'form-status';
                [nameInput, emailInput, phoneInput, subjectInput, messageInput].forEach(input => {
                    input.classList.remove('success', 'error');
                });
            }, 5000);
        } else {
            formStatus.textContent = '✗ Veuillez corriger les erreurs dans le formulaire.';
            formStatus.className = 'form-status error';
        }
    });
}

// ===== Animations au scroll =====
const fadeElements = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px'
});

fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    fadeObserver.observe(element);
});

// ===== Animation des cartes de services =====
const serviceBoxes = document.querySelectorAll('.service-box');
serviceBoxes.forEach((box, index) => {
    box.style.opacity = '0';
    box.style.transform = 'scale(0.9)';
    box.style.transition = 'all 0.6s ease';
});

const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
            }, index * 150);
        }
    });
}, { threshold: 0.2 });

serviceBoxes.forEach(box => serviceObserver.observe(box));

// ===== Animation des cartes de projets =====
const projectCardsAnimation = document.querySelectorAll('.project-card');
projectCardsAnimation.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
});

const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

projectCardsAnimation.forEach(card => projectObserver.observe(card));

// ===== Animation des comp\u00e9tences =====
const skillBars = document.querySelectorAll('.skill-bar');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target.querySelector('.bar span');
            if (bar && !bar.classList.contains('animated')) {
                bar.classList.add('animated');
                bar.style.animation = 'progressAnimation 2s ease-in-out forwards';
            }
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));

// ===== Animation de la timeline =====
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 200);
        }
    });
}, { threshold: 0.3 });

timelineItems.forEach((item, index) => {
    item.style.opacity = '0';
    if (item.classList.contains('left')) {
        item.style.transform = 'translateX(-50px)';
    } else {
        item.style.transform = 'translateX(50px)';
    }
    item.style.transition = 'all 0.8s ease';
    timelineObserver.observe(item);
});

// ===== Smooth Scroll pour les ancres =====
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

// ===== Effet de parallaxe pour l'image de profil =====
window.addEventListener('scroll', () => {
    const homeImg = document.querySelector('.home-img img');
    if (homeImg) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        homeImg.style.transform = `translateY(${rate}px)`;
    }
});

// ===== Compteur de caractères pour le message =====
const messageTextarea = document.getElementById('message');
const charCounter = document.getElementById('char-counter');

if (messageTextarea && charCounter) {
    messageTextarea.addEventListener('input', () => {
        const length = messageTextarea.value.length;
        charCounter.textContent = length;
        
        // Changer la couleur si proche de la limite
        if (length > 900) {
            charCounter.style.color = '#ef4444';
        } else if (length > 750) {
            charCounter.style.color = '#f59e0b';
        } else {
            charCounter.style.color = 'var(--text-color)';
        }
    });
}

// ===== Initialisation au chargement de la page =====
window.addEventListener('load', () => {
    // Ajouter une classe pour les animations initiales
    document.body.classList.add('loaded');
    
    // Afficher le premier groupe de projets dans le carrousel
    if (typeof updateCarousel === 'function') {
        updateCarousel();
    }
});

// ===== Support du Back/Forward Cache =====
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        // Page restaurée depuis BFCache
        document.body.classList.add('loaded');
    }
});


