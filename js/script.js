const animatedBall = document.querySelector('.animated-ball');
const progressRing = document.querySelector('.progress-ring');
const animatedPlus = document.querySelector('.animated-plus');
const resilientBox = document.querySelector('.resilient-box');
const popupContainer = document.querySelector('.animated-popup-container');

let animationStep = 0;
let animationComplete = false;

const toggleBtn = document.getElementById('toggle-popup');
const closeBtn = document.getElementById('close-popup');
const popup = document.getElementById('popup');

function closePopup() {
    popup.classList.remove('active');
    document.body.style.overflow = '';
}

toggleBtn.addEventListener('click', function () {
    popup.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeBtn.addEventListener('click', closePopup);

popup.addEventListener('click', function (e) {
    if (e.target === popup) {
        closePopup();
    }
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && popup.classList.contains('active')) {
        closePopup();
    }
});

if (typeof feather !== 'undefined') {
    feather.replace();
}

const accordionItems = document.querySelectorAll('.content');
const mainImage = document.querySelector('.about-img img');

const images = [
    'img/salju.jpg',
    'img/panas.jpg',
    'img/hujan.webp'
];

let activeIndex = 0;

function setAccordionState(index) {
    accordionItems.forEach((item, i) => {
        const paragraph = item.querySelector('p');
        const chevronDown = item.querySelector('[data-feather="chevron-down"]');
        const chevronUp = item.querySelector('[data-feather="chevron-up"]');

        if (i === index) {
            
            paragraph.style.display = 'block';
            paragraph.style.maxHeight = paragraph.scrollHeight + 30 + 'px';
            paragraph.style.opacity = '1';
            paragraph.style.marginTop = '1rem';

            if (chevronDown && chevronUp) {
                chevronDown.classList.add('hidden');
                chevronUp.classList.remove('hidden');
            }

            item.classList.add('active');

            if (mainImage && images[index]) {
                mainImage.src = images[index];
                const altTexts = ['gambar salju', 'gambar panas', 'gambar hujan'];
                mainImage.alt = altTexts[index] || 'gambar';
            }
        } else {
            
            paragraph.style.maxHeight = '0';
            paragraph.style.opacity = '0';
            paragraph.style.marginTop = '0';
            paragraph.style.display = 'none';

            if (chevronDown && chevronUp) {
                chevronDown.classList.remove('hidden');
                chevronUp.classList.add('hidden');
            }

            item.classList.remove('active');
        }
    });

    if (typeof feather !== 'undefined') {
        feather.replace();
    }
}

accordionItems.forEach((item, index) => {
    const paragraph = item.querySelector('p');

    paragraph.style.overflow = 'hidden';
    paragraph.style.transition = 'max-height 0.4s ease, opacity 0.3s ease, margin-top 0.3s ease';

    item.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const chevronUp = item.querySelector('[data-feather="chevron-up"]');
        const isChevronUpVisible = chevronUp && !chevronUp.classList.contains('hidden');

        if (isChevronUpVisible) {
            return;
        }

        if (index !== activeIndex) {
            activeIndex = index;
            setAccordionState(activeIndex);
        }
    });
});

setAccordionState(activeIndex);

if (typeof feather !== 'undefined') {
    feather.replace();
}
