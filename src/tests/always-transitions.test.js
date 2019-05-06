import Stateful from "../Stateful.js";
import Transition from "../Transition.js";

it("if no condition transition exists then callback always called", () => {
  const callback = jest.fn(() => {
    console.log("callback called");
  });

  let state = Stateful.from(
    {
      foo: "hello"
    },
    {
      foo: [Transition.then(callback)]
    }
  );

  state.foo = "anything";
  state.foo = "something else";
  state.foo = "something else";
  state.foo = "the previous line shouldn't have triggered a state change";
  state.foo = "resulting in 4 times the callback should have been triggered";

  expect(callback).toHaveBeenCalledTimes(4);
});
