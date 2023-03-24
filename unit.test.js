/**
 * @jest-environment jsdom
 */
import LinearEquation from "./linearEquation";

describe("Solve linear equations", () => {
    test("x = 3 + 2 is equal to 5", () => {
        const equation = "x = 3 + 2";
        const solver = new LinearEquation(equation);
        expect(solver.solve(equation)).toBe(5);
    });

    test("2x = 3 is equal to 3/2 (1.5)", () => {
        const equation = "2x=3";
        const solver = new LinearEquation(equation);
        expect(solver.solve(equation)).toBe(3 / 2);
        expect(solver.solve(equation)).toBe(1.5);
    });

    test("2x - 5x = x is equal to 0", () => {
        const equation = "2x - 5x = x";
        const solver = new LinearEquation(equation);
        expect(solver.solve(equation)).toBe(0);
    });

    test("-(x + 5) = 3 is equal to -8", () => {
        const equation = "-(x + 5) = 3";
        const solver = new LinearEquation(equation);
        expect(solver.solve(equation)).toBe(-8);
    });

    test("2x = 3 + 5 is equal to 4", () => {
        const equation = "2x = 3 + 5";
        const solver = new LinearEquation(equation);
        expect(solver.solve(equation)).toBe(4);
    });

    test("2x + 3x = 3 is equal to 3/5 (0.6)", () => {
        const equation = "2x + 3x = 3";
        const solver = new LinearEquation(equation);
        expect(solver.solve(equation)).toBe(3 / 5);
        expect(solver.solve(equation)).toBe(0.6);
    });

    test("x + 2 = 3x + 5 is equal to -3/2 (-1.5)", () => {
        const equation = "x + 2 = 3x + 5";
        const solver = new LinearEquation(equation);
        expect(solver.solve(equation)).toBe(-3 / 2);
        expect(solver.solve(equation)).toBe(-1.5);
    });

    test("2x + 3x = 3 + 5 is equal to 8/5 (0.6)", () => {
        const equation = "2x + 3x = 3 + 5";
        const solver = new LinearEquation(equation);
        expect(solver.solve(equation)).toBe(8 / 5);
        expect(solver.solve(equation)).toBe(1.6);
    });

    test("7x - 2 = 21 is equal to 23/7 (3.2857142857142856)", () => {
        const equation = "7x - 2 = 21";
        const solver = new LinearEquation(equation);
        expect(solver.solve(equation)).toBe(23 / 7);
        expect(solver.solve(equation)).toBe(3.2857142857142856);
    });

    test("x + 1 + 2 = 3 is equal to 0/1 (0)", () => {
        const equation = "x + 1 + 2 = 3";
        const solver = new LinearEquation(equation);
        expect(solver.solve(equation)).toBe(0 / 1);
        expect(solver.solve(equation)).toBe(0);
    });

    test("2(4x + 3) + 6 = 24 -4x is equal to 1", () => {
        const equation = "2(4x + 3) + 6 = 24 -4x";
        const solver = new LinearEquation(equation);
        expect(solver.solve(equation)).toBe(1);
    });
});

describe("Handle invalid equations", () => {
    test("5 - (2x + 5) - 5 = -6 + (-2x +5) + 6 is meant to throw contradiction error", () => {
        const equation = "5 - (2x + 5) - 5 = -6 + (-2x +5) + 6";
        const solver = new LinearEquation(equation);
        expect(solver.solve(equation)).toThrow(
            new Error("The input is a contradiction: it has no solutions")
        );
    });
});

// TODO: add more unit test cases
// TODO: add integration tests
