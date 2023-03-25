class LinearEquation {
    operators = {
        "-": "subtract",
        "+": "add",
        "*": "multiply",
        "/": "divide",
    };

    parentheses = ["(", ")"];

    constructor(question, responses) {
        this.step = 1;
        this.responses = responses;
        this.variable = this.getVariable(question);
        this.equation = this.sanitize(question);
    }

    showStep(step) {
        return this.addToHTML(`Step ${this.step}: ${step} `, "step");
    }

    showStepInfo(info) {
        return this.addToHTML(info, "step-info");
    }

    addToHTML(content, type) {
        if (!this.responses) return;
        const response = document.createElement("li");
        response.className = type;
        response.innerHTML = content;
        this.responses.appendChild(response);
    }

    sanitize(equation) {
        const equationWithoutSpaces = equation
            .toLowerCase()
            .trim()
            .split(" ")
            .join("");
        if (!equationWithoutSpaces || !equation.includes("=")) {
            // if it's an empty string
            throw new Error("Invalid equation");
        }

        return equationWithoutSpaces;
    }

    getVariable(expression) {
        for (let char of expression) {
            if (
                char !== "=" &&
                !this.operators[char] &&
                !this.parentheses.includes(char) &&
                isNaN(char)
            ) {
                return char;
            }
        }
        // if no variable is detected
        throw new Error("Invalid linear equation");
    }

    solve() {
        this.addToHTML(`Question: <b>${this.equation}</b>`, "step question");

        let [left, right] = this.equation.split("=");
        let rightExpressionVariables = [],
            rightWithoutVariables = [];
        let answer;

        [left, right] = this.resolveBracketDistribution(left, right);

        if (this.containsVariableOnBothSides(left, right)) {
            // if boths sides contain a variable
            let rightExpression = right
                .replaceAll("+", "++")
                .replaceAll("-", "+-")
                .split("+");
            rightExpression.forEach((value) => {
                if (this.containVariable(value))
                    rightExpressionVariables.push(value);
                if (value && !rightExpressionVariables.includes(value))
                    rightWithoutVariables.push(value);
            });

            [left, right] = this.resolveVariablesOnRightSide(
                left,
                rightExpressionVariables,
                rightWithoutVariables,
                right
            );
        }

        if (
            // check if left contains only numbers and right has a variable
            this.containNumberOnly(left) &&
            this.containVariable(right, this.variable)
        ) {
            answer = this.resolveNumberAndVariableSide(left, right);
        } else if (
            // check if right contains only numbers and left has a variable
            this.containNumberOnly(right) &&
            this.containVariable(left, this.variable)
        ) {
            answer = this.resolveNumberAndVariableSide(right, left);
        }

        if (answer === -0) answer = answer.toString().replace("-0", 0);
        this.showStep("Solution");
        this.showStepInfo(`${this.variable} = ${answer}`);

        return Number(answer);
    }

    resolveBracketDistribution(leftExpression, rightExpression) {
        const roundBracketsRegex = /[-/+]?[0-9]?\((.*?)\)/g;
        let leftResolved, rightResolved;

        let leftBracketExpressions = leftExpression.match(roundBracketsRegex);
        if (leftBracketExpressions) {
            leftResolved = this.resolveBrackets(
                leftBracketExpressions,
                leftExpression
                    .replaceAll("+", "++")
                    .replaceAll("-", "+-")
                    .split("+"),
                "left"
            );
        } else {
            leftResolved = leftExpression;
        }

        let rightBracketExpressions = rightExpression.match(roundBracketsRegex);
        if (rightBracketExpressions) {
            rightResolved = this.resolveBrackets(
                rightBracketExpressions,
                rightExpression
                    .replaceAll("+", "++")
                    .replaceAll("-", "+-")
                    .split("+"),
                "right"
            );
        } else {
            rightResolved = rightExpression;
        }

        return [leftResolved, rightResolved];
    }

    resolveBrackets(bracketExpressions, originalExpressionArray, equationSide) {
        let counter = 0,
            bracketExpanded = 0;
        let totalExpressionExpanded = "";
        const brackets = ["(", ")"];

        this.showStep(
            `Expand the bracket(s): ${bracketExpressions.join(", ")}`
        );

        for (let i = 0; i < originalExpressionArray.length; i++) {
            const element = originalExpressionArray[i];
            if (!element) continue; // handle empty strings

            if (element.includes(brackets[0])) {
                counter = 1;

                const expressionToExpand = bracketExpressions[bracketExpanded];
                bracketExpanded++;

                const expanded = this.addSign(
                    this.expandBracket(expressionToExpand)
                );

                this.showStepInfo(
                    `${expressionToExpand} becomes ${expanded
                        .replaceAll(`-1${this.variable}`, `-${this.variable}`)
                        .replaceAll(`+1${this.variable}`, `+${this.variable}`)}`
                );
                totalExpressionExpanded += expanded;
            } else if (element.includes(brackets[1])) {
                counter = 0;
            } else if (counter === 0) {
                counter++;
                totalExpressionExpanded += this.addSign(element);
            } else {
                counter++;
            }
        }

        this.showStepInfo(
            `The ${equationSide} side of the equation becomes: ${totalExpressionExpanded}`
        );
        this.step++;
        return totalExpressionExpanded;
    }

    expandBracket(bracketExpression) {
        let signedBracketExpression = this.addSign(bracketExpression);
        this.showStepInfo(`For <u>${signedBracketExpression}</u>`);

        let expandedBracket = "";

        let coefficient = signedBracketExpression.split("(")[0]; // +2
        // to handle equations that starts with symbols
        if (coefficient == "-") coefficient = "-1"; // e.g - (x + 1)
        if (coefficient == "+") coefficient = "+1"; // e.g + (x + 1)
        let insideBracketExpression = signedBracketExpression
            .split("(")[1]
            .replace(")", ""); // '4x+3'

        insideBracketExpression = insideBracketExpression
            .replaceAll("+", "++")
            .replaceAll("-", "+-")
            .split("+"); // ['4x', '+3']

        let expandedBracketExpresssion = insideBracketExpression.map(
            (expression) => {
                let calculated;
                if (!expression) return "";

                let expressionCoefficient = expression.split(this.variable)[0];

                if (expression.includes(this.variable)) {
                    if (
                        expression === this.variable ||
                        expression === `-${this.variable}`
                    ) {
                        expressionCoefficient = expression
                            .replace(this.variable, "1")
                            .replace(`-${this.variable}`, "-1"); // handle cases of x and -x as coefficients
                    }

                    calculated =
                        coefficient * this.addSign(expressionCoefficient) +
                        this.variable;

                    this.showStepInfo(
                        `Multipy ${coefficient} by ${expressionCoefficient
                            .replaceAll("1x", "x")
                            .replaceAll("-1x", "-x")}${
                            this.variable
                        } -> ${this.addSign(
                            calculated
                                .replaceAll("1x", "x")
                                .replaceAll("-1x", "-x")
                        )}`
                    );
                } else {
                    calculated =
                        coefficient * this.addSign(expressionCoefficient);
                    this.showStepInfo(
                        `Multipy ${coefficient} by ${expressionCoefficient} -> ${this.addSign(
                            calculated
                        )}`
                    );
                }

                return this.addSign(calculated);
            }
        );

        expandedBracketExpresssion.forEach((term) => {
            expandedBracket += term;
        });

        return expandedBracket;
    }

    resolveNumberAndVariableSide(numberSide, variableSide) {
        // the function helps to solve equations with a variable on one side and number(s) on the other side
        // e.g 3x = 4, 5x + 2x +2 = 44, 4x + 3 = 3 + 7
        const [variableSum, numbersToAddOnBothSides] =
            this.evaluateVariablesSide(variableSide, numberSide);
        if (
            numbersToAddOnBothSides &&
            parseInt(numbersToAddOnBothSides) !== 0
        ) {
            const signedNumToAdd = this.addSign(numbersToAddOnBothSides);
            const operation = signedNumToAdd[0];
            let currentStep;

            switch (operation) {
                case "+":
                    currentStep = `${
                        this.operators[signedNumToAdd[0]]
                    } ${numbersToAddOnBothSides} to both sides`;
                    break;
                case "-":
                    currentStep = `${
                        this.operators[signedNumToAdd[0]]
                    } ${numbersToAddOnBothSides} from both sides`;
                    break;
                default:
                    break;
            }
            this.showStep(currentStep);
            this.showStepInfo(
                `${this.addVariable(variableSum)} ${this.invertAddOrSubtract(
                    numbersToAddOnBothSides
                )} = ${numberSide}`
            );
            this.showStepInfo(
                `${this.addVariable(variableSum)} ${this.invertAddOrSubtract(
                    numbersToAddOnBothSides
                )} ${numbersToAddOnBothSides} = ${numberSide} ${numbersToAddOnBothSides}`
            );
            this.step++;
        }

        const numbersSum = this.evaluateNumbers(
            numberSide,
            numbersToAddOnBothSides,
            variableSum
        );
        return this.divideByCoefficient(numbersSum, variableSum);
    }

    resolveVariablesOnRightSide(
        leftSide,
        variablesToAdd,
        rightSideWithoutVariables,
        rightSide
    ) {
        // move the variables on the right side to the left side
        let expressionToAdd = "";
        this.showStep("Collect like terms");
        this.showStepInfo(
            `Move ${variablesToAdd.join(", ")} to the left side of the equation`
        );
        this.showStepInfo(`${leftSide} = ${rightSide}`);

        variablesToAdd.forEach((value) => {
            expressionToAdd += this.invertAddOrSubtract(this.addSign(value));
        });

        let newRightSideExpression = rightSideWithoutVariables
            .map((value) => this.addSign(value))
            .join("");
        if (!newRightSideExpression) newRightSideExpression = "0";

        const newLeftSideExpression = `${leftSide}${expressionToAdd}`;
        this.showStepInfo(
            `${newLeftSideExpression} = ${newRightSideExpression}`
        );

        this.step++;
        return [newLeftSideExpression, newRightSideExpression];
    }

    evaluateVariablesSide(string, equationOtherSide) {
        let numberToAddToBothSides,
            variablesCoefficientSum = 0;
        let variablesToAdd = [],
            numbersArray = [];

        // replace + with ++ and - with +-
        // then split the string by the extra plus we just added
        let expressionWithPlus = string
            .replaceAll("+", "++")
            .replaceAll("-", "+-");
        let expressionItems = expressionWithPlus.split("+");

        // sort out the items
        expressionItems.forEach((variable) => {
            if (variable !== "" && !isNaN(variable)) {
                // if item is a number
                numbersArray.push(this.addSign(variable));
            } else if (variable && this.containVariable(variable)) {
                // if item is a variable
                let variableToAdd = this.addSign(variable);
                const count = variable.split(this.variable).length - 1;

                if (count > 1) throw new Error("Invalid Equation"); // to make sure we don't have something like "2xx"

                // add a number to the front of a single variable e.g x will be come 1x, -x will become -1x
                switch (variableToAdd) {
                    case this.variable:
                        variableToAdd = `1${variableToAdd}`;
                        break;
                    case `-${this.variable}`:
                        variableToAdd = `${variableToAdd[0]}1${variableToAdd[1]}`;
                        break;
                    case `+${this.variable}`:
                        variableToAdd = `${variableToAdd[0]}1${variableToAdd[1]}`;
                        break;
                    default:
                        break;
                }
                variablesToAdd.push(variableToAdd);

                // sum up the coefficients of the variable
                const coefficient = variableToAdd.substr(
                    0,
                    variableToAdd.length - 1
                ); // exclude the variable alphabet e.g -4x becomes -4
                variablesCoefficientSum += parseInt(coefficient);
            }
        });

        if (variablesToAdd.length > 1) {
            this.showStep(
                `Sum up the variables ${variablesToAdd.join(
                    ", "
                )} to give us ${this.addVariable(variablesCoefficientSum)}`
            );
            this.showStepInfo(
                `${variablesToAdd.join(" ")} ${numbersArray.join(
                    " "
                )} = ${equationOtherSide}`
            );
            this.showStepInfo(
                `${this.addVariable(
                    variablesCoefficientSum
                )} ${numbersArray.join(" ")} = ${equationOtherSide}`
            );
            this.step++;
        }

        if (numbersArray.length > 1) {
            const numbersTotal = numbersArray.reduce(
                (a, b) => parseInt(a) + parseInt(b),
                0
            );
            this.showStep(
                `Sum up the numbers ${numbersArray.join(
                    ", "
                )} to give us ${parseInt(numbersTotal)}`
            );
            this.showStepInfo(
                `${this.addVariable(
                    variablesCoefficientSum
                )} ${numbersArray.join(" ")} = ${equationOtherSide}`
            );
            this.showStepInfo(
                `${this.addVariable(variablesCoefficientSum)} ${this.addSign(
                    numbersTotal
                )} = ${equationOtherSide}`
            );

            this.step++;
            numberToAddToBothSides = this.invertAddOrSubtract(numbersTotal);
        } else if (numbersArray.length === 1) {
            numberToAddToBothSides = this.invertAddOrSubtract(numbersArray[0]);
        }

        return [variablesCoefficientSum, numberToAddToBothSides];
    }

    evaluateNumbers(string, numberTotalFromOtherEquationSide, variableSum) {
        // I could have used the eval() function but Function() this is faster
        let sum;
        const numberToAdd = numberTotalFromOtherEquationSide
            ? parseInt(numberTotalFromOtherEquationSide)
            : null;

        this.showStep("Simplify");

        if (numberToAdd && numberToAdd !== 0) {
            sum = Function("return " + string + this.addSign(numberToAdd))();

            this.showStepInfo(
                `${this.addVariable(variableSum)} = ${string} ${this.addSign(
                    numberToAdd
                )}`
            );
            this.showStepInfo(`${this.addVariable(variableSum)} = ${sum}`);
            return sum;
        } else {
            sum = Function("return " + string)();
            this.showStepInfo(`${this.addVariable(variableSum)} = ${string}`);
        }

        if (sum !== parseInt(string)) {
            this.showStepInfo(`${this.addVariable(variableSum)} = ${sum}`);
        }

        return sum;
    }

    divideByCoefficient(dividend, divisor) {
        if (divisor === 0) {
            throw new Error(
                "The equation is a contradiction: it has no solutions... Try again!"
            ); // prevent infinity solution
        }

        const result = dividend / divisor;
        this.showStep(
            `divide both sides by the same factor of ${this.variable}`
        );
        this.showStepInfo(`${divisor}${this.variable} = ${dividend}`);
        this.showStepInfo(
            `(${divisor}${this.variable})/${divisor} = ${dividend}/${divisor}`
        );
        this.step++;

        this.showStep("Simplify");
        this.showStepInfo(
            "Cancel terms that are in both the numerator and denominator"
        );
        this.showStepInfo(`${this.variable} = ${dividend}/${divisor}`);
        this.step++;
        return result;
    }

    containsVariableOnBothSides(leftExpression, rightExpression) {
        return (
            this.containVariable(leftExpression) &&
            this.containVariable(rightExpression)
        );
    }

    invertAddOrSubtract(number) {
        let inverted;
        const value = number.toString();
        switch (value[0]) {
            case "-":
                inverted = `+${value.slice(1)}`;
                break;
            case "+":
                inverted = `-${value.slice(1)}`;
                break;
            default:
                inverted = `-${value}`;
                break;
        }
        return inverted;
    }

    addSign(value) {
        const expression = value.toString();
        if (expression.startsWith("-") || expression.startsWith("+")) {
            return expression;
        }
        return `+${expression}`;
    }

    addVariable(value) {
        if (value === 0) return value;
        return `${value}${this.variable}`;
    }

    containNumberOnly(string) {
        return !isNaN(string.replaceAll("-", "").replaceAll("+", ""));
    }

    containVariable(string) {
        return string.includes(this.variable);
    }
}

export default LinearEquation;
