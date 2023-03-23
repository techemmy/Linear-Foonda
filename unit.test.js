/**
 * @jest-environment jsdom
 */
import LinearEquation from "./linearEquation";

describe("Solve linear equations", () => {
    test("7x - 2 = 21 is equal to 23/7", () => {
        const equation = "7x - 2 = 21";
        const solver = new LinearEquation("7x - 2 = 21");
        expect(solver.solve(equation)).toBe("23/7");
    });
});
