import * as styleSheetModul from "./styleSheet.js";

// 로드 이벤트
window.addEventListener("load", () => {
  const header = "header";
  const headerSearch = ".header__search";
  const index = "index";
  const styleSheets = styleSheetModul.getDocumentStyleSheets();
  const headerStyleSheet = styleSheetModul.findStyleSheet(styleSheets, header);
  const cssText = styleSheetModul.findCssText(headerStyleSheet, headerSearch);

  const headerHeight = document
    .querySelector(header)
    .getBoundingClientRect().height;

  styleSheetModul.replaceCssText(
    headerSearch,
    cssText,
    `min-height:${headerHeight}px`
  );

  const newRule = cssText.get(headerSearch);

  headerStyleSheet.removeRule(cssText.get(index));
  headerStyleSheet.insertRule(newRule, cssText.get(index));
});

// ( 헤더에 관련된 이벤트 필요 변수 선언 및 정의 )
// 선택자
const HEADER_SELECTOR = ".header";
const GNB_ITEM_SELECTOR = ".header__lnb-list > .header__lnb-item";
const SUB_LNB_ITEM_SELECTOR = ".header__sub-lnb > .header__lnb-item";
const LNB_WRAP_SELECTOR = ".header__lnb";
const LNB_SELECTOR = ".header__lnb-list";
const CHILD_SUB_LNB_SELECTOR = ".header__sub-lnb";
const CHILD_LNB_BTN_ICON_SELECTOR = ".header__lnb-btn-icon";
const CHILD_LAST_LNB_SELECTOR = ".header__lnb-last-lnb";
const CHILD_SUB_LNB_BTN_ICON_SELECTOR = ".header__lnb-btn-icon";
// 이벤트 추가 시 필요
const HEADER = document.querySelector(HEADER_SELECTOR);
const GNB_LISTS = document.querySelectorAll(GNB_ITEM_SELECTOR);
const SUB_LNB_LISTS = document.querySelectorAll(SUB_LNB_ITEM_SELECTOR);
// 클래스 추가 및 제거 시 필요
const OPEN = "OPEN";
const CLOSE = "CLOSE";
// 이벤트 타입
const POINTER_UP = "pointerup";
const KEY_DOWN = "keydown";
// 키보드 이벤트 발생 시 사용할 코드
const ENTER = "Enter";
const SPACE = "Space";
const TAB = "Tab";
// 클래스 이름
const HEADER_GNB_ICON = "header__gnb-icon";
const HEADER_GNB_BTN = "header__gnb-btn";
const HEADER_LNB_CLOSE_IMG = "header__lnb-close-img";
const HEADER_LNB_CLOSE = "header__lnb-close";
// 단위
const PX = "px";
const ZERO = 0;
const UNDEFINED = undefined;
const TRUE = true;
const FALSE = false;

// GNB 열고 닫는 이벤트
HEADER.addEventListener(POINTER_UP, (event) => {
  checkGnbBtnEvent(event);
});
HEADER.addEventListener(KEY_DOWN, (event) => {
  if (event.code === ENTER || event.code === SPACE) {
    checkGnbBtnEvent(event);
  }
});

// GNB 포인터 이벤트
GNB_LISTS.forEach((target) => {
  target.addEventListener(POINTER_UP, (event) => {
    showLnbList(event);
  });
});
// GNB 키보드 이벤트
GNB_LISTS.forEach((target) => {
  target.addEventListener(KEY_DOWN, (event) => {
    switch (event.code) {
      case ENTER:
      case SPACE:
        showLnbList(event);
        return;
      default:
        return;
    }
  });
});

// GNB 리스트 사용된 함수
function showLnbList(event) {
  event.stopPropagation();
  const currentTarget = event.currentTarget;
  const target = currentTarget.querySelector(CHILD_SUB_LNB_SELECTOR);
  const targetIcon = currentTarget.querySelector(CHILD_LNB_BTN_ICON_SELECTOR);
  let toggleResult = target.classList.toggle(OPEN);
  targetIcon.classList.toggle(OPEN);

  showListAnimation(target, toggleResult);
}

