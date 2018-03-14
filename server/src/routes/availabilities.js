import { Router } from 'express';
import Table from '../table';

let router = Router();
let availabilities = new Table('Availability');

router.get('/:userid', (req, res) => {
    let userid = req.params.userid;
    availabilities.find({ userid })
        .then((availabilities) => {
            res.send(availabilities);
        })
        .catch((err) => {
            console.log(err);
        });
});

export default router;