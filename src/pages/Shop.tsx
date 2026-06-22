import React, { useState, useMemo } from 'react';
import { Product } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';
import { AsicImage } from '../components/AsicImage';
import { useCart } from '../context/CartContext';
import { useStore } from '../context/StoreContext';
import { calculateProfit, calculateProfitCustom } from '../utils/profitCalc';
import { ArrowLeft, Search, Filter, SlidersHorizontal, Check, Zap, HelpCircle, Mail, Send, CheckCircle2, Star, Plus, Minus, ChevronDown, ChevronUp } from 'lucide-react';

const defaultFaqs = [
  {
    q: "What is the warranty period for new ASIC miners?",
    a: "Brand new miners (like S23 Hyd) come with a 180-day or 365-day manufacturer warranty direct from Bitmain, Canaan, or MicroBT depending on the brand. We assist you in checking the warranty status and opening RMA support tickets if needed. Used miners do not carry a manufacturer warranty but are thoroughly tested and cleaned before shipment."
  },
  {
    q: "How does the Hydro liquid cooling loop run?",
    a: "Hydro-cooled miners require a closed water loop system, an external radiator/dry cooler, a water pump, and a CDU (Cooling Distribution Unit). Operating hydro-cooled hardware without water flow or dry coolers will cause immediate thermal shutoff and chips damage. Ensure your water is pure deionized or distilled to avoid scaling."
  },
  {
    q: "What are the accepted payment methods?",
    a: "We accept global bank wire transfers (USD, EUR, HKD) and major cryptocurrencies (USDT TRC20/ERC20, BTC, LTC, DOGE, KAS). Cryptocurrency is highly recommended for faster order clearance and immediate release of shipping allocations."
  },
  {
    q: "How long is the processing and delivery timeline?",
    a: "For in-stock miners, processing takes 2-3 business days for safety tests, repackaging, and custom declarations. Transit via DHL, FedEx, or UPS takes 5-8 business days globally. Pre-order units ship in accordance with the manufacturer's released batch schedules."
  },
  {
    q: "Who is responsible for customs clearance and import duties?",
    a: "All international shipments are dispatched DDU (Delivered Duty Unpaid). The buyer is responsible for handling import clearance and paying local custom taxes/tariffs. We can customize the declared value on the commercial invoice to optimize custom duties upon instruction."
  }
];

interface ShopProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  selectedBrand: string;
  setSelectedBrand: (brand: string) => void;
  selectedAlgo: string;
  setSelectedAlgo: (algo: string) => void;
  selectedCoin: string;
  selectedCooling: string;
  setSelectedCooling: (cooling: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

export const Shop: React.FC<ShopProps> = ({
  searchQuery,
  setSearchQuery,
  selectedProductId,
  setSelectedProductId,
  selectedBrand,
  setSelectedBrand,
  selectedAlgo,
  setSelectedAlgo,
  selectedCoin,
  selectedCooling,
  setSelectedCooling,
  selectedStatus,
  setSelectedStatus,
  sortBy,
  setSortBy,
}) => {
  const { addToCart } = useCart();
  const { products, electricityCost, setElectricityCost } = useStore();

  // Inquiry Form state
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    telegram: '',
    quantity: 1,
    message: ''
  });

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [detailsTab, setDetailsTab] = useState<'specs' | 'description' | 'faq'>('specs');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [orderQty, setOrderQty] = useState(1);

  // Detailed view product
  const detailedProduct = useMemo(() => {
    return products.find((p) => p.id === selectedProductId) || null;
  }, [selectedProductId, products]);

  // Extract unique filter options
  const algos = useMemo(() => {
    return ['All', ...Array.from(new Set(products.map((p) => p.algorithm)))];
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by Brand
    if (selectedBrand !== 'All') {
      result = result.filter((p) => p.brand === selectedBrand);
    }

    // Filter by Algo
    if (selectedAlgo !== 'All') {
      result = result.filter((p) => p.algorithm === selectedAlgo);
    }

    // Filter by Coin
    if (selectedCoin !== 'All') {
      result = result.filter((p) => p.coins.some(c => c.toLowerCase() === selectedCoin.toLowerCase()));
    }

    // Filter by Cooling
    if (selectedCooling !== 'All') {
      result = result.filter((p) => p.coolingType === selectedCooling);
    }

    // Filter by Status
    if (selectedStatus !== 'All') {
      result = result.filter((p) => p.status === selectedStatus);
    }

    // Filter by Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.algorithm.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'hashrate-desc') {
      // Basic relative sorting by hashrate (accounting for units)
      const getNormalizedHash = (p: Product) => {
        if (p.hashrateUnit === 'TH/s') return p.hashrate * 1e12;
        if (p.hashrateUnit === 'GH/s') return p.hashrate * 1e9;
        if (p.hashrateUnit === 'MH/s') return p.hashrate * 1e6;
        return p.hashrate;
      };
      result.sort((a, b) => getNormalizedHash(b) - getNormalizedHash(a));
    } else if (sortBy === 'daily-profit-desc') {
      result.sort((a, b) => {
        const profitA = calculateProfit(a, electricityCost).profit;
        const profitB = calculateProfit(b, electricityCost).profit;
        return profitB - profitA;
      });
    }

    return result;
  }, [selectedBrand, selectedAlgo, selectedCoin, selectedCooling, selectedStatus, searchQuery, sortBy, products, electricityCost]);

  // Local calculation variables for the specific product details page
  const [detailCalcHash, setDetailCalcHash] = useState<number>(0);
  const [detailCalcPower, setDetailCalcPower] = useState<number>(0);
  const [detailElecCost, setDetailElecCost] = useState<number>(0.10);

  // Sync details calculator on item load
  React.useEffect(() => {
    if (detailedProduct) {
      setDetailCalcHash(detailedProduct.hashrate);
      setDetailCalcPower(detailedProduct.power);
      setDetailElecCost(electricityCost);
      setInquirySent(false);
      setOrderQty(1);
      setActiveImgIndex(0);
      setActiveFaq(null);
      setDetailsTab('specs');
    }
  }, [detailedProduct, electricityCost]);

  const detailCalcResults = useMemo(() => {
    if (!detailedProduct) return null;
    const res = calculateProfitCustom(
      detailedProduct.algorithm,
      detailedProduct.coins[0] || 'BTC',
      detailCalcHash,
      detailedProduct.hashrateUnit,
      detailCalcPower,
      detailElecCost
    );
    return {
      revenue: res.revenue.toFixed(2),
      cost: res.cost.toFixed(2),
      profit: res.profit.toFixed(2),
      isProfitable: res.profit > 0
    };
  }, [detailedProduct, detailCalcHash, detailCalcPower, detailElecCost]);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
  };

  // Render Catalog View
  if (!detailedProduct) {
    return (
      <div className="section animate-fade-in" style={{ paddingTop: '40px' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Header info */}
            <div>
              <h1 style={{ fontSize: '2.2rem', marginBottom: '8px' }}>ASIC Miners Inventory</h1>
              <p style={{ color: 'var(--text-secondary)' }}>
                Browse our high-performance mining hardware. Price updates occur in real-time.
              </p>
            </div>

            {/* Catalog Grid layout */}
            <div style={{
              gap: '30px',
              alignItems: 'start'
            }} className="shop-grid">
              
              {/* Sidebar Filters */}
              <div className="glass-panel shop-sidebar">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                  <Filter size={16} style={{ color: 'var(--color-green)' }} />
                  <h3 style={{ fontSize: '1rem', textTransform: 'uppercase' }}>Filter Catalog</h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {/* Brand Filter */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>Manufacturer</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px' }}>
                      {['All', 'Bitmain', 'MicroBT', 'Canaan', 'Goldshell', 'Jasminer'].map((brand) => {
                        const isSelected = selectedBrand === brand;
                        return (
                          <button
                            key={brand}
                            onClick={() => setSelectedBrand(brand)}
                            style={{
                              textAlign: 'center',
                              background: isSelected ? 'rgba(0, 230, 118, 0.12)' : 'var(--bg-input)',
                              border: '1px solid',
                              borderColor: isSelected ? 'var(--color-green)' : 'var(--border-color)',
                              color: isSelected ? 'var(--color-green)' : 'var(--text-primary)',
                              fontSize: '0.82rem',
                              cursor: 'pointer',
                              padding: '6px 4px',
                              fontWeight: isSelected ? '600' : 'normal',
                              borderRadius: '4px',
                              transition: 'var(--transition)',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <span>{brand}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Algo Filter */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>Algorithm</label>
                    <select 
                      value={selectedAlgo} 
                      onChange={(e) => setSelectedAlgo(e.target.value)}
                      className="form-input"
                      style={{ padding: '8px 12px', fontSize: '0.85rem' }}
                    >
                      {algos.map((algo) => (
                        <option key={algo} value={algo}>{algo}</option>
                      ))}
                    </select>
                  </div>

                  {/* Cooling Type */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>Cooling System</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px' }}>
                      {['All', 'Air', 'Hydro'].map((type) => (
                        <button
                          key={type}
                          onClick={() => setSelectedCooling(type)}
                          style={{
                            padding: '6px 2px',
                            background: selectedCooling === type ? 'rgba(0, 229, 255, 0.15)' : 'var(--bg-input)',
                            border: '1px solid',
                            borderColor: selectedCooling === type ? 'var(--color-blue)' : 'var(--border-color)',
                            color: selectedCooling === type ? 'var(--color-blue)' : 'var(--text-primary)',
                            borderRadius: '4px',
                            fontSize: '0.78rem',
                            cursor: 'pointer',
                          }}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Availability */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>Stock Status</label>
                    <select 
                      value={selectedStatus} 
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="form-input"
                      style={{ padding: '8px 12px', fontSize: '0.85rem' }}
                    >
                      <option value="All">All Items</option>
                      <option value="In Stock">In Stock Only</option>
                      <option value="Pre-order">Pre-order Only</option>
                    </select>
                  </div>

                  {/* Electricity Cost Slider */}
                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', marginTop: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Electricity Cost</label>
                      <span style={{ fontSize: '0.82rem', fontWeight: 'bold', color: 'var(--color-green)' }}>${electricityCost.toFixed(2)}/kWh</span>
                    </div>
                    <input
                      type="range"
                      min="0.00"
                      max="0.30"
                      step="0.01"
                      value={electricityCost}
                      onChange={(e) => setElectricityCost(Number(e.target.value))}
                      style={{ width: '100%', accentColor: 'var(--color-green)', cursor: 'pointer' }}
                    />
                  </div>
                </div>
              </div>

              {/* Products Area */}
              <div>
                {/* Search and Sort Toolbar */}
                <div className="glass-panel" style={{
                  padding: '16px 20px',
                  marginBottom: '24px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px'
                }}>
                  <div style={{ position: 'relative', flex: '1', minWidth: '240px' }}>
                    <input
                      type="text"
                      placeholder="Search inventory..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="form-input"
                      style={{ paddingLeft: '36px', borderRadius: '30px', background: 'var(--bg-input)', border: '1px solid var(--border-color)' }}
                    />
                    <Search size={14} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <SlidersHorizontal size={14} style={{ color: 'var(--text-secondary)' }} />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="form-input"
                      style={{ padding: '6px 12px', fontSize: '0.82rem', width: '160px', background: 'var(--bg-input)' }}
                    >
                      <option value="featured">Sort by: Featured</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="hashrate-desc">Hashrate: High to Low</option>
                      <option value="daily-profit-desc">Sort by: Daily Profit</option>
                    </select>
                  </div>
                </div>

                {/* Catalog Grid */}
                {filteredProducts.length === 0 ? (
                  <div className="glass-panel" style={{
                    padding: '80px 20px',
                    textAlign: 'center',
                    color: 'var(--text-secondary)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <HelpCircle size={40} style={{ color: 'var(--text-muted)' }} />
                    <h3>No products match your criteria.</h3>
                    <p style={{ fontSize: '0.9rem' }}>Try broadening your search query or relaxing your filters.</p>
                  </div>
                ) : (
                  <div className="product-grid">
                    {filteredProducts.map((p) => (
                      <ProductCard key={p.id} product={p} onViewDetails={setSelectedProductId} />
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render Product Details View
  return (
    <div className="section animate-fade-in" style={{ paddingTop: '20px' }}>
      <div className="container">
        
        {/* Breadcrumb Path & Back Button Row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
            <span style={{ cursor: 'pointer', transition: 'var(--transition)' }} onClick={() => setSelectedProductId(null)} onMouseEnter={(e) => e.currentTarget.style.color = 'white'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>Home</span>
            <span>/</span>
            <span style={{ cursor: 'pointer', transition: 'var(--transition)' }} onClick={() => { setSelectedProductId(null); setSelectedBrand('All'); }} onMouseEnter={(e) => e.currentTarget.style.color = 'white'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>Miner Store</span>
            <span>/</span>
            <span style={{ cursor: 'pointer', transition: 'var(--transition)' }} onClick={() => { setSelectedProductId(null); setSelectedBrand(detailedProduct.brand); }} onMouseEnter={(e) => e.currentTarget.style.color = 'white'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>{detailedProduct.brand}</span>
            <span>/</span>
            <span style={{ color: 'var(--text-secondary)' }}>{detailedProduct.model}</span>
          </div>

          <button 
            onClick={() => setSelectedProductId(null)}
            className="btn btn-secondary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', fontSize: '0.8rem' }}
          >
            <ArrowLeft size={13} />
            <span>Back to Store</span>
          </button>
        </div>

        {/* Detailed Layout Grid */}
        <div style={{
          gap: '40px',
          alignItems: 'start',
          marginBottom: '50px'
        }} className="details-grid">
          
          {/* Left Column: Graphic / Multiple Images Gallery */}
          <div>
            {(() => {
              const productImages = detailedProduct.imageUrls && detailedProduct.imageUrls.length > 0
                ? detailedProduct.imageUrls
                : (detailedProduct.imageUrl ? [detailedProduct.imageUrl] : []);
              
              const hasImages = productImages.length > 0;
              const slides = hasImages ? [...productImages, 'vector-preview'] : ['vector-preview'];
              
              return (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {/* Large Frame */}
                  <div style={{
                    width: '100%',
                    height: '350px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'var(--bg-image-grad)',
                    borderRadius: '12px',
                    border: '1px solid var(--border-color)',
                    boxShadow: 'var(--shadow-md)',
                    overflow: 'hidden',
                    padding: '16px',
                    position: 'relative'
                  }}>
                    {slides[activeImgIndex] !== 'vector-preview' ? (
                      <img
                        src={slides[activeImgIndex]}
                        alt={detailedProduct.name}
                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', transition: 'transform 0.3s ease' }}
                      />
                    ) : (
                      <AsicImage 
                        brand={detailedProduct.brand}
                        coolingType={detailedProduct.coolingType as any}
                        hashrate={detailedProduct.hashrate}
                        hashrateUnit={detailedProduct.hashrateUnit}
                        status={detailedProduct.status}
                        width={320}
                        height={240}
                      />
                    )}
                  </div>

                  {/* Horizontal Thumbnails Row */}
                  {slides.length > 1 && (
                    <div 
                      style={{ 
                        display: 'flex', 
                        gap: '10px', 
                        marginTop: '12px', 
                        overflowX: 'auto', 
                        paddingBottom: '6px',
                        scrollbarWidth: 'thin'
                      }}
                    >
                      {slides.map((img, idx) => {
                        const isVector = img === 'vector-preview';
                        return (
                          <button
                            key={idx}
                            onClick={() => setActiveImgIndex(idx)}
                            onMouseEnter={() => setActiveImgIndex(idx)}
                            style={{
                              width: '65px',
                              height: '65px',
                              padding: '2px',
                              background: 'var(--bg-input)',
                              border: '2px solid',
                              borderColor: activeImgIndex === idx ? 'var(--color-green)' : 'var(--border-color)',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              flexShrink: 0,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              overflow: 'hidden',
                              transition: 'var(--transition)'
                            }}
                          >
                            {isVector ? (
                              <AsicImage 
                                brand={detailedProduct.brand}
                                coolingType={detailedProduct.coolingType as any}
                                hashrate={detailedProduct.hashrate}
                                hashrateUnit={detailedProduct.hashrateUnit}
                                status={detailedProduct.status}
                                width={50}
                                height={38}
                              />
                            ) : (
                              <img src={img} alt="" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Quick specifications summary in column */}
            <div className="glass-panel" style={{ padding: '20px', marginTop: '24px' }}>
              <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--text-header)', letterSpacing: '0.05em', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '12px' }}>
                Operational Profile
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Power Grid Requirement:</span>
                  <span style={{ color: 'var(--text-header)', fontWeight: 600 }}>220V-240V AC (50-60Hz)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Operating Temp Range:</span>
                  <span style={{ color: 'var(--text-header)', fontWeight: 600 }}>0°C - 40°C</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Hydro Inlet Water Temp:</span>
                  <span style={{ color: 'var(--color-blue)', fontWeight: 600 }}>{detailedProduct.coolingType === 'Hydro' ? '20°C - 35°C (Ideal)' : 'N/A (Air-cooled)'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Hardware Weight:</span>
                  <span style={{ color: 'var(--text-header)', fontWeight: 600 }}>14.5 kg / 32.0 lbs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Product Info & Purchasing controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              {/* Trustpilot Stars */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <div style={{ display: 'flex', color: 'var(--color-green)', gap: '1px' }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={13} fill="var(--color-green)" stroke="none" />
                  ))}
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <strong style={{ color: 'var(--text-header)', fontWeight: 600 }}>Trustpilot</strong> 4.9/5 based on 258 reviews
                </span>
              </div>
 
              {/* Title & Brand */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                <span className="badge badge-blue">{detailedProduct.brand}</span>
                <span className={`badge ${detailedProduct.status === 'In Stock' ? 'badge-green' : detailedProduct.status === 'Pre-order' ? 'badge-gold' : 'badge-red'}`}>
                  {detailedProduct.status}
                </span>
              </div>
              <h1 style={{ fontSize: '2.1rem', marginBottom: '14px', lineHeight: '1.2' }}>{detailedProduct.name}</h1>
              
              {/* Stock Notices / Alerts */}
              <div style={{ 
                padding: '12px 16px', 
                background: 'rgba(5, 150, 105, 0.04)', 
                border: '1px solid var(--border-color)', 
                borderRadius: '8px',
                fontSize: '0.82rem',
                color: 'var(--text-secondary)',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Check size={16} style={{ color: 'var(--color-green)', flexShrink: 0 }} />
                <span>
                  {detailedProduct.status === 'In Stock' 
                    ? 'In Stock & Ready to dispatch. Ships in 2-3 Business Days.' 
                    : 'Pre-order Allocation. Guaranteed batch dispatch. Standard manufacturing warranty applies.'
                  }
                </span>
              </div>

              {/* Price Banner */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '10px' }}>
                <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-green)' }}>
                  ${(detailedProduct.price * orderQty).toLocaleString()}
                </span>
                {orderQty > 1 && (
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    (${detailedProduct.price.toLocaleString()} each)
                  </span>
                )}
              </div>
              <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                * Excludes shipping freight costs, import custom duties, and bulk discounts.
              </span>

              {/* VIP Quote Request Block */}
              <div style={{ 
                border: '1px solid var(--border-color)', 
                borderRadius: '8px', 
                padding: '14px', 
                background: 'var(--bg-input)', 
                fontSize: '0.82rem', 
                marginBottom: '24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <strong style={{ color: 'var(--text-header)', display: 'block' }}>Ordering 10+ miners?</strong>
                  <span style={{ color: 'var(--text-secondary)' }}>Get discounted volume wholesale rates.</span>
                </div>
                <a 
                  href="#inquiry-form" 
                  style={{ 
                    color: 'var(--color-blue)', 
                    fontWeight: 'bold', 
                    textDecoration: 'underline',
                    cursor: 'pointer'
                  }}
                >
                  Request VIP Quote
                </a>
              </div>
            </div>

            {/* Quantity Selector & ATC Actions */}
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '16px', 
              alignItems: 'center', 
              borderBottom: '1px solid var(--border-color)', 
              paddingBottom: '24px' 
            }}>
              {/* Quantity Inputs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 'bold' }}>Quantity</span>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  padding: '4px'
                }}>
                  <button 
                    type="button"
                    onClick={() => setOrderQty(Math.max(1, orderQty - 1))}
                    style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '6px 12px', display: 'flex', alignItems: 'center' }}
                  >
                    <Minus size={14} />
                  </button>
                  <span style={{ padding: '0 12px', fontSize: '0.95rem', fontWeight: 'bold', color: 'var(--text-primary)', minWidth: '24px', textAlign: 'center' }}>
                    {orderQty}
                  </span>
                  <button 
                    type="button"
                    onClick={() => setOrderQty(orderQty + 1)}
                    style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '6px 12px', display: 'flex', alignItems: 'center' }}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px', flex: 1, minWidth: '240px', alignSelf: 'flex-end' }}>
                <button 
                  onClick={() => addToCart(detailedProduct, orderQty)}
                  className="btn btn-primary"
                  style={{ flex: 1, padding: '14px 24px', fontSize: '0.9rem' }}
                >
                  <span>Add to Shopping Cart</span>
                </button>
                <a 
                  href="#inquiry-form" 
                  className="btn btn-secondary" 
                  style={{ padding: '14px 20px', fontSize: '0.9rem', whiteSpace: 'nowrap' }}
                >
                  <span>Wholesale Inquiry</span>
                </a>
              </div>
            </div>

            {/* Accepted Payments Strip */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 'bold' }}>Accepted Safe Payments</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {[
                  { name: 'USD Bank Wire', bg: 'rgba(0, 229, 255, 0.08)', color: 'var(--color-blue)', border: 'rgba(0, 229, 255, 0.2)' },
                  { name: 'USDT TRC20', bg: 'rgba(0, 230, 118, 0.08)', color: 'var(--color-green)', border: 'rgba(0, 230, 118, 0.2)' },
                  { name: 'BTC (Bitcoin)', bg: 'rgba(255, 179, 0, 0.08)', color: 'var(--color-gold)', border: 'rgba(255, 179, 0, 0.2)' },
                  { name: 'LTC', bg: 'var(--bg-input)', color: 'var(--text-secondary)', border: 'var(--border-color)' },
                  { name: 'DOGE', bg: 'rgba(255, 179, 0, 0.04)', color: '#c2a633', border: 'rgba(255, 179, 0, 0.1)' },
                  { name: 'KAS (Kaspa)', bg: 'rgba(0, 229, 255, 0.04)', color: '#4cc5b9', border: 'rgba(0, 229, 255, 0.1)' }
                ].map((pay, idx) => (
                  <span 
                    key={idx}
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      padding: '4px 10px',
                      background: pay.bg,
                      color: pay.color,
                      border: '1px solid',
                      borderColor: pay.border,
                      borderRadius: '4px'
                    }}
                  >
                    {pay.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Logistics Specs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
              <div>• <strong>Shipping courier:</strong> DHL, FedEx, UPS (Standard transit: 5-8 business days).</div>
              <div>• <strong>Warranty coverage:</strong> Brand new miners have a 180-day manufacturer warranty.</div>
              <div>• <strong>Taxes & Duties:</strong> Buyer is responsible for import tariffs in destination country.</div>
            </div>
          </div>
        </div>

        {/* Tabs Detailed Information Section (Specs Table, Description, FAQs) */}
        <div className="glass-panel" style={{ padding: '30px', marginBottom: '40px' }}>
          {/* Tab Header bar */}
          <div style={{ 
            display: 'flex', 
            gap: '24px', 
            borderBottom: '1px solid var(--border-color)', 
            paddingBottom: '12px',
            marginBottom: '24px'
          }}>
            {[
              { id: 'specs', label: 'Technical Specifications' },
              { id: 'description', label: 'Product Description' },
              { id: 'faq', label: 'FAQ (Frequently Asked Questions)' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setDetailsTab(tab.id as any)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: detailsTab === tab.id ? 'var(--color-green)' : 'var(--text-secondary)',
                  fontSize: '0.95rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  padding: '4px 0',
                  position: 'relative',
                  transition: 'var(--transition)'
                }}
              >
                <span>{tab.label}</span>
                {detailsTab === tab.id && (
                  <div style={{
                    position: 'absolute',
                    bottom: '-13px',
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'var(--color-green)',
                    boxShadow: '0 0 10px var(--color-green)'
                  }} />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content selection */}
          {detailsTab === 'specs' && (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <tbody>
                  {[
                    { label: 'Manufacturer / Brand', value: detailedProduct.brand, style: { fontWeight: 'bold', color: 'white' } },
                    { label: 'Model Number', value: detailedProduct.model, style: { fontWeight: 'bold', color: 'white' } },
                    { label: 'Hashing Algorithm', value: detailedProduct.algorithm, style: { color: 'var(--color-blue)', fontWeight: 600 } },
                    { label: 'Hashrate Performance', value: `${detailedProduct.hashrate} ${detailedProduct.hashrateUnit}`, style: { color: 'white', fontWeight: 600 } },
                    { label: 'Power Consumption (on Wall)', value: `${detailedProduct.power} W (±5%)`, style: { color: 'white', fontWeight: 600 } },
                    { label: 'Energy Efficiency Ratio', value: `${detailedProduct.efficiency} ${detailedProduct.efficiencyUnit}`, style: { color: 'var(--color-green)', fontWeight: 600 } },
                    { label: 'Cooling Loop Configuration', value: `${detailedProduct.coolingType}-cooled system`, style: { color: 'white' } },
                    { label: 'Audible Noise Rating', value: `${detailedProduct.noise} dB (Low noise loop)`, style: { color: 'white' } },
                    { label: 'Dimensions (Width x Height x Length)', value: '400mm x 195mm x 290mm', style: { color: 'white' } },
                    { label: 'Net Weight (approx.)', value: '14.5 kg / 32.0 lbs', style: { color: 'white' } },
                    { label: 'Coins Mined', value: detailedProduct.coins.join(', '), style: { color: 'var(--color-blue)' } },
                    { label: 'Release Date / Market Launch', value: detailedProduct.releaseDate, style: { color: 'white' } }
                  ].map((row, idx) => (
                    <tr 
                      key={idx} 
                      style={{ 
                        borderBottom: '1px solid var(--border-color)',
                        background: idx % 2 === 0 ? 'rgba(128,128,128,0.03)' : 'transparent'
                      }}
                    >
                      <td style={{ padding: '12px 16px', color: 'var(--text-secondary)', width: '35%' }}>{row.label}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', ...row.style, color: 'var(--text-primary)' }}>{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {detailsTab === 'description' && (
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.8' }} className="reset-last-child">
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-header)', marginBottom: '12px' }}>Apexto Enterprise Hashing Solutions: {detailedProduct.name}</h3>
              <p style={{ marginBottom: '16px' }}>
                {detailedProduct.description}
              </p>
              <p style={{ marginBottom: '16px' }}>
                {detailedProduct.coolingType === 'Hydro' ? (
                  <>
                    The liquid cooling design of the <strong>{detailedProduct.name}</strong> provides critical advantages for industrial-scale deployment. By employing an active water circulation loop, heat is moved away from the SHA-256 chips quickly and uniformly. This eliminates standard hot zones inside the hardware, reducing chip wear, maintaining hash rates, and preventing thermal throttling.
                    Furthermore, hydro architectures are dust-proof, moisture-proof, and operate completely silently compared to air-cooled fans, lowering maintenance schedules and noise complaints.
                  </>
                ) : (
                  <>
                    The air-cooled system of the <strong>{detailedProduct.name}</strong> features a optimized airflow cabinet designed to maximize pressure across the mining chips. Smart fans adjust speed dynamically based on internal sensors to keep operating noise and power draw minimal.
                  </>
                )}
              </p>
              <div style={{ background: 'var(--bg-main)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px', marginTop: '20px' }}>
                <strong style={{ color: 'var(--text-header)', display: 'block', marginBottom: '8px' }}>Liquid Cooling Warning Alert (For Hydro Models)</strong>
                <p style={{ fontSize: '0.82rem', margin: 0 }}>
                  Hydro ASICs require external fluid loop setups (radiators, CDU water pumps, closed loops). Connecting the machine to a power outlet without standard water flow and dry cooler setups will trigger immediate chip thermal shutdowns and may cause irreversible core board failures. Contact our support verified managers for cabinet compatibility setups.
                </p>
              </div>
            </div>
          )}

          {detailsTab === 'faq' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {defaultFaqs.map((faq, idx) => (
                <div 
                  key={idx}
                  style={{
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    background: 'var(--bg-input)',
                    overflow: 'hidden',
                    transition: 'var(--transition)'
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      background: activeFaq === idx ? 'var(--bg-card-hover)' : 'transparent',
                      border: 'none',
                      color: 'var(--text-header)',
                      fontWeight: 600,
                      fontSize: '0.92rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '15px'
                    }}
                  >
                    <span>{faq.q}</span>
                    <span style={{ color: 'var(--color-green)', transition: 'transform 0.2s' }}>
                      {activeFaq === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  </button>
                  {activeFaq === idx && (
                    <div style={{
                      padding: '16px 20px',
                      borderTop: '1px solid var(--border-color)',
                      color: 'var(--text-secondary)',
                      fontSize: '0.88rem',
                      lineHeight: '1.6'
                    }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Integrated Yield Calculator (SHA-256 / BTC specific or relative yield factors) */}
        {detailCalcResults && (
          <div className="glass-panel glow-blue" style={{ padding: '24px', marginBottom: '40px' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={16} style={{ color: 'var(--color-blue)' }} strokeWidth={2.5} />
              <span>Interactive Yield Calculator ({detailedProduct.coins[0]})</span>
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>Hashrate Settings ({detailedProduct.hashrateUnit})</label>
                  <input
                    type="number"
                    value={detailCalcHash}
                    onChange={(e) => setDetailCalcHash(Number(e.target.value))}
                    className="form-input"
                    style={{ padding: '8px 12px', fontSize: '0.85rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>Power Wattage</label>
                  <input
                    type="number"
                    value={detailCalcPower}
                    onChange={(e) => setDetailCalcPower(Number(e.target.value))}
                    className="form-input"
                    style={{ padding: '8px 12px', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Electricity Cost ($/kWh)</label>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-header)', fontWeight: 'bold' }}>${detailElecCost.toFixed(2)}/kWh</span>
                </div>
                <input
                  type="range"
                  min="0.02"
                  max="0.25"
                  step="0.01"
                  value={detailElecCost}
                  onChange={(e) => setDetailElecCost(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--color-blue)' }}
                />
              </div>

              <div style={{
                background: 'var(--bg-main)',
                border: '1px solid var(--border-color)',
                padding: '12px',
                borderRadius: '6px',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                textAlign: 'center',
                gap: '10px'
              }}>
                <div>
                  <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-muted)' }}>REVENUE / DAY</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-header)' }}>${detailCalcResults.revenue}</span>
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-muted)' }}>POWER / DAY</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-red)' }}>-${detailCalcResults.cost}</span>
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-muted)' }}>NET PROFIT</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: detailCalcResults.isProfitable ? 'var(--color-green)' : 'var(--color-red)' }}>
                    ${detailCalcResults.profit}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Inquiry Form */}
        <div id="inquiry-form" className="glass-panel" style={{ padding: '30px' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Mail size={18} style={{ color: 'var(--color-green)' }} />
            <span>Request Custom Bulk Quote</span>
          </h3>

          {inquirySent ? (
            <div style={{
              textAlign: 'center',
              padding: '30px 10px',
              color: 'var(--text-secondary)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px'
            }}>
              <CheckCircle2 size={36} style={{ color: 'var(--color-green)' }} />
              <h4 style={{ color: 'var(--text-header)' }}>Inquiry Submitted Successfully</h4>
              <p style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
                Thank you! Your request has been logged. An authorized sales representative will contact you via email or Telegram within 4 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleInquirySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <input
                  type="text"
                  required
                  placeholder="Contact Name"
                  value={inquiryForm.name}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                  className="form-input"
                  style={{ fontSize: '0.85rem' }}
                />
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  value={inquiryForm.email}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                  className="form-input"
                  style={{ fontSize: '0.85rem' }}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <input
                  type="text"
                  placeholder="Telegram Handle (e.g. @user)"
                  value={inquiryForm.telegram}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, telegram: e.target.value })}
                  className="form-input"
                  style={{ fontSize: '0.85rem' }}
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>Quantity:</span>
                  <input
                    type="number"
                    min="1"
                    max="200"
                    value={inquiryForm.quantity}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, quantity: Number(e.target.value) })}
                    className="form-input"
                    style={{ fontSize: '0.85rem' }}
                  />
                </div>
              </div>
              <textarea
                rows={3}
                placeholder="Enter specs request, customs questions, or delivery port preferences..."
                value={inquiryForm.message}
                onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                className="form-input"
                style={{ fontSize: '0.85rem', fontFamily: 'inherit' }}
              />
              <button type="submit" className="btn btn-primary" style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                <Send size={14} />
                <span>Send Hardware Inquiry</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
