
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '../types';

interface Props {
  products: Product[];
  onAddToCart: (p: Product) => void;
  // Translation object
  t: any;
}

const ProductDetailView: React.FC<Props> = ({ products, onAddToCart, t }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);

  if (!product) return <div className="p-10 text-center">Product not found.</div>;

  const handleBuyNow = () => {
    onAddToCart(product);
    navigate('/cart');
  };

  return (
    <div className="pb-20">
      <div className="relative h-72 bg-gray-100">
        <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
        <button onClick={() => navigate(-1)} className="absolute top-4 left-4 bg-white/80 p-2 rounded-full shadow-md">
          <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[#2E7D32] text-[10px] font-bold uppercase tracking-wider">{product.category}</span>
            <h1 className="text-xl font-bold text-gray-900 mt-1">{product.name}</h1>
          </div>
          <div className="flex flex-col items-end">
            <div className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded font-bold">
              {product.rating} ★
            </div>
            <span className="text-[10px] text-gray-400 mt-1">{product.reviews} ratings</span>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-4">
          <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
          <span className="text-sm text-gray-400 line-through">₹{product.mrp}</span>
          <span className="text-sm text-green-600 font-bold">{product.discount}% OFF</span>
        </div>

        <div className="mt-2 text-xs text-green-700 font-medium">
          {product.stockStatus === 'In Stock' ? '● Item is available' : '● Low stock remaining'}
        </div>

        <div className="my-6 border-t border-gray-100 pt-4">
          <h3 className="text-sm font-bold text-gray-800 mb-2">Ayurvedic Benefits</h3>
          <ul className="grid grid-cols-2 gap-2">
            {product.benefits.map((b, i) => (
              <li key={i} className="flex items-center gap-2 text-[11px] text-gray-600">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="my-6">
          <h3 className="text-sm font-bold text-gray-800 mb-2">Description</h3>
          <p className="text-xs text-gray-600 leading-relaxed">{product.description}</p>
        </div>

        <div className="my-6">
          <h3 className="text-sm font-bold text-gray-800 mb-2">How to Use</h3>
          <p className="text-xs text-gray-600 leading-relaxed italic bg-yellow-50 p-3 rounded border border-yellow-100">
             "{product.usage}"
          </p>
        </div>

        <div className="my-6">
          <h3 className="text-sm font-bold text-gray-800 mb-2">Key Ingredients</h3>
          <div className="flex flex-wrap gap-2">
            {product.ingredients.map((ing, i) => (
              <span key={i} className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-700">{ing}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Actions */}
      <div className="fixed bottom-14 left-0 w-full max-w-md bg-white border-t border-gray-100 p-3 grid grid-cols-2 gap-3 z-50">
        <button 
          onClick={() => onAddToCart(product)}
          className="py-3 border border-[#2E7D32] text-[#2E7D32] font-bold text-sm rounded-sm hover:bg-green-50"
        >
          ADD TO CART
        </button>
        <button 
          onClick={handleBuyNow}
          className="py-3 bg-[#2E7D32] text-white font-bold text-sm rounded-sm shadow-md"
        >
          BUY NOW
        </button>
      </div>
    </div>
  );
};

export default ProductDetailView;
