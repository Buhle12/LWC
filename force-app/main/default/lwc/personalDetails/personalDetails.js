// personalDetails.js
import { LightningElement, track } from 'lwc';

export default class PersonalDetails extends LightningElement {
    details = {};

    handleChange(event) {
        this.details[event.target.name] = event.target.value;

        this.dispatchEvent(
            new CustomEvent('personaldetailschange', {
                detail: this.details
            })
        );
    }
}


