import BaseService from './BaseService.js';
import { connection } from '../database.js';

const { queryAsync } = connection;

export default class GameService extends BaseService {
    constructor() {
        super();
        this.table = 'game';
        this.id = 'user_id';
        this.game_column = 'lines_98';
    }

    getGameById(id) {
        return super.getItemById(this.table, this.id, id);
    }

    insertNewGame(id, board) {
        const json = JSON.stringify(board);
        const sql = `INSERT game(user_id, lines_98) VALUES (${id}, ?)`;
        return queryAsync(sql, [json])
            .then(() => console.log('insert game '))
            .catch((error) => console.log('Error from insertNewGame:', error));
    }

    updateGame(id, board) {
        const data = JSON.stringify(board);
        return super.updateItem(
            this.table,
            this.game_column,
            this.id,
            id,
            data
        );
    }
}
