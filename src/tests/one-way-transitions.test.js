import Stateful from "../Stateful.js";
import Transition from "../Transition.js";

it("one way transitions test", () => {
  let callbackCalled = false;
  let callbackCalled2 = false;

  let state = Stateful.from(
    {
      foo: "hello"
    },
    {
      foo: [
        Transition.from("hello").then(() => {
          callbackCalled = true;
        }),
        Transition.to("goodbye").then(() => {
          callbackCalled2 = true;
        })
      ]
    }
  );

  state.foo = "anything";
  state.foo = "goodbye";

  expect(callbackCalled).toBe(true);
  expect(callbackCalled2).toBe(true);
});
