import { Router } from 'express';
import Table from '../table';

let router = Router();
let subjects = new Table('Subjects');

router.get('/users/:userid', (req, res) => {
    let userid = req.params.userid;
    subjects.spGetMentorSubjects(userid)
        .then((subjects) => {
            res.send(subjects);
        }).catch((err) => {
            console.log(err);
        });
});

router.get('/categories/:categoryid', (req, res) => {
    let categoryid = req.params.categoryid;
    subjects.find({ categoryid })
        .then((subjects) => {
            res.send(subjects);
        }).catch((err) => {
            console.log(err);
        });
});

export default router;