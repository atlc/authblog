import { Query } from '../index'

const all = async () => Query('SELECT * FROM Users');
const user_by_id = async (id: number) => Query('SELECT * FROM Users WHERE id = ?', [id]);
const user_by_email = async (email: string) => Query('SELECT * FROM Users WHERE email = ?', [email]);
const create = async (firstname: string, lastname: string, email: string, password: string, roles: string, avatar?: string) => Query('INSERT INTO Users SET ?', [{firstname, lastname, email, password, roles, avatar}])


export default {
    get: {
        all,
        user_by_id,
        user_by_email
    },
    do: {
        create
    }
}