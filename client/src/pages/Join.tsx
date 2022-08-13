import axios, { AxiosError } from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

const Label = styled.label`
  height: 20px;
  margin: 10px 0;
  color: white;
  font-weight: 600;
  &:first-child {
    margin-top: 0;
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

const JoinInput = styled(Input)`
  padding: 0 10px;
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

function Join() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const handleJoin = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    const validateMessage = handleJoinValidate();
    if (!(validateMessage === 'ok')) return;
    try {
      const response = await axios.post(`${SERVER_ENDPOINT}/users/join`, {
        email,
        password,
      });
      console.log(response);
    } catch (error) {
      if (error instanceof AxiosError) {
        return setErrorMsg(error?.response?.data.errorMsg);
      } else {
        console.log('string');
      }
    }
  };

  const handleJoinValidate = () => {
    if (!email) return setErrorMsg('이메일은 필수 입력 정보입니다');
    if (!password) return setErrorMsg('비밀번호는 필수 입력 정보입니다.');
    console.log(password.length);
    if (password.length < 6 || password.length > 14)
      return setErrorMsg('비밀번호는 6자 ~ 14자이여야 합니다.');
    const emailReg = new RegExp(/\w+@\w+.\w+/);
    if (!emailReg.exec(email))
      return setErrorMsg('이메일 형식(xxx@xxx.xxx)을 지켜야 합니다.');
    return 'ok';
  };

  return (
    <section>
      <ErrorMsg>{errorMsg}</ErrorMsg>
      <AccountForm>
        <Label htmlFor="email">아이디</Label>
        <JoinInput
          type="text"
          value={email}
          placeholder="아이디"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Label htmlFor="password">비밀번호</Label>
        <JoinInput
          type="password"
          value={password}
          placeholder="비밀번호"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Submit type="submit" value="계정 생성" onClick={handleJoin} />
      </AccountForm>
      <LinkTab>
        <span>가입되어 있는 계정이 있으신가요?</span>
        <AccountLink to="/login">로그인</AccountLink>
      </LinkTab>
    </section>
  );
}

export default Join;
