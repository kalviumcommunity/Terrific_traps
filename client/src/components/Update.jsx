import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Update() {
  const [ProductName, setProductName] = useState({});
  const [Reviews, setReviews] = useState();
  const [WorstRatings, setWorstRatings] = useState();
  const [BestRatings, setBestRatings] = useState();

  const navigate = useNavigate();

  useEffect(()=>{
    fetch("http://localhost:3000")
    .then((res)=>console.log(res))
    .then((jsonData)=>setProductName(jsonData))
    .catch((err)=>console.log(err))
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/user", {
        ProductName: ProductName,
        Reviews: Reviews,
        WorstRatings: WorstRatings,
        BestRatings: BestRatings,
      })
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="frm">
      <form onSubmit={(e) => handleSubmit(e)}>
        <h2>Add New Weird Things</h2>

        <div className="contain">
          <div className="product">
            <label htmlFor="">
              <strong>Product-Name:</strong>
            </label>
            <input
              type="text"
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>

          <div className="reviews">
            <label htmlFor="">
              <strong>Reviews:</strong>
            </label>
            <input type="text" onChange={(e) => setReviews(e.target.value)} />
          </div>

          <div className="worst">
            <label htmlFor="">
              <strong>Worst-Ratings:</strong>
            </label>
            <input
              type="text"
              onChange={(e) => setWorstRatings(e.target.value)}
            />
          </div>

          <div className="best">
            <label htmlFor="">
              <strong>Best-Ratings:</strong>
            </label>
            <input
              type="text"
              onChange={(e) => setBestRatings(e.target.value)}
            />
          </div>

          <div className="btn">
            <button className="btn" type="submit">
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Update;
