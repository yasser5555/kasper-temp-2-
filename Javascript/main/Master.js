/**
 * Search functionality implementation
 */
document.addEventListener("DOMContentLoaded", () => {
  const searchFunctionality = () => {
    const searchForm = document.querySelector(".search-form");
    const searchTrigger = document.querySelector(".search-trigger");
    const searchInput = document.querySelector(".search-input");
    if (!searchTrigger || !searchForm || !searchInput) return;

    const toggleClass = (className, element, force) => {
      const hasClass = element.classList.contains(className);
      force === undefined
        ? element.classList.toggle(className)
        : force
        ? element.classList.add(className)
        : element.classList.remove(className);
      return force === undefined ? !hasClass : force;
    };

    const handleResize = () => {
      if (window.innerWidth <= 992) {
        searchForm.style.transition = "none";
        toggleClass("active", searchForm, false);
        setTimeout(() => (searchForm.style.transition = ""), 10);
      }
    };

    searchTrigger.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (toggleClass("active", searchForm))
        setTimeout(() => searchInput.focus(), 300);
    });

    document.addEventListener("click", (event) => {
      if (
        !searchForm.contains(event.target) &&
        !searchTrigger.contains(event.target)
      ) {
        toggleClass("active", searchForm, false);
      }
    });

    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("Search query:", searchInput.value);
      toggleClass("active", searchForm, false);
    });

    window.addEventListener("resize", handleResize);
    handleResize();
  };

  searchFunctionality();
});
function Remove_And_AddActive(elements,classname) {
  elements.forEach(element => {
    element.addEventListener("click",()=>{
     elements.forEach(element => {
      element.classList.remove(classname)
     })
      element.classList.add(classname)
     })
  });
}
let navLinks = document.querySelectorAll(".nav-link");
Remove_And_AddActive(navLinks,"active-link");

// Counter Animation
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

// Intersection Observer for scroll-based animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(counter => {
                // Reset the counter to 0 before starting new animation
                counter.textContent = '0';
                animateCounter(counter);
            });
        } else {
            // When element is out of view, reset counters
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(counter => {
                counter.textContent = '0';
            });
        }
    });
}, observerOptions);

// Observe all elements containing counters
document.querySelectorAll('.about-stats, .about-content .about-stats').forEach(container => {
    observer.observe(container);
});


