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
document.addEventListener('DOMContentLoaded', function() {
    const carouselContainers = document.querySelectorAll('.carousel-container');

    carouselContainers.forEach(function(container) {
        initCarousel(container);
    });

    function initCarousel(container) {
        const carousel = container.querySelector('.carousel');
        const items = container.querySelectorAll('.carousel-item');
        const totalItems = items.length;
        
        if (totalItems === 0) return;

        let currentIndex = 0;
        const delay = 5000; // 5 segundos
        let timeoutId;
        let touchStartX = null;
        let touchEndX = null;

        // Adicionar controles de navegação se não existirem
        if (!container.querySelector('.carousel-controls')) {
            const controlsDiv = document.createElement('div');
            controlsDiv.className = 'carousel-controls';
            
            const prevBtn = document.createElement('button');
            prevBtn.className = 'carousel-prev';
            prevBtn.innerHTML = '&#10094;';
            prevBtn.addEventListener('click', prevItem);
            
            const nextBtn = document.createElement('button');
            nextBtn.className = 'carousel-next';
            nextBtn.innerHTML = '&#10095;';
            nextBtn.addEventListener('click', nextItem);
            
            controlsDiv.appendChild(prevBtn);
            controlsDiv.appendChild(nextBtn);
            container.appendChild(controlsDiv);
        } else {
            // Adicionar event listeners aos botões existentes
            const prevBtn = container.querySelector('.carousel-prev');
            const nextBtn = container.querySelector('.carousel-next');
            
            if (prevBtn) prevBtn.addEventListener('click', prevItem);
            if (nextBtn) nextBtn.addEventListener('click', nextItem);
        }

        // Adicionar indicadores
        const indicatorsDiv = container.querySelector('.carousel-indicators') || document.createElement('div');
        if (!container.querySelector('.carousel-indicators')) {
            indicatorsDiv.className = 'carousel-indicators';
            container.appendChild(indicatorsDiv);
        }
        
        // Limpar indicadores existentes
        indicatorsDiv.innerHTML = '';
        
        // Adicionar indicadores para cada item
        for (let i = 0; i < totalItems; i++) {
            const indicator = document.createElement('div');
            indicator.className = 'indicator' + (i === 0 ? ' active' : '');
            indicator.dataset.index = i;
            indicator.addEventListener('click', function() {
                goToItem(parseInt(this.dataset.index));
            });
            indicatorsDiv.appendChild(indicator);
        }

        function moveCarousel() {
            updateIndicators();
            carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        function updateIndicators() {
            const indicators = container.querySelectorAll('.indicator');
            indicators.forEach((indicator, index) => {
                if (index === currentIndex) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        }

        function nextItem(e) {
            if (e) e.preventDefault();
            clearTimeout(timeoutId);
            currentIndex = (currentIndex + 1) % totalItems;
            moveCarousel();
            startAutoPlay();
        }

        function prevItem(e) {
            if (e) e.preventDefault();
            clearTimeout(timeoutId);
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
            moveCarousel();
            startAutoPlay();
        }

        function goToItem(index) {
            clearTimeout(timeoutId);
            currentIndex = index;
            moveCarousel();
            startAutoPlay();
        }

        function startAutoPlay() {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                nextItem();
            }, delay);
        }

        function handleTouchStart(event) {
            touchStartX = event.touches[0].clientX;
        }

        function handleTouchMove(event) {
            if (!touchStartX) return;
            touchEndX = event.touches[0].clientX;
        }

        function handleTouchEnd() {
            if (!touchStartX || !touchEndX) return;
            
            const diffX = touchStartX - touchEndX;
            if (diffX > 50) {
                nextItem(); // Swipe left
            } else if (diffX < -50) {
                prevItem(); // Swipe right
            }
            
            touchStartX = null;
            touchEndX = null;
        }

        // Event listeners para gestos de toque
        carousel.addEventListener('touchstart', handleTouchStart, false);
        carousel.addEventListener('touchmove', handleTouchMove, false);
        carousel.addEventListener('touchend', handleTouchEnd, false);

        // Event listeners para teclas de navegação
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                prevItem(e);
            } else if (e.key === 'ArrowRight') {
                nextItem(e);
            }
        });

        // Iniciar o carrossel
        moveCarousel();
        startAutoPlay();
    }
});

// Manipulação de detalhes
document.addEventListener('DOMContentLoaded', function() {
    const detailsElements = document.querySelectorAll('details');
    
    detailsElements.forEach(function(details) {
        // Adicionar classe para animação ao abrir/fechar
        details.addEventListener('toggle', function() {
            if (details.open) {
                details.classList.add('open');
            } else {
                details.classList.remove('open');
            }
        });
    });
});


