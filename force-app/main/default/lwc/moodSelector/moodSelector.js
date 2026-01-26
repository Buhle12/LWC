// Import required LWC modules
import { LightningElement, api } from 'lwc';

export default class MoodSelector extends LightningElement {

    // receive advice from parent
    @api advice;

    // method triggered when any mood button is clicked
    handleMoodClick(event) {

        // get the mood value from the clicked button
        const selectedMood = event.target.dataset.mood;

        // Send selected mood to parent component
        this.dispatchEvent(
            new CustomEvent('moodchange', {
              // data sent to parent
            detail: selectedMood
                
            })
            
        );
    }
}
