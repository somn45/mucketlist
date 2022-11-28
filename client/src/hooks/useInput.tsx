import React, { useState } from 'react';

const useInput = (initialValue = null) => {
  const [value, setValue] = useState(initialValue);
  const setState = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name);
  };
  return [value, setState];
};

export default useInput;
