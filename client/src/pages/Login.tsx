import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { Cookies } from 'react-cookie';

const SERVER_ENDPOINT = 'http://localhost:3001';
const cookies = new Cookies();

function Login() {
  console.log('login');
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const onClick = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!email) return setErrorMsg('이메일은 필수 입력 정보입니다');
    if (!password) return setErrorMsg('비밀번호는 필수 입력 정보입니다.');
    if (password.length <= 5 && password.length >= 15)
      return setErrorMsg('비밀번호는 6자 ~ 14자이여야 합니다.');
    const emailReg = new RegExp(/\w+@\w+.\w+/);
    if (!emailReg.exec(email))
      return setErrorMsg('이메일 형식(xxx@xxx.xxx)을 지켜야 합니다.');
    try {
      const WEEK = 24 * 7;
      const response = await axios.post(`${SERVER_ENDPOINT}/login`, {
        email,
        password,
      });
      cookies.set('F_UID', response.data.fuid, {
        maxAge: 3600 * WEEK,
      });
      const baseUrl = 'https://accounts.spotify.com/authorize';
      const urlConfig = {
        response_type: 'code',
        client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID
          ? process.env.REACT_APP_SPOTIFY_CLIENT_ID
          : '',
        redirect_uri: 'http://localhost:3000',
        scope: 'user-read-private user-read-email',
        state: '1SMWKN29Nksmwogl49SWM238FM1879Smx',
      };
      const option = new URLSearchParams(urlConfig).toString();
      const finalUrl = `${baseUrl}?${option}`;
      window.location.href = finalUrl;
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMsg(error.response?.data.errorMsg);
      } else console.log('error');
    }
  };

  return (
    <div>
      <form>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Login with Spotify" onClick={onClick} />
      </form>
      <span>{errorMsg}</span>
      <Link to="/join">Sign Up</Link>
    </div>
  );
}

export default Login;
