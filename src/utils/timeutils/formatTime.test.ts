import { formatTime } from "./formatTime";

test("format time to hh:mm:ss", () => {
  const actual = formatTime(1 * 60 * 60 + 5 * 60 + 49);

  expect(actual).toBe("1:05:49");
});

test("format time to mm:ss if hrs is -", () => {
  const actual = formatTime(5 * 60 + 9);
  expect(actual).toBe("5:09");
});

test("format time to mm:ss if hrs is -", () => {
  const actual = formatTime(5 * 60 + 49);
  expect(actual).toBe("5:49");
});
