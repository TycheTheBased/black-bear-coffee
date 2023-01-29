//Navigation
const sidebar = document.querySelector(".sidebar");
function navigationHandler() {
  const hamburgerMenu = document.querySelector(".burger-menu");
  const navbar = document.querySelector("header");
  const menuBtn = document.querySelector(".view-menu-btn");

  hamburgerMenu.addEventListener("click", navHandler);
  navbar.addEventListener("click", scrollToHandler);
  menuBtn.addEventListener("click", scrollToHandler);

  function scrollToHandler(evt) {
    evt.preventDefault();
    if (!evt.target.classList.contains("nav-link")) return;

    const sectionName = evt.target.getAttribute("href");

    document
      .querySelector(`.${sectionName}`)
      .scrollIntoView({ behavior: "smooth" });

    if (evt.target.parentElement.classList.contains("sidebar_item")) {
      sidebar.classList.toggle("open");
    }
  }

  function navHandler() {
    sidebar.classList.toggle("open");
  }
}

navigationHandler();

//Accordian
function drawer() {
  const menuAccord = document.querySelectorAll(".menu-name");

  menuAccord.forEach((item) => item.addEventListener("click", menuHandler));
  function menuHandler() {
    const targetMenu = this.nextElementSibling;
    const arrow = this.lastElementChild;

    targetMenu.classList.toggle("active");
    arrow.classList.toggle("menu-active");
  }
}

drawer();

//Slider
function slider() {
  const slides = document.querySelectorAll(".slider-item");
  const slideLength = slides.length;

  const nextBtn = document.querySelector(".slider-next");
  const previousBtn = document.querySelector(".slider-previous");

  let currentSlide = 0;

  function initSlides() {
    slides.forEach((sl, i) => (sl.style.transform = `translateX(${i * 100}%)`));
  }

  initSlides();

  nextBtn.addEventListener("click", nextSlideHandler);
  previousBtn.addEventListener("click", previousSlideHandler);

  function goToSlide(currentSlide) {
    slides.forEach(
      (sl, i) =>
        (sl.style.transform = `translateX(${100 * (i - currentSlide)}%)`)
    );
  }

  function nextSlideHandler() {
    if (currentSlide >= slideLength - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
  }

  function previousSlideHandler() {
    if (currentSlide <= 0) {
      currentSlide = slideLength - 1;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
  }
}

slider();

//Modal
function modal() {
  const contactUsBtn = document.querySelectorAll(".contact-us");
  const modal = document.querySelector(".modal");
  const backdrop = document.querySelector(".backdrop");
  const closeModalBtn = document.querySelector(".close-modal");
  const inputs = document.querySelectorAll(".modal-input");
  const submitBtn = document.querySelector(".send-btn");

  contactUsBtn.forEach((btn) =>
    btn.addEventListener("click", openModalHandler)
  );

  closeModalBtn.addEventListener("click", closeModalHandler);
  submitBtn.addEventListener("click", submitMessageHandler);
  function submitMessageHandler() {
    inputs.forEach((input) => {
      input.value = "";
    });
  }

  function closeModalHandler(evt) {
    evt.preventDefault();

    modal.classList.toggle("close");
    backdrop.classList.toggle("close");
  }

  function openModalHandler(evt) {
    evt.preventDefault();
    modal.classList.toggle("close");
    backdrop.classList.toggle("close");
    sidebar.classList.toggle("open");
  }
}

modal();

//Section Reveals
function sectionReveals() {
  const sections = document.querySelectorAll("section");
  const observer = new IntersectionObserver(sectionReveal, {
    threshold: 0.3,
    root: null,
  });
  sections.forEach((section) => observer.observe(section));
  function sectionReveal(entries) {
    const [entry] = entries;
    if (entry.isIntersecting) {
      entry.target.classList.remove("section-hidden");
      observer.unobserve(entry.target);
    }
  }
}

sectionReveals();
