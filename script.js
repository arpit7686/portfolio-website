// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle?.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  const icon = menuToggle.querySelector("i");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-xmark");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

// Active navigation item while scrolling
const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-links a");

const updateActiveNav = () => {
  let current = "home";

  sections.forEach(section => {
    const top = section.offsetTop - 140;
    if (window.scrollY >= top) current = section.id;
  });

  navItems.forEach(item => {
    item.classList.toggle("active", item.getAttribute("href") === `#${current}`);
  });
};

window.addEventListener("scroll", updateActiveNav);
updateActiveNav();

// Reveal animation
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// Back to top
const backTop = document.getElementById("backTop");

window.addEventListener("scroll", () => {
  backTop.classList.toggle("show", window.scrollY > 500);
});

backTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Contact Form - Web3Forms

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const submitBtn = document.getElementById("submitBtn");

contactForm?.addEventListener("submit", async function (e) {

    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';

    try {

        const formData = new FormData(contactForm);

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        if (result.success) {

            formStatus.textContent = "Thank you! Your message has been sent successfully.";
            formStatus.style.color = "green";

            contactForm.reset();

        } else {

            formStatus.textContent = "Something went wrong. Please try again.";
            formStatus.style.color = "red";

        }

    } catch (error) {

        formStatus.textContent = "Unable to send message. Please try again later.";
        formStatus.style.color = "red";

    }

    submitBtn.disabled = false;

    submitBtn.innerHTML = 'Send Message <i class="fa-regular fa-paper-plane"></i>';

});
