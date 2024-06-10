import { useEffect } from "react";

const [data, setData] = useState(null);
const [name, setName] = useState("");

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get("http://54.180.150.195/posts/lists");
      setData(response.data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
});
