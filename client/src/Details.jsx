import React, { useState } from "react";
import axios from "axios";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { url } from "./url";

function Details() {
  const { id } = useParams();
  const location = useLocation();
  const product = location.state?.product;
  const navigate = useNavigate();
  const [editedProduct, setEditedProduct] = useState({ ...product });
  const [successMessage, setSuccessMessage] = useState("");

  if (!product) {
    return <p>Hiba: A termék adatai nem érhetők el.</p>;
  }

  // Input mező változás kezelése
  const handleChange = (e) => {
    setEditedProduct({ ...editedProduct, [e.target.name]: e.target.value });
  };

  // Adatok mentése a szerverre
  const AdatokMentese = async () => {
    await axios.put(`${url}/update/${id}`, editedProduct);
    setSuccessMessage("A termék sikeresen mentésre került!");
  };

  //Termék törlése
  async function TermekTorlese() {
    await axios.delete(`${url}/delete/${id}`);
    navigate("/");
  }

  return (
    <div className="Container">
      <div>
        <h1>Módosítás</h1>
      </div>

      <div>
        <p className="szoveg">Termék neve:</p>
        <input
          type="text"
          className="product_name"
          name="NameOfProduct"
          value={editedProduct.NameOfProduct || ""}
          onChange={handleChange}
        />

        <p className="szoveg">Lejárati dátum:</p>
        <input
          type="date"
          className="expiry_date"
          name="ExpiryDate"
          value={editedProduct.ExpiryDate}
          onChange={handleChange}
        />
      </div>

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      <div className="button-container">
        <button className="Gomb Mentes" onClick={() => AdatokMentese()}>
          Mentés
        </button>
        <button className="Gomb Torles" onClick={() => TermekTorlese()}>
          Törlés
        </button>
      </div>
    </div>
  );
}

export default Details;
