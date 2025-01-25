import { LightningElement, api, track } from 'lwc';
import getPatientById from '@salesforce/apex/PatientController.getPatientById';

export default class PatientDetail extends LightningElement {
    @api patientId;
    @track patient;

    connectedCallback() {
        if (this.patientId) {
            this.loadPatient();
        }
    }

    loadPatient() {
        getPatientById({ patientId: this.patientId })
            .then((data) => {
                this.patient = data;
            })
            .catch((error) => {
                console.error('Error fetching patient details:', error);
            });
    }
}
