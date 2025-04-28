const tetrisMainMusic = new Audio("./audio/tetris-music.mp3");
tetrisMainMusic.loop = true;

const elemChangeableAttributes = {
  on: { 
    src: "./images/unplug-music.png", 
    title: "Включить звук" },
  off: { 
    src: "./images/plug-music.png", 
    title: "Выключить звук" },
};

function musicPlaybackControl() {
  const soundBtn = document.getElementById("soundBtn");
  const soundBtnImg = soundBtn.firstElementChild;
  let isSoundOn = false;

  soundBtn.addEventListener("click", () => {
    if (isSoundOn) {
      tetrisMainMusic.pause();
    } else {
      tetrisMainMusic.play();
    }
    setAttributesForImg(soundBtnImg, isSoundOn);
    isSoundOn = changeSoundBtnState(isSoundOn);
  });
}

function setAttributesForImg(elem, state) {
  state = state ? "on" : "off";
  elem.src = elemChangeableAttributes[state].src;
  elem.title = elemChangeableAttributes[state].title;
}

function changeSoundBtnState(value) {
  return !value;
}

document.addEventListener("DOMContentLoaded", musicPlaybackControl);
