import { Router } from 'express';
import Table from '../table';
import { tokenMiddleware, isLoggedIn } from '../middleware/auth.mw';
import { generateHash } from '../utils/security';

let router = Router();
let users = new Table('Users');

let multer = require('multer');
let upload = multer({ dest: 'images/' });

router.get('/me', tokenMiddleware, isLoggedIn, (req, res) => {
    delete req.user.hash;
    console.log(req.user);
    res.json(req.user);
});

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
            });
    }
});

router.post('/', (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let usertype = req.body.usertype;
    users.find({ email, usertype })
        .then((result) => {
            if (result[0]) {
                res.sendStatus(400);
            } else {
                generateHash(password)
                    .then((hash) => {
                        let user = {
                            name,
                            email,
                            hash,
                            usertype
                        };
                        users.insert(user)
                            .then((result) => {
                                res.send(result);
                            }).catch((err) => {
                                res.sendStatus(500);
                            });
                    });
            }
        }).catch((err) => {
            console.log(err);
        });

});

router.put('/images/:userid', upload.single('image'), (req, res, next) => {

    let userid = req.params.userid;
    let uri = req.file.path;

    users.spUpdatePhoto(userid, uri)
        .then(() => {
            res.sendStatus(200);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })

});

export default router;