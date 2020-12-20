import * as express from 'express';
import { HashPassword } from '../../utils/security/passwords'
import DB from '../../db';

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const dto = req.body;
        const { firstname, lastname, email, password, roles } = dto;

        const isNewUser = await DB.Users.get.user_by_email(email);
        if (!!(isNewUser[0])) return res.status(403).send(`An account using the email address ${email} already exists.`);
        
        const hash = HashPassword(password);
        const newUser = await DB.Users.do.create(firstname, lastname, email, hash, roles ? roles : "[\"user\"]")
        if (newUser.insertId) {
            res.status(201).json('User was created successfully!');
        } else {
            res.status(400).json('There was an unknown issue creating the user. Please check the server logs for additional details.');
            console.log(newUser);
        }
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
})

export default router;