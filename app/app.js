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
      "Ukończyłem studia wyższe na kierunku Informatyka Stosowana na Politechnice Warszawskiej, gdzie zdobyłem solidne podstawy teoretyczne i praktyczne w dziedzinie programowania oraz technologii informatycznych. Podczas studiów aktywnie uczestniczyłem w projektach zespołowych, co pozwoliło mi rozwinąć umiejętności współpracy i zarządzania czasem. Poza uczelnią, samodzielnie pogłębiałem swoją wiedzę poprzez kursy online i praktyczne projekty, co umożliwiło mi zdobycie doświadczenia w tworzeniu stron internetowych i aplikacji.",
    myHobbies:
      "Poza światem programowania, interesuje się tworzeniem projektów 3D w programie Fusion 360, regularnie dbam o swoje zdrowie na siłowni, chętnie podróżuję, a także rozwijam swoje umiejętności kulinarne, eksperymentując z różnymi kuchniami świata.",
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
  messages: [], // Lista pusta na starcie
};
const navElement = document.getElementById("nav");
const headerElement = document.getElementById("header");
const mainElement = document.getElementById("main");
const footerElement = document.getElementById("footer");

let currentPage = "Home";
let menuIsOpen = false;
let carouselIndex = 0;

function generateNavItems() {
  return appData.navItems
    .map(
      (navItem) /*html*/ =>
        `<li>
          <button class="nav-btn ${currentPage === navItem ? "active" : ""}" 
                  data-page="${navItem}"> 
             ${navItem}
          </button>
        </li>`
    )
    .join("");
}
function generateProjectCard(project, showDelete = false) {
  const techStack = project.tech.map((t) => `<li>${t}</li>`).join("");
  const deleteBtn = showDelete
    ? `<button class="delete-btn" data-id="${project.id}">
         <img src="./img/delete.png" alt="delete">
       </button>`
    : "";

  return /* html */ `
    <div class="project-card">
      ${deleteBtn}
      <div class="project-details">
          <h3 class="project-title">${project.title}</h3>
          <ul class="project-card-tech-list">${techStack}</ul>
      </div>
    </div>`;
}
function attachNavListeners() {
  const buttons = document.querySelectorAll(".nav-btn");
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const page = button.getAttribute("data-page");
      setPage(page);
    });
  });

  const hamburger = document.querySelector(".hamburger");
  if (hamburger) {
    hamburger.removeEventListener("click", toggleMenu);
    hamburger.addEventListener("click", toggleMenu);
  }
}

function displayNav() {
  navElement.innerHTML = /* html */ `
    <div class="nav-wrapper">
      <div class="logo">
          <img src="./img/smallITP.png" class="logo-mobile" alt="logo">
          <img src="./img/bigITP.png" class="logo-desktop" alt="logo">
      </div>
      
      <nav class="nav-list-container ${menuIsOpen ? "show" : ""}">
        <ul class="nav-list">
            ${generateNavItems()}
        </ul>
      </nav>

      <button class="hamburger ${
        menuIsOpen ? "open" : ""
      }" aria-label="Toggle menu">
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
      </button>
    </div>
  `;
}

function displayHeader() {
  const firstName = appData.header.name.split(" ")[0].toUpperCase();

  const headerContentMap = {
    Home: { title: appData.header.name, subtitle: appData.header.title },
    Projects: { title: "MY PROJECTS", subtitle: "Made with love" },
    About: { title: "ABOUT ME", subtitle: `IT'S A-ME, ${firstName}!` },
    Contact: { title: "CONTACT ME", subtitle: "Say hello to me" },
    Messages: {
      title: "MESSAGES",
      subtitle: "Message from the interested person",
    },
  };

  const current = headerContentMap[currentPage] || headerContentMap["Home"];

  headerElement.innerHTML = /* html */ `
      <div class="header container">
        <h1 class="header-heading ${
          currentPage !== "Home" ? "projects-title" : ""
        }">
            ${current.title}
        </h1>
        <span class="header-subtitle">${current.subtitle}</span>
      </div>`;
}

