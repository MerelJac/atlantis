import { hello } from "./hello";

describe("Root route", () => {
  it("should handle no body correctly", () => {
    expect(hello({})).toEqual('Hello World');
  });
  it("should handle body correctly", () => {
    expect(hello({name: 'Bob'})).toEqual('Hello Bob');
  });
});