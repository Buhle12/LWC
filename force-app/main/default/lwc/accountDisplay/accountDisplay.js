import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

// Account fields
import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';

export default class AccountDisplay extends LightningElement {
    @api recordId;

    @wire(getRecord, {
        recordId: '$recordId',
        fields: [NAME_FIELD, PHONE_FIELD]
    })
    account;

    get name() {
        return this.account?.data?.fields?.Name?.value;
    }

    get phone() {
        return this.account?.data?.fields?.Phone?.value;
    }
}
