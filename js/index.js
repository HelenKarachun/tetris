import {Header, Content, Footer, Video} from './components.js'
import {homePage, recordsPage, controlPage, gamePage, errorPage} from './pages.js'
import {App} from './mvc.js'


const components = {
  header: new Header('header'),
  content: new Content('main-content'),
  footer: new Footer('footer'),
  video: new Video('video-background'),
};

const pages = {
  main: homePage,
  records: recordsPage,
  control: controlPage,
  game: gamePage,
  error: errorPage,
};

document.addEventListener("DOMContentLoaded", () => {
  const app = new App({
    elem: 'app',
    pages: pages,
    components: components,
  });
  app.init();
});
