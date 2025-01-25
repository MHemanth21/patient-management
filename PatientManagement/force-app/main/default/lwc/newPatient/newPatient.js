import { LightningElement, track } from 'lwc';
import createPatient from '@salesforce/apex/PatientController.createPatient';

export default class NewPatient extends LightningElement {
    @track name = '';
    @track dob = '';
    @track status = 'Active';

    statusOptions = [
        { label: 'Active', value: 'Active' },
        { label: 'Inactive', value: 'Inactive' },
    ];

    handleChange(event) {
        const field = event.target.name;
        if (field === 'name') this.name = event.target.value;
        if (field === 'dob') this.dob = event.target.value;
        if (field === 'status') this.status = event.target.value;
    }

    handleSubmit() {
        createPatient({ name: this.name, dob: this.dob, status: this.status })
            .then(() => {
                alert('Patient created successfully!');
                this.clearForm();
            })
            .catch((error) => {
                console.error('Error creating patient:', error);
            });
    }

    clearForm() {
        this.name = '';
        this.dob = '';
        this.status = 'Active';
    }
}
