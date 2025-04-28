export {Header, Footer, Content, Video}

class Component {
  constructor(className) {
    this.className = className;
  }
}

class Header extends Component {
  render() {
    return `
        <header class="center ${this.className}">
          <a href="#main"><img src="./images/logo.png" alt="logo" width="32" height="32" title="Вернуться на главную"></a>
          <button class='sound-btn' id='soundBtn'><img src="./images/unplug-music.png" alt="sound" width="32" height="32" title="Включить звук"></button>
        </header>
      `;
  }
}

class Footer extends Component {
  render() {
    return `
        <footer class="center ${this.className}">
          <address class="author-info">
          <p>&#169; Карачун Елена, 2025</p>
          <a href="#"><img src="./images/github.svg" alt="sound" width="32" height="32" title="Посмотреть проект на GitHub"></a>
          </address>
        </footer>`;
  }
}

class Content extends Component {
  render() {
    return `<main class="center ${this.className}" id="content"></main>`;
  }
}

class Video extends Component {
  render() {
    return `<video class="${this.className}" src="./video/space.mp4" autoplay muted loop poster="./images/space.jpeg"></video>`;
  }
}
