import express from 'express';
import 'dotenv/config'

const app = express();
const PORT = process.env.NODE_PORT;

app.listen(PORT, () => {
  console.log(`Server has been started in port ${PORT}...`);
});
