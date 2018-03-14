import { Router } from 'express';
import Table from '../table';

let router = Router();
let skills = new Table('Skills');

router.get('/names/:name', (req, res) => {
    let name = req.params.name;
    skills.find({ name })
        .then((skills) => {
            res.send(skills[0]);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});

router.get('/:userid', (req, res) => {
    let userid = req.params.userid;
    skills.spGetMentorSkills(userid)
        .then((skills) => {
            res.send(skills[0]);
        }).catch((err) => {
            console.log(err);
        });
});

router.post('/', (req, res) => {
    let name = req.body.name;
    skills.insert({ name })
        .then((id) => {
            res.send(id);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(400);
        });
});

export default router;