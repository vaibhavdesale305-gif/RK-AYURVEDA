
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Order } from '../types';

interface Props {
  orders: Order[];
  // Translation object
  t: any;
}

const OrdersView: React.FC<Props> = ({ orders, t }) => {
  const navigate = useNavigate();

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10 h-full">
        <div className="text-4xl mb-4">📦</div>
        <h2 className="text-lg font-bold text-gray-800">ऑर्डर अजून दिली नाहीये</h2>
        <button 
          onClick={() => navigate('/')}
          className="mt-6 border border-[#2E7D32] text-[#2E7D32] px-8 py-2 rounded font-bold text-sm"
        >
          शॉपिंग सुरू करा
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-full p-2 space-y-4 pb-20">
      <h1 className="text-lg font-bold p-2">माझ्या ऑर्डर्स</h1>
      {orders.map(order => (
        <div key={order.id} className="bg-white p-4 border rounded-lg shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-bold">ऑर्डर आयडी: {order.id}</p>
              <p className="text-xs text-gray-600 font-medium">{order.date}</p>
            </div>
            <p className="text-sm font-bold text-[#2E7D32]">₹{order.totalAmount}</p>
          </div>

          {/* Tracking Timeline */}
          <div className="relative pl-6 space-y-4 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-200">
            <div className="relative">
              <div className={`absolute -left-[23px] top-1 w-4 h-4 rounded-full border-2 border-white ${order.status === 'Placed' || order.status === 'Shipped' || order.status === 'Delivered' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <p className={`text-xs font-bold ${order.status === 'Placed' || order.status === 'Shipped' || order.status === 'Delivered' ? 'text-green-700' : 'text-gray-400'}`}>ऑर्डर प्लेस झाली</p>
              <p className="text-[9px] text-gray-500">तुमची ऑर्डर आम्हाला मिळाली आहे.</p>
            </div>
            <div className="relative">
              <div className={`absolute -left-[23px] top-1 w-4 h-4 rounded-full border-2 border-white ${order.status === 'Shipped' || order.status === 'Delivered' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <p className={`text-xs font-bold ${order.status === 'Shipped' || order.status === 'Delivered' ? 'text-green-700' : 'text-gray-400'}`}>पॅकेज पाठवले (Shipped)</p>
              <p className="text-[9px] text-gray-500">{order.status === 'Shipped' ? 'वस्तू कुरियरला दिली आहे.' : 'प्रतिक्षेत...'}</p>
            </div>
            <div className="relative">
              <div className={`absolute -left-[23px] top-1 w-4 h-4 rounded-full border-2 border-white ${order.status === 'Delivered' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <p className={`text-xs font-bold ${order.status === 'Delivered' ? 'text-green-700' : 'text-gray-400'}`}>पोहोचली (Delivered)</p>
              <p className="text-[9px] text-gray-500">वस्तू तुमच्या पत्त्यावर पोहोचली आहे.</p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t flex gap-2">
            <button className="flex-1 py-2 bg-gray-50 text-gray-600 text-[10px] font-bold rounded border">पाहिजे का?</button>
            <button 
              onClick={() => window.open(`https://wa.me/9730593982?text=ऑर्डर ${order.id} बद्दल माहिती पाहिजे.`, '_blank')}
              className="flex-1 py-2 bg-green-50 text-green-700 text-[10px] font-bold rounded border border-green-200"
            >
              सपोर्ट टीमशी बोला
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersView;
