import * as passport from 'passport';
import * as JWTStrategy from 'passport-jwt';
import DB from '../db';

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// passport.use(new JWTStrategy.Strategy(async (token, done) => {
//     try {
//         let payload = await ValidToken(token);
//         console.log(payload)
//         let [user] = await DB.Users.get.user_by_id(payload.userid);
//         user ? done(null, user) : done(null, false);
//     } catch (e) {
//         done(e);
//     }
// }));