// Signup + Login validation (shared)
document.addEventListener('DOMContentLoaded', function() {
    // Login form validation
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        const loginEmail = document.getElementById("login-email");
        const loginPassword = document.getElementById("login-password");
        const loginEmailError = document.getElementById("login-email-error");
        const loginPasswordError = document.getElementById("login-password-error");

        function validateLoginEmail() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
            if (loginEmail.value.trim() === "") {
                loginEmailError.textContent = "Vui lòng nhập email!";
                loginEmail.classList.add("is-invalid");
                return false;
            } else if (!emailRegex.test(loginEmail.value)) {
                loginEmailError.textContent = "Email không hợp lệ (Ví dụ: pockii@gmail.com).";
                loginEmail.classList.add("is-invalid");
                return false;
            } else {
                loginEmailError.textContent = "";
                loginEmail.classList.remove("is-invalid");
                return true;
            }
        }

        function validateLoginPassword() {
            if (loginPassword.value.trim() === "") {
                loginPasswordError.textContent = "Vui lòng nhập mật khẩu!";
                loginPassword.classList.add("is-invalid");
                return false;
            } else {
                loginPasswordError.textContent = ""; 
                loginPassword.classList.remove("is-invalid");
                return true;
            }
        }

        loginEmail.addEventListener("input", validateLoginEmail);
        loginPassword.addEventListener("input", validateLoginPassword);

        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const isEmailValid = validateLoginEmail();
            const isPassValid = validateLoginPassword();
            if (isEmailValid && isPassValid) {
                alert("Chào mừng Thanh Thủy trở lại Pockii! Đang đăng nhập...");
            }
        });
    }

    // Signup form validation (existing logic preserved)
    const signupForm = document.querySelector('.signup-form');
    if (signupForm) {
        const phone = document.getElementById("phone");
        const password = document.getElementById("password");
        const confirmPassword = document.getElementById("confirm-password");
        const phoneError = document.getElementById("phone-error");
        const passwordError = document.getElementById("password-error");
        const confirmError = document.getElementById("confirm-error");

        function validatePhone() {
            const phoneRegex = /^(0[3|5|7|8|9])[0-9]{8}$/;
            if (phone.value.trim() === "") {
                phoneError.textContent = "Vui lòng nhập số điện thoại!";
                return false;
            } else if (!phoneRegex.test(phone.value)) {
                phoneError.textContent = "SĐT gồm 10 số, đầu 03,05,07,08,09.";
                return false;
            } else {
                phoneError.textContent = "";
                return true;
            }
        }

        function validatePassword() {
            const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (password.value.trim() === "") {
                passwordError.textContent = "Vui lòng nhập mật khẩu!";
                return false;
            } else if (!strongRegex.test(password.value)) {
                passwordError.textContent = "Cần 8 ký tự, có chữ hoa, thường, số, ký tự đặc biệt.";
                return false;
            } else {
                passwordError.textContent = ""; 
                return true;
            }
        }

        function validateConfirmPassword() {
            if (confirmPassword.value.trim() === "") {
                confirmError.textContent = "Vui lòng xác nhận lại mật khẩu!";
                return false;
            } else if (password.value !== confirmPassword.value) {
                confirmError.textContent = "Mật khẩu không khớp. Vui lòng gõ lại!";
                return false;
            } else {
                confirmError.textContent = "";
                return true;
            }
        }

        phone.addEventListener("input", validatePhone);
        password.addEventListener("input", () => {
            validatePassword();
            if (confirmPassword.value) validateConfirmPassword();
        });
        confirmPassword.addEventListener("input", validateConfirmPassword);

        signupForm.addEventListener("submit", function(event) {
            event.preventDefault(); 
            const isPhoneValid = validatePhone();
            const isPassValid = validatePassword();
            const isConfirmValid = validateConfirmPassword();
            if (isPhoneValid && isPassValid && isConfirmValid) {
                alert("Chúc mừng Thanh Thủy! Mọi thông tin đã hợp lệ.");
            }
        });
    }
});
