let appData = {
  navItems: ["Home", "Projects", "About", "Contact", "Messages"],
  header: {
    name: "Marek Witkowski",
    title: "web - designer",
  },
  about: {
    photo: "./img/IMG_0826.jpg",
    about:
      "Aspirujący programista i konsultant IT, który łączy techniczne zacięcie z marketingowym wyczuciem. Pomagam firmom optymalizować procesy technologiczne oraz tworzę materiały promocyjne, które skutecznie budują wizerunek marki. Moim celem jest dostarczanie rozwiązań, które pozwolą Twojemu biznesowi w pełni rozwinąć skrzydła i zyskać przewagę na cyfrowym rynku.",
    myBackground:
      "Ukończyłem studia wyższe na kierunku Informatyka Stosowana na Politechnice Warszawskiej, gdzie zdobyłem solidne podstawy teoretyczne i praktyczne w dziedzinie programowania oraz technologii informatycznych.",
    myHobbies:
      "Poza światem programowania, interesuje się tworzeniem projektów 3D w programie Fusion 360, regularnie dbam o swoje zdrowie na siłowni, chętnie podróżuję, a także rozwijam swoje umiejętności kulinarne.",
    skills: [
      { name: "HTML", yearsOfExperience: 5, img: "./IMG/HTML5.png" },
      { name: "CSS", yearsOfExperience: 5, img: "./IMG/symbol.png" },
      { name: "JS", yearsOfExperience: 5, img: "./IMG/Javascript.png" },
      { name: "Git", yearsOfExperience: 1, img: "./IMG/Shape.png" },
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
  footer: {
    email: "marek.witkowski96@icloud.com",
    phone: "+48 123 456 789",
  },
  messages: [],
};

const navElement = document.getElementById("nav");
const headerElement = document.getElementById("header");
const mainElement = document.getElementById("main");
const footerElement = document.getElementById("footer");

let currentPage = "Home";
let menuIsOpen = false;
let carouselIndex = 0;

// --- POMOCNICZE GENERATORY ---

function generateNavItems() {
  return appData.navItems
    .map(
      (navItem) => `
      <li>
        <button class="nav-btn ${
          currentPage === navItem ? "active" : ""
        }" data-page="${navItem}"> 
           ${navItem}
        </button>
      </li>`
    )
    .join("");
}

function generateProjectCard(project, showDelete = false) {
  const techStack = project.tech.map((t) => `<li>${t}</li>`).join("");
  const deleteBtn = showDelete
    ? `<button class="delete-btn" data-id="${project.id}"><img src="./img/delete.png" alt="delete"></button>`
    : "";

  return `
    <div class="project-card">
      ${deleteBtn}
      <div class="project-details">
          <h3 class="project-title">${project.title}</h3>
          <ul class="project-card-tech-list">${techStack}</ul>
      </div>
    </div>`;
}

// --- GENERATORY TREŚCI (ZWRACAJĄ STRINGI HTML) ---

function getHomeAboutSectionHTML() {
  const skills = appData.about.skills
    .map((skill) => {
      let dots = "";
      for (let i = 0; i < 5; i++) {
        dots += `<span class="${
          i < skill.yearsOfExperience ? "filled" : "empty"
        }"></span>`;
      }
      return `
      <div class="skill-item">
        <img src="${skill.img}" alt="${skill.name}" class="skill-img">
        <div class="skill-info">
          <div class="skill-row">
            <span class="skill-name">${skill.name}</span>
            <div class="dots-container">${dots}</div>
            <span class="experience-years">${skill.yearsOfExperience} years</span>
          </div>
        </div>
      </div>`;
    })
    .join("");

  return `
    <section id="about" class="about-section container">
      <div class="about-container wrapper">
          <img src="${appData.about.photo}" class="about-photo">
          <h2 class="about-heading heading">About me</h2>
          <p class="about-desc">${appData.about.about}</p>
          <div class="skills-container">
            <h2 class="skills-heading heading">My Skills</h2>
            <div class="skills-list">${skills}</div>
          </div>
      </div>
    </section>`;
}

function getHomeCarouselSectionHTML() {
  const count = appData.projects.length;
  if (count === 0)
    return `<section class="container"><p>No projects to show.</p></section>`;

  let displayed = [];
  const toShow = Math.min(3, count);
  for (let i = 0; i < toShow; i++) {
    displayed.push(appData.projects[(carouselIndex + i) % count]);
  }

  const projectsHTML = displayed
    .map((p) => generateProjectCard(p, false))
    .join("");
  const controls =
    count > 3
      ? `
    <div class="carousel-controls">
        <button class="arrow prev" id="prevBtn"><img src="./img/strzalka.png" class="arrow-icon arrow-prev"></button>
        <button class="arrow next" id="nextBtn"><img src="./img/strzalka.png" class="arrow-icon arrow-next"></button>
    </div>`
      : "";

  return `
    <section id="projects" class="projects-section">
      <div class="projects-section-wrapper wrapper">
          <div class="carousel-box">
              <div class="projects-list">${projectsHTML}</div>
              ${controls}
          </div>
      </div>
    </section>`;
}

function getAboutPageHTML() {
  return `
    <section class="about-page-container container">
      <div class="about-page-wrapper wrapper">
         <img src="${appData.about.photo}" alt="Profile" class="about-hero-img">
         <div class="about-text-section"><h2>My background</h2><p>${appData.about.myBackground}</p></div>
         <div class="about-text-section"><h2>My hobbies and interests</h2><p>${appData.about.myHobbies}</p></div>
         <div class="contact-redirect-container">
            <button id="goToContactBtn" class="contact-redirect-btn">
              <img src="./img/strzalka.png" class="contact-icon">Contact me
            </button>
         </div>
      </div>
    </section>`;
}

function getProjectsPageHTML() {
  const projectsHTML = appData.projects
    .map((p) => generateProjectCard(p, true))
    .join("");
  return `
    <section class="projects-section container">
      <div class="projects-wrapper wrapper">
        <div class="add-project-container">
          <button id="addProjectBtn" class="add-project-btn">
            <img src="./img/plus.png" class="add-icon"><span>Add project</span>
          </button>
        </div>
        <div class="projects-list">${
          projectsHTML || "<p>No projects to display.</p>"
        }</div>
      </div>
    </section>`;
}

function getContactPageHTML() {
  return `
    <section class="contact-section container">
      <div class="contact-wrapper wrapper">
        <h2 class="contact-main-heading">Contact me</h2>
        <form id="contactForm" class="contact-form" novalidate>
          <div class="form-group"><label>Name</label><input type="text" id="contactName"><span id="nameError" class="error-msg"></span></div>
          <div class="form-group"><label>Email</label><input type="email" id="contactEmail"><span id="emailError" class="error-msg"></span></div>
          <div class="form-group message-group"><label>Message</label><textarea id="contactMessage"></textarea><span id="msgError" class="error-msg"></span></div>
          <div class="form-submit-container"><button type="submit" class="contact-submit-btn">Send message</button></div>
        </form>
      </div>
    </section>`;
}

function getMessagesPageHTML() {
  const list = appData.messages
    .map(
      (m) => `
    <div class="message-item">
      <div class="message-row"><strong>Name:</strong> ${m.name}</div>
      <div class="message-row"><strong>Email:</strong> ${m.email}</div>
      <div class="message-row"><strong>Message:</strong> ${m.message}</div>
    </div>`
    )
    .join("");
  return `
    <section class="messages-section container">
      <div class="messages-wrapper wrapper">
        <div class="messages-list">${list || "<p>No messages yet.</p>"}</div>
      </div>
    </section>`;
}

// --- LOGIKA I EVENTY ---

function attachNavListeners() {
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.onclick = (e) => {
      e.preventDefault();
      setPage(btn.dataset.page);
    };
  });
  const burger = document.querySelector(".hamburger");
  if (burger) burger.onclick = toggleMenu;
}

