const actCerca = document.getElementsByClassName("actCerca");
const resultados = document.getElementsByClassName("resultados");
const userID = document.getElementById("userID").value;

if (userID !== "0") {
  window.addEventListener("load", async (event) => {
    event.preventDefault();

    const submittedValue = userID;

    resultados[0].classList.add(
      "d-flex",
      "flex-row",
      "justify-content-start",
      "featured_content"
    );
    resultados[0].setAttribute("id", "featured_content");

    const res = await fetch(`/location`);
    const data = await res.json();

    data.forEach(async (publicacion) => {
      const div1 = document.createElement("div");
      div1.classList.add("itemBox", "d-flex", "flex-column", "mx-2", "search");
      const div2 = document.createElement("div");
      div2.classList.add("activityImage");
      const img = document.createElement("img");
      img.classList.add("picture");
      if (Object.keys(publicacion.image).length === 0) {
        img.src = " ";
      } else {
        img.src = `${publicacion.image.url}`;
      }

      div2.appendChild(img);
      div1.appendChild(div2);

      const div3 = document.createElement("div");
      div3.classList.add("itemBoxContent", "px-4");

      const div4 = document.createElement("div");
      div4.classList.add("itemBoxContentTitle", "mt-2");
      const a = document.createElement("a");
      a.classList.add("itemTitle");
      a.href = `/publicacion/${publicacion.id}`;
      a.innerHTML = `<b><h5 id="actTitle">${publicacion.title}</h5></b></a>`;
      const div5 = document.createElement("div");
      div5.classList.add("Bygroup");
      const a2 = document.createElement("a");
      a2.href = `/groups/${publicacion.group._id}`;
      a2.innerHTML = `<b>By: ${publicacion.group.name}</b>`;

      div5.appendChild(a2);
      div4.appendChild(a);

      const div6 = document.createElement("div");
      div6.classList.add("itemBoxOtherText");
      div6.setAttribute("id", "date");
      div6.setAttribute("value", `${publicacion.date}`);

      const div7 = document.createElement("div");
      div7.classList.add("itemBoxOtherText");
      div7.innerText = ` Pueblo: ${publicacion.city}`;

      div3.appendChild(div4);
      div3.appendChild(div5);
      div3.appendChild(div6);
      div3.appendChild(div7);
      div1.appendChild(div3);

      resultados[0].appendChild(div1);

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
        ].innerHTML = ` ${dayOfMonth} de ${month},${year}  ${normalHours(
          hours
        )}:${minutes} ${pmAm(hours)} `;
      }
    });
  });
}
