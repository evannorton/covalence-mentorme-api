import { Router } from 'express';
import Table from "../table";
import { tokenMiddleware, isLoggedIn } from '../middleware/auth.mw';
import { generateHash } from "../utils/security";

let router = Router();
let users = new Table("Users");

router.get("/id?", (req, res) => {
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
    generateHash(req.body.password)
        .then((hash) => {
            let user = {
                email: req.body.email,
                hash
            };
            users.insert(user)
                .then((result) => {
                    res.send(result);
                }).catch((err) => {
                    res.sendStatus(500);
                })
        }).catch((err) => {
            console.log(err);
        })
});

export default router;