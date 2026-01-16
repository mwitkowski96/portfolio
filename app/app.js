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
  footer: {
    email: "marek.witkowski96@icloud.com",
    phone: "+48 123 456 789",
  },
  messages: [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      message: "Hello, I would like to know more about your services.",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      message: "I'm interested in your web design services.",
    },
  ],
};

const navElement = document.getElementById("nav");
const headerElement = document.getElementById("header");
const mainElement = document.getElementById("main");
const footerElement = document.getElementById("footer");

let currentPage = "Home";
let menuIsOpen = false;
let carouselIndex = 0;

// --- LOGIKA POMOCNICZA ---

function getVisibleProjects() {
  const count = appData.projects.length;
  if (count === 0) return [];
  let displayed = [];
  const toShow = Math.min(3, count);
  for (let i = 0; i < toShow; i++) {
    const index = (carouselIndex + i) % count;
    displayed.push(appData.projects[index]);
  }
  return displayed;
}

function generateNavItems() {
  return appData.navItems
    .map(
      (navItem) => `
      <li>
        <button class="nav-btn" data-page="${navItem}"> 
           ${navItem}
        </button>
      </li>`
    )
    .join("");
}

function createProjectCardElement(project, showDelete = false) {
  const card = document.createElement("div");
  card.classList.add("project-card");

  if (showDelete) {
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.dataset.id = project.id;

    const deleteIcon = document.createElement("img");
    deleteIcon.src = "./img/delete.png";
    deleteIcon.alt = "delete";

    deleteBtn.append(deleteIcon);

    deleteBtn.addEventListener("click", () => deleteProject(project.id));

    card.append(deleteBtn);
  }

  const details = document.createElement("div");
  details.classList.add("project-details");

  const title = document.createElement("h3");
  title.classList.add("project-title");
  title.textContent = project.title;

  const techList = document.createElement("ul");
  techList.classList.add("project-card-tech-list");

  project.tech.forEach((techName) => {
    const li = document.createElement("li");
    li.textContent = techName;
    techList.append(li);
  });

  details.append(title, techList);
  card.append(details);

  return card;
}

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

function getContactPageHTML() {
  return `
    <section class="contact-section container">
      <div class="contact-wrapper wrapper">
        <h2 class="contact-main-heading">Contact me</h2>
        <form id="contactForm" class="contact-form">
          <div class="form-group name-group">
            <label for="contactName">Name</label>
            <input type="text" name="contactName" id="contactName" placeholder="Your name">
            <span id="nameError" class="error-msg"></span>
          </div>
          <div class="form-group email-group">
            <label for="contactEmail">Email</label>
            <input type="email" name="contactEmail" id="contactEmail" placeholder="email@example.com">
            <span id="emailError" class="error-msg"></span>
          </div>
          <div class="form-group message-group">
            <label for="contactMessage">Message</label>
            <textarea name="contactMessage" id="contactMessage" placeholder="Hello, my name is. . ."></textarea>
            <span id="msgError" class="error-msg"></span>
          </div>
          <div class="form-submit-container">
            <button type="submit" class="contact-submit-btn">Send message</button>
          </div>
        </form>
      </div>
    </section>`;
}

