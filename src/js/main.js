// Burger Menu
const burgerIcon = document.querySelector(".nav__burger-menu");
const mobileMenu = document.querySelector(".mobile-menu");
const overlay = document.querySelector(".overlay");
const body = document.querySelector("body");

[burgerIcon, overlay].forEach(function (element) {
  element.addEventListener("click", function () {
    burgerIcon.classList.toggle("nav__burger-closed");
    mobileMenu.classList.toggle("show");
    overlay.classList.toggle("gradient");
    body.classList.toggle("hide-overflow");
  });
});

/////////////////////////////
//Horizonatal scroll by grabbing
let testimonials = document.querySelector(".testimonials__wrapper");

let startX;
let testimonialsScroll;
let isDown = false;

testimonials.addEventListener("mousedown", function (e) {
  isDown = true;
  startX = e.clientX; //detect the point where you clicked
  testimonialsScroll = testimonials.scrollLeft; //detect scrolled space
});

testimonials.addEventListener("mouseup", function () {
  isDown = false;
});
testimonials.addEventListener("mouseleave", function () {
  isDown = false;
});

testimonials.addEventListener("mousemove", function (e) {
  if (isDown == false) return;
  e.preventDefault();
  //console.log(e.clientX - startX); //distance from the point we clicked to the point you move the mouse to
  testimonials.scrollLeft = testimonialsScroll - (e.clientX - startX); //add the scrolled space
});

//////////////////////////////
//slider
let testimonialsItems = document.querySelectorAll(".testimonials__item");
let slideButtons = document.querySelectorAll(".slide-btn");

slideButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    const circle = btn.dataset.slide;
    const item = document.getElementById(circle);
    const testimonialsScroll = testimonials.scrollLeft;

    testimonials.scrollTo({
      top: 0,
      left: item.getBoundingClientRect().left + testimonialsScroll,
      behavior: "smooth",
    });
  });
});

//change slider buttons while scrolling
let options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.6,
};
let observer = new IntersectionObserver(function (entries) {
  testimonials.addEventListener("scroll", function () {
    var itemNumber;

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        itemNumber = entry.target.id;
      }
    });

    slideButtons.forEach(function (btn) {
      if (btn.dataset.slide == itemNumber) {
        document.querySelector(".active").classList.remove("active");
        btn.classList.add("active");
      }
    });
  });
}, options);

testimonialsItems.forEach(function (item) {
  observer.observe(item);
});

////////////////////////////////////////
//Footer Form validation
const submit = document.querySelector(".footer__button");
const email = document.querySelector(".footer__input");
const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const notValid = document.querySelector(".footer__validation-text");

submit.addEventListener("click", function (e) {
  if (email.value.match(pattern)) {
    notValid.style.display = "none";
  } else {
    e.preventDefault();
    notValid.style.display = "block";
    email.focus();
  }
});
