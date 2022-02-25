const GNB_BTNS = document.querySelectorAll(".js-gnb-btn");
const LNB_BTNS = document.querySelectorAll(".js-lnb-btn");
const PREV_LNB = new Map();

GNB_BTNS.forEach((element) => {
  element.addEventListener("click", gnbEvent);
});

function gnbEvent() {
  const nav = document.querySelector(".js-header__nav--mobile");
  nav.classList.toggle("OPEN");
}

LNB_BTNS.forEach((element) => {
  element.addEventListener("click", (event) => {
    const currentTarget = event.currentTarget;
    const currentLnb = currentTarget.nextElementSibling;
    const currentlnb_BtnIcon = currentTarget.querySelector("svg");
    const toggle_Result = currentLnb.classList.toggle("OPEN");

    prevLnb_Close(currentLnb);
    lnbLink_TabindexChange(currentLnb, toggle_Result);
    lnbAnimation(currentLnb, currentlnb_BtnIcon, toggle_Result);
  });
});

function prevLnb_Close(currentLnb) {
  const prevLnb = PREV_LNB.get("prev") || undefined;
  const prevCurrentBtn = PREV_LNB.get("currentTarget") || undefined;
  const lnbCompare = prevLnb !== currentLnb;

  if (prevLnb && lnbCompare) {
    prevLnb.classList.remove("OPEN");
    prevLnb.removeAttribute("style");
    prevCurrentBtn
      .querySelector("svg")
      .classList.replace("fa-times", "fa-ellipsis-h");
  }

  PREV_LNB.set("prev", currentLnb);
  PREV_LNB.set("currentTarget", currentLnb.previousElementSibling);
}

function lnbLink_TabindexChange(currentLnb, toggle_Result) {
  const lnbLinks = currentLnb.querySelectorAll(".header__link");
  switch (toggle_Result) {
    case true:
      lnbLinks.forEach((element) => {
        element.setAttribute("tabindex", "0");
      });
      return;
    case false:
      lnbLinks.forEach((element) => {
        element.setAttribute("tabindex", "-1");
      });
      return;
  }
}

function lnbAnimation(currentLnb, currentLnb_Icon, toggle_Result) {
  switch (toggle_Result) {
    case true:
      currentLnb.style.maxHeight = `${currentLnb.scrollHeight}px`;
      currentLnb_Icon.classList.replace("fa-ellipsis-h", "fa-times");
      return;
    case false:
      currentLnb.removeAttribute("style");
      currentLnb_Icon.classList.replace("fa-times", "fa-ellipsis-h");
      return;
  }
}
