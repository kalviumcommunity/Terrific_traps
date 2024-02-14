import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Details.css";

function Details() {
  const [value, setValue] = useState([]);

  useEffect(() => {
    console.log("Fetching data...");
    fetch("http://localhost:3000/")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Data fetched successfully:", data);
        setValue(data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <>
      <div className="add">
        <h1>Home Page</h1>
        <h3>
          To add a new item 
          <Link to="/click">
            <b>Click Here</b>
          </Link>
        </h3>
        <button>
          <Link to = {`/update/${value}`}>Update</Link>
        </button>
      </div>
      <div className="Flex">
        {value.map((item, id) => (
          <div key={id} className="flex">
            <div className="container">
              <h2>{item["Product-Name"]}</h2>
              <div className="data">
                <p>{item.Reviews}</p>
                <p>{item["Worst-Ratings"]}</p>
                <p>{item["Best-Ratings"]}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Details;
