
import React, { useState, useEffect } from 'react';
import { Product, Order, AppContent } from '../types';

interface Props {
  products: Product[];
  orders: Order[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  appContent: AppContent;
  setAppContent: React.Dispatch<React.SetStateAction<AppContent>>;
}

const AdminDashboard: React.FC<Props> = ({ products, orders, setProducts, updateOrderStatus, appContent, setAppContent }) => {
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'build'>('build');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [apkLink, setApkLink] = useState(localStorage.getItem('rk_apk_link') || '');
  
  const [formData, setFormData] = useState<Partial<Product>>({
    category: 'Hair Care',
    stockStatus: 'In Stock',
    rating: 5,
    reviews: 0
  });

  // खरी पब्लिश झालेली लिंक मिळवणे
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    // blob: काढून खरी लिंक मिळवण्याचा प्रयत्न
    let url = window.location.href.split('#')[0];
    if (url.includes('blob:')) {
      url = "पब्लिश केल्यावर येथे लिंक येईल";
    }
    setCurrentUrl(url);
  }, []);

  const isInternalLink = window.location.href.includes('blob:');

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("लिंक कॉपी झाली आहे!");
  };

  const validateAndSaveApkLink = () => {
    let finalLink = apkLink.trim();
    if (!finalLink) {
      localStorage.removeItem('rk_apk_link');
      alert("लिंक काढून टाकली आहे.");
      return;
    }
    if (finalLink.startsWith('blob:')) {
      alert("सावधान: 'blob:' लिंक चालणार नाही. कृपया ड्राइव्हची लिंक टाका.");
      return;
    }
    if (!/^https?:\/\//i.test(finalLink)) {
      finalLink = 'https://' + finalLink;
    }
    setApkLink(finalLink);
    localStorage.setItem('rk_apk_link', finalLink);
    alert("APK लिंक सेव्ह झाली!");
  };

  // Fix: added handleOpenAdd function
  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      category: 'Hair Care',
      stockStatus: 'In Stock',
      rating: 5,
      reviews: 0,
      name: '',
      mrp: 0,
      price: 0,
      image: 'https://picsum.photos/400/400',
      description: '',
      benefits: [],
      ingredients: [],
      usage: ''
    });
    setIsModalOpen(true);
  };

  // Fix: added handleOpenEdit function
  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const mrpValue = formData.mrp || 0;
    const priceValue = formData.price || 0;
    const discount = mrpValue > 0 ? Math.round(((mrpValue - priceValue) / mrpValue) * 100) : 0;
    
    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...p, ...formData, discount } as Product : p));
    } else {
      const productToAdd: Product = {
        description: '',
        benefits: [],
        ingredients: [],
        usage: '',
        image: 'https://picsum.photos/400/400',
        ...formData as Product,
        id: `p-${Date.now()}`,
        discount
      };
      setProducts(prev => [productToAdd, ...prev]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-full bg-gray-50 pb-20">
      <div className="bg-black text-white p-4 flex justify-between items-center shadow-lg sticky top-0 z-50">
        <h1 className="font-black text-sm tracking-tighter uppercase">RK ADMIN PANEL</h1>
        <div className="flex items-center gap-1">
           <span className={`w-2 h-2 rounded-full ${isInternalLink ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></span>
           <span className="text-[8px] font-black uppercase text-gray-400">{isInternalLink ? 'Preview' : 'Live'}</span>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="flex border-b bg-white sticky top-12 z-40 shadow-sm">
        {[
          { id: 'build', label: 'APP LINK', icon: '🔗' },
          { id: 'products', label: 'प्रॉडक्ट्स', icon: '📦' },
          { id: 'orders', label: 'ऑर्डर्स', icon: '📝' }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-4 text-[9px] font-black uppercase transition-all flex flex-col items-center gap-1 ${activeTab === tab.id ? 'text-[#2E7D32] border-b-2 border-[#2E7D32]' : 'text-gray-400'}`}
          >
            <span className="text-xl">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-4">
        {activeTab === 'build' && (
          <div className="space-y-4">
            {/* Master URL Card */}
            <div className="bg-white p-6 rounded-[2rem] shadow-xl border-2 border-blue-50 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-5 text-6xl">🌍</div>
               <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-1">तुमची पब्लिक ॲप लिंक:</h3>
               <p className="text-[9px] text-gray-400 mb-4 font-bold">ही लिंक APK बनवण्यासाठी वापरा</p>
               
               <div className="bg-gray-50 p-4 rounded-2xl border-2 border-dashed border-blue-100 flex flex-col gap-3">
                  <code className="text-[11px] text-gray-800 font-black break-all block leading-relaxed">
                    {isInternalLink ? "https://..." : window.location.href.split('#')[0]}
                  </code>
                  <button 
                    onClick={() => handleCopy(window.location.href.split('#')[0])} 
                    className="w-full bg-blue-600 text-white py-3 rounded-xl text-[10px] font-black uppercase shadow-lg active:scale-95 transition-all"
                  >
                    लिंक कॉपी करा (COPY LINK)
                  </button>
               </div>
               {isInternalLink && (
                 <div className="mt-4 p-3 bg-yellow-50 text-yellow-700 text-[9px] font-black rounded-xl border border-yellow-100 leading-tight">
                    ⚠️ तुम्ही सध्या प्रिव्ह्यू मोडमध्ये आहात. ॲप पूर्ण झाल्यावर 'Save' किंवा 'Publish' करा, मग खरी लिंक येथे दिसेल.
                 </div>
               )}
            </div>

            {/* APK Download Link Setup */}
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
               <h3 className="text-sm font-black mb-1">२. APK डाऊनलोड लिंक टाका</h3>
               <p className="text-[10px] text-gray-400 mb-4">APK फाईल ड्राइव्हवर टाकून त्याची लिंक इथे पेस्ट करा.</p>
               <input 
                 type="text" 
                 placeholder="उदा. drive.google.com/..." 
                 value={apkLink} 
                 onChange={(e) => setApkLink(e.target.value)}
                 className="w-full p-4 bg-gray-50 rounded-2xl text-xs font-bold border-2 border-transparent focus:border-green-500 outline-none mb-3"
               />
               <button onClick={validateAndSaveApkLink} className="w-full bg-[#2E7D32] text-white py-3 rounded-xl text-[10px] font-black uppercase shadow-md">लिंक सेव्ह करा</button>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 gap-3">
               <a 
                 href="https://www.web2app.io/en/free-online-website-to-apk-converter" 
                 target="_blank"
                 rel="noopener noreferrer"
                 className="bg-gray-800 text-white p-5 rounded-[2rem] flex items-center justify-between group active:scale-95 transition-all shadow-lg"
               >
                 <div className="flex items-center gap-4">
                    <span className="text-2xl">🏗️</span>
                    <div>
                       <h4 className="text-xs font-black uppercase">Go to APK Builder</h4>
                       <p className="text-[9px] text-gray-400 font-bold">येथे जाऊन लिंक पेस्ट करा</p>
                    </div>
                 </div>
                 <span className="text-xl group-hover:translate-x-1 transition-transform">➔</span>
               </a>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center px-2">
               <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest">Inventory ({products.length})</h2>
               <button onClick={handleOpenAdd} className="bg-[#2E7D32] text-white text-[10px] px-5 py-2.5 rounded-xl font-black shadow-lg">+ ADD NEW</button>
            </div>
            {products.map(p => (
              <div key={p.id} className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                 <img src={p.image} className="w-14 h-14 rounded-xl object-cover bg-gray-50" />
                 <div className="flex-1">
                    <h4 className="text-xs font-bold text-gray-800">{p.name}</h4>
                    <p className="text-[10px] font-black text-green-700">₹{p.price}</p>
                 </div>
                 <div className="flex gap-2">
                   <button onClick={() => handleOpenEdit(p)} className="p-2.5 bg-blue-50 text-blue-600 rounded-xl text-xs">✏️</button>
                   <button onClick={() => { if(window.confirm("डिलीट करायचे?")) setProducts(prev => prev.filter(x => x.id !== p.id)) }} className="p-2.5 bg-red-50 text-red-500 rounded-xl text-xs">🗑️</button>
                 </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-4">
             {orders.length === 0 ? (
               <div className="text-center py-20">
                 <p className="text-xs text-gray-400 font-bold uppercase">No orders yet</p>
               </div>
             ) : (
               orders.map(o => (
                 <div key={o.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-3">
                       <span className="text-[10px] font-black px-3 py-1 bg-gray-100 rounded-full">#{o.id}</span>
                       <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${o.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{o.status}</span>
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="flex-1 pr-4">
                        <p className="text-[11px] font-bold text-gray-800 line-clamp-2">📍 {o.address}</p>
                      </div>
                      <span className="text-sm font-black text-gray-900">₹{o.totalAmount}</span>
                    </div>
                    <div className="mt-4 flex gap-2 pt-4 border-t">
                       <button onClick={() => updateOrderStatus(o.id, 'Shipped')} className="flex-1 text-[9px] font-black py-2 bg-blue-50 text-blue-600 rounded-lg uppercase">Shipped</button>
                       <button onClick={() => updateOrderStatus(o.id, 'Delivered')} className="flex-1 text-[9px] font-black py-2 bg-green-50 text-green-600 rounded-lg uppercase">Delivered</button>
                    </div>
                 </div>
               ))
             )}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-end justify-center backdrop-blur-sm p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-md p-8 animate-slide-up shadow-2xl overflow-y-auto max-h-[90vh]">
            <h3 className="font-black text-lg mb-6 text-center">प्रॉडक्ट माहिती</h3>
            <form onSubmit={handleSaveProduct} className="space-y-4">
              <input type="text" placeholder="Product Name" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-4 bg-gray-50 rounded-2xl text-xs font-bold outline-none border-2 border-transparent focus:border-green-500" />
              <div className="grid grid-cols-2 gap-4">
                <input type="number" placeholder="MRP" value={formData.mrp || ''} onChange={e => setFormData({...formData, mrp: Number(e.target.value)})} className="w-full p-4 bg-gray-50 rounded-2xl text-xs font-bold outline-none border-2 border-transparent focus:border-green-500" />
                <input type="number" placeholder="Sale Price" value={formData.price || ''} onChange={e => setFormData({...formData, price: Number(e.target.value)})} className="w-full p-4 bg-gray-50 rounded-2xl text-xs font-bold outline-none border-2 border-transparent focus:border-green-500" />
              </div>
              <button type="submit" className="w-full bg-[#2E7D32] text-white py-5 rounded-2xl font-black shadow-xl mt-4 active:scale-95 transition-all uppercase tracking-widest text-xs">SAVE CHANGES</button>
              <button type="button" onClick={() => setIsModalOpen(false)} className="w-full text-gray-400 text-[10px] font-black mt-2 uppercase tracking-widest">DISMISS</button>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slide-up { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .animate-slide-up { animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
