import express from 'express';
import cors from 'cors';
import { auth, db } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';

interface UserFormBody {
  email: string;
  password: string;
}

interface Error {
  code: string;
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
    await setDoc(doc(db, 'email', email), {
      uid: response.user.uid,
      password,
    });
    return res.status(201).json({
      uid: response.user.uid,
    });
  } catch (error) {
    if (error instanceof FirebaseError) {
      if (error.code === 'auth/email-already-in-use') {
        return res.status(400).json({
          errorMsg: '이미 가입된 회원의 이메일입니다.',
        });
      }
    } else console.log(error);
  }
});

app.post('/login', async (req: express.Request, res: express.Response) => {
  const { email, password }: UserFormBody = req.body;
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return res.status(200).json({
      uid: response.user.uid,
    });
  } catch (error) {
    if (error instanceof FirebaseError) {
      if (error.code === 'auth/wrong-password') {
        return res.status(400).json({
          errorMsg: '이메일/비밀번호가 일치하지 않습니다.',
        });
      }
    } else console.log(error);
  }
});

app.listen(PORT, () => console.log(`Server connected in port ${PORT}`));
