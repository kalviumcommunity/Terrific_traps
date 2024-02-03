import React, { useEffect, useState } from 'react';
import './Details.css'

function Details() {
  const [value, setValue] = useState([]);

  useEffect(() => {
    console.log('Fetching data...');
    fetch('http://localhost:3000/')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        console.log('Data fetched successfully:', data);
        setValue(data);
      })
      .catch((err) => console.error('Fetch error:', err));
  }, []);
  
  

  return (
    <div className='Flex'>
      {value.map((item, id) => {
        return (
         <div className='flex'> 
            <div key={id}className='container'>
            <h2>{item['Product-Name']}</h2>
            <div className="data">
            <p>{item.Reviews}</p>
            <p>{item['Worst-Ratings']}</p>
            <p>{item['Best-Ratings']}</p>
            </div>
          </div>
         </div>
        );
      })}
    </div>
  );
}

export default Details;
