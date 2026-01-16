// === CONSTANTS ===
const CONFIG = {
  CAROUSEL_ITEMS: 3,
  MIN_NAME_LENGTH: 3,
  MAX_NAME_LENGTH: 20,
  MIN_TITLE_LENGTH: 3,
  MAX_TITLE_LENGTH: 30,
  MAX_MESSAGE_LENGTH: 100,
};

const ERROR_MESSAGES = {
  NAME_SHORT: "The name must be at least 3 characters long.",
  NAME_LONG: "The name must not exceed 20 characters.",
  EMAIL_INVALID: "Please enter a valid email address.",
  MESSAGE_EMPTY: "The message cannot be empty.",
  MESSAGE_LONG: "The message must not exceed 100 characters.",
  TITLE_SHORT: "The title must be at least 3 characters long.",
  TITLE_LONG: "The title must not exceed 30 characters.",
  TECH_EMPTY: "Please add some technologies.",
};

// === DATA ===
const appData = {
  navItems: ["Home", "Projects", "About", "Contact", "Messages"],
  header: { name: "Marek Witkowski", title: "web - designer" },
  about: {
    photo: "./img/IMG_0826.jpg",
    about:
      "Aspirujący programista i konsultant IT, który łączy techniczne zacięcie z marketingowym wyczuciem. Pomagam firmom optymalizować procesy technologiczne oraz tworzę materiały promocyjne, które skutecznie budują wizerunek marki. Moim celem jest dostarczanie rozwiązań, które pozwolą Twojemu biznesowi w pełni rozwinąć skrzydła i zyskać przewagę na cyfrowym rynku.",
    myBackground:
      "Ukończyłem studia wyższe na kierunku Informatyka Stosowana na Politechnice Warszawskiej, gdzie zdobyłem solidne podstawy teoretyczne i praktyczne w dziedzinie programowania oraz technologii informatycznych.",
    myHobbies:
      "Poza światem programowania, interesuje się tworzeniem projektów 3D w programie Fusion 360, regularnie dbam o swoje zdrowie na siłowni, chętnie podróżuję, a także rozwijam swoje umiejętności kulinarne.",
    skills: [
      { name: "HTML", yearsOfExperience: 5, img: "./img/HTML5.png" },
      { name: "CSS", yearsOfExperience: 5, img: "./img/symbol.png" },
      { name: "JS", yearsOfExperience: 5, img: "./img/Javascript.png" },
      { name: "Git", yearsOfExperience: 1, img: "./img/Shape.png" },
      { name: "Figma", yearsOfExperience: 1, img: "./img/Figma.png" },
      { name: "Chrome", yearsOfExperience: 5, img: "./img/GoogleChrome.png" },
      { name: "VSCode", yearsOfExperience: 5, img: "./img/Group.png" },
      { name: "GitHub", yearsOfExperience: 1, img: "./img/GitHub.png" },
    ],
  },
  projects: [
    { id: 1, title: "Calculator", tech: ["HTML", "CSS", "JavaScript"] },
    {
      id: 2,
      title: "Non-govermnetal organization",
      tech: ["HTML", "CSS", "JavaScript"],
    },
    {
      id: 3,
      title: "Portfolio app",
      tech: ["HTML", "CSS", "JavaScript", "Figma", "Github"],
    },
    {
      id: 4,
      title: "Portfolio app",
      tech: ["HTML", "CSS", "JavaScript", "Figma", "Github"],
    },
  ],
  footer: { email: "marek.witkowski96@icloud.com", phone: "+48 123 456 789" },
  messages: [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      message: "Hello...",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      message: "I'm interested...",
    },
  ],
};

// === STATE ===
const state = {
  currentPage: "Home",
  menuIsOpen: false,
  carouselIndex: 0,
};

// === DOM REFS ===
const DOM = {
  nav: document.getElementById("nav"),
  header: document.getElementById("header"),
  main: document.getElementById("main"),
  footer: document.getElementById("footer"),
};

