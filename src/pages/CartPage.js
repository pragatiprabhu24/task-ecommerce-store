import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../redux/slices/cartSlice";
import { Link } from "react-router-dom";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const calculateTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  if (cartItems.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">Your cart is empty!</p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      <ul>
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between p-4 border-b"
          >
            <div className="flex items-center">
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-cover"
              />
              <div className="ml-4">
                <p className="font-bold">{item.title}</p>
                <p>₹{item.price}</p>
              </div>
            </div>
            <div className="flex items-center">
              <input
                type="number"
                value={item.quantity}
                min="1"
                className="w-12 border rounded text-center"
                onChange={(e) =>
                  dispatch(
                    updateQuantity({
                      id: item.id,
                      quantity: Number(e.target.value),
                    })
                  )
                }
              />
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="ml-4 bg-red-500 text-white px-4 py-1 rounded"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <p className="text-lg font-bold">Total: ₹{calculateTotalPrice()}</p>
        <Link to="/checkout">
          <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded">
            Proceed to Checkout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
