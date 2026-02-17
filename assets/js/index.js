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

function toggleTheme() {
  let toggleButton = document.querySelector(".theme");
  toggleButton.classList.toggle("dark-theme");

  let bodyTag = document.querySelector("body");
  let introSection = document.querySelector(".intro");
  let footerSection = document.querySelector("#footer");
  bodyTag.classList.toggle("dark");
  introSection.classList.toggle("dark");
  footerSection.classList.toggle("dark");
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

  // form.addEventListener("submit", function (ev) {
  //   ev.preventDefault();
  //   var data = new FormData(form);
  //   ajax(form.method, form.action, data, success, error);
  // });
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
