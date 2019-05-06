import Stateful from "../Stateful.js";
import Transition from "../Transition.js";

it("state not proxied beyond transitions", () => {
  let callback = jest.fn(() => {
    console.log("state not proxied beyond transitions callback");
  });
  let callback2 = jest.fn(() => {
    console.log("state not proxied beyond transitions callback2");
  });

  let state = Stateful.from(
    {
      foo: {
        bar: { val: 1234 }
      },
      boo: []
    },
    {
      foo: [Transition.then(callback)],
      boo: [Transition.then(callback)]
    }
  );

  let item = Stateful.from(
    {
      val: {}
    },
    {
      val: [Transition.then(callback2)]
    }
  );

  state.foo.bar.val = 2345;

  item.val = {
    el: document.createElement("div")
  };
  state.boo.push(item);

  expect(item.val.__isProxy).toBe(true);
  expect(item.val.el.__isProxy).toBe(undefined);
  expect(state.foo.__isProxy).toBe(true);
  expect(state.foo.bar.__isProxy).toBe(undefined);
  expect(state.foo.bar.val.__isProxy).toBe(undefined);
  expect(state.boo.__isProxy).toBe(true);
  expect(state.boo[0].__isProxy).toBe(true);
  expect(state.boo[0].val.__isProxy).toBe(true);
  expect(state.boo[0].val.el.__isProxy).toBe(undefined);
  expect(callback).toHaveBeenCalledTimes(1);
  expect(callback2).toHaveBeenCalledTimes(1);
});
