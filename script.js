/* ===== script.js — trivia logic + contact form validation ===== */

/* ---------- Trivia quiz ---------- */
(function () {
  const quiz = document.getElementById("quizForm");
  if (!quiz) return; // only runs on the Trivia page

  // Correct answers
  const answers = { q1: "b", q2: "a", q3: "c", q4: "a" };
  const total = Object.keys(answers).length;

  quiz.addEventListener("submit", function (e) {
    e.preventDefault();
    let score = 0;

    for (const q in answers) {
      const chosen = quiz.querySelector('input[name="' + q + '"]:checked');
      if (chosen && chosen.value === answers[q]) {
        score++;
      }
    }

    // Dynamically update the result and give a category message
    let message;
    if (score === total)      message = "Perfect! You know your travel facts. 🎉";
    else if (score >= total / 2) message = "Nice work! Not bad at all.";
    else                      message = "Keep exploring — try again!";

    const result = document.getElementById("quizResult");
    result.textContent = "You scored " + score + " / " + total + ". " + message;
  });
})();

/* ---------- Contact form validation ---------- */
(function () {
  const form = document.getElementById("contactForm");
  if (!form) return; // present on every page

  const msg = document.getElementById("formMsg");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name  = form.name.value.trim();
    const email = form.email.value.trim();
    const text  = form.message.value.trim();

    // Basic validation
    if (name === "" || email === "" || text === "") {
      msg.textContent = "Please fill in all fields.";
      msg.className = "form-msg error";
      return;
    }
    if (!emailPattern.test(email)) {
      msg.textContent = "Please enter a valid email address.";
      msg.className = "form-msg error";
      return;
    }

    // Success
    msg.textContent = "Thank you, " + name + "! Your message has been received.";
    msg.className = "form-msg ok";
    form.reset();
  });
})();
