import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addGenre, removeGenre } from '../store/reducers/rootReducer';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

interface GenreProps {
  genre: string;
}

const CheckBoxWrap = styled.div`
  padding-left: 20px;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  flex-direction: row;
  input[type='checkbox'] {
    display: none;
  }
  input[type='checkbox'] + label {
    width: 18px;
    height: 18px;
    margin-right: 5px;
    border: 2px solid black;
    cursor: pointer;
    svg {
      display: none;
    }
  }
  input[type='checkbox']:checked + label {
    background-color: #7fffd4;
    svg {
      display: block;
    }
  }
`;

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
        <FontAwesomeIcon icon={faCheck} />
      </label>
      {genre}
    </CheckBoxWrap>
  );
}

export default React.memo(Genre);
