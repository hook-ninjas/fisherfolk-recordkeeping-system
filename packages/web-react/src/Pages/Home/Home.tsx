import React, { useState, useEffect } from "react";
import "./Home.css";

const Home = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((res) => {
        if (res.ok) {
          console.log(res);
          return res.text();
        }
        throw res;
      })
      .then((data) => {
        setData(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return <div>{data}</div>;
};

export default Home;
