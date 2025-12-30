
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Product, CartItem, Order, User, AppContent, Language } from './types';
import { INITIAL_PRODUCTS, ADMIN_PHONE } from './constants';
import { translations } from './translations';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import HomeView from './views/HomeView';
import CategoryView from './views/CategoryView';
import ProductDetailView from './views/ProductDetailView';
import CartView from './views/CartView';
import CheckoutView from './views/CheckoutView';
import ProfileView from './views/ProfileView';
import OrdersView from './views/OrdersView';
import AdminDashboard from './views/AdminDashboard';
import AboutView from './views/AboutView';
import SplashScreen from './components/SplashScreen';
import LoginView from './views/LoginView';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lang, setLang] = useState<Language>('mr');

  const t = translations[lang];
  const isAdmin = user?.phone === ADMIN_PHONE;

  const [appContent, setAppContent] = useState<AppContent>({
    homeBanner: 'https://picsum.photos/seed/herbs/800/400',
    homeTitle: '100% Natural',
    homeSubtitle: 'Handmade Ayurvedic Solutions',
    aboutHeritage: 'Radhe Krishna Ayurveda is dedicated to bringing the ancient wisdom of Indian Ayurveda to your doorstep.',
    aboutQuote: 'We believe that the best medicine grows in nature, not in a lab.'
  });

  useEffect(() => {
    const savedLang = localStorage.getItem('rk_lang') as Language;
    if (savedLang) setLang(savedLang);
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const changeLanguage = (l: Language) => {
    setLang(l);
    localStorage.setItem('rk_lang', l);
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const placeOrder = (address: string, paymentMethod: 'COD' | 'UPI') => {
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const newOrder: Order = {
      id: `RK-${Math.floor(Math.random() * 1000000)}`,
      items: [...cart],
      totalAmount: total,
      status: 'Placed',
      date: new Date().toLocaleDateString(),
      address,
      paymentMethod
    };
    setOrders([newOrder, ...orders]);
    setCart([]);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
  };

  if (isLoading) return <SplashScreen />;

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen max-w-md mx-auto bg-white shadow-xl relative overflow-hidden">
        {user && <Navbar cartCount={cart.length} currentLang={lang} onLangChange={changeLanguage} t={t} />}
        
        <main className={`flex-1 overflow-y-auto ${user ? 'pb-20 pt-16' : ''}`}>
          <Routes>
            <Route path="/login" element={!user ? <LoginView onLogin={(u) => setUser(u)} t={t} /> : <Navigate to="/" />} />
            
            <Route path="/" element={user ? <HomeView products={products} content={appContent} t={t} /> : <Navigate to="/login" />} />
            <Route path="/category/:cat" element={user ? <CategoryView products={products} /> : <Navigate to="/login" />} />
            <Route path="/product/:id" element={user ? <ProductDetailView products={products} onAddToCart={addToCart} t={t} /> : <Navigate to="/login" />} />
            <Route path="/cart" element={user ? <CartView cart={cart} onRemove={removeFromCart} onUpdateQty={updateQuantity} t={t} /> : <Navigate to="/login" />} />
            <Route path="/checkout" element={user ? <CheckoutView cart={cart} user={user} onPlaceOrder={placeOrder} t={t} /> : <Navigate to="/login" />} />
            <Route path="/profile" element={user ? <ProfileView user={user} onLogout={() => setUser(null)} currentLang={lang} onLangChange={changeLanguage} t={t} /> : <Navigate to="/login" />} />
            <Route path="/orders" element={user ? <OrdersView orders={orders} t={t} /> : <Navigate to="/login" />} />
            <Route path="/about" element={user ? <AboutView content={appContent} t={t} /> : <Navigate to="/login" />} />
            
            {/* ॲडमिन रूट प्रोटेक्ट केला आहे */}
            <Route 
              path="/admin/*" 
              element={user && isAdmin ? (
                <AdminDashboard products={products} orders={orders} setProducts={setProducts} updateOrderStatus={updateOrderStatus} appContent={appContent} setAppContent={setAppContent} />
              ) : (
                <Navigate to="/" />
              )} 
            />
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        {user && <BottomNav t={t} isAdmin={isAdmin} />}
      </div>
    </HashRouter>
  );
};

export default App;
