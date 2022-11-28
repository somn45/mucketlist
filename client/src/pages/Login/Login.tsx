import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';

import InputItem from './InputItem/InputItem';
import Title from './Title/Title';
import LoginSubmit from './Submit/LoginSubmit';
import JoinLink from './Link/JoinLink';
import validateForm from '../../utils/functions/validateForm';
import LoginForm from './Form/LoginForm';
import ErrorMsg from './ErrorMsg/ErrorMsg';
import styled from 'styled-components';
import StatusMessage from '../../components/StatusMessage';
import { useAppDispatch } from '../../store/store';
import {
  RootState,
  updateStatusMessage,
} from '../../store/reducers/rootReducer';
import { useSelector } from 'react-redux';

interface ILocation {
  state: {
    joinSuccessMsg: string;
  };
}

const AccountSection = styled.section`
  margin-top: 250px;
`;

const SERVER_ENDPOINT = 'http://localhost:3001';
const cookies = new Cookies();
const SPOTIFY_AUTH_URL_CONFIG = {
  response_type: 'code',
  client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID
    ? process.env.REACT_APP_SPOTIFY_CLIENT_ID
    : '',
  redirect_uri: 'http://localhost:3000',
  scope:
    'user-read-private user-read-email streaming user-read-playback-state, user-modify-playback-state',
  state: '1SMWKN29Nksmwogl49SWM238FM1879Smx',
};

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const { state } = useLocation() as ILocation;
  const statusMessage = useSelector((state: RootState) => state.statusMessage);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (state) dispatch(updateStatusMessage(state.joinSuccessMsg));
  }, []);

  const handleLogin = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    const validateMessage = handleLoginValidate();
    if (!(validateMessage === 'ok')) return;
    const response = await axios.post(`${SERVER_ENDPOINT}/users/login`, {
      email,
      password,
    });
    cookies.set('firebaseUid', response?.data.firebaseUid, {
      maxAge: 3600 * 7,
    });
    const finalUrl = combineSpotifyAuthUrl();
    window.location.href = finalUrl;
  };

  const handleLoginValidate = () => {
    const result = validateForm({ email, password }, 'login');
    if (result !== 'ok') return setErrorMsg(result);
    return 'ok';
  };

  const combineSpotifyAuthUrl = () => {
    const baseUrl = 'https://accounts.spotify.com/authorize';
    const option = new URLSearchParams(SPOTIFY_AUTH_URL_CONFIG).toString();
    return `${baseUrl}?${option}`;
  };

  return (
    <AccountSection>
      {statusMessage && <StatusMessage text={statusMessage} />}
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
    </AccountSection>
  );
}

export default Login;
