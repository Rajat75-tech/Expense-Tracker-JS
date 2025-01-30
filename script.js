document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signup-form");

    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        if (password !== confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Passwords do not match!'
            });
            return;
        }

        const user = { username, email, password };
        localStorage.setItem("user", JSON.stringify(user));

        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Sign-up successful! Redirecting to login page...'
        }).then(() => {
            window.location.href = "Login/login.html";
        });
    });
});