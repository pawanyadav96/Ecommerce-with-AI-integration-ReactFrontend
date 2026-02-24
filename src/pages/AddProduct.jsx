import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddProduct.css";

export default function AddProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    prodName: "", price: "", desc: "",
    category: "", brand: "", quantity: "",
    available: true, releasedate: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/products", form)
      .then(() => {
        alert("Product added!");
        navigate("/");
      })
      .catch(() => alert("Failed to add product."));
  };

  return (
    <div className="add-product-page">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <h2>Add New Product</h2>

      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name</label>
          <input name="prodName" value={form.prodName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input name="price" type="number" value={form.price} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Category</label>
          <input name="category" value={form.category} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Brand</label>
          <input name="brand" value={form.brand} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Quantity</label>
          <input name="quantity" type="number" value={form.quantity} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Release Date</label>
          <input name="releasedate" type="date" value={form.releasedate} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea name="desc" value={form.desc} onChange={handleChange} />
        </div>
        <div className="form-group checkbox">
          <label>
            <input name="available" type="checkbox" checked={form.available} onChange={handleChange} />
            Available
          </label>
        </div>

        <button type="submit" className="submit-btn">Add Product</button>
      </form>
    </div>
  );
}