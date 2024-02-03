import express from 'express';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import pageRoutes from './routes/index.js';
import UserService from './services/UserService.js';

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, custom-token'
  );
  if (req.method === 'OPTIONS') {
    res.header(
      'Access-Control-Allow-Methods',
      'POST, PUT, PATCH, DELETE, GET'
    );
    return res.status(200).json({});
  }
  next();
});

const allow = ['api/login', 'api/register'];
app.use(async (req, res, next) => {
  const foundUrl = allow.find((el) =>
    new RegExp(`${el}\/?$`, 'gm').test(req.url)
  );
  if (foundUrl) {
    next();
    return;
  }

  const token = req.headers['custom-token'];
  if (!token) {
    res.status(401).json({
      message: 'Key missing',
    });
    return;
  }

  const data = jwt.verify(token, 'secret');
  if (!data) {
    res.status(404).json({
      message: 'Error2',
    });
    return;
  }
  const userService = new UserService();
  const userInfo = await userService.getUserById(data.id);
  if (!userInfo) {
    res.status(404).json({
      message: 'Please log in again',
    });
    return;
  }
  req.userInfo = userInfo;
  next();
});

app.use('/', pageRoutes);

app.listen(PORT, () => {
  console.log(`Server has been started in port ${PORT}...`);
});
