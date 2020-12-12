import * as mysql from 'mysql';
import config from '../config';

const pool = mysql.createPool(config.mysql); 

export const Query = <T = any>(query: any, values?: any) => {
    return new Promise<T>((resolve, reject) => {
        pool.query(query, values, (err, results) => {
            err ? reject(err) : resolve(results);
        });
    });
}

export default {}