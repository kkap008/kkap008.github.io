"use strict";

const previousGnbItemLink = new Map();
const previousGnbItemLinkKey = Symbol("previousGnbItemLink");

const aTagPointerDown = (event) => {
  const gnbList = document.querySelector(gnbList_Str);
  gnbList.releasePointerCapture(event.pointerId);
};

document.querySelectorAll(".gnb__item-link").forEach((aTag, aTagIndex) => {
  let index = aTagIndex + 1;

  if (!previousGnbItemLink.size) {
    previousGnbItemLink.set(previousGnbItemLinkKey, aTag);
  }
  aTag.setAttribute("data-index", index);
});
