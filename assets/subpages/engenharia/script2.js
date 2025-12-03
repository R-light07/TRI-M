// Menu Mobile
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
    mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuBtn.querySelector('i').classList.add('fa-bars');
        mobileMenuBtn.querySelector('i').classList.remove('fa-times');
    });
});

// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Atualizar ano no footer
document.getElementById("year").textContent = new Date().getFullYear();

// Elementos DOM
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const lightboxCounter = document.getElementById('lightboxCounter');
const imageInfo = document.getElementById('imageInfo');

// Coletar todas as imagens da galeria
const galleryItems = document.querySelectorAll('.gallery-item');

// Variáveis de estado
let currentImageIndex = 0;

// Inicializar a galeria
function initGallery() {
    // Adicionar evento de clique para cada item da galeria
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });
}

// Abrir lightbox com a imagem selecionada
function openLightbox(index) {
    currentImageIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Impede rolagem do corpo
}

// Fechar lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restaura rolagem do corpo
}

// Navegar para a imagem anterior
function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
    updateLightbox();
}

// Navegar para a próxima imagem
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
    updateLightbox();
}

// Atualizar lightbox com a imagem atual
function updateLightbox() {
    const currentItem = galleryItems[currentImageIndex];
    const currentImage = currentItem.querySelector('img');
    
    lightboxImage.src = currentImage.src;
    lightboxImage.alt = currentImage.alt;
    lightboxCounter.textContent = `${currentImageIndex + 1} de ${galleryItems.length}`;
    imageInfo.textContent = currentImage.alt;
    
    // Atualizar estado dos botões de navegação
    prevButton.disabled = currentImageIndex === 0;
    nextButton.disabled = currentImageIndex === galleryItems.length - 1;
}

// Event listeners
lightboxClose.addEventListener('click', closeLightbox);
prevButton.addEventListener('click', prevImage);
nextButton.addEventListener('click', nextImage);

// Fechar lightbox ao clicar fora da imagem
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Navegação por teclado
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    switch(e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
            prevImage();
            break;
        case 'ArrowRight':
            nextImage();
            break;
    }
});

// Inicializar a galeria quando a página carregar
window.addEventListener('DOMContentLoaded', initGallery);

document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const formMessage = document.getElementById('formMessage');
    
    // Desabilitar botão e mostrar loading
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';
    formMessage.style.display = 'none';
    
    try {
        // Coletar dados do formulário
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            company: document.getElementById('company').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value
        };
        
        // Enviar para Formspree como JSON
        const response = await fetch('https://formspree.io/f/xkgyqpdr', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            // Sucesso
            formMessage.textContent = '✅ Mensagem enviada com sucesso! Entraremos em contato em breve.';
            formMessage.style.backgroundColor = '#d4edda';
            formMessage.style.color = '#155724';
            formMessage.style.display = 'block';
            
            // Limpar formulário
            document.getElementById('contactForm').reset();
            
            // Rolar para a mensagem de sucesso
            formMessage.scrollIntoView({ behavior: 'smooth' });
        } else {
            throw new Error('Erro no servidor');
        }
        
    } catch (error) {
        console.error('Erro:', error);
        formMessage.textContent = '❌ Erro ao enviar mensagem. Por favor, tente novamente.';
        formMessage.style.backgroundColor = '#f8d7da';
        formMessage.style.color = '#721c24';
        formMessage.style.display = 'block';
        
        // Rolar para a mensagem de erro
        formMessage.scrollIntoView({ behavior: 'smooth' });
    } finally {
        // Restaurar botão
        submitBtn.disabled = false;
        submitBtn.textContent = 'Solicitar Orçamento';
    }
});

// Validação básica em tempo real
const inputs = document.querySelectorAll('#contactForm input, #contactForm textarea, #contactForm select');
inputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.hasAttribute('required') && !this.value.trim()) {
            this.style.borderColor = 'red';
        } else {
            this.style.borderColor = '';
        }
    });
});

// Project Navigation
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            
            // Aqui você pode redirecionar para a página de detalhes do projeto
            // Por enquanto, vamos criar um exemplo básico
            window.location.href = `/assets/subpages/projetos/${projectId}.html`;
            
            // Ou se quiser fazer uma demonstração sem criar páginas reais:
            // showProjectDetails(projectId);
        });
    });
});

// Função de exemplo para mostrar detalhes (opcional)
function showProjectDetails(projectId) {
    // Esta função pode ser usada para mostrar um modal com os detalhes
    // ou redirecionar para páginas específicas
    console.log(`Abrindo detalhes do projeto: ${projectId}`);
    
    // Exemplo de redirecionamento baseado no projeto
    const projectPages = {
        'project1': 'projeto-instalacao-tubagem.html',
        'project2': 'projeto-manutencao-compressores.html',
        'project3': 'projeto-automacao-industrial.html',
        'project4': 'projeto-estrutura-metalica.html',
        'project5': 'projeto-montagem-equipamentos.html',
        'project6': 'projeto-otimizacao-processos.html'
    };
    
    if (projectPages[projectId]) {
        window.location.href = `/assets/subpages/projetos/${projectPages[projectId]}`;
    }
}