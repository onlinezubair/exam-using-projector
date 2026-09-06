import { describe, it, expect } from "vitest";
import { getCoursesFor, defaultCourseFor, sortedByCode } from "./courses";

describe("Semester 1 digit-collision rule (GEN-101 / PPD-101 / PID-101)", () => {
  const sem1 = getCoursesFor("Pharm.D", 1)!;

  it("shows the full prefixed code (not bare digits) for the colliding non-lab courses", () => {
    const gen = sem1.find((c) => c.code === "GEN-101")!;
    const ppd = sem1.find((c) => c.code === "PPD-101")!;
    const pid = sem1.find((c) => c.code === "PID-101")!;
    expect(gen._codeDisplay).toBe("GEN-101");
    expect(ppd._codeDisplay).toBe("PPD-101");
    expect(pid._codeDisplay).toBe("PID-101");
  });

  it("tags the colliding lab rows with the base code + (Lab)", () => {
    const ppdLab = sem1.find((c) => c.code === "PPD-101-L")!;
    const pidLab = sem1.find((c) => c.code === "PID-101-L")!;
    expect(ppdLab._codeDisplay).toBe("PPD-101 (Lab)");
    expect(pidLab._codeDisplay).toBe("PID-101 (Lab)");
  });
});

describe("non-colliding Theory/Lab pair (PHARM410 / PHARM410 LAB)", () => {
  const sem3 = getCoursesFor("Pharm.D", 3)!;

  it("shows bare digits for the theory course and digits + (Lab) for its lab", () => {
    const theory = sem3.find((c) => c.code === "PHARM410")!;
    const lab = sem3.find((c) => c.code === "PHARM410 LAB")!;
    expect(theory._codeDisplay).toBe("410");
    expect(lab._codeDisplay).toBe("410 (Lab)");
  });
});

describe("getCoursesFor / defaultCourseFor", () => {
  it("returns null for a program/semester with no structured catalog (e.g. FSc)", () => {
    expect(getCoursesFor("FSc", 1)).toBeNull();
    expect(defaultCourseFor("FSc", 1)).toBeNull();
  });

  it("returns the alphabetically-first course by short name as the default", () => {
    const def = defaultCourseFor("Pharm.D", 1);
    expect(def?.shortName).toBe("Biochemistry-I");
  });
});

describe("sortedByCode", () => {
  it("orders by numeric code digits, ascending", () => {
    const sem5 = getCoursesFor("Pharm.D", 5)!;
    const sorted = sortedByCode(sem5);
    const digitValues = sorted.map((c) => c._codeDigitsValue);
    const expected = [...digitValues].sort((a, b) => (a ?? 0) - (b ?? 0));
    expect(digitValues).toEqual(expected);
  });
});