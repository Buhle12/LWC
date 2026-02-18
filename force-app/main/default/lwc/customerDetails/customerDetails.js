import { LightningElement, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import CUSTOMER_CHANNEL from '@salesforce/messageChannel/CustomerMessageChannel__c';

export default class CustomerDetails extends LightningElement {
    customerId;

    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        subscribe(
            this.messageContext,
            CUSTOMER_CHANNEL,
            (message) => {
                this.customerId = message.customerId;
            }
        );
    }
}
