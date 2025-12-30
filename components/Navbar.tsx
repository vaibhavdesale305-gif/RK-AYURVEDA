
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Language } from '../types';

interface Props {
  cartCount: number;
  currentLang: Language;
  onLangChange: (l: Language) => void;
  t: any;
}

const Navbar: React.FC<Props> = ({ cartCount, currentLang, onLangChange, t }) => {
  const navigate = useNavigate();
  const [showLangMenu, setShowLangMenu] = useState(false);

  const langLabels: Record<Language, string> = {
    en: 'EN',
    mr: 'मराठी',
    hi: 'हिंदी'
  };

  return (
    <nav className="fixed top-0 w-full max-w-md bg-[#2E7D32] text-white p-3 z-50 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-2">
        <Link to="/" className="text-sm font-bold italic whitespace-nowrap">{t.app_name}</Link>
      </div>
      
      <div className="flex-1 mx-2 relative">
        <input 
          type="text" 
          placeholder={t.search_placeholder}
          className="w-full py-1.5 px-3 rounded-md text-gray-800 focus:outline-none text-[10px] font-medium"
        />
      </div>

      <div className="flex items-center gap-3">
        {/* Language Selector */}
        <div className="relative">
          <button 
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="text-[10px] font-black border border-white/30 px-2 py-1 rounded bg-white/10 uppercase"
          >
            {langLabels[currentLang]}
          </button>
          {showLangMenu && (
            <div className="absolute right-0 top-full mt-2 bg-white text-gray-800 rounded-lg shadow-2xl border p-1 w-24 animate-fade-in">
              {(['en', 'mr', 'hi'] as Language[]).map(l => (
                <button 
                  key={l}
                  onClick={() => { onLangChange(l); setShowLangMenu(false); }}
                  className={`w-full text-left px-3 py-2 text-[10px] font-bold rounded ${currentLang === l ? 'bg-green-50 text-green-700' : 'hover:bg-gray-50'}`}
                >
                  {langLabels[l]}
                </button>
              ))}
            </div>
          )}
        </div>

        <button onClick={() => navigate('/cart')} className="relative">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-yellow-400 text-[#2E7D32] text-[8px] font-black rounded-full h-4 w-4 flex items-center justify-center border-2 border-[#2E7D32]">
              {cartCount}
            </span>
          )}
        </button>
      </div>
      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.2s ease-out forwards; }
      `}</style>
    </nav>
  );
};

export default Navbar;
