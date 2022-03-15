"use stric";

function template() {
  // 스타일 정의
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

  // 엘리먼트 정의
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

    <figure data-tab-menu="figure" tabindex="-1">
      <img src="" alt="" data-tab-menu="banner" />
      <figcaption data-tab-menu="caption" class="hidden">배너 이미지</figcaption>
    </figure>
    `;

  // 템플릿 엘리먼트 생성
  const template = document.createElement("template");

  // 템플릿 엘리먼트에 "style","element" 추가 # innerHTML은 문자열을 자동으로 렌더링
  template.innerHTML = `${style} ${element}`;

  // 템플릿 요소 반환
  return template;
}

// "tab-menu"에 사용할 클래스
class TabMenu extends HTMLElement {
  constructor() {
    // HTMLElement 객체에서 상속 받기
    super();

    // 커스텀 엘리먼트 자손으로 쉐도우 돔 만들기
    this.attachShadow({ mode: "open" });

    // "template" 함수에서 template 엘리먼트 값 받기
    this.template = template();

    // 쉐도우 돔 자손으로 template 추가
    this.shadowRoot.appendChild(this.template.content);
  }

  // 쉐도우 돔에 추가될 때 호출
  connectedCallback() {
    // function.html에서 스타일을 지정해야하지만
    // 그냥 인라인으로 바로 지정
    this.style.cssText = `display: block;
        max-width: 1020px;
        margin: 0 auto;`;

    // 쿼리를 위한 쉐도우 루트 가져오기
    const shadowRoot = this.shadowRoot;

    // 쉐도우 루트 객체에 탭 메뉴 속성 추가
    Reflect.set(
      shadowRoot,
      "$tab_menu",
      shadowRoot.querySelector("[data-tab-menu='list']")
    );

    // 탭 메뉴 객체에 배너 속성 추가
    Reflect.set(
      shadowRoot.$tab_menu,
      "$banner",
      shadowRoot.querySelector("[data-tab-menu='banner']")
    );

    // 탭 메뉴 중 첫번째 이미지 "src" 가져오기
    const $firstImageSrc = shadowRoot.$tab_menu
      .querySelector("[data-tab-menu='img']")
      .getAttribute("src");

    // 쉐도우 루트 객체를 이용한 배너 "src"를 초기값으로 셋팅
    shadowRoot.$tab_menu.$banner.setAttribute("src", $firstImageSrc);
  }
}

// "tab-menu로 지정된 커스텀 엘리먼트에 "TabMenu" 클래스 인트턴스화
customElements.define("tab-menu", TabMenu);

// 쉐도우 돔은 캡슐화되어 있어서 "querySelector" 이후 "shadowRoot" 속성 호출
const $TAB_MENU = document.querySelector("tab-menu").shadowRoot;

$TAB_MENU.$tab_menu.addEventListener("click", (event) => {
  const target = event.target;
  const currentTarget = event.currentTarget;

  switch (target.localName) {
    case "img":
      currentTarget.$banner.setAttribute("src", target.src);
      break;
    default:
      return;
  }
});