function attachPageListeners() {
  if (currentPage === "Home" && appData.projects.length > 3) {
    document.getElementById("prevBtn").onclick = () => moveCarousel(-1);
    document.getElementById("nextBtn").onclick = () => moveCarousel(1);
  }
  if (currentPage === "About") {
    document.getElementById("goToContactBtn").onclick = () =>
      setPage("Contact");
  }
  if (currentPage === "Projects") {
    document.getElementById("addProjectBtn").onclick = openAddProjectModal;
    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.onclick = () => deleteProject(Number(btn.dataset.id));
    });
  }
  if (currentPage === "Contact") {
    document.getElementById("contactForm").onsubmit = handleContactSubmit;
  }
}

// --- MODAL I FORMULARZE ---

function openAddProjectModal() {
  const modalHTML = `
    <div id="modalOverlay" class="modal-overlay">
      <div class="modal-window">
        <button id="closeModal" class="close-x">&times;</button>
        <form id="addProjectForm" class="modal-form">
          <div class="form-row">
            <label for="newTitle">Project title</label>
            <div class="input-wrapper">
              <input type="text" id="newTitle">
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
          <button type="submit" class="modal-submit-btn">Add project</button>
        </form>
      </div>
    </div>`;
  document.body.insertAdjacentHTML("beforeend", modalHTML);
  document.body.style.overflow = "hidden";
  document.getElementById("closeModal").onclick = closeModal;
  document.getElementById("addProjectForm").onsubmit = handleAddProject;
}

