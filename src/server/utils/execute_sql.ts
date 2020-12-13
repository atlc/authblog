import { Query } from '../db'
const fs = require('fs');
const path = require('path');


const rawSql = fs.readFileSync(path.join(__dirname, './create_db.sql'), (err: Error) => err ? console.log(err) : '');
const sqlString = rawSql.toString();

const generator = () => {
    Query(sqlString)
    .then(resolve => console.log(resolve), reject => { 
        console.log(reject);
        throw Error(reject) 
    })
    .catch(error => console.log(error));
}

generator();
