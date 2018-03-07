import { Router } from 'express';
import Table from '../table';

let router = Router();
let mentorSubjects = new Table('mentorSubjects');

router.post('/', (req, res) => {
    let userid = req.body.userid;
    let subjectid = req.body.subjectid;
    let mentorSubject = {
        userid,
        subjectid
    }
    mentorSubjects.insert(mentorSubject)
        .then((res) => {
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
        .then((res) => {
            res.sendStatus(200);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});

export default router;