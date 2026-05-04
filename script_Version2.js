document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Validation
    if (!username || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    if (username.length < 3) {
        alert('Username or email is invalid');
        return;
    }
    
    if (password.length < 6) {
        alert('Password must be at least 6 characters');
        return;
    }
    
    // Demo: Show success message
    alert(`Login successful!\nUsername: ${username}\n\n(This is a demo - no actual login occurs)`);
    
    // Clear form
    document.getElementById('loginForm').reset();
});

// Facebook login
document.getElementById('facebookLogin').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Facebook login not implemented in this demo');
});

// Add focus state styling
document.getElementById('username').addEventListener('focus', function() {
    this.style.borderColor = '#262626';
});

document.getElementById('username').addEventListener('blur', function() {
    this.style.borderColor = '#dbdbdb';
});

document.getElementById('password').addEventListener('focus', function() {
    this.style.borderColor = '#262626';
});

document.getElementById('password').addEventListener('blur', function() {
    this.style.borderColor = '#dbdbdb';
});