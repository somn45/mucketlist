import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!cookies.get('F_UID')) navigate('/login');
  }, []);
  return <div>Home</div>;
}

export default Home;
