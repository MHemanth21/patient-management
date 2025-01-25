public with sharing class PatientController {
    @AuraEnabled(cacheable=true)
    public static List<Patient__c> getPatients() {
        return [SELECT Id, Name, Date_of_Birth__c, Treatment_Status__c FROM Patient__c];
    }

    @AuraEnabled
    public static Patient__c getPatientById(Id patientId) {
        return [SELECT Id, Name, Date_of_Birth__c, Treatment_Status__c FROM Patient__c WHERE Id = :patientId LIMIT 1];
    }

    @AuraEnabled
    public static void createPatient(String name, Date dob, String status) {
        Patient__c patient = new Patient__c(
            Name = name,
            Date_of_Birth__c = dob,
            Treatment_Status__c = status
        );
        insert patient;
    }
}
