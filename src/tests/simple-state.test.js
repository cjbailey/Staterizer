import Stateful from "../Stateful.js";
import Transition from "../Transition.js";

it("simple object test", () => {
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

  state.foo = "goodbye";

  expect(callbackCalled).toBe(true);
});
