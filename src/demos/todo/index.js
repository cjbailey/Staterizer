import App from "./app.js";
import "./styles.css";

// DOMContentLoaded doesn't seem to work in codesandbox.io so I'm having to resort to this abomination...
let interval = setInterval(() => {
  if (document.querySelector("todo-list") !== null) {
    clearInterval(interval);
    App();
  }
}, 1000);
