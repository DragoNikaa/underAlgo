import { useSearchParams } from "react-router-dom";

export function useSearchParamsActions() {
  const [searchParams, setSearchParams] = useSearchParams();

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

  const toggleArrayParam = (key: string, value: string) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      const values = params.getAll(key);

      if (values.includes(value)) {
        params.delete(key, value);
      } else {
        params.append(key, value);
      }

      return params;
    });
  };

  return { params: searchParams, setParam, removeParam, toggleArrayParam };
}
