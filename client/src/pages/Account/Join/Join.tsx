import { useState } from 'react';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';

import JoinSection from './Section/JoinSection';
import JoinForm from './Form/JoinForm';
import InputItem from './InputItem/InputItem';
import JoinSubmit from './Submit/JoinSubmit';
import LoginLink from './Link/LoginLink';
import ErrorMsg from './ErrorMsg/ErrorMsg';

import validateForm from '../../../utils/functions/validateForm';
import { addUser } from '../../../API';

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
      await addUser(email, password);
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
    return result === 'ok' ? 'ok' : setErrorMsg(result);
  };

  const handleErrorJoin = (error: unknown) => {
    if (error instanceof AxiosError) {
      return setErrorMsg(error?.response?.data.errorMsg);
    } else {
      return console.error(error);
    }
  };
  return (
    <JoinSection>
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
    </JoinSection>
  );
}

export default Join;
