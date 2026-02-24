import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Search.css";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);
    axios.get(`http://localhost:8080/search/ai?query=${encodeURIComponent(query)}`)
      .then((res) => {
        setResults(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div className="search-page">
      <h2>AI Smart Search</h2>
      <p className="search-hint">Try: "cheap phones", "available electronics under 2000"</p>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Ask anything about products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p className="msg">🤖 AI is thinking...</p>}

      {!loading && searched && results.length === 0 && (
        <p className="msg">No matching products found.</p>
      )}

      <div className="grid">
        {results.map((p) => (
          <div className="card" key={p.prodId}
               onClick={() => navigate(`/products/${p.prodId}`)}
               style={{ cursor: "pointer" }}>
            <div className="card-top">
              <span className="category">{p.category}</span>
              <span className={p.available ? "in-stock" : "out-stock"}>
                {p.available ? "In Stock" : "Out of Stock"}
              </span>
            </div>
            <h3>{p.prodName}</h3>
            <p className="brand">{p.brand}</p>
            <div className="card-bottom">
              <span className="price">${Number(p.price).toFixed(2)}</span>
              <span className="qty">Qty: {p.quantity}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}