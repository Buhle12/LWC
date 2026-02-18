import { LightningElement, api, wire, track } from 'lwc';
import { getRecord, updateRecord } from 'lightning/uiRecordApi';
import ROOM_FIELD from '@salesforce/schema/Guest_Stay__c.Room_Number__c';
import STATUS_FIELD from '@salesforce/schema/Guest_Stay__c.Status__c';
import ID_FIELD from '@salesforce/schema/Guest_Stay__c.Id';

export default class GuestDetails extends LightningElement {
    @api guestStayId;
    @track roomNumber;
    @track status;

    statusOptions = [
        { label: 'Booked', value: 'Booked' },
        { label: 'Checked In', value: 'Checked In' },
        { label: 'Checked Out', value: 'Checked Out' }
    ];

    // Get guest stay record
    @wire(getRecord, { recordId: '$guestStayId', fields: [ROOM_FIELD, STATUS_FIELD] })
    wiredGuestStay({ data, error }) {
        if (data) {
            this.roomNumber = data.fields.Room_Number__c.value;
            this.status = data.fields.Status__c.value;
        } else if (error) {
            console.error('Error loading guest stay', error);
        }
    }

    handleRoomChange(event) {
        this.roomNumber = event.target.value;
    }

    handleStatusChange(event) {
        this.status = event.target.value;
    }

    handleSave() {
        const fields = {};
        fields[ID_FIELD.fieldApiName] = this.guestStayId;
        fields[ROOM_FIELD.fieldApiName] = this.roomNumber;
        fields[STATUS_FIELD.fieldApiName] = this.status;

        updateRecord({ fields })
            .then(() => {
                // Notify parent about the update
                this.dispatchEvent(new CustomEvent('update'));
            })
            .catch(error => {
                console.error('Error updating guest stay', error);
            });
    }
}
