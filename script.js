document.addEventListener("DOMContentLoaded", () => {

  /* ========== MOBILE MENU TOGGLE FIX ========== */
  const toggle = document.getElementById("toggle");
  const menu = document.getElementById("menu");

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("show");

    toggle.textContent = menu.classList.contains("show") ? "✖" : "☰";
  });

  // Close menu when clicking any menu link
  document.querySelectorAll("#menu a").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("show");
      toggle.textContent = "☰";
    });
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (
      menu.classList.contains("show") &&
      !menu.contains(e.target) &&
      !toggle.contains(e.target)
    ) {
      menu.classList.remove("show");
      toggle.textContent = "☰";
    }
  });

  /* ========== SCROLL REVEAL ========== */
  const revealElements = document.querySelectorAll(
    ".section, .card, .edu, .skills span, .hero h1, .hero h2, .hero p"
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => observer.observe(el));

  /* ========== THEME TOGGLE ========== */
  const themeToggle = document.getElementById("themeToggle");

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️";
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
      themeToggle.textContent = "☀️";
      localStorage.setItem("theme", "dark");
    } else {
      themeToggle.textContent = "🌙";
      localStorage.setItem("theme", "light");
    }
  });

  /* ========== LOGIN FORM ========== */
  document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const username = document.getElementById("loginUser").value;
    const password = document.getElementById("loginPass").value;
    const msg = document.getElementById("authMsg");

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (data.success) {
  msg.style.color = "green";
  msg.textContent = "✅ Login successful!";

  // save user
  localStorage.setItem("user", JSON.stringify({
    username: username
  }));

  updateNavbar();
}
 else {
        msg.style.color = "red";
        msg.textContent = data.message;
      }
    } catch {
      msg.style.color = "red";
      msg.textContent = "❌ Server not connected";
    }
  });

});
function updateNavbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const loginLink = document.getElementById("loginLink");
  const profileNav = document.getElementById("profileNav");
  const usernameEl = document.getElementById("username");
  const avatarEl = document.getElementById("avatar");

  if (user) {
    loginLink.style.display = "none";
    profileNav.style.display = "flex";

    usernameEl.textContent = user.username;
    avatarEl.src = `https://ui-avatars.com/api/?name=${user.username}&background=4f46e5&color=fff`;
  }
}

// logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("user");
  location.reload();
});

// run on page load
updateNavbar();

