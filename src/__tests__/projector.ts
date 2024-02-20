import { Operation } from "../config";
import Projector from "../projector";

function getData() {
  return {
    projector: {
      "/": {
        foo: "bar1",
        fem: "baz",
      },
      "/foo": {
        foo: "bar2",
      },
      "/foo/bar": {
        foo: "bar3",
      },
    },
  };
}

function getProjector(pwd: string, data = getData()): Projector {
  return new Projector(
    {
      args: [],
      operation: Operation.Print,
      pwd,
      config: "Hello!",
    },
    data,
  );
}

test("getValueAll", function() {
  const proj = getProjector("/foo/bar");
  expect(proj.getValueAll()).toEqual({
    fem: "baz",
    foo: "bar3",
  });
});

test("getValue", function() {
  let proj = getProjector("/foo/bar");
  expect(proj.getValue("foo")).toEqual("bar3");

  proj = getProjector("/foo");
  expect(proj.getValue("foo")).toEqual("bar2");
  expect(proj.getValue("fem")).toEqual("baz");
});

test("setValue", function() {
  let data = getData()
  let proj = getProjector("/foo/bar", data);

  proj.setValue("foo", "bazbaz");
  expect(proj.getValue("foo")).toEqual("bazbaz");

  proj.setValue("fem", "foobar");
  expect(proj.getValue("fem")).toEqual("foobar");

  proj = getProjector("/", data);
  expect(proj.getValue("fem")).toEqual("baz");
});

test("removeValue", function() {
  const proj = getProjector("/foo/bar");

  proj.removeValue("fem")
  expect(proj.getValue("fem")).toEqual("baz");

  proj.removeValue("foo")
  expect(proj.getValue("foo")).toEqual("bar2");
});
