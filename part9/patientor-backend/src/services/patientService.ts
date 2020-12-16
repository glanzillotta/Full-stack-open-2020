import patientsData from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatient } from '../type';

const patients: Array<Patient> = patientsData;

const getPatients = (): Array<Patient> => {
    return patients;
};

const getNonSensitivePatient = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};

const addPatient = (entry: NewPatient ): Patient => {
    const idNewPatientEntry=Math.max(...patients.map(p => +p.id)) + 1;
    const newPatientEntry={
        id:String(idNewPatientEntry),
        ...entry
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getPatients,
    getNonSensitivePatient,
    addPatient
};