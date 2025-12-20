// Podstawowe ustawienia aplikacji
let appData = {
  navItems: ["Home", "Projects", "About", "Contact", "Messages"],
  header: {
    name: "Marek Witkowski",
    title: "web-designer",
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
      { name: "Figma", yearsOfExperience: 1, img: "./IMG/Figma.png" },
      { name: "Chrome", yearsOfExperience: 5, img: "./IMG/GoogleChrome.png" },
      { name: "VSCode", yearsOfExperience: 5, img: "./IMG/Group.png" },
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
  ],
  messages: [],
};

//Sterowanie aplikacja

//Domyslne ustawienia aplikacji
let currentPage = "Home";
let menuIsOpen = false;
let carouselIndex = 0;

//Wyswietlenie sekcji

function displayNav() {
  const nav = document.getElementById("nav");

  const navItems = appData.navItems
    .map(
      (navItem) =>
        `<button class="${
          currentPage === navItem ? "active" : ""
        }" onclick="setPage('${navItem}')"> ${navItem}</button>`
    )
    .join("");

  console.log("Elo");

  nav.innerHTML = `
    <div class="logo">
        <img src="./img/smallITP.png" class="logo-mobile" alt="logo firmy ITPortfolio">
        <img src="./img/bigITP.png" class="logo-desktop" alt="logo firmy ITPortfolio">
    </div>
    <button class="hamburger ${
      menuIsOpen ? "open" : ""
    }" onclick="toggleMenu()">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
    </button>

    <div class="nav-list ${menuIsOpen ? "show" : ""}">
        ${navItems}
    </div>
  `;
}

function toggleMenu() {
  menuIsOpen = !menuIsOpen;
  displayNav();
}

function setPage(page) {
  currentPage = page;
  menuIsOpen = false;
  display();
}

function display() {
  displayNav();
}

displayNav();
