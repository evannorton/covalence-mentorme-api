import { Router } from 'express';
import Table from '../table';

let router = Router();
let mentorSkills = new Table('mentorSkills');

router.get('/:userid', (req, res) => {
    let userid = req.params.userid;
    mentorSkills.spMentorSkills(userid)
        .then((mentorSkills) => {
            res.send(mentorSkills);
        }).catch((err) => {
            console.log(err);
        })
})