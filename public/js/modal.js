const galleryPict = document.querySelectorAll("#showModal");
const filename = document.querySelectorAll("#imageFilename");
const modalImg = document.querySelector("#modalImg");
const imgId = document.querySelector("#imageUrl");

for (let i = 0; i < galleryPict.length; i++) {
  galleryPict[i].addEventListener("click", (e) => {
    e.preventDefault();

    const url = galleryPict[i].getAttribute("href");

    modalImg.setAttribute("src", url);

    imgId.setAttribute("value", filename[i].value);
  });
}
