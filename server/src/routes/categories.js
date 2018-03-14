import { Router } from 'express';
import Table from '../table';

let router = Router();
let categories = new Table('Categories');

router.get('/', (req, res) => {
    categories.getAll()
        .then((categories) => {
            res.send(categories);
        })
        .catch((err) => {
            console.log(err);
        });
});

export default router;