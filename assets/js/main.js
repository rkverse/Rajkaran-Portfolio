 const filterBtns = document.querySelectorAll(".filter-btn");
      const projectCards = document.querySelectorAll(".project-card");

      filterBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          const filter = btn.dataset.filter;

          // Update active button styles
          filterBtns.forEach((b) => {
            b.classList.remove(
              "active-filter",
              "bg-gold",
              "text-dark",
              "border-gold",
            );
            b.classList.add("border-dark-border", "text-ivory/50");
          });
          btn.classList.add(
            "active-filter",
            "bg-gold",
            "text-dark",
            "border-gold",
          );
          btn.classList.remove("border-dark-border", "text-ivory/50");

          // Filter cards with fade animation
          projectCards.forEach((card) => {
            const category = card.dataset.category;
            const matches = filter === "all" || category === filter;

            if (matches) {
              card.style.opacity = "0";
              card.style.transform = "translateY(12px)";
              card.style.display = "";
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  card.style.transition =
                    "opacity 0.3s ease, transform 0.3s ease";
                  card.style.opacity = "1";
                  card.style.transform = "translateY(0)";
                });
              });
            } else {
              card.style.transition = "opacity 0.2s ease, transform 0.2s ease";
              card.style.opacity = "0";
              card.style.transform = "translateY(8px)";
              setTimeout(() => {
                card.style.display = "none";
              }, 200);
            }
          });
        });
      });
      // Nav toggle
      const navMenu = document.getElementById("nav-menu");
      const navToggle = document.getElementById("nav-toggle");
      const navClose = document.getElementById("nav-close");
      navToggle?.addEventListener("click", () =>
        navMenu.classList.add("show-menu"),
      );
      navClose?.addEventListener("click", () =>
        navMenu.classList.remove("show-menu"),
      );
      document
        .querySelectorAll(".nav__link")
        .forEach((l) =>
          l.addEventListener("click", () =>
            navMenu.classList.remove("show-menu"),
          ),
        );

      // Skills accordion
      document.querySelectorAll(".skills__header").forEach((header) => {
        header.addEventListener("click", () => {
          const parent = header.parentNode;
          parent.classList.toggle("skills-open");
          parent.classList.toggle("skills-close");
        });
      });

      // Qualification tabs
      document.querySelectorAll(".qual-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const target = btn.dataset.target;
          document
            .querySelectorAll(".qual-btn")
            .forEach((b) => b.classList.remove("qual-active", "text-gold"));
          document
            .querySelectorAll(".qual-content")
            .forEach((c) => c.classList.remove("qual-active"));
          btn.classList.add("qual-active");
          document.getElementById(target)?.classList.add("qual-active");
        });
      });

      // Expertise modals
      document.querySelectorAll(".expertise-card").forEach((card) => {
        card.addEventListener("click", () => {
          const modalId = card.dataset.modal;
          document.getElementById(modalId)?.classList.add("active-modal");
        });
      });
      document.querySelectorAll(".modal-close").forEach((btn) => {
        btn.addEventListener("click", () =>
          btn.closest(".expertise-modal").classList.remove("active-modal"),
        );
      });
      document.querySelectorAll(".expertise-modal").forEach((modal) => {
        modal.addEventListener("click", (e) => {
          if (e.target === modal) modal.classList.remove("active-modal");
        });
      });

      // Scroll events
      window.addEventListener("scroll", () => {
        const scrollUp = document.getElementById("scroll-up");
        if (window.scrollY >= 560) scrollUp.classList.add("show-scroll");
        else scrollUp.classList.remove("show-scroll");
      });

      // Active link on scroll
      const sections = document.querySelectorAll("section[id]");
      window.addEventListener("scroll", () => {
        const scrollY = window.pageYOffset;
        sections.forEach((sec) => {
          const top = sec.offsetTop - 80;
          const height = sec.offsetHeight;
          const id = sec.getAttribute("id");
          const link = document.querySelector(`.nav__link[href="#${id}"]`);
          if (link) {
            if (scrollY >= top && scrollY < top + height)
              link.classList.add("active-link");
            else link.classList.remove("active-link");
          }
        });
      });

      // Section fade-in observer
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) e.target.classList.add("visible");
          });
        },
        { threshold: 0.1 },
      );
      document
        .querySelectorAll(".section-fade")
        .forEach((el) => observer.observe(el));

      // Form validation
      document.getElementById("check")?.addEventListener("click", (e) => {
        const form = document.getElementById("submit_form");
        let ok = true;
        form.querySelectorAll("[required]").forEach((i) => {
          if (!i.value) ok = false;
        });
        if (!ok) {
          e.preventDefault();
          alert("Please fill all fields.");
        }
      });

      // Swiper
      new Swiper(".portfolio__container", {
        cssMode: true,
        loop: true,
        pagination: { el: ".swiper-pagination", clickable: true },
      });