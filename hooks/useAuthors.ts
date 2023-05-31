import useSWR from 'swr';
import { fetcher } from '../lib/fetcher';

const useAuthors = () => {
  const { data, error, isLoading } = useSWR('/api/paint', fetcher);

  return {
    data,
    isLoading,
    isError: error,
  };
};

export default useAuthors;
