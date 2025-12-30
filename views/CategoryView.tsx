
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '../types';

interface Props {
  products: Product[];
}

const CategoryView: React.FC<Props> = ({ products }) => {
  const { cat } = useParams();
  const navigate = useNavigate();
  const filtered = products.filter(p => p.category === cat);

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-white p-4 flex items-center gap-4 border-b">
        <button onClick={() => navigate(-1)}>
          <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-bold">{cat}</h1>
      </div>

      <div className="p-2 grid grid-cols-2 gap-2">
         {filtered.length > 0 ? (
           filtered.map(product => (
            <div 
              key={product.id} 
              onClick={() => navigate(`/product/${product.id}`)}
              className="bg-white rounded-md shadow-sm overflow-hidden border border-gray-100 flex flex-col"
            >
              <div className="h-40 bg-gray-200 relative">
                <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
                <div className="absolute top-2 left-2 bg-green-600 text-white text-[10px] px-1.5 py-0.5 rounded-sm">
                  {product.discount}% OFF
                </div>
              </div>
              <div className="p-2 flex-1">
                <h4 className="text-sm font-medium text-gray-800 line-clamp-1">{product.name}</h4>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs text-white bg-green-700 px-1 rounded flex items-center gap-0.5">
                    {product.rating} ★
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm font-bold text-gray-900">₹{product.price}</span>
                  <span className="text-[10px] text-gray-400 line-through">₹{product.mrp}</span>
                </div>
              </div>
            </div>
           ))
         ) : (
           <div className="col-span-2 text-center py-20 text-gray-500">
             No products found in this category.
           </div>
         )}
      </div>
    </div>
  );
};

export default CategoryView;
