import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProductDetail() {
  const { prodId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/products/${prodId}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [prodId]);

  if (loading) return <p>Loading...</p>;
  if (error)   return <p>Error: {error}</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <button onClick={() => navigate(-1)}>← Back</button>

      <h2>{product.prodName}</h2>
      <p><strong>Brand:</strong> {product.brand}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Price:</strong> ${Number(product.price).toFixed(2)}</p>
      <p><strong>Quantity:</strong> {product.quantity}</p>
      <p><strong>Available:</strong> {product.available ? "Yes" : "No"}</p>
      <p><strong>Description:</strong> {product.desc ?? "N/A"}</p>
      <p><strong>Release Date:</strong> {new Date(product.releasedate).toLocaleDateString()}</p>
    </div>
  );
}