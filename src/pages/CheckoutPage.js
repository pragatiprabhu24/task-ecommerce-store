import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { setUserInfo } from "../redux/slices/userSlice";
import { clearCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [form, setForm] = useState({ name: "", address: "", phone: "" });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const calculateTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handlePlaceOrder = () => {
    dispatch(setUserInfo(form));
    dispatch(clearCart());
    setOrderPlaced(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);

    navigate("/");
    setForm({ name: "", address: "", phone: "" });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 py-28 shadow-xl">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-lg font-bold mb-2">Shipping Information</h2>
          <form>
            <div className="mb-4">
              <label className="block mb-1 font-bold">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-bold">Address</label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-bold">Phone</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </form>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-2">Order Summary</h2>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between mb-2">
                <p>
                  {item.title} (x{item.quantity})
                </p>
                <p>₹{(item.price * item.quantity).toFixed(2)}</p>
              </li>
            ))}
          </ul>
          <p className="font-bold mt-4">Total: ₹{calculateTotalPrice()}</p>
        </div>
      </div>
      <button
        onClick={handlePlaceOrder}
        className="mt-6 bg-green-500 text-white px-6 py-2 rounded w-full"
      >
        Place Order
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <div className="flex flex-col items-center">
              <h1 className="text-2xl font-bold text-green-500">
                Order Placed Successfully!
              </h1>
              <img
                src="https://i2.wp.com/www.cutecrafting.com/wp-content/uploads/2017/08/ThankYouOrderBirdy.png?resize=1050%2C600"
                className="w-72 mt-4"
                alt="Thank you"
              />
              <button
                onClick={closeModal}
                className="mt-6 bg-red-500 text-white px-6 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
