import { Router } from 'express';
import Table from '../table';

let multer = require('multer');
let upload = multer({ dest: 'images/' });

let router = Router();
let users = new Table('Users');

router.post('/', upload.single('image'), (req, res, next) => {

    let userid = req.body.userid;
    let uri = req.file.path;

    users.spUpdatePhoto(userid, uri)
        .then(() => {
            res.sendStatus(200);
        }).catch((err) => {
            res.sendStatus(500);
        })

});

export default router;