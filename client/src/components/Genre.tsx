import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Icon from './Icon';

import { CheckBoxWrap } from '../styles/modal/modalStyle';

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
    <CheckBoxWrap>
      <input
        type="checkbox"
        id={genre}
        name={genre}
        checked={checked}
        onChange={handleChange}
      />
      <label htmlFor={genre}>
        <Icon icon={faCheck} />
      </label>
      <span>{genre}</span>
    </CheckBoxWrap>
  );
}

export default Genre;
