function downloadResume() {
  // 1. Create an invisible anchor element
  const link = document.createElement("a");

  // 2. Set the link's attributes
  link.href = "Resume - Aamna.pdf"; // URL of the file
  link.download = "Resume - Aamna.pdf"; // Suggested filename
  link.style.display = "none"; // Hide the link

  // 3. Append the link to the body, simulate a click, and remove it
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
