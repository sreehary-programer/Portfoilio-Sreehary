'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const overlay = document.querySelector("[data-overlay]");

// modal variable






// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}


// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}


// ---------- Voice Recognition ----------
let recognizing = false;
let recognition;

// Elements
const transcriptEl = document.getElementById("transcript");
const micBtn = document.getElementById("micBtn");

// Check browser support
if ("webkitSpeechRecognition" in window) {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = false; // stop automatically after each result
  recognition.interimResults = false; // only final results
  recognition.lang = "en-US";

  // When recognition starts
  recognition.onstart = () => {
    recognizing = true;
    if (micBtn) {
      micBtn.classList.add("active");
      micBtn.setAttribute("aria-pressed", "true");
    }
  };

  // When recognition ends
  recognition.onend = () => {
    recognizing = false;
    if (micBtn) {
      micBtn.classList.remove("active");
      micBtn.setAttribute("aria-pressed", "false");
    }
  };

  // When result comes back
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    console.log("Heard:", transcript); // Debug in console
    handleCommand(transcript);
  };
} else {
  alert("Sorry, your browser does not support Speech Recognition.");
}

function handleCommand(text) {
  if (transcriptEl) {
    transcriptEl.hidden = false;
    transcriptEl.textContent = text;
  }

  const command = text.toLowerCase().trim();

  // Helper: click navbar button by its label text
  function clickNav(label) {
    const btn = Array.from(document.querySelectorAll('[data-nav-link]'))
      .find(el => el.textContent.trim().toLowerCase() === label);
    btn?.click();
  }

  if (command.includes("about")) {
    clickNav("about");
  } else if (command.includes("resume")) {
    clickNav("resume");
  } else if (command.includes("contact")) {
    clickNav("contact");
  }
  else if (command.includes("portfolio")) {
    clickNav("portfolio");
  }
  else if (command.includes("summary")) {
          let msg = new SpeechSynthesisUtterance("I am Sreehary Shyju, a dedicated Bachelor of Computer Applications (BCA) student at Dr APJ Abdul Kalam College of Professional Studies Ulikkal, with a strong interest in software development and emerging technologies. I have practical experience in web development using HTML, CSS, PHP, and MySQL, and I actively explore AI-based image generation to integrate innovation with design. I completed my Higher Secondary Education (Plus Two) at SHHSS Angadikadavu. I am passionate about continuous learning, creative problem-solving, and applying my technical knowledge to develop efficient and user-friendly solutions.");
          msg.lang = "en-US";
          speechSynthesis.speak(msg);
        }
}
    
  // Example redirect:
  // if (command.includes("projects")) {
  //   window.location.href = "projects.html";
  // }

// Mic button toggle
if (micBtn) {
  micBtn.addEventListener("click", () => {
    if (recognizing) {
      recognition.stop();
    } else {
      recognition.start();
    }
  });
}
