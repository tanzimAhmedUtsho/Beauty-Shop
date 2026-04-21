function estimateDelivery() {
  const location = document.getElementById("locationSelect").value;
  const resultDiv = document.getElementById("result");

  if (!location) {
    resultDiv.innerHTML =
      '<p style="color: red;">অনুগ্রহ করে একটি এলাকা নির্বাচন করুন।</p>';
    return;
  }

  let message = "";
  let time = "";

  if (location === "dhaka") {
    time = "২৪ ঘণ্টা";
    message = "আপনার অর্ডারটি আমরা ১ দিনের মধ্যেই পৌঁছে দেব।";
  } else if (location === "dhaka-sub") {
    time = "২৪-৪৮ ঘণ্টা";
    message = "আপনার এলাকায় ডেলিভারি পেতে ১-২ দিন সময় লাগতে পারে।";
  } else {
    time = "৩-৫ দিন";
    message =
      "ঢাকার বাইরে কুরিয়ার সার্ভিসের মাধ্যমে ৩-৫ দিনে ডেলিভারি সম্পন্ন হবে।";
  }

  resultDiv.innerHTML = `
        <div style="background: #fff0f5; padding: 20px; border-radius: 10px; margin-top: 20px; border-left: 5px solid #ff4d8d;">
            <h4 style="color: #ff4d8d; margin-bottom: 5px;">আনুমানিক সময়: ${time}</h4>
            <p>${message}</p>
        </div>
    `;
}

// FAQ Accordion Logic
document.addEventListener("DOMContentLoaded", () => {
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const item = question.parentElement;

      // Toggle current item
      item.classList.toggle("active");
    });
  });
});
