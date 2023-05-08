const opciones = document.querySelectorAll("#octOp");
const actividadesYGalerias = document.querySelector("#actYGal");
const titleImageG = document.querySelector("#titleImage");
const opGroup = document.querySelectorAll(".octOp");
const gallery = document.querySelector("#galeryBox");
const activity = document.querySelector("#activityBox");

actividadesYGalerias.style.width = "1000px";
gallery.style.display = "none";

for (let opcion of opciones) {
  opcion.addEventListener("click", function (e) {
    e.preventDefault();

    for (let opcion of opciones) {
      opcion.parentNode.classList.remove("selected");
    }

    opcion.parentNode.classList.add("selected");

    if (opcion.childNodes[0].textContent === "Galeria") {
      gallery.style.display = "block";
      activity.style.display = "none";
    } else {
      gallery.style.display = "none";
      activity.style.display = "block";
    }
  });
}

//set an event listener for activities and gallery whenever the screen is resized
window.addEventListener("resize", function () {
  titleImageG.style.height = titleImageG.clientWidth * 0.35 + "px";
  actividadesYGalerias.style.width = "100%";
});
