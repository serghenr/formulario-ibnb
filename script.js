// Form submission handler
document.getElementById('formulario').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Clear previous errors
    clearErrors();
    
    // Get form values
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const tema = document.querySelector('input[name="tema"]:checked')?.value;
    const sugestao = document.getElementById('sugestao').value.trim();
    
    // Validate
    let isValid = true;
    
    // Validate name
    if (!nome) {
        showError('nomeError', 'Por favor, insira seu nome e sobrenome');
        document.getElementById('nome').classList.add('error');
        isValid = false;
    } else if (nome.split(' ').length < 2) {
        showError('nomeError', 'Por favor, insira nome e sobrenome');
        document.getElementById('nome').classList.add('error');
        isValid = false;
    }
    
    // Validate email (optional but if provided, must be valid)
    if (email && !isValidEmail(email)) {
        showError('nomeError', 'Por favor, insira um e-mail válido');
        isValid = false;
    }
    
    // Validate theme selection
    if (!tema) {
        showError('temaError', 'Por favor, selecione um tema');
        isValid = false;
    }
    
    if (!isValid) {
        return;
    }
    
    // Prepare form data
    const formData = {
        nome: nome,
        email: email,
        tema: tema,
        sugestao: sugestao,
        data: new Date().toLocaleString('pt-BR')
    };
    
    // Send data (this example stores in localStorage for demo purposes)
    saveFormData(formData);
    
    // Show success message
    showSuccessMessage();
    
    // Reset form after 2 seconds
    setTimeout(() => {
        document.getElementById('formulario').reset();
        document.getElementById('emailInput').value = '';
        document.getElementById('successMessage').style.display = 'none';
    }, 3000);
});

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show error message
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

// Clear all errors
function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
        element.classList.remove('show');
    });
    
    const errorInputs = document.querySelectorAll('.text-input.error, .textarea-input.error');
    errorInputs.forEach(input => {
        input.classList.remove('error');
    });
}

// Show success message
function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'block';
}

// Save form data (localStorage for demo)
function saveFormData(data) {
    try {
        // Get existing data
        let allSubmissions = JSON.parse(localStorage.getItem('formularioSubmissions')) || [];
        
        // Add new submission
        allSubmissions.push(data);
        
        // Save back to localStorage
        localStorage.setItem('formularioSubmissions', JSON.stringify(allSubmissions));
        
        console.log('Formulário salvo com sucesso:', data);
        console.log('Total de submissões:', allSubmissions.length);
    } catch (error) {
        console.error('Erro ao salvar formulário:', error);
    }
}

// Real-time validation feedback
document.getElementById('nome').addEventListener('blur', function() {
    if (this.value.trim() && this.value.trim().split(' ').length < 2) {
        this.classList.add('error');
        showError('nomeError', 'Por favor, insira nome e sobrenome');
    } else if (this.value.trim()) {
        this.classList.remove('error');
        document.getElementById('nomeError').classList.remove('show');
    }
});

// Email validation on blur
document.getElementById('emailInput').addEventListener('blur', function() {
    if (this.value.trim() && !isValidEmail(this.value.trim())) {
        this.classList.add('error');
    } else {
        this.classList.remove('error');
    }
});

// Reset errors when user starts typing
document.getElementById('nome').addEventListener('input', function() {
    this.classList.remove('error');
    document.getElementById('nomeError').classList.remove('show');
});

document.getElementById('emailInput').addEventListener('input', function() {
    this.classList.remove('error');
});

// Log all submissions (for testing)
function viewAllSubmissions() {
    const submissions = JSON.parse(localStorage.getItem('formularioSubmissions')) || [];
    console.table(submissions);
    return submissions;
}

// Clear all data (for testing)
function clearAllData() {
    localStorage.removeItem('formularioSubmissions');
    console.log('Todos os dados foram apagados');
}

// Make functions available in console for testing
window.viewAllSubmissions = viewAllSubmissions;
window.clearAllData = clearAllData;
