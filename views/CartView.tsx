
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../types';

interface Props {
  cart: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, delta: number) => void;
  // Translation object
  t: any;
}

const CartView: React.FC<Props> = ({ cart, onRemove, onUpdateQty, t }) => {
  const navigate = useNavigate();
  const totalMRP = cart.reduce((acc, item) => acc + (item.mrp * item.quantity), 0);
  const totalDiscount = cart.reduce((acc, item) => acc + ((item.mrp - item.price) * item.quantity), 0);
  const finalPrice = totalMRP - totalDiscount;

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10 h-full">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-4xl">🛒</div>
        <h2 className="text-lg font-bold text-gray-800">Your cart is empty!</h2>
        <p className="text-xs text-gray-500 text-center mt-2">Add some Ayurvedic wellness to your cart now.</p>
        <button 
          onClick={() => navigate('/')}
          className="mt-6 bg-[#2E7D32] text-white px-8 py-2 rounded font-bold text-sm"
        >
          SHOP NOW
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-full pb-20">
      <div className="bg-white p-4 flex items-center gap-4 border-b">
        <button onClick={() => navigate(-1)}>
          <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-bold">My Cart ({cart.length})</h1>
      </div>

      <div className="mt-2 space-y-2">
        {cart.map(item => (
          <div key={item.id} className="bg-white p-4 flex gap-4">
            <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden">
              <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-800">{item.name}</h3>
              <p className="text-[10px] text-gray-400 mt-0.5">{item.category}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm font-bold">₹{item.price}</span>
                <span className="text-[10px] text-gray-400 line-through">₹{item.mrp}</span>
                <span className="text-[10px] text-green-600 font-bold">{item.discount}% Off</span>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center border rounded">
                  <button onClick={() => onUpdateQty(item.id, -1)} className="px-2 py-1 text-gray-500">-</button>
                  <span className="px-3 py-1 text-xs font-bold border-x">{item.quantity}</span>
                  <button onClick={() => onUpdateQty(item.id, 1)} className="px-2 py-1 text-gray-500">+</button>
                </div>
                <button onClick={() => onRemove(item.id)} className="text-xs font-bold text-red-500 uppercase">Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 bg-white p-4">
        <h3 className="text-sm font-bold text-gray-800 border-b pb-2 mb-3">Price Details</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Price ({cart.length} items)</span>
            <span>₹{totalMRP}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Discount</span>
            <span className="text-green-600">-₹{totalDiscount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Delivery Charges</span>
            <span className="text-green-600">FREE</span>
          </div>
          <div className="flex justify-between pt-2 border-t font-bold text-base">
            <span>Total Amount</span>
            <span>₹{finalPrice}</span>
          </div>
        </div>
        <p className="text-[10px] text-green-600 font-bold mt-4">You will save ₹{totalDiscount} on this order</p>
      </div>

      {/* Place Order Sticky */}
      <div className="fixed bottom-14 left-0 w-full max-w-md bg-white border-t p-3 flex items-center justify-between z-50">
        <div>
          <p className="text-[10px] text-gray-400">Total Payable</p>
          <p className="text-lg font-bold">₹{finalPrice}</p>
        </div>
        <button 
          onClick={() => navigate('/checkout')}
          className="bg-yellow-400 text-[#1B5E20] px-10 py-3 rounded-sm font-bold text-sm shadow-md"
        >
          PLACE ORDER
        </button>
      </div>
    </div>
  );
};

export default CartView;
