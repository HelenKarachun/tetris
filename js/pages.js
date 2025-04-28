export { homePage, recordsPage, controlPage, gamePage, errorPage };

class Page {
  constructor(obj) {
    this.id = obj.id;
    this.title = obj.title;
    this.content = obj.content;
  }

  render() {
    return `<div class='${this.id}-container'>${this.content}</div>`;
  }
}

const homePage = new Page({
  id: "main",
  title: "Тетрис",
  content: ` 
    <h1>Т<span class='pink'>е</span>три<span class='pink'>с</span></h1>
    <nav>
      <ul>
        <li><a href="#game">Новая игра</a></li>
        <li><a href="#control">Управление</a></li>
        <li><a href="#records">Рекорды</a></li>
      </ul>
    </nav>`,
});

const recordsPage = new Page({
  id: "records",
  title: "Рекорды",
  content: ` 
    <h1>Рекорды:</h1>
    <table id='recordsTable'>
      <tbody>
      </tbody>
    </table>
    <dialog id='modalWindow'>
      <div class='modal-window'>
      <p>Введите ваше имя:</p>
      <input type="text" id='userName'>
      <button type="button" id='saveNameBtn'><span></span><span></span><span></span><span></span>Подтвердить</button>
      <div>
    </dialog>`,
});

const controlPage = new Page({
  id: "control",
  title: "Управление",
  content: `
    <h1>Управление:</h1>
    <div class="button-control-container">
      <img src="./images/space.svg" alt="space key" />
      <p class="button-control-description">Поворот фигуры</p>
      <img src="./images/up.svg" alt="arrow up key" />
      <p class="button-control-description">
        Моментальное падение фигуры вниз поля
      </p>
      <img src="./images/down.svg" alt="arrow down key" />
      <p class="button-control-description">Ускоряется движение фигуры вниз</p>
      <img src="./images/left.svg" alt="arrow left key" />
      <p class="button-control-description">Переместить фигуру влево</p>
      <img src="./images/right.svg" alt="arrow right key" />
      <p class="button-control-description">Переместить фигуру вправо</p>
    </div>
  `,
});

const gamePage = new Page({
  id: "game",
  title: "Тетрис",
  content: `
    <div class="info-game-container">
      <span>Уровень:</span><span id="levelValue"></span><span>Счет:</span
      ><span id="scoreValue"></span>
    </div>
    <canvas id="canvas"></canvas>
    `,
});

const errorPage = new Page({
  id: "error",
  title: "Ошибка 404",
  content: `
    <h1>
      Ошибка <span class="flicker">4</span><span class="fast-flicker">04</span>
    </h1>
    <p>
      Кажется что-то пошло не так.. Страница, которую вы запрашиваете, не
      существует. Возможно она устарела, была удалена или был введен неверный
      адрес в адресной строке.
    </p>
    <a href="#main" title="Вернуться на главную">Вернуться на главную</a>
  `,
});
