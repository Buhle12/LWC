import { LightningElement } from 'lwc';

export default class form extends LightningElement {

    name = '';
    surname = '';
    email = '';
    submitted = false;

    handleChange(event) {
        const field = event.target.name;
        this[field] = event.target.value;
    }

    handleSubmit() {
        this.submitted = true;
    }
}