function displayFooter() {
  footerElement.innerHTML = /* html */ `
    <div class="footer-container">
        <nav class="footer-nav">
            <ul class="footer-nav-list">
                ${generateNavItems()}
            </ul>
        </nav>
        <div class="footer-info">
            <div class="footer-contact">
                <a href="mailto:${appData.footer.email}">${
    appData.footer.email
  }</a>
                <a href="tel:${appData.footer.phone}">${
    appData.footer.phone
  }</a>
            </div>
            <div class="footer-logo">
                <span class="gold">ITP</span>ortfolio <span class="white">&copy; 2026</span>
            </div>
        </div>
    </div>`;
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
function displayAboutSection() {
  const skills = appData.about.skills
    .map((skill) => {
      let yearsOfExperience = "";
      for (let i = 0; i < 5; i++) {
        const fill = i < skill.yearsOfExperience ? "filled" : "empty";
        yearsOfExperience += `<span class="${fill}"></span>`;
      }
      return /* html */ `
      <div class="skill-item">
        <img src="${skill.img}" alt="${skill.name}" class="skill-img">
        <div class="skill-info">
          <div class="skill-row">
            <span class="skill-name">${skill.name}</span>
            <div class="dots-container">${yearsOfExperience}</div>
            <span class="experience-years">${skill.yearsOfExperience} years</span>
          </div>
        </div>
      </div>`;
    })
    .join("");

  return /* html */ `
  <section id="about" class="about-section container">
      <div class="about-container about-wrapper wrapper">
          <img src="${appData.about.photo}" class="about-photo">
          <h2 class="about-heading heading">About me</h2>
          <p class="about-desc">${appData.about.about}</p>
          <div class="skills-container">
          <h2 class="skills-heading heading">My Skills</h2>
          <div class="skills-list">${skills}</div>
      </div>
      </div>
    </section>
  `;
}

function displayCarouselSection() {
  const projectsCount = appData.projects.length;
  if (projectsCount === 0) {
    return /* html */ `
      <section class="projects-section container">
        <p class="empty-msg">No projects to show.</p>
      </section>`;
  }

  let displayedProjects = [];
  const cardsToShow = Math.min(3, projectsCount);

  for (let i = 0; i < cardsToShow; i++) {
    let index = (carouselIndex + i) % projectsCount;
    displayedProjects.push(appData.projects[index]);
  }

  const projectsHTML = displayedProjects
    .map((project) => generateProjectCard(project, false))
    .join("");

  const controlButtons =
    projectsCount > 3
      ? /* html */ `
    <div class="carousel-controls">
        <button class="arrow prev" id="prevBtn">
           <img src="./img/strzalka.png" class="arrow-icon arrow-prev" alt="poprzedni">
        </button>
        <button class="arrow next" id="nextBtn">
           <img src="./img/strzalka.png" class="arrow-icon arrow-next" alt="następny">
        </button>
    </div>`
      : "";

  return /* html */ `
    <section id="projects" class="projects-section">
    <div class="projects-section-wrapper">
        <div class="carousel-box">
            <div class="projects-list">${projectsHTML}</div>
            ${controlButtons}
        </div>
    </div>
    </section>`;
}

function moveCarousel(direction) {
  const projectsCount = appData.projects.length;
  carouselIndex = (carouselIndex + direction + projectsCount) % projectsCount;
  display();
}

function renderAboutPage() {
  const photo = appData.about.photo;
  const bg = appData.about.myBackground;
  const hobby = appData.about.myHobbies;

  mainElement.innerHTML = /* html */ `
    <section class="about-page-container container">
    <div class="about-page-wrapper wrapper">
       <img src="${photo}" alt="Profile" class="about-hero-img">
       <div class="about-text-section">
          <h2>My background</h2>
          <p>${bg}</p>
       </div>
       <div class="about-text-section">
          <h2>My hobbies and interests</h2>
          <p>${hobby}</p>
       </div>
       <div class="contact-redirect-container">
          <button id="goToContactBtn" class="contact-redirect-btn">
          <img src="./img/strzalka.png" alt="Przycisk przekierowujacy do kontaktu" class="contact-icon">Contact me
          </button>
       </div>
    </div>
    </section>
  `;

  const contactBtn = document.getElementById("goToContactBtn");
  if (contactBtn) contactBtn.onclick = () => setPage("Contact");
}

function renderProjectsPage() {
  const allProjectsHTML = appData.projects
    .map((project) => generateProjectCard(project, true))
    .join("");

  mainElement.innerHTML = /* html */ `
    <section class="projects-section container">
    <div class="about wrapper">
      <div class="add-project-container">
        <button id="addProjectBtn" class="add-project-btn">
          <img src="./img/plus.png" alt="plus" class="add-icon">
          <span>Add project</span>
        </button>
      </div>

        <div class="projects-list">
        ${
          appData.projects.length > 0
            ? allProjectsHTML
            : "<p>No projects to display.</p>"
        }
        </div>
      </div>
    </section>
  `;

  document.getElementById("addProjectBtn").onclick = openAddProjectModal;

  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((btn) => {
    btn.onclick = () => {
      deleteProject(Number(btn.dataset.id));
    };
  });
}

function renderContactPage() {
  mainElement.innerHTML = /* html */ `
    <section class="contact-section container">
      <div class="contact-wrapper wrapper">
        <h2 class="contact-main-heading">Contact me</h2>
        <form id="contactForm" class="contact-form" novalidate>
          <div class="form-group name-group">
            <label for="contactName">Name</label>
            <input type="text" id="contactName" placeholder="Your Name">
            <span id="nameError" class="error-msg"></span>
          </div>

          <div class="form-group email-group">
            <label for="contactEmail">Email</label>
            <input type="email" id="contactEmail" placeholder="email@example.com">
            <span id="emailError" class="error-msg"></span>
          </div>

          <div class="form-group message-group">
            <label for="contactMessage">Message</label>
            <textarea id="contactMessage" placeholder="Hello, my name is . . . " rows="1"></textarea>
            <span id="msgError" class="error-msg"></span>
          </div>

          <div class="form-submit-container">
            <button type="submit" class="contact-submit-btn">Send message</button>
          </div>
        </form>
      </div>
    </section>
  `;

  document.getElementById("contactForm").onsubmit = handleContactSubmit;
}

function renderMessagesPage() {
  const messagesHTML = appData.messages
    .map(
      (msg) => /* html */ `
    <div class="message-item">
      <div class="message-row"><strong>Name:</strong> ${msg.name}</div>
      <div class="message-row"><strong>Email:</strong> ${msg.email}</div>
      <div class="message-row"><strong>Message:</strong> ${
        msg.message || msg.text
      }</div>
    </div>`
    )
    .join("");

  mainElement.innerHTML = /* html */ `
    <section class="messages-section container">
    <div class="messages-wrapper wrapper">
      <div class="messages-list">
        ${
          appData.messages.length > 0
            ? messagesHTML
            : '<p class="empty-state-msg">No messages yet. Send one from the Contact page!</p>'
        }
      </div>
    </div>
    </section>
  `;
}

function deleteProject(id) {
  appData.projects = appData.projects.filter((p) => p.id !== id);
  display();
}

function openAddProjectModal() {
  const modalHTML = /* html */ `
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
                <input type="text" id="newTech" placeholder="html-css-javascript">
                <span id="techError" class="error-msg"></span>
            </div>
          </div>
          <button type="submit" class="modal-submit-btn">
            <img src="./img/plus.png" alt="plus"> Add project
          </button>
        </form>
      </div>
    </div>
  `;

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
  } else {
    titleErr.innerText = "";
  }

  if (techVal === "") {
    techErr.innerText = "Please add some technologies.";
    isValid = false;
  } else {
    techErr.innerText = "";
  }

  if (isValid) {
    const newProject = {
      id: Date.now(),
      title: titleVal,
      tech: techVal
        .split(/[-]+/)
        .map((t) => t.trim())
        .filter((t) => t !== ""),
    };
    appData.projects.push(newProject);
    closeModal();
    display();
  }
}

