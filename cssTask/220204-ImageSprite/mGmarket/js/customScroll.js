const tab = new Map();
const shiftX_Str = "shiftX";
const active_Str = "active";
const gnbList_Str = ".gnb__list";
const gnb_Str = ".gnb";

document.querySelector(gnb_Str).addEventListener("pointerdown", (event) => {
  event.stopPropagation(); // 이벤트 전파 방지
  const gnbList = document.querySelector(gnbList_Str); // 필요한 변수 정의 및 할당
  gnbList.setPointerCapture(event.pointerId);
  gnbList.addEventListener("pointermove", pointerMove);
  const shiftX = event.clientX - gnbList.getBoundingClientRect().left;
  tab.set(shiftX_Str, shiftX);
});

document.querySelector(gnb_Str).addEventListener("pointerup", (event) => {
  event.stopPropagation(); // 이벤트 전파 방지
  const gnbList = document.querySelector(gnbList_Str); // 필요한 변수 정의 및 할당
  gnbList.releasePointerCapture(event.pointerId);
  gnbList.removeEventListener("pointermove", pointerMove);
  gnbList.classList.remove(active_Str);
});

const pointerMove = (event) => {
  const gnb = document.querySelector(gnb_Str);
  event.preventDefault();
  event.target.classList.add(active_Str);
  let left =
    event.clientX - tab.get(shiftX_Str) - gnb.getBoundingClientRect().left;
  if (left > 0) left = 0;
  //   오른쪽 경계 찾기
  console.dir(event.target);
  console.log(event.clientX);
  console.log(gnb.getBoundingClientRect());
  console.log(event.target.getBoundingClientRect());

  event.target.style.left = `${left}px`;
  //   console.log("pageX : ", event.pageX, typeof event.pageX);
  //   console.log("offsetX : ", event.offsetX, typeof event.offsetX);
  //   console.log("clientX : ", event.clientX, typeof event.clientX);
  //   console.dir(event.target.getBoundingClientRect());
};

/* 문제 a 태그 클릭 시 포인트 이벤트가 지속, nav 및 ul 클릭 시 이벤트 중단 */
