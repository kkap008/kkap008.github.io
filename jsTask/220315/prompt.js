"use strict";

(function () {
  function promptEvent() {
    const local = prompt("사는 지역은?") || undefined;
    const user = prompt("이름은?") || undefined;
    const $print = document.querySelector("[data-prompt='print']");

    switch (local && user) {
      case undefined:
      case false:
        if (!local && !user) {
          $print.textContent = "이름과 주소를 입력해주세요";
        } else if (!local) {
          $print.textContent = "주소를 입력해주세요";
        } else {
          $print.textContent = "이름을 입력해주세요";
        }
        break;
      default:
        if (user.match(/[\d]+/)) {
          $print.textContent = "이름은 영문,한글로 입력해주세요";
          return;
        } else {
          $print.textContent = `${user
            .match(/[a-zA-Z\s가-힣ㄱ-ㅎ]/g)
            .join()}가 사는 지역은 ${local}입니다`;
        }

        break;
    }
  }

  const $input = document.querySelector("[data-prompt='input']");
  $input.addEventListener("click", promptEvent);
})();
