import React from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['firebaseEmailUid']);
  const onClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    removeCookie('firebaseEmailUid');
    window.location.reload();
  };
  return (
    <ul>
      <li>
        <span onClick={onClick}>로그아웃</span>
      </li>
    </ul>
  );
}

export default Header;
