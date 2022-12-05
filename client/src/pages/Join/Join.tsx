import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import validateForm from '../../utils/functions/validateForm';
import InputItem from './InputItem/InputItem';
import JoinSubmit from './Submit/JoinSubmit';
import LoginLink from './Link/LoginLink';
import JoinForm from './Form/JoinForm';
import ErrorMsg from './ErrorMsg/ErrorMsg';
import styled from 'styled-components';
import { Cookies } from 'react-cookie';

const AccountSection = styled.section`
  width: 360px;
  margin-top: 250px;
`;

const SERVER_ENDPOINT = 'http://localhost:3001';
const cookies = new Cookies();

function Join() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleJoin = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    const validateMessage = handleJoinValidate();
    if (!(validateMessage === 'ok')) return;
    try {
      await axios.post(`${SERVER_ENDPOINT}/users/join`, {
        email,
        password,
      });
      cookies.set('newUserHandBook', email);
      navigate('/login', {
        state: {
          joinSuccessMsg: '회원가입 완료',
        },
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        return setErrorMsg(error?.response?.data.errorMsg);
      } else {
        return console.log(error);
      }
    }
  };

  const handleJoinValidate = () => {
    const result = validateForm({ email, password }, 'login');
    if (result !== 'ok') return setErrorMsg(result);
    return 'ok';
  };
  return (
    <AccountSection>
      <ErrorMsg text={errorMsg} />
      <JoinForm>
        <InputItem
          htmlFor="email"
          type="text"
          value={email}
          setState={setEmail}
          labelText="아이디"
          placeholder="아이디"
        />
        <InputItem
          htmlFor="password"
          type="password"
          value={password}
          setState={setPassword}
          labelText="비밀번호"
          placeholder="비밀번호"
        />
        <JoinSubmit value="회원가입" onClick={handleJoin} />
      </JoinForm>
      <LoginLink />
    </AccountSection>
  );
}

export default Join;
