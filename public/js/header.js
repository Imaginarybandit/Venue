//make a const that selects an element with the class of linksHolder
const linksHolder = document.querySelector(".linksHolder");
const nav = document.querySelector(".mainNav");

linksHolder.style.width = `${nav.offsetWidth}px`;

linksHolder.style.maxWidth = "100vw";
nav.style.maxWidth = "100%";

window.addEventListener("resize", () => {
  linksHolder.style.width = `${nav.offsetWidth}px`;
  nav.style.maxWidth = "100%";
  linksHolder.style.maxWidth = "100vw";
});
