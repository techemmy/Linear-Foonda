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
    }

    showQuestion(question) {
        return this.addToHTML(`Question: ${question} `, "step");
    }

    showStep(step) {
        // console.log(`Step ${this.step}: ${step}`);
        return this.addToHTML(`Step ${this.step}: ${step} `, "step");
    }

    showStepInfo(info) {
        // console.log(info);
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
        const equationWithoutSpaces = equation.trim().split(" ").join("");
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

    solve(equation) {
        // 2x = 3 ✅
        // 2x + 3x = 3 ✅
        // 2x + 3x = 3 + 5 ✅
        // 7x - 2 = 21 ✅
        // x + 1 + 2 = 3 ✅
        // x + 2 = 3x ✅
        // x + 2 = 3x + 5 ✅
        // 2(4x + 3) + 6 = 24 -4x ✅

        this.showQuestion(`<b>${equation}</b>`);

        let [left, right] = this.sanitize(equation).split("=");
        let answer;

        [left, right] = this.resolveBracketDistribution(left, right);

        if (this.containsVariableOnBothSies(left, right)) {
            // if boths sides contain a variable
            let rightExpression = right
                .replaceAll("+", "++")
                .replaceAll("-", "+-")
                .split("+");
            const rightExpressionVariables = rightExpression.filter((value) => {
                if (this.containVariable(value)) return true;
                return false;
            });

            const rightWithoutVariables = rightExpression.filter((value) => {
                if (value && !rightExpressionVariables.includes(value))
                    return true;
                return false;
            });

            [left, right] = this.resolveVariablesOnRightSide(
                left,
                rightExpressionVariables,
                rightWithoutVariables,
                right
            );
        }

        if (
            // check if left contains only a number and right has a variable
            this.containNumberOnly(left) &&
            this.containVariable(right, this.variable)
        ) {
            answer = this.resolveNumberAndVariableSide(left, right);
        } else if (
            // check if right contains only a number and left has a variable
            this.containNumberOnly(right) &&
            this.containVariable(left, this.variable)
        ) {
            answer = this.resolveNumberAndVariableSide(right, left);
        }

        this.showStep("Solution");
        this.showStepInfo(`${this.variable} = ${answer}`);

        return answer;
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

            if (
                element.includes(brackets[0]) ||
                element.includes(brackets[1])
            ) {
                if (counter == 0) {
                    const expressionToExpand =
                        bracketExpressions[bracketExpanded];
                    const expanded = this.addSign(
                        this.expandBracket(expressionToExpand)
                    );
                    this.showStepInfo(
                        `${expressionToExpand} becomes ${expanded
                            .replaceAll(
                                `-1${this.variable}`,
                                `-${this.variable}`
                            )
                            .replaceAll(
                                `+1${this.variable}`,
                                `+${this.variable}`
                            )}`
                    );
                    totalExpressionExpanded += expanded;
                }
                counter++;
            } else {
                totalExpressionExpanded += this.addSign(element);
            }

            if (counter >= 2) {
                bracketExpanded++;
                counter = 0;
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

    resolveVariablesOnRightSide(
        leftSide,
        variablesToAdd,
        newRightSide,
        rightSide
    ) {
        // BUG: fix issue with rearrangement of equation like changed `1 = 2x` into `2x = 1`

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

        let newRightExpression = newRightSide
            .map((value) => this.addSign(value))
            .join("");
        if (!newRightExpression) newRightExpression = "0";

        const newLeftExpression = `${leftSide}${expressionToAdd}`;
        this.showStepInfo(`${newLeftExpression} = ${newRightExpression}`);

        this.step++;
        return [newLeftExpression, newRightExpression];
    }

    containsVariableOnBothSies(leftExpression, rightExpression) {
        return (
            this.containVariable(leftExpression) &&
            this.containVariable(rightExpression)
        );
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
            if (operation === "+") {
                currentStep = `${
                    this.operators[signedNumToAdd[0]]
                } ${numbersToAddOnBothSides} to both sides`;
            } else if (operation === "-") {
                currentStep = `${
                    this.operators[signedNumToAdd[0]]
                } ${numbersToAddOnBothSides} from both sides`;
            }

            this.showStep(currentStep);

            this.showStepInfo(
                `${variableSum}${this.variable} ${this.invertAddOrSubtract(
                    numbersToAddOnBothSides
                )} = ${numberSide}`
            );

            this.showStepInfo(
                `${variableSum}${this.variable} ${this.invertAddOrSubtract(
                    numbersToAddOnBothSides
                )} ${numbersToAddOnBothSides} = ${numberSide} ${numbersToAddOnBothSides}`
            );
            this.step++;

            // this.showStep("Simplify");
            // this.showStepInfo(`${variableSum}${this.variable} = ${numberSide}`);
            // this.step++;
        }

        const numbersSum = this.evaluateNumbers(
            numberSide,
            numbersToAddOnBothSides,
            variableSum
        );
        return this.divideByCoefficient(numbersSum, variableSum);
    }

    evaluateNumbers(string, numberTotalFromOtherEquationSide, variableSum) {
        // I could have used the eval() function but Function() this is faster
        this.showStep("Simplify");
        const numberToAdd = numberTotalFromOtherEquationSide
            ? parseInt(numberTotalFromOtherEquationSide)
            : null;
        let sum;

        if (numberToAdd && numberToAdd !== 0) {
            this.showStepInfo(
                `${variableSum}${this.variable} = ${string} ${this.addSign(
                    numberToAdd
                )}`
            );
            sum = Function("return " + string + this.addSign(numberToAdd))();
            this.showStepInfo(`${variableSum}${this.variable} = ${sum}`);
            return sum;
        } else {
            this.showStepInfo(`${variableSum}${this.variable} = ${string}`);
            sum = Function("return " + string)();
        }

        if (sum !== parseInt(string)) {
            this.showStepInfo(`${variableSum}${this.variable} = ${sum}`);
        }
        return sum;
    }

    evaluateVariablesSide(string, equationOtherSide) {
        let numbersTotal, numberToAddToBothSides;
        let variablesToAdd = [];
        let numbersOnlyArray = [];
        let variablesSum = 0;

        // replace + with ++ and - with +-
        // then split the string by the extra plus we just added
        let expressionWithPlus = string
            .replaceAll("+", "++")
            .replaceAll("-", "+-");
        let variables = expressionWithPlus.split("+");

        // add a number to the front of a single variable e.g x will be come 1x, -x will become -1x
        variables = variables.map((variable) => {
            const count = variable.split(this.variable).length - 1;
            if (count > 1) throw new Error("Invalid Equation"); // to make sure we don't have something like "2xx"

            if (variable === this.variable) {
                return `1${variable}`;
            } else if (variable === `-${this.variable}`) {
                return `${variable[0]}1${variable[1]}`;
            }
            return variable;
        });

        // sum up the variables
        variables.forEach((variable) => {
            if (!isNaN(variable) && variable !== "") {
                // if it's only a number
                numbersOnlyArray.push(variable);
            } else if (variable) {
                // add the variables together
                const variableToAdd = this.addSign(variable);
                variablesToAdd.push(variableToAdd);
                const coefficient = variable.substr(0, variable.length - 1); // exclude the x
                variablesSum += parseInt(coefficient);
            }
        });

        numbersOnlyArray = numbersOnlyArray.map((number) =>
            this.addSign(number)
        );
        variablesToAdd = variablesToAdd.map((variable) =>
            this.addSign(variable)
        );

        if (variablesSum === 0) throw new Error("no solution"); // prevent infinity solution
        if (variablesToAdd.length > 1) {
            this.showStep(
                `Sum up the variables ${variablesToAdd.join(
                    ", "
                )} to give us ${variablesSum}${this.variable}`
            );
            this.showStepInfo(
                `${variablesToAdd.join(" ")} ${numbersOnlyArray.join(
                    " "
                )} = ${equationOtherSide}`
            );
            this.showStepInfo(
                `${variablesSum}${this.variable} ${numbersOnlyArray.join(
                    " "
                )} = ${equationOtherSide}`
            );
            this.step++;
        }

        if (numbersOnlyArray.length === 1) {
            numbersTotal = numbersOnlyArray[0];
            numberToAddToBothSides = this.invertAddOrSubtract(numbersTotal);
        } else if (numbersOnlyArray.length > 1) {
            numbersTotal = numbersOnlyArray.reduce(
                (a, b) => parseInt(a) + parseInt(b),
                0
            );
            this.showStep(
                `Sum up the numbers ${numbersOnlyArray.join(
                    ", "
                )} to give us ${parseInt(numbersTotal)}`
            );
            this.showStepInfo(
                `${variablesSum}${this.variable} ${numbersOnlyArray.join(
                    " "
                )} = ${equationOtherSide}`
            );
            this.showStepInfo(
                `${variablesSum}${this.variable} ${this.addSign(
                    numbersTotal
                )} = ${equationOtherSide}`
            );

            this.step++;
            numberToAddToBothSides = this.invertAddOrSubtract(numbersTotal);
        }

        // if (numbersTotal) console.log(`Now, we have ${variablesSum}${this.variable} ${this.addSign(numbersTotal)} = ${equationOtherSide}`);
        // else console.log(`Now, we have ${variablesSum}${this.variable} = ${equationOtherSide}`);

        return [variablesSum, numberToAddToBothSides];
    }

    divideByCoefficient(dividend, divisor) {
        const result = dividend / divisor;
        this.showStep("divide both sides by the same factor");
        this.showStepInfo(`${divisor}${this.variable} = ${dividend}`);
        this.showStepInfo(
            `(${divisor}${this.variable})/${divisor} = ${dividend}/${divisor}`
        );
        this.step++;

        this.showStep("Simplify");
        this.showStepInfo(
            "Cancel terms that are in both the numerator and denominator"
        );
        // this.showStepInfo(
        //     `${divisor}${this.variable} = ${dividend}/${divisor}`
        // );
        this.showStepInfo(`${this.variable} = ${dividend}/${divisor}`);
        this.step++;

        return result;
    }

    invertAddOrSubtract(number) {
        let inverted;
        const value = number.toString();
        if (value.startsWith("-")) {
            inverted = `+${value.slice(1)}`;
        } else if (value.startsWith("+")) {
            inverted = `-${value.slice(1)}`;
        } else {
            inverted = `-${value}`;
        }

        return inverted;
    }

    addSign(value) {
        const expression = value.toString();
        if (expression.startsWith("-")) return expression;
        else if (expression.startsWith("+")) return expression;
        else return `+${expression}`;
    }

    containNumberOnly(string) {
        return !isNaN(string.replaceAll("-", "").replaceAll("+", ""));
    }

    containVariable(string) {
        return string.includes(this.variable);
    }
}

export default LinearEquation;
