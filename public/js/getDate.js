const publiDate = document.getElementById("date");
const dateString = publiDate.getAttribute("value");
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

publiDate.innerHTML = `${dayOfMonth} de ${month}, ${year}  ${normalHours(
  hours
)}:${minutes} ${pmAm(hours)} `;
