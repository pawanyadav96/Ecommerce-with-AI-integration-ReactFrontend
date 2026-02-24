import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import "./Home.css";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = (prodId) => {
    if (!window.confirm("Delete this product?")) return;
    axios.delete(`http://localhost:8080/products/${prodId}`)
      .then(() => {
        setProducts(products.filter((p) => p.prodId !== prodId));
      })
      .catch(() => alert("Failed to delete product."));
  };

  if (loading) return <p className="msg">Loading...</p>;
  if (error)   return <p className="msg error">Error: {error}</p>;

  return (
    <div className="home">
      <h2>All Products ({products.length})</h2>
       <button className="add-btn" onClick={() => navigate("/add-product")}>
    + Add Product
  </button>

      <div className="grid">
        {products.map((p) => (
          <div className="card" key={p.prodId}
            onClick={() => navigate(`/products/${p.prodId}`)}  // ← add this
               style={{ cursor: "pointer" }}>    
            <div className="card-top">
              <span className="category">{p.category}</span>
              <span className={p.available ? "in-stock" : "out-stock"}>
                {p.available ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            <h3>{p.prodName}</h3>
            <p className="brand">{p.brand}</p>
            <p className="desc">{p.description}</p>

            <div className="card-bottom">
              <span className="price">${Number(p.price).toFixed(2)}</span>
              <span className="qty">Qty: {p.quantity}</span>
              {/* <span className="qty">Qty: {p.releasedate}</span> */}
            </div>
            <div className="card-bottom">
              
             <span>Release Date: {new Date(p.releasedate).toLocaleDateString('en-US', { 
  year: 'numeric', 
  month: 'short', 
  day: '2-digit' 
})}</span>
            </div>

 <button className="delete-btn" onClick={(e) => {
              e.stopPropagation();          // ← add this so delete doesn't trigger card click
              handleDelete(p.prodId);
            }}>              🗑 Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}