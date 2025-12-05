document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const modal = document.getElementById('carouselModal');
    const closeModal = document.querySelector('.close-modal');
    const carouselContainer = document.querySelector('.carousel-container');
    const dotsContainer = document.querySelector('.carousel-dots');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const currentIndexSpan = document.querySelector('.current-index');
    const totalCountSpan = document.querySelector('.total-count');
    
    let currentIndex = 0;
    const totalImages = galleryItems.length;
    let slides = [];
    let dots = [];
    
    // Atualizar contador total
    totalCountSpan.textContent = totalImages;
    
    // Criar slides e dots
    function initializeCarousel() {
        // Limpar containers
        carouselContainer.innerHTML = '';
        dotsContainer.innerHTML = '';
        slides = [];
        dots = [];
        
        // Criar slides e dots
        galleryItems.forEach((img, index) => {
            // Criar slide
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            
            const slideImg = document.createElement('img');
            slideImg.src = img.src;
            slideImg.alt = img.alt;
            
            slide.appendChild(slideImg);
            carouselContainer.appendChild(slide);
            slides.push(slide);
            
            // Criar dot
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.dataset.index = index;
            if (index === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
            
            dotsContainer.appendChild(dot);
            dots.push(dot);
        });
        
        // Atualizar visualização inicial
        updateCarousel();
    }
    
    // Ir para slide específico
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }
    
    // Atualizar carrossel
    function updateCarousel() {
        // Esconder todos os slides
        slides.forEach(slide => {
            slide.style.display = 'none';
        });
        
        // Mostrar slide atual
        slides[currentIndex].style.display = 'flex';
        
        // Atualizar dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        // Atualizar contador
        currentIndexSpan.textContent = currentIndex + 1;
    }
    
    // Navegação anterior
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        updateCarousel();
    }
    
    // Navegação próxima
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalImages;
        updateCarousel();
    }
    
    // Abrir modal e ir para imagem clicada
    galleryItems.forEach((img, index) => {
        img.addEventListener('click', () => {
            currentIndex = index;
            initializeCarousel();
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Fechar modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Fechar modal clicando fora da imagem
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Navegação com botões
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Navegação com teclado
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'flex') {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'Escape') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    });
    
    // Inicializar carrossel (pré-carregar)
    initializeCarousel();
});