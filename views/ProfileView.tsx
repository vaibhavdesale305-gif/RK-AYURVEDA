
import React from 'react';
import { User, Language } from '../types';
import { CONTACT_INFO } from '../constants';

interface Props {
  user: User | null;
  onLogout: () => void;
  currentLang: Language;
  onLangChange: (l: Language) => void;
  t: any;
}

const ProfileView: React.FC<Props> = ({ user, onLogout, currentLang, onLangChange, t }) => {
  const apkLink = localStorage.getItem('rk_apk_link') || '';

  const shareApp = () => {
    const message = `*राधे कृष्ण आयुर्वेद* 🌿%0A%0Aशुद्ध आणि नैसर्गिक आयुर्वेदिक उत्पादनांसाठी आमचे ॲप डाऊनलोड करा. %0A%0A📥 *ॲप डाऊनलोड लिंक:*%0A${apkLink || 'लिंक लवकरच येत आहे!'}%0A%0A*आताच डाऊनलोड करा आणि निरोगी राहा!*`;
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  return (
    <div className="bg-gray-100 min-h-full pb-20">
      <div className="bg-[#2E7D32] p-8 text-white flex flex-col items-center">
        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold border-2 border-white/50 mb-3 shadow-xl">
          {user?.name.charAt(0)}
        </div>
        <h2 className="text-xl font-bold">{user?.name}</h2>
        <p className="text-xs opacity-80">{user?.phone || 'Guest Mode'}</p>
      </div>

      <div className="mt-4 space-y-2">
        <section className="bg-white">
          <button onClick={shareApp} className="w-full flex items-center justify-between p-5 border-b group active:bg-green-50 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-xl">🚀</div>
              <div className="text-left">
                <span className="block text-sm font-bold text-gray-800">ॲप शेअर करा</span>
                <span className="block text-[10px] text-blue-600 font-bold uppercase">Share with Friends</span>
              </div>
            </div>
            <span className="text-gray-300 text-xl font-light">›</span>
          </button>
          
          <button className="w-full flex items-center justify-between p-5 border-b active:bg-gray-50">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center text-xl">📍</div>
              <span className="text-sm font-bold text-gray-800">माझा पत्ता</span>
            </div>
            <span className="text-gray-300 text-xl font-light">›</span>
          </button>
        </section>

        <section className="bg-white">
          <div className="p-5 border-b bg-gray-50/50">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Support & Help</h3>
          </div>
          <a href={`tel:${CONTACT_INFO.phone}`} className="flex items-center justify-between p-5 border-b active:bg-gray-50">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-xl">📞</div>
              <span className="text-sm font-bold text-gray-800">कॉल करा</span>
            </div>
            <span className="text-xs text-green-700 font-black tracking-tight">{CONTACT_INFO.phone}</span>
          </a>
          <a href={`https://wa.me/${CONTACT_INFO.whatsapp}`} target="_blank" className="flex items-center justify-between p-5 border-b active:bg-gray-50">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-xl">💬</div>
              <span className="text-sm font-bold text-gray-800">व्हॉट्सॲप सपोर्ट</span>
            </div>
            <span className="text-gray-300 text-xl font-light">›</span>
          </a>
        </section>

        <div className="p-10 flex flex-col items-center gap-4">
           <div className="bg-white px-4 py-1 rounded-full border shadow-sm">
              <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">Version 1.0.8 • Made in India</p>
           </div>
           <button 
             onClick={onLogout}
             className="text-red-500 text-[10px] font-black tracking-widest border-2 border-red-50 px-12 py-3 rounded-2xl active:bg-red-50 active:scale-95 transition-all"
           >
             LOGOUT
           </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
