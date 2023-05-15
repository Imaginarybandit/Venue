const searchPublicacion = document.querySelector("#searchPublicaciones");
const preload = document.querySelector("#preLoaded");

if (searchPublicacion) {
  searchPublicacion.addEventListener("submit", async (e) => {
    e.preventDefault();

    //make a function that empties the results div
    const emptyResults = () => {
      const results = document.querySelector("#results");
      while (results.firstChild) {
        results.removeChild(results.firstChild);
      }
    };
    emptyResults();

    preload.style.display = "none";
    const submittedValue =
      searchPublicacion.querySelector('[name="search"]').value;
    //fetch to /groups/search
    const res = await fetch(`/publicaciones/search?search=${submittedValue}`);
    const data = await res.json();
    //use the data to show the results
    const results = document.querySelector("#results");

    data.forEach((publicacion) => {
      const div1 = document.createElement("div");
      div1.classList.add("itemBox", "d-flex", "flex-column", "mx-2", "mb-3");

      const div2 = document.createElement("div");
      div2.classList.add("activityImage", "mx-auto");
      const img = document.createElement("img");
      if (!publicacion.image) {
        img.src = " ";
      } else {
        img.src = publicacion.image.url;
      }

      img.classList.add("picture", "img-fluid");
      div2.appendChild(img);
      div1.appendChild(div2);

      const div3 = document.createElement("div");
      div3.classList.add("itemBoxContent", "px-4");
      const div4 = document.createElement("div");
      div4.classList.add("itemBoxContentTitle");
      const a = document.createElement("a");
      a.classList.add("itemTitle");
      a.href = `/publicacion/${publicacion._id}`;
      a.innerHTML = `<b><h5 id="actTitle">${publicacion.title}</h5></b></a>`;
      const div5 = document.createElement("div");
      div5.classList.add("itemBoxOtherText");
      const p = document.createElement("p");
      p.innerText = publicacion.description;
      const div6 = document.createElement("div");
      div6.classList.add("itemBoxOtherText");
      div6.setAttribute("id", "date");
      div6.setAttribute("value", `${publicacion.date}`);

      const div7 = document.createElement("div");
      div7.classList.add("itemBoxOtherText");
      div7.innerText = ` Localizacion: ${publicacion.location}`;

      const div4_01 = document.createElement("div");
      div4_01.classList.add("Bygroup");
      const a2 = document.createElement("a");
      a2.href = `/groups/${publicacion.group._id}`;
      a2.innerHTML = `<b>By: ${publicacion.group.name}</b>`;

      div4_01.appendChild(a2);

      div4.appendChild(a);
      div3.appendChild(div4);
      div5.appendChild(p);
      div3.appendChild(div4_01);
      div3.appendChild(div5);
      div3.appendChild(div6);
      div3.appendChild(div7);
      div1.appendChild(div3);

      results.appendChild(div1);
    });

    const publiDate = document.querySelectorAll("#date");
    for (let i = 0; i < publiDate.length; i++) {
      const dateString = publiDate[i].getAttribute("value");
      const date = new Date(dateString);

      const days = [
        "Domingo",
        "Lunes",
        "Martes",
        "Miercoles",
        "Jueves",
        "Viernes",
        "Sabado",
      ];

      const months = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ];

      const day = days[date.getDay()];

      const month = months[date.getMonth()];

      const year = date.getFullYear();

      const dayOfMonth = date.getDate();

      const hours = date.getHours();

      const minutes = date.getMinutes();

      const normalHours = (hours) => {
        if (hours > 12) {
          return hours - 12;
        } else {
          return hours;
        }
      };

      const pmAm = (hours) => {
        if (hours > 12) {
          return "PM";
        } else {
          return "AM";
        }
      };

      publiDate[
        i
      ].innerHTML = `${dayOfMonth} de ${month},${year} a las ${normalHours(
        hours
      )}:${minutes} ${pmAm(hours)} `;
    }
  });
}
