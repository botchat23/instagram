// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$|^[0-9]{10,}$/;
// Username validation: 3-30 chars, alphanumeric and dots/underscores
const usernameRegex = /^[a-zA-Z0-9._]{3,30}$/;

// Form elements
const signupForm = document.getElementById('signupForm');
const emailInput = document.getElementById('email');
const fullnameInput = document.getElementById('fullname');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const termsCheckbox = document.getElementById('agreeTerms');
const signupBtn = document.getElementById('signupBtn');
const togglePasswordBtn = document.getElementById('togglePassword');
const facebookSignup = document.getElementById('facebookSignup');

// Error message elements
const emailError = document.getElementById('emailError');
const fullnameError = document.getElementById('fullnameError');
const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');
const termsError = document.getElementById('termsError');

// Strength bar
const strengthBar = document.getElementById('strengthBar');

// Toggle password visibility
togglePasswordBtn.addEventListener('click', function(e) {
    e.preventDefault();
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        togglePasswordBtn.textContent = 'Hide';
    } else {
        passwordInput.type = 'password';
        togglePasswordBtn.textContent = 'Show';
    }
});

// Password strength indicator
passwordInput.addEventListener('input', function() {
    const password = this.value;
    let strength = 0;

    // Check password criteria
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    // Update strength bar
    strengthBar.classList.remove('weak', 'fair', 'strong');
    if (strength <= 1) {
        strengthBar.classList.add('weak');
    } else if (strength === 2) {
        strengthBar.classList.add('fair');
    } else {
        strengthBar.classList.add('strong');
    }

    validatePassword();
});

// Real-time validation
emailInput.addEventListener('blur', validateEmail);
fullnameInput.addEventListener('blur', validateFullname);
usernameInput.addEventListener('blur', validateUsername);
passwordInput.addEventListener('blur', validatePassword);
termsCheckbox.addEventListener('change', validateTerms);

function validateEmail() {
    const email = emailInput.value.trim();
    if (!email) {
        emailError.textContent = 'Email is required';
        return false;
    }
    if (!emailRegex.test(email)) {
        emailError.textContent = 'Enter a valid email or mobile number';
        return false;
    }
    emailError.textContent = '';
    return true;
}

function validateFullname() {
    const fullname = fullnameInput.value.trim();
    if (!fullname) {
        fullnameError.textContent = 'Full name is required';
        return false;
    }
    if (fullname.length < 2) {
        fullnameError.textContent = 'Full name must be at least 2 characters';
        return false;
    }
    if (fullname.length > 50) {
        fullnameError.textContent = 'Full name must be less than 50 characters';
        return false;
    }
    fullnameError.textContent = '';
    return true;
}

function validateUsername() {
    const username = usernameInput.value.trim();
    if (!username) {
        usernameError.textContent = 'Username is required';
        return false;
    }
    if (!usernameRegex.test(username)) {
        usernameError.textContent = 'Username must be 3-30 characters (letters, numbers, dots, underscores)';
        return false;
    }
    usernameError.textContent = '';
    return true;
}

function validatePassword() {
    const password = passwordInput.value;
    if (!password) {
        passwordError.textContent = 'Password is required';
        return false;
    }
    if (password.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters';
        return false;
    }
    if (password.length > 128) {
        passwordError.textContent = 'Password must be less than 128 characters';
        return false;
    }
    passwordError.textContent = '';
    return true;
}

function validateTerms() {
    if (!termsCheckbox.checked) {
        termsError.textContent = 'You must agree to the terms';
        return false;
    }
    termsError.textContent = '';
    return true;
}

// Form submission
signupForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Validate all fields
    const emailValid = validateEmail();
    const fullnameValid = validateFullname();
    const usernameValid = validateUsername();
    const passwordValid = validatePassword();
    const termsValid = validateTerms();

    if (emailValid && fullnameValid && usernameValid && passwordValid && termsValid) {
        // Disable button to prevent multiple submissions
        signupBtn.disabled = true;
        signupBtn.textContent = 'Signing up...';

        // Simulate API call
        setTimeout(() => {
            const userData = {
                email: emailInput.value,
                fullname: fullnameInput.value,
                username: usernameInput.value
            };

            console.log('Sign up data:', userData);
            
            // Show success message
            alert(`Account created successfully!\nUsername: ${userData.username}\n\nRedirecting to login...`);

            // Reset form and redirect
            signupForm.reset();
            strengthBar.classList.remove('weak', 'fair', 'strong');
            signupBtn.disabled = false;
            signupBtn.textContent = 'Sign up';
            
            // Redirect to login page
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        }, 1500);
    }
});

// Facebook sign-up
facebookSignup.addEventListener('click', function(e) {
    e.preventDefault();
    alert('Facebook sign-up not implemented in this demo');
});

// Prevent form submission on Enter in input fields
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && this.id !== 'signupBtn') {
            e.preventDefault();
        }
    });
});