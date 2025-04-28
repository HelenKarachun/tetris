import { game } from "./game/game.js";
import { checkRecords } from "./game/records.js";
import { mainHeaderAnimation } from "./headerRotate.js";

export class App {
  constructor(obj) {
    this.mainContainer = document.getElementById(obj.elem);
    this.pages = obj.pages;
    this.components = obj.components;
  }

  render() {
    this.mainContainer.innerHTML = `
      ${this.components.header.render()}
      ${this.components.content.render()}
      ${this.components.footer.render()}
      ${this.components.video.render()}
    `;
  }

  init() {
    this.render();
    const view = new View(this.mainContainer, this.pages);
    const model = new Model(view);
    const controller = new Controller(model, this.mainContainer);
    controller.init();
  }
}

class Controller {
  constructor(model, mainContainer) {
    this.mainContainer = mainContainer;
    this.model = model;
  }

  init() {
    window.addEventListener("hashchange", this.handleHashChange.bind(this));
    this.handleHashChange();
  }

  handleHashChange() {
    const pageId = location.hash.slice(1).toLowerCase() || "main";
    this.model.updateState(pageId);
  }
}

class Model {
  constructor(view) {
    this.view = view;
  }

  updateState(pageId) {
    this.view.renderContent(pageId);
    this.checkScriptsNeededForPage(pageId);
  }

  checkScriptsNeededForPage(pageId) {
    switch (pageId) {
      case "game":
        game();
        break;
      case "records":
        checkRecords();
        break;
      case "main":
        mainHeaderAnimation();
        break;
    }
  }
}

class View {
  constructor(mainContainer, pages) {
    this.mainContainer = mainContainer;
    this.pages = pages;
    this.contentContainer = this.mainContainer.querySelector("#content");
  }

  renderContent(pageId) {
    const page = this.pages[pageId] || this.pages["error"];
    document.title = page.title;
    this.contentContainer.innerHTML = page.render();
  }
}
