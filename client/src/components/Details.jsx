import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Details() {
  const [value, setValue] = useState([]);
  const [userData, setuserData] = useState([]);

  useEffect(() => {
    const getCookie = (name) => {
      const cookieArray = document.cookie.split("; ");
      const cookie = cookieArray.find((row) => row.startsWith(name + "="));
      return cookie ? cookie.split("=")[1] : null;
    };
    const name = getCookie("name");
    const email = getCookie("email");
    const username = getCookie("username");

    console.log("User Data:", { name, email, username });

    setuserData({ name, email, username });
  }, []);

  useEffect(() => {
    async function getApi() {
      try {
        const res = await axios.get("http://localhost:3000/");
        console.log(res.data);
        setValue(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getApi();
  }, []);

  const clearCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  const handleLogout = (e) => {
    clearCookie("name");
    clearCookie("email");
    clearCookie("password");
    console.log("Updated Cookies:", document.cookie);
  };

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
        <nav>
          {userData.name && <p>Name: {userData.name}</p>}
          {userData.email && <p>Email: {userData.email}</p>}
          {userData.password && <p>Password: {userData.password}</p>}
          <Link to="/login">
            <button onClick={handleLogout} className="logout">
              Logout
            </button>
          </Link>
        </nav>

      <div className="add">
        <h1>Home Page</h1>
        <h3>
          To add a new item</h3>
          <button className="click"><Link to="/click">
            <b>Click Here</b>
          </Link></button>
        <button className="update">
          <Link to={`/update/${value}`}>Update</Link>
        </button>
      </div>
      {console.log(value)}
      <div className="Flex">
        {value.map((item, id) => (
          <div key={id} className="flex">
            <div className="container">
              <h2>{item["Product-Name"] || item["ProductName"]}</h2>
              <div className="data">
                <p>{item.Reviews}</p>
                <p>{item["WorstRatings"] || item["Worst-Ratings"]}</p>
                <p>{item["BestRatings"] || item["Best-Ratings"]}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Details;
