import config, { Operation } from "../config";

test("simple print all", function() {
  const conf = config({});
  expect(conf.operation).toEqual(Operation.Print);
  expect(conf.args).toEqual([]);
});

test("print key", function() {
  const conf = config({
    args: ["foo"],
  });
  expect(conf.operation).toEqual(Operation.Print);
  expect(conf.args).toEqual(["foo"]);
});

test("add key", function() {
  const conf = config({
    args: ["add", "foo", "bar"],
  });
  expect(conf.operation).toEqual(Operation.Add);
  expect(conf.args).toEqual(["foo", "bar"]);
});

test("remove key", function() {
  const conf = config({
    args: ["remove", "foo"],
  });
  expect(conf.operation).toEqual(Operation.Remove);
  expect(conf.args).toEqual(["foo"]);
});


