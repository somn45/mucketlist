import axios, { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

const useAxios = (uri: string, method: string, body?: Object) => {
  console.log(uri, method, body);
  const [data, setData] = useState<AxiosResponse>();
  useEffect(() => {
    console.log('Effect');
    try {
      if (method === 'get') {
        axios.get(uri).then((data) => {
          setData(data);
        });
      } else if (method === 'post') {
        axios
          .post(uri, {
            body,
          })
          .then((data) => {
            console.log(data);
            setData(data);
          });
      } else {
        axios
          .put(uri, {
            body,
          })
          .then((data) => setData(data));
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
    }
  }, [uri]);

  console.log('return');
  return data;
};

export default useAxios;
