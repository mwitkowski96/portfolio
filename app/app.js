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
  headerElement.innerHTML = /* html */ `
  <div class="header container">
    <h1 class="header-heading">${appData.header.name}</h1>
    <p class="header-paragraph">${appData.header.title}</p>
  </div>
  `;
}
function displayAbout() {
  const skills = appData.about.skills
    .map((skill) => {
      let yearsOfExperience = "";
      for (let i = 0; i < 5; i++) {
        const yearsOfExperienceFill =
          i < skill.yearsOfExperience ? "filled" : "empty";
        yearsOfExperience += /* html */ `<span class="${yearsOfExperienceFill}"></span>`;
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
      </div>
      `;
    })
    .join("");

  main.innerHTML += /* html */ `
  <section id="about" class="about-section container">
      <div class="about-container wrapper">
          <img src="${appData.about.photo}" class="about-photo">
          <h2 class="about-heading heading">About me</h2>
          <p class="about-desc">${appData.about.about}</p>
      </div>
      <div class="skills-container wrapper">
          <h2 class="skills-heading heading">My Skills</h2>
          <div class="skills-list">
            ${skills}
          </div>
      </div>
    </section>
  `;
}
function displayProjects() {
  const projectsCount = appData.projects.length;
  let displayedProjects = [];
  for (let i = 0; i < 3; i++) {
    let index = (carouselIndex + i) % projectsCount;
    displayedProjects.push(appData.projects[index]);
  }

  const myProjects = displayedProjects
    .map((project) => {
      const techStack = project.tech
        .map(
          (t) => /* html */ `
        <li>${t}</li>`
        )
        .join("");

      return /* html */ `
      <div class="project-card">
        <div class="project-details">
            <h3 class="project-title">${project.title}</h3>
            <ul class="project-card-tech-list">
                ${techStack}
            </ul>
        </div>
    </div>
      `;
    })
    .join("");

  const controlButtons =
    projectsCount > 3
      ? /* html */ `
    <div class="carousel-controls">
        <button class="arrow prev" id="prevBtn">
        <img src="./img/strzalka.png" class="arrow-icon arrow-prev" alt="ikonaStrzalkiDoPrzodu">
        </button>
        <button class="arrow next" id="nextBtn">
        <img src="./img/strzalka.png" class="arrow-icon arrow-next" alt="ikonaStrzalkiDoTylu"></button>
    </div>`
      : "";

  mainElement.innerHTML += /* html */ `
    <section id="projects" class="projects-section">
        <div class="carousel-box">
            <ul class="projects-list">${myProjects}</ul>
            ${controlButtons}
        </div>
    </section>`;

  if (projectsCount > 3) {
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener("click", () => moveCarousel(-1));
      nextBtn.addEventListener("click", () => moveCarousel(1));
    }
  }
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
function display() {
  displayNav();
  displayHeader();
  mainElement.innerHTML = "";
  if (currentPage === "Home") {
    displayAbout();
    displayProjects();
  }
  displayFooter();
  attachNavListeners();
}
display();
