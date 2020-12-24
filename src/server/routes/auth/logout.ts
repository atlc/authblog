import * as express from 'express';
import db from '../../db';
const router = express.Router();

router.get('/:userid', async (req: any, res, next) => {
    try {
        const params = req.params;
        const { userid } = params;
        const delTokens = await db.Tokens.go.delete_from_user(userid);
        console.log(delTokens);
        res.status(200).json(delTokens);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
})

export default router;