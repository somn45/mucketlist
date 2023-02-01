import { useState } from 'react';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import validateForm from '../../utils/functions/validateForm';
import InputItem from './InputItem/InputItem';
import JoinSubmit from './Submit/JoinSubmit';
import LoginLink from './Link/LoginLink';
import JoinForm from './Form/JoinForm';
import ErrorMsg from './ErrorMsg/ErrorMsg';
import styled from 'styled-components';
import { Cookies } from 'react-cookie';
import requestAxios from '../../utils/functions/requestAxios';

interface JoinAxiosRequest {
  email: string;
  password: string;
}

const AccountSection = styled.section`
  width: 360px;
  margin-top: 250px;
`;

const SERVER_ENDPOINT = 'https://mucketlist-server.site';
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
      const requestAxiosParams = {
        method: 'post',
        url: `${SERVER_ENDPOINT}/users/join`,
        data: { email, password },
      };
      await requestAxios<JoinAxiosRequest, {}>(requestAxiosParams);
      cookies.set('newUserHandBook', email);
      navigate('/login', {
        state: {
          joinSuccessMsg: '회원가입 완료',
        },
      });
    } catch (error) {
      handleErrorJoin(error);
    }
  };

  const handleJoinValidate = () => {
    const result = validateForm({ email, password });
    if (result !== 'ok') return setErrorMsg(result);
    return 'ok';
  };

  const handleErrorJoin = (error: unknown) => {
    if (error instanceof AxiosError) {
      return setErrorMsg(error?.response?.data.errorMsg);
    } else {
      return console.error(error);
    }
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
