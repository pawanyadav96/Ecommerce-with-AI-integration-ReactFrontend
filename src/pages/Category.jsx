import { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import "./Category.css";

export default function Category() {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8080/products")
      .then((res) => { setProducts(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const categories = ["All", ...new Set(products.map((p) => p.category).filter(Boolean))];
  const filtered = selected === "All" ? products : products.filter((p) => p.category === selected);

  return (
    <div className="container">
      <div className="page-header">
        <h2>Category</h2>
        <p>Browse products by category</p>
      </div>

      <div className="category-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`cat-btn ${selected === cat ? "cat-active" : ""}`}
            onClick={() => setSelected(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading && <div className="status-msg">Loading...</div>}

      {!loading && (
        <div className="grid">
          {filtered.map((p) => (
            <div className="card" key={p.prodId}>
              <div className="card-img">
                {p.brand?.slice(0, 2).toUpperCase()}
                <span className={`badge ${p.available ? "badge-in" : "badge-out"}`}>
                  {p.available ? "In Stock" : "Out of Stock"}
                </span>
              </div>
              <div className="card-body">
                <div className="card-category">{p.category}</div>
                <div className="card-name">{p.prodName}</div>
                <div className="card-desc">{p.description}</div>
                <div className="card-footer">
                  <div>
                    <div className="card-price">${Number(p.price).toFixed(2)}</div>
                    <div className="card-qty">Qty: {p.quantity}</div>
                  </div>
                  <div className="card-brand">{p.brand}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="status-msg">No products in this category.</div>
      )}
    </div>
  );
}