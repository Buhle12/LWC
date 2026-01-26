import { LightningElement, track } from 'lwc';

export default class LoanApplicationForms extends LightningElement {
 personalDetails = {};
    loanDetails = {};

    handlePersonalDetails(event) {
        this.personalDetails = event.detail;
    }

    handleLoanDetails(event) {
        this.loanDetails = event.detail;
    }

    handleSubmit() {
        const finalApplication = {
            personalDetails: this.personalDetails,
            loanDetails: this.loanDetails
        };

        console.log('Final Loan Application:', JSON.stringify(finalApplication));

        alert('Loan Application Submitted Successfully');
    }
}
