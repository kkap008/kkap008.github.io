"use stric";

function template() {
  const style = `
  <style>
        *{
            margin:0;
            padding:0;
        }
        ul{
            list-style: none;
        }
        img {
            vertical-align: top;
            max-width:100%;
        }
        [data-tab-menu='list']{
            display: flex;
            cursor: pointer;
        }
        .hidden{
            display: inline-block;
            white-space: nowrap;
            overflow: hidden;
            width: 1px;
            height: 1px;
            position: absolute;
            margin: -1px;
            clip: rect(0 0 0 0);
            clip-path: polygon(0 0, 0 0, 0 0);
        }
    </style>
  `;
  const element = `
    <ul data-tab-menu="list">
        <li data-tab-menu="item">
            <img src="img/banner00.jpg" alt="" data-tab-menu="img" />
            <span class="hidden">단, 하루의 혜택 패밀리를 하프갤런으로 사이즈업</span>
        </li>
        <li data-tab-menu="item">
            <img src="img/banner01.jpg" alt="" data-tab-menu="img" />
            <span class="hidden">커피 5잔 구매 시, 아메리카노 레귤러 사이즈 1잔 무료</span>
        </li>
        <li data-tab-menu="item">
            <img src="img/banner02.jpg" alt="" data-tab-menu="img" />
            <span class="hidden">커피&아포카토 부드러운 바닐라 아이스크림에 
            진하고 뜨거운 에스프레소를 얹어 내는 이탈리아의 디저트</span>
        </li>
        <li data-tab-menu="item">
            <img src="img/banner03.jpg" alt="" data-tab-menu="img" />
            <span class="hidden">10월 27일부터 11월 16일까지 
            현대카드 1만 9천 500백원 (패밀리) 이상 구매 시 4천원 할인</span>
        </li>
        <li data-tab-menu="item">
            <img src="img/banner04.jpg" alt="" data-tab-menu="img" />
            <span class="hidden">11월 01일부터 11월 06일까지 
            카페브리프 출시 1주년 기념 매일 아메리카노 1잔 제공 (구매 고객 대상 일 50잔 한정)</span>
        </li>
    </ul>

    <figure data-tab-menu="figure">
      <img src="" alt="" data-tab-menu="banner" />
      <figcaption data-tab-menu="caption" class="hidden"></figcaption>
    </figure>
    `;

  const template = document.createElement("template");

  template.innerHTML = `${style} ${element}`;

  return template;
}

class TabMenu extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.template = template();
    this.content = this.template.content;
    this.init();
    this.shadowRoot.appendChild(this.content);
  }

  init() {
    const $banner = this.content.querySelector("[data-tab-menu='banner']");
    const src = this.content
      .querySelector("[data-tab-menu='img']")
      .getAttribute("src");

    $banner.setAttribute("src", src);
  }

  connectedCallback() {
    this.style.cssText = `display: block;
        max-width: 1020px;
        margin: 0 auto;`;
  }
}

customElements.define("tab-menu", TabMenu);

const $TAB_MENU = document.querySelector("tab-menu").shadowRoot;
// const $TAB_MENU_LIST = $TAB_MENU.querySelector("[data-tab-menu='list']");

const test = $TAB_MENU.querySelector("[data-tab-menu='banner']");

const $TAB_MENU_LIST = $TAB_MENU.querySelector("[data-tab-menu='list']");

Reflect.set(
  $TAB_MENU_LIST,
  "banner",
  $TAB_MENU.querySelector("[data-tab-menu='banner']")
);

console.dir($TAB_MENU_LIST);

$TAB_MENU_LIST.addEventListener("click", (event) => {
  const target = event.target;
  const currentTarget = event.currentTarget;

  switch (target.localName) {
    case "img":
      currentTarget.banner.setAttribute("src", target.src);
      break;
    default:
      return;
  }
});
