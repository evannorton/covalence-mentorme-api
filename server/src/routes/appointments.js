import { Router } from 'express';
import Table from '../table';

let router = Router();
let appointments = new Table('Appointments');

router.get('/mentors/:mentorid/:confirmed', (req, res) => {
    let mentorid = req.params.mentorid;
    let confirmed = req.params.confirmed;
    appointments.find({ mentorid, confirmed })
        .then((appointments) => {
            res.send(appointments);
        }).catch((err) => {
            console.log(err);
        });
});

router.get('/students/:studentid/:confirmed', (req, res) => {
    let studentid = req.params.studentid;
    let confirmed = req.parms.confirmed;
    appointments.find({ studentid, confirmed })
        .then((appointments) => {
            res.send(appointments);
        }).catch((err) => {
            console.log(err);
        });
});

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