import { Router } from 'express';
import Table from '../table';

let router = Router();
let mentorSubjects = new Table('mentorSubjects');

router.get('/:userid', (req, res) => {
    let userid = req.params.userid;
    mentorSubjects.spMentorSubjects(userid)
        .then((mentorSubjects) => {
            res.send(mentorSubjects);
        }).catch((err) => {
            console.log(err);
        })
})

export default router;