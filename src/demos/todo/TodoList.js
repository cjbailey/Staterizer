import Stateful from "../../Stateful";
import Transition from "../../Transition";
import STATE from "./STATE";

const todoListTpl = document.createElement("template");
todoListTpl.innerHTML = `
  <h1>Todos</h1>
  <ul class="todo-list"></ul>
  <div class="btn-container">
    <input type="text" id="new-todo-text" />
    <button id="add-todo-btn">Add ToDo</button>
  </div>`;

class TodoList extends HTMLElement {
	constructor() {
		super();

		this.appendChild(todoListTpl.content.cloneNode(true));
		let todoListUL = this.querySelector(".todo-list");
		let addTodoBtn = this.querySelector("#add-todo-btn");
		let newTodoDOM = this.querySelector("#new-todo-text");
		let itemId = 0;

		let todos = Stateful.from(
			{
				items: []
			},
			{
				items: [
					Transition.then(args => {
						if (Array.isArray(args.previous) || Array.isArray(args.next)) {
							// Transition is occuring on the array itself rather than an item of the array so we can ignore this.
							return;
						}

						if (!args.previous && args.next) {
							// New item
							addItem(todoListUL, args.next);
						} else if (args.previous && args.next) {
							// Edit item
							args.previous.todoItemDOM.bind(args.next);
							args.next.todoItemDOM = args.previous.todoItemDOM;
						}
					})
				]
			}
		);

		addTodoBtn.addEventListener("click", () => {
			let title = newTodoDOM.value;
			if (isEmpty(title)) return false;

			const item = Stateful.from(
				{
					id: itemId++,
					title: title,
					state: STATE.NOT_DONE
				},
				{
					title: [
						Transition.then(args => {
							let titleDOM = args.parent.todoItemDOM.querySelector(".todo-item-title");
							titleDOM && (titleDOM.innerText = args.next);
							console.log("title changed");
						})
					],
					state: [
						Transition.to(STATE.DELETED).then(args => {
							// Remove all deleted items from the DOM
							todos.items.filter(x => x.state === STATE.DELETED).forEach(x => todoListUL.removeChild(x.todoItemDOM));
							todos.items = todos.items.filter(x => x.state !== STATE.DELETED);
							console.log("item deleted");
						})
					]
				}
			);
			todos.items.push(item);
			newTodoDOM.value = "";
		});
	}
}

export default TodoList;

function isEmpty(s) {
	return (typeof s === "string" && s.length === 0) || s === undefined || s === null;
}

function addItem(todoList, data) {
	let todoItem = document.createElement("li", { is: "todo-item" });
	todoItem.bind(data);
	todoList.appendChild(todoItem);
	data.todoItemDOM = todoItem;
}
