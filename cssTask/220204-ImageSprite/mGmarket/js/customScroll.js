"use strict";

// .gnb__item-link 선행 작업 변수
const previousGnbItemLink = new Map();
const previousGnbItemLinkKey = Symbol("previousGnbItemLink");
const dataIndexStr = "data-index";

// 스크롤 이벤트 & 클릭 이벤트 변수
const tab = new Map();
const shiftX_str = "shiftX";
const active_str = "active";
const gnbList_str = ".gnb__list";
const gnb_str = ".gnb";
const green = "--green";
const mainContent_str = ".main__content";
const gnbItemLink_str = ".gnb__item-link";
const currentTargetStyleLeft_str = "currentTargetStyleLeft";
const eventTargetATag_str = Symbol("eventTargetAtag");

// json파일 가져오기
async function imgLoadList(index) {
  const imgJson = await fetch("json/imgList.json");
  const imgList = await imgJson.json();
  const images = imgList.imageList;
  let imageSrc = undefined;
  let imageAlt = undefined;

  try {
    imageSrc = images[index].src;
    imageAlt = images[index].alt;
  } catch (error) {
    imageSrc = images[0].src;
    imageAlt = images[0].alt;
  } finally {
    return { imageSrc, imageAlt };
  }
}

function gnbItemLinkForEach(aTag, aTagIndex) {
  let index = aTagIndex + 1;

  if (!previousGnbItemLink.size) {
    previousGnbItemLink.set(previousGnbItemLinkKey, aTag);
  }
  aTag.setAttribute(dataIndexStr, index);
}

function gnbListMoveEvent(event) {
  event.currentTarget.classList.add(active_str);
  const gnb = document.querySelector(gnb_str);
  const overflowWidth = Math.ceil(
    gnb.getBoundingClientRect().width -
      event.currentTarget.getBoundingClientRect().width
  );
  let left = undefined;
  switch (event.type) {
    case "touchmove":
      left =
        event.changedTouches[0].clientX -
        tab.get(shiftX_str) -
        gnb.getBoundingClientRect().left;
      break;
    case "pointermove":
      left =
        event.clientX - tab.get(shiftX_str) - gnb.getBoundingClientRect().left;
      break;
  }

  switch (true) {
    case left > 0:
      left = 0;
      break;
    case left < overflowWidth:
      left = overflowWidth;
      break;
  }
  event.currentTarget.style.left = `${left}px`;
}

function gnbListPointerUpEvent(event) {
  const currentTarget = event.currentTarget;
  const pointerDownCurrentTargetStyleLeft = tab.get(currentTargetStyleLeft_str);
  const pointerUpCurrentTargetStyleLeft = currentTarget.style.left;
  const target = tab.get(eventTargetATag_str);
  const isItAtag = target.localName === "a" ? true : false;
  const pointerGap =
    pointerDownCurrentTargetStyleLeft === pointerUpCurrentTargetStyleLeft
      ? true
      : false;
  currentTarget.removeEventListener("pointermove", gnbListMoveEvent);
  currentTarget.classList.remove(active_str);
  if (isItAtag && pointerGap) {
    aTagClickEvent(target);
  }
}

let left = 0;

function gnbListPointerDownEvent(event) {
  event.stopPropagation(); // 이벤트 전파 방지
  event.preventDefault();
  const currentTarget = event.currentTarget;
  const eventTargetATag = event.target;
  tab.set(currentTargetStyleLeft_str, currentTarget.style.left);
  tab.set(eventTargetATag_str, eventTargetATag);
  if (!currentTarget.style.left) {
    currentTarget.style.left = window.getComputedStyle(currentTarget).left;
  }
  currentTarget.setPointerCapture(event.pointerId);
  const shiftX = event.clientX - currentTarget.getBoundingClientRect().left;
  tab.set(shiftX_str, shiftX);
  switch (event.pointerType) {
    case "touch":
      currentTarget.addEventListener("touchmove", gnbListMoveEvent);

      break;
    case "mouse":
      currentTarget.addEventListener("pointermove", gnbListMoveEvent);
      break;
  }
}

function aTagClickEvent(target) {
  const _previousGnbItemLink = previousGnbItemLink.get(previousGnbItemLinkKey);
  if (_previousGnbItemLink === target) return;
  _previousGnbItemLink.classList.remove(green);
  previousGnbItemLink.delete(previousGnbItemLinkKey);
  target.classList.add(green);
  previousGnbItemLink.set(previousGnbItemLinkKey, target);
  const index = Number(target.getAttribute(dataIndexStr) - 1);
  imgLoadList(index).then((result) => {
    const image = document.querySelector(mainContent_str);

    image.setAttribute("src", result.imageSrc);
    image.setAttribute("alt", result.imageAlt);
  });
}

function gnbListDragStartEvent() {
  return false;
}

document.querySelectorAll(gnbItemLink_str).forEach(gnbItemLinkForEach);

document
  .querySelector(gnbList_str)
  .addEventListener("pointerdown", gnbListPointerDownEvent);

document
  .querySelector(gnbList_str)
  .addEventListener("pointerup", gnbListPointerUpEvent);

document
  .querySelector(gnbList_str)
  .addEventListener("dragstart", gnbListDragStartEvent);
