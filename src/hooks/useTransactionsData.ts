import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

export default function useTransactionData(url: string) {
  const [data, setData] = useState<[object] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(url);
        setData(response.data.data);
      } catch (e: AxiosError | unknown) {
        if (e instanceof AxiosError) setError(e.message);
        else setError("Request failed from server.");
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

  return { data, error, loading };
}
