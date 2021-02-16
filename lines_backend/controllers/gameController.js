import GameService from '../services/GameService.js';

const gameService = new GameService();

async function addBoard(req, res) {
    if (req.body.id !== req.userInfo.id) {
        return res.status(404);
    }
    const board = req.body.board;
    const id = req.body.id;
    await gameService.updateGame(id, board);
    return res.json({
        message: 'Game saved!',
    });
}

export { addBoard };
