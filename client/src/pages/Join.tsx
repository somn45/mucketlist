import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SERVER_ENDPOINT = 'http://localhost:3001';

function Join() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onClick = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!(email && password && password.length >= 6)) return;
    const emailReg = new RegExp(/\w+@\w+.\w+/);
    if (!emailReg.exec(email)) return;
    const response = await axios.post(`${SERVER_ENDPOINT}/join`, {
      email,
      password,
    });
    console.log(response);
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
        <input type="submit" value="Join with Spotify" onClick={onClick} />
      </form>
      <Link to="/login">Sign In</Link>
    </div>
  );
}

export default Join;
