import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { addFirebaseUidToken } from '../store/reducers/rootReducer';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';

const Title = styled.h1`
  @font-face {
    font-family: 'Rubic';
    src: url('./static/fonts/RubikMarkerHatch.ttf') format('truetype');
  }
  margin-bottom: 30px;
  font-family: 'Rubic' sans-serif;
  font-size: 46px;
  font-weight: 600;
  color: white;
`;

const ErrorMsg = styled.span`
  color: red;
  text-decoration: underline;
`;

const AccountForm = styled.form`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const InputTab = styled.div`
  position: relative;
  svg {
    width: 20px;
    height: 20px;
    position: absolute;
    left: 10px;
    top: 10px;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  padding-left: 40px;
  margin-bottom: 2px;
  background-color: #7fffd4;
  border: 1px solid #7fffd4;
  border-radius: 5px;
  font-size: 15px;
  &:focus,
  &:active {
    outline: none;
    border: 2px solid #adff2f;
  }
  &::placeholder {
    font-size: 15px;
    font-weight: 600;
  }
`;

const Submit = styled(Input)`
  padding: 0;
  background-color: #20b2aa;
  border: 1px solid #20b2aa;
  font-size: 17px;
  font-weight: 600;
  &:hover {
    cursor: pointer;
    outline: none;
    border: 2px solid #adff2f;
  }
`;

const LinkTab = styled.div`
  display: flex;
  flex-direction: row;
  span {
    color: white;
  }
`;

const AccountLink = styled(Link)`
  color: white;
  transition: color 0.25s ease-out;
  &:hover,
  &:focus {
    color: #7fffd4;
  }
`;

const SERVER_ENDPOINT = 'http://localhost:3001';

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    const validateMessage = handleLoginValidate();
    if (!(validateMessage === 'ok')) return;
    try {
      const response = await axios.post(`${SERVER_ENDPOINT}/users/login`, {
        email,
        password,
      });
      dispatch(addFirebaseUidToken(response.data.fuid));
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

  const handleLoginValidate = () => {
    if (!email) return setErrorMsg('이메일은 필수 입력 정보입니다');
    if (!password) return setErrorMsg('비밀번호는 필수 입력 정보입니다.');
    if (password.length <= 5 && password.length >= 15)
      return setErrorMsg('비밀번호는 6자 ~ 14자이여야 합니다.');
    const emailReg = new RegExp(/\w+@\w+.\w+/);
    if (!emailReg.exec(email))
      return setErrorMsg('이메일 형식(xxx@xxx.xxx)을 지켜야 합니다.');
    return 'ok';
  };

  return (
    <section>
      <Title>Mucketlist</Title>
      <ErrorMsg>{errorMsg}</ErrorMsg>
      <AccountForm>
        <InputTab>
          <Input
            type="text"
            value={email}
            placeholder="아이디"
            onChange={(e) => setEmail(e.target.value)}
          />
          <FontAwesomeIcon icon={faUser} />
        </InputTab>
        <InputTab>
          <Input
            type="password"
            value={password}
            placeholder="비밀번호"
            onChange={(e) => setPassword(e.target.value)}
          />
          <FontAwesomeIcon icon={faLock} />
        </InputTab>
        <Submit type="submit" value="로그인" onClick={handleLogin} />
      </AccountForm>
      <LinkTab>
        <span>계정이 없으신가요?</span>
        <AccountLink to="/join">회원가입</AccountLink>
      </LinkTab>
    </section>
  );
}

export default Login;
