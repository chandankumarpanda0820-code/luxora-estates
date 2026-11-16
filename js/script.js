
/* =========================================
   LUXORA ESTATES
   SINGLE PAGE NAVIGATION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  const navLinks = document.querySelectorAll(
    ".main-navigation .nav-link"
  );

  const navbarCollapse = document.querySelector("#mainNavbar");

  const navbarToggler = document.querySelector(".navbar-toggler");

  const sections = document.querySelectorAll(
    "main section[id]"
  );


  // =====================================
  // SMOOTH NAVIGATION + MOBILE MENU
  // =====================================

  navLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId = link.getAttribute("href");

      const targetSection = document.querySelector(targetId);

      if (!targetSection) {
        event.preventDefault();
        console.warn(`Section not found: ${targetId}`);
        return;
      }

      // Close mobile menu after clicking
      if (
        navbarCollapse &&
        navbarCollapse.classList.contains("show")
      ) {

        const bsCollapse =
          bootstrap.Collapse.getOrCreateInstance(
            navbarCollapse
          );

        bsCollapse.hide();

      }

    });

  });


  // =====================================
  // ACTIVE NAVBAR ON SCROLL
  // =====================================

  const observer = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          const currentId = entry.target.id;

          navLinks.forEach((link) => {

            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${currentId}`
            );

          });

        }

      });

    },
    {
      rootMargin: "-25% 0px -65% 0px",
      threshold: 0
    }
  );


  // Observe all page sections
  sections.forEach((section) => {
    observer.observe(section);
  });


  // =====================================
  // LOGO NAVIGATION
  // =====================================

  const brandLogo = document.querySelector(".brand-logo");

  if (brandLogo) {

    brandLogo.addEventListener("click", () => {

      navLinks.forEach((link) => {
        link.classList.remove("active");
      });

      const homeLink = document.querySelector(
        '.main-navigation .nav-link[href="#home"]'
      );

      if (homeLink) {
        homeLink.classList.add("active");
      }

    });

  }


  // =====================================
  // INITIAL ACTIVE LINK
  // =====================================

  function setInitialActiveLink() {

    const currentHash = window.location.hash || "#home";

    navLinks.forEach((link) => {

      link.classList.toggle(
        "active",
        link.getAttribute("href") === currentHash
      );

    });

  }

  setInitialActiveLink();

});



/* =========================================
   LUXORA ESTATES
   PROPERTY SECTION JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  // =====================================
  // PROPERTY FILTERS
  // =====================================

  const filterButtons = document.querySelectorAll(".filter-btn");
  const propertyItems = document.querySelectorAll(".property-item");

  function filterProperties(category) {

    propertyItems.forEach((item) => {

      const itemCategory = item.dataset.category;

      const shouldShow =
        category === "all" || itemCategory === category;

      item.classList.toggle("filter-hidden", !shouldShow);

    });

  }

  filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const selectedFilter = button.dataset.filter;

      filterButtons.forEach((item) => {

        const isActive = item === button;

        item.classList.toggle("active", isActive);
        item.setAttribute("aria-pressed", isActive);

      });

      filterProperties(selectedFilter);

    });

  });


  // =====================================
  // EXPLORE ALL PROPERTIES
  // =====================================

  const showAllButton = document.querySelector("#showAllProperties");

  if (showAllButton) {

    showAllButton.addEventListener("click", () => {

      const allFilter = document.querySelector(
        '.filter-btn[data-filter="all"]'
      );

      if (allFilter) {
        allFilter.click();
      }

      document.querySelector("#propertyGrid").scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  }


  // =====================================
  // PROPERTY DETAILS MODAL
  // =====================================

  const propertyModal = document.querySelector("#propertyModal");

  if (propertyModal) {

    propertyModal.addEventListener("show.bs.modal", (event) => {

      const triggerButton = event.relatedTarget;

      if (!triggerButton) return;

      const property = triggerButton.dataset;

      document.querySelector("#propertyModalTitle").textContent =
        property.title;

      document.querySelector("#modalLocation").textContent =
        property.location;

      document.querySelector("#modalPrice").textContent =
        property.price;

      document.querySelector("#modalType").textContent =
        property.type;

      document.querySelector("#modalBeds").textContent =
        property.beds;

      document.querySelector("#modalBaths").textContent =
        property.baths;

      document.querySelector("#modalArea").textContent =
        property.area;

      document.querySelector("#modalDescription").textContent =
        property.description;

    });

  }

});



// ========================================
// CONTACT ENQUIRY FORM
// ========================================

document.addEventListener("DOMContentLoaded", () => {
  const enquiryForm = document.querySelector("#enquiryForm");

  if (!enquiryForm) return;

  enquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("#enquiryName").value.trim();
    const email = document.querySelector("#enquiryEmail").value.trim();
    const phone = document.querySelector("#enquiryPhone").value.trim();
    const interest = document.querySelector("#propertyInterest").value;
    const message = document.querySelector("#enquiryMessage").value.trim();
    const formStatus = document.querySelector("#formStatus");

    const phonePattern = /^[0-9+\-\s()]{10,15}$/;

    if (!phonePattern.test(phone)) {
      formStatus.textContent = "Please enter a valid phone number.";
      return;
    }

    const whatsappMessage = `
Hello Luxora Estates,

I would like to make a property enquiry.

Name: ${name}
Email: ${email}
Phone: ${phone}
Requirement: ${interest}

Message:
${message}
        `.trim();

    const whatsappURL =
      `https://wa.me/918984240820?text=${encodeURIComponent(whatsappMessage)}`;

    formStatus.textContent = "Opening WhatsApp. Please send your enquiry there.";

    window.open(whatsappURL, "_blank", "noopener,noreferrer");

    enquiryForm.reset();
  });
});



// ========================================
// DYNAMIC FOOTER YEAR
// ========================================

document.addEventListener("DOMContentLoaded", () => {
  const footerYear = document.querySelector("#footerYear");

  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }
});
