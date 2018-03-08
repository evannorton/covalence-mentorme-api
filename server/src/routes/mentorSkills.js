import { Router } from 'express';
import Table from '../table';

let router = Router();
let mentorSkills = new Table('mentorSkills');

router.post('/', (req, res) => {
    let userid = req.body.userid;
    let skillid = req.body.skillid;
    let mentorSkill = { userid, skillid }
    mentorSkills.insert(mentorSkill)
        .then(() => {
            res.sendStatus(200);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});

router.delete('/', (req, res) => {
    let userid = req.body.userid;
    let skillid = req.body.skillid;
    mentorSkills.spDeleteMentorSkill(userid, skillid)
        .then(() => {
            res.sendStatus(200);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});

export default router;