// === UTILITIES ===
const utils = {
  validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  getVisibleProjects() {
    const count = appData.projects.length;
    if (count === 0) return [];
    const toShow = Math.min(CONFIG.CAROUSEL_ITEMS, count);
    return Array.from(
      { length: toShow },
      (_, i) => appData.projects[(state.carouselIndex + i) % count]
    );
  },

  formatTech(input) {
    return input
      .split(/[-,\s]+/)
      .map((t) => t.trim())
      .filter((t) => t);
  },

  setFieldError(fieldId, errorId, message) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);
    if (!field || !error) return;

    field.classList.toggle("input-error", !!message);
    error.textContent = message;
  },
};

// === VALIDATORS ===
const validators = {
  name(value) {
    value = value.trim();
    if (value.length < CONFIG.MIN_NAME_LENGTH) return ERROR_MESSAGES.NAME_SHORT;
    if (value.length > CONFIG.MAX_NAME_LENGTH) return ERROR_MESSAGES.NAME_LONG;
    return null;
  },

  email(value) {
    if (!utils.validateEmail(value.trim())) return ERROR_MESSAGES.EMAIL_INVALID;
    return null;
  },

  message(value) {
    value = value.trim();
    if (!value) return ERROR_MESSAGES.MESSAGE_EMPTY;
    if (value.length > CONFIG.MAX_MESSAGE_LENGTH)
      return ERROR_MESSAGES.MESSAGE_LONG;
    return null;
  },

  title(value) {
    value = value.trim();
    if (value.length < CONFIG.MIN_TITLE_LENGTH)
      return ERROR_MESSAGES.TITLE_SHORT;
    if (value.length > CONFIG.MAX_TITLE_LENGTH)
      return ERROR_MESSAGES.TITLE_LONG;
    return null;
  },

  technologies(value) {
    if (!value.trim()) return ERROR_MESSAGES.TECH_EMPTY;
    return null;
  },
};

// === TEMPLATES / HTML ===
const templates = {
  navButton(item, isActive) {
    return `<button class="nav-btn ${
      isActive ? "active" : ""
    }" data-page="${item}">${item}</button>`;
  },

  skillDots(filled) {
    return Array.from(
      { length: 5 },
      (_, i) => `<span class="${i < filled ? "filled" : "empty"}"></span>`
    ).join("");
  },

  projectCard(project, showDelete = false) {
    const deleteBtn = showDelete
      ? `<button class="delete-btn" data-id="${project.id}"><img src="./img/delete.png" alt="delete"></button>`
      : "";

    const techList = project.tech.map((t) => `<li>${t}</li>`).join("");

    return `
      ${deleteBtn}
      <div class="project-details">
        <h3 class="project-title">${project.title}</h3>
        <ul class="project-card-tech-list">${techList}</ul>
      </div>
    `;
  },

  skillItem(skill) {
    return `
      <div class="skill-item">
        <img src="${skill.img}" alt="${skill.name}" class="skill-img">
        <div class="skill-info">
          <div class="skill-row">
            <span class="skill-name">${skill.name}</span>
            <div class="dots-container">${templates.skillDots(
              skill.yearsOfExperience
            )}</div>
            <span class="experience-years">${
              skill.yearsOfExperience
            } years</span>
          </div>
        </div>
      </div>
    `;
  },

  nav() {
    return `
      <div class="nav-wrapper">
        <div class="logo">
          <span class="logo-mobile gold">ITP</span>
          <span class="logo-desktop gold">ITP<span class="grey">ortfolio</span></span>
        </div>
        <nav class="nav-list-container ${state.menuIsOpen ? "show" : ""}">
          <ul class="nav-list">
            ${appData.navItems
              .map((item) =>
                templates.navButton(item, state.currentPage === item)
              )
              .join("")}
          </ul>
        </nav>
        <button class="hamburger ${
          state.menuIsOpen ? "open" : ""
        }" aria-label="Toggle menu">
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
        </button>
      </div>
    `;
  },

  header() {
    const headerContentMap = {
      Home: { title: appData.header.name, subtitle: appData.header.title },
      Projects: { title: "MY PROJECTS", subtitle: "Made with love" },
      About: { title: "ABOUT ME", subtitle: "IT'S A-ME!" },
      Contact: { title: "CONTACT ME", subtitle: "Say hello" },
      Messages: {
        title: "MESSAGES",
        subtitle: "Message from the interested person",
      },
    };
    const current =
      headerContentMap[state.currentPage] || headerContentMap["Home"];
    return `
      <div class="header container">
        <h1 class="header-heading">${current.title}</h1>
        <span class="header-subtitle">${current.subtitle}</span>
      </div>
    `;
  },

  footer() {
    return `
      <div class="footer-container">
        <nav class="footer-nav">
          <ul class="footer-nav-list">
            ${appData.navItems
              .map((item) =>
                templates.navButton(item, state.currentPage === item)
              )
              .join("")}
          </ul>
        </nav>
        <div class="footer-info">
          <div class="footer-contact">
            <a href="mailto:${appData.footer.email}">${appData.footer.email}</a>
            <a href="tel:${appData.footer.phone}">${appData.footer.phone}</a>
          </div>
          <div class="footer-logo">
            <span class="gold">ITP</span>ortfolio <span class="white">&copy; 2026</span>
          </div>
        </div>
      </div>
    `;
  },
};

