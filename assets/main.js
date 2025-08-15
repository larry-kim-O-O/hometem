// ホームテム - Main JavaScript
// Version: 2.0.0
// Last Updated: 2025-01-15

document.addEventListener("DOMContentLoaded", function () {
  console.log("ホームテム loaded at", new Date().toISOString());

  // Mobile menu functionality
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");

      // Update button icon
      const icon = mobileMenuBtn.querySelector("svg");
      if (mobileMenu.classList.contains("hidden")) {
        icon.innerHTML =
          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
      } else {
        icon.innerHTML =
          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
      }
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", function (e) {
      if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.add("hidden");
        const icon = mobileMenuBtn.querySelector("svg");
        icon.innerHTML =
          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
      }
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Lazy loading for images
  const images = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("loading");
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => {
    img.classList.add("loading");
    imageObserver.observe(img);
  });

  // Add loading state to buttons
  document
    .querySelectorAll('a[href*="amazon"], a[rel*="sponsored"]')
    .forEach((link) => {
      link.addEventListener("click", function () {
        this.classList.add("opacity-75");
        setTimeout(() => {
          this.classList.remove("opacity-75");
        }, 1000);
      });
    });

  // Analytics tracking (placeholder)
  function trackEvent(eventName, eventData = {}) {
    // Google Analytics 4 or other analytics
    if (typeof gtag !== "undefined") {
      gtag("event", eventName, eventData);
    }
    console.log("Event tracked:", eventName, eventData);
  }

  // Track affiliate link clicks
  document.querySelectorAll('a[rel*="sponsored"]').forEach((link) => {
    link.addEventListener("click", function () {
      trackEvent("affiliate_click", {
        link_url: this.href,
        link_text: this.textContent.trim(),
      });
    });
  });

  // Track page views
  trackEvent("page_view", {
    page_title: document.title,
    page_url: window.location.href,
  });
});
