import { test, expect } from "vitest";

import { averageScore } from "./styles";

test("averageScore test", () => {
  expect(averageScore.check(10)).toBe("good");
  expect(averageScore.check(9)).toBe("good");

  expect(averageScore.check(8.5)).toBe("need");

  expect(averageScore.check(7.5)).toBe("normal");
  expect(averageScore.check(6.5)).toBe("normal");

  expect(averageScore.check(6.25)).toBe("caution");
  expect(averageScore.check(6)).toBe("caution");

  expect(averageScore.check(5)).toBe("danger");
});
