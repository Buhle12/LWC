import { LightningElement, track, wire } from 'lwc';
import { getListUi } from 'lightning/uiListApi';
import GUEST_STAY_OBJECT from '@salesforce/schema/Guest_Stay__c';

const columns = [
    { label: 'Guest', fieldName: 'GuestName', type: 'text' },
    { label: 'Room', fieldName: 'Room_Number__c', type: 'text' },
    { label: 'Status', fieldName: 'Status__c', type: 'text' },
    {
        type: 'button', 
        initialWidth: 100, 
        typeAttributes: { label: 'Edit', name: 'edit' }
    }
];

export default class GuestDashboard extends LightningElement {
    @track guestStays;
    @track selectedGuestStay;
    columns = columns;

    // Wire service to get guest stays
    @wire(getListUi, { objectApiName: GUEST_STAY_OBJECT, listViewApiName: 'All' })
    wiredGuestStays({ data, error }) {
        if (data) {
            this.guestStays = data.records.records.map(record => ({
                Id: record.fields.Id.value,
                GuestName: record.fields.Guest__c.displayValue,
                Room_Number__c: record.fields.Room_Number__c.value,
                Status__c: record.fields.Status__c.value
            }));
        } else if (error) {
            console.error('Error fetching guest stays', error);
        }
    }

    // Handle click on Edit button
    handleRowAction(event) {
        this.selectedGuestStay = this.guestStays.find(
            stay => stay.Id === event.detail.row.Id
        );
    }

    // Handle child update
    handleGuestUpdate() {
        // Refresh guest list automatically
        this.selectedGuestStay = null;
    }
}
