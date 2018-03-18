import { Router } from 'express';
import Table from '../table';

let router = Router();
let subjects = new Table('Subjects');

router.get('/users/:userid', (req, res) => {
    let userid = req.params.userid;
    subjects.spGetMentorSubjects(userid)
        .then((subjects) => {
            res.send(subjects[0]);
        }).catch((err) => {
            console.log(err);
        });
});

router.get('/:id?', (req, res) => {
    let id = req.params.id;
    if (id) {
        subjects.getOne(id)
            .then((subject) => {
                res.send(subject);
            }).catch((err) => {
                console.log(err);
            })
    } else {
        subjects.getAll()
            .then((subjects) => {
                res.send(subjects);
            }).catch((err) => {
                console.log(err);
            });
    }
});

export default router;