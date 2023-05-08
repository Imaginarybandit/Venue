const featureBox2 = document.querySelector("#featured_content2");
//const titulo = document.querySelector("#featured_title2");
const scrollbar2 = document.querySelector("#featured2");
const featuredItem2 = document.querySelectorAll("#featureditem2");
const Image2 = document.querySelectorAll("#image2");
const Maintitle2 = document.querySelectorAll("#tituloDeFeatured2");
console.log(featuredItem2);
const rec2 = featureBox2.getBoundingClientRect();
for (i = 0; i < Maintitle2.length; i++) {
  Maintitle2[i].style.marginLeft = rec2.left + "px";
}

for (let i = 0; i < featuredItem2.length; i++) {
  featuredItem2[i].style.width = `${featureBox2.clientWidth * 0.121}px`;
  featuredItem2[i].style.height = `${featureBox2.clientWidth * 0.1439}px`;
  featuredItem2[i].style.margin = `0 ${featuredItem2[i].clientWidth * 0.016}px`;
  featuredItem2[i].style.fontSize = `${
    featuredItem2[i].clientWidth * 0.0062
  }px`;
  Image2[i].style.width = `${featuredItem2[i].clientWidth * 0.86}px`;
  Image2[i].style.height = `${Image2[i].clientWidth * 0.6}px`;
  Image2[i].style.marginTop = `${featuredItem2[i].clientWidth * 0.052}px`;
}

let scrollbar2Width = scrollbar2.offsetWidth - scrollbar2.clientWidth;
scrollbar2.style.height = `${featuredItem2[0].clientHeight + 17}px`;
featureBox2.style.height = `${scrollbar2.clientWidth * 0.2917}px`;
featureBox2.style.fontSize = `${featureBox2.clientWidth * 0.0062}px`;

window.addEventListener("resize", () => {
  const rec2 = featureBox2.getBoundingClientRect();
  for (i = 0; i < Maintitle2.length; i++) {
    Maintitle2[i].style.marginLeft = rec2.left + "px";
  }
  featureBox2.style.width = `${scrollbar2.clientWidth * 2}px`;
  featureBox2.style.height = `${scrollbar2.clientWidth * 0.2917}px`;

  for (let i = 0; i < featuredItem2.length; i++) {
    featuredItem2[i].style.width = `${featureBox2.clientWidth * 0.121}px`;
    featuredItem2[i].style.height = `${featureBox2.clientWidth * 0.1439}px`;
    featuredItem2[i].style.margin = `0 ${
      featuredItem2[i].clientWidth * 0.016
    }px`;
    featuredItem2[i].style.fontSize = `${
      featuredItem2[i].clientWidth * 0.0062
    }px`;
    Image2[i].style.width = `${featuredItem2[i].clientWidth * 0.86}px`;
    Image2[i].style.height = `${Image2[i].clientWidth * 0.6}px`;
    Image2[i].style.marginTop = `${featuredItem2[i].clientWidth * 0.052}px`;
  }
  scrollbar2.style.height = `${featuredItem2[0].clientHeight + 17}px`;
});
