import React, { useEffect, useState } from 'react';
import axios from "axios";
import './App.css';

function App() {
  const [products, setProducts] = useState(); 
  
  useEffect(() => {
    getData();
  }, []); 

  async function getData() {
    const all = await axios.get("http://localhost:3001/");
    setProducts(all.data);
    console.log(all.data);
  }

  return (
    <div className="Container">
      <div>
        <h1>Termékek</h1>
      </div>
      
      <div>
        {products && products.map((item) => (
            <div className='Item' key={item._id}>
              <h2>{item.NameOfProduct}</h2>
              <p>Lejárat: {item.ExpiryDate}</p>
              <p>Vonalkód: {item.Barcode}</p>
            </div>
        ))}
      </div>
    </div>
  );
}

export default App;
