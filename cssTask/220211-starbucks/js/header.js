const details = document.querySelectorAll(".js-details");

details.forEach((details) => {
  details.style.maxHeight = `${details.scrollHeight}px`;
  details.style.transition = "max-height 0.5s ease-in-out";
  details.addEventListener("toggle", (event) => {
    if (event.target !== event.currentTarget) return;
    const target = event.currentTarget;
    const targetHeight = target.scrollHeight;
    console.log(event);
    switch (target.open) {
      case true:
        target.style.maxHeight = `${targetHeight}px`;
        break;
      case false:
        target.style.maxHeight = `${targetHeight}px`;
        break;
    }
  });
});

const gnbCloseBtn = document.querySelector(".header__gnb-close");
gnbCloseBtn.addEventListener("click", (event) => {
  const headerLnbWrap = document.querySelector(".header__lnb-wrap");
  const headerLnb = document.querySelector(".header__lnb");

  event.stopPropagation();

  headerLnb.classList.remove("header__lnb--open");
  setTimeout(() => {
    headerLnbWrap.classList.remove("header__lnb-wrap--open");
  }, 430);
});

gnbCloseBtn.addEventListener("mouseenter", (event) => {
  if (event.target.classList.contains("header__gnb-close--animation")) return;
  event.target.classList.add("header__gnb-close--animation");
  setTimeout(() => {
    event.target.classList.remove("header__gnb-close--animation");
  }, 800);
});
gnbCloseBtn.addEventListener("mouseleave", (event) => {
  if (event.target.classList.contains("header__gnb-close--revers-animation"))
    return;
  event.target.classList.add("header__gnb-close--revers-animation");
  setTimeout(() => {
    event.target.classList.remove("header__gnb-close--revers-animation");
  }, 800);
});

const gnbOpenBtn = document.querySelector(".header__gnb-btn");
gnbOpenBtn.addEventListener("click", (event) => {
  const headerLnbWrap = document.querySelector(".header__lnb-wrap");
  const headerLnb = document.querySelector(".header__lnb");

  event.stopPropagation();

  headerLnbWrap.classList.add("header__lnb-wrap--open");
  setTimeout(() => {
    headerLnb.classList.add("header__lnb--open");
  }, 350);
});