function handleAddProject(e) {
  e.preventDefault();
  const titleVal = document.getElementById("newTitle").value.trim();
  const techVal = document.getElementById("newTech").value.trim();
  const titleErr = document.getElementById("titleError");
  const techErr = document.getElementById("techError");

  let isValid = true;
  if (titleVal.length < 3) {
    titleErr.innerText = "The title must be at least 3 characters long.";
    isValid = false;
  } else if (titleVal.length > 30) {
    titleErr.innerText = "The title must not exceed 30 characters.";
    isValid = false;
  } else titleErr.innerText = "";

  if (!techVal) {
    techErr.innerText = "Please add some technologies.";
    isValid = false;
  } else techErr.innerText = "";

  if (isValid) {
    appData.projects.push({
      id: Date.now(),
      title: titleVal,
      tech: techVal.split(/[-]+/).filter((t) => t !== ""),
    });
    closeModal();
    display();
  }
}

function handleContactSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("contactName").value.trim();
  const email = document.getElementById("contactEmail").value.trim();
  const msg = document.getElementById("contactMessage").value.trim();

  if (name.length >= 3 && email.includes("@") && msg) {
    appData.messages.push({ id: Date.now(), name, email, message: msg });
    mainElement.innerHTML = `<div class="container" style="text-align:center; padding:100px;"><h2>Message sent!</h2><button class="contact-submit-btn" onclick="setPage('Home')">Home</button></div>`;
  }
}

// --- FUNKCJE SYSTEMOWE ---

function closeModal() {
  const modal = document.getElementById("modalOverlay");
  if (modal) modal.remove();
  document.body.style.overflow = "auto";
}

function toggleMenu() {
  menuIsOpen = !menuIsOpen;
  displayNav();
  attachNavListeners();
}

function setPage(page) {
  currentPage = page;
  menuIsOpen = false;
  carouselIndex = 0;
  display();
}

function moveCarousel(dir) {
  carouselIndex =
    (carouselIndex + dir + appData.projects.length) % appData.projects.length;
  display();
}

function deleteProject(id) {
  appData.projects = appData.projects.filter((p) => p.id !== id);
  display();
}

function displayNav() {
  navElement.innerHTML = `
    <div class="nav-wrapper">
      <div class="logo">
          <img src="./img/smallITP.png" class="logo-mobile"><img src="./img/bigITP.png" class="logo-desktop">
      </div>
      <nav class="nav-list-container ${menuIsOpen ? "show" : ""}">
        <ul class="nav-list">${generateNavItems()}</ul>
      </nav>
      <button class="hamburger ${menuIsOpen ? "open" : ""}">
          <div class="bar"></div><div class="bar"></div><div class="bar"></div>
      </button>
    </div>`;
}

function displayHeader() {
  const headerContentMap = {
    Home: { title: appData.header.name, subtitle: appData.header.title },
    Projects: { title: "MY PROJECTS", subtitle: "Made with love" },
    About: { title: "ABOUT ME", subtitle: `IT'S A-ME!` },
    Contact: { title: "CONTACT ME", subtitle: "Say hello" },
    Messages: { title: "MESSAGES", subtitle: "Incoming inbox" },
  };
  const current = headerContentMap[currentPage] || headerContentMap["Home"];
  headerElement.innerHTML = `
    <div class="header container">
      <h1 class="header-heading ${
        currentPage !== "Home" ? "projects-title" : ""
      }">${current.title}</h1>
      <span class="header-subtitle">${current.subtitle}</span>
    </div>`;
}

function displayFooter() {
  footerElement.innerHTML = `
    <div class="footer-container">
        <nav class="footer-nav"><ul class="footer-nav-list">${generateNavItems()}</ul></nav>
        <div class="footer-info">
            <div class="footer-contact">
                <a href="mailto:${appData.footer.email}">${
    appData.footer.email
  }</a>
                <a href="tel:${appData.footer.phone}">${
    appData.footer.phone
  }</a>
            </div>
            <div class="footer-logo">ITPortfolio &copy; 2026</div>
        </div>
    </div>`;
}

function display() {
  displayNav();
  displayHeader();

  let content = "";
  switch (currentPage) {
    case "Home":
      content = getHomeAboutSectionHTML() + getHomeCarouselSectionHTML();
      break;
    case "Projects":
      content = getProjectsPageHTML();
      break;
    case "About":
      content = getAboutPageHTML();
      break;
    case "Contact":
      content = getContactPageHTML();
      break;
    case "Messages":
      content = getMessagesPageHTML();
      break;
  }

  mainElement.innerHTML = content;
  attachPageListeners();
  displayFooter();
  attachNavListeners();
}

display();
