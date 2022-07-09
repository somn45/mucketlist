import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import Genre from '../components/Genre';

const cookies = new Cookies();

function Home() {
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    getSpotifyGenres();
    if (!cookies.get('F_UID')) navigate('/login');
  }, []);
  console.log(genres);
  const getSpotifyGenres = async () => {
    const accessToken = cookies.get('accessToken');
    const response = await axios.post(`http://localhost:3001/genres`, {
      accessToken: accessToken,
    });
    setGenres(response.data.genres);
  };
  return (
    <div>
      <h2>Home</h2>
      <form>
        <div>
          {genres.map((genre) => (
            <Genre key={genre} genre={genre} />
          ))}
        </div>
      </form>
    </div>
  );
}

export default Home;
