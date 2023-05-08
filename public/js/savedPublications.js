const postSavedPublications = document.querySelector(".svPuform");

postSavedPublications.addEventListener("submit", async (e) => {
  console.log("submit");
  e.preventDefault();
  const publicationId = postSavedPublications.querySelector(
    '[name="publicationId"]'
  ).value;
  const res = await fetch("/savePublication", {
    method: "POST",
    body: JSON.stringify({
      publicationId,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  window.location.reload();
});
