import axios from "axios";
// import { tr } from "date-fns/locale";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function useFetch(url, query = "") {
  const [data, setData] = useState([]);
  const [isLoding, setIsLoding] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`${url}?${query}`);
        setData(data);
      } catch (err) {
        setData([]);
        toast.error(err?.message);
      } finally {
        setIsLoding(false);
      }
    }
    fetchData();
  }, [query, url]);
  return { isLoding, data };
}
