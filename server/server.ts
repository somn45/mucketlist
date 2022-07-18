import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import router from './routes/router';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', router);

app.listen(PORT, () => console.log(`Server connected in port ${PORT}`));
