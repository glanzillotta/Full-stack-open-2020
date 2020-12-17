import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils/utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.json(patientService.getPublicPatient());
});

router.post('/', (req, res) => {
    try{
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientService.addPatient(newPatient);
        res.json(addedPatient);
    }catch(e){
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(e.message);
    }
});

router.get('/:id', (req, res)=>{
    const patient=patientService.getPatient(String(req.params.id));
    if(!patient)
        res.status(400).json({ error: 'patient not found or not existent' });
    res.json();
});

export default router;