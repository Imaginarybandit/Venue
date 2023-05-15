//make am event listener for when the window loads
window.addEventListener("load", () => {
  const featureBox = document.querySelector("#featured_content");
  const Maintitle = document.querySelectorAll("#tituloDeFeatured");

  let rect = featureBox.getBoundingClientRect();
  for (i = 0; i < Maintitle.length; i++) {
    Maintitle[i].style.marginLeft = rect.left + "px";
  }

  window.addEventListener("resize", () => {
    let rect = featureBox.getBoundingClientRect();
    for (i = 0; i < Maintitle.length; i++) {
      Maintitle[0].style.marginLeft = rect.left + "px";
    }
  });
});
