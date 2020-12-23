import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import DB from '../../db';
import config from '../../config';

export const CreateToken = async (payload: IPayload) => {
    let tokenid: any = await DB.Tokens.go.insert(payload.userid);
    payload.accesstokenid = tokenid.insertId;
    payload.unique = crypto.randomBytes(32).toString('hex');
    let token = await jwt.sign(payload, config.auth.secret, { expiresIn: config.auth.expires }); // Set token to expire after 2 weeks
    await DB.Tokens.go.update(payload.accesstokenid, token);
    return token;
};

export const ValidToken = async (token: string) => {
    let payload: IPayload = <IPayload>jwt.decode(token);
    let [accesstokenid] = await DB.Tokens.get.single_token(payload.accesstokenid, token);
    if(!accesstokenid) {
        throw new Error('Invalid token.')
    } else {
        return accesstokenid;
    }
}

// export const InvalidateSingleToken = async (token: string) => {

// }

// export const NuclearOption = async () => {
//     // Change config.auth.secret to invalidate ALL tokens, or
//     // DELETE FROM authtokens WHERE id IS NOT NULL;
// }



export interface IPayload {
    [key: string]: any,
    userid: number,
    unique?: string
}