const images = document.querySelectorAll("#InnerCarousel");

//do an event listener for when the window loads
window.addEventListener("load", () => {
  for (let i = 0; i < images.length; i++) {
    images[i].style.height = images[i].clientWidth / 2.5 + "px";
  }
});

window.addEventListener("resize", () => {
  for (let i = 0; i < images.length; i++) {
    images[i].style.height = images[i].clientWidth / 2.5 + "px";
  }
});
