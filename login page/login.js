/* BeautySource - Premium Login Logic
   Updated: 2026
*/

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const passwordInput = document.getElementById("password");
  const togglePassword = document.getElementById("togglePassword");
  const emailInput = document.getElementById("email");

  // ১. পাসওয়ার্ড হাইড বা শো করার উন্নত লজিক
  if (togglePassword) {
    togglePassword.addEventListener("click", function () {
      // টাইপ পরিবর্তন
      const isPassword = passwordInput.getAttribute("type") === "password";
      passwordInput.setAttribute("type", isPassword ? "text" : "password");

      // আইকন পরিবর্তন (Smooth transition-এর জন্য)
      this.classList.toggle("fa-eye");
      this.classList.toggle("fa-eye-slash");

      // আইকনে হালকা এনিমেশন বা কালার চেঞ্জ
      this.style.color = isPassword ? "var(--accent)" : "#888";
    });
  }

  // ২. রিয়েল-টাইম ভ্যালিডেশন (টাইপ করার সময় এরর চলে যাবে)
  const inputs = [emailInput, passwordInput];
  inputs.forEach((input) => {
    input.addEventListener("input", function () {
      const errorDiv = document.getElementById(
        this.id === "email" ? "emailError" : "passError",
      );
      if (errorDiv.style.display === "block") {
        errorDiv.style.display = "none";
        this.style.borderColor = "var(--accent)"; // হাইলাইট
      }
    });
  });

  // ৩. ফর্ম সাবমিট ভ্যালিডেশন
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const loginBtn = document.querySelector(".login-btn");

    let isValid = true;

    // ইমেইল চেক (Regex ব্যবহার করে আরও শক্তিশালী করা হয়েছে)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showError("emailError", emailInput);
      isValid = false;
    } else {
      hideError("emailError", emailInput);
    }

    // পাসওয়ার্ড চেক
    if (password.length < 6) {
      showError("passError", passwordInput);
      isValid = false;
    } else {
      hideError("passError", passwordInput);
    }

    // ৪. সব ঠিক থাকলে প্রসেসিং এনিমেশন
    if (isValid) {
      // বাটন টেক্সট পরিবর্তন ও ডিজেবল করা
      const originalText = loginBtn.innerText;
      loginBtn.disabled = true;
      loginBtn.innerHTML =
        '<i class="fa-solid fa-circle-notch fa-spin"></i> প্রসেসিং...';
      loginBtn.style.opacity = "0.7";

      // সার্ভার রেসপন্স সিমুলেশন (Delay)
      setTimeout(() => {
        alert("সফলভাবে লগইন হয়েছে! BeautySource-এ আপনাকে স্বাগতম।");

        // হোম পেজে রিডাইরেক্ট (আপনার index.html ফাইলের সাথে লিঙ্ক করুন)
        window.location.href = "index.html";
      }, 1500);
    }
  });

  // এরর দেখানোর ফাংশন
  function showError(errorId, inputEl) {
    const errorDiv = document.getElementById(errorId);
    errorDiv.style.display = "block";
    inputEl.style.borderColor = "#ff4d4d";
    // হালকা ভাইব্রেশন ইফেক্ট (ঐচ্ছিক)
    inputEl.classList.add("shake-animation");
    setTimeout(() => inputEl.classList.remove("shake-animation"), 500);
  }

  // এরর লুকানোর ফাংশন
  function hideError(errorId, inputEl) {
    document.getElementById(errorId).style.display = "none";
    inputEl.style.borderColor = "#ddd";
  }
});
