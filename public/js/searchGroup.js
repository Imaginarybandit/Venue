const search = document.querySelector("#searchGroup");
const preloaded = document.querySelector("#preLoadedCont");

if (search) {
  search.addEventListener("submit", async (e) => {
    e.preventDefault();

    //make a function that empties the results div
    const emptyResults = () => {
      const results = document.querySelector("#results");
      while (results.firstChild) {
        results.removeChild(results.firstChild);
      }
    };
    emptyResults();

    e.preventDefault();
    preloaded.style.display = "none";
    const submittedValue = search.querySelector('[name="search"]').value;
    //fetch to /groups/search
    const res = await fetch(`/groups/search?search=${submittedValue}`);
    const data = await res.json();
    //use the data to show the results
    const results = document.querySelector("#results");

    data.forEach((group) => {
      const div1 = document.createElement("div");
      div1.classList.add("itemBox", "d-flex", "flex-column", "mx-2", "mb-3");

      const div2 = document.createElement("div");
      div2.classList.add("activityImage", "mx-auto");
      const img = document.createElement("img");
      if (!group.posterimage) {
        img.src = " ";
      } else {
        img.src = `${group.posterimage.url}`;
      }
      img.classList.add("picture", "img-fluid");
      div2.appendChild(img);
      div1.appendChild(div2);

      const div3 = document.createElement("div");
      div3.classList.add("itemBoxContent", "px-4");
      const div4 = document.createElement("div");
      div4.classList.add("itemBoxContentTitle", "mt-4");
      const a = document.createElement("a");
      a.classList.add("itemTitle");
      a.href = `/groups/${group._id}`;
      a.innerHTML = `<b><h5 id="actTitle">${group.name}</h5></b></a>`;
      const div5 = document.createElement("div");
      div5.classList.add("itemBoxOtherText");
      const p = document.createElement("p");
      p.innerText = group.description;

      div4.appendChild(a);
      div3.appendChild(div4);
      div5.appendChild(p);

      div3.appendChild(div5);
      div1.appendChild(div3);

      results.appendChild(div1);
    });
  });
}
