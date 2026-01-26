import { LightningElement, api } from 'lwc';

export default class CalculatorChild extends LightningElement {
    @api num1;
    @api num2;

    // Helper to send result to parent
    sendResult(result) {
        const event = new CustomEvent('calculationdone', { detail: result });
        this.dispatchEvent(event);
    }

    add() {
        this.sendResult(this.num1 + this.num2);
    }

    subtract() {
        this.sendResult(this.num1 - this.num2);
    }

    multiply() {
        this.sendResult(this.num1 * this.num2);
    }

    divide() {
        if (this.num2 !== 0) {
            this.sendResult(this.num1 / this.num2);
        } else {
            this.sendResult('Cannot divide by 0');
        }
    }
}

