class Slider extends HTMLElement {
  constructor() {
    super();

    const htmlText = this.fetchHtmlText(this);
    this.parser(htmlText, this);
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
    const slider = html.querySelector("#slider");

    const fragment = new DocumentFragment();

    fragment.append(style, slider);
    // fragment.append(slider);
    components.append(fragment);
  }
}

customElements.define("slider-components", Slider);
