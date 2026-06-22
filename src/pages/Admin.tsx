import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../data/mockData';
import { ShieldCheck, ShieldAlert, Cpu, ShoppingBag, Users, Trash2, Plus, Edit2, Lock, Star, ArrowUp, ArrowDown, Settings } from 'lucide-react';

export const Admin: React.FC = () => {
  const {
    products,
    staff,
    orders,
    scams,
    paymentSettings,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
    addStaff,
    removeStaff,
    addScam,
    updatePaymentSettings
  } = useStore();

  // Authentication
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');

  // Tab State
  const [adminTab, setAdminTab] = useState<'orders' | 'products' | 'staff' | 'settings'>('orders');

  // Payment settings state
  const [settingsForm, setSettingsForm] = useState(() => ({
    usdtAddress: paymentSettings?.usdtAddress || '',
    btcAddress: paymentSettings?.btcAddress || '',
    ethAddress: paymentSettings?.ethAddress || '',
    ltcAddress: paymentSettings?.ltcAddress || '',
    dogeAddress: paymentSettings?.dogeAddress || '',
    kasAddress: paymentSettings?.kasAddress || '',
    solAddress: paymentSettings?.solAddress || '',
    tronAddress: paymentSettings?.tronAddress || '',
    bchAddress: paymentSettings?.bchAddress || '',
    xrpAddress: paymentSettings?.xrpAddress || '',
    xlmAddress: paymentSettings?.xlmAddress || '',
    xmrAddress: paymentSettings?.xmrAddress || '',
    usdtQr: paymentSettings?.usdtQr || '',
    btcQr: paymentSettings?.btcQr || '',
    ethQr: paymentSettings?.ethQr || '',
    ltcQr: paymentSettings?.ltcQr || '',
    dogeQr: paymentSettings?.dogeQr || '',
    kasQr: paymentSettings?.kasQr || '',
    solQr: paymentSettings?.solQr || '',
    tronQr: paymentSettings?.tronQr || '',
    bchQr: paymentSettings?.bchQr || '',
    xrpQr: paymentSettings?.xrpQr || '',
    xlmQr: paymentSettings?.xlmQr || '',
    xmrQr: paymentSettings?.xmrQr || '',
    bankBeneficiary: paymentSettings?.bankBeneficiary || '',
    bankName: paymentSettings?.bankName || '',
    bankSwift: paymentSettings?.bankSwift || '',
    bankAccount: paymentSettings?.bankAccount || '',
    useNowPayments: paymentSettings?.useNowPayments ?? false,
    nowpaymentsApiKey: paymentSettings?.nowpaymentsApiKey || '',
    nowpaymentsIpnSecret: paymentSettings?.nowpaymentsIpnSecret || ''
  }));

  const [settingsSaved, setSettingsSaved] = useState(false);

  React.useEffect(() => {
    if (paymentSettings) {
      setSettingsForm({
        usdtAddress: paymentSettings.usdtAddress,
        btcAddress: paymentSettings.btcAddress,
        ethAddress: paymentSettings.ethAddress || '',
        ltcAddress: paymentSettings.ltcAddress || '',
        dogeAddress: paymentSettings.dogeAddress || '',
        kasAddress: paymentSettings.kasAddress || '',
        solAddress: paymentSettings.solAddress || '',
        tronAddress: paymentSettings.tronAddress || '',
        bchAddress: paymentSettings.bchAddress || '',
        xrpAddress: paymentSettings.xrpAddress || '',
        xlmAddress: paymentSettings.xlmAddress || '',
        xmrAddress: paymentSettings.xmrAddress || '',
        usdtQr: paymentSettings.usdtQr || '',
        btcQr: paymentSettings.btcQr || '',
        ethQr: paymentSettings.ethQr || '',
        ltcQr: paymentSettings.ltcQr || '',
        dogeQr: paymentSettings.dogeQr || '',
        kasQr: paymentSettings.kasQr || '',
        solQr: paymentSettings.solQr || '',
        tronQr: paymentSettings.tronQr || '',
        bchQr: paymentSettings.bchQr || '',
        xrpQr: paymentSettings.xrpQr || '',
        xlmQr: paymentSettings.xlmQr || '',
        xmrQr: paymentSettings.xmrQr || '',
        bankBeneficiary: paymentSettings.bankBeneficiary,
        bankName: paymentSettings.bankName,
        bankSwift: paymentSettings.bankSwift,
        bankAccount: paymentSettings.bankAccount,
        useNowPayments: paymentSettings.useNowPayments ?? false,
        nowpaymentsApiKey: paymentSettings.nowpaymentsApiKey || '',
        nowpaymentsIpnSecret: paymentSettings.nowpaymentsIpnSecret || ''
      });
    }
  }, [paymentSettings]);

  const renderCryptoField = (
    label: string,
    addressKey: keyof typeof settingsForm,
    qrKey: keyof typeof settingsForm,
    placeholder: string
  ) => {
    const addressValue = settingsForm[addressKey] as string;
    const qrValue = settingsForm[qrKey] as string;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (uploadEvent) => {
          setSettingsForm(prev => ({
            ...prev,
            [qrKey]: uploadEvent.target?.result as string
          }));
        };
        reader.readAsDataURL(file);
      }
    };

    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '16px', alignItems: 'end' }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>
            {label}
          </label>
          <input
            type="text"
            required
            value={addressValue}
            onChange={(e) => setSettingsForm(prev => ({ ...prev, [addressKey]: e.target.value }))}
            className="form-input"
            placeholder={placeholder}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', alignSelf: 'start' }}>
            Custom QR
          </label>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {qrValue ? (
              <div style={{
                position: 'relative',
                width: '38px',
                height: '38px',
                border: '1px solid var(--border-color)',
                borderRadius: '4px',
                overflow: 'hidden',
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img src={qrValue} alt="QR" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                <button
                  type="button"
                  onClick={() => setSettingsForm(prev => ({ ...prev, [qrKey]: '' }))}
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    background: 'rgba(0,0,0,0.6)',
                    border: 'none',
                    color: 'white',
                    borderRadius: '50%',
                    width: '16px',
                    height: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: '10px'
                  }}
                >
                  ✕
                </button>
              </div>
            ) : (
              <label style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '38px',
                height: '38px',
                border: '1px dashed var(--border-color)',
                borderRadius: '4px',
                background: 'rgba(255,255,255,0.02)',
                cursor: 'pointer',
                fontSize: '1.1rem',
                color: 'var(--text-muted)'
              }} title="Upload custom QR code image">
                📤
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
              </label>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Product Manager State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  // Form states
  const [productForm, setProductForm] = useState<Omit<Product, 'id'>>({
    name: '',
    brand: 'Bitmain',
    model: '',
    price: 3500,
    hashrate: 180,
    hashrateUnit: 'TH/s',
    power: 3200,
    algorithm: 'SHA-256',
    coins: ['BTC'],
    efficiency: 18.0,
    efficiencyUnit: 'J/T',
    status: 'In Stock',
    releaseDate: new Date().toISOString().split('T')[0].substring(0, 7),
    noise: 75,
    coolingType: 'Air',
    description: '',
    imageUrl: '',
    imageUrls: []
  });

  const [remoteUrlInput, setRemoteUrlInput] = useState('');

  // Staff Form state
  const [isAddingStaff, setIsAddingStaff] = useState(false);
  const [staffForm, setStaffForm] = useState({
    name: '',
    role: '',
    email: '',
    telegram: '',
    whatsapp: '',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    verified: true
  });

  // Scam Form state
  const [isAddingScam, setIsAddingScam] = useState(false);
  const [scamForm, setScamForm] = useState({
    handle: '',
    warning: ''
  });

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim().toLowerCase() === 'admin') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Access Denied. Invalid passcode (Hint: admin).');
    }
  };

  // Handle Product CRUD
  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Auto populate coins based on Algorithm
    let coins = ['BTC'];
    let effUnit: Product['efficiencyUnit'] = 'J/T';
    let hashUnit: Product['hashrateUnit'] = 'TH/s';

    if (productForm.algorithm === 'Scrypt') {
      coins = ['LTC', 'DOGE'];
      effUnit = 'J/G';
      hashUnit = 'GH/s';
    } else if (productForm.algorithm === 'Blake3') {
      coins = ['ALPH'];
      effUnit = 'J/G';
      hashUnit = 'GH/s';
    } else if (productForm.algorithm === 'Etchash' || productForm.algorithm === 'Ethash') {
      coins = ['ETC'];
      effUnit = 'J/M';
      hashUnit = 'MH/s';
    }

    const payload = {
      ...productForm,
      coins,
      efficiencyUnit: effUnit,
      hashrateUnit: hashUnit
    };

    if (editingProduct) {
      updateProduct({
        ...payload,
        id: editingProduct.id
      });
      setEditingProduct(null);
    } else {
      addProduct(payload);
      setIsAddingProduct(false);
    }

    // Reset Form
    resetProductForm();
  };

  const handleEditProductClick = (p: Product) => {
    setEditingProduct(p);
    setIsAddingProduct(true);
    setProductForm({
      name: p.name,
      brand: p.brand,
      model: p.model,
      price: p.price,
      hashrate: p.hashrate,
      hashrateUnit: p.hashrateUnit,
      power: p.power,
      algorithm: p.algorithm,
      coins: p.coins,
      efficiency: p.efficiency,
      efficiencyUnit: p.efficiencyUnit,
      status: p.status,
      releaseDate: p.releaseDate,
      noise: p.noise,
      coolingType: p.coolingType,
      description: p.description,
      imageUrl: p.imageUrl || '',
      imageUrls: p.imageUrls || (p.imageUrl ? [p.imageUrl] : [])
    });
  };

  const resetProductForm = () => {
    setProductForm({
      name: '',
      brand: 'Bitmain',
      model: '',
      price: 3500,
      hashrate: 180,
      hashrateUnit: 'TH/s',
      power: 3200,
      algorithm: 'SHA-256',
      coins: ['BTC'],
      efficiency: 18.0,
      efficiencyUnit: 'J/T',
      status: 'In Stock',
      releaseDate: '2026-06',
      noise: 75,
      coolingType: 'Air',
      description: '',
      imageUrl: '',
      imageUrls: []
    });
    setRemoteUrlInput('');
  };

  const handleImageFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        if (file.size > 250000) {
          alert(`Warning: Image "${file.name}" size is over 250KB. Please compress files to prevent LocalStorage memory limit issues.`);
        }
        const reader = new FileReader();
        reader.onloadend = () => {
          setProductForm((prev) => {
            const currentUrls = prev.imageUrls || (prev.imageUrl ? [prev.imageUrl] : []);
            const nextUrls = [...currentUrls, reader.result as string];
            return {
              ...prev,
              imageUrls: nextUrls,
              imageUrl: nextUrls[0]
            };
          });
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleAddRemoteUrl = (url: string) => {
    if (!url.trim()) return;
    setProductForm((prev) => {
      const currentUrls = prev.imageUrls || (prev.imageUrl ? [prev.imageUrl] : []);
      const nextUrls = [...currentUrls, url.trim()];
      return {
        ...prev,
        imageUrls: nextUrls,
        imageUrl: nextUrls[0]
      };
    });
    setRemoteUrlInput('');
  };

  const handleRemoveImageUrl = (index: number) => {
    setProductForm((prev) => {
      const currentUrls = prev.imageUrls || (prev.imageUrl ? [prev.imageUrl] : []);
      const nextUrls = currentUrls.filter((_, idx) => idx !== index);
      return {
        ...prev,
        imageUrls: nextUrls,
        imageUrl: nextUrls.length > 0 ? nextUrls[0] : ''
      };
    });
  };

  const handleMoveImage = (index: number, direction: 'up' | 'down') => {
    setProductForm((prev) => {
      const currentUrls = [...(prev.imageUrls || (prev.imageUrl ? [prev.imageUrl] : []))];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= currentUrls.length) return prev;
      const temp = currentUrls[index];
      currentUrls[index] = currentUrls[targetIndex];
      currentUrls[targetIndex] = temp;
      return {
        ...prev,
        imageUrls: currentUrls,
        imageUrl: currentUrls[0]
      };
    });
  };

  const handleSetAsPrimary = (index: number) => {
    setProductForm((prev) => {
      const currentUrls = [...(prev.imageUrls || (prev.imageUrl ? [prev.imageUrl] : []))];
      if (index <= 0 || index >= currentUrls.length) return prev;
      const [target] = currentUrls.splice(index, 1);
      currentUrls.unshift(target);
      return {
        ...prev,
        imageUrls: currentUrls,
        imageUrl: currentUrls[0]
      };
    });
  };

  // Handle Staff Registration
  const handleStaffSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addStaff(staffForm);
    setIsAddingStaff(false);
    setStaffForm({
      name: '',
      role: '',
      email: '',
      telegram: '',
      whatsapp: '',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
      verified: true
    });
  };

  // Handle Scam Registration
  const handleScamSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addScam(scamForm.handle, scamForm.warning);
    setIsAddingScam(false);
    setScamForm({
      handle: '',
      warning: ''
    });
  };

  // Render Login Shield
  if (!isAuthenticated) {
    return (
      <div className="section animate-fade-in" style={{ paddingTop: '80px', display: 'flex', justifyContent: 'center' }}>
        <div className="glass-panel" style={{ padding: '40px', maxWidth: '400px', width: '100%', textAlign: 'center' }}>
          <div style={{
            background: 'rgba(255, 179, 0, 0.1)',
            padding: '16px',
            borderRadius: '50%',
            color: 'var(--color-gold)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
            border: '1px solid rgba(255,179,0,0.2)'
          }}>
            <Lock size={28} />
          </div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Secure Administration Shield</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '24px' }}>
            Authorized developer access only. Enter passcode to manage orders and CRUD product items.
          </p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input
              type="password"
              required
              placeholder="Enter passcode (hint: admin)"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="form-input"
              style={{ textAlign: 'center', fontSize: '1rem', letterSpacing: '0.2em' }}
            />
            {authError && (
              <p style={{ color: 'var(--color-red)', fontSize: '0.8rem', fontWeight: 600 }}>{authError}</p>
            )}
            <button type="submit" className="btn btn-accent" style={{ height: '44px' }}>
              Authenticate Access
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Render Dashboard
  return (
    <div className="section animate-fade-in" style={{ paddingTop: '40px' }}>
      <div className="container">
        
        {/* Dashboard Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid var(--border-color)', paddingBottom: '20px' }}>
          <div>
            <span className="badge badge-gold" style={{ marginBottom: '8px' }}>Store Administration</span>
            <h1 style={{ fontSize: '2.2rem', marginBottom: 0 }}>Tech Operations Dashboard</h1>
          </div>
          
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="btn btn-secondary"
            style={{ fontSize: '0.8rem', padding: '8px 16px' }}
          >
            Lock Terminal
          </button>
        </div>

        {/* Dashboard Tabs Bar */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '30px',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          paddingBottom: '12px'
        }}>
          {[
            { id: 'orders', label: `Orders (${orders.length})`, icon: <ShoppingBag size={15} /> },
            { id: 'products', label: `Products (${products.length})`, icon: <Cpu size={15} /> },
            { id: 'staff', label: 'Staff & Security', icon: <Users size={15} /> },
            { id: 'settings', label: 'Payment Settings', icon: <Settings size={15} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setAdminTab(tab.id as any);
                setIsAddingProduct(false);
                setEditingProduct(null);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                background: adminTab === tab.id ? 'var(--bg-card-hover)' : 'transparent',
                borderColor: adminTab === tab.id ? 'var(--color-gold)' : 'transparent',
                borderWidth: '1px',
                borderStyle: 'solid',
                color: adminTab === tab.id ? 'var(--color-gold)' : 'var(--text-secondary)',
                borderRadius: '6px',
                fontSize: '0.88rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'var(--transition)'
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab content selection */}
        {adminTab === 'orders' && (
          /* ORDERS LOG TAB */
          <div className="glass-panel" style={{ padding: '30px' }}>
            <h2 style={{ fontSize: '1.3rem', marginBottom: '20px', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <ShoppingBag size={18} style={{ color: 'var(--color-gold)' }} />
              <span>Incoming Order Dispatch Registers</span>
            </h2>

            {orders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
                <p>No orders registered yet. Run a checkout flow in the storefront to log invoices.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {orders.map((order) => (
                  <div 
                    key={order.id}
                    style={{
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      background: 'rgba(0,0,0,0.2)',
                      padding: '20px',
                      fontSize: '0.88rem'
                    }}
                  >
                    {/* Order header summary */}
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '12px',
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                      paddingBottom: '12px',
                      marginBottom: '12px'
                    }}>
                      <div>
                        <strong style={{ color: 'white', fontSize: '0.95rem' }}>{order.id}</strong>
                        <span style={{ color: 'var(--text-muted)', marginLeft: '10px' }}>({order.date})</span>
                      </div>
                      
                      {/* Update status selector */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Status:</span>
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                          className="form-input"
                          style={{
                            padding: '4px 10px',
                            fontSize: '0.8rem',
                            width: '150px',
                            background: '#090f20',
                            borderColor: order.status === 'Delivered' ? 'var(--color-green)' : order.status === 'Cancelled' ? 'var(--color-red)' : 'var(--color-gold)'
                          }}
                        >
                          <option value="Pending Payment">Pending Payment</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    {/* Order contents grid */}
                    <div style={{
                      gap: '20px'
                    }} className="order-details-grid">
                      {/* Client Delivery Port info */}
                      <div>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', marginBottom: '6px' }}>Client Shipping Coordinates</span>
                        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                          <div><strong>{order.customer.firstName} {order.customer.lastName}</strong> ({order.customer.email})</div>
                          <div>Address: {order.customer.address}, {order.customer.city}, {order.customer.country}</div>
                          <div>ZIP: {order.customer.zip} | Phone: {order.customer.phone}</div>
                          <div style={{ marginTop: '8px', fontSize: '0.8rem' }}>Payment Method: <strong style={{ color: 'white' }}>{order.paymentMethod === 'crypto' ? (order.cryptoCoin ? `Crypto (${order.cryptoCoin})` : 'Crypto') : 'Bank Wire Transfer'}</strong></div>
                        </div>
                      </div>

                      {/* Items lists */}
                      <div style={{ borderLeft: '1px solid rgba(255,255,255,0.03)', paddingLeft: '20px' }} className="order-items-column">
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', marginBottom: '6px' }}>Invoice items</span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {order.items.map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                              <span style={{ color: 'white' }}>{item.name} <strong>x{item.quantity}</strong></span>
                              <span>${(item.price * item.quantity).toLocaleString()}</span>
                            </div>
                          ))}
                          <div style={{
                            borderTop: '1px solid rgba(255,255,255,0.05)',
                            paddingTop: '8px',
                            marginTop: '8px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontWeight: 'bold',
                            color: 'var(--color-green)'
                          }}>
                            <span>Total Invoiced Due:</span>
                            <span>${order.total.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {adminTab === 'products' && (
          /* PRODUCT INVENTORY CRUD TAB */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {isAddingProduct ? (
              /* CREATE / EDIT FORM WIDGET */
              <div className="glass-panel glow-blue" style={{ padding: '30px' }}>
                <h2 style={{ fontSize: '1.3rem', marginBottom: '20px' }}>
                  {editingProduct ? `Modify Specs: ${editingProduct.name}` : 'Register New ASIC Miner Unit'}
                </h2>

                <form onSubmit={handleProductSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>Manufacturer Brand</label>
                      <select
                        value={productForm.brand}
                        onChange={(e) => setProductForm({ ...productForm, brand: e.target.value as any })}
                        className="form-input"
                      >
                        <option value="Bitmain">Bitmain</option>
                        <option value="MicroBT">MicroBT</option>
                        <option value="Goldshell">Goldshell</option>
                        <option value="Jasminer">Jasminer</option>
                        <option value="Canaan">Canaan</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>Model Designation</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. S21 Pro"
                        value={productForm.model}
                        onChange={(e) => setProductForm({ ...productForm, model: e.target.value })}
                        className="form-input"
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>Market Price (USD)</label>
                      <input
                        type="number"
                        required
                        value={productForm.price}
                        onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>Algorithm</label>
                      <select
                        value={productForm.algorithm}
                        onChange={(e) => setProductForm({ ...productForm, algorithm: e.target.value })}
                        className="form-input"
                      >
                        <option value="SHA-256">SHA-256 (BTC, BCH)</option>
                        <option value="Scrypt">Scrypt (LTC, DOGE)</option>
                        <option value="Blake3">Blake3 (ALPH)</option>
                        <option value="Etchash">Etchash (ETC)</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>Hashrate Value</label>
                      <input
                        type="number"
                        required
                        value={productForm.hashrate}
                        onChange={(e) => setProductForm({ ...productForm, hashrate: Number(e.target.value) })}
                        className="form-input"
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>Power Wattage (Watts)</label>
                      <input
                        type="number"
                        required
                        value={productForm.power}
                        onChange={(e) => setProductForm({ ...productForm, power: Number(e.target.value) })}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>Efficiency Metric (J/T, J/G or J/M)</label>
                      <input
                        type="number"
                        step="0.1"
                        required
                        value={productForm.efficiency}
                        onChange={(e) => setProductForm({ ...productForm, efficiency: Number(e.target.value) })}
                        className="form-input"
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>Cooling Loop Type</label>
                      <select
                        value={productForm.coolingType}
                        onChange={(e) => setProductForm({ ...productForm, coolingType: e.target.value as any })}
                        className="form-input"
                      >
                        <option value="Air">Air Cooling</option>
                        <option value="Hydro">Hydro / Water Loop</option>
                        <option value="Immersion">Dielectric Fluid Immersion</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>Stock Inventory Status</label>
                      <select
                        value={productForm.status}
                        onChange={(e) => setProductForm({ ...productForm, status: e.target.value as any })}
                        className="form-input"
                      >
                        <option value="In Stock">In Stock</option>
                        <option value="Pre-order">Pre-order Only</option>
                        <option value="Hot">Hot Sell</option>
                        <option value="Out of Stock">Out of Stock</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row">
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>Release date</label>
                      <input
                        type="month"
                        value={productForm.releaseDate}
                        onChange={(e) => setProductForm({ ...productForm, releaseDate: e.target.value })}
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>Noise Level (dB)</label>
                      <input
                        type="number"
                        value={productForm.noise}
                        onChange={(e) => setProductForm({ ...productForm, noise: Number(e.target.value) })}
                        className="form-input"
                      />
                    </div>
                  </div>

                  {/* Custom Image Upload Selector */}
                  <div style={{ border: '1px dashed rgba(255,255,255,0.1)', padding: '16px', borderRadius: '8px', background: 'rgba(0,0,0,0.1)' }}>
                    <span style={{ display: 'block', fontSize: '0.82rem', fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>Product Image Setup</span>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', alignItems: 'start' }} className="image-setup-row">
                      {/* Inputs Column */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>Upload Image Files (Multiple allowed)</label>
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageFilesChange}
                            style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}
                          />
                          <span style={{ display: 'block', fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '4px' }}>Recommended image width: 800px (Max 150KB recommended per file)</span>
                        </div>
                        
                        <div>
                          <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>Or Append Remote Image URL</label>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <input
                              type="text"
                              placeholder="https://example.com/miner-image-2.jpg"
                              value={remoteUrlInput}
                              onChange={(e) => setRemoteUrlInput(e.target.value)}
                              className="form-input"
                              style={{ fontSize: '0.85rem', padding: '8px 12px' }}
                            />
                            <button
                              type="button"
                              onClick={() => handleAddRemoteUrl(remoteUrlInput)}
                              className="btn btn-secondary"
                              style={{ padding: '0 16px', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
                            >
                              Add URL
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Preview Gallery Column */}
                      <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', padding: '12px', minHeight: '180px' }}>
                        <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '6px', marginBottom: '10px' }}>
                          Uploaded Gallery ({productForm.imageUrls?.length || 0} images)
                        </span>

                        {(() => {
                          const imageUrlsList = productForm.imageUrls || [];
                          return imageUrlsList.length > 0 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '250px', overflowY: 'auto', paddingRight: '4px' }}>
                              {imageUrlsList.map((url, idx) => (
                                <div 
                                  key={idx} 
                                  style={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: '10px', 
                                    padding: '6px', 
                                    background: 'rgba(255,255,255,0.02)', 
                                    border: '1px solid rgba(255,255,255,0.05)', 
                                    borderRadius: '6px' 
                                  }}
                                >
                                  <img 
                                    src={url} 
                                    alt={`Thumb ${idx}`} 
                                    style={{ width: '45px', height: '45px', objectFit: 'contain', background: 'black', borderRadius: '4px' }} 
                                  />
                                  <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                      <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'white' }}>#{idx + 1}</span>
                                      {idx === 0 && (
                                        <span style={{ background: 'rgba(255, 179, 0, 0.15)', color: 'var(--color-gold)', border: '1px solid rgba(255, 179, 0, 0.3)', borderRadius: '3px', padding: '1px 4px', fontSize: '0.55rem', fontWeight: 800 }}>PRIMARY</span>
                                      )}
                                    </div>
                                    <span style={{ display: 'block', fontSize: '0.62rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                      {url.startsWith('data:') ? 'Base64 Local Image File' : url}
                                    </span>
                                  </div>
                                  <div style={{ display: 'flex', gap: '3px' }}>
                                    {idx > 0 && (
                                      <button 
                                        type="button" 
                                        onClick={() => handleSetAsPrimary(idx)}
                                        className="btn-icon" 
                                        style={{ width: '22px', height: '22px' }} 
                                        title="Set as cover image"
                                      >
                                        <Star size={10} style={{ color: 'var(--color-gold)' }} />
                                      </button>
                                    )}
                                    <button 
                                      type="button" 
                                      onClick={() => handleMoveImage(idx, 'up')}
                                      disabled={idx === 0}
                                      className="btn-icon" 
                                      style={{ width: '22px', height: '22px', opacity: idx === 0 ? 0.3 : 1 }} 
                                      title="Move up"
                                    >
                                      <ArrowUp size={10} />
                                    </button>
                                    <button 
                                      type="button" 
                                      onClick={() => handleMoveImage(idx, 'down')}
                                      disabled={idx === imageUrlsList.length - 1}
                                      className="btn-icon" 
                                      style={{ width: '22px', height: '22px', opacity: idx === imageUrlsList.length - 1 ? 0.3 : 1 }} 
                                      title="Move down"
                                    >
                                      <ArrowDown size={10} />
                                    </button>
                                    <button 
                                      type="button" 
                                      onClick={() => handleRemoveImageUrl(idx)}
                                      className="btn-icon" 
                                      style={{ width: '22px', height: '22px' }} 
                                      title="Delete image"
                                      onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-red)'}
                                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                                    >
                                      <Trash2 size={10} />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.72rem', border: '1px dashed rgba(255,255,255,0.05)', borderRadius: '4px', padding: '10px' }}>
                              No Custom Images Uploaded.<br />Dynamic vector ASICs will be used as fallbacks.
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>Public Description & Key Features</label>
                    <textarea
                      rows={4}
                      placeholder="Write brief review of miner, packaging details, power supply information..."
                      value={productForm.description}
                      onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                      className="form-input"
                      style={{ fontFamily: 'inherit' }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '10px' }}>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingProduct(false);
                        setEditingProduct(null);
                        resetProductForm();
                      }}
                      className="btn btn-secondary"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {editingProduct ? 'Save Product Specs' : 'Publish Product to Shop'}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              /* INVENTORY LIST */
              <div className="glass-panel" style={{ padding: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h2 style={{ fontSize: '1.3rem', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Cpu size={18} style={{ color: 'var(--color-gold)' }} />
                    <span>Inventory Registry (ASIC Miners CRUD)</span>
                  </h2>
                  
                  <button 
                    onClick={() => {
                      resetProductForm();
                      setIsAddingProduct(true);
                    }}
                    className="btn btn-primary"
                    style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                  >
                    <Plus size={14} />
                    <span>Add New Miner</span>
                  </button>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontWeight: 'bold' }}>
                        <th style={{ padding: '12px' }}>Miner Name</th>
                        <th style={{ padding: '12px' }}>Brand</th>
                        <th style={{ padding: '12px' }}>Algo / Coins</th>
                        <th style={{ padding: '12px' }}>Hashrate</th>
                        <th style={{ padding: '12px' }}>Price</th>
                        <th style={{ padding: '12px' }}>Status</th>
                        <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((p) => (
                        <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                          <td style={{ padding: '12px', fontWeight: 'bold', color: 'white' }}>{p.name}</td>
                          <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{p.brand}</td>
                          <td style={{ padding: '12px', color: 'var(--color-blue)' }}>{p.algorithm} ({p.coins.join(', ')})</td>
                          <td style={{ padding: '12px', color: 'white' }}>{p.hashrate} {p.hashrateUnit}</td>
                          <td style={{ padding: '12px', fontWeight: 'bold', color: 'var(--color-green)' }}>${p.price.toLocaleString()}</td>
                          <td style={{ padding: '12px' }}>
                            <span className={`badge ${p.status === 'In Stock' ? 'badge-green' : p.status === 'Pre-order' ? 'badge-gold' : 'badge-red'}`} style={{ fontSize: '0.65rem' }}>
                              {p.status}
                            </span>
                          </td>
                          <td style={{ padding: '12px', textAlign: 'right' }}>
                            <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                              <button
                                onClick={() => handleEditProductClick(p)}
                                className="btn-icon"
                                style={{ width: '28px', height: '28px' }}
                                title="Edit specs"
                              >
                                <Edit2 size={12} />
                              </button>
                              <button
                                onClick={() => deleteProduct(p.id)}
                                className="btn-icon"
                                style={{ width: '28px', height: '28px' }}
                                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-red)'}
                                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                                title="Delete product"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {adminTab === 'staff' && (
          /* STAFF & scam REGISTRY TAB */
          <div style={{
            gap: '30px'
          }} className="admin-staff-grid">
            
            {/* Left: Staff Registry */}
            <div className="glass-panel" style={{ padding: '30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.2rem', display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <ShieldCheck size={18} style={{ color: 'var(--color-green)' }} />
                  <span>Verified Agent Directory</span>
                </h3>
                <button
                  onClick={() => setIsAddingStaff(!isAddingStaff)}
                  className="btn btn-secondary"
                  style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                >
                  {isAddingStaff ? 'Close Form' : 'Verify Agent'}
                </button>
              </div>

              {isAddingStaff && (
                <form onSubmit={handleStaffSubmit} style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid var(--border-color)',
                  padding: '20px',
                  borderRadius: '6px',
                  marginBottom: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <input
                      type="text"
                      required
                      placeholder="Agent Full Name"
                      value={staffForm.name}
                      onChange={(e) => setStaffForm({ ...staffForm, name: e.target.value })}
                      className="form-input"
                      style={{ fontSize: '0.85rem' }}
                    />
                    <input
                      type="text"
                      required
                      placeholder="Role (e.g. Sales Director)"
                      value={staffForm.role}
                      onChange={(e) => setStaffForm({ ...staffForm, role: e.target.value })}
                      className="form-input"
                      style={{ fontSize: '0.85rem' }}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <input
                      type="email"
                      required
                      placeholder="Official Email (@apextomining.com)"
                      value={staffForm.email}
                      onChange={(e) => setStaffForm({ ...staffForm, email: e.target.value })}
                      className="form-input"
                      style={{ fontSize: '0.85rem' }}
                    />
                    <input
                      type="text"
                      required
                      placeholder="Telegram Handle (e.g. @username)"
                      value={staffForm.telegram}
                      onChange={(e) => setStaffForm({ ...staffForm, telegram: e.target.value })}
                      className="form-input"
                      style={{ fontSize: '0.85rem' }}
                    />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="WhatsApp contact with country code"
                    value={staffForm.whatsapp}
                    onChange={(e) => setStaffForm({ ...staffForm, whatsapp: e.target.value })}
                    className="form-input"
                    style={{ fontSize: '0.85rem' }}
                  />
                  <button type="submit" className="btn btn-primary" style={{ height: '36px', fontSize: '0.8rem' }}>
                    Commit Agent Verification Status
                  </button>
                </form>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {staff.map((s) => (
                  <div 
                    key={s.telegram}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'rgba(0,0,0,0.15)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      padding: '12px 16px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img src={s.avatar} alt={s.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--color-green)' }} />
                      <div>
                        <strong style={{ color: 'white' }}>{s.name}</strong>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block' }}>{s.role} | {s.telegram}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeStaff(s.telegram)}
                      className="btn-icon"
                      style={{ width: '28px', height: '28px' }}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Scam Warning Registers */}
            <div className="glass-panel" style={{ padding: '30px', border: '1px solid rgba(255, 23, 68, 0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.1rem', display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <ShieldAlert size={18} style={{ color: 'var(--color-red)' }} />
                  <span>Scammer Blacklist</span>
                </h3>
                <button
                  onClick={() => setIsAddingScam(!isAddingScam)}
                  className="btn btn-secondary"
                  style={{ padding: '6px 12px', fontSize: '0.8rem', borderColor: 'var(--color-red)', color: 'var(--color-red)' }}
                >
                  {isAddingScam ? 'Close' : 'Add Scam'}
                </button>
              </div>

              {isAddingScam && (
                <form onSubmit={handleScamSubmit} style={{
                  background: 'rgba(255,23,68,0.02)',
                  border: '1px solid rgba(255,23,68,0.1)',
                  padding: '16px',
                  borderRadius: '6px',
                  marginBottom: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  <input
                    type="text"
                    required
                    placeholder="Impersonator handle (e.g. @alice_apexto_support)"
                    value={scamForm.handle}
                    onChange={(e) => setScamForm({ ...scamForm, handle: e.target.value })}
                    className="form-input"
                    style={{ fontSize: '0.85rem' }}
                  />
                  <textarea
                    rows={2}
                    required
                    placeholder="Brief description of phishing threat..."
                    value={scamForm.warning}
                    onChange={(e) => setScamForm({ ...scamForm, warning: e.target.value })}
                    className="form-input"
                    style={{ fontSize: '0.85rem', fontFamily: 'inherit' }}
                  />
                  <button type="submit" className="btn btn-danger" style={{ height: '34px', fontSize: '0.8rem' }}>
                    Publish Scam Warning Alert
                  </button>
                </form>
              )}

              {/* Display scams */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                {Object.keys(scams).map((handle) => (
                  <div 
                    key={handle}
                    style={{
                      background: 'rgba(255, 23, 68, 0.01)',
                      border: '1px solid rgba(255, 23, 68, 0.1)',
                      borderRadius: '6px',
                      padding: '12px'
                    }}
                  >
                    <strong style={{ color: 'var(--color-red)', display: 'block', marginBottom: '4px' }}>{handle}</strong>
                    <span>{scams[handle]}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {adminTab === 'settings' && (
          <div className="glass-panel" style={{ padding: '30px' }}>
            <h2 style={{ fontSize: '1.3rem', marginBottom: '24px', display: 'flex', gap: '8px', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
              <Settings size={18} style={{ color: 'var(--color-gold)' }} />
              <span>Configure Cryptocurrency Deposit & Bank Wire Details</span>
            </h2>

            {settingsSaved && (
              <div style={{
                background: 'rgba(0, 230, 118, 0.05)',
                border: '1px solid rgba(0, 230, 118, 0.2)',
                borderRadius: '6px',
                padding: '12px 16px',
                color: 'var(--color-green)',
                fontSize: '0.88rem',
                marginBottom: '20px',
                fontWeight: 600
              }}>
                Payment settings updated successfully in local store memory.
              </div>
            )}

            <form onSubmit={(e) => {
              e.preventDefault();
              updatePaymentSettings(settingsForm);
              setSettingsSaved(true);
              setTimeout(() => setSettingsSaved(false), 3000);
            }} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Crypto section */}
              <div style={{ border: '1px solid var(--border-color)', borderRadius: '8px', padding: '20px', background: 'rgba(255,255,255,0.01)' }}>
                <h3 style={{ fontSize: '1rem', color: 'white', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ background: '#f7931a', color: 'white', borderRadius: '50%', width: '22px', height: '22px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold' }}>₿</span>
                  <span>Cryptocurrency Wallet Setup</span>
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {renderCryptoField('USDT Deposit Wallet (ERC-20 Ethereum Address) *', 'usdtAddress', 'usdtQr', 'e.g. 0x...')}
                  {renderCryptoField('Bitcoin Deposit Wallet Address (SegWit/Legacy Address) *', 'btcAddress', 'btcQr', 'e.g. bc1q...')}
                  {renderCryptoField('Ethereum Deposit Wallet Address (ERC-20 Address) *', 'ethAddress', 'ethQr', 'e.g. 0x...')}
                  {renderCryptoField('Litecoin Deposit Wallet Address *', 'ltcAddress', 'ltcQr', 'e.g. L...')}
                  {renderCryptoField('Dogecoin Deposit Wallet Address *', 'dogeAddress', 'dogeQr', 'e.g. D...')}
                  {renderCryptoField('Kaspa Deposit Wallet Address *', 'kasAddress', 'kasQr', 'e.g. kaspa:q...')}
                  {renderCryptoField('Solana Deposit Wallet Address *', 'solAddress', 'solQr', 'e.g. Sol...')}
                  {renderCryptoField('TRON Deposit Wallet Address *', 'tronAddress', 'tronQr', 'e.g. T...')}
                  {renderCryptoField('Bitcoin Cash Deposit Wallet Address *', 'bchAddress', 'bchQr', 'e.g. q...')}
                  {renderCryptoField('XRP Deposit Wallet Address *', 'xrpAddress', 'xrpQr', 'e.g. r...')}
                  {renderCryptoField('Stellar Deposit Wallet Address *', 'xlmAddress', 'xlmQr', 'e.g. G...')}
                  {renderCryptoField('Monero Deposit Wallet Address *', 'xmrAddress', 'xmrQr', 'e.g. 4...')}
                </div>
              </div>

              {/* Bank section */}
              <div style={{ border: '1px solid var(--border-color)', borderRadius: '8px', padding: '20px', background: 'rgba(255,255,255,0.01)' }}>
                <h3 style={{ fontSize: '1rem', color: 'white', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '1.25rem' }}>🏦</span>
                  <span>Corporate Bank Wire Instructions</span>
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row">
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>Beneficiary Entity Name *</label>
                      <input
                        type="text"
                        required
                        value={settingsForm.bankBeneficiary}
                        onChange={(e) => setSettingsForm({ ...settingsForm, bankBeneficiary: e.target.value })}
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>Receiving Bank Name *</label>
                      <input
                        type="text"
                        required
                        value={settingsForm.bankName}
                        onChange={(e) => setSettingsForm({ ...settingsForm, bankName: e.target.value })}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row">
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>SWIFT / BIC Code *</label>
                      <input
                        type="text"
                        required
                        value={settingsForm.bankSwift}
                        onChange={(e) => setSettingsForm({ ...settingsForm, bankSwift: e.target.value })}
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>Account Number *</label>
                      <input
                        type="text"
                        required
                        value={settingsForm.bankAccount}
                        onChange={(e) => setSettingsForm({ ...settingsForm, bankAccount: e.target.value })}
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-accent" style={{ padding: '14px', fontSize: '0.95rem', fontWeight: 'bold', width: '100%' }}>
                Save Payment Settings
              </button>
            </form>
          </div>
        )}

      </div>
      
      <style>{`
        .order-details-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
        }
        .admin-staff-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 30px;
        }
        @media (max-width: 768px) {
          .order-details-grid, .admin-staff-grid {
            grid-template-columns: 1fr !important;
          }
          .order-items-column {
            border-left: none !important;
            padding-left: 0 !important;
            border-top: 1px solid rgba(255,255,255,0.05);
            padding-top: 15px;
          }
        }
      `}</style>
    </div>
  );
};
