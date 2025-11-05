// ===== CONFIGURAÇÃO DO EMAILJS =====
// 🔑 COLE SUA PUBLIC KEY DO EMAILJS AQUI:
const EMAILJS_PUBLIC_KEY = "user_JRczV3-hcr2WhVwC1";
// 🔧 COLE SEU SERVICE ID DO EMAILJS AQUI:
const EMAILJS_SERVICE_ID = "service_l3a75j9";
// 📧 COLE SEU TEMPLATE ID DO EMAILJS AQUI:
const EMAILJS_TEMPLATE_ID = "template_rl3aygr";

// ===== TOGGLE DO MODO CLARO/ESCURO =====
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

document.addEventListener('DOMContentLoaded', () => {
    // Verificar tema salvo
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    // Inicializar EmailJS
    emailjs.init(EMAILJS_PUBLIC_KEY);
    
    // Verificar se as keys foram configuradas
    checkEmailJSConfig();
});

function checkEmailJSConfig() {
    if (EMAILJS_PUBLIC_KEY.includes("SUA_PUBLIC_KEY") || 
        EMAILJS_SERVICE_ID.includes("SEU_SERVICE_ID") || 
        EMAILJS_TEMPLATE_ID.includes("SEU_TEMPLATE_ID")) {
        console.warn("⚠️ Configure suas keys do EmailJS no script.js");
    } else {
        console.log("✅ EmailJS configurado corretamente");
    }
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// ===== MENU MOBILE =====
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ===== ANIMAÇÃO DE SCROLL =====
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(element => {
    observer.observe(element);
});

// ===== FORMULÁRIO FUNCIONAL =====
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validação básica
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!name || !email || !message) {
        showMessage('Por favor, preencha todos os campos.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showMessage('Por favor, insira um e-mail válido.', 'error');
        return;
    }
    
    // Verificar se as keys estão configuradas
    if (EMAILJS_PUBLIC_KEY.includes("SUA_PUBLIC_KEY") || 
        EMAILJS_SERVICE_ID.includes("SEU_SERVICE_ID") || 
        EMAILJS_TEMPLATE_ID.includes("SEU_TEMPLATE_ID")) {
        showMessage('❌ Sistema em configuração. Por favor, nos chame diretamente pelo Instagram.', 'error');
        return;
    }
    
    // Mostrar loading
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    // Dados para enviar
    const templateParams = {
        from_name: name,
        from_email: email,
        message: message,
        to_name: "WebCrafters",
        date: new Date().toLocaleString('pt-BR')
    };
    
    // Enviar email usando EmailJS
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
    .then((response) => {
        console.log('✅ Email enviado com sucesso:', response);
        showMessage('🎉 Mensagem enviada com sucesso! Entraremos em contato em até 24 horas.', 'success');
        contactForm.reset();
    })
    .catch((error) => {
        console.error('❌ Erro ao enviar email:', error);
        showMessage('😕 Erro ao enviar mensagem. Tente novamente ou nos chame no Instagram.', 'error');
    })
    .finally(() => {
        // Restaurar botão
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
});

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = 'form-message ' + type;
    formMessage.style.display = 'block';
    
    // Rolagem suave para a mensagem
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Auto-esconder após 5 segundos (apenas para sucesso)
    if (type === 'success') {
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

// ===== SCROLL SUAVE =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Fechar menu mobile se aberto
            navLinks.classList.remove('active');
        }
    });
});

// ===== HEADER SCROLL EFFECT =====
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 5px 20px var(--shadow)';
    } else {
        header.style.boxShadow = '0 2px 10px var(--shadow)';
    }
});

// ===== ANIMAÇÃO DE DIGITAÇÃO NO TITULO =====
const typedText = document.querySelector('.home-content h1');
if (typedText) {
    const originalText = typedText.textContent;
    typedText.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < originalText.length) {
            typedText.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Iniciar animação quando a seção home estiver visível
    const homeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeWriter();
                homeObserver.unobserve(entry.target);
            }
        });
    });
    
    homeObserver.observe(document.querySelector('.home-content'));
}



