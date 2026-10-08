import React, { useState, useEffect } from 'react';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { CartDrawer } from './components/common/CartDrawer';
import { CartProvider, useCart } from './context/CartContext';

// Pages
import { Home } from './pages/Home';
import { FragranceNotes } from './pages/FragranceNotes';
import { CraftStory } from './pages/CraftStory';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { ScentFinder } from './pages/ScentFinder';
import { Press } from './pages/Press';
import { Contact } from './pages/Contact';

function MainAppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState('aura-edp');
  const { theme } = useCart();
  const isLight = theme === 'light';

  // Synchronize document body background
  useEffect(() => {
    if (isLight) {
      document.body.classList.remove('theme-dark');
      document.body.classList.add('theme-light');
      document.body.style.backgroundColor = '#FFFFFF';
      document.body.style.color = '#0F172A';
    } else {
      document.body.classList.remove('theme-light');
      document.body.classList.add('theme-dark');
      document.body.style.backgroundColor = '#050D1A';
      document.body.style.color = '#F3F4F6';
    }
  }, [isLight]);

  // Scroll to top upon navigating to a new page
  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (productId) => {
    setSelectedProductId(productId);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-300 selection:bg-[#B38738]/30 ${
        isLight ? 'theme-light bg-white text-[#141210]' : 'theme-dark bg-[#0D0B09] text-stone-100'
      }`}
    >
      {/* Persistent Floating Navigation with Reduced Maximum Width 
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
       */}

      {/* Global Cart Slide-over Drawer */}
      <CartDrawer />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <Home
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentPage === 'notes' && (
          <FragranceNotes
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentPage === 'craft' && (
          <CraftStory
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'shop' && (
          <Shop
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentPage === 'product-detail' && (
          <ProductDetail
            productId={selectedProductId}
            onBack={() => handleNavigate('shop')}
            onSelectOtherProduct={handleSelectProduct}
          />
        )}

        {currentPage === 'quiz' && (
          <ScentFinder
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentPage === 'press' && (
          <Press />
        )}

        {currentPage === 'contact' && (
          <Contact />
        )}
      </main>

      {/* High-fashion Editorial Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export function App() {
  return (
    <CartProvider>
      <MainAppContent />
    </CartProvider>
  );
}

export default App;
