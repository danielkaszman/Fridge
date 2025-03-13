import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./App.css";
import { url } from "./url";

function Home() {
  const [products, setProducts] = useState();

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const all = await axios.get(`${url}/`);

    // Frissítjük a dátumokat a válaszban
    const updatedProducts = all.data.map((item) => {
      return {
        ...item,
        ExpiryDate: formatDate(item.ExpiryDate), // Dátum formázása
      };
    });

    setProducts(updatedProducts);
    console.log(updatedProducts);
  }

  // Dátum formázása
  function formatDate(date) {
    if (!date) return null;
    const formattedDate = new Date(date).toISOString().split("T")[0];
    return formattedDate;
  }

  // Ellenőrzi, hogy a dátum 1 héten belül van-e
  function isExpiringSoon(date) {
    if (!date) return false;
    const expiryDate = new Date(date);
    const today = new Date();
    const oneWeekFromNow = new Date(today.setDate(today.getDate() + 7)); // 1 hét múlva
    return expiryDate <= oneWeekFromNow && expiryDate >= new Date(); // 1 héten belül és még nem járt le
  }

  // Ellenőrzi, hogy a dátum lejárt-e
  function isExpired(date) {
    if (!date) return false;
    const expiryDate = new Date(date);
    const today = new Date();
    return expiryDate < today; // True, ha a dátum a múltban van
  }

  return (
    <div className="Container">
      <div>
        <h1>Termékek</h1>
      </div>

      <div>
        {products &&
          products.map((item, index) => (
            <Link
              to={`/details/${item._id}`}
              key={index}
              state={{ product: item }}
            >
              <div className="Item" key={index}>
                <h2>{item.NameOfProduct}</h2>
                <p
                  style={{
                    color: isExpired(item.ExpiryDate)
                      ? "rgb(180, 0, 0)"
                      : isExpiringSoon(item.ExpiryDate)
                      ? "rgb(222, 222, 0)"
                      : "black", // Piros, ha lejárt; sárga, ha 1 héten belül lejár
                  }}
                >
                  Lejárat: {formatDate(item.ExpiryDate)}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Home;
