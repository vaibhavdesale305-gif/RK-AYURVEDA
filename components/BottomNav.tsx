
import React from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  t: any;
  isAdmin: boolean;
}

const BottomNav: React.FC<Props> = ({ t, isAdmin }) => {
  return (
    <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-200 py-1 z-50 flex justify-around">
      <NavLink to="/" className={({ isActive }) => `flex flex-col items-center p-2 ${isActive ? 'text-[#2E7D32]' : 'text-gray-400'}`}>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <span className="text-[9px] font-black uppercase mt-1 tracking-tight">{t.home}</span>
      </NavLink>
      <NavLink to="/orders" className={({ isActive }) => `flex flex-col items-center p-2 ${isActive ? 'text-[#2E7D32]' : 'text-gray-400'}`}>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <span className="text-[9px] font-black uppercase mt-1 tracking-tight">{t.orders}</span>
      </NavLink>
      <NavLink to="/about" className={({ isActive }) => `flex flex-col items-center p-2 ${isActive ? 'text-[#2E7D32]' : 'text-gray-400'}`}>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-[9px] font-black uppercase mt-1 tracking-tight">{t.about}</span>
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => `flex flex-col items-center p-2 ${isActive ? 'text-[#2E7D32]' : 'text-gray-400'}`}>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span className="text-[9px] font-black uppercase mt-1 tracking-tight">{t.profile}</span>
      </NavLink>
      
      {/* ॲडमिन टॅब फक्त मालकाच्या नंबरलाच दिसेल */}
      {isAdmin && (
        <NavLink to="/admin" className={({ isActive }) => `flex flex-col items-center p-2 ${isActive ? 'text-[#2E7D32]' : 'text-gray-400'}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          </svg>
          <span className="text-[9px] font-black uppercase mt-1 tracking-tight">{t.admin}</span>
        </NavLink>
      )}
    </div>
  );
};

export default BottomNav;
