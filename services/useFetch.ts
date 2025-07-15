import { useEffect, useState } from "react";

const useFetch = <T>(
  fetchFunction: () => Promise<T>,
  autoFetch: boolean = true
) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };
  const reset = () => {
    setData(null);
    setError(null);
    setIsLoading(false);
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []);

  return { data, error, isLoading, reset, refetch: fetchData };
};

export default useFetch;
