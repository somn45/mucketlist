import express from 'express';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface UserFormBody {
  email: string;
  password: string;
}

const join = async (req: express.Request, res: express.Response) => {
  const { email, password }: UserFormBody = req.body;
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await setDoc(doc(db, 'firebaseUid', response.user.uid), {
      email: response.user.email,
    });
    return res.status(201).json({
      fuid: response.user.uid,
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
};

export default join;
