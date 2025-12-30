
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem, User, Order } from '../types';
import { CONTACT_INFO } from '../constants';

interface Props {
  cart: CartItem[];
  user: User | null;
  onPlaceOrder: (address: string, paymentMethod: 'COD' | 'UPI') => void;
  // Translation object
  t: any;
}

const CheckoutView: React.FC<Props> = ({ cart, user, onPlaceOrder, t }) => {
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState(user?.addresses[0] || '');
  const [isOrdered, setIsOrdered] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'UPI'>('COD');
  const [lastOrderDetails, setLastOrderDetails] = useState<string>('');
  const [orderId, setOrderId] = useState<string>('');

  const finalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleOrder = () => {
    const generatedId = `RK-${Math.floor(Math.random() * 1000000)}`;
    setOrderId(generatedId);
    
    // Generate WhatsApp Message
    const itemsText = cart.map(item => `${item.name} (Qty: ${item.quantity}) - ₹${item.price * item.quantity}`).join('%0A');
    const message = `नमो नमः!%0Aनवीन ऑर्डर प्राप्त झाली आहे:%0A%0A*ऑर्डर क्रमांक:* ${generatedId}%0A*पेमेंट मोड:* ${paymentMethod}%0A%0A*ऑर्डर तपशील:*%0A${itemsText}%0A%0A*एकूण रक्कम:* ₹${finalPrice}%0A*पत्ता:* ${selectedAddress}%0A*फोन:* ${user?.phone || 'दिलेला नाही'}%0A%0Aकृपया ऑर्डर कन्फर्म करा.`;
    
    setLastOrderDetails(message);

    // जर UPI असेल तर पेमेंट ॲप उघडा
    if (paymentMethod === 'UPI') {
      const upiUrl = `upi://pay?pa=${CONTACT_INFO.upi}&pn=Radhe%20Krishna%20Ayurveda&am=${finalPrice}&cu=INR&tn=Order%20${generatedId}`;
      window.location.href = upiUrl;
    }

    onPlaceOrder(selectedAddress, paymentMethod);
    setIsOrdered(true);
  };

  const sendWhatsApp = () => {
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${lastOrderDetails}`, '_blank');
  };

  if (isOrdered) {
    return (
      <div className="flex flex-col items-center justify-center p-10 h-full text-center bg-white min-h-screen">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 text-5xl animate-bounce">
          ✅
        </div>
        <h2 className="text-2xl font-bold text-gray-800">ऑर्डर यशस्वी झाली!</h2>
        <p className="text-xs text-green-700 font-bold mt-2">ऑर्डर आयडी: {orderId}</p>
        <p className="text-sm text-gray-500 mt-3 mb-8">तुमची ऑर्डर नोंदवली गेली आहे. कृपया व्हॉट्सॲपवर मेसेज पाठवून आम्हाला कळवा जेणेकरून आम्ही काम सुरू करू शकू.</p>
        
        <button 
          onClick={sendWhatsApp}
          className="w-full bg-[#25D366] text-white py-4 rounded-lg font-bold flex items-center justify-center gap-3 shadow-lg mb-4"
        >
          WHATSAPP वर माहिती पाठवा
        </button>

        <button 
          onClick={() => navigate('/orders')}
          className="text-gray-500 text-sm underline"
        >
          ऑर्डर ट्रॅक करा
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
        <h1 className="text-lg font-bold">Checkout</h1>
      </div>

      <div className="p-4 bg-white mt-2">
        <h3 className="text-sm font-bold text-gray-800 mb-2">Delivery Address</h3>
        <div className="p-4 border-2 border-[#2E7D32] bg-green-50 rounded-md">
           <p className="text-sm font-bold text-gray-800">{user?.name}</p>
           <p className="text-xs text-gray-600 mt-1">{selectedAddress}</p>
        </div>
      </div>

      <div className="p-4 bg-white mt-2">
        <h3 className="text-sm font-bold text-gray-800 mb-4">Select Payment Method</h3>
        <div className="space-y-3">
          <label className={`flex items-center gap-3 p-3 border rounded-md cursor-pointer ${paymentMethod === 'COD' ? 'border-[#2E7D32] bg-green-50' : 'bg-gray-50'}`}>
            <input type="radio" name="payment" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} className="w-4 h-4 accent-[#2E7D32]" />
            <div className="flex-1">
              <p className="text-sm font-bold">Cash on Delivery (COD)</p>
              <p className="text-[10px] text-gray-500">वस्तू मिळाल्यावर पैसे द्या</p>
            </div>
          </label>
          <label className={`flex items-center gap-3 p-3 border rounded-md cursor-pointer ${paymentMethod === 'UPI' ? 'border-[#2E7D32] bg-green-50' : 'bg-gray-50'}`}>
            <input type="radio" name="payment" checked={paymentMethod === 'UPI'} onChange={() => setPaymentMethod('UPI')} className="w-4 h-4 accent-[#2E7D32]" />
            <div className="flex-1">
              <p className="text-sm font-bold flex items-center gap-2">
                Pay via UPI App 
                <span className="text-[8px] bg-blue-100 text-blue-600 px-1 rounded">FAST</span>
              </p>
              <p className="text-[10px] text-gray-500">Google Pay, PhonePe, Paytm</p>
              {paymentMethod === 'UPI' && (
                <div className="mt-2 p-2 bg-blue-50 border border-blue-100 rounded text-[9px] text-blue-800">
                  'Confirm' केल्यावर तुमचे पेमेंट ॲप आपोआप उघडेल.
                </div>
              )}
            </div>
          </label>
        </div>
      </div>

      <div className="mt-3 bg-white p-4">
        <h3 className="text-sm font-bold text-gray-800 mb-3">Order Summary</h3>
        <div className="flex justify-between pt-2 border-t mt-2 font-bold text-lg text-[#2E7D32]">
          <span>Total Payable</span>
          <span>₹{finalPrice}</span>
        </div>
      </div>

      <div className="fixed bottom-14 left-0 w-full max-w-md bg-white border-t p-3 z-50">
        <button 
          onClick={handleOrder}
          className="w-full bg-[#2E7D32] text-white py-3 rounded-sm font-bold text-sm shadow-md"
        >
          {paymentMethod === 'UPI' ? 'PROCEED TO PAYMENT' : 'CONFIRM & PLACE ORDER'}
        </button>
      </div>
    </div>
  );
};

export default CheckoutView;
