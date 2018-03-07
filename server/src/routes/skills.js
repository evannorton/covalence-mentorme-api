import { Router } from 'express';
import Table from '../table';

let router = Router();
let skills = new Table('Skills');

router.get('/:userid', (req, res) => {
    let userid = req.params.userid;
    skills.spGetMentorSkills(userid)
        .then((skills) => {
            res.send(skills);
        }).catch((err) => {
            console.log(err);
        });
});

export default router;