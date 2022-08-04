import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRouters';
import trackRouter from './routes/trackRouters';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/users', userRouter);
app.use('/tracks', trackRouter);

app.listen(PORT, () => console.log(`Server connected in port ${PORT}`));
