// Dane aplikacji webowej.
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

// Wyniesienie elementow DOM
const navElement = document.getElementById("nav");
const headerElement = document.getElementById("header");
const mainElement = document.getElementById("main");
const footerElement = document.getElementById("footer");

//Domyslne ustawienia aplikacji
let currentPage = "Home";
let menuIsOpen = false;
let carouselIndex = 0;

// Funkcj generujaca nawigacje
function generateNavItems() {
  return appData.navItems
    .map(
      (navItem) /*html*/ =>
        `<button class="nav-btn ${currentPage === navItem ? "active" : ""}" 
                 data-page="${navItem}"> 
            ${navItem}
        </button>`
    )
    .join("");
}

//Funkcja generujaca projekty
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
// Event listenery na buttony nawigacji
function attachNavListeners() {
  const buttons = document.querySelectorAll(".nav-btn");
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const page = button.getAttribute("data-page");
      setPage(page);
    });
  });

  // Obsługa menu hamburgerowego
  const hamburger = document.querySelector(".hamburger");
  if (hamburger) {
    hamburger.addEventListener("click", toggleMenu);
  }
}
//Wyswietlenie sekcji
function displayNav() {
  navElement.innerHTML = /* html */ `
    <div class="logo">
        <img src="./img/smallITP.png" class="logo-mobile" alt="logo">
        <img src="./img/bigITP.png" class="logo-desktop" alt="logo">
    </div>
    <button class="hamburger ${
      menuIsOpen ? "open" : ""
    }" aria-label="Toggle menu">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
    </button>
    <div class="nav-list ${menuIsOpen ? "show" : ""}">
        ${generateNavItems()} </div>
  `;
  attachNavListeners();
}
function displayHeader() {
  let headerContent = "";

  if (currentPage === "Home") {
    headerContent = /*html*/ `
      <div class="header container">
        <h1 class="header-heading">${appData.header.name}</h1>
        <p class="header-subtitle">${appData.header.title}</p>
      </div>`;
  } else if (currentPage === "Projects") {
    headerContent = /*html*/ `
      <div class="header container">
        <h1 class="header-heading projects-title">MY PROJECTS</h1>
        <span class="header-subtitle">Made with love</span>
      </div>`;
  } else {
    headerContent = /*html*/ `
      <div class="header container">
        <h1 class="header-heading projects-title">${currentPage.toUpperCase()}</h1>
      </div>`;
  }

  headerElement.innerHTML = headerContent;
}
function toggleMenu() {
  menuIsOpen = !menuIsOpen;
  displayNav();
}
function setPage(page) {
  currentPage = page;
  menuIsOpen = false;
  carouselIndex = 0;
  display(); // Nie przypominam sobie, zebysmy poruszali to na kursie.
}
function getAboutHTML() {
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
      <div class="about-container wrapper">
          <img src="${appData.about.photo}" class="about-photo">
          <h2 class="about-heading heading">About me</h2>
          <p class="about-desc">${appData.about.about}</p>
      </div>
      <div class="skills-container wrapper">
          <h2 class="skills-heading heading">My Skills</h2>
          <div class="skills-list">${skills}</div>
      </div>
    </section>
  `;
}
function getProjectsCarouselHTML() {
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
        <div class="carousel-box">
            <div class="projects-list">${projectsHTML}</div>
            ${controlButtons}
        </div>
    </section>`;
}
function displayFooter() {
  footerElement.innerHTML = /* html */ `
    <div class="footer-container">
        <nav class="footer-nav">
            ${generateNavItems()} </nav>
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
                <span class="gold">ITP</span>ortfolio  <span class="white">&copy; 2026</span>
            </div>
        </div>
    </div>`;
}
function moveCarousel(direction) {
  const projectsCount = appData.projects.length;
  carouselIndex = (carouselIndex + direction + projectsCount) % projectsCount;
  display();
}
function renderProjectsPage() {
  const allProjectsHTML = appData.projects
    .map((project) => generateProjectCard(project, true))
    .join("");

  mainElement.innerHTML = /* html */ `
    <section class="projects-section container">
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
    </section>
  `;

  document.getElementById("addProjectBtn").onclick = openAddProjectModal;

  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((btn) => {
    btn.onclick = () => {
      const projectId = Number(btn.dataset.id);
      // POPRAWKA: Tylko deleteProject, bez dodatkowego display()
      deleteProject(projectId);
    };
  });
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
            <img src="./img/plus.png" alt="plus">
            Add project
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
        .split(/[ ,-]+/)
        .map((t) => t.trim())
        .filter((t) => t !== ""),
    };
    appData.projects.push(newProject);
    closeModal();
    display();
  }
}
function closeModal() {
  const modal = document.getElementById("modalOverlay");
  if (modal) modal.remove();
  document.body.style.overflow = "auto";
}
function display() {
  displayNav();
  displayHeader();

  // Czyścimy widok
  mainElement.innerHTML = "";

  if (currentPage === "Home") {
    const aboutHTML = getAboutHTML();
    const projectsHTML = getProjectsCarouselHTML();
    mainElement.innerHTML = aboutHTML + projectsHTML;

    if (appData.projects.length > 3) {
      document
        .getElementById("prevBtn")
        .addEventListener("click", () => moveCarousel(-1));
      document
        .getElementById("nextBtn")
        .addEventListener("click", () => moveCarousel(1));
    }
  } else if (currentPage === "Projects") {
    renderProjectsPage();
  }

  displayFooter();
  attachNavListeners();
}
display();
