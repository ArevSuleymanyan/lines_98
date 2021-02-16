import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserService from '../services/UserService.js';
import GameService from '../services/GameService.js';
import LinesLogic from '../models/LinesLogic.js';
import * as EmailValidator from 'email-validator';

const userService = new UserService();
const gameService = new GameService();
const linesLogic = new LinesLogic();

async function login(req, res) {
    const { email, password } = req.body || {};
    if (!email || !password) {
        return res.status(400).json({
            message: 'Please provide an email and password',
        });
    }
    const result = await userService.getUserByEmail(email);
    if (
        !result.length ||
        !(await bcrypt.compare(password, result[0].password))
    ) {
        return res.status(401).json({ message: 'Email or Password incorrect' });
    }

    const id = result[0].id;
    const token = jwt.sign({ id }, 'secret', {
        expiresIn: '90d',
    });
    return res.status(200).json({ data: result[0], token });
}

async function register(req, res) {
    const { name, email, password, confirmPassword } = req.body || {};

    if (!name || !email || !password || !confirmPassword) {
        return res.json({ message: 'Fill in all the fields' });
    }

    if (password !== confirmPassword) {
        return res.json({ message: 'Passwords do not match' });
    }

    let reg = /^[a-zA-Z]+[a-zA-Z0-9._-]{2,}/;
    if (!reg.test(name)) {
        return res.json({
            message: `Length is more than 3 characters.
                Тhe name must start with a letter.
                a-z,A-Z,0-9,-_.
                `,
        });
    }

    if (!EmailValidator.validate(email)) {
        return res.json({ message: 'Invalid email' });
    }

    const result = await userService.getMatchingEmail(email);
    if (result.length > 0) {
        return res.json({ message: 'That email is already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    await userService.insertUserInDB(name, email, hashedPassword);
    const user = await userService.getUserByEmail(email);
    const id = user[0].id;
    const board = linesLogic.board;
    gameService.insertNewGame(id, board);
    res.json({ message: 'User registered' });
}

export { login, register };
