// BaseService - update, getList, getByiD, delete

import {connection} from '../database.js';
const {queryAsync} = connection;

export default class BaseService {
    getItemById(table, column, id){
        const sql = `SELECT * FROM ${table} WHERE ${column}=${id}`;
        return queryAsync(sql)
            .then(result => result[0])
            .catch(error => console.log('BaseService:getItemById: ',error.message))
    }

    getItemList(table, column, email){
        const sql = `SELECT * FROM ${table} WHERE ${column}=?`
        return queryAsync(sql, [email])
            .then((result) => result)
            .catch((error) => console.log('BaseService:getItemList: ',error.message));
    }

    updateItem(table, column, column1, id, data){
        const sql = `UPDATE ${table} SET ${column}= ? WHERE ${column1}=${id}`;
        return queryAsync(sql, [data])
            .then(() => console.log('update'))
            .catch((error) => console.log(error));
    }
    // deleteItem(){

    // }
}
