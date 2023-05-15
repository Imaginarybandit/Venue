const boilerBody = document.querySelector("#boilerBody");
const footer = document.querySelector("#footer");
const windowHeight = window.innerHeight;

if (footer) {
  // // get boilerbody vh
  // let boilerBodyVh = boilerBody.clientHeight;
  // if (boilerBodyVh > windowHeight) {
  //   let boilerBodyBottom = boilerBody.getBoundingClientRect().bottom;
  //   let footerBottom = footer.getBoundingClientRect().bottom;
  //   footer.style.bottom = `-${
  //     boilerBodyBottom - windowHeight + footer.clientHeight
  //   }px`;
  // } else {
  //   footer.style.bottom = 0;
  // }
  // window.addEventListener("resize", () => {
  //   boilerBodyVh = boilerBody.clientHeight;
  //   if (boilerBodyVh > windowHeight) {
  //     let boilerBodyBottom = boilerBody.getBoundingClientRect().bottom;
  //     let footerBottom = footer.getBoundingClientRect().bottom;
  //     footer.style = `-${
  //       boilerBodyBottom - windowHeight + footer.clientHeight
  //     }px`;
  //   } else if (boilerBodyVh === windowHeight) {
  //     footer.style.bottom = 0;
  //   }
  // });
}
