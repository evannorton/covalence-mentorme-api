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

export default router;