const featureBox2 = document.querySelector("#featured_content2");
const scrollbar2 = document.querySelector("#featured2");
const featuredItem2 = document.querySelectorAll("#featureditem2");
const Image2 = document.querySelectorAll("#image2");
const Maintitle2 = document.querySelectorAll("#tituloDeFeatured2");

if (featureBox2) {
  const rec2 = featureBox2.getBoundingClientRect();
  for (i = 0; i < Maintitle2.length; i++) {
    Maintitle2[0].style.marginLeft = rec2.left + "px";
  }

  window.addEventListener("resize", () => {
    const rec2 = featureBox2.getBoundingClientRect();
    for (i = 0; i < Maintitle2.length; i++) {
      Maintitle2[0].style.marginLeft = rec2.left + "px";
    }
  });
}
