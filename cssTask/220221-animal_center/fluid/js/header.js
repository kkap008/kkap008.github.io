const GNB_BTN_OPEN = document.querySelector(".js-gnb-btn--open");
const GNB_BTN_CLOSE = document.querySelector(".js-gnb-btn--close");
const LNB_BTN = document.querySelectorAll(".js-lnb-btn");
const PREV_LNB = new Map();

GNB_BTN_OPEN.addEventListener("click", pointerEvent);
GNB_BTN_CLOSE.addEventListener("click", pointerEvent);
GNB_BTN_OPEN.addEventListener("keydown", pointerEvent);
GNB_BTN_CLOSE.addEventListener("keydown", pointerEvent);

// HEADER GNB & LNB POINTER EVENT
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
        lnbTabEvent(event);
      }
      return;
    default:
      return;
  }
}

// HEADER GNB OPEN & CLOSE EVENT
function gnbAnimation() {
  const gnbSelector = ".js-header__nav--mobile";
  const gnb = document.querySelector(gnbSelector);

  gnb.classList.toggle("OPEN");
}

// HEADER LNB HIGHT & ZERO HEIGHT EVENT
LNB_BTN.forEach((element) => {
  element.addEventListener("click", pointerEvent);
  element.addEventListener("keydown", pointerEvent);
});

function lnbTabEvent(event) {
  const currentLnbObj = getLnbObj(event);
  switch (PREV_LNB.size) {
    case 0:
      PREV_LNB.set("prev", currentLnbObj);
      break;
    default:
      const prevLnb = PREV_LNB.get("prev");
      const compareLnb = prevLnb.lnb !== currentLnbObj.lnb ? true : false;
      const classContains = prevLnb.getClassContains();
      if (compareLnb && classContains) {
        lnbTabWorking(prevLnb);
        PREV_LNB.delete("prev");
      }
      break;
  }
  lnbTabWorking(currentLnbObj);
  PREV_LNB.set("prev", currentLnbObj);
}

function lnbTabWorking(lnb) {
  lnb.setLnbClassToggle();
  lnbTabIndexChange(lnb);
  lnbChangeIcon(lnb);
  lnbAnimation(lnb);
}

function getLnbObj(event) {
  return {
    currentTarget: event.currentTarget,
    lnb: event.currentTarget.nextElementSibling,
    lnbClassResult: undefined,
    getClassContains() {
      return this.currentTarget.classList.contains("OPEN");
    },
    setLnbClassToggle() {
      this.lnbClassResult = this.currentTarget.classList.toggle("OPEN");
    },
    getScrollHeight() {
      return this.lnb.scrollHeight;
    },
  };
}

function lnbTabIndexChange(currentLnbObj) {
  const lnbLinks = currentLnbObj.lnb.querySelectorAll(".header__link");
  const lnbToggle = currentLnbObj.lnbClassResult;

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

function lnbChangeIcon(currentLnbObj) {
  const lnbBtnIcon = currentLnbObj.currentTarget.querySelector("svg");
  const lnbToggle = currentLnbObj.lnbClassResult;

  switch (lnbToggle) {
    case true:
      lnbBtnIcon.classList.replace("fa-ellipsis-h", "fa-times");
      break;
    case false:
      lnbBtnIcon.classList.replace("fa-times", "fa-ellipsis-h");
      break;
  }
}

function lnbAnimation(currentLnbObj) {
  const lnb = currentLnbObj.lnb;
  const lnbToggle = currentLnbObj.lnbClassResult;
  const lnbScrollHeight = currentLnbObj.getScrollHeight();

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
