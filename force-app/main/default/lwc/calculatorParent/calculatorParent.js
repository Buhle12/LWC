import { LightningElement, track } from 'lwc';

export default class CalculatorParent extends LightningElement {
     num1 = 0;
     num2 = 0;
     result;

    handleNum1Change(event) {
        this.num1 = parseFloat(event.target.value);
    }

    handleNum2Change(event) {
        this.num2 = parseFloat(event.target.value);
    }

    handleResult(event) {
        // Get result from child
        this.result = event.detail;
    }
}

