import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import validateForm from '../../utils/functions/validateForm';
import InputItem from './InputItem/InputItem';
import JoinSubmit from './Submit/JoinSubmit';
import LoginLink from './Link/LoginLink';
import Form from '../../components/atom/Form';
import JoinForm from './Form/JoinForm';
import ErrorMsg from './ErrorMsg/ErrorMsg';

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
    <section>
      <ErrorMsg text={errorMsg} />
      <JoinForm>
        <InputItem
          labelText="아이디"
          htmlFor="email"
          type="text"
          value={email}
          setState={setEmail}
          placeholder="아이디"
        />
        <InputItem
          labelText="비밀번호"
          htmlFor="password"
          type="text"
          value={password}
          setState={setPassword}
          placeholder="비밀번호"
        />
        <JoinSubmit value="회원가입" onClick={handleJoin} />
      </JoinForm>
      <LoginLink text="가입되어 있는 계정이 있으신가요?" linkText="로그인" />
    </section>
  );
}

export default Join;
