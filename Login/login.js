document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const loginEmail = document.getElementById("login-email").value.trim();
        const loginPassword = document.getElementById("login-password").value;

        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (!storedUser || storedUser.email !== loginEmail || storedUser.password !== loginPassword) {
            swal({
                title: "Error!",
                text: "Invalid email or password!",
                icon: "error",
            });
            return;
        }

        localStorage.setItem("loggedInUser", storedUser.username);

        swal({
            title: "Success!",
            text: "Login successful! Redirecting to home page...",
            icon: "success",
            timer: 2000,
            buttons: false,
        }).then(() => {
            window.location.href = "./Main/main.html";
        });
    });
});
