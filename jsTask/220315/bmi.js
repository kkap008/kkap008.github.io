"use strict";

// Bmi Classes
class Bmi {
  constructor() {
    this.$bmi_kg = document.querySelector("[data-bmi='kg-input']");
    this.$bmi_cm = document.querySelector("[data-bmi='cm-input']");
    this.$bmi_btn = document.querySelector("[data-bmi='btn']");
    this.$result = document.querySelector("[data-bmi='result']");
  }

  addEventListener(element, type, callBack) {
    element.addEventListener(type, callBack);
  }

  addSpans(target, length) {
    if (target.spans) return true;

    target.spans = true;

    for (let i = 0; i < length; i++) {
      const span = document.createElement("span");
      target.append(span);
    }

    return false;
  }

  addBmiClass(target, selector) {
    target.childNodes.forEach((element) => {
      if (!element.nodeType === 1) return;

      element.setAttribute("class", selector);
    });
  }

  setStyle({ href, selector, target }) {
    const style = Array.from(document.styleSheets);

    style.some((item) => {
      if (item.href.includes(href)) {
        for (const rule of item.cssRules) {
          if (rule.selectorText.includes(selector)) {
            target.bmiRule = rule.style;
            return true;
          }
        }
      }
    });
  }

  setBmiMessage(target, value) {
    switch (true) {
      case value < 20:
        target.bmiRule.color = "orange";
        target.bmi.textContent = value;
        target.message.textContent = "저체중";
        break;
      case value <= 24:
        target.bmiRule.color = "green";
        target.bmi.textContent = bmi;
        target.message.textContent = "정상";
        break;
      case value <= 29:
        target.bmiRule.color = "blue";
        target.bmi.textContent = value;
        target.message.textContent = "과체중";
        break;
      default:
        target.bmiRule.color = "red";
        target.bmi.textContent = value;
        target.message.textContent = "비만";
        break;
    }
  }
}

class BmiEvent extends Bmi {
  constructor() {
    super();
  }

  clickCallBack = () => {
    const kg = this.$bmi_kg.valueAsNumber || undefined;
    const cm = this.$bmi_cm.valueAsNumber / 100 || undefined;

    if (!cm && !kg) {
      alert("kg 또는 cm 값을 입력해주세요");
      this.$bmi_cm.value = this.$bmi_kg.value = null;
      return;
    }

    if (!this.addSpans(this.$result, 2)) {
      const bmi = this.$result.firstElementChild;
      const message = this.$result.lastElementChild;

      this.addBmiClass(this.$result, "bmi");

      this.$result.append(
        '신체질량지수(BMI)는 "',
        bmi,
        '"로 "',
        message,
        '"입니다.'
      );
      this.$result.bmi = bmi;
      this.$result.message = message;

      this.setStyle({
        target: this.$result,
        href: "style.css",
        selector: ".bmi",
      });
    }

    const bmi = (kg / cm ** 2).toFixed(2);

    this.setBmiMessage(this.$result, bmi);
    this.$bmi_cm.value = this.$bmi_kg.value = null;
  };

  inputCallback() {
    if (this.debounce) {
      clearTimeout(this.debounce);
    }

    this.debounce = setTimeout(
      function () {
        const kg = this.getAttribute("data-bmi").includes("kg");

        switch (kg) {
          case true:
            if (this.valueAsNumber > 300) {
              alert("300kg 이하로 작성해주세요");
              this.value = null;
            }
            break;
          case false:
            if (this.valueAsNumber > 250) {
              alert("250cm 이하로 작성해주세요");
              this.value = null;
            }
            break;
        }

        delete this.debounce;
      }.bind(this),
      100
    );
  }
}

const bmi = new BmiEvent();
bmi.addEventListener(bmi.$bmi_kg, "input", bmi.inputCallback);
bmi.addEventListener(bmi.$bmi_cm, "input", bmi.inputCallback);
bmi.addEventListener(bmi.$bmi_btn, "click", bmi.clickCallBack);

// (function () {
//   function inputEvent() {
//     if (this.debounce) {
//       clearTimeout(this.debounce);
//     }

//     this.debounce = setTimeout(
//       function () {
//         switch (true) {
//           case this.valueAsNumber > 300:
//             alert("300kg 이하로 작성해주세요");
//             this.value = null;
//             break;
//           case this.valueAsNumber > 250:
//             alert("250cm 이하로 작성해주세요");
//             this.value = null;
//             delete this.debounce;
//             break;
//         }

//         delete this.debounce;
//       }.bind(this),
//       150
//     );
//   }

//   function addSpans(target, length) {
//     if (target.spans) return true;

//     target.spans = true;

//     for (let i = 0; i < length; i++) {
//       const span = document.createElement("span");
//       target.append(span);
//     }

//     return false;
//   }

//   function setStyle({ href, selector, target }) {
//     const style = Array.from(document.styleSheets);

//     style.some((item) => {
//       if (item.href.includes(href)) {
//         for (const rule of item.cssRules) {
//           if (rule.selectorText.includes(selector)) {
//             target.bmiRule = rule.style;
//             return true;
//           }
//         }
//       }
//     });
//   }

//   function addBmiClass(target, selector) {
//     target.childNodes.forEach((element) => {
//       if (!element.nodeType === 1) return;

//       element.setAttribute("class", selector);
//     });
//   }

//   function setBmiMessage(target, value) {
//     switch (true) {
//       case value < 20:
//         target.bmiRule.color = "orange";
//         target.bmi.textContent = value;
//         target.message.textContent = "저체중";
//         break;
//       case value <= 24:
//         target.bmiRule.color = "green";
//         target.bmi.textContent = bmi;
//         target.message.textContent = "정상";
//         break;
//       case value <= 29:
//         target.bmiRule.color = "blue";
//         target.bmi.textContent = value;
//         target.message.textContent = "과체중";
//         break;
//       default:
//         target.bmiRule.color = "red";
//         target.bmi.textContent = value;
//         target.message.textContent = "비만";
//         break;
//     }
//   }

//   const clickEvent = function () {
//     const $bmi_kg = document.querySelector("[data-bmi='kg-input']");
//     const $bmi_cm = document.querySelector("[data-bmi='cm-input']");
//     const kg = $bmi_kg.valueAsNumber || undefined;
//     const cm = $bmi_cm.valueAsNumber / 100 || undefined;

//     if (!cm && !kg) {
//       alert("kg 또는 cm 값을 입력해주세요");
//       return;
//     }

//     const $result = document.querySelector("[data-bmi='result']");

//     if (!addSpans($result, 2)) {
//       const bmi = $result.firstElementChild;
//       const message = $result.lastElementChild;

//       addBmiClass($result, "bmi");

//       $result.append(
//         '신체질량지수(BMI)는 "',
//         bmi,
//         '"로 "',
//         message,
//         '"입니다.'
//       );
//       $result.bmi = bmi;
//       $result.message = message;

//       setStyle({ target: $result, href: "style.css", selector: ".bmi" });
//     }

//     const bmi = (kg / cm ** 2).toFixed(2);

//     setBmiMessage($result, bmi);

//     $bmi_cm.value = $bmi_kg.value = null;
//   };

//   const $bmi_kg = document.querySelector("[data-bmi='kg-input']");
//   const $bmi_cm = document.querySelector("[data-bmi='cm-input']");
//   const $bmi_btn = document.querySelector("[data-bmi='btn']");

//   $bmi_kg.addEventListener("input", inputEvent);
//   $bmi_cm.addEventListener("input", inputEvent);
//   $bmi_btn.addEventListener("click", clickEvent);
// });
