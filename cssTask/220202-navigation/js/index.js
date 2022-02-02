document.querySelector(".menu-btn").addEventListener("click", (event) => {
  event.stopPropagation();
  event.stopImmediatePropagation();

  const nav = document.querySelector(".nav");
  const menuBtnImg = document.querySelector(".menu-btn__img");

  nav.classList.toggle("nav--open");
  if (nav.classList.contains("nav--open")) {
    menuBtnImg.setAttribute("src", "img/times-solid.svg");
  } else {
    menuBtnImg.setAttribute("src", "img/bars-solid.svg");
  }
});
