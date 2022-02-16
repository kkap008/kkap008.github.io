import * as styleSheetModul from "./styleSheet.js";

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

document.querySelector(".header").addEventListener("pointerup", (event) => {
  const _targetClassName = event.target.classList.item(0);

  switch (_targetClassName) {
    case "header__gnb-icon":
    case "header__lnb-close-img":
      headerLnbBtnEvent(event, _targetClassName);
      return;
    default:
      console.error("No match class name : ", _targetClassName);
      return;
  }
});

function headerLnbBtnEvent({ pointerType }, _targetClassName) {
  const headerLnb = document.querySelector(".header__lnb");
  const headerLnbList = headerLnb.querySelector(".header__lnb-list");

  headerLnbList.classList.add("GNB_ANIMATION");
  headerLnb.classList.add("GNB_ANIMATION");
}
