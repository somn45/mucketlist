import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Join() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!(email && password && password.length >= 6)) return;
    console.log('join');
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
