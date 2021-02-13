import BaseService from './BaseService.js';
import { connection } from '../database.js';
const { queryAsync } = connection;

export default class UserService extends BaseService {
    constructor() {
        super();
        this.table = 'users';
        this.id = 'id';
        this.column = 'email';
    }

    getMatchingEmail(email) {
        return super.getItemList(this.table, this.column, email);
    }

    getUserById(id) {
        return super.getItemById(this.table, this.id, id);
    }

    getUserByEmail(email) {
        return super.getItemList(this.table, this.column, email);
    }

    insertUserInDB(name, email, password) {
        const sql = 'INSERT INTO users SET ?';
        return queryAsync(sql, { name, email, password })
            .then(() => console.log('user added'))
            .catch((error) => console.log(error));
    }
}
