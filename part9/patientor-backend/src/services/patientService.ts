import patientsData from '../../data/patients';
import { Patient, PublicPatient, NewPatient } from '../type';

const patients: Patient[] = patientsData;

const getPatients = (): Patient[] => {
    return patients;
};

const getPublicPatient = (): PublicPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (entry: NewPatient): Patient => {
    const idNewPatientEntry = Math.max(...patients.map(p => +p.id)) + 1;
    const newPatientEntry = {
        id: String(idNewPatientEntry),
        ...entry
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};

const getPatient = (id: string) : Patient => {
    return patients.filter(p => p.id === id)[0];
};

export default {
    getPatients,
    getPublicPatient,
    getPatient,
    addPatient
};