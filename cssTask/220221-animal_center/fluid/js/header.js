// HEADER GNB OPEN & CLOSE EVENT
const GNB_BTN_OPEN = document.querySelector(".js-gnb-btn--open");
const GNB_BTN_CLOSE = document.querySelector(".js-gnb-btn--close");

GNB_BTN_OPEN.addEventListener("pointerdown", pointerEvent);
GNB_BTN_CLOSE.addEventListener("pointerdown", pointerEvent);
GNB_BTN_OPEN.addEventListener("keydown", pointerEvent);
GNB_BTN_CLOSE.addEventListener("keydown", pointerEvent);

function pointerEvent(event) {
  const pointerType = event.pointerType || undefined;
  const keyCode = event.code || undefined;

  switch (pointerType || keyCode) {
    case "touch":
    case "mouse":
    case "Enter":
      const gnbBtnContains =
        event.currentTarget.classList.contains("js-gnb-btn");
      if (gnbBtnContains) {
        gnbAnimation();
      } else {
        const currentLnbObj = currentLnb(event);
        lnbTabIndexChange(currentLnbObj);
        lnbChageIcon(currentLnbObj);
        lnbAnimation(currentLnbObj);
      }
      break;
    default:
      return;
  }
}

function gnbAnimation() {
  const gnbSelector = ".js-header__nav--mobile";
  const gnb = document.querySelector(gnbSelector);

  gnb.classList.toggle("OPEN");
}

// HEADER LNB OPEN & CLOSE EVENT
const LNB_BTN = document.querySelectorAll(".js-lnb-btn");

LNB_BTN.forEach((element) => {
  element.addEventListener("pointerdown", pointerEvent);
  element.addEventListener("keydown", pointerEvent);
});

function currentLnb(event) {
  return {
    currentTarget: event.currentTarget,
    lnb: event.currentTarget.nextElementSibling,
    lnbToggle: event.currentTarget.classList.toggle("OPEN"),
  };
}

function lnbChageIcon(currentLnbObj) {
  const lnbBtnIcon = currentLnbObj.currentTarget.querySelector("svg");
  const lnbToggle = currentLnbObj.lnbToggle;

  switch (lnbToggle) {
    case true:
      lnbBtnIcon.classList.replace("fa-ellipsis-h", "fa-times");
      break;
    case false:
      lnbBtnIcon.classList.replace("fa-times", "fa-ellipsis-h");
      break;
  }
}

function lnbTabIndexChange(currentLnbObj) {
  const lnbLinks = currentLnbObj.lnb.querySelectorAll(".header__link");
  const lnbToggle = currentLnbObj.lnbToggle;

  switch (lnbToggle) {
    case true:
      lnbLinks.forEach((element) => {
        element.setAttribute("tabindex", "0");
      });
      break;
    case false:
      lnbLinks.forEach((element) => {
        element.setAttribute("tabindex", "-1");
      });
      break;
  }
}

function lnbAnimation(currentLnbObj) {
  const lnb = currentLnbObj.lnb;
  const lnbToggle = currentLnbObj.lnbToggle;
  const lnbScrollHeight = currentLnbObj.lnb.scrollHeight;

  let frame = 0;

  function lnbRequestFrameAnimation() {
    frame += 25;
    switch (lnbToggle) {
      case true:
        lnb.style.height = `${frame}px`;
        if (lnbScrollHeight < frame) {
          lnb.style.height = `${lnbScrollHeight}px`;
          return;
        }
        break;
      case false:
        lnb.style.height = `${lnbScrollHeight - frame}px`;
        if (lnbScrollHeight < frame) {
          lnb.style.height = 0;
          return;
        }
        break;
    }
    requestAnimationFrame(lnbRequestFrameAnimation);
  }

  requestAnimationFrame(lnbRequestFrameAnimation);
}
