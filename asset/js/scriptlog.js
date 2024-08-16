        const loginForm = document.getElementById('loginForm');
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(loginForm);
            const email = formData.get('email');
            const password = formData.get('password');
            const users = JSON.parse(localStorage.getItem('users')) || [];
            
            const user = users.find(user => user.email === email && atob(user.password) === password);
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
                location.href = 'index.html';
            } else {
                alert('Invalid email or password');
            }
        });
        const signUPButton = document.getElementById('signUPButton');
        signUPButton.addEventListener('click', function() {
            form = document.getElementById('form');
            form.innerHTML = `
                <h1 class="text-center">Register</h1>
                <form id="registerForm">
                    <div class="mb-3">
                        <label for="name" class="form-label">Name</label>
                        <input type="text" class="form-control" id="name" name="name" required>
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="email" name="email" required>
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password" name="password" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Register</button>
                    <a href="login.html" class="btn btn-link" id="logInButton">Log In</a>
                </form>
            `;
            const registerForm = document.getElementById('registerForm');
        registerForm.addEventListener('submit', function(e) {
            console.log('register');
            e.preventDefault();
            const formData = new FormData(registerForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const password = btoa(formData.get('password'));
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(user => user.email === email);
            if (user) {
                alert('Email already exists');
            } else {
                users.push({ name, email, password });
                localStorage.setItem('users', JSON.stringify(users));
                alert('User registered successfully');
                location.href = 'login.html';
            }
        });
        const logInButton = document.getElementById('logInButton');
        logInButton.addEventListener("click",()=> {
            preventDefault();
        });
        });
        