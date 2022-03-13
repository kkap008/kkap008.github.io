const carouselSlider = document.querySelector(
  "[data-include='carousel-slider']"
);

const xmlhttp = new XMLHttpRequest();

xmlhttp.addEventListener("readystatechange", (event) => {
  const xmlHttp = event.target;
  const xmlHttpReadyState = event.target.readyState;
  const xmlHttpStatus = event.target.status;

  if (xmlHttpReadyState === 4 && xmlHttpStatus === 200) {
    const domParser = new DOMParser();
    const responseText = xmlHttp.responseText;
    const componentHtml = domParser.parseFromString(responseText, "text/html");
    const style = componentHtml.querySelector("style");
    const componentElement = componentHtml.body.firstElementChild;
    const textType = 3;
    const fragment = new DocumentFragment();
    fragment.appendChild(style);
    for (let i = 0; i < componentElement.childNodes.length; ++i) {
      const child = componentElement.childNodes[i];
      if (child.nodeType !== textType) {
        fragment.appendChild(componentElement.childNodes[i]);
      }
    }
    carouselSlider.appendChild(fragment);
  }
});

xmlhttp.open(
  "GET",
  `${location.origin}/jsTask/220311/carouselSlider/component/carouselSlider/carouselSlider.html`
);
xmlhttp.send();
