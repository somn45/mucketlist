import axios, { AxiosError } from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
        <input type="submit" value="Join with Spotify" onClick={handleJoin} />
      </form>
      <span>{errorMsg}</span>
      <Link to="/login">Sign In</Link>
    </div>
  );
}

export default Join;
