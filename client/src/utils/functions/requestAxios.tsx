import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

type requestGetOrDeleteType = <T = any, R = AxiosResponse<T, any>, D = any>(
  url: string,
  config?: AxiosRequestConfig<D> | undefined
) => Promise<R>;
type requestPostOrPutType = <T = any, R = AxiosResponse<T, any>, D = any>(
  url: string,
  data?: D | undefined,
  config?: AxiosRequestConfig<D> | undefined
) => Promise<R>;

export interface RequestAxiosParams<T> {
  method: string;
  url: string;
  data: T;
  config?: AxiosRequestConfig;
}

type axiosMethodResponse = {
  [key: string]: requestGetOrDeleteType | requestPostOrPutType;
};

const requestAxios = async <T extends {}, D extends {}>({
  method,
  url,
  data,
  config,
}: RequestAxiosParams<T>): Promise<D> => {
  const urlParams = new URLSearchParams(data).toString();
  const response =
    method === 'get' || method === 'delete'
      ? await axiosMethods[method](`${url}?${urlParams}`, config)
      : await axiosMethods[method](url, data, config);
  return response.data;
};

const axiosMethods: axiosMethodResponse = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default requestAxios;
