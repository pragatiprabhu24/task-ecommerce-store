import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  const dispatch = useDispatch();

  if (!product) return <p>Loading...</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-96 object-cover"
      />
      <h1 className="text-2xl font-bold mt-4">{product.title}</h1>
      <p className="text-gray-600 mt-2">₹{product.price}</p>
      <p className="mt-4">{product.description}</p>
      <button
        className="mt-4 bg-blue-500 text-white px-6 py-2 rounded"
        onClick={() => dispatch(addToCart(product))}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetailPage;
