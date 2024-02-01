import React from 'react'
import data from "./Data.json"
import './Details.css'

function Details() {
  return (
    <div>
      {data.map((item,id)=>{
        return (
          <div key={"S.No"}>
            <h1>{item['Product-Name']}</h1>
            <h1>{item.Reviews}</h1>
            <h1>{item['Worst-Ratings']}</h1>
            <h1>{item['Best-Ratings']}</h1>
          </div>
        )
      })}
    </div>
  )
}

export default Details
