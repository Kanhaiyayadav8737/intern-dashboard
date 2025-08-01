// Login functionality
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const signupBtn = document.getElementById('signupBtn');
    const signupModal = document.getElementById('signupModal');
    const signupForm = document.getElementById('signupForm');
    const closeModal = document.querySelector('.close');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');

    // Handle login form submission
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            
            const data = await response.json();
            
            if (data.success) {
                // Store user data in localStorage
                localStorage.setItem('currentUser', username);
                localStorage.setItem('userData', JSON.stringify(data.user));
                
                showMessage('Login successful! Redirecting...', 'success');
                
                // Redirect to dashboard after a short delay
                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 1000);
            } else {
                showMessage(data.message || 'Login failed', 'error');
            }
        } catch (error) {
            console.error('Login error:', error);
            showMessage('Network error. Please try again.', 'error');
        }
    });

    // Handle signup button click
    signupBtn.addEventListener('click', function() {
        signupModal.style.display = 'flex';
    });

    // Handle signup form submission
    signupForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const username = document.getElementById('signupUsername').value;
        const password = document.getElementById('signupPassword').value;
        
        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, username, password })
            });
            
            const data = await response.json();
            
            if (data.success) {
                showMessage('Account created successfully! You can now login with: ' + username, 'success');
                signupModal.style.display = 'none';
                signupForm.reset();
                
                // Pre-fill login form
                document.getElementById('username').value = username;
            } else {
                showMessage(data.message || 'Signup failed', 'error');
            }
        } catch (error) {
            console.error('Signup error:', error);
            showMessage('Network error. Please try again.', 'error');
        }
    });

    // Handle modal close
    closeModal.addEventListener('click', function() {
        signupModal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === signupModal) {
            signupModal.style.display = 'none';
        }
    });

    // Utility function to show messages
    function showMessage(message, type) {
        hideMessages();
        
        if (type === 'error') {
            errorMessage.textContent = message;
            errorMessage.style.display = 'block';
        } else if (type === 'success') {
            successMessage.textContent = message;
            successMessage.style.display = 'block';
        }
        
        // Auto-hide after 5 seconds
        setTimeout(hideMessages, 5000);
    }

    function hideMessages() {
        errorMessage.style.display = 'none';
        successMessage.style.display = 'none';
    }

    // Check if user is already logged in
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        window.location.href = '/dashboard';
    }
});
