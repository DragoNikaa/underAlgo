import { useSearchParams } from "react-router-dom";

export function useSearchParamsActions() {
  const [, setSearchParams] = useSearchParams();

  const setParam = (key: string, value: string) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set(key, value);
      return params;
    });
  };

  const removeParam = (key: string) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.delete(key);
      return params;
    });
  };

  return { setParam, removeParam };
}
