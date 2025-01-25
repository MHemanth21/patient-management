import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class Home extends NavigationMixin(LightningElement) {
    navigateToNewPatient() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: '/c/newPatient'
            }
        });
    }

    navigateToExistingPatients() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: '/c/existingPatients'
            }
        });
    }
}
