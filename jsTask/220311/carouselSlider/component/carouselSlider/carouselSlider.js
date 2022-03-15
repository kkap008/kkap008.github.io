"use strict";

class test {
  constructor() {
    this.test = this;
  }
  static get test() {
    console.log(this);
  }
}

class GetComponentSlider {
  constructor() {
    this.domain = location.origin;
    this.componentUrl = `${this.domain}/jsTask/220311/carouselSlider/component/carouselSlider/carouselSlider.html`;
    this.xmlHttp = new XMLHttpRequest();
  }

  getComponentHtml({ responseText }) {
    const domParser = new DOMParser();
    return domParser.parseFromString(responseText, "text/html");
  }

  getComponentFragment(componentHtml) {
    const fragment = new DocumentFragment();
    const style = componentHtml.querySelector("style");
    const componentElement = componentHtml.body.firstElementChild;
    const textType = 3;

    for (let i = 0; i < componentElement.childNodes.length; ++i) {
      const child = componentElement.childNodes[i];
      if (child.nodeType !== textType) {
        fragment.appendChild(child);
      }
    }

    fragment.prepend(style);

    return fragment;
  }

  appendChildComponent(fragment) {
    this.$carouselSlider.appendChild(fragment);
  }

  addXmlLoadEvent(callback) {
    const thisBindCallback = callback.bind(this);
    this.xmlHttp.addEventListener("load", thisBindCallback);
  }

  xmlLoadCallBack(event) {
    const xmlHttp = event.target;
    const xmlHttpRequestState = xmlHttp.readyState;
    const xmlHttpStatus = xmlHttp.status;

    if (xmlHttpRequestState === xmlHttp.DONE && xmlHttpStatus === 200) {
      const componentHtml = this.getComponentHtml(xmlHttp);
      const fragment = this.getComponentFragment(componentHtml);
      this.appendChildComponent(fragment);
    }
  }

  async includeComponent() {
    this.addXmlLoadEvent(this.xmlLoadCallBack);
    this.xmlHttp.open("GET", this.componentUrl, false);
    this.xmlHttp.send();
  }
}

class ComponentSlider extends GetComponentSlider {
  constructor() {
    super();
    this.$carouselSlider = this.getElement("[data-include='carousel-slider']");
    this.direction = "flex-start";
  }

  getElement(selector, all = false) {
    if (all) {
      return document.querySelectorAll(selector);
    } else {
      return document.querySelector(selector);
    }
  }

  init() {}
  autoPlay() {}
}

const componentSlider = new ComponentSlider();
componentSlider.includeComponent();
componentSlider.init();

const $carouselSlider = componentSlider.$carouselSlider;
const $carouselSliderLeftBtn = $carouselSlider.querySelector("[class$='left']");
const $carouselSliderRightBtn =
  $carouselSlider.querySelector("[class$='right']");

$carouselSliderLeftBtn.addEventListener("click", nextSlider);

$carouselSliderRightBtn.addEventListener("click", prevSlider);
const AUTO_PLAY_MS = 2500;
const SLIDER_MOVE = 100;

function nextSlider(event) {
  if (event) {
    clearInterval(autoPlay);
    autoPlay = setInterval(nextSlider, AUTO_PLAY_MS);
  }
  const target = getCarouselSliderList();
  let direction = getDirection(target);
  if (direction === "flex-end") {
    target.prepend(target.lastElementChild);
    target.style.justifyContent = "flex-start";
    direction = "flex-start";
  }
  target.style.transform = `translateX(${-SLIDER_MOVE}%)`;
  transitionEndEvent(direction, target);
}

function prevSlider(event) {
  if (event) {
    clearInterval(autoPlay);
    autoPlay = setInterval(nextSlider, AUTO_PLAY_MS);
  }
  const target = getCarouselSliderList();
  let direction = getDirection(target);
  if (direction === "flex-start") {
    target.append(target.firstElementChild);
    target.style.justifyContent = "flex-end";
    direction = "flex-end";
  }
  target.style.transform = `translateX(${SLIDER_MOVE}%)`;
  transitionEndEvent(direction, target);
}

function getCarouselSliderList() {
  return $carouselSlider.querySelector("[class$='list']");
}

function getDirection(carouselSliderList) {
  const direction = getComputedStyle(carouselSliderList).justifyContent;
  return direction;
}

function transitionEndEvent(direction, target) {
  target.addEventListener(
    "transitionend",
    () => {
      switch (direction) {
        case "flex-start":
          target.append(target.firstElementChild);
          break;
        case "flex-end":
          target.prepend(target.lastElementChild);
          break;
      }

      target.style.transition = "none";
      target.style.transform = "translateX(0)";
      setTimeout(() => {
        target.style.transition = "transform 0.3s ease";
      }, 0);
    },
    { once: true }
  );
}

let autoPlay = setInterval(nextSlider, AUTO_PLAY_MS);