// === PAGE RENDERERS ===
const pages = {
  home() {
    const visibleProjects = utils.getVisibleProjects();
    const hasCarousel = appData.projects.length > CONFIG.CAROUSEL_ITEMS;

    return `
      <section id="about" class="about-section container">
        <div class="about-container about-wrapper wrapper">
          <img src="${appData.about.photo}" alt="Profile" class="about-photo">
          <h2 class="section-title">About me</h2>
          <p class="about-desc">${appData.about.about}</p>
          <div class="skills-container">
            <h2 class="section-title">My Skills</h2>
            <div class="skills-list">
              ${appData.about.skills
                .map((skill) => templates.skillItem(skill))
                .join("")}
            </div>
          </div>
        </div>
      </section>

      <section id="projects" class="projects-section">
        <div class="projects-section-wrapper">
          <div class="carousel-box">
            <div class="projects-list">
              ${
                visibleProjects.length > 0
                  ? visibleProjects
                      .map(
                        (p) =>
                          `<div class="project-card">${templates.projectCard(
                            p,
                            false
                          )}</div>`
                      )
                      .join("")
                  : '<p class="no-projects-msg">There are no projects to display</p>'
              }
            </div>
            ${
              hasCarousel
                ? `
              <div class="carousel-controls">
                <button class="arrow prev" id="prevBtn">
                  <img src="./img/strzalka.png" class="arrow-icon arrow-prev" alt="previous">
                </button>
                <button class="arrow next" id="nextBtn">
                  <img src="./img/strzalka.png" class="arrow-icon arrow-next" alt="next">
                </button>
              </div>
            `
                : ""
            }
          </div>
        </div>
      </section>
    `;
  },

  projects() {
    return `
      <section class="projects-section container">
        <div class="about wrapper">
          <div class="add-project-container">
            <button id="addProjectBtn" class="add-project-btn">
              <img src="./img/plus.png" alt="plus">
              <span>Add project</span>
            </button>
          </div>
          <div class="projects-list">
            ${
              appData.projects.length > 0
                ? appData.projects
                    .map(
                      (p) =>
                        `<div class="project-card">${templates.projectCard(
                          p,
                          true
                        )}</div>`
                    )
                    .join("")
                : "<p>There are no projects to display</p>"
            }
          </div>
        </div>
      </section>
    `;
  },

  about() {
    return `
      <section class="about-page-container container">
        <div class="about-page-wrapper wrapper">
          <img src="${appData.about.photo}" alt="Profile" class="about-hero-img">
          <div class="about-text-section">
            <h2 class="section-title">My background</h2>
            <p>${appData.about.myBackground}</p>
          </div>
          <div class="about-text-section">
            <h2 class="section-title">My hobbies and interests</h2>
            <p>${appData.about.myHobbies}</p>
          </div>
          <div class="contact-redirect-container">
            <button id="goToContactBtn" class="contact-redirect-btn">
              <img class="contact-icon" src="./img/strzalka.png" alt="Arrow">Contact me
            </button>
          </div>
        </div>
      </section>
    `;
  },

  contact() {
    return `
      <section class="contact-section container">
        <div class="contact-wrapper wrapper">
          <h2 class="section-title">Contact me</h2>
          <form id="contactForm" class="contact-form" novalidate>
            <div class="form-group name-group">
              <label for="contactName">Name</label>
              <input type="text" id="contactName" placeholder="Your name">
              <span id="nameError" class="error-msg"></span>
            </div>
            <div class="form-group email-group">
              <label for="contactEmail">Email</label>
              <input type="email" id="contactEmail" placeholder="email@example.com">
              <span id="emailError" class="error-msg"></span>
            </div>
            <div class="form-group message-group">
              <label for="contactMessage">Message</label>
              <textarea id="contactMessage" placeholder="Hello, my name is..."></textarea>
              <span id="msgError" class="error-msg"></span>
            </div>
            <div class="form-submit-container">
              <button type="submit" class="contact-submit-btn">Send message</button>
            </div>
          </form>
        </div>
      </section>
    `;
  },

  messages() {
    return `
      <section class="messages-section container">
        <div class="messages-wrapper wrapper">
          <div class="messages-list">
            ${
              appData.messages.length > 0
                ? appData.messages
                    .map(
                      (m) => `
                  <ul class="message-items">
                    <li class="message-row"><strong>Name:</strong> ${m.name}</li>
                    <li class="message-row"><strong>Email:</strong> ${m.email}</li>
                    <li class="message-row"><strong>Message:</strong> ${m.message}</li>
                  </ul>
                `
                    )
                    .join("")
                : "<p>No messages yet.</p>"
            }
          </div>
        </div>
      </section>
    `;
  },
};

