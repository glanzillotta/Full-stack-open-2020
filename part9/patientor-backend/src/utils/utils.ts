/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Gender, NewPatient } from '../type';

const isGender = (value: any): value is Gender => {
    return Object.values(Gender).includes(value);
};

const isString = (value: any): boolean => {
    return typeof value === 'string' || value instanceof String;
};

const isDate = (value: any): boolean => {
    return Boolean(Date.parse(value));
};

const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender))
        throw new Error('Incorrect or missing gender: ' + String(gender));
    return gender;
};

const parseName = (name: any): string => {
    if (!name || !isString(name))
        throw new Error('Incorrect or missing name:' + String(name));
    return String(name);
};

const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation))
        throw new Error('Incorrect or missing occupation: ' + String(occupation));
    return String(occupation);
};

const parseSsn = (ssn: any): string => {
    if (!ssn || !isString(ssn))
        throw new Error('Incorrect or missing ssn: ' + String(ssn));
    return String(ssn);
};

const parseDateOfBirth = (date: any): string => {
    if (!date || !isDate(date))
        throw new Error('Incorrect or missing dateOfBirth: ' + String(date));
    return new Date(date).toISOString().split('T')[0];
};

const parseEntries = ()=>{
    return [];
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewPatient = (object: any): NewPatient => {
    return {
        gender: parseGender(object.gender),
        name: parseName(object.name),
        occupation: parseOccupation(object.occupation),
        ssn: parseSsn(object.ssn),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        entries:parseEntries()
    };
};

export default toNewPatient;