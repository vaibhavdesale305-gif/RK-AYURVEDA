
import React, { useState } from 'react';
import { User } from '../types';

interface Props {
  onLogin: (user: User) => void;
  // Translation object
  t: any;
}

const LoginView: React.FC<Props> = ({ onLogin, t }) => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [isLoading, setIsLoading] = useState(false);

  // डायरेक्ट लॉगिन फंक्शन (कोणताही मेसेज नको असल्यास)
  const handleDirectLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      onLogin({
        id: 'guest-123',
        name: 'पाहुणा ग्राहक',
        phone: '9999999999',
        email: '',
        addresses: ['कसारे, ता. साक्री, जि. धुळे']
      });
    }, 800);
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length !== 10) {
      alert("कृपया १० अंकी मोबाईल नंबर टाका.");
      return;
    }
    setIsLoading(true);
    const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(newOtp);
    setTimeout(() => {
      setStep('otp');
      setIsLoading(false);
    }, 1000);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === generatedOtp || otp === '0000') {
      onLogin({
        id: `u-${Date.now()}`,
        name: 'प्रिय ग्राहक',
        phone: phone,
        email: '',
        addresses: ['पत्त्याची माहिती भरा']
      });
    } else {
      alert("चुकीचा OTP! '0000' वापरून पहा.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
      
      <div className="w-full max-w-sm text-center">
        <div className="mb-12">
          <div className="w-24 h-24 bg-[#2E7D32] text-white rounded-[2.5rem] flex items-center justify-center text-4xl font-black mx-auto mb-4 shadow-xl shadow-green-100">RK</div>
          <h1 className="text-3xl font-bold text-gray-800">नमस्ते!</h1>
          <p className="text-sm text-gray-400 mt-2 font-medium">राधे कृष्ण आयुर्वेद मध्ये आपले स्वागत आहे</p>
        </div>

        {step === 'phone' ? (
          <div className="space-y-6">
            {/* Demo/Guest Login Button - सर्वात सोपा मार्ग */}
            <button 
              onClick={handleDirectLogin}
              className="w-full bg-[#E8F5E9] text-[#2E7D32] py-4 rounded-2xl font-bold border-2 border-[#2E7D32] flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              🚀 मेसेज शिवाय थेट सुरू करा
            </button>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-gray-100"></div>
              <span className="flex-shrink mx-4 text-gray-300 text-[10px] font-bold uppercase tracking-widest">किंवा</span>
              <div className="flex-grow border-t border-gray-100"></div>
            </div>

            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="text-left">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">मोबाईल नंबर (पर्यायी)</label>
                <div className="flex mt-1 bg-gray-50 rounded-2xl border-2 border-transparent focus-within:border-[#2E7D32] focus-within:bg-white transition-all overflow-hidden">
                  <span className="p-4 text-gray-400 font-bold bg-gray-100">+91</span>
                  <input 
                    type="tel" 
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="98XXXXXXXX"
                    className="w-full p-4 outline-none text-lg font-bold tracking-widest bg-transparent"
                  />
                </div>
              </div>
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-[#2E7D32] text-white py-4 rounded-2xl font-bold shadow-lg shadow-green-50 active:scale-95 transition-all"
              >
                {isLoading ? "लोड होत आहे..." : "नंबरने लॉगिन करा"}
              </button>
            </form>
          </div>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-8">
            <div className="text-left">
              <h2 className="text-lg font-bold text-gray-800">लॉगिन पूर्ण करा</h2>
              <p className="text-xs text-gray-400 mt-1">मेसेज आला नसेल तर खालील नंबर वापरा:</p>
              <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-100 text-center">
                 <p className="text-sm font-bold text-yellow-700">तुमचा टेस्ट OTP: <span className="text-xl">0000</span></p>
              </div>
              
              <input 
                autoFocus
                type="tel" 
                maxLength={4}
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="0000"
                className="w-full py-8 outline-none text-center text-5xl font-black tracking-[0.5em] border-b-4 border-gray-100 focus:border-[#2E7D32] transition-colors"
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-[#2E7D32] text-white py-4 rounded-2xl font-bold shadow-lg active:scale-95 transition-transform"
            >
              प्रवेश करा
            </button>
            
            <button type="button" onClick={() => setStep('phone')} className="text-gray-400 text-xs font-medium underline">परत जा</button>
          </form>
        )}
      </div>

      <div className="mt-12 text-center max-w-[250px]">
        <p className="text-[10px] text-gray-400 leading-relaxed font-medium">
          ही चाचणी आवृत्ती आहे. खऱ्या ॲपमध्ये आम्ही तुम्हाला मोफत गुगल मेसेज सिस्टीम (Firebase) सेट करून देऊ.
        </p>
      </div>
    </div>
  );
};

export default LoginView;
