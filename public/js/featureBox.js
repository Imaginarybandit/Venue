const featureBox = document.querySelector("#featured_content");
const titulo = document.querySelector("#featured_title");
const scrollbar = document.querySelector("#featured");
const featuredItem = document.querySelectorAll("#featureditem");
const Itemimage = document.querySelectorAll("#image");
const Maintitle = document.querySelectorAll("#tituloDeFeatured");

const rect = featureBox.getBoundingClientRect();
for (i = 0; i < Maintitle.length; i++) {
  Maintitle[i].style.marginLeft = rect.left + "px";
}

for (let i = 0; i < featuredItem.length; i++) {
  featuredItem[i].style.width = `${featureBox.clientWidth * 0.121}px`;
  featuredItem[i].style.height = `${featureBox.clientWidth * 0.1439}px`;
  featuredItem[i].style.margin = `0 ${featuredItem[i].clientWidth * 0.016}px`;
  featuredItem[i].style.fontSize = `${featuredItem[i].clientWidth * 0.0062}px`;
  Itemimage[i].style.width = `${featuredItem[i].clientWidth * 0.86}px`;
  Itemimage[i].style.height = `${Itemimage[i].clientWidth * 0.6}px`;
  Itemimage[i].style.marginTop = `${featuredItem[i].clientWidth * 0.052}px`;
}

let scrollbarWidth = scrollbar.offsetWidth - scrollbar.clientWidth;
scrollbar.style.height = `${featuredItem[0].clientHeight + 17}px`;
featureBox.style.height = `${scrollbar.clientWidth * 0.2917}px`;
featureBox.style.fontSize = `${featureBox.clientWidth * 0.0062}px`;

window.addEventListener("resize", () => {
  const rect = featureBox.getBoundingClientRect();
  for (i = 0; i < Maintitle.length; i++) {
    Maintitle[i].style.marginLeft = rect.left + "px";
  }
  featureBox.style.width = `${scrollbar.clientWidth * 2}px`;
  featureBox.style.height = `${scrollbar.clientWidth * 0.2917}px`;

  for (let i = 0; i < featuredItem.length; i++) {
    featuredItem[i].style.width = `${featureBox.clientWidth * 0.121}px`;
    featuredItem[i].style.height = `${featureBox.clientWidth * 0.1439}px`;
    featuredItem[i].style.margin = `0 ${featuredItem[i].clientWidth * 0.016}px`;
    featuredItem[i].style.fontSize = `${
      featuredItem[i].clientWidth * 0.0062
    }px`;
    Itemimage[i].style.width = `${featuredItem[i].clientWidth * 0.86}px`;
    Itemimage[i].style.height = `${Itemimage[i].clientWidth * 0.6}px`;
    Itemimage[i].style.marginTop = `${featuredItem[i].clientWidth * 0.052}px`;
  }
  scrollbar.style.height = `${featuredItem[0].clientHeight + 17}px`;
});
