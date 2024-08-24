export const dice = [1, 2, 3, 4, 5, 6] as const;
export type Die = typeof dice[number];

export const digits = [0, ...dice, 7, 8, 9] as const;
export type Digit = typeof digits[number];


import * as math from 'mathjs';

const operators = ['+', '-', '*', '/'] as const;
type Operator = typeof operators[number];


/*given is some equation without any braces like 55+4*3*1-4 - returns the equation with braces set if somebody would read each pair from left to right and you should
always calculate between each operand- so instead of 55 + 12 - 4 = 63 this should transform it to (((55+4)*3)*1)-4 = 173 */
function setBracesBetweenPairs(equation: string): string {
    let result = "";  // This will store the final equation with braces
    let current = ""; // Temporary variable to build the current part of the equation

    for (let i = 0; i < equation.length; i++) {
        const char = equation[i];

        if (char === '+' || char === '-' || char === '*' || char === '/') {
            // When we encounter an operator, wrap the current part with the next number in braces
            // and continue to build the equation.
            if (current.length > 0) {
                result = `(${result}${current})`;
            }
            // Append the operator to the result
            result += char;
            // Reset current to build the next number
            current = "";
        } else {
            // Build the current number/part
            current += char;
        }
    }

    // Append the last part of the equation
    if (current.length > 0) {
        result = `(${result}${current})`;
    }

    return result;
}

function buildEquation(inputDigitSeed: number[], operandSeed: string[]) {
    let equation = '';
    let index = 0;
    for (const inputDigit of inputDigitSeed) {
        const nextPart = index === operandSeed.length ? inputDigit : `${inputDigit}${operandSeed[index]}`;
        equation = equation + nextPart;
        index++;
    }
    return equation;
}

function permutations<T>(arr: T[]): T[][] {
    if (arr.length === 0) {
        return [[]];
    }

    const result: T[][] = [];
    for (let i = 0; i < arr.length; i++) {
        const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
        const restPermutations = permutations(rest);
        for (const perm of restPermutations) {
            result.push([arr[i], ...perm]);
        }
    }

    return result;
}

function filterDuplicates(arr: number[][]): number[][] {
    return arr.filter((subArr, index) => {
        return !arr.slice(0, index).some((prevSubArr) => {
            return prevSubArr.every((num, i) => num === subArr[i]);
        });
    });
}

function generateCombinationsWithRepetition(
    items: string[],
    length: number,
    prefix: string[] = [],
    result: string[][] = []
): string[][] {
    if (prefix.length === length) {
        result.push(prefix);
        return result;
    }

    for (let i = 0; i < items.length; i++) {
        generateCombinationsWithRepetition(
            items,
            length,
            [...prefix, items[i]],
            result
        );
    }

    return result;
}

function evaluateEquiation(equiation: string): number {
    return math.evaluate(equiation) || 0;
}


export class BruteForceResult {
    highestValue: number = 0;
    way: string = '';
    calculations: number = 0;

    constructor(target: number, inputs: Die[]) {
        if (!target) return;

        const allInputs: number[][] = permutations(inputs);
        const allInputsWithoutDuplicates = filterDuplicates(allInputs);
        const inputLength = inputs?.length;
        const operandsLength = inputLength - 1;
        const allOperandsSeeds = generateCombinationsWithRepetition(operators?.map(operator => operator.toString()), operandsLength);

        for (const operandSeed of allOperandsSeeds) {
            for (const inputDigitSeed of allInputsWithoutDuplicates) {
                const equation = buildEquation(inputDigitSeed, operandSeed)
                const equationWithBraces = setBracesBetweenPairs(equation);
                const currentValue = evaluateEquiation(equationWithBraces);
                this.calculations++;
                if (currentValue >= this.highestValue && currentValue <= target) {
                    this.highestValue = currentValue;
                    this.way = equationWithBraces;
                }

                if (currentValue == target)
                    return

            }
        }
    }
}