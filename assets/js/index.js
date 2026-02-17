function downloadResume() {
  // 1. Create an invisible anchor element
  let link = document.createElement("a");

  // 2. Set the link's attributes
  link.href = "Resume - Aamna.pdf"; // URL of the file
  link.download = "Resume - Aamna.pdf"; // Suggested filename
  link.style.display = "none"; // Hide the link

  // 3. Append the link to the body, simulate a click, and remove it
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

document.addEventListener("DOMContentLoaded", function () {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("#navbar ul li a[href^='#']");

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");

          navLinks.forEach((link) => {
            link.classList.remove("active");

            if (link.getAttribute("href") === `#${id}`) {
              link.classList.add("active");
            }
          });
        }
      });
    },
    {
      threshold: 0.65, // section must be 65% visible
      rootMargin: "-40px 0px 0px 0px",
    },
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
});

function toggleTheme() {
  let toggleButton = document.querySelector(".theme");
  toggleButton.classList.toggle("dark-theme");

  let bodyTag = document.body;
  bodyTag.classList.toggle("dark");

  if (bodyTag.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
}

//  Calculate years of experience
const startDate = new Date("2022-09-01"); // joining date
const today = new Date();
let years = today.getFullYear() - startDate.getFullYear();

// check if anniversary passed this year
const hasCompletedYear =
  today.getMonth() > startDate.getMonth() ||
  (today.getMonth() === startDate.getMonth() &&
    today.getDate() >= startDate.getDate());

if (!hasCompletedYear) {
  years--;
}
document.querySelector(".yoe").textContent = years + "+";

window.addEventListener("DOMContentLoaded", function () {
  var form = document.querySelector("#my-form");

  if (!form) return;

  var alertBox = document.querySelector("#form-alert");
  var alertMessage = document.querySelector("#alert-message");
  var alertClose = document.querySelector("#alert-close");

  function showAlert(message, type) {
    alertBox.classList.remove("hidden", "success", "error");
    alertBox.classList.add(type);
    alertMessage.textContent = message;

    setTimeout(function () {
      alertBox.classList.add("hidden");
    }, 2000);
  }

  alertClose.addEventListener("click", function () {
    alertBox.classList.add("hidden");
  });

  var submitBtn = document.querySelector(".submit");
  var resetBtn = document.querySelector(".reset");
  var fileInput = document.querySelector("#attachment");

  function setLoadingState(isLoading) {
    submitBtn.disabled = isLoading;
    resetBtn.disabled = isLoading;

    if (isLoading) {
      submitBtn.textContent = "Sending...";
    } else {
      submitBtn.textContent = "Send Message";
    }
  }

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();

    var file = fileInput.files[0];

    if (file) {
      var maxSize = 1024 * 1024; // 1MB

      var fileName = file.name.toLowerCase();
      if (!fileName.endsWith(".pdf")) {
        showAlert("Only PDF files are allowed.", "error");
        fileInput.value = "";
        return;
      }

      if (file.size > maxSize) {
        showAlert("File size must be under 1MB.", "error");
        fileInput.value = "";
        return;
      }
    }

    setLoadingState(true);

    var data = new FormData(form);
    ajax(form.method, form.action, data, success, error);
  });

  function success() {
    form.reset();
    setLoadingState(false); // re-enable buttons
    showAlert("Message sent successfully!", "success");
  }

  function error() {
    setLoadingState(false); // re-enable buttons
    showAlert("Oops! Something went wrong.", "error");
  }
});

function ajax(method, url, data, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status == 200) {
      success(xhr.response, xhr.responseText);
    } else {
      error(xhr.status, xhr.response, xhr.responseType);
    }
  };
  xhr.send(data);
}

// Project Carousel
const carousel = document.querySelector(".carousel");
const leftArrow = document.querySelector(".left");
const rightArrow = document.querySelector(".right");

function updateArrows() {
  const scrollLeft = carousel.scrollLeft;
  const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;

  // Hide left arrow if at start
  if (scrollLeft <= 0) {
    leftArrow.style.display = "none";
  } else {
    leftArrow.style.display = "block";
  }

  // Hide right arrow if at end
  if (scrollLeft >= maxScrollLeft - 1) {
    rightArrow.style.display = "none";
  } else {
    rightArrow.style.display = "block";
  }
}

// Scroll on arrow click
rightArrow.addEventListener("click", () => {
  carousel.scrollBy({ left: 400, behavior: "smooth" });
});

leftArrow.addEventListener("click", () => {
  carousel.scrollBy({ left: -400, behavior: "smooth" });
});

// Update arrows on scroll
carousel.addEventListener("scroll", updateArrows);

// Update arrows on page load
window.addEventListener("load", updateArrows);

// Update arrows on resize (important!)
window.addEventListener("resize", updateArrows);
