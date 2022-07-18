import express from 'express';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

interface UserFormBody {
  email: string;
  password: string;
}

const login = async (req: express.Request, res: express.Response) => {
  const { email, password }: UserFormBody = req.body;
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return res.status(200).json({
      fuid: response.user.uid,
    });
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.log(error);
      if (error.code === 'auth/user-not-found') {
        return res.status(400).json({
          errorMsg: '가입되어 있는 이메일이 아닙니다',
        });
      }
      if (error.code === 'auth/wrong-password') {
        return res.status(400).json({
          errorMsg: '이메일/비밀번호가 일치하지 않습니다.',
        });
      }
    } else console.log(error);
  }
};

export default login;
