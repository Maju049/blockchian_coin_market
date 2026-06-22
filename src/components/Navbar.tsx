import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Cpu, Search, ShoppingCart, Menu, X, ShieldCheck, Server, Globe, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenCart: () => void;
  onSearch: (query: string) => void;
  onApplyMegaMenuFilter: (filters: { brand?: string; algo?: string; coin?: string }) => void;
  theme?: string;
  toggleTheme?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  onOpenCart,
  onSearch,
  onApplyMegaMenuFilter,
  theme = 'dark',
  toggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMegaMenuOpen, setMobileMegaMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { getCartCount } = useCart();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    setCurrentTab('shop');
  };

  return (
    <>
      <nav className="navbar" style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'var(--bg-nav)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-color)',
        padding: '16px 0',
        transition: 'var(--transition)'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px'
        }}>
          {/* Logo */}
          <div 
            onClick={() => setCurrentTab('home')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
            }}
          >
            <div style={{
              background: 'linear-gradient(135deg, var(--color-green) 0%, var(--color-blue) 100%)',
              padding: '8px',
              borderRadius: '8px',
              color: '#000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(0, 230, 118, 0.3)'
            }}>
              <Cpu size={22} style={{ strokeWidth: 2.5 }} />
            </div>
            <div>
              <span style={{
                fontFamily: 'var(--font-title)',
                fontWeight: 800,
                fontSize: '1.4rem',
                letterSpacing: '-0.02em',
                background: 'linear-gradient(90deg, var(--text-header) 50%, var(--text-secondary) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                APEXTO
              </span>
              <span style={{
                fontFamily: 'var(--font-title)',
                fontWeight: 500,
                fontSize: '0.85rem',
                color: 'var(--color-green)',
                display: 'block',
                marginTop: '-4px',
                letterSpacing: '0.1em',
              }}>
                MINING TECH
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="desktop-only" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '30px'
          }}>
            {/* Home */}
            <span
              onClick={() => {
                setCurrentTab('home');
              }}
              style={{
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.95rem',
                color: currentTab === 'home' ? 'var(--color-green)' : 'var(--text-secondary)',
                transition: 'var(--transition)',
                position: 'relative',
                padding: '6px 0'
              }}
            >
              Home
              {currentTab === 'home' && (
                <span style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '2px',
                  backgroundColor: 'var(--color-green)',
                  boxShadow: '0 0 8px var(--color-green)'
                }} />
              )}
            </span>

            {/* Miner Store Mega Menu Dropdown */}
            <div className="mega-menu-container" style={{ position: 'relative' }}>
              <span
                onClick={() => {
                  setCurrentTab('shop');
                }}
                style={{
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  color: currentTab === 'shop' ? 'var(--color-green)' : 'var(--text-secondary)',
                  transition: 'var(--transition)',
                  position: 'relative',
                  padding: '16px 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                Miner Store
                <span style={{ fontSize: '0.6rem', transition: 'var(--transition)' }}>▼</span>
                {currentTab === 'shop' && (
                  <span style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '2px',
                    backgroundColor: 'var(--color-green)',
                    boxShadow: '0 0 8px var(--color-green)'
                  }} />
                )}
              </span>

              {/* Mega Dropdown Panel */}
              <div className="mega-menu-dropdown" style={{
                position: 'absolute',
                top: '100%',
                left: '-200px',
                width: '980px',
                background: 'var(--bg-card-hover)',
                backdropFilter: 'blur(20px)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                boxShadow: theme === 'dark' ? '0 20px 50px rgba(0,0,0,0.8), var(--shadow-glow-blue)' : 'var(--shadow-lg)',
                padding: '24px 30px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1.2fr',
                gap: '24px',
                visibility: 'hidden',
                opacity: 0,
                transform: 'translateY(10px)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                zIndex: 9999
              }}>
                {/* Column 1: Shop by Brand */}
                <div>
                  <h4 style={{ color: 'var(--text-header)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
                    Shop by Brand
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
                    {['Bitmain', 'MicroBT', 'Canaan', 'Goldshell', 'Jasminer', 'IceRiver', 'Elphapex'].map((b) => (
                      <span
                        key={b}
                        onClick={() => onApplyMegaMenuFilter({ brand: b })}
                        style={{ cursor: 'pointer', color: 'var(--text-secondary)', transition: 'var(--transition)' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-green)'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                      >
                        {b} {b === 'Bitmain' || b === 'MicroBT' || b === 'Canaan' ? 'Miner' : ''}
                      </span>
                    ))}
                    <span
                      onClick={() => onApplyMegaMenuFilter({})}
                      style={{ cursor: 'pointer', color: 'var(--color-blue)', fontWeight: 'bold', fontSize: '0.8rem', marginTop: '6px' }}
                    >
                      View All Brands &gt;&gt;
                    </span>
                  </div>
                </div>

                {/* Column 2: Shop by Coin */}
                <div>
                  <h4 style={{ color: 'var(--text-header)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
                    Shop by Coin
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
                    {[
                      { name: 'Bitcoin', symbol: 'BTC' },
                      { name: 'Dogecoin', symbol: 'DOGE' },
                      { name: 'Litecoin', symbol: 'LTC' },
                      { name: 'Alephium', symbol: 'ALPH' },
                      { name: 'Ethereum Classic', symbol: 'ETC' },
                      { name: 'Kaspa', symbol: 'KAS' },
                      { name: 'Aleo', symbol: 'ALEO' }
                    ].map((c) => (
                      <span
                        key={c.symbol}
                        onClick={() => onApplyMegaMenuFilter({ coin: c.symbol })}
                        style={{ cursor: 'pointer', color: 'var(--text-secondary)', transition: 'var(--transition)' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-green)'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                      >
                        {c.name} ({c.symbol})
                      </span>
                    ))}
                    <span
                      onClick={() => onApplyMegaMenuFilter({})}
                      style={{ cursor: 'pointer', color: 'var(--color-blue)', fontWeight: 'bold', fontSize: '0.8rem', marginTop: '6px' }}
                    >
                      View All Coins &gt;&gt;
                    </span>
                  </div>
                </div>

                {/* Column 3: Shop by Algorithm */}
                <div>
                  <h4 style={{ color: 'var(--text-header)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
                    Shop by Algorithm
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
                    {['SHA-256', 'Scrypt', 'Blake3', 'Etchash', 'KHeavyHash', 'Ethash'].map((a) => (
                      <span
                        key={a}
                        onClick={() => onApplyMegaMenuFilter({ algo: a })}
                        style={{ cursor: 'pointer', color: 'var(--text-secondary)', transition: 'var(--transition)' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-green)'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                      >
                        {a}
                      </span>
                    ))}
                    <span
                      onClick={() => onApplyMegaMenuFilter({})}
                      style={{ cursor: 'pointer', color: 'var(--color-blue)', fontWeight: 'bold', fontSize: '0.8rem', marginTop: '6px' }}
                    >
                      View All Algos &gt;&gt;
                    </span>
                  </div>
                </div>

                {/* Column 4: Hot Miner Promo Banners */}
                <div style={{
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.68rem', background: 'var(--color-red)', color: 'white', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase', fontWeight: 'bold' }}>Hot Sale</span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--color-green)', fontWeight: 'bold' }}>$6,800 USD</span>
                  </div>
                  <h5 style={{ fontSize: '0.92rem', color: 'var(--text-header)', margin: 0 }}>Antminer S21 Hydro 335T</h5>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>
                    Experience the ultimate hashing power of 335 TH/s at 16.0 J/T efficiency.
                  </p>
                  
                  {/* Miniature decorative pipe */}
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', background: 'var(--bg-main)', padding: '6px 10px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-blue)' }} />
                    <span style={{ fontSize: '0.7rem', color: 'var(--color-blue)', fontFamily: 'monospace' }}>LIQUID COOLING</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onApplyMegaMenuFilter({ brand: 'Bitmain' });
                    }}
                    style={{
                      marginTop: 'auto',
                      padding: '8px',
                      background: 'var(--color-green)',
                      color: 'black',
                      fontWeight: 'bold',
                      border: 'none',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      transition: 'var(--transition)'
                    }}
                  >
                    Configure In Shop
                  </button>
                </div>

              </div>
            </div>

            {/* Hosting & Hydro */}
            <span
              onClick={() => {
                setCurrentTab('hosting');
              }}
              style={{
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.95rem',
                color: currentTab === 'hosting' ? 'var(--color-green)' : 'var(--text-secondary)',
                transition: 'var(--transition)',
                position: 'relative',
                padding: '6px 0'
              }}
            >
              Hosting & Hydro
              {currentTab === 'hosting' && (
                <span style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '2px',
                  backgroundColor: 'var(--color-green)',
                  boxShadow: '0 0 8px var(--color-green)'
                }} />
              )}
            </span>

            {/* Staff Verifier */}
            <span
              onClick={() => {
                setCurrentTab('staff');
              }}
              style={{
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.95rem',
                color: currentTab === 'staff' ? 'var(--color-green)' : 'var(--text-secondary)',
                transition: 'var(--transition)',
                position: 'relative',
                padding: '6px 0'
              }}
            >
              Staff Verifier
              {currentTab === 'staff' && (
                <span style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '2px',
                  backgroundColor: 'var(--color-green)',
                  boxShadow: '0 0 8px var(--color-green)'
                }} />
              )}
            </span>
          </div>

          {/* Search & Actions */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <form onSubmit={handleSearchSubmit} className="desktop-only" style={{
              position: 'relative'
            }}>
              <input
                type="text"
                placeholder="Search miners (e.g. S21)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                style={{
                  padding: '8px 16px 8px 36px',
                  borderRadius: '30px',
                  fontSize: '0.85rem',
                  width: '220px',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-color)',
                }}
              />
              <Search size={14} style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)'
              }} />
            </form>

            {/* Currency/Lang toggle */}
            <div className="desktop-only" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              background: 'var(--bg-input)',
              padding: '6px 12px',
              borderRadius: '30px',
              border: '1px solid var(--border-color)'
            }}>
              <Globe size={14} />
              <span>EN / USD</span>
            </div>

            {/* Theme Toggle Switcher */}
            <div 
              onClick={toggleTheme}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                background: 'var(--bg-input)',
                padding: '10px',
                borderRadius: '50%',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                transition: 'var(--transition)'
              }}
              className="cart-icon-btn"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </div>

            {/* Cart Icon */}
            <div 
              onClick={onOpenCart}
              style={{
                position: 'relative',
                cursor: 'pointer',
                background: 'var(--bg-input)',
                padding: '10px',
                borderRadius: '50%',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'var(--transition)'
              }}
              className="cart-icon-btn"
            >
              <ShoppingCart size={18} style={{ color: 'var(--text-primary)' }} />
              {getCartCount() > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  background: 'linear-gradient(135deg, var(--color-green) 0%, #00b0ff 100%)',
                  color: '#000000',
                  fontWeight: 'bold',
                  fontSize: '0.7rem',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 8px rgba(0,230,118,0.5)'
                }}>
                  {getCartCount()}
                </span>
              )}
            </div>

            {/* Mobile Menu Icon */}
            <div 
              className="mobile-only"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                cursor: 'pointer',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            background: 'var(--bg-main)',
            borderBottom: '1px solid var(--border-color)',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxShadow: 'var(--shadow-lg)',
            zIndex: 99
          }} className="mobile-only">
            {/* Home */}
            <div
              onClick={() => {
                setCurrentTab('home');
                setMobileMenuOpen(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 0',
                borderBottom: '1px solid var(--border-color)',
                cursor: 'pointer',
                color: currentTab === 'home' ? 'var(--color-green)' : 'var(--text-secondary)',
                fontWeight: 600
              }}
            >
              <Cpu size={16} />
              <span>Home</span>
            </div>

            {/* Miner Store Accordion */}
            <div>
              <div
                onClick={() => {
                  setMobileMegaMenuOpen(!mobileMegaMenuOpen);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 0',
                  borderBottom: '1px solid var(--border-color)',
                  cursor: 'pointer',
                  color: currentTab === 'shop' ? 'var(--color-green)' : 'var(--text-secondary)',
                  fontWeight: 600
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Cpu size={16} />
                  <span>Miner Store</span>
                </div>
                <span style={{ fontSize: '0.8rem' }}>{mobileMegaMenuOpen ? '▲' : '▼'}</span>
              </div>

              {mobileMegaMenuOpen && (
                <div style={{
                  padding: '10px 0 10px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px',
                  borderBottom: '1px solid var(--border-color)'
                }}>
                  {/* Brands */}
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px', textTransform: 'uppercase', fontWeight: 'bold' }}>Brands</span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {['Bitmain', 'MicroBT', 'Canaan', 'Goldshell', 'Jasminer', 'IceRiver'].map(b => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => {
                            onApplyMegaMenuFilter({ brand: b });
                            setMobileMenuOpen(false);
                          }}
                          style={{
                            padding: '4px 8px',
                            background: 'var(--bg-input)',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-primary)',
                            fontSize: '0.75rem',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Coins */}
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px', textTransform: 'uppercase', fontWeight: 'bold' }}>Coins</span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {['BTC', 'LTC', 'DOGE', 'ALPH', 'ETC'].map(coin => (
                        <button
                          key={coin}
                          type="button"
                          onClick={() => {
                            onApplyMegaMenuFilter({ coin });
                            setMobileMenuOpen(false);
                          }}
                          style={{
                            padding: '4px 8px',
                            background: 'var(--bg-input)',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-primary)',
                            fontSize: '0.75rem',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          {coin}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Hosting */}
            <div
              onClick={() => {
                setCurrentTab('hosting');
                setMobileMenuOpen(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 0',
                borderBottom: '1px solid var(--border-color)',
                cursor: 'pointer',
                color: currentTab === 'hosting' ? 'var(--color-green)' : 'var(--text-secondary)',
                fontWeight: 600
              }}
            >
              <Server size={16} />
              <span>Hosting & Hydro</span>
            </div>

            {/* Staff Verifier */}
            <div
              onClick={() => {
                setCurrentTab('staff');
                setMobileMenuOpen(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 0',
                borderBottom: '1px solid var(--border-color)',
                cursor: 'pointer',
                color: currentTab === 'staff' ? 'var(--color-green)' : 'var(--text-secondary)',
                fontWeight: 600
              }}
            >
              <ShieldCheck size={16} />
              <span>Staff Verifier</span>
            </div>
            
            <form onSubmit={handleSearchSubmit} style={{
              position: 'relative',
              width: '100%',
              marginTop: '8px'
            }}>
              <input
                type="text"
                placeholder="Search miners..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                style={{
                  paddingLeft: '36px',
                  borderRadius: '30px',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-color)',
                }}
              />
              <Search size={14} style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)'
              }} />
            </form>
          </div>
        )}
      </nav>

      {/* Styled JSX/CSS for layout helper (since standard CSS has desktop/mobile classes) */}
      <style>{`
        @media (min-width: 769px) {
          .mobile-only { display: none !important; }
        }
        @media (max-width: 768px) {
          .desktop-only { display: none !important; }
        }
        .navbar .cart-icon-btn:hover {
          border-color: var(--color-green) !important;
          box-shadow: 0 0 12px rgba(0, 230, 118, 0.15);
        }
        /* Mega Menu trigger hover styling */
        .mega-menu-container:hover .mega-menu-dropdown {
          visibility: visible !important;
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </>
  );
};
