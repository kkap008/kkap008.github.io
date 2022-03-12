class carouselSlider extends HTMLElement {
  constructor() {
    super();
    console.log(this);
  }
}

const $carousel_slider = document.querySelector(
  "[data-include='carousel-slider']"
);

const carouselslider_component = document.createElement(
  "carouselslider-component"
);

const $body = document.querySelector("body");

$body.appendChild(carouselslider_component);