// GNB 사용된 함수
function checkGnbBtnEvent(event) {
  const _targetClassName = event.target.classList.item(0);

  switch (_targetClassName) {
    case HEADER_GNB_ICON:
    case HEADER_LNB_CLOSE_IMG:
    case HEADER_GNB_BTN:
    case HEADER_LNB_CLOSE:
      showGnbBtnEvent();
      return;
    default:
      console.error("No match class name : ", _targetClassName);
      return;
  }
}

function showGnbBtnEvent() {
  const headerLnb = document.querySelector(LNB_WRAP_SELECTOR);
  const headerLnbList = headerLnb.querySelector(LNB_SELECTOR);

  if (!headerLnb.classList.contains(OPEN)) {
    if (headerLnb.classList.contains(CLOSE)) {
      headerLnb.classList.replace(CLOSE, OPEN);
      headerLnbList.classList.replace(CLOSE, OPEN);
      return;
    }
    headerLnb.classList.add(OPEN);
    headerLnbList.classList.add(OPEN);
  } else {
    headerLnb.classList.replace(OPEN, CLOSE);
    headerLnbList.classList.replace(OPEN, CLOSE);
  }
}

// LNB 리스트 - 포인터 이벤트
SUB_LNB_LISTS.forEach((target) => {
  target.addEventListener(POINTER_UP, (event) => {
    showSubLnbList(event);
  });
});
// LNB 리스트 - 키보드 이벤트
SUB_LNB_LISTS.forEach((target) => {
  target.addEventListener(KEY_DOWN, (event) => {
    switch (event.code) {
      case ENTER:
      case SPACE:
        showSubLnbList(event);
        return;
      default:
        return;
    }
  });
});

// SUB LNB 리스트 사용된 함수
function showSubLnbList(event) {
  event.stopPropagation();
  const currentTarget = event.currentTarget;
  const target = currentTarget.querySelector(CHILD_LAST_LNB_SELECTOR);
  const targetIcon = currentTarget.querySelector(
    CHILD_SUB_LNB_BTN_ICON_SELECTOR
  );
  const targetParent = currentTarget.parentElement;
  let toggleResult = target.classList.toggle(OPEN);
  targetIcon.classList.toggle(OPEN);

  showListAnimation(target, toggleResult, targetParent);
}

// List 이벤트 발생 시 사용될 애니메이션
function showListAnimation(target, toggleResult, currentTarget) {
  let LOCAL_FPS = 0;
  const LOCAL_STEP_FPS = 35;
  const LOCAL_TARGET_SCROLL_HEIGHT = target.scrollHeight;
  const LOCAL_CURRENT_TARGET_HEIGHT = currentTarget
    ? currentTarget.getBoundingClientRect().height
    : UNDEFINED;

  function step() {
    LOCAL_FPS = LOCAL_FPS + LOCAL_STEP_FPS;

    switch (toggleResult) {
      case TRUE:
        if (LOCAL_TARGET_SCROLL_HEIGHT < LOCAL_FPS) {
          target.style.height = `${LOCAL_TARGET_SCROLL_HEIGHT}${PX}`;
          if (currentTarget) {
            currentTarget.style.height = `${
              LOCAL_CURRENT_TARGET_HEIGHT + LOCAL_TARGET_SCROLL_HEIGHT
            }${PX}`;
          }
          return;
        } else {
          if (currentTarget) {
            currentTarget.style.height = `${
              LOCAL_CURRENT_TARGET_HEIGHT + LOCAL_FPS
            }${PX}`;
          }
          target.style.height = `${LOCAL_FPS}${PX}`;
        }
        break;
      case FALSE:
        if (LOCAL_TARGET_SCROLL_HEIGHT < LOCAL_FPS) {
          target.style.height = `${ZERO}${PX}`;
          if (currentTarget) {
            currentTarget.style.height = `${
              LOCAL_CURRENT_TARGET_HEIGHT - LOCAL_TARGET_SCROLL_HEIGHT
            }${PX}`;
          }
          return;
        }
        if (currentTarget) {
          currentTarget.style.height = `${
            LOCAL_CURRENT_TARGET_HEIGHT - LOCAL_FPS
          }${PX}`;
        }
        target.style.height = `${LOCAL_TARGET_SCROLL_HEIGHT - LOCAL_FPS}${PX}`;
        break;
    }

    requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}
