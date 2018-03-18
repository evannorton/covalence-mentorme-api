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
    let confirmed = req.params.confirmed;
    appointments.find({ studentid, confirmed })
        .then((appointments) => {
            res.send(appointments);
        }).catch((err) => {
            console.log(err);
        });
});

router.get('/mentor/:mentorid', (req, res) => {
    let mentorid = req.params.mentorid;
    appointments.spMentorAgenda(mentorid)
        .then((mentorAgenda) => {
            res.send(mentorAgenda[0]);
        }).catch((err) => {
            console.log(err);
            res.send(500);
        });
});

router.get('/student/:studentid', (req, res) => {
    let studentid = req.params.studentid;
    appointments.spStudentAgenda(studentid)
        .then((studentAgenda) => {
            res.send(studentAgenda[0]);
        }).catch((err) => {
            console.log(err);
            res.send(500);
        });
});

router.post('/', (req, res) => {
    let appointment = req.body;
    appointments.insert(appointment)
        .then(() => {
            res.sendStatus(200);
        }).catch((err) => {
            console.log(err);
        });
});

router.put('/:id', (req, res) => {
    let id = req.params.id;
    appointments.update(id, req.body)
        .then(() => {
            res.sendStatus(200);
        }).catch((err) => {
            console.log(err);
        });
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    appointments.delete(id)
        .then(() => {
            res.sendStatus(200);
        }).catch((err) => {
            console.log(err);
        })
});

export default router;