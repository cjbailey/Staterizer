import Stateful from "../Stateful.js";
import Transition from "../Transition.js";

it("complex object structure test", () => {
  let firstCallback = jest.fn(args => {
    console.log(`foo.bar.foobar changed from ${args.previous} to ${args.next}`);
  });
  let secondCallback = jest.fn(args => {
    console.log(`foo.another.foobar changed from ${args.previous} to ${args.next}`);
  });
  let thirdCallback = jest.fn(args => {
    console.log(`simple changed from ${args.previous} to ${args.next}`);
  });

  const store = Stateful.from(
    {
      simple: 1234,
      foo: {
        bar: {
          foobar: "1234"
        },
        another: {
          foobar: "hello"
        },
        blah: {
          v1: "should not be proxified"
        }
      }
    },
    {
      foo: {
        bar: {
          foobar: [
            Transition.from("1234")
              .to("2345")
              .then(firstCallback)
          ]
        },
        another: {
          foobar: [
            Transition.from("hello")
              .to("goodbye")
              .then(secondCallback)
          ]
        },
        blah: [
          Transition.then(args => {
            console.log(`${JSON.stringify(args.previous)} - ${JSON.stringify(args.next)}`);
          })
        ]
      }
    }
  );

  store.simple = 2345;
  store.foo.bar.foobar = "2345";
  store.foo.another.foobar = "goodbye";
  store.foo.blah = { v1: "changed" };

  expect(firstCallback).toBeCalled();
  expect(secondCallback).toBeCalled();
  expect(thirdCallback).toHaveBeenCalledTimes(0);
});
