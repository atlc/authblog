import * as express from 'express';
import { HashPassword } from '../../utils/security/passwords';
import { validate } from '../../utils/security/have-i-been-pwned';
import DB from '../../db';

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const dto = req.body;
        const { firstname, lastname, email, password, /*roles,*/ avatar } = dto;
        // Not destructuring 'roles' out since it doesn't exist on the frontend /yet/ but may at a later point if I choose to let it be editable there
        // const roles = dto.roles ? dto.roles : "[\"user\"]"
        const roles = "['user']";

        const isNewUser = await DB.Users.get.user_by_email(email);
        if (!!(isNewUser[0])) return res.status(403).send(`An account using the email address ${email} already exists.`);
        
        // validate function returns the number of matches if it's a bad password, otherwise if it's unique/unbreached it returns false
        const isBadPassword = !!validate(password);
        
        if (isBadPassword) {
            res.status(403).send(`Bad password! That has been found in ${isBadPassword} account breaches!`);
        }

        const hash = HashPassword(password);
        const newUser = await DB.Users.do.create(firstname, lastname, email, hash, roles, avatar);
        if (newUser.insertId) {
            res.status(201).json('User was created successfully!');
        } else {
            res.status(400).json('There was an unknown issue creating the user. Please check the server logs for additional details.');
        }
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
})

export default router;