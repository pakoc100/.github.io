import { Component } from '@angular/core';
import { BruteForceResult, dice, Die, Digit, digits } from './typings';

@Component({
  selector: 'app-close-to',
  templateUrl: './close-to.component.html',
  styleUrls: ['./close-to.component.scss']
})
export class CloseToComponent {
  dice = dice;
  digits = digits;

  targetResult: string = '';

  currentInputs: Die[] = [];
  bruteForceResult?: BruteForceResult;


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
    console.log('E')
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
    this.bruteForceResult = new BruteForceResult(target, currentInputs);
  }

  clearEverything() {
    this.targetResult = '';
    this.currentInputs = [];
    this.bruteForceResult = undefined;
  }

}