// === EVENT DELEGATION ===
const eventManager = {
  init() {
    // Global nav & hamburger
    document.addEventListener("click", (e) => {
      const navBtn = e.target.closest(".nav-btn");
      if (navBtn) {
        e.preventDefault();
        navigation.setPage(navBtn.dataset.page);
        return;
      }

      const hamburger = e.target.closest(".hamburger");
      if (hamburger) {
        navigation.toggleMenu();
        return;
      }

      const prevBtn = e.target.closest("#prevBtn");
      if (prevBtn) {
        carousel.prev();
        return;
      }

      const nextBtn = e.target.closest("#nextBtn");
      if (nextBtn) {
        carousel.next();
        return;
      }

      const deleteBtn = e.target.closest(".delete-btn");
      if (deleteBtn) {
        projects.delete(Number(deleteBtn.dataset.id));
        return;
      }

      const addBtn = e.target.closest("#addProjectBtn");
      if (addBtn) {
        modal.open();
        return;
      }

      const contactBtn = e.target.closest("#goToContactBtn");
      if (contactBtn) {
        navigation.setPage("Contact");
        return;
      }

      const closeModal = e.target.closest("#closeModal");
      if (closeModal) {
        modal.close();
        return;
      }
    });

    // Form submissions
    document.addEventListener("submit", (e) => {
      if (e.target.id === "contactForm") {
        e.preventDefault();
        forms.submitContact(e.target);
      }
      if (e.target.id === "addProjectForm") {
        e.preventDefault();
        forms.submitProject(e.target);
      }
    });

    // Real-time validation
    document.addEventListener("input", (e) => {
      const contactFields = {
        contactName: "name",
        contactEmail: "email",
        contactMessage: "message",
        newTitle: "title",
        newTech: "technologies",
      };

      if (contactFields[e.target.id]) {
        const validatorName = contactFields[e.target.id];
        const error = validators[validatorName](e.target.value);
        const errorId = {
          name: "nameError",
          email: "emailError",
          message: "msgError",
          title: "titleError",
          technologies: "techError",
        }[validatorName];
        utils.setFieldError(e.target.id, errorId, error || "");
      }
    });
  },
};

// === CAROUSEL ===
const carousel = {
  prev() {
    state.carouselIndex =
      (state.carouselIndex - 1 + appData.projects.length) %
      appData.projects.length;
    render.main();
  },

  next() {
    state.carouselIndex = (state.carouselIndex + 1) % appData.projects.length;
    render.main();
  },
};

