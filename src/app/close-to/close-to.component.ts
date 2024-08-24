import { Component, OnInit } from '@angular/core';
import { bruteforceBiggestNumberToTarget } from './closeToHelper';

const dice = [1, 2, 3, 4, 5, 6] as const;
export type Die = typeof dice[number];

const digits = [0, ...dice, 7, 8, 9] as const;
export type Digit = typeof digits[number];

@Component({
  selector: 'app-close-to',
  templateUrl: './close-to.component.html',
  styleUrls: ['./close-to.component.scss']
})
export class CloseToComponent implements OnInit {
  dice = dice;
  digits = digits;

  targetResult: string = '';

  highestResult?: number;
  highestValueWay?: string;
  resultCalculation?: string;

  currentInputs: Die[] = [];


  ngOnInit(): void {
    return;
    this.targetResult = '61';
    this.currentInputs = [2, 2, 5, 6, 6];
    this.calculateMaximum(this.targetResult, this.currentInputs);
  }

  addInput(addNumber: Die, currentInputs: Die[]): void {
    currentInputs.push(addNumber);
  }

  removeInput(): void {
    this.currentInputs?.pop();
  }

  removeAllInput(): void {
    this.currentInputs = [];
  }

  presentCurrentInputs(currentInputs: Die[]): string {
    return currentInputs?.join(', ')
  }

  addToTarget(addDigit: Digit, currentTargetResult: string): void {
    this.targetResult = currentTargetResult + addDigit;
  }

  removeTarget(): void {
    const currentLength = this.targetResult?.length;
    this.targetResult = this.targetResult.slice(0, currentLength - 1);
  }

  removeWholeTarget(): void {
    this.targetResult = '';
  }

  calculateMaximum(targetResult: string, currentInputs: Die[]): void {
    const target = parseInt(targetResult, 10);
    const highestValue = bruteforceBiggestNumberToTarget(target, currentInputs);
    console.log('highestValue: ', highestValue);
    this.highestResult = highestValue.value;
    this.highestValueWay = highestValue.way;
  }

}
