import { LightningElement, wire } from 'lwc';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import RATING_FIELD from '@salesforce/schema/Account.Rating';
import TYPE_FIELD from '@salesforce/schema/Account.Type';

export default class PicklistExplorer extends LightningElement {
    // Picklist options
    ratingOptions = [];
    typeOptions = [];

    // Selected values
    selectedRating;
    selectedType;

    // Decision messages
    ratingDecision;
    typeDecision;

    // Object metadata
    objectLabel;
    recordTypeId;

    // Debug info
    ratingCount = 0;
    typeCount = 0;
    wireErrors;

    // --------------------------
    // Get Account metadata
    // --------------------------
    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    wiredObjectInfo({ data, error }) {
        if (data) {
            this.objectLabel = data.label;
            this.recordTypeId = data.defaultRecordTypeId;
        } else if (error) {
            this.wireErrors = error;
        }
    }

    // --------------------------
    // Get Account.Rating picklist
    // --------------------------
    @wire(getPicklistValues, { fieldApiName: RATING_FIELD, recordTypeId: '$recordTypeId' })
    wiredRating({ data, error }) {
        if (data) {
            this.ratingOptions = [...data.values]; // reassign array for reactivity
            this.ratingCount = data.values.length;
        } else if (error) {
            this.wireErrors = error;
        }
    }

    // --------------------------
    // Get Account.Type picklist
    // --------------------------
    @wire(getPicklistValues, { fieldApiName: TYPE_FIELD, recordTypeId: '$recordTypeId' })
    wiredType({ data, error }) {
        if (data) {
            this.typeOptions = [...data.values]; // reassign array for reactivity
            this.typeCount = data.values.length;
        } else if (error) {
            this.wireErrors = error;
        }
    }

    // --------------------------
    // Handle picklist change
    // --------------------------
    handleRatingChange(event) {
        const selectedValue = event.target.value;
        this.selectedRating = this.ratingOptions.find(opt => opt.value === selectedValue);

        // Example decision logic
        this.ratingDecision = this.selectedRating.value === 'Hot'
            ? 'High priority client'
            : 'Normal follow-up';
    }

    handleTypeChange(event) {
        const selectedValue = event.target.value;
        this.selectedType = this.typeOptions.find(opt => opt.value === selectedValue);

        // Example decision logic
        this.typeDecision = this.selectedType.value === 'Customer - Direct'
            ? 'Direct sales approach'
            : 'Indirect approach';
    }
}




