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
