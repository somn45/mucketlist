import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { Cookies } from 'react-cookie';

const SERVER_ENDPOINT = 'http://localhost:3001';
const cookies = new Cookies();

function Login() {
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
      const response = await axios.post(`${SERVER_ENDPOINT}/login`, {
        email,
        password,
      });
      cookies.set('uid', response.data.uid, {
        maxAge: 3600,
      });
      window.location.reload();
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMsg(error.response?.data.errorMsg);
      }
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
