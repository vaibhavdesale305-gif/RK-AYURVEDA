
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product, Category, AppContent } from '../types';

interface Props {
  products: Product[];
  content: AppContent;
  t: any;
}

const HomeView: React.FC<Props> = ({ products, content, t }) => {
  const navigate = useNavigate();
  const [showInstallTip, setShowInstallTip] = useState(false);
  const rawApkLink = localStorage.getItem('rk_apk_link') || '';

  useEffect(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
    if (!isStandalone) {
      const timer = setTimeout(() => setShowInstallTip(true), 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  const CATEGORIES: { name: Category, icon: string, label: string }[] = [
    { name: 'Hair Care', icon: '💆', label: t.mr ? 'केसांची निगा' : 'Hair Care' },
    { name: 'Skin Care', icon: '✨', label: t.mr ? 'त्वचेची निगा' : 'Skin Care' },
    { name: 'Soaps', icon: '🧼', label: t.mr ? 'साबण' : 'Soaps' },
    { name: 'Dhoop & Agarbatti', icon: '🪔', label: t.mr ? 'धूप-अगरबत्ती' : 'Dhoop & Agarbatti' },
  ];

  const handleDownload = () => {
    if (rawApkLink && !rawApkLink.startsWith('blob:')) {
      window.open(rawApkLink, '_blank', 'noopener,noreferrer');
    } else {
      setShowInstallTip(true);
    }
  };

  return (
    <div className="p-0 pb-10">
      {/* Install App Popup */}
      {showInstallTip && (
        <div className="fixed bottom-24 left-4 right-4 z-[100] bg-[#1a1a1a] text-white rounded-[2rem] shadow-2xl p-6 border border-white/10 animate-slide-up">
           <div className="flex items-center gap-4 mb-4">
              <div className="bg-[#2E7D32] w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-lg shrink-0">📲</div>
              <div className="flex-1">
                 <h4 className="text-xs font-black uppercase text-green-400">ॲप फोनमध्ये सेव्ह करा!</h4>
                 <p className="text-[10px] text-gray-400 mt-1 leading-tight">Chrome च्या वरच्या ३ ठिपक्यांवर क्लिक करा आणि <b>'Add to Home Screen'</b> निवडा.</p>
              </div>
           </div>
           <div className="flex gap-2">
              <button onClick={() => setShowInstallTip(false)} className="flex-1 bg-white/10 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest">बंद करा</button>
              {rawApkLink && !rawApkLink.startsWith('blob:') && (
                 <a 
                   href={rawApkLink} 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="flex-1 bg-green-600 text-white py-3 rounded-xl text-[10px] font-black uppercase text-center flex items-center justify-center"
                 >
                   डाऊनलोड APK
                 </a>
              )}
           </div>
        </div>
      )}

      {/* Hero Banner */}
      <div className="bg-[#1B5E20] h-64 overflow-hidden relative">
        <img src={content.homeBanner} className="w-full h-full object-cover opacity-60" alt="Banner" />
        <div className="absolute inset-0 flex flex-col justify-center px-8">
          <div className="bg-yellow-400 w-max px-3 py-1 rounded-md mb-3 shadow-lg">
            <p className="text-[10px] font-black text-[#1B5E20] uppercase tracking-tighter">100% Herbal</p>
          </div>
          <h2 className="text-white text-4xl font-black drop-shadow-2xl leading-tight">{content.homeTitle}</h2>
          <p className="text-green-50 text-[11px] font-bold drop-shadow-md mt-2 uppercase tracking-[0.2em]">{content.homeSubtitle}</p>
          
          <button 
            onClick={handleDownload}
            className="mt-8 bg-white text-[#1B5E20] w-max px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all"
          >
            📥 डाऊनलोड करा
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Top Categories</h3>
          <span className="flex-1 h-px bg-gray-100 ml-4"></span>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {CATEGORIES.map(cat => (
            <div key={cat.name} onClick={() => navigate(`/category/${cat.name}`)} className="flex flex-col items-center gap-3 cursor-pointer group">
              <div className="w-full aspect-square rounded-[1.8rem] bg-white flex items-center justify-center text-3xl shadow-sm border border-gray-100 group-active:scale-90 transition-all">
                {cat.icon}
              </div>
              <span className="text-[8px] text-center font-black text-gray-500 uppercase leading-tight">{cat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6">
        <div className="mb-8">
          <h3 className="text-3xl font-black text-gray-900 tracking-tighter italic">Featured</h3>
        </div>

        <div className="grid grid-cols-2 gap-5">
          {products.map(product => (
            <div 
              key={product.id} 
              onClick={() => navigate(`/product/${product.id}`)}
              className="bg-white rounded-[2.5rem] shadow-sm overflow-hidden border border-gray-100 flex flex-col active:scale-95 transition-all group"
            >
              <div className="h-48 bg-gray-50 relative overflow-hidden">
                <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={product.name} />
                <div className="absolute top-4 left-4 bg-red-500 text-white text-[9px] font-black px-3 py-1.5 rounded-full shadow-xl">
                  {product.discount}% OFF
                </div>
              </div>
              <div className="p-5 flex-1">
                <h4 className="text-xs font-bold text-gray-800 line-clamp-1 uppercase tracking-tight">{product.name}</h4>
                <div className="flex items-center gap-2 mt-4">
                  <span className="text-lg font-black text-gray-900">₹{product.price}</span>
                  <span className="text-[10px] text-gray-400 line-through font-bold italic">₹{product.mrp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes slide-up { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-slide-up { animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default HomeView;
