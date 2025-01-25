import { LightningElement, track } from 'lwc';
import getPatients from '@salesforce/apex/PatientController.getPatients';
import { NavigationMixin } from 'lightning/navigation';

export default class ExistingPatients extends NavigationMixin(LightningElement) {
    @track patients = [];
    @track filteredPatients = [];
    @track searchKey = '';

    connectedCallback() {
        this.loadPatients();
    }

    loadPatients() {
        getPatients()
            .then((data) => {
                this.patients = data;
                this.filteredPatients = data;
            })
            .catch((error) => {
                console.error('Error retrieving patients:', error);
            });
    }

    handleSearch(event) {
        this.searchKey = event.target.value.toLowerCase();
        this.filteredPatients = this.patients.filter((patient) =>
            patient.Name.toLowerCase().includes(this.searchKey) ||
            patient.Id.toLowerCase().includes(this.searchKey)
        );
    }

    handleViewDetails(event) {
        const patientId = event.target.dataset.id;
        this[NavigationMixin.Navigate]({
            type: 'standard__component',
            attributes: {
                componentName: 'c__patientDetail',
            },
            state: {
                c__patientId: patientId,
            },
        });
    }
}
