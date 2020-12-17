import { Query } from '../index';

const all = async () => Query('SELECT * from Tags');
const single = async (id: string) => Query('SELECT * from Tags where id = ?', [id]);
// const create_new = async (attr1: string, attr2: string) => Query('INSERT into Tags SET ?', { attr1, attr2 });
// const destroy = async (id: string) => Query('DELETE from Tags where id = ?', [id]);
// const update = async (id: string, content: string) => Query('UPDATE Tags SET ? where ?', [{content}, {id}]);

export default {
    get: {
        all,
        single
    }
//     do: {
//         create_new,
//         destroy,
//         update
//     }
}