function display() {
  updateActiveNavState();
  displayHeader();

  mainElement.replaceChildren();

  switch (currentPage) {
    case "Home":
      mainElement.innerHTML = getHomeAboutSectionHTML();

      const carouselSection = document.createElement("section");
      carouselSection.id = "projects";
      carouselSection.classList.add("projects-section");

      const visibleProjects = getVisibleProjects();

      if (visibleProjects.length === 0) {
        carouselSection.innerHTML = `<div class="container" style="text-align:center; padding: 50px;"><span class="no-projects-msg">There are no projects to display</span></div>`;
      } else {
        const wrapper = document.createElement("div");
        wrapper.classList.add("projects-section-wrapper", "wrapper");

        const box = document.createElement("div");
        box.classList.add("carousel-box");

        const list = document.createElement("div");
        list.classList.add("projects-list");

        visibleProjects.forEach((p) =>
          list.append(createProjectCardElement(p, false))
        );

        box.append(list);

        if (appData.projects.length > 3) {
          const controls = document.createElement("div");
          controls.classList.add("carousel-controls");
          controls.innerHTML = `
                <button class="arrow prev" id="prevBtn"><img src="./img/strzalka.png" class="arrow-icon arrow-prev"></button>
                <button class="arrow next" id="nextBtn"><img src="./img/strzalka.png" class="arrow-icon arrow-next"></button>
             `;
          box.append(controls);
        }
        wrapper.append(box);
        carouselSection.append(wrapper);
      }
      mainElement.append(carouselSection);
      break;

    case "Projects":
      const projSection = document.createElement("section");
      projSection.classList.add("projects-section", "container");

      const projWrapper = document.createElement("div");
      projWrapper.classList.add("projects-wrapper", "wrapper");

      const addContainer = document.createElement("div");
      addContainer.classList.add("add-project-container");
      addContainer.innerHTML = `
          <button id="addProjectBtn" class="add-project-btn">
            <img src="./img/plus.png" class="add-icon"><span>Add project</span>
          </button>`;

      const projList = document.createElement("div");
      projList.classList.add("projects-list");

      if (appData.projects.length === 0) {
        projList.innerHTML = `<span class="no-projects-msg">There are no projects to display</span>`;
      } else {
        appData.projects.forEach((p) => {
          projList.append(createProjectCardElement(p, true));
        });
      }

      projWrapper.append(addContainer, projList);
      projSection.append(projWrapper);
      mainElement.append(projSection);
      break;

    case "About":
      mainElement.innerHTML = getAboutPageHTML();
      break;

    case "Contact":
      mainElement.innerHTML = getContactPageHTML();
      break;

    case "Messages":
      const msgSection = document.createElement("section");
      msgSection.classList.add("messages-section", "container");
      const msgWrapper = document.createElement("div");
      msgWrapper.classList.add("messages-wrapper", "wrapper");
      const msgList = document.createElement("div");
      msgList.classList.add("messages-list");

      if (appData.messages.length === 0) {
        msgList.innerHTML = "<p>No messages yet.</p>";
      } else {
        appData.messages.forEach((m) => {
          const ul = document.createElement("ul");
          ul.classList.add("message-items");
          ul.style.cssText =
            "margin-bottom: 30px; border-bottom: 1px solid #ccc; padding-bottom: 10px;";

          const createRow = (label, text) => {
            const li = document.createElement("li");
            li.classList.add("message-row");
            const strong = document.createElement("strong");
            strong.textContent = label + ": ";
            li.append(strong, document.createTextNode(text));
            return li;
          };

          ul.append(
            createRow("Name", m.name),
            createRow("Email", m.email),
            createRow("Message", m.message)
          );
          msgList.append(ul);
        });
      }
      msgWrapper.append(msgList);
      msgSection.append(msgWrapper);
      mainElement.append(msgSection);
      break;
  }

  attachPageListeners();
}

function init() {
  renderNav();
  renderFooter();
  attachGlobalNavListeners();
  display();
}

function renderNav() {
  navElement.innerHTML = `
    <div class="nav-wrapper">
      <div class="logo">
          <span class="logo-mobile gold">ITP</span>
          <span class="logo-desktop gold">ITP<span class="grey">ortfolio</span></span>
      </div>
      <nav class="nav-list-container">
        <ul class="nav-list">${generateNavItems()}</ul>
      </nav>
      <button class="hamburger">
          <div class="bar"></div><div class="bar"></div><div class="bar"></div>
      </button>
    </div>`;
}

function renderFooter() {
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
            <div class="footer-logo"><span class="gold">ITP</span>ortfolio <span class="white"> &copy; 2026</span></div>
        </div>
    </div>`;
}

function displayHeader() {
  const headerContentMap = {
    Home: { title: appData.header.name, subtitle: appData.header.title },
    Projects: { title: "MY PROJECTS", subtitle: "Made with love" },
    About: { title: "ABOUT ME", subtitle: `IT'S A-ME!` },
    Contact: { title: "CONTACT ME", subtitle: "Say hello" },
    Messages: {
      title: "MESSAGES",
      subtitle: "Message from the interested person",
    },
  };
  const current = headerContentMap[currentPage] || headerContentMap["Home"];
  headerElement.innerHTML = `
    <div class="header container">
      <h1 class="header-heading">${current.title}</h1>
      <span class="header-subtitle">${current.subtitle}</span>
    </div>`;
}

function updateActiveNavState() {
  const allNavBtns = document.querySelectorAll(".nav-btn");
  allNavBtns.forEach((btn) => {
    if (btn.dataset.page === currentPage) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

function attachGlobalNavListeners() {
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    // MODERN: addEventListener
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      setPage(btn.dataset.page);
    });
  });

  const burger = document.querySelector(".hamburger");
  if (burger) {
    burger.addEventListener("click", toggleMenu);
  }
}

function attachPageListeners() {
  if (currentPage === "Home" && appData.projects.length > 3) {
    const prev = document.getElementById("prevBtn");
    const next = document.getElementById("nextBtn");
    if (prev) prev.addEventListener("click", () => moveCarousel(-1));
    if (next) next.addEventListener("click", () => moveCarousel(1));
  }

  if (currentPage === "About") {
    const btn = document.getElementById("goToContactBtn");
    if (btn) btn.addEventListener("click", () => setPage("Contact"));
  }

  if (currentPage === "Projects") {
    const addBtn = document.getElementById("addProjectBtn");
    if (addBtn) addBtn.addEventListener("click", openAddProjectModal);
  }

  if (currentPage === "Contact") {
    const form = document.getElementById("contactForm");
    const inputs = form.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
      input.addEventListener("input", validateContactFields);
    });
    form.addEventListener("submit", handleContactSubmit);
  }
}

function toggleMenu() {
  menuIsOpen = !menuIsOpen;
  const navContainer = document.querySelector(".nav-list-container");
  const burger = document.querySelector(".hamburger");

  if (menuIsOpen) {
    navContainer.classList.add("show");
    burger.classList.add("open");
  } else {
    navContainer.classList.remove("show");
    burger.classList.remove("open");
  }
}

function setPage(page) {
  currentPage = page;
  if (menuIsOpen) toggleMenu();
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

const contactValidators = {
  name: (val) => {
    if (val.length < 3) return "The name must be at least 3 characters long.";
    if (val.length > 20) return "The name must not exceed 20 characters.";
    return true;
  },
  email: (val) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val)) return "Please enter a valid email address.";
    return true;
  },
  message: (val) => {
    if (val.length === 0) return "The message cannot be empty.";
    if (val.length > 100) return "The message must not exceed 100 characters.";
    return true;
  },
};

function validateField(inputElement, errorElement, ruleName) {
  const value = inputElement.value.trim();
  const result = contactValidators[ruleName](value);

  if (result === true) {
    errorElement.innerText = "";
    inputElement.classList.remove("input-error");
    return true;
  } else {
    errorElement.innerText = result;
    inputElement.classList.add("input-error");
    return false;
  }
}

function validateContactFields(e) {
  const target = e.target;
  if (target.id === "contactName")
    validateField(target, document.getElementById("nameError"), "name");
  if (target.id === "contactEmail")
    validateField(target, document.getElementById("emailError"), "email");
  if (target.id === "contactMessage")
    validateField(target, document.getElementById("msgError"), "message");
}

function handleContactSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const nameInp = document.getElementById("contactName");
  const emailInp = document.getElementById("contactEmail");
  const msgInp = document.getElementById("contactMessage");

  const isNameValid = validateField(
    nameInp,
    document.getElementById("nameError"),
    "name"
  );
  const isEmailValid = validateField(
    emailInp,
    document.getElementById("emailError"),
    "email"
  );
  const isMsgValid = validateField(
    msgInp,
    document.getElementById("msgError"),
    "message"
  );

  if (isNameValid && isEmailValid && isMsgValid) {
    appData.messages.push({
      id: Date.now(),
      name: nameInp.value.trim(),
      email: emailInp.value.trim(),
      message: msgInp.value.trim(),
    });

    form.reset();
    [nameInp, emailInp, msgInp].forEach((el) =>
      el.classList.remove("input-error")
    );
    alert("Message sent successfully!");
  }
}

