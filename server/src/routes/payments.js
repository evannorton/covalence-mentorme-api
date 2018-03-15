import { Router } from 'express';
import * as stripeService from '../utils/stripe';
import Table from '../table';

let router = Router();
let User = new Table('Users');

router.post('/', async (req, res) => {
    let studentid = req.body.studentid;
    let mentorid = req.body.mentorid;
    let amount = req.body.amount;

    try {
        let student = await User.getOne(studentid);
        let mentor = await User.getOne(mentorid);

        if (!student || !mentor) {
            res.status(400).json({ message: 'Invalid student or mentor' });

            return;
        }

        await stripeService.createCharge(amount, student.stripeid, mentor.stripeid);

        res.status(200).json({ message: 'success' });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

export default router;