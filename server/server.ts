import express from 'express';
import cors from 'cors';
import { auth } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

interface UserFormBody {
  email: string;
  password: string;
}

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/join', async (req: express.Request, res: express.Response) => {
  const { email, password }: UserFormBody = req.body;
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return res.json({
      uid: response.user.uid,
    });
  } catch (error) {
    console.log(error);
  }
});

app.post('/login', async (req: express.Request, res: express.Response) => {
  const { email, password }: UserFormBody = req.body;
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return res.json({
      uid: response.user.uid,
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => console.log(`Server connected in port ${PORT}`));
