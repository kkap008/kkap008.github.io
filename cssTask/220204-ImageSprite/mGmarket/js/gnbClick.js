const gnbItemLink = document.querySelectorAll(".gnb__item-link");
const link = new Map();

const tabLinkClick = (event) => {
  event.stopPropagation();

  // 이전 태그와 현재 태그가 같으면 함수 종료
  if (link.get("tag") === event.target) return;

  // 이전 a 태그 효과 제거
  const prev = link.get("tag");
  prev.classList.remove("--green");

  // 현재 a 태그 효과 추가
  event.target.classList.add("--green");

  // 기존 태그 제거
  link.delete("tag");

  // 현재 태그 적용
  link.set("tag", event.target);

  // 메인 사진 변경
  const mainContent = document.querySelector(".main__content");
  const linkIndex = event.target["dataset"].index;
  const type = ".jpg";
};

const aTagsAddEventListener = (tag, tagIndex) => {
  let index = tagIndex + 1;
  // 활성 요소 저장
  if (!link.size) {
    link.set("tag", tag);
  }
  tag.setAttribute("data-index", index);
  tag.addEventListener("click", tabLinkClick);
};

gnbItemLink.forEach(aTagsAddEventListener);
