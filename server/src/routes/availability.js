import { Router } from 'express';
import Table from '../table';

let router = Router();
let availability = new Table('Availability');

router.get('/:userid', (req, res) => {
    let userid = req.params.userid;
    availability.find({ userid })
        .then((availabilities) => {
            res.send(availabilities);
        })
        .catch((err) => {
            console.log(err);
        });
});

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let row = req.body;
    availability.update(id, req.body)
        .then(() => {
            res.sendStatus(200);
        }).catch((err) => {
            console.log(err);
        });
});
router.post('/', (req, res) => {
    let userid = req.body.userid;
    let date = req.body.date;
    let starttime = req.body.starttime;
    let endtime = req.body.endtime;
    availability.insert({
        userid,
        date,
        starttime,
        endtime
    })
        .then((id) => {
            res.send(id);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(400);
        });
});

export default router;