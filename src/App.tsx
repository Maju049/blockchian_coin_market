import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { Hosting } from './pages/Hosting';
import { StaffVerifier } from './pages/StaffVerifier';
import { Checkout } from './pages/Checkout';
import { Admin } from './pages/Admin';
import './App.css';

const AppContent: React.FC = () => {
  const { products } = useStore();
  const { cart, getCartCount } = useCart();
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // Monitor cart count to open drawer on item addition
  const prevCountRef = React.useRef(getCartCount());
  React.useEffect(() => {
    const currentCount = getCartCount();
    if (currentCount > prevCountRef.current) {
      setCartOpen(true);
    }
    prevCountRef.current = currentCount;
  }, [cart, getCartCount]);
  
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  React.useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };
  
  // Lifted filter states for global synchronization
  const [selectedAlgo, setSelectedAlgo] = useState<string>('All');
  const [selectedCoin, setSelectedCoin] = useState<string>('All');
  const [selectedCooling, setSelectedCooling] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');

  // Sync tab state with window location hash
  React.useEffect(() => {
    const handleHash = () => {
      const queryParams = new URLSearchParams(window.location.search);
      const hasOrderId = queryParams.has('orderId');
      const isSuccessRoute = window.location.pathname.includes('/success');

      if (isSuccessRoute || hasOrderId) {
        setCurrentTab('checkout');
        // Prevent infinite loops and clean URL if needed, but ensure hash matches tab
        if (window.location.hash !== '#checkout') {
          window.location.hash = 'checkout';
        }
        return;
      }

      const hash = window.location.hash.slice(1);
      if (hash === 'admin') {
        setCurrentTab('admin');
      } else if (['home', 'shop', 'hosting', 'staff', 'checkout'].includes(hash)) {
        setCurrentTab(hash);
      } else if (!hash) {
        setCurrentTab('home');
      }
    };
    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Dynamic Title & Meta Description Updater for SEO optimization
  React.useEffect(() => {
    let title = 'Apexto Mining Tech | ASIC Miners, Hydro Cooling & Hosting Solutions';
    let description = 'Authorized distributor of high-efficiency cryptocurrency ASIC miners (Bitmain Antminer, Whatsminer, Canaan), hydro-cooling container cabinets, and data center hosting solutions.';

    switch (currentTab) {
      case 'home':
        title = 'Apexto Mining Tech | Premium ASIC Miners, Hydro Cooling & Hosting';
        description = 'Explore top-performing cryptocurrency ASIC miners. Bitmain, MicroBT, Canaan miners available with professional hosting and hydro cooling cabinets.';
        break;
      case 'shop':
        if (selectedProductId) {
          const product = products.find((p) => p.id === selectedProductId);
          if (product) {
            title = `${product.name} (${product.hashrate} ${product.hashrateUnit}) | Buy Apexto Miners`;
            description = `Buy the high-efficiency ${product.name} running ${product.algorithm} algorithm for mining ${product.coins.join(', ')}. Power consumption: ${product.power}W. Genuine warranty and hosting.`;
          } else {
            title = 'ASIC Miner Inventory | Shop Bitmain Whatsminer & Canaan';
            description = 'Buy cryptocurrency mining hardware. Browse in-stock and pre-order miners, compare hash rates, efficiencies, and daily yield profitability.';
          }
        } else {
          title = 'ASIC Miner Inventory | Shop Bitmain Whatsminer & Canaan';
          description = 'Buy cryptocurrency mining hardware. Browse in-stock and pre-order miners, compare hash rates, efficiencies, and daily yield profitability.';
        }
        break;
      case 'hosting':
        title = 'ASIC Hosting Centers & Liquid Cooling Cabinets | Apexto';
        description = 'Deploy your mining rigs in secure, low PUE data centers. Professional hydro loop setups and immersion cooling containers available for rent.';
        break;
      case 'staff':
        title = 'Apexto Verification Console | Employee & Anti-Fraud Verifier';
        description = 'Verify official Apexto employee Telegram handles, WhatsApp coordinates, and email addresses to avoid impersonator scams.';
        break;
      case 'checkout':
        title = 'Secure Consolidated Checkout | Apexto Mining Tech';
        description = 'Finalize your ASIC miner purchase safely. Choose standard or expedited global shipping and pay via Bank Wire or secure Web3 crypto transfer.';
        break;
      case 'admin':
        title = 'Operations Management Console | Apexto Tech Dashboard';
        description = 'Secure operations dashboard for order tracking, inventory updates, and verified employee registers.';
        break;
    }

    document.title = title;

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }
  }, [currentTab, selectedProductId, products]);

  const changeTab = (tab: string) => {
    setCurrentTab(tab);
    window.location.hash = tab === 'home' ? '' : tab;
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedBrand('All');
    setSelectedAlgo('All');
    setSelectedCoin('All');
    setSelectedCooling('All');
    setSelectedStatus('All');
    setSelectedProductId(null);
    changeTab('shop');
  };

  const handleApplyMegaMenuFilter = (filters: { brand?: string; algo?: string; coin?: string }) => {
    setSelectedBrand(filters.brand || 'All');
    setSelectedAlgo(filters.algo || 'All');
    setSelectedCoin(filters.coin || 'All');
    setSelectedCooling('All');
    setSelectedStatus('All');
    setSearchQuery('');
    setSelectedProductId(null);
    changeTab('shop');
  };

  const handleViewProductFromHome = (productId: string | null) => {
    setSelectedProductId(productId);
    setSelectedBrand('All');
    setSelectedAlgo('All');
    setSelectedCoin('All');
    setSelectedCooling('All');
    setSelectedStatus('All');
    setSearchQuery('');
    changeTab('shop');
  };

  const renderPage = () => {
    switch (currentTab) {
      case 'home':
        return (
          <Home
            setCurrentTab={changeTab}
            setSelectedProductId={handleViewProductFromHome}
            setSelectedBrand={(brand) => {
              handleApplyMegaMenuFilter({ brand });
            }}
          />
        );
      case 'shop':
        return (
          <Shop
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedProductId={selectedProductId}
            setSelectedProductId={setSelectedProductId}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            selectedAlgo={selectedAlgo}
            setSelectedAlgo={setSelectedAlgo}
            selectedCoin={selectedCoin}
            selectedCooling={selectedCooling}
            setSelectedCooling={setSelectedCooling}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        );
      case 'hosting':
        return <Hosting />;
      case 'staff':
        return <StaffVerifier />;
      case 'checkout':
        return <Checkout setCurrentTab={changeTab} />;
      case 'admin':
        return <Admin />;
      default:
        return <Home setCurrentTab={changeTab} setSelectedProductId={handleViewProductFromHome} setSelectedBrand={setSelectedBrand} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          changeTab(tab);
          // Reset product detail and search when switching tabs manually
          if (tab !== 'shop') {
            setSelectedProductId(null);
            setSearchQuery('');
          }
        }}
        onOpenCart={() => setCartOpen(true)}
        onSearch={handleSearch}
        onApplyMegaMenuFilter={handleApplyMegaMenuFilter}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={() => {
          setCartOpen(false);
          changeTab('checkout');
        }}
      />

      {/* Main Page Area */}
      <main style={{ flex: 1 }}>
        {renderPage()}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

function App() {
  return (
    <StoreProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </StoreProvider>
  );
}

export default App;
