const featureBox = document.querySelector("#featured_content");
const titulo = document.querySelector("#featured_title");
const scrollbar = document.querySelector("#featured");
const featuredItem = document.querySelectorAll("#featureditem");
const Itemimage = document.querySelectorAll("#image");
const Maintitle = document.querySelectorAll("#tituloDeFeatured");

//make am event listener for when the window loads

let rect = featureBox.getBoundingClientRect();
for (i = 0; i < Maintitle.length; i++) {
  Maintitle[i].style.marginLeft = rect.left + "px";
}

window.addEventListener("resize", () => {
  console.log("HOAL");
  let rect = featureBox.getBoundingClientRect();
  for (i = 0; i < Maintitle.length; i++) {
    Maintitle[0].style.marginLeft = rect.left + "px";
  }
});
