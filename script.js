//__________________________________________________________________________________MOVE IMG LOGO

document.addEventListener('DOMContentLoaded', function(){
var imgLogo = document.getElementById('logo')
const tempo = 1000
logoAtual = 0

function trocaImg(){

// Esperar 3 segundos
setTimeout(() => {
    imgLogo.setAttribute('src','/elementos/imgs/logo-geo-web.svg')
    console.log("Hello, world!");
    setTimeout(() => {
        imgLogo.setAttribute('src','/elementos/imgs/logo-pixo-web.svg')
        console.log("Hello, world!");
        setTimeout(()=>{
            imgLogo.setAttribute('src','/elementos/imgs/logo-real-web.svg')
        }, 4500)
    }, tempo);
}, tempo);

}

trocaImg();
});



//__________________________________________________________________________________Carrousel
document.addEventListener('DOMContentLoaded', function () {
const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;
let currentIndex = 0;
const delay = 8100; // 9 segundos
let timeoutId;

function moveCarousel() {
    const offset = -currentIndex * 100;
    carousel.style.transform = `translateX(${offset}vw)`;
    timeoutId = setTimeout(() => {
    currentIndex = (currentIndex + 1) % totalItems;
    moveCarousel();
    }, delay);
}

function nextItem() {
    clearTimeout(timeoutId);
    currentIndex = (currentIndex + 1) % totalItems;
    moveCarousel();
}

function prevItem() {
    clearTimeout(timeoutId);
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    moveCarousel();
}

function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
}

function handleTouchMove(event) {
    if (!touchStartX) {
    return;
    }
    touchEndX = event.touches[0].clientX;
}

function handleTouchEnd() {
    if (!touchStartX || !touchEndX) {
    return;
    }
    const diffX = touchStartX - touchEndX;
    if (diffX > 50) {
    nextItem(); // Swipe left
    } else if (diffX < -50) {
    prevItem(); // Swipe right
    }
    touchStartX = null;
    touchEndX = null;
}

// Event listeners para cliques
document.addEventListener('click', (event) => {
    const rect = document.body.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    if (clickX < rect.width / 2) {
    prevItem();
    } else {
    nextItem();
    }
});

// Event listeners para gestos de toque
let touchStartX = null;
let touchEndX = null;

carousel.addEventListener('touchstart', handleTouchStart, false);
carousel.addEventListener('touchmove', handleTouchMove, false);
carousel.addEventListener('touchend', handleTouchEnd, false);

// Inicia o carrossel
moveCarousel();
});


