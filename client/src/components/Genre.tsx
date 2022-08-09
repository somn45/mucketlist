import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addGenre, removeGenre } from '../store/reducers/rootReducer';

interface GenreProps {
  genre: string;
}

function Genre({ genre }: GenreProps) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked((prevState) => !prevState);
    const currentElement = e.target;
    currentElement.checked
      ? dispatch(addGenre(currentElement.name))
      : dispatch(removeGenre(currentElement.name));
  };
  return (
    <>
      <input
        type="checkbox"
        name={genre}
        checked={checked}
        onChange={handleChange}
      />
      {genre}
    </>
  );
}

export default React.memo(Genre);
