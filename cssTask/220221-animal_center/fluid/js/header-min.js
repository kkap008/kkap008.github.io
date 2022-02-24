const GNB_BTNS = document.querySelectorAll(".js-gnb-btn");
const LNB_BTNS = document.querySelectorAll(".js-lnb-btn");

GNB_BTNS.forEach((element) => {
  element.addEventListener("click", gnbEvent);
});

function gnbEvent(event) {
  const nav = document.querySelector(".js-header__nav--mobile");
  nav.classList.toggle("OPEN");
}

LNB_BTNS.forEach((element) => {
  element.addEventListener("click", (event) => {
    const lnb = event.currentTarget.nextElementSibling;
    lnb.classList.toggle("OPEN");
    if (lnb.classList.contains("OPEN")) {
      lnb.style.maxHeight = `${lnb.scrollHeight}px`;
    } else {
      lnb.removeAttribute("style");
    }
  });
});
