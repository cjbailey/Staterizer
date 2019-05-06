import TodoItem from "./TodoItem";
import TodoList from "./TodoList";

function App() {
  customElements.define("todo-item", TodoItem, { extends: "li" });
  customElements.define("todo-list", TodoList);
}

export default App;
