import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Cookies } from 'react-cookie';

const SERVER_ENDPOINT = 'http://localhost:3001';
const cookies = new Cookies();

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onClick = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!(email && password && password.length >= 6)) return;
    const emailReg = new RegExp(/\w+@\w+.\w+/);
    if (!emailReg.exec(email)) return;
    const response = await axios.post(`${SERVER_ENDPOINT}/login`, {
      email,
      password,
    });
    console.log(response);
    cookies.set('uid', response.data.uid, {
      maxAge: 3600,
    });
    window.location.reload();
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
      <Link to="/join">Sign Up</Link>
    </div>
  );
}

export default Login;
