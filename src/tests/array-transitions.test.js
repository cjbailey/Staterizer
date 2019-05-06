import Stateful from "../Stateful.js";
import Transition from "../Transition.js";

it("array transitions test", () => {
  const transitionAlwaysCalled = jest.fn(args => {
    console.log(`transition always called - "${args.previous}" to "${args.next}"`);
  });

  const itemChangedCallback = jest.fn(args => {
    console.log(`item changed from "${args.previous}" to "${args.next}"`);
  });

  const shouldNotBeCalled = jest.fn(() => {
    console.log("this should not be called");
  });

  let state = Stateful.from(
    {
      list: []
    },
    {
      list: [
        Transition.then(transitionAlwaysCalled),
        Transition.from("item1")
          .to("item1 changed")
          .then(itemChangedCallback),
        Transition.from("item1")
          .to("non-item")
          .then(shouldNotBeCalled)
      ],
      dummy: [Transition.then(shouldNotBeCalled)]
    }
  );

  state.list.push("item1");
  state.list[0] = "item1 changed";
  state.list.push("item2");
  state.list.pop();
  state.list.push("item3");
  state.list = state.list.filter(x => x !== "item3");

  expect(transitionAlwaysCalled).toHaveBeenCalledTimes(6);
  expect(itemChangedCallback).toHaveBeenCalledTimes(1);
  expect(shouldNotBeCalled).toHaveBeenCalledTimes(0);
});
