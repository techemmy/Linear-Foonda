/**
 * @jest-environment jsdom
 */
import LinearEquation from "./linearEquation";

describe("Solve linear equations", () => {
    test("x = 3 + 2 is equal to 5", () => {
        const equation = "x = 3 + 2";
        const solver = new LinearEquation(equation);
        const solution = solver.solve(equation);
        expect(solution).toBe(5);
        expect(typeof solution).toBe("number");
    });

    test("2x = 3 is equal to 3/2 (1.5)", () => {
        const equation = "2x=3";
        const solver = new LinearEquation(equation);
        const solution = solver.solve(equation);
        expect(solution).toBe(3 / 2);
        expect(solution).toBe(1.5);
        expect(typeof solution).toBe("number");
    });

    test("2x - 5x = x is equal to 0", () => {
        const equation = "2x - 5x = x";
        const solver = new LinearEquation(equation);
        const solution = solver.solve(equation);
        expect(solution).toBe(0);
        expect(typeof solution).toBe("number");
    });

    test("-(x + 5) = 3 is equal to -8", () => {
        const equation = "-(x + 5) = 3";
        const solver = new LinearEquation(equation);
        const solution = solver.solve(equation);
        expect(solution).toBe(-8);
        expect(typeof solution).toBe("number");
    });

    test("2x = 3 + 5 is equal to 4", () => {
        const equation = "2x = 3 + 5";
        const solver = new LinearEquation(equation);
        const solution = solver.solve(equation);
        expect(solution).toBe(4);
        expect(typeof solution).toBe("number");
    });

    test("2x + 3x = 3 is equal to 3/5 (0.6)", () => {
        const equation = "2x + 3x = 3";
        const solver = new LinearEquation(equation);
        const solution = solver.solve(equation);
        expect(solution).toBe(3 / 5);
        expect(solution).toBe(0.6);
        expect(typeof solution).toBe("number");
    });

    test("x + 2 = 3x + 5 is equal to -3/2 (-1.5)", () => {
        const equation = "x + 2 = 3x + 5";
        const solver = new LinearEquation(equation);
        const solution = solver.solve(equation);
        expect(solution).toBe(-3 / 2);
        expect(solution).toBe(-1.5);
        expect(typeof solution).toBe("number");
    });

    test("2x + 3x = 3 + 5 is equal to 8/5 (0.6)", () => {
        const equation = "2x + 3x = 3 + 5";
        const solver = new LinearEquation(equation);
        const solution = solver.solve(equation);
        expect(solution).toBe(8 / 5);
        expect(solution).toBe(1.6);
        expect(typeof solution).toBe("number");
    });

    test("7x - 2 = 21 is equal to 23/7 (3.2857142857142856)", () => {
        const equation = "7x - 2 = 21";
        const solver = new LinearEquation(equation);
        const solution = solver.solve(equation);
        expect(solution).toBe(23 / 7);
        expect(solution).toBe(3.2857142857142856);
        expect(typeof solution).toBe("number");
    });

    test("x + 1 + 2 = 3 is equal to 0/1 (0)", () => {
        const equation = "x + 1 + 2 = 3";
        const solver = new LinearEquation(equation);
        const solution = solver.solve(equation);
        expect(solution).toBe(0 / 1);
        expect(solution).toBe(0);
        expect(typeof solution).toBe("number");
    });

    test("2(4x + 3) + 6 = 24 -4x is equal to 1", () => {
        const equation = "2(4x + 3) + 6 = 24 -4x";
        const solver = new LinearEquation(equation);
        const solution = solver.solve(equation);
        expect(solution).toBe(1);
        expect(typeof solution).toBe("number");
    });
});

describe("Handle invalid equations", () => {
    test("0 = 0 throws an invalid equation error", () => {
        const equation = "0 = 0";
        expect(() => {
            new LinearEquation(equation);
        }).toThrow("Invalid linear equation");
    });

    test("2xx = 4 throws an invalid equation error", () => {
        const equation = "2xx = 4";
        const solver = new LinearEquation(equation);
        expect(() => {
            solver.solve(equation);
        }).toThrow(/Invalid/);
    });

    test("x = x  throws a no solution error", () => {
        const equation = "x = x";
        const solver = new LinearEquation(equation);
        expect(() => {
            solver.solve(equation);
        }).toThrow(/no solution/);
    });

    test("0x = 4  throws a no solution error", () => {
        const equation = "0x = 4";
        const solver = new LinearEquation(equation);
        expect(() => {
            solver.solve(equation);
        }).toThrow(/no solution/);
    });

    test("5 - (2x + 5) - 5 = -6 + (-2x +5) + 6  throws a no solution error", () => {
        const equation = "5 - (2x + 5) - 5 = -6 + (-2x +5) + 6";
        const solver = new LinearEquation(equation);
        expect(() => {
            solver.solve(equation);
        }).toThrow(/no solution/);
    });
});
