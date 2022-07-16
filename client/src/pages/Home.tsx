import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import { connect } from 'react-redux';
import Genre from '../components/Genre';

interface HomeProps {
  selectedGenres: string[];
}

const cookies = new Cookies();

function Home({ selectedGenres }: HomeProps) {
  const navigate = useNavigate();
  const [genres, setGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getSpotifyGenres();
    if (!cookies.get('F_UID')) navigate('/login');
  }, []);
  const getSpotifyGenres = async () => {
    const accessToken = cookies.get('accessToken');
    const response = await axios.post(`http://localhost:3001/genres`, {
      accessToken: accessToken,
    });
    setGenres(response.data.genres);
    setLoading(false);
  };

  const onClick = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (selectedGenres.length === 0) {
      return;
    }
    console.log(selectedGenres);
    const genres = JSON.stringify(selectedGenres);
    const accessToken = cookies.get('accessToken');
    const response = await axios.get(
      `http://localhost:3001/search?accessToken=${accessToken}&genre=${genres}`
    );
    console.log(response);
  };
  return (
    <div>
      <h2>Home</h2>
      <form>
        {loading ? (
          <h2>장르 목록을 불러오는 중입니다.</h2>
        ) : (
          <>
            {genres.map((genre) => (
              <Genre key={genre} genre={genre} />
            ))}
          </>
        )}
        <input
          type="submit"
          value="Search your favorite genres"
          onClick={onClick}
        />
      </form>
    </div>
  );
}

function mapStateToProps(state: string[]) {
  return { selectedGenres: state };
}

export default connect(mapStateToProps)(Home);
