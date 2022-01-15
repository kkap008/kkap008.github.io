const btn = document.getElementsByClassName("js-btn")[0];

class CatVideo {
  // 비디오 태그
  constructor(videoClassName) {
    this.video = document.getElementsByClassName(videoClassName)[0];
    this.sourceClassName = undefined;
    this.source = undefined;
  }

  //   소스가져오기
  getSource(_sourceClassName) {
    if (_sourceClassName) {
      this.sourceClassName = _sourceClassName;
    }

    this.source = this.video.getElementsByClassName(this.sourceClassName)[0];
  }

  //   소스 비디오 경로 가져오기
  getSourceSrc() {
    return this.source.getAttribute("src");
  }

  //   비디오 경로 재지정
  setSourceSrc(_path) {
    this.source.setAttribute("src", _path);
  }

  //   비디오 정보
  infoChange(_text) {
    const info = document.getElementsByClassName("js-info")[0];
    const text = document.createTextNode(_text);
    info.removeChild(info.childNodes.item("text"));
    info.appendChild(text);
  }
  //   자막 변경
  toggleTrack() {
    const track = this.video.textTracks;
    const cat1_kr = track[0];
    const cat2_kr = track[1];
    if (cat1_kr.mode == "showing") {
      cat1_kr.mode = "disabled";
      cat2_kr.mode = "showing";
    } else {
      cat2_kr.mode = "disabled";
      cat1_kr.mode = "showing";
    }
  }

  //   비디오 로드
  load() {
    setTimeout(() => {
      this.video.load();
    }, 500);
  }

  //   비디오 변경 시 자동 재생
  play() {
    this.video.play();
  }
  //   버튼 텍스트 변경
  btnText(_text) {
    const btn = document.getElementsByClassName("js-btn")[0];
    const text = document.createTextNode(_text);
    btn.replaceChild(text, btn.childNodes.item(0));
  }
}

btn.addEventListener("click", (e) => {
  e.stopPropagation();
  e.stopImmediatePropagation();
  //   비디오 태그 가져오기
  const catVideo = new CatVideo("js-video");

  //   소스 가져오기
  catVideo.getSource("s1");

  //   경로 검사
  if (catVideo.getSourceSrc()) {
    //   자막 변경
    catVideo.toggleTrack();
    // 대체 영상을 위한 경로 초기화
    catVideo.setSourceSrc("");
    // 현재 재생 중인 영상
    catVideo.infoChange("cat2.mp4");
    catVideo.btnText("메인 영상 보기");
  } else {
    catVideo.toggleTrack();
    catVideo.setSourceSrc("video/cat1.mp4");
    catVideo.infoChange("cat1.mp4");
    catVideo.btnText("대체 영상 보기");
  }
  catVideo.load();
  catVideo.play();
});