function openAddProjectModal() {
  const overlay = document.createElement("div");
  overlay.id = "modalOverlay";
  overlay.classList.add("modal-overlay");

  const windowDiv = document.createElement("div");
  windowDiv.classList.add("modal-window");

  const closeBtn = document.createElement("button");
  closeBtn.id = "closeModal";
  closeBtn.classList.add("close-x");
  closeBtn.innerHTML = "&times;";

  closeBtn.addEventListener("click", closeModal);

  const form = document.createElement("form");
  form.id = "addProjectForm";
  form.classList.add("modal-form");

  const createInputRow = (labelText, inputId, placeholder = "") => {
    const row = document.createElement("div");
    row.classList.add("form-row");

    const label = document.createElement("label");
    label.setAttribute("for", inputId);
    label.textContent = labelText;

    const wrapper = document.createElement("div");
    wrapper.classList.add("input-wrapper");

    const input = document.createElement("input");
    input.type = "text";
    input.id = inputId;
    if (placeholder) input.placeholder = placeholder;

    input.addEventListener("input", validateModalFields);

    const errorSpan = document.createElement("span");
    errorSpan.id = inputId === "newTitle" ? "titleError" : "techError";
    errorSpan.classList.add("error-msg");

    wrapper.append(input, errorSpan);
    row.append(label, wrapper);
    return row;
  };

  const titleRow = createInputRow("Project title", "newTitle");
  const techRow = createInputRow("Technologies", "newTech", "HTML, CSS, JS");

  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.classList.add("modal-submit-btn");

  const btnIcon = document.createElement("img");
  btnIcon.src = "./img/plus.png";
  btnIcon.alt = "add";

  submitBtn.append(btnIcon, document.createTextNode(" Add project"));

  form.append(titleRow, techRow, submitBtn);

  form.addEventListener("submit", handleAddProject);

  windowDiv.append(closeBtn, form);
  overlay.append(windowDiv);

  document.body.append(overlay);
  document.body.style.overflow = "hidden";
}

function validateModalFields() {
  const titleInp = document.getElementById("newTitle");
  const techInp = document.getElementById("newTech");
  const titleErr = document.getElementById("titleError");
  const techErr = document.getElementById("techError");

  let isValid = true;

  if (titleInp.value.trim().length > 0) {
    if (titleInp.value.trim().length < 3) {
      titleErr.innerText = "The title must be at least 3 characters long.";
      titleInp.classList.add("input-error");
      isValid = false;
    } else if (titleInp.value.trim().length > 30) {
      titleErr.innerText = "The title must not exceed 30 characters.";
      titleInp.classList.add("input-error");
      isValid = false;
    } else {
      titleErr.innerText = "";
      titleInp.classList.remove("input-error");
    }
  }

  if (techInp.value.trim().length > 0) {
    techErr.innerText = "";
    techInp.classList.remove("input-error");
  }
  return isValid;
}

function handleAddProject(e) {
  e.preventDefault();
  const titleInp = document.getElementById("newTitle");
  const techInp = document.getElementById("newTech");
  const titleVal = titleInp.value.trim();
  const techVal = techInp.value.trim();

  let canSubmit = true;

  if (titleVal.length < 3) {
    document.getElementById("titleError").innerText =
      "The title must be at least 3 characters long.";
    titleInp.classList.add("input-error");
    canSubmit = false;
  } else if (titleVal.length > 30) {
    document.getElementById("titleError").innerText =
      "The title must not exceed 30 characters.";
    titleInp.classList.add("input-error");
    canSubmit = false;
  }

  if (techVal.length === 0) {
    document.getElementById("techError").innerText =
      "Please add some technologies.";
    techInp.classList.add("input-error");
    canSubmit = false;
  }

  if (canSubmit) {
    appData.projects.push({
      id: Date.now(),
      title: titleVal,
      tech: techVal
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t !== ""),
    });
    closeModal();
    display();
  }
}

function closeModal() {
  const modal = document.getElementById("modalOverlay");
  if (modal) modal.remove();
  document.body.style.overflow = "auto";
}

init();
