import { Router } from 'express';
import { addBoard } from '../../controllers/gameController.js';
import { login, register } from '../../controllers/authController.js'
import GameService from '../../services/GameService.js';


const router = new Router();
const gameService = new GameService();

router.post('/login', login);
router.post('/register', register);
router.post('/board', addBoard)

router.get('/user', (req, res) => {
    res.json(req.userInfo);
});

router.get('/game', async (req, res) => {
    let id = req.userInfo.id;
    let game = await gameService.getGameById(id);
    res.json(game.lines_98);
});



export default router;
