import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Details() {
  const [value, setValue] = useState([]);
  const [userData, setUserData] = useState({});
  const [input, setInput] = useState('All');

  useEffect(() => {
    // Fetch user data from cookies
    const getCookie = (name) => {
      const cookieArray = document.cookie.split("; ");
      const cookie = cookieArray.find((row) => row.startsWith(name + "="));
      return cookie ? cookie.split("=")[1] : null;
    };
    const name = getCookie("name");
    const email = getCookie("email");
    const username = getCookie("username");

    console.log("User Data:", { name, email, username });

    setUserData({ name, email, username });
  }, []);

  useEffect(() => {
    // Fetch data from API
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

  const dropDownItems = (e) => {
    setInput(e.target.value)
  };

  // Filter items based on dropdown selection
  const filteredItems = input === 'All' ? value : value.filter((item) => item.location === input);

  return (
    <>
      <nav>
        {userData.name && <p>Name: {userData.name}</p>}
        {userData.email && <p>Email: {userData.email}</p>}
        {userData.username && <p>Username: {userData.username}</p>}
        
      </nav>
      
     <div className="btn">
     <Link to="/login">
          <button onClick={handleLogout} className="logout">
            Logout
          </button>
        </Link>
      <select value={input} onChange={dropDownItems} className="drop">
        <option value="All">All</option>
        <option value="Funny">Funny</option>
        <option value="Weird">Weird</option>
        <option value="Disgusting">Disgusting</option>
        <option value="Unique">Unique</option>
      </select>
     </div>

      <div className="add">
        <h1>Home Page</h1>
        <h3>To add a new item</h3>
        <button className="click">
          <Link to="/click">
            <b>Click Here</b>
          </Link>
        </button>
        <button className="update">
          {/* Pass appropriate item ID to the update page */}
          <Link to={`/update/${value[0]?.id}`}>Update</Link>
        </button>
      </div>

      

      <div className="Flex">
        {filteredItems.map((item, id) => (
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
