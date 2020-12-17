import * as express from 'express';
import * as passport from 'passport';
import { CreateToken } from '../../utils/security/tokens';

const router = express.Router();

router.post('/', passport.authenticate('local'), async (req: any, res, next) => {
    try {
        const token = await CreateToken({ userid: req.user.id });
        
        if (!token) throw new Error('Token could not be created');
        
        res.status(201).json({
            token,
            roles: req.user.roles,
            userid: req.user.id
        });
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
})

export default router;