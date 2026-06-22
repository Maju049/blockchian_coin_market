import React, { useState, useMemo } from 'react';
import { BLOG_POSTS } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';
import { useStore } from '../context/StoreContext';
import { calculateProfitCustom } from '../utils/profitCalc';
import { ShieldCheck, ArrowRight, TrendingUp, Zap, Server, ChevronRight, Award } from 'lucide-react';

interface HomeProps {
  setCurrentTab: (tab: string) => void;
  setSelectedProductId: (id: string | null) => void;
  setSelectedBrand: (brand: string) => void;
}

export const Home: React.FC<HomeProps> = ({ setCurrentTab, setSelectedProductId, setSelectedBrand }) => {
  const { products, electricityCost, setElectricityCost } = useStore();
  // Hero slider active slide
  const [activeSlide, setActiveSlide] = useState(0);

  // Profitability calculator states
  const [calcCoin, setCalcCoin] = useState('BTC');
  const [calcHash, setCalcHash] = useState(200); // TH/s for BTC, GH/s for others, etc.
  const [calcPower, setCalcPower] = useState(3500); // Watts

  // Calculate profitability using calculateProfitCustom
  const calcResults = useMemo(() => {
    let algo = 'SHA-256';
    if (calcCoin === 'BTC') algo = 'SHA-256';
    else if (calcCoin === 'LTC' || calcCoin === 'DOGE') algo = 'Scrypt';
    else if (calcCoin === 'ALPH') algo = 'Blake3';
    else if (calcCoin === 'ETC') algo = 'Etchash';

    const res = calculateProfitCustom(
      algo,
      calcCoin,
      calcHash,
      calcCoin === 'BTC' ? 'TH/s' : 'GH/s',
      calcPower,
      electricityCost
    );

    return {
      revenue: res.revenue.toFixed(2),
      cost: res.cost.toFixed(2),
      profit: res.profit.toFixed(2),
      isProfitable: res.profit > 0
    };
  }, [calcCoin, calcHash, calcPower, electricityCost]);

  const handleCoinChange = (coin: string) => {
    setCalcCoin(coin);
    if (coin === 'BTC') {
      setCalcHash(200);
      setCalcPower(3500);
    } else if (coin === 'LTC' || coin === 'DOGE') {
      setCalcHash(16);
      setCalcPower(3260);
    } else if (coin === 'ALPH') {
      setCalcHash(360); // 360 GH/s
      setCalcPower(180);
    } else if (coin === 'ETC') {
      setCalcHash(2); // 1.95 GH/s = 1950 MH/s
      setCalcPower(620);
    }
  };

  const slides = [
    {
      title: 'Antminer S21 Hydro Series',
      subtitle: 'The Next Generation Liquid Cooling Pioneer',
      description: 'Unlock 335 TH/s hashing power at a record-breaking 16.0 J/T efficiency. Built for high-density enterprise farms.',
      cta: 'Explore Hydro Shop',
      tab: 'shop',
      brand: 'Bitmain',
      bg: 'linear-gradient(135deg, #020713 30%, #00363a 100%)',
      accent: 'var(--color-blue)'
    },
    {
      title: 'Goldshell AL-Box Alephium',
      subtitle: 'Premium Silent Desktop Hashing',
      description: 'Harness 360 GH/s at just 180W power consumption. The ultimate high-yield quiet miner for home offices.',
      cta: 'Buy AL-Box Now',
      tab: 'shop',
      brand: 'Goldshell',
      bg: 'linear-gradient(135deg, #020713 30%, #4a2700 100%)',
      accent: 'var(--color-gold)'
    }
  ];

  const brands = [
    { name: 'Bitmain', count: 3, logo: 'BITMAIN' },
    { name: 'MicroBT', count: 2, logo: 'MICROBT' },
    { name: 'Goldshell', count: 1, logo: 'GOLDSHELL' },
    { name: 'Jasminer', count: 1, logo: 'JASMINER' },
    { name: 'Canaan', count: 1, logo: 'CANAAN' }
  ];

  const featuredMiners = products.slice(0, 4);

  return (
    <div className="animate-fade-in">
      {/* Hero Carousel */}
      <section style={{
        background: slides[activeSlide].bg,
        borderBottom: '1px solid var(--border-color)',
        position: 'relative',
        overflow: 'hidden',
        padding: '100px 0'
      }}>
        {/* Technical glowing layout details */}
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '400px',
          height: '400px',
          background: `radial-gradient(circle, ${slides[activeSlide].accent} 0%, transparent 70%)`,
          opacity: 0.15,
          filter: 'blur(40px)',
          pointerEvents: 'none',
          transition: 'var(--transition)'
        }} />

        <div className="container hero-grid" style={{
          alignItems: 'center',
          gap: '40px'
        }}>
          <div>
            <span style={{
              color: slides[activeSlide].accent,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              fontWeight: 700,
              fontSize: '0.82rem',
              display: 'block',
              marginBottom: '15px'
            }}>
              {slides[activeSlide].subtitle}
            </span>
            <h1 style={{
              fontSize: '3.5rem',
              lineHeight: '1.15',
              marginBottom: '20px',
              fontFamily: 'var(--font-title)',
              fontWeight: 800
            }}>
              {slides[activeSlide].title}
            </h1>
            <p style={{
              fontSize: '1.1rem',
              color: 'var(--text-secondary)',
              marginBottom: '35px',
              maxWidth: '600px'
            }}>
              {slides[activeSlide].description}
            </p>
            <div style={{ display: 'flex', gap: '15px' }}>
              <button 
                onClick={() => {
                  setSelectedBrand(slides[activeSlide].brand);
                  setCurrentTab('shop');
                }}
                className="btn btn-primary"
              >
                <span>{slides[activeSlide].cta}</span>
                <ArrowRight size={16} />
              </button>
              <button 
                onClick={() => setCurrentTab('hosting')}
                className="btn btn-secondary"
              >
                <span>Hosting Center</span>
              </button>
            </div>

            {/* Slider Dots */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '50px' }}>
              {slides.map((_, idx) => (
                <div 
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  style={{
                    width: idx === activeSlide ? '30px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    backgroundColor: idx === activeSlide ? 'var(--color-green)' : 'var(--border-color)',
                    cursor: 'pointer',
                    transition: 'var(--transition)'
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* Tech Spec Callouts */}
          <div className="desktop-only glass-panel glow-blue" style={{
            padding: '30px',
            border: '1px solid var(--border-color)'
          }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
              Current Network Hotspots
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ color: 'var(--color-green)', background: 'rgba(0,230,118,0.1)', padding: '8px', borderRadius: '6px' }}>
                  <TrendingUp size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--text-header)' }}>Alephium Mining Booming</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>ALPH coin yields are driving record demand for Goldshell boxes.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ color: 'var(--color-blue)', background: 'rgba(0,229,255,0.1)', padding: '8px', borderRadius: '6px' }}>
                  <Server size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--text-header)' }}>Hydro cooling setups active</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Farms are shifting to water loops to lower PUE ratios below 1.05.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands section */}
      <section className="section" style={{ background: 'var(--bg-section-alt)', padding: '40px 0', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '30px'
          }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Authorized Distributor
            </div>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px 40px'
            }}>
              {brands.map((b) => (
                <div 
                  key={b.name}
                  onClick={() => {
                    setSelectedBrand(b.name);
                    setCurrentTab('shop');
                  }}
                  style={{
                    fontFamily: 'var(--font-title)',
                    fontSize: '1.2rem',
                    fontWeight: 800,
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    transition: 'var(--transition)',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-green)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                >
                  {b.logo}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hot Products section */}
      <section className="section">
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '40px'
          }}>
            <div>
              <span className="badge badge-green" style={{ marginBottom: '10px' }}>In Stock</span>
              <h2>Hot Selling Hardware</h2>
            </div>
            <button 
              onClick={() => {
                setSelectedBrand('All');
                setCurrentTab('shop');
              }}
              className="btn btn-secondary"
              style={{ padding: '8px 18px', fontSize: '0.85rem' }}
            >
              <span>View All Shop</span>
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="product-grid">
            {featuredMiners.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onViewDetails={(id) => {
                  setSelectedProductId(id);
                  setCurrentTab('shop'); // shop handles switching details or filter
                }} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="section" style={{
        background: 'var(--bg-section-alt)',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div className="container calc-grid" style={{
          gap: '60px',
          alignItems: 'center'
        }}>
          {/* Specs / Intro */}
          <div>
            <span className="badge badge-blue" style={{ marginBottom: '10px' }}>Calculator</span>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '20px' }}>Estimate Daily Mining Returns</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '25px' }}>
              ASIC miner profitability is a factor of network difficulty, block rewards, hardware hash rates, and electric power costs. Use our tool to calculate net cash flow projections.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="glass-panel" style={{ padding: '16px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Zap size={20} style={{ color: 'var(--color-gold)' }} />
                <div>
                  <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)' }}>Low Power Costs</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-header)' }}>Hydro & Dielectric Liquid</span>
                </div>
              </div>
              <div className="glass-panel" style={{ padding: '16px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Award size={20} style={{ color: 'var(--color-green)' }} />
                <div>
                  <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)' }}>Genuine Hardware</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-header)' }}>100% Verified Stock</span>
                </div>
              </div>
            </div>
          </div>

          {/* Real Calculator Widget */}
          <div className="glass-panel glow-green animate-fade-in" style={{ padding: '30px' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={18} style={{ color: 'var(--color-green)' }} />
              <span>Mining Cashflow Estimator</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Select Coin */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Select Coin Algorithm</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
                  {['BTC', 'LTC', 'ALPH', 'ETC'].map((coin) => (
                    <button
                      key={coin}
                      type="button"
                      onClick={() => handleCoinChange(coin)}
                      style={{
                        padding: '10px 4px',
                        background: calcCoin === coin ? 'var(--color-green)' : 'var(--bg-input)',
                        border: '1px solid',
                        borderColor: calcCoin === coin ? 'var(--color-green)' : 'var(--border-color)',
                        color: calcCoin === coin ? 'black' : 'var(--text-primary)',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'var(--transition)'
                      }}
                    >
                      {coin}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hashrate and Power sliders */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    Hashrate ({calcCoin === 'BTC' ? 'TH/s' : calcCoin === 'ETC' ? 'GH/s' : 'GH/s'})
                  </label>
                  <input
                    type="number"
                    value={calcHash}
                    onChange={(e) => setCalcHash(Number(e.target.value))}
                    className="form-input"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Power (Watts)</label>
                  <input
                    type="number"
                    value={calcPower}
                    onChange={(e) => setCalcPower(Number(e.target.value))}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Electric cost */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Electricity Cost ($ / kWh)</label>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-header)', fontWeight: 'bold' }}>${electricityCost.toFixed(2)}/kWh</span>
                </div>
                <input
                  type="range"
                  min="0.00"
                  max="0.30"
                  step="0.01"
                  value={electricityCost}
                  onChange={(e) => setElectricityCost(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--color-green)' }}
                />
              </div>

              {/* Estimator Outputs */}
              <div style={{
                background: 'var(--bg-main)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '16px',
                marginTop: '10px',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                textAlign: 'center',
                gap: '10px'
              }}>
                <div>
                  <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)' }}>EST. DAILY REVENUE</span>
                  <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-header)' }}>${calcResults.revenue}</span>
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)' }}>POWER COST / DAY</span>
                  <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-red)' }}>-${calcResults.cost}</span>
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)' }}>NET DAILY PROFIT</span>
                  <span style={{
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    color: calcResults.isProfitable ? 'var(--color-green)' : 'var(--color-red)'
                  }}>
                    ${calcResults.profit}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verification Tool Card Callout */}
      <section className="section">
        <div className="container">
          <div className="glass-panel glow-blue verification-card" style={{
            background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-card-hover) 100%)',
            padding: '40px',
            border: '1px solid var(--border-color)',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '30px'
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
                <ShieldCheck size={24} style={{ color: 'var(--color-blue)' }} />
                <span style={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-blue)' }}>
                  Apexto Staff Verification System
                </span>
              </div>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '15px' }}>Protecting You from Impersonation Scams</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '750px', lineHeight: '1.6' }}>
                Scammers frequently target miners on Telegram and WhatsApp pretending to be Apexto sales managers and sharing fake deposit addresses. Always use our verifier to check the credentials of your sales agent before sending wire transfers.
              </p>
            </div>
            <button 
              onClick={() => setCurrentTab('staff')}
              className="btn btn-secondary"
              style={{
                alignSelf: 'center',
                borderColor: 'var(--color-blue)',
                color: 'var(--color-blue)',
                padding: '12px 28px',
                whiteSpace: 'nowrap'
              }}
            >
              <span>Verify Employee Handler</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Blog & News Section */}
      <section className="section" style={{ background: 'var(--bg-section-alt)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Market Analysis & Hashing Guides</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {BLOG_POSTS.map((post) => (
              <div key={post.id} className="glass-panel" style={{ padding: '24px' }}>
                <span className="badge badge-blue" style={{ marginBottom: '12px', fontSize: '0.7rem' }}>{post.category}</span>
                <span style={{ float: 'right', fontSize: '0.78rem', color: 'var(--text-muted)' }}>{post.date}</span>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '12px', clear: 'both' }}>{post.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '20px' }}>{post.summary}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{post.readTime}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: 'var(--color-green)', cursor: 'pointer', fontWeight: 600 }}>
                    <span>Read Article</span>
                    <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section" style={{ borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Verified Client Testimonials</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div className="glass-panel" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', gap: '2px', color: 'var(--color-gold)', marginBottom: '12px' }}>
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p style={{ fontStyle: 'italic', fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '15px' }}>
                "Ordered 10x Antminer S21s. Shipping was fully tracked and handled smoothly through Hong Kong customs. All devices came original and intact, and hash rate is averaging 202 TH/s each."
              </p>
              <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Markus V.</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Mining Pool Operator (Germany)</div>
            </div>
            <div className="glass-panel" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', gap: '2px', color: 'var(--color-gold)', marginBottom: '12px' }}>
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p style={{ fontStyle: 'italic', fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '15px' }}>
                "Setting up our hydro-cooling container using Apexto cabinets. The engineering team gave us detailed plumbing layouts and verified staff walked us through the import broker steps."
              </p>
              <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Jose R.</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Farms Manager (Texas, USA)</div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr;
        }
        @media (min-width: 769px) {
          .hero-grid {
            grid-template-columns: 1.2fr 0.8fr;
          }
        }
        .calc-grid {
          display: grid;
          grid-template-columns: 1fr;
        }
        @media (min-width: 993px) {
          .calc-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        .verification-card {
          display: flex;
          flex-direction: column;
        }
        @media (min-width: 769px) {
          .verification-card {
            flex-direction: row;
          }
        }
        @media (max-width: 768px) {
          .verification-card {
            padding: 24px !important;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};
