
import React from 'react';
import { CONTACT_INFO } from '../constants';
import { AppContent } from '../types';

interface Props {
  content: AppContent;
  // Translation object
  t: any;
}

const AboutView: React.FC<Props> = ({ content, t }) => {
  return (
    <div className="pb-20">
      <div className="bg-[#1B5E20] text-white p-12 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-10"></div>
        <h1 className="text-4xl font-black italic tracking-tighter drop-shadow-lg">Radhe Krishna</h1>
        <p className="text-yellow-400 text-[10px] font-black tracking-[0.4em] uppercase mt-2">Ayurveda</p>
      </div>

      <div className="p-6">
        <h2 className="text-lg font-black text-[#2E7D32] mb-4 flex items-center gap-2">
           <span className="w-1.5 h-6 bg-[#2E7D32] rounded-full"></span>
           Our Heritage
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-8 font-medium italic border-l-4 border-green-50 pl-4">
          {content.aboutHeritage}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-10">
           <div className="bg-white p-5 rounded-3xl border border-green-100 flex flex-col items-center text-center shadow-sm">
              <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-2xl mb-3">🌿</div>
              <h4 className="text-xs font-black text-green-800 uppercase tracking-tighter">100% Natural</h4>
              <p className="text-[9px] text-green-600 font-bold mt-1">NO CHEMICALS</p>
           </div>
           <div className="bg-white p-5 rounded-3xl border border-green-100 flex flex-col items-center text-center shadow-sm">
              <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-2xl mb-3">🤝</div>
              <h4 className="text-xs font-black text-green-800 uppercase tracking-tighter">Handmade</h4>
              <p className="text-[9px] text-green-600 font-bold mt-1">TRADITIONAL WAY</p>
           </div>
        </div>

        <h2 className="text-lg font-black text-[#2E7D32] mb-6 flex items-center gap-2">
           <span className="w-1.5 h-6 bg-[#2E7D32] rounded-full"></span>
           Contact Us
        </h2>
        <div className="space-y-6">
           <div className="flex gap-4 items-center">
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-xl shadow-sm">📍</div>
              <div>
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Main Center</p>
                 <p className="text-xs text-gray-800 font-bold leading-tight mt-0.5">{CONTACT_INFO.address}</p>
              </div>
           </div>
           <div className="flex gap-4 items-center">
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-xl shadow-sm">📞</div>
              <div>
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Support Line</p>
                 <p className="text-xs text-gray-800 font-bold mt-0.5">{CONTACT_INFO.phone}</p>
              </div>
           </div>
           <div className="flex gap-4 items-center">
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-xl shadow-sm">✉️</div>
              <div>
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Official Email</p>
                 <p className="text-xs text-gray-800 font-bold mt-0.5">{CONTACT_INFO.email}</p>
              </div>
           </div>
        </div>

        <div className="mt-12 p-8 bg-[#2E7D32] rounded-[3rem] text-center shadow-2xl shadow-green-100 relative overflow-hidden">
           <div className="absolute top-2 left-2 text-white/10 text-6xl font-black italic">"</div>
           <p className="text-sm text-white font-black italic leading-relaxed relative z-10">
             "{content.aboutQuote}"
           </p>
        </div>
      </div>
    </div>
  );
};

export default AboutView;
