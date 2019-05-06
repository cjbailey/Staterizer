import "./styles.css";
import Stateful from "../../Stateful.js";
import Transition from "../../Transition.js";

const btn = document.querySelector("#btn");
const msg = Stateful.from(document.querySelector("#message"), {
  innerHTML: [
    Transition.from("hello")
      .to("Sorry to see you go  :(")
      .then(() => {
        console.log("This only happens once");
        store.state = "goodbye";
      }),
    Transition.from("hello again!")
      .to("Sorry to see you go  :(")
      .then(() => {
        console.log("This happens more");
        store.state = "goodbye";
      })
  ]
});

const store = Stateful.from(
  {
    state: "hello",
    btnMessage: "Say goodbye"
  },
  {
    state: [
      Transition.from("hello")
        .to("goodbye")
        .then(() => {
          console.log(store);
          store.btnMessage = "Say hello";
          msg.innerHTML = "Sorry to see you go  :(";
          btn.innerHTML = store.btnMessage;
        }),
      Transition.from("goodbye")
        .to("hello")
        .then(() => {
          console.log(store);
          store.btnMessage = "Say goodbye";
          msg.innerHTML = "hello again!";
          btn.innerHTML = store.btnMessage;
        })
    ]
  }
);

btn.innerHTML = store.btnMessage;
msg.innerHTML = "hello";

btn.addEventListener("click", () => {
  if (store.state === "hello") {
    store.state = "goodbye";
  } else {
    store.state = "hello";
  }
});
