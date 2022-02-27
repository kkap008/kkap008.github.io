// MAIN
window.addEventListener("load", () => {
  const header = document.querySelector(".header");
  const main = document.querySelector(".main");
  const headerHeight = header.getBoundingClientRect().height;

  main.style.marginTop = `${headerHeight}px`;
});

const headerObserver = new ResizeObserver(setMainPosition);
const header = document.querySelector(".header");

function setMainPosition(entries) {
  for (let entry of entries) {
    const entryBorderBox = entry.borderBoxSize[0].blockSize;
    const main = document.querySelector(".main");

    main.style.marginTop = `${entryBorderBox}px`;
  }
}

headerObserver.observe(header, { box: "border-box" });

const carouselPrev = document.querySelector(".carousel__prev");
const carouselNext = document.querySelector(".carousel__next");
const carouselList = document.querySelector(".js-carousel__list");

carouselList.addEventListener("click", (event) => {
  console.log(event);
});

carouselNext.addEventListener("click", () => {
  carouselList.style.transform = "translateX(-100%)";
  carouselList.addEventListener(
    "transitionend",
    () => {
      carouselList.style.transition = "none";
      carouselList.appendChild(carouselList.firstElementChild);
      carouselList.style.transform = "translateX(0%)";
      setTimeout(() => {
        carouselList.style.transition = "transform 0.3s ease";
      }, 0);
    },
    { once: true }
  );
});
carouselPrev.addEventListener("click", () => {
  carouselList.style.transition = "none";
  carouselList.prepend(carouselList.lastElementChild);
  carouselList.style.transform = "translateX(-100%)";

  setTimeout(() => {
    carouselList.style.transition = "transform 0.3s ease";
    carouselList.style.transform = "translateX(0%)";
  }, 0);
});
