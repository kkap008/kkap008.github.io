const headerObserver = new ResizeObserver(setMainPosition);
const header = document.querySelector(".header");

function setMainPosition(entries) {
  for (let entry of entries) {
    const entryBorderBox = entry.borderBoxSize[0].blockSize;
    const main = document.querySelector(".main");

    main.style.top = `${entryBorderBox}px`;
  }
}

headerObserver.observe(header, { box: "border-box" });

const carouselNextBtn = document.querySelector(".js-carousel__next");
const carouselPrevBtn = document.querySelector(".js-carousel__prev");
const carouselList = document.querySelector(".js-carousel__list");
let derection = "flex-start";

const mediaQuery = window.matchMedia("screen and (min-width:64rem)").matches;

if (mediaQuery) {
  console.log("pc");
  carouselNextBtn.addEventListener("click", () => {
    carouselNextTransform();
    carouselTransitionEnd(derection, carouselList);
  });

  carouselPrevBtn.addEventListener("click", () => {
    carouselPrevTransform();
    carouselTransitionEnd(derection, carouselList);
  });
} else {
  console.log("mobile");
  carouselNextBtn.style.display = "none";
  carouselPrevBtn.style.display = "none";

  setInterval(() => {
    carouselNextTransform();
    carouselTransitionEnd(derection, carouselList);
  }, 4000);
}

function carouselTransitionEnd(derection, carouselList) {
  carouselList.addEventListener(
    "transitionend",
    () => {
      switch (derection) {
        case "flex-start":
          carouselList.appendChild(carouselList.firstElementChild);
          break;
        case "flex-end":
          carouselList.prepend(carouselList.lastElementChild);
          break;
      }
      carouselList.style.transition = "none";
      carouselList.style.transform = "translateX(0)";
      setTimeout(() => {
        carouselList.style.transition = "transform 0.3s ease";
      });
    },
    { once: true }
  );
}

function carouselNextTransform() {
  if (derection === "flex-end") {
    derection = "flex-start";
    carouselList.prepend(carouselList.lastElementChild);
  }
  carouselList.style.justifyContent = derection;
  carouselList.style.transform = "translateX(-100%)";
}

function carouselPrevTransform() {
  if (derection === "flex-start") {
    derection = "flex-end";
    carouselList.appendChild(carouselList.firstElementChild);
  }
  carouselList.style.justifyContent = derection;
  carouselList.style.transform = "translateX(100%)";
}
