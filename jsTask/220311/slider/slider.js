class Slider extends HTMLElement {
  constructor() {
    super();

    // const shadow = this.attachShadow({ mode: "open" });

    const slider = document.querySelector("slider-components");

    const htmlText = this.fetchHtmlText(slider);
    this.parser(htmlText, slider);
  }

  async fetchHtmlText(components) {
    const response = await fetch(components.getAttribute("data-include"));
    const htmlText = await response.text();

    return htmlText;
  }

  async parser(htmlText, components) {
    const parser = new DOMParser();
    const html = parser.parseFromString(await htmlText, "text/html");
    const style = html.querySelector("style");
    const slider = html.querySelector(".slider");

    const fragment = new DocumentFragment();

    fragment.append(style, slider);
    components.append(fragment);
  }
}

customElements.define("slider-components", Slider);
