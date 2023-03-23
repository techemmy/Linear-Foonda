/**
 * @jest-environment jsdom
 */
import LinearEquation from "./linearEquation";

describe("Solve linear equations", () => {
    test("7x - 2 = 21 is equal to 23/7", () => {
        const equation = "7x - 2 = 21";
        const solver = new LinearEquation(equation);
        expect(solver.solve(equation)).toBe(23 / 7);
    });

    test("2(4x + 3) + 6 = 24 -4x is equal to 1", () => {
        const equation = "2(4x + 3) + 6 = 24 -4x";
        const solver = new LinearEquation(equation);
        expect(solver.solve(equation)).toBe(1);
    });
});

// TODO: add more unit test cases
// TODO: add integration tests
