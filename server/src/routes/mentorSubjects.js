import { Router } from 'express';
import Table from '../table';

let router = Router();
let mentorSubjects = new Table('mentorSubjects');

router.get('/:userid', (req, res) => {
    let userid = req.params.userid;
    mentorSubjects.spMentorSubjects(userid)
        .then((mentorSubjects) => {
            res.send(mentorSubjects[0]);
        }).catch((err) => {
            console.log(err);
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