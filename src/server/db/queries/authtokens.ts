import { Query } from '../index'

const single_token = async (id: number, token: string) => Query('SELECT * FROM authtokens WHERE id = ? AND WHERE token = ?', [id, token]);
const insert = async (userid: number) => Query('INSERT INTO authtokens userid VALUES ?', [userid]);
const update = async (id: number, token: string) => Query('UPDATE authtokens SET token = ? WHERE id = ?', [token, id]);

export default {
    get: {
        single_token
    },
    go: {
        insert,
        update
    }
}