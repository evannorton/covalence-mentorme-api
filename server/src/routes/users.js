import { Router } from 'express';
import Table from '../table';
import { tokenMiddleware, isLoggedIn } from '../middleware/auth.mw';
import { generateHash } from '../utils/security';
import * as stripeService from '../utils/stripe';

import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import env from '../config';

let router = Router();
let users = new Table('Users');

console.log(env.AWS_ACCESS_KEY_ID);

AWS.config.update({
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    region: 'us-east-2'
});

let s3 = new AWS.S3();

let upload = multer({
    storage: multerS3({
        s3,
        bucket: env.S3_BUCKET_NAME,
        metadata: function (req, file, cb) {
            cb(null, { fildName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now() + '.jpg')
        }
    })
});

router.get('/me', tokenMiddleware, isLoggedIn, (req, res) => {
    delete req.user.hash;
    console.log(req.user);
    res.json(req.user);
});

router.get('/charges', tokenMiddleware, isLoggedIn, async (req, res) => {
    console.log(req.user);
    console.log(req.user.stripeid);
    try {
        let user = await users.getOne(req.user.id);
        let transfers = await stripeService.createReceipt(req.user.stripeid);
        console.log(transfers);
        res.json(transfers);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

})

router.get('/:id?', (req, res) => {
    let id = req.params.id;
    if (id) {
        users.getOne(id)
            .then((user) => {
                delete user.hash;
                res.send(user);
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(500);
            });
    } else {
        users.getAll()
            .then((users) => {
                for (let i = 0; i < users.length; i++) {
                    delete users[i].hash;
                }
                res.send(users);
            })
            .catch((err) => {
                console.log(err);

                res.sendStatus(500);
            });
    }
});

router.post('/', async (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let usertype = req.body.usertype;
    try {
        let result = await users.find({ email, usertype });

        if (result[0]) {
            res.sendStatus(400);

            return;
        }

        let hash = await generateHash(password);
        let user = {
            name,
            email,
            hash,
            usertype
        };

        let stripeAccount;

        if (usertype === 'Mentor') {
            stripeAccount = await stripeService.createAccount(email);
        } else {
            stripeAccount = await stripeService.createCustomer(email);
        }

        user.stripeid = stripeAccount.id;

        await users.insert(user);

        res.sendStatus(200);

    } catch (err) {
        console.log(err);

        res.sendStatus(500);
    }
});

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let row = req.body;

    users.update(id, row)
        .then(() => {
            res.sendStatus(200);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});

router.put('/images/:userid', upload.single('image'), (req, res, next) => {
    let id = req.params.userid;
    let uri = req.file.location;
    console.log(uri);

    users.update(id, { image: uri })
        .then(() => {
            res.sendStatus(200);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });

});

export default router;