import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import CUSTOMER_CHANNEL from '@salesforce/messageChannel/CustomerMessageChannel__c';

export default class CustomerList extends LightningElement {
    @wire(MessageContext)
    messageContext;

    handleSelect(event) {
        const payload = { customerId: event.target.dataset.id };
        publish(this.messageContext, CUSTOMER_CHANNEL, payload);
    }
}
