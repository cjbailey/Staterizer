import STATE from "./STATE";

const todoItemTpl = document.createElement("template");
todoItemTpl.innerHTML = `
  <div class="todo-item">
    <div class="todo-item-title"></div>
    <div class="todo-item-btns">
      <button class="todo-item-edit-btn"><i class="fas fa-edit"></i></button>
      <button class="todo-item-del-btn"><i class="fas fa-trash-alt"></i></button>
    </div>
  </div>`;

class TodoItem extends HTMLLIElement {
	constructor() {
		super();
		this.content = todoItemTpl.content.cloneNode(true);
		this.appendChild(this.content);

		let titleDOM = this.querySelector(".todo-item-title");
		let editBtn = this.querySelector(".todo-item-edit-btn");
		let deleteBtn = this.querySelector(".todo-item-del-btn");
		let endEditFn = ev => {
			if (ev.keyCode === 13 || ev.type === "blur") {
				this._data.title = titleDOM.innerText;
				titleDOM.setAttribute("contenteditable", false);
			}
		};

		titleDOM.addEventListener("click", () => {
			this.toggleDone();
		});

		editBtn.addEventListener("click", () => {
			titleDOM.setAttribute("contenteditable", true);
			titleDOM.focus();
			titleDOM.addEventListener("keydown", endEditFn);
			titleDOM.addEventListener("blur", endEditFn);
		});

		deleteBtn.addEventListener("click", () => {
			this._data.state = STATE.DELETED;
		});
	}

	bind(data) {
		this.setTitle(data.title);
		this._data = data;
	}

	setTitle(title) {
		let titleDOM = this.querySelector(".todo-item-title");
		if (titleDOM) titleDOM.innerText = title;
	}

	toggleDone() {
		let titleDOM = this.querySelector(".todo-item-title");
		if (titleDOM && !titleDOM.isContentEditable) {
			this._data.state = this._data.state === STATE.DONE ? STATE.NOT_DONE : STATE.DONE;
			if (this._data.state === STATE.DONE) {
				titleDOM.classList.add("todo-done");
			} else {
				titleDOM.classList.remove("todo-done");
			}
		}
	}
}

export default TodoItem;
