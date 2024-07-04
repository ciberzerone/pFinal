// Toggle the burger menu and apply styles
document.querySelector(".burger-menu").addEventListener("click", () => {
  document.querySelector(".main-nav").classList.toggle("nav-active");
  document.querySelector(".burger-menu").classList.toggle("grey-background");
  document.querySelectorAll(".burger-menu .line").forEach(line => line.classList.toggle("white"));
  document.body.classList.toggle("no-scroll");
});
