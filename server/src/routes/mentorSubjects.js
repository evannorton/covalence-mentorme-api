import { Router } from 'express';
import Table from '../table';

let router = Router();
let mentorSubjects = new Table('mentorSubjects');

router.get('/subjects/:subjectid', (req, res) => {
    let subjectid = req.params.subjectid;
    mentorSubjects.find({ subjectid })
        .then((mentorSubjects) => {
            res.send(mentorSubjects);
        }).catch((err) => {
            console.log(err);
            res.send(500);
        });
});

router.post('/', (req, res) => {
    let userid = req.body.userid;
    let subjectid = req.body.subjectid;
    let mentorSubject = {
        userid,
        subjectid
    }
    mentorSubjects.insert(mentorSubject)
        .then(() => {
            res.sendStatus(200);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});

router.delete('/', (req, res) => {
    let userid = req.body.userid;
    let subjectid = req.body.subjectid;
    mentorSubjects.spDeleteMentorSubject(userid, subjectid)
        .then(() => {
            res.sendStatus(200);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});

export default router;