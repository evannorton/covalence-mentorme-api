import { Router } from 'express';
import Table from "../table";
import { tokenMiddleware, isLoggedIn } from '../middleware/auth.mw';
import { generateHash } from "../utils/security";

let router = Router();
let users = new Table("Users");

router.get("/:id?", (req, res) => {
    let id = req.params.id;
    if (id) {
        users.getOne(id)
            .then((user) => {
                res.send(user);
            })
            .catch((err) => {
                console.log(err);
            })
    } else {
        users.getAll()
            .then((users) => {
                res.send(users);
            })
            .catch((err) => {
                console.log(err);
            })
    }
});

router.post("/", (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let usertype = req.body.usertype;
    users.getMe(email, usertype)
        .then((result) => {
            if (result[0].length > 0) {
                res.sendStatus(400);
            } else {
                generateHash(req.body.password)
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

export default router;