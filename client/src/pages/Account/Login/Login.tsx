import React, { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import { useLocation } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';

import Title from './Title/Title';
import LoginSection from './Section/LoginSection';
import LoginForm from './Form/LoginForm';
import InputItem from './InputItem/InputItem';
import JoinLink from './Link/JoinLink';
import LoginSubmit from './Submit/LoginSubmit';
import ErrorMsg from './ErrorMsg/ErrorMsg';

import { useAppDispatch } from '../../../store/store';
import { updateStatusMessage } from '../../../store/reducers/rootReducer';
import validateForm from '../../../utils/functions/validateForm';
import { SPOTIFY_AUTH_URL_CONFIG } from '../../../constants/constants';
import { checkUser } from '../../../API';

interface ILocation {
  state: {
    joinSuccessMsg: string;
  };
}

interface LoginAxiosResponse {
  firebaseUid: string;
}

const cookies = new Cookies();

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const { state } = useLocation() as ILocation;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (state) dispatch(updateStatusMessage(state.joinSuccessMsg));
  }, []);

  const handleLogin = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    const validateMessage = handleLoginValidate();
    if (validateMessage !== 'ok') return;
    try {
      const firebaseUid = await checkUser(email, password);
      cookies.set('firebaseUid', firebaseUid, {
        maxAge: 3600 * 7,
      });
      const finalUrl = combineSpotifyAuthUrl();
      window.location.href = finalUrl;
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMsg(error.response?.data.errorMsg);
      } else {
        console.log(error);
      }
    }
  };

  const handleLoginValidate = () => {
    const result = validateForm({ email, password });
    if (result !== 'ok') return setErrorMsg(result);
    return 'ok';
  };

  const combineSpotifyAuthUrl = () => {
    const baseUrl = 'https://accounts.spotify.com/authorize';
    const option = new URLSearchParams(SPOTIFY_AUTH_URL_CONFIG).toString();
    return `${baseUrl}?${option}`;
  };

  return (
    <LoginSection>
      <Title />
      <ErrorMsg text={errorMsg} />
      <LoginForm>
        <InputItem
          type="text"
          value={email}
          setState={setEmail}
          placeholder="아이디"
          icon={faUser}
        />
        <InputItem
          type="password"
          value={password}
          setState={setPassword}
          placeholder="비밀번호"
          icon={faLock}
        />
        <LoginSubmit onClick={handleLogin} />
      </LoginForm>
      <JoinLink />
    </LoginSection>
  );
}

export default Login;
