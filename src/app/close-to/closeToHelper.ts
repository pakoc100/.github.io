import { Die } from "./close-to.component";
import * as math from 'mathjs';

const operators = ['+', '-', '*', '/'] as const;
type Operator = typeof operators[number];


export function bruteforceBiggestNumberToTarget(target: number, inputs: Die[]): { value: number, way: string } {
    let highestValueSoFar = 0;
    let value = -1;
    let way = '';
    if (!target) return { value: value, way: way };

    const allInputs = permutations(inputs);
    const allInputsWithoutDuplicates = filterDuplicates(allInputs);
    console.log('allInputsWithoutDuplicates: ', allInputsWithoutDuplicates);
    const inputLength = inputs?.length;
    const operandsLength = inputLength - 1;
    const allOperandsSeeds = generateCombinationsWithRepetition(operators?.map(operator => operator.toString()), operandsLength);
    console.log('allOperandsSeeds: ', allOperandsSeeds);

    let equiationAmount =0;
    let equiation = '';
    for (const operandSeed of allOperandsSeeds) {
        for (const inputDigitSeed of allInputsWithoutDuplicates) {

            let i = 0;
            let j = 0;
            while (i < inputLength) {

                while (j < operandsLength) {

                    const term = inputDigitSeed[i];
                    const operand = operandSeed[j];

                    equiation = equiation + term + operand;

                    const overNextTerm = inputDigitSeed[i + 2];
                    if (!overNextTerm) {
                        equiationAmount++;
                        const term2 = inputDigitSeed[i + 1];
                        equiation = equiation + term2;

                        const equiationValue: number = evaluateEquiation(equiation);
                        if (equiationValue > highestValueSoFar && equiationValue <= target) {
                            highestValueSoFar = equiationValue;
                            way = equiation;
                        }

                        if (highestValueSoFar === target) {
                            return { value: equiationValue, way: equiation };
                        }


                        equiation = '';
                        break;
                    }

                    i++;
                    j++;
                }

                if (equiation === '') break;
            }
        }
    }

    console.log('equiationAmount ',equiationAmount)
    return { value: highestValueSoFar, way: way };
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