function handleContactSubmit(e) {
  e.preventDefault();

  const nameInput = document.getElementById("contactName");
  const emailInput = document.getElementById("contactEmail");
  const msgInput = document.getElementById("contactMessage");

  const nameErr = document.getElementById("nameError");
  const emailErr = document.getElementById("emailError");
  const msgErr = document.getElementById("msgError");

  const colorError = "#d93025";
  const colorDefault = "var(--main-color)";

  [nameInput, emailInput, msgInput].forEach(
    (el) => (el.style.borderBottomColor = colorDefault)
  );
  [nameErr, emailErr, msgErr].forEach((el) => (el.innerText = ""));

  let isValid = true;

  const nameVal = nameInput.value.trim();
  if (nameVal.length < 3) {
    nameErr.innerText = "The name must be at least 3 characters long.";
    nameInput.style.borderBottomColor = colorError;
    isValid = false;
  } else if (nameVal.length > 20) {
    nameErr.innerText = "The name must not exceed 20 characters.";
    nameInput.style.borderBottomColor = colorError;
    isValid = false;
  }

  const emailVal = emailInput.value.trim();
  const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegexp.test(emailVal)) {
    emailErr.innerText = "Please enter a valid email address.";
    emailInput.style.borderBottomColor = colorError;
    isValid = false;
  }

  const msgVal = msgInput.value.trim();
  if (msgVal === "") {
    msgErr.innerText = "The message cannot be empty.";
    msgInput.style.borderBottomColor = colorError;
    isValid = false;
  } else if (msgVal.length > 100) {
    msgErr.innerText = "The message must not exceed 100 characters.";
    msgInput.style.borderBottomColor = colorError;
    isValid = false;
  }

  if (isValid) {
    appData.messages.push({
      id: Date.now(),
      name: nameVal,
      email: emailVal,
      message: msgVal,
      date: new Date().toLocaleString(),
    });

    mainElement.innerHTML = /* html */ `
      <div class="container" style="text-align: center; padding: 100px 0;">
        <h2 class="contact-main-heading" style="margin-bottom: 20px;">Message sent!</h2>
        <p class="about-desc">Thank you ${nameVal}, your message has been saved.</p>
        <button class="contact-submit-btn" style="margin-top: 40px;" onclick="setPage('Home')">
          Return to Home
        </button>
      </div>
    `;
    console.log("Database updated:", appData.messages);
  }
}

function closeModal() {
  const modal = document.getElementById("modalOverlay");
  if (modal) modal.remove();
  document.body.style.overflow = "auto";
}

// --- GŁÓWNA FUNKCJA RENDERUJĄCA ---

function display() {
  displayNav();
  displayHeader();

  mainElement.innerHTML = "";

  switch (currentPage) {
    case "Home":
      const aboutHTML = displayAboutSection();
      const projectsHTML = displayCarouselSection();
      mainElement.innerHTML = aboutHTML + projectsHTML;

      if (appData.projects.length > 3) {
        const prev = document.getElementById("prevBtn");
        const next = document.getElementById("nextBtn");
        if (prev) prev.onclick = () => moveCarousel(-1);
        if (next) next.onclick = () => moveCarousel(1);
      }
      break;

    case "Projects":
      renderProjectsPage();
      break;

    case "About":
      renderAboutPage();
      break;

    case "Contact":
      renderContactPage();
      break;

    case "Messages":
      renderMessagesPage();
      break;
  }

  displayFooter();
  attachNavListeners();
}

display();
