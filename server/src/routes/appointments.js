import { Router } from 'express';
import Table from '../table';

let router = Router();
let appointments = new Table('Appointments');

router.post('/', (req, res) => {
    let appointment = req.body;
    appointments.insert(appointment)
        .then(() => {
            res.sendStatus(200)
        }).catch((err) => {
            console.log(err);
        });
});

export default router;