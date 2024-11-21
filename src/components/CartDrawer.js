import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  closeDrawer,
} from "../redux/slices/cartSlice";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";

const CartDrawer = () => {
  const { cartItems, isDrawerOpen } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const calculateTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black  z-20 transition-opacity ${
          isDrawerOpen ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => dispatch(closeDrawer())}
      ></div>

      <div
        className={`fixed top-0 right-0 h-full bg-white w-96 shadow-lg z-30 transition-transform ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-xl font-bold">Shopping Cart</h2>
          <button
            onClick={() => dispatch(closeDrawer())}
            className="text-gray-500 hover:text-gray-800"
          >
            Close
          </button>
        </div>

        {cartItems.length === 0 ? (
          <p className="p-4 text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="p-4">
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li key={item.id} className="flex justify-between items-center">
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
                    <button
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: item.id,
                            quantity:
                              item.quantity - 1 < 1 ? 1 : item.quantity - 1,
                          })
                        )
                      }
                      className="w-8 h-8 flex justify-center items-center border border-gray-300"
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: item.id,
                            quantity: item.quantity + 1,
                          })
                        )
                      }
                      className="w-8 h-8 flex justify-center items-center border border-gray-300"
                    >
                      +
                    </button>

                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="ml-4 text-red-500"
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <p className="font-bold">Total: ₹{calculateTotalPrice()}</p>
              <Link to="/checkout">
                <button
                  onClick={() => dispatch(closeDrawer())}
                  className="mt-4 w-full bg-blue-500 text-white py-2 rounded"
                >
                  Go to Cart
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
