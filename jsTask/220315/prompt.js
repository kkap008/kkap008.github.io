"use strict";

class Print {
  constructor() {
    this.$btn = document.querySelector("[data-prompt='btn']");
    this.$print = document.querySelector("[data-prompt='print']");
  }

  addEventListener(target, type, callBack) {
    target.addEventListener(type, callBack);
  }

  check(local, user) {
    switch (local && user) {
      case undefined:
      case false:
        this.checkInput(local, user);
        break;
      default:
        this.matchName(local, user);
        break;
    }
  }

  checkInput(local, user) {
    if (!local && !user) {
      this.$print.textContent = "이름과 주소를 입력해주세요";
    } else if (!local) {
      this.$print.textContent = "주소를 입력해주세요";
    } else {
      this.$print.textContent = "이름을 입력해주세요";
    }
  }

  matchName(local, user) {
    if (user.match(/[\d]+/)) {
      this.$print.textContent = "이름은 영문,한글로 입력해주세요";
      return;
    } else {
      if (!this.$print.firstChild) {
        this.$name = document.createElement("span");
        this.$address = document.createElement("span");
        this.$print.append(
          "이름 : ",
          this.$name,
          document.createElement("br"),
          "거주 지역 : ",
          this.$address
        );
      }

      this.$name.textContent = user.match(/[a-zA-Z\s가-힣ㄱ-ㅎ]/g).join("");
      this.$address.textContent = local;
    }
  }
}

class PrintEvent extends Print {
  constructor() {
    super();
  }

  printCallback = () => {
    const local = prompt("사는 지역은?") || undefined;
    const user = prompt("이름은?") || undefined;

    this.check(local, user);
  };
}

const print = new PrintEvent();
print.addEventListener(print.$btn, "click", print.printCallback);
