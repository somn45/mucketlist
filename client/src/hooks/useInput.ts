import React, { useState } from 'react';

type useInputProps = [string, (e: React.ChangeEvent<HTMLInputElement>) => void];

const useInput = (initialValue: string): useInputProps => {
  const [input, setInput] = useState(initialValue);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return [input, onChange];
};

export default useInput;