// === PROJECTS ===
const projects = {
  delete(id) {
    appData.projects = appData.projects.filter((p) => p.id !== id);
    render.main();
  },

  add(title, tech) {
    appData.projects.push({
      id: Date.now(),
      title,
      tech: utils.formatTech(tech),
    });
  },
};

// === FORMS ===
const forms = {
  submitContact(form) {
    const nameInput = document.getElementById("contactName");
    const emailInput = document.getElementById("contactEmail");
    const messageInput = document.getElementById("contactMessage");

    const nameError = validators.name(nameInput.value);
    const emailError = validators.email(emailInput.value);
    const messageError = validators.message(messageInput.value);

    utils.setFieldError("contactName", "nameError", nameError || "");
    utils.setFieldError("contactEmail", "emailError", emailError || "");
    utils.setFieldError("contactMessage", "msgError", messageError || "");

    if (!nameError && !emailError && !messageError) {
      appData.messages.push({
        id: Date.now(),
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        message: messageInput.value.trim(),
      });

      form.reset();
      [nameInput, emailInput, messageInput].forEach((el) =>
        el.classList.remove("input-error")
      );

      // Success message
      DOM.main.innerHTML = `
        <div class="container">
          <h2 class="section-title"">Message sent!</h2>
          <p class="about-desc">Thank you, your message has been saved.</p>
          <button class="contact-submit-btn"onclick="navigation.setPage('Home')">
            Return to Home
          </button>
        </div>
      `;
    }
  },

  submitProject(form) {
    const titleInput = document.getElementById("newTitle");
    const techInput = document.getElementById("newTech");

    const titleError = validators.title(titleInput.value);
    const techError = validators.technologies(techInput.value);

    utils.setFieldError("newTitle", "titleError", titleError || "");
    utils.setFieldError("newTech", "techError", techError || "");

    if (!titleError && !techError) {
      projects.add(titleInput.value, techInput.value);
      modal.close();
      render.main();
    }
  },
};

// === MODAL ===
const modal = {
  open() {
    document.body.insertAdjacentHTML(
      "beforeend",
      `
      <div id="modalOverlay" class="modal-overlay">
        <div class="modal-window">
          <button id="closeModal" class="close-x">&times;</button>
          <form id="addProjectForm" class="modal-form">
            <div class="form-row">
              <label for="newTitle">Project title</label>
              <div class="input-wrapper">
                <input type="text" id="newTitle" placeholder="Project title">
                <span id="titleError" class="error-msg"></span>
              </div>
            </div>
            <div class="form-row">
              <label for="newTech">Technologies</label>
              <div class="input-wrapper">
                <input type="text" id="newTech" placeholder="HTML, CSS, JS">
                <span id="techError" class="error-msg"></span>
              </div>
            </div>
            <button type="submit" class="modal-submit-btn">
              <img src="./img/plus.png" alt="plus"> Add project
            </button>
          </form>
        </div>
      </div>
    `
    );
    document.body.style.overflow = "hidden";
  },

  close() {
    document.getElementById("modalOverlay")?.remove();
    document.body.style.overflow = "auto";
  },
};

// === NAVIGATION ===
const navigation = {
  setPage(page) {
    state.currentPage = page;
    state.menuIsOpen = false;
    state.carouselIndex = 0;
    render.all();
  },

  toggleMenu() {
    state.menuIsOpen = !state.menuIsOpen;
    render.nav();
  },
};

// === RENDER ===
const render = {
  nav() {
    DOM.nav.innerHTML = templates.nav();
  },

  header() {
    DOM.header.innerHTML = templates.header();
  },

  footer() {
    DOM.footer.innerHTML = templates.footer();
  },

  main() {
    const pageRenderer = pages[state.currentPage.toLowerCase()];
    if (pageRenderer) {
      DOM.main.innerHTML = pageRenderer();
    }
  },

  all() {
    this.nav();
    this.header();
    this.main();
    this.footer();
  },
};

// === INIT ===
eventManager.init();
render.all();
