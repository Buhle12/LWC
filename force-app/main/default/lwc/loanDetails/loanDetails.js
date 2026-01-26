import { LightningElement } from 'lwc';

export default class LoanDetails extends LightningElement {

    loan = {};

    loanOptions = [
        { label: 'Personal Loan', value: 'Personal' },
        { label: 'Home Loan', value: 'Home' },
        { label: 'Car Loan', value: 'Car' }
    ];

    handleChange(event) {
        this.loan[event.target.name] = event.target.value;

        this.dispatchEvent(
            new CustomEvent('loandetailschange', {
                detail: this.loan
            })
        );
    }
}

