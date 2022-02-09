"use strict";

// const tabList = document.querySelector(".gnb__list");
// const tab = {
//   startX: 0,
//   scrollLeft: 0,
//   mouseMove: false,
// };

// const tabMouseMove = (event) => {
//   event.stopPropagation();
//   event.preventDefault();

// switch (
//   event.buttons === 1 // 마우스 클릭 시 정수 1 반환
// ) {
//   case true:
//     // 스크롤이 움직이는 상태에서 click 이벤트 제거 (※mouseup 이벤트 중복 방지)
//     if (event.target.localName === "a") {
//       event.target.removeEventListener("click", tabLinkClick);
//     }
//     tabList.classList.add("active"); // 개발자 도구에서 확인을 위한 빈 클래스 추가
//     const scroll = event.pageX - tab.startX; // 시작 값에서 계속 변화는 pageX 값 빼기
//     tabList.scrollLeft = tab.scrollLeft - scroll; //분기별 시작점에서 구해진 스크롤 값 빼기
//     break;
//   case false:
//     // 스크롤이 움직이지 않는 상태에서 click 이벤트 추가
//     if (event.target.localName === "a") {
//       event.target.addEventListener("click", tabLinkClick);
//     }
//     // 마우스가 있는 위치 값 구하기
//     tab.startX = event.pageX - tabList.getBoundingClientRect().left;
//     // 클릭이 안된 상태에서 좌측 스크롤 크기 구하기 [분기별이라고 생각]
//     tab.scrollLeft = tabList["scrollLeft"];
//     return;
// }
// };

// const tabMouseUp = (event) => {
//   event.stopPropagation();
//   tabList.classList.remove("active");
// };

// tabList.addEventListener("mouseup", tabMouseUp);
// mousemove;
// tabList.addEventListener("mousemove", tabMouseMove);

const tab = new Map();
const shiftX_Str = "shiftX";
const active_Str = "active";
const gnbList_Str = ".gnb__list";

document.querySelector(gnbList_Str).addEventListener("mousemove", (event) => {
  event.stopPropagation();

  if (event.buttons === 1) {
    const gnbList = document.querySelector(gnbList_Str);
    gnbList.classList.add(active_Str);
    const left = event.clientX - tab.get(shiftX_Str);
    gnbList.style.left = `${left}px`;
    console.log(`shiftX : ${tab.get(shiftX_Str)}`);
    console.log(`clientX : ${event.clientX}`);
  } else {
    const gnbList = document.querySelector(gnbList_Str);
    const shiftX = event.clientX - gnbList.getBoundingClientRect().left;
    tab.set(shiftX_Str, shiftX);
    console.log(`No Buttons : ${shiftX}`);
  }
});

const tabMouseUp = (event) => {
  event.stopPropagation();
  const gnbList = document.querySelector(gnbList_Str);
  gnbList.classList.remove("active");
};

document.querySelector(gnbList_Str).addEventListener("mouseup", tabMouseUp);
