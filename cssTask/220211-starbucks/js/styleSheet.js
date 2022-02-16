export {
  getDocumentStyleSheets,
  chageObjectInArray,
  findStyleSheet,
  findCssText,
  replaceCssText,
};

function getDocumentStyleSheets() {
  return document.styleSheets;
}

function chageObjectInArray(obj) {
  if (Array.isArray(obj)) return undefined;
  return Array.from(obj);
}

function findStyleSheet(styleSheets, selectorText) {
  const array = chageObjectInArray(styleSheets);
  let _index = undefined;
  const result = array.some(({ href }, index) => {
    const matchResult = String(href.match(/[\w\s\d]+[\W]*(?=\.css)/i));
    if (matchResult !== selectorText) return false;
    _index = index;
    return true;
  });

  if (!result) return false;

  return styleSheets[_index];
}

function findCssText(cssStyleSheet, _selectorText) {
  const _cssStyleSheet = chageObjectInArray(cssStyleSheet.cssRules);

  let _cssText = undefined;
  let _index = undefined;
  const result = _cssStyleSheet.some(({ selectorText, cssText }, index) => {
    const matchResult = _selectorText !== selectorText ? true : false;
    if (matchResult) return false;
    _cssText = cssText.match(/\w+\-*\w+\:+[\d\w\s\(\)\-\+]*\;+/gi);
    _index = index;
    return true;
  });

  if (!result) return false;

  return new Map().set(_selectorText, _cssText).set("index", _index);
}

function replaceCssText(selectorText, cssText, ...keys) {
  let _cssText = cssText.get(selectorText);
  _cssText.forEach((element, index) => {
    const _element = String(element.match(/\w+\-*\w+/i)).trim();
    const _index = index;

    keys.forEach((key) => {
      const _key = String(key.match(/\w+\-*\w+/i)).trim();
      if (_key === _element) {
        _cssText[_index] = key + ";";
      }
    });
  });

  const joinCssText = cssText.get(selectorText).join(" ");

  cssText.set(selectorText, `${selectorText} { ${joinCssText} }`);
}
