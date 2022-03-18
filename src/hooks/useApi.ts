import { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: 'https://quizapi.io'
})

export function useAPI<T = unknown>(url: string, options?: AxiosRequestConfig) {
    const [response, setResponse] = useState<T | null>(null);
    const [isFetching, setIsFetching] = useState(true);
    const [Error, setError] = useState<Error | null>(null);

    useEffect(() => {
        api.get(url, options).then(response => {
          setResponse(response.data);
        })
        .catch(err => {
            setError(err);
        })
        .finally(() => {
            setIsFetching(false);
        })
      }, [])

      return { response, Error,isFetching };
}