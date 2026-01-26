import { LightningElement } from 'lwc';

export default class MoodTracker extends LightningElement {

    adviceMessage = '';
    moodAdviceMap={
        'Happy':'Keep up the good work!',
        'Stressed':'Take a break and do something you enjoy',
        'Tired':'Take a nap',
        'Focused':'Keep up the good work!'
    }  
    
    // method called when child sends selected mood
    handleMoodChange(event){

        //get selected mood from the child event
        const mood = event.detail;

       
        // select correct advice based on mood
        this.adviceMessage = this.moodAdviceMap[mood];
        ``
    };
}