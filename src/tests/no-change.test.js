import Stateful from "../Stateful.js";
import Transition from "../Transition.js";

it("if no valid transition exists then callback not called", () => {
  let callbackCalled = false;

  let state = Stateful.from(
    {
      foo: "hello"
    },
    {
      foo: [
        Transition.from("hello")
          .to("goodbye")
          .then(() => {
            callbackCalled = true;
          })
      ]
    }
  );

  state.foo = "anything";

  expect(callbackCalled).toBe(false);
});
