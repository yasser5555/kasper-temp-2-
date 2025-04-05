let heading_1 = Array.from(document.getElementsByTagName(`h1`));
let heading_2 = Array.from(document.getElementsByTagName(`h2`));
let heading_3 = Array.from(document.getElementsByTagName(`h3`));
let heading_4 = Array.from(document.getElementsByTagName(`h4`));
let heading_5 = Array.from(document.getElementsByTagName(`h5`));
let heading_6 = Array.from(document.getElementsByTagName(`h6`));
if (window.innerWidth < 600) {
  heading_1.forEach((element) => {
    element.classList.add(`fs-3`);
  });
  heading_2.forEach((element) => {
    element.classList.add(`fs-4`);
  });
  heading_3.forEach((element) => {
    element.classList.add(`fs-5`);
  });
  heading_4.forEach((element) => {
    element.classList.add(`fs-6`);
  });
}
