// Selecting
const Nav_links = document.querySelectorAll(`.nav-link`);

// creating the function
function Adding_active(Elements, classname) {
  // looping on each one to remove && add
  Elements.forEach(function (item) {
    // adding event to execute
    item.addEventListener(`click`, function () {
      // looping again to remove the class completly
      Elements.forEach((element) => element.classList.remove(classname));
      // on the pressed item
      item.classList.add(classname);
    });
  });
}

let activeClass = `active`;
Adding_active(Nav_links, activeClass);
// for To Top button

// adding active on-cards
let Services_cards = document.querySelectorAll(`#Services .container .card`);
let active_service = "active_service-card";
Adding_active(Services_cards, active_service);

function ToTop(selector) {
  // selecting element
  let Element = document.getElementById(`#${selector}`);
  // adding the event
  Element.addEventListener(`click`, function () {
    // coordinates on y will the scroll will happen on it
    this.scroll({ y: 0 });
  });
}
// Get all tab elements
const tabs = document.querySelectorAll(".tablinks");
// Add click event listener to each tab
tabs.forEach((tab) => {
  tab.addEventListener("click", function (evt) {
    // Remove active class from all tabs (optional if you want to mark active tabs)
    tabs.forEach((t) => t.classList.remove("actived-tab"));
    evt.currentTarget.classList.add("actived-tab");

    // Get the selected category from the tab text
    const category = evt.target.textContent.trim().toLowerCase();

    // Get all content elements (images)
    const contents = document.querySelectorAll(".tabcontent");
    contents.forEach((content) => {
      // Show all if "all" is selected, otherwise check the data-category attribute
      if (
        category === "all" ||
        content.getAttribute("data-category") === category
      ) {
        content.style.display = "block";
      } else {
        content.style.display = "none";
      }
    });
  });
});
// On page load, simulate a click on the "all" tab to show all images
document.addEventListener("DOMContentLoaded", function () {
  if (tabs.length > 0) {
    tabs[0].click();
  }
});
// count on scroll
// ! step-1 selection
let aboutSection = document.getElementById(`about`);
let About_cards = document.querySelectorAll(
  `#about .pic + .container-fluid .cards .card`
);
let values = [170, 203, 340, 540];
let hasStarted = false;
window.addEventListener(`scroll`, function () {
  // Get the section's position relative to the viewport
  const sectionTop = aboutSection.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;
  // Start animation when section is 80% in view
  if (aboutSection && sectionTop <= windowHeight * 0.8 && !hasStarted) {
    hasStarted = true;
    About_cards.forEach((card, index) => {
      const numberElement = card.querySelector("h1");
      if (!numberElement) {
        console.warn("No number element found in card");
        return;
      }

      let currentValue = 0;
      const targetValue = values[index];
      const duration = 2000; // 2 seconds
      const increment = targetValue / (duration / 16); // 60fps

      console.log(`Animating card ${index} from 0 to ${targetValue}`);

      const animate = () => {
        currentValue += increment;
        if (currentValue < targetValue) {
          numberElement.textContent = Math.round(currentValue);
          requestAnimationFrame(animate);
        } else {
          numberElement.textContent = targetValue;
        }
      };

      animate();
    });
  }
});


