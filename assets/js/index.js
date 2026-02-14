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
