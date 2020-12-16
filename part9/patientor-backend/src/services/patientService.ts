import patientsData from '../../data/patients.json';
import { Patient, NonSensitivePatient} from '../type';

const patients: Array<Patient> = patientsData as Array<Patient>;

const getPatients = ():Array<Patient> =>{
    return patients;
};

const getNonSensitivePatient = ():NonSensitivePatient[] =>{
    return patients.map(({id, name, dateOfBirth, gender, occupation})=>({
        id, name, dateOfBirth, gender, occupation
    }));
};

export default{
    getPatients,
    getNonSensitivePatient
};