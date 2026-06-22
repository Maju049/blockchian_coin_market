import React, { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, ShieldCheck, Copy, Check, X, Plus, Minus } from 'lucide-react';
import { AsicImage } from '../components/AsicImage';

const CRYPTO_COINS = [
  // Stablecoins
  { id: 'USDT', name: 'Tether (USDT)', rate: 1.0, color: '#26a17b', icon: '₮', category: 'stable' },

  // Fast & Low-Fee
  { id: 'LTC', name: 'Litecoin (LTC)', rate: 84.5, color: '#bebebe', icon: 'Ł', category: 'utility' },
  { id: 'TRX', name: 'TRON (TRX)', rate: 0.12, color: '#ef263c', icon: 'T', category: 'utility' },
  { id: 'SOL', name: 'Solana (SOL)', rate: 155.0, color: '#4cc5b9', icon: 'S', category: 'utility' },
  { id: 'BCH', name: 'Bitcoin Cash (BCH)', rate: 450.0, color: '#8dc351', icon: 'B', category: 'utility' },
  { id: 'XRP', name: 'XRP (Ripple)', rate: 0.52, color: '#23292f', icon: 'X', category: 'utility' },
  { id: 'XLM', name: 'Stellar (XLM)', rate: 0.11, color: '#7d00fa', icon: 'S', category: 'utility' },
  { id: 'KAS', name: 'Kaspa (KAS)', rate: 0.18, color: '#409f9f', icon: 'K', category: 'utility' },

  // Heavyweight
  { id: 'BTC', name: 'Bitcoin (BTC)', rate: 67320.0, color: '#f7931a', icon: '₿', category: 'heavy' },
  { id: 'ETH', name: 'Ethereum (ETH)', rate: 3790.0, color: '#627eea', icon: 'Ξ', category: 'heavy' },

  // Community & Meme
  { id: 'DOGE', name: 'Dogecoin (DOGE)', rate: 0.14, color: '#c2a633', icon: 'Ð', category: 'community' },
  { id: 'XMR', name: 'Monero (XMR)', rate: 170.0, color: '#ff6600', icon: 'M', category: 'community' }
];

const getCoinAddress = (coinId: string, settings: any) => {
  if (coinId === 'BTC') return settings.btcAddress || '';
  if (coinId === 'ETH') return settings.ethAddress || '';
  if (coinId === 'USDT') return settings.usdtAddress || '';
  if (coinId === 'LTC') return settings.ltcAddress || '';
  if (coinId === 'DOGE') return settings.dogeAddress || '';
  if (coinId === 'KAS') return settings.kasAddress || '';
  if (coinId === 'SOL') return settings.solAddress || '';
  if (coinId === 'TRX') return settings.tronAddress || '';
  if (coinId === 'BCH') return settings.bchAddress || '';
  if (coinId === 'XRP') return settings.xrpAddress || '';
  if (coinId === 'XLM') return settings.xlmAddress || '';
  if (coinId === 'XMR') return settings.xmrAddress || '';
  return '';
};

const getCoinQr = (coinId: string, settings: any) => {
  if (coinId === 'BTC') return settings.btcQr || '';
  if (coinId === 'ETH') return settings.ethQr || '';
  if (coinId === 'USDT') return settings.usdtQr || '';
  if (coinId === 'LTC') return settings.ltcQr || '';
  if (coinId === 'DOGE') return settings.dogeQr || '';
  if (coinId === 'KAS') return settings.kasQr || '';
  if (coinId === 'SOL') return settings.solQr || '';
  if (coinId === 'TRX') return settings.tronQr || '';
  if (coinId === 'BCH') return settings.bchQr || '';
  if (coinId === 'XRP') return settings.xrpQr || '';
  if (coinId === 'XLM') return settings.xlmQr || '';
  if (coinId === 'XMR') return settings.xmrQr || '';
  return '';
};

const getCoinWarning = (coinId: string) => {
  if (coinId === 'BTC') return "Transfer only via the Bitcoin mainnet network. Transferring via a different protocol will result in loss of funds.";
  if (coinId === 'ETH') return "Transfer only via the Ethereum blockchain (ERC-20 network). Transferring via a different protocol will result in loss of funds.";
  if (coinId === 'USDT') return "Transfer only via the Ethereum blockchain (ERC-20 network). Transferring via a different protocol will result in loss of funds.";
  if (coinId === 'LTC') return "Transfer only via the Litecoin network. Transferring via a different protocol will result in loss of funds.";
  if (coinId === 'DOGE') return "Transfer only via the Dogecoin network. Transferring via a different protocol will result in loss of funds.";
  if (coinId === 'KAS') return "Transfer only via the Kaspa network. Transferring via a different protocol will result in loss of funds.";
  if (coinId === 'SOL') return "Transfer only via the Solana network (SPL / SOL). Transferring via a different protocol will result in loss of funds.";
  if (coinId === 'TRX') return "Transfer only via the TRON network (TRC-20 / TRX). Transferring via a different protocol will result in loss of funds.";
  if (coinId === 'BCH') return "Transfer only via the Bitcoin Cash network. Transferring via a different protocol will result in loss of funds.";
  if (coinId === 'XRP') return "Transfer only via the Ripple XRP network. Transferring via a different protocol will result in loss of funds.";
  if (coinId === 'XLM') return "Transfer only via the Stellar network (XLM). Transferring via a different protocol will result in loss of funds.";
  if (coinId === 'XMR') return "Transfer only via the Monero network (XMR). Transferring via a different protocol will result in loss of funds.";
  return "Transfer only via the selected network. Transferring via a different protocol will result in loss of funds.";
};

interface CheckoutProps {
  setCurrentTab: (tab: string) => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ setCurrentTab }) => {
  const { cart, getCartTotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const { orders, addOrder, paymentSettings, updateOrderCoin } = useStore();

  const [step, setStep] = useState<'checkout' | 'success'>('checkout');
  const [paymentMethod, setPaymentMethod] = useState<'crypto' | 'wire'>('crypto');
  const [shippingType, setShippingType] = useState<'standard' | 'expedited'>('standard');
  const [copiedText, setCopiedText] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Web3 Payment States
  const [web3Status, setWeb3Status] = useState<'idle' | 'connecting' | 'network' | 'awaiting' | 'submitting' | 'confirmed' | 'error'>('idle');
  const [web3TxHash, setWeb3TxHash] = useState('');
  const [web3Error, setWeb3Error] = useState('');
  const [orderId] = useState(() => `APX-${Math.floor(100000 + Math.random() * 900000)}`);

  // Check for orderId in URL redirect (NOWPayments return url)
  const queryParams = useMemo(() => new URLSearchParams(window.location.search), []);
  const queryOrderId = queryParams.get('orderId');

  // Find order from global store
  const currentOrder = useMemo(() => {
    const searchId = queryOrderId || orderId;
    return orders.find(o => o.id === searchId) || null;
  }, [queryOrderId, orderId, orders]);

  // Set step to success if order is matched from redirect
  React.useEffect(() => {
    if (queryOrderId && currentOrder) {
      setStep('success');
      clearCart();
    }
  }, [queryOrderId, currentOrder, clearCart]);

  // Direct Crypto States
  const [directSelectedCoin, setDirectSelectedCoin] = useState<string>('USDT');

  // Redesigned Crypto Payment Selector States
  const [directSelectorStep, setDirectSelectorStep] = useState<'choose' | 'deposit'>(() => {
    return (queryOrderId || currentOrder?.cryptoCoin) ? 'deposit' : 'choose';
  });
  const [coinSearchQuery, setCoinSearchQuery] = useState<string>('');
  const [activeFilterTab, setActiveFilterTab] = useState<'all' | 'popular' | 'stable'>('all');

  // Memoized filtered coins list for the selection grid
  const filteredCoins = useMemo(() => {
    return CRYPTO_COINS.filter(coin => {
      // 1. Filter by Search Query (name or symbol)
      if (coinSearchQuery.trim() !== '') {
        const query = coinSearchQuery.toLowerCase();
        const matchesName = coin.name.toLowerCase().includes(query);
        const matchesId = coin.id.toLowerCase().includes(query);
        if (!matchesName && !matchesId) return false;
      }
      
      // 2. Filter by Active Filter Tab
      if (activeFilterTab === 'popular') {
        const popularIds = ['BTC', 'ETH', 'SOL', 'LTC', 'USDT', 'DOGE'];
        return popularIds.includes(coin.id);
      }
      if (activeFilterTab === 'stable') {
        return coin.category === 'stable';
      }
      
      return true;
    });
  }, [coinSearchQuery, activeFilterTab]);


  // Form states
  const [shippingForm, setShippingForm] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    country: 'United States (US)',
    address: '',
    address2: '',
    city: '',
    state: 'New York',
    zip: '',
    phone: '',
    email: '',
    createAccount: false,
    shipDifferentAddress: false,
    orderNotes: ''
  });

  // Customer Login States
  const [isCustomerLoggedIn, setIsCustomerLoggedIn] = useState(() => {
    return localStorage.getItem('apexmining_customer_logged_in') === 'true';
  });
  const [loggedInUserEmail, setLoggedInUserEmail] = useState(() => {
    return localStorage.getItem('apexmining_customer_email') || '';
  });
  const [showLogin, setShowLogin] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Automatically pre-fill shipping details on mount if logged in
  React.useEffect(() => {
    if (isCustomerLoggedIn && loggedInUserEmail) {
      setShippingForm(prev => ({
        ...prev,
        firstName: 'John',
        lastName: 'Doe',
        companyName: 'Genesis Mining Corp',
        country: 'United States (US)',
        address: '100 Broadway',
        address2: 'Suite 400',
        city: 'New York',
        state: 'New York',
        zip: '10005',
        phone: '+1 (555) 019-2834',
        email: loggedInUserEmail
      }));
    }
  }, [isCustomerLoggedIn, loggedInUserEmail]);

  const handleCustomerLogin = () => {
    if (!loginEmail.trim() || !loginPassword.trim()) {
      alert('Please enter both email and password.');
      return;
    }
    if (loginPassword.length < 4) {
      alert('Password must be at least 4 characters.');
      return;
    }

    localStorage.setItem('apexmining_customer_logged_in', 'true');
    localStorage.setItem('apexmining_customer_email', loginEmail.trim());
    setIsCustomerLoggedIn(true);
    setLoggedInUserEmail(loginEmail.trim());
    setShowLogin(false);
    setLoginPassword('');
  };

  const handleCustomerLogout = () => {
    localStorage.removeItem('apexmining_customer_logged_in');
    localStorage.removeItem('apexmining_customer_email');
    setIsCustomerLoggedIn(false);
    setLoggedInUserEmail('');
    setShippingForm({
      firstName: '',
      lastName: '',
      companyName: '',
      country: 'United States (US)',
      address: '',
      address2: '',
      city: '',
      state: 'New York',
      zip: '',
      phone: '',
      email: '',
      createAccount: false,
      shipDifferentAddress: false,
      orderNotes: ''
    });
  };

  // Calculate dynamic shipping costs
  const totalQuantity = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const shippingCost = useMemo(() => {
    const baseStandardShipping = 303.26;
    const baseExpeditedShipping = 361.76;
    const rate = shippingType === 'standard' ? baseStandardShipping : baseExpeditedShipping;
    // Scale shipping slightly if they order multiple heavy ASICs
    return Number((rate + (totalQuantity - 1) * 45).toFixed(2));
  }, [shippingType, totalQuantity]);

  const platformFees = 49.08;
  const subtotal = getCartTotal();
  const orderTotal = Number((subtotal + shippingCost + platformFees).toFixed(2));


  // Setup dynamic display variables
  const displayOrderId = currentOrder ? currentOrder.id : orderId;
  const displayOrderTotal = currentOrder ? currentOrder.total : orderTotal;
  const displayFirstName = currentOrder ? currentOrder.customer.firstName : shippingForm.firstName;
  const displayLastName = currentOrder ? currentOrder.customer.lastName : shippingForm.lastName;
  const displayAddress = currentOrder ? currentOrder.customer.address : `${shippingForm.address}${shippingForm.address2 ? `, ${shippingForm.address2}` : ''}`;
  const displayCity = currentOrder ? currentOrder.customer.city : shippingForm.city;
  const displayCountry = currentOrder ? currentOrder.customer.country : shippingForm.country;
  const displayZip = currentOrder ? currentOrder.customer.zip : shippingForm.zip;
  const displayEmail = currentOrder ? currentOrder.customer.email : shippingForm.email;
  const displayPaymentMethod = currentOrder ? currentOrder.paymentMethod : paymentMethod;

  const handlePlaceOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreeTerms) {
      alert('Please read and agree to the website terms and conditions to place your order.');
      return;
    }

    const items = cart.map(item => ({
      productId: item.product.id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity
    }));

    const orderData = {
      id: orderId,
      customer: {
        firstName: shippingForm.firstName,
        lastName: shippingForm.lastName,
        email: shippingForm.email,
        phone: shippingForm.phone,
        country: shippingForm.country,
        address: `${shippingForm.address}${shippingForm.address2 ? `, ${shippingForm.address2}` : ''}`,
        city: shippingForm.city,
        zip: shippingForm.zip
      },
      items,
      total: orderTotal,
      paymentMethod,
      ...(paymentMethod === 'crypto' ? { cryptoCoin: directSelectedCoin } : {})
    };

    addOrder(orderData);
    setStep('success');
  };

  const handleFinish = () => {
    clearCart();
    setCurrentTab('home');
  };

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleWeb3Payment = async () => {
    setWeb3Error('');
    setWeb3Status('connecting');

    const ethereum = (window as any).ethereum;
    if (!ethereum) {
      setWeb3Status('error');
      setWeb3Error('Web3 wallet not detected. Please install MetaMask to make inline payments.');
      return;
    }

    try {
      // 1. Request account access
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      if (!accounts || accounts.length === 0) {
        throw new Error('No Ethereum accounts connected.');
      }
      const userAddress = accounts[0];

      // 2. Check Chain ID. ETH and USDC_ETH are on Ethereum Mainnet (Chain ID 0x1)
      setWeb3Status('network');
      const chainId = await ethereum.request({ method: 'eth_chainId' });
      if (chainId !== '0x1') {
        try {
          await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x1' }],
          });
        } catch (switchError: any) {
          throw new Error('Please switch your wallet to Ethereum Mainnet to pay.');
        }
      }

      setWeb3Status('awaiting');

      const destinationAddress = getCoinAddress(directSelectedCoin, paymentSettings);
      if (!destinationAddress) {
        throw new Error('Recipient wallet address is not configured in Admin Settings.');
      }

      if (directSelectedCoin === 'ETH') {
        // Native Ether transfer
        const ethCoin = CRYPTO_COINS.find(c => c.id === 'ETH');
        const ethRate = ethCoin ? ethCoin.rate : 3790;
        const ethAmount = displayOrderTotal / ethRate;
        const weiAmount = Math.round(ethAmount * 1e18);

        setWeb3Status('submitting');
        
        const txHash = await ethereum.request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: userAddress,
              to: destinationAddress,
              value: `0x${weiAmount.toString(16)}`,
              data: '0x',
            },
          ],
        });

        if (txHash) {
          setWeb3TxHash(txHash);
          setWeb3Status('confirmed');
        } else {
          throw new Error('Transaction submission failed.');
        }
      } else {
        // USDT ERC-20 transfer on Ethereum Mainnet
        // Contract: 0xdac17f958d2ee523a2206206994597c13d831ec7 (USDT)
        const usdtContract = '0xdac17f958d2ee523a2206206994597c13d831ec7';
        const selector = 'a9059cbb'; // transfer(address,uint256)

        // Encode destination address (remove 0x prefix, pad to 64 chars)
        const toAddressClean = destinationAddress.replace(/^0x/, '').toLowerCase();
        const encodedAddress = toAddressClean.padStart(64, '0');

        // Encode value: USDT has 6 decimals, so multiply orderTotal by 1,000,000.
        const usdtAmount = Math.round(displayOrderTotal * 1000000);
        const encodedAmount = usdtAmount.toString(16).padStart(64, '0');

        const dataPayload = `0x${selector}${encodedAddress}${encodedAmount}`;

        setWeb3Status('submitting');
        
        const txHash = await ethereum.request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: userAddress,
              to: usdtContract,
              data: dataPayload,
              value: '0x0',
            },
          ],
        });

        if (txHash) {
          setWeb3TxHash(txHash);
          setWeb3Status('confirmed');
        } else {
          throw new Error('Transaction submission failed.');
        }
      }
    } catch (err: any) {
      console.error(err);
      setWeb3Status('error');
      setWeb3Error(err?.message || 'An unexpected error occurred during Web3 transaction.');
    }
  };

  if (cart.length === 0 && step !== 'success') {
    return (
      <div className="section animate-fade-in" style={{ paddingTop: '80px', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <h2 style={{ marginBottom: '15px' }}>Checkout is Empty</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>You do not have any items in your cart to checkout.</p>
          <button onClick={() => setCurrentTab('shop')} className="btn btn-primary">Go to ASIC Shop</button>
        </div>
      </div>
    );
  }

  return (
    <div className="section animate-fade-in" style={{ paddingTop: '20px' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        
        {step === 'checkout' && (
          <>
            {/* Login Notice Banner */}
            {isCustomerLoggedIn ? (
              <div className="glass-panel" style={{ 
                padding: '15px 20px', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                border: '1px solid var(--color-green)', 
                background: 'rgba(0, 230, 118, 0.03)',
                borderRadius: '8px',
                marginBottom: '24px'
              }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--color-green)' }} />
                  <span>Logged in as <strong style={{ color: 'white' }}>{loggedInUserEmail}</strong> (Account billing details pre-filled)</span>
                </span>
                <button 
                  type="button"
                  onClick={handleCustomerLogout}
                  style={{ background: 'none', border: 'none', color: 'var(--color-red)', cursor: 'pointer', fontSize: '0.85rem', textDecoration: 'underline', fontWeight: 600 }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="glass-panel" style={{ 
                padding: '20px', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '15px', 
                border: '1px solid var(--border-color)', 
                borderRadius: '8px',
                marginBottom: '24px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} onClick={() => setShowLogin(!showLogin)}>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    🔑 Returning customer? <strong style={{ color: 'var(--color-green)', textDecoration: 'underline' }}>Click here to login</strong>
                  </span>
                </div>
                
                {showLogin && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', alignItems: 'end', borderTop: '1px solid var(--border-color)', paddingTop: '15px', marginTop: '5px' }}>
                    <div style={{ flex: '1 1 250px' }}>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>Email address *</label>
                      <input 
                        type="email" 
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="e.g. user@example.com"
                        className="form-input" 
                        style={{ fontSize: '0.85rem', padding: '8px 12px' }}
                      />
                    </div>
                    <div style={{ flex: '1 1 250px' }}>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>Password *</label>
                      <input 
                        type="password" 
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••"
                        className="form-input" 
                        style={{ fontSize: '0.85rem', padding: '8px 12px' }}
                      />
                    </div>
                    <button 
                      type="button" 
                      onClick={handleCustomerLogin}
                      className="btn btn-primary"
                      style={{ padding: '8px 24px', fontSize: '0.85rem', height: '40px', minWidth: '100px' }}
                    >
                      Login
                    </button>
                  </div>
                )}
              </div>
            )}

            <form onSubmit={handlePlaceOrderSubmit}>
            <div style={{
              alignItems: 'start'
            }} className="checkout-main-grid">
              
              {/* Left Column: Billing Details Form */}
              <div className="glass-panel" style={{ padding: '30px' }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 'bold', marginBottom: '24px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                  Billing Details
                </h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row">
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>First name *</label>
                      <input
                        type="text"
                        required
                        value={shippingForm.firstName}
                        onChange={(e) => setShippingForm({ ...shippingForm, firstName: e.target.value })}
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>Last name *</label>
                      <input
                        type="text"
                        required
                        value={shippingForm.lastName}
                        onChange={(e) => setShippingForm({ ...shippingForm, lastName: e.target.value })}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>Company name (optional)</label>
                    <input
                      type="text"
                      value={shippingForm.companyName}
                      onChange={(e) => setShippingForm({ ...shippingForm, companyName: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>Country / Region *</label>
                    <select
                      value={shippingForm.country}
                      onChange={(e) => setShippingForm({ ...shippingForm, country: e.target.value })}
                      className="form-input"
                    >
                      <option value="United States (US)">United States (US)</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom (UK)">United Kingdom (UK)</option>
                      <option value="Germany">Germany</option>
                      <option value="United Arab Emirates (UAE)">United Arab Emirates (UAE)</option>
                      <option value="Australia">Australia</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Russian Federation">Russian Federation</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>Street address *</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <input
                        type="text"
                        required
                        placeholder="House number and street name"
                        value={shippingForm.address}
                        onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                        className="form-input"
                      />
                      <input
                        type="text"
                        placeholder="Apartment, suite, unit, etc. (optional)"
                        value={shippingForm.address2}
                        onChange={(e) => setShippingForm({ ...shippingForm, address2: e.target.value })}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row">
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>Town / City *</label>
                      <input
                        type="text"
                        required
                        value={shippingForm.city}
                        onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>State *</label>
                      <select
                        value={shippingForm.state}
                        onChange={(e) => setShippingForm({ ...shippingForm, state: e.target.value })}
                        className="form-input"
                      >
                        <option value="New York">New York</option>
                        <option value="California">California</option>
                        <option value="Texas">Texas</option>
                        <option value="Florida">Florida</option>
                        <option value="Ontario">Ontario</option>
                        <option value="Dubai">Dubai</option>
                        <option value="London">London</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row">
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>ZIP Code *</label>
                      <input
                        type="text"
                        required
                        value={shippingForm.zip}
                        onChange={(e) => setShippingForm({ ...shippingForm, zip: e.target.value })}
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>Phone *</label>
                      <input
                        type="tel"
                        required
                        value={shippingForm.phone}
                        onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>Email address *</label>
                    <input
                      type="email"
                      required
                      value={shippingForm.email}
                      onChange={(e) => setShippingForm({ ...shippingForm, email: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  {/* Extra Checkboxes */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
                    {!isCustomerLoggedIn && (
                      <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.88rem' }}>
                        <input
                          type="checkbox"
                          checked={shippingForm.createAccount}
                          onChange={(e) => setShippingForm({ ...shippingForm, createAccount: e.target.checked })}
                        />
                        <span>Create an account?</span>
                      </label>
                    )}
                    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.88rem' }}>
                      <input
                        type="checkbox"
                        checked={shippingForm.shipDifferentAddress}
                        onChange={(e) => setShippingForm({ ...shippingForm, shipDifferentAddress: e.target.checked })}
                      />
                      <span>Ship to a different address?</span>
                    </label>
                  </div>

                  <div style={{ marginTop: '10px' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>Order notes (optional)</label>
                    <textarea
                      rows={3}
                      placeholder="Notes about your order, e.g. special notes for delivery."
                      value={shippingForm.orderNotes}
                      onChange={(e) => setShippingForm({ ...shippingForm, orderNotes: e.target.value })}
                      className="form-input"
                      style={{ fontFamily: 'inherit', resize: 'vertical' }}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Order Review & Payment Panels */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                
                {/* Your Order Panel */}
                <div className="glass-panel" style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                    Your Order
                  </h3>

                  {/* Header Row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '12px', paddingBottom: '6px', borderBottom: '1px solid var(--border-color)' }}>
                    <span>Product</span>
                    <span>Subtotal</span>
                  </div>

                  {/* Order items lists */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
                    {cart.map((item) => {
                      const coverImage = item.product.imageUrls && item.product.imageUrls.length > 0 ? item.product.imageUrls[0] : item.product.imageUrl;
                      return (
                        <div 
                          key={item.id} 
                          style={{ 
                            display: 'flex', 
                            gap: '12px', 
                            paddingBottom: '16px', 
                            borderBottom: '1px solid var(--border-color)',
                            alignItems: 'start'
                          }}
                        >
                          {/* Close cross */}
                          <button 
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '2px', alignSelf: 'center', marginRight: '2px' }}
                            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-red)'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                          >
                            <X size={14} />
                          </button>

                          {/* Thumbnail */}
                          <div style={{ flexShrink: 0 }}>
                            {coverImage ? (
                              <div style={{ 
                                width: '50px', 
                                height: '50px', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                background: 'var(--bg-main)', 
                                borderRadius: '4px', 
                                border: '1px solid var(--border-color)', 
                                overflow: 'hidden' 
                              }}>
                                <img src={coverImage} alt="" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                              </div>
                            ) : (
                              <AsicImage 
                                brand={item.product.brand}
                                coolingType={item.product.coolingType as any}
                                hashrate={item.product.hashrate}
                                hashrateUnit={item.product.hashrateUnit}
                                status={item.product.status}
                                width={50}
                                height={50}
                              />
                            )}
                          </div>

                          {/* Name & Inline Controls */}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <span style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-header)', lineHeight: '1.4', marginBottom: '6px' }}>
                              {item.product.name}
                            </span>
                            
                            {/* Quantity Controls */}
                            <div style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              background: 'var(--bg-input)',
                              border: '1px solid var(--border-color)',
                              borderRadius: '4px',
                              padding: '2px'
                            }}>
                              <button 
                                type="button"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '2px 6px', display: 'flex', alignItems: 'center' }}
                              >
                                <Minus size={10} />
                              </button>
                              <span style={{ padding: '0 8px', fontSize: '0.78rem', fontWeight: 'bold', color: 'var(--text-primary)', minWidth: '14px', textAlign: 'center' }}>
                                {item.quantity}
                              </span>
                              <button 
                                type="button"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '2px 6px', display: 'flex', alignItems: 'center' }}
                              >
                                <Plus size={10} />
                              </button>
                            </div>
                          </div>

                          {/* Line Subtotal */}
                          <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-header)', alignSelf: 'center', paddingLeft: '8px' }}>
                            ${(item.product.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Calculations */}
                  <div style={{
                    borderTop: '1px solid var(--border-color)',
                    paddingTop: '16px',
                    fontSize: '0.88rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                      <span>Subtotal</span>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                        ${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                    </div>

                    {/* Shipping Options */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid var(--border-color)', paddingTop: '10px' }}>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>Shipment</span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '4px' }}>
                        <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontSize: '0.85rem' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <input 
                              type="radio" 
                              name="shipping" 
                              checked={shippingType === 'expedited'} 
                              onChange={() => setShippingType('expedited')}
                            />
                            <span>Expedited Shipping 3-5 days</span>
                          </span>
                          <strong style={{ color: 'var(--text-primary)' }}>
                            ${(361.76 + (totalQuantity - 1) * 45).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </strong>
                        </label>
                        <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontSize: '0.85rem' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <input 
                              type="radio" 
                              name="shipping" 
                              checked={shippingType === 'standard'} 
                              onChange={() => setShippingType('standard')}
                            />
                            <span>Standard Shipping 6-8 days</span>
                          </span>
                          <strong style={{ color: 'var(--text-primary)' }}>
                            ${(303.26 + (totalQuantity - 1) * 45).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </strong>
                        </label>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-color)', paddingTop: '10px' }}>
                      <span>Platform Fees</span>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                        ${platformFees.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                    </div>

                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '1.3rem',
                      fontWeight: 800,
                      color: 'var(--color-green)',
                      borderTop: '1px solid var(--border-color)',
                      paddingTop: '12px',
                      marginTop: '4px'
                    }}>
                      <span>Total</span>
                      <span>${orderTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Information Panel */}
                <div className="glass-panel" style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                    Payment Information
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* Radio Selectors */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      
                      {/* Crypto Option */}
                      <label style={{ display: 'block', cursor: 'pointer' }}>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={paymentMethod === 'crypto'}
                            onChange={() => setPaymentMethod('crypto')}
                            style={{ marginTop: '3px' }}
                          />
                          <div>
                            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-header)' }}>
                              Cryptocurrency Payment (Bitcoin, ETH, USDT, USDC, KASPA and many more)
                            </span>
                          </div>
                        </div>

                        {/* Custom Cryptopay strip */}
                        {paymentMethod === 'crypto' && (
                          <div style={{
                            background: 'linear-gradient(90deg, #13b56c 0%, #00e676 100%)',
                            borderRadius: '8px',
                            padding: '10px 14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginTop: '12px',
                            boxShadow: '0 4px 15px rgba(0, 230, 118, 0.15)'
                          }}>
                            <span style={{ color: 'white', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.05em' }}>CRYPTO PAY</span>
                            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                              <span style={{ background: 'white', color: '#f7931a', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold' }}>₿</span>
                              <span style={{ background: '#26a17b', color: 'white', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 'bold' }}>₮</span>
                              <span style={{ background: '#ef263c', color: 'white', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 'bold' }}>T</span>
                              <span style={{ background: '#627eea', color: 'white', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 'bold' }}>Ξ</span>
                              <span style={{ background: '#c2a633', color: 'white', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 'bold' }}>Ð</span>
                              <span style={{ background: '#4cc5b9', color: 'white', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 'bold' }}>K</span>
                            </div>
                          </div>
                        )}
                      </label>

                      {/* Bank Wire Option */}
                      <label style={{ display: 'block', cursor: 'pointer', borderTop: '1px solid var(--border-color)', paddingTop: '14px' }}>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={paymentMethod === 'wire'}
                            onChange={() => setPaymentMethod('wire')}
                          />
                          <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-header)' }}>
                            Direct bank transfer
                          </span>
                        </div>
                      </label>

                    </div>

                    {/* Disclaimers & Agreements */}
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-color)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      <p style={{ lineHeight: '1.6' }}>
                        Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <span style={{ color: 'var(--text-header)', textDecoration: 'underline', cursor: 'pointer' }}>privacy policy</span>.
                      </p>

                      <label style={{ display: 'flex', gap: '8px', cursor: 'pointer', alignItems: 'start' }}>
                        <input
                          type="checkbox"
                          required
                          checked={agreeTerms}
                          onChange={(e) => setAgreeTerms(e.target.checked)}
                          style={{ marginTop: '3px' }}
                        />
                        <span>
                          I have read and agree to the website <span style={{ color: 'var(--color-blue)', textDecoration: 'underline' }}>terms and conditions</span> *
                        </span>
                      </label>
                    </div>

                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      style={{ 
                        width: '100%', 
                        padding: '14px', 
                        fontWeight: 'bold', 
                        fontSize: '1rem', 
                        marginTop: '10px',
                        cursor: 'pointer'
                      }}
                    >
                      Place Order
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </form>
          </>
        )}

        {step === 'success' && (
          <div className="glass-panel" style={{
            padding: '50px 30px',
            maxWidth: '680px',
            margin: '0 auto',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
            border: '1px solid var(--color-green)',
            boxShadow: 'var(--shadow-glow)'
          }}>
            <div style={{
              background: 'var(--color-green)',
              color: 'black',
              borderRadius: '50%',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(0, 230, 118, 0.4)'
            }}>
              <CheckCircle2 size={40} strokeWidth={2.5} />
            </div>

            <div>
              <h1 style={{ fontSize: '2rem', marginBottom: '10px' }}>Order Submitted Successfully</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Your order is logged and awaiting payment confirmation.
              </p>
            </div>

            <div style={{
              background: 'var(--bg-main)',
              border: '1px solid var(--border-color)',
              padding: '20px',
              borderRadius: '8px',
              width: '100%',
              fontSize: '0.88rem',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Order ID:</span>
                <strong style={{ color: 'var(--text-header)' }}>{displayOrderId}</strong>
              </div>
              <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Total Invoice:</span>
                <strong style={{ color: 'var(--color-green)' }}>${displayOrderTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong>
              </div>
              <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Deliver to:</span>
                <strong style={{ color: 'var(--text-header)' }}>{displayFirstName} {displayLastName}</strong>
              </div>
              <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Shipping Address:</span>
                <strong style={{ color: 'var(--text-header)', textAlign: 'right' }}>
                  {displayAddress}, {displayCity}, {displayCountry}
                </strong>
              </div>
              <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>ZIP Code:</span>
                <strong style={{ color: 'var(--text-header)' }}>{displayZip}</strong>
              </div>
              <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Payment Type:</span>
                <strong style={{ color: 'var(--text-header)' }}>{displayPaymentMethod === 'crypto' ? `Direct Cryptocurrency (${currentOrder?.cryptoCoin || directSelectedCoin})` : 'Bank Wire Transfer'}</strong>
              </div>
            </div>

            {/* Payment Details Container */}
            {displayPaymentMethod === 'crypto' ? (
              /* ORIGINAL CRYPTO DEPOSIT INFO */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
                  
                  {/* Stepper Tabs Header */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '12px',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    paddingBottom: '16px',
                    width: '100%'
                  }}>
                    <button
                      type="button"
                      onClick={() => setDirectSelectorStep('choose')}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: directSelectorStep === 'choose' ? 'none' : '1px solid rgba(255,255,255,0.08)',
                        background: directSelectorStep === 'choose' ? 'linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%)' : 'rgba(255,255,255,0.01)',
                        color: directSelectorStep === 'choose' ? 'white' : 'var(--text-secondary)',
                        fontSize: '0.88rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        boxShadow: directSelectorStep === 'choose' ? '0 4px 15px rgba(59, 130, 246, 0.2)' : 'none',
                        transition: 'all 0.2s ease',
                        textAlign: 'center'
                      }}
                    >
                      1. Choose asset
                    </button>
                    <button
                      type="button"
                      onClick={() => setDirectSelectorStep('deposit')}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: directSelectorStep === 'deposit' ? 'none' : '1px solid rgba(255,255,255,0.08)',
                        background: directSelectorStep === 'deposit' ? 'linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%)' : 'rgba(255,255,255,0.01)',
                        color: directSelectorStep === 'deposit' ? 'white' : 'var(--text-secondary)',
                        fontSize: '0.88rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        boxShadow: directSelectorStep === 'deposit' ? '0 4px 15px rgba(59, 130, 246, 0.2)' : 'none',
                        transition: 'all 0.2s ease',
                        textAlign: 'center'
                      }}
                    >
                      2. Send deposit
                    </button>
                  </div>

                  {directSelectorStep === 'choose' ? (
                    /* STEP 1: CHOOSE ASSET PANEL */
                    <div className="glass-panel animate-fade-in" style={{
                      padding: '30px',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, rgba(10,18,36,0.9) 0%, rgba(5,10,20,0.95) 100%)',
                      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
                      textAlign: 'left',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px'
                    }}>
                      <span style={{ display: 'block', fontSize: '0.9rem', color: 'white', fontWeight: 600 }}>
                        Select Direct Payment Coin:
                      </span>

                      {/* Search Input */}
                      <div style={{ position: 'relative' }}>
                        <input
                          type="text"
                          placeholder="Type a currency"
                          value={coinSearchQuery}
                          onChange={(e) => setCoinSearchQuery(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '12px 12px 12px 42px',
                            background: 'rgba(255,255,255,0.02)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '8px',
                            color: 'white',
                            fontSize: '0.9rem',
                            outline: 'none',
                            transition: 'all 0.2s ease'
                          }}
                          onFocus={(e) => e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)'}
                          onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                        />
                        <span style={{
                          position: 'absolute',
                          left: '14px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: 'var(--text-muted)',
                          fontSize: '1rem',
                          pointerEvents: 'none'
                        }}>🔍</span>
                      </div>

                      {/* Quick Filter Tabs */}
                      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
                        {[
                          { id: 'all', label: 'All' },
                          { id: 'popular', label: 'Popular' },
                          { id: 'stable', label: 'Stablecoins' }
                        ].map(t => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => setActiveFilterTab(t.id as any)}
                            style={{
                              background: activeFilterTab === t.id ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.01)',
                              border: activeFilterTab === t.id ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(255,255,255,0.08)',
                              borderRadius: '6px',
                              color: activeFilterTab === t.id ? 'white' : 'var(--text-secondary)',
                              padding: '6px 16px',
                              fontSize: '0.8rem',
                              fontWeight: activeFilterTab === t.id ? 'bold' : 'normal',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>

                      {/* Scrollable Coin List */}
                      <div style={{
                        maxHeight: '280px',
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                        paddingRight: '4px',
                        border: '1px solid rgba(255,255,255,0.05)',
                        borderRadius: '8px',
                        padding: '8px',
                        background: 'rgba(0,0,0,0.1)'
                      }}>
                        {filteredCoins.length > 0 ? (
                          filteredCoins.map((coin) => {
                            const isSelected = directSelectedCoin === coin.id;
                            const decimals = ['BTC'].includes(coin.id) ? 6 : ['ETH'].includes(coin.id) ? 5 : ['SHIB', 'PEPE'].includes(coin.id) ? 0 : 2;
                            const cryptoAmount = (displayOrderTotal / coin.rate).toFixed(decimals);
                            const badgeText = coin.id.includes('_') ? coin.id.split('_')[1] : coin.id;

                            return (
                              <button
                                key={coin.id}
                                type="button"
                                onClick={() => {
                                  setDirectSelectedCoin(coin.id as any);
                                  updateOrderCoin(displayOrderId, coin.id);
                                  setDirectSelectorStep('deposit');
                                }}
                                style={{
                                  background: isSelected ? 'rgba(0, 230, 118, 0.08)' : 'rgba(255,255,255,0.01)',
                                  border: isSelected ? '1px solid #00e676' : '1px solid rgba(255,255,255,0.05)',
                                  borderRadius: '8px',
                                  padding: '12px',
                                  cursor: 'pointer',
                                  textAlign: 'left',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  width: '100%',
                                  transition: 'all 0.2s ease'
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                                  <span style={{
                                    background: coin.color,
                                    color: 'white',
                                    borderRadius: '50%',
                                    width: '32px',
                                    height: '32px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    flexShrink: 0
                                  }}>{coin.icon}</span>

                                  <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                      <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'white' }}>
                                        {coin.id.split('_')[0]}
                                      </span>
                                      <span style={{
                                        fontSize: '0.68rem',
                                        fontWeight: 800,
                                        padding: '2px 6px',
                                        borderRadius: '4px',
                                        background: badgeText === 'ETH' ? '#627eea' : badgeText === 'TRX' ? '#ef263c' : badgeText === 'SOL' ? '#14f195' : badgeText === 'BASE' ? '#0052ff' : '#8247e5',
                                        color: badgeText === 'SOL' ? 'black' : 'white',
                                        textTransform: 'uppercase'
                                      }}>
                                        {badgeText}
                                      </span>
                                    </div>
                                    <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                                      {coin.name.includes('(') ? coin.name.split('(')[1].replace(')', '') : coin.name}
                                    </span>
                                  </div>
                                </div>

                                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', textAlign: 'right', fontWeight: 600 }}>
                                  {cryptoAmount} {coin.id.split('_')[0]}
                                </span>
                              </button>
                            );
                          })
                        ) : (
                          <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                            No currencies match your search.
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    /* STEP 2: SEND DEPOSIT PANEL */
                    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                      {/* Network warning based on selection */}
                      <div style={{
                        background: 'rgba(255, 23, 68, 0.04)',
                        border: '1px solid rgba(255, 23, 68, 0.2)',
                        borderRadius: '6px',
                        padding: '12px 16px',
                        fontSize: '0.82rem',
                        color: 'var(--color-red)',
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'center',
                        textAlign: 'left'
                      }}>
                        <ShieldCheck size={24} style={{ color: 'var(--color-red)', flexShrink: 0 }} />
                        <span>
                          {getCoinWarning(directSelectedCoin)}
                        </span>
                      </div>

                      {/* Deposit Address Box */}
                      <div style={{
                        background: 'var(--bg-main)',
                        padding: '20px',
                        borderRadius: '8px',
                        border: '1px solid var(--border-color)',
                        display: 'flex',
                        gap: '24px',
                        alignItems: 'center',
                        textAlign: 'left'
                      }} className="crypto-details-row">
                        
                        {/* Dynamic QR Code */}
                        <div style={{
                          background: 'white',
                          padding: '8px',
                          borderRadius: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          width: '101px',
                          height: '101px',
                          border: '1px solid var(--border-color)'
                        }}>
                          {(() => {
                            const customQr = getCoinQr(directSelectedCoin, paymentSettings);
                            const address = getCoinAddress(directSelectedCoin, paymentSettings);
                            if (customQr) {
                              return <img src={customQr} alt="QR Code" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />;
                            } else if (address) {
                              return <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(address)}`} alt="QR Code" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />;
                            } else {
                              return (
                                <svg width="85" height="85" viewBox="0 0 100 100" fill="black">
                                  <rect x="5" y="5" width="20" height="20" fill="black"/>
                                  <rect x="8" y="8" width="14" height="14" fill="white"/>
                                  <rect x="11" y="11" width="8" height="8" fill="black"/>
                                  <rect x="75" y="5" width="20" height="20" fill="black"/>
                                  <rect x="78" y="8" width="14" height="14" fill="white"/>
                                  <rect x="81" y="11" width="8" height="8" fill="black"/>
                                  <rect x="5" y="75" width="20" height="20" fill="black"/>
                                  <rect x="8" y="78" width="14" height="14" fill="white"/>
                                  <rect x="11" y="81" width="8" height="8" fill="black"/>
                                  
                                  <rect x="30" y="10" width="10" height="10" fill="black"/>
                                  <rect x="50" y="20" width="5" height="15" fill="black"/>
                                  <rect x="40" y="45" width="20" height="20" fill="black"/>
                                  <rect x="70" y="50" width="15" height="10" fill="black"/>
                                  <rect x="15" y="50" width="10" height="15" fill="black"/>
                                  <rect x="65" y="70" width="20" height="20" fill="black"/>
                                </svg>
                              );
                            }
                          })()}
                        </div>

                        {/* Address details */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                            Send exactly: <strong style={{ color: 'white', fontSize: '0.95rem' }}>
                              {(() => {
                                const coin = CRYPTO_COINS.find(c => c.id === directSelectedCoin) || CRYPTO_COINS[0];
                                const decimals = ['BTC'].includes(coin.id) ? 6 : ['ETH'].includes(coin.id) ? 5 : ['SHIB', 'PEPE'].includes(coin.id) ? 0 : 2;
                                return (displayOrderTotal / coin.rate).toFixed(decimals);
                              })()} {directSelectedCoin.split('_')[0]}
                            </strong>
                          </span>
                          
                          <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                            {directSelectedCoin.split('_')[0]} Deposit Wallet Address:
                          </span>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            background: 'var(--bg-input)',
                            border: '1px solid var(--border-color)',
                            padding: '8px 12px',
                            borderRadius: '6px',
                            fontSize: '0.85rem'
                          }}>
                            <code style={{ color: 'var(--text-header)', wordBreak: 'break-all' }}>
                              {getCoinAddress(directSelectedCoin, paymentSettings)}
                            </code>
                            <button
                              type="button"
                              onClick={() => handleCopyAddress(
                                getCoinAddress(directSelectedCoin, paymentSettings)
                              )}
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: copiedText ? 'var(--color-green)' : 'var(--text-secondary)',
                                marginLeft: '10px'
                              }}
                            >
                              {copiedText ? <Check size={16} /> : <Copy size={16} />}
                            </button>
                          </div>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginTop: '6px' }}>
                            * Transfer to a wrong protocol cannot be recovered. Ensure you send exactly the amount above.
                          </span>
                        </div>
                      </div>

                      {/* WEB3 INLINE AUTO-PAY BUTTON */}
                      <div style={{
                        background: 'var(--bg-input)',
                        border: '1px solid var(--border-color)',
                        padding: '20px',
                        borderRadius: '8px',
                        textAlign: 'left'
                      }}>
                        <strong style={{ color: 'var(--text-header)', display: 'block', marginBottom: '8px', fontSize: '0.88rem' }}>
                          Web3 Wallet Auto-Pay (MetaMask)
                        </strong>
                        
                        {['USDT', 'ETH'].includes(directSelectedCoin) ? (
                          <>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.5' }}>
                              Connect your MetaMask browser extension to directly pay the exact invoice total of <strong>
                                {directSelectedCoin === 'ETH' ? (
                                  `${(displayOrderTotal / (CRYPTO_COINS.find(c => c.id === 'ETH')?.rate || 3790)).toFixed(5)} ETH`
                                ) : (
                                  `$${displayOrderTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })} USDT`
                                )}
                              </strong> in one click.
                            </p>

                            {web3Status === 'idle' && (
                              <button
                                type="button"
                                onClick={handleWeb3Payment}
                                className="btn btn-accent"
                                style={{
                                  width: '100%',
                                  padding: '12px',
                                  fontWeight: 'bold',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  gap: '8px',
                                  background: 'linear-gradient(135deg, #ff8f00 0%, #ff6f00 100%)',
                                  border: 'none',
                                  color: 'black',
                                  cursor: 'pointer'
                                }}
                              >
                                <span>🦊 Pay with MetaMask Wallet</span>
                              </button>
                            )}

                            {web3Status === 'connecting' && (
                              <div style={{ color: 'var(--color-gold)', fontSize: '0.85rem', fontWeight: 600 }}>
                                ⏳ Connecting to MetaMask extension...
                              </div>
                            )}

                            {web3Status === 'network' && (
                              <div style={{ color: 'var(--color-gold)', fontSize: '0.85rem', fontWeight: 600 }}>
                                🔌 Verifying network connection (Switching to Ethereum Mainnet)...
                              </div>
                            )}

                            {web3Status === 'awaiting' && (
                              <div style={{ color: 'var(--color-gold)', fontSize: '0.85rem', fontWeight: 600 }}>
                                ✍️ Please sign/confirm the transfer in your MetaMask extension...
                              </div>
                            )}

                            {web3Status === 'submitting' && (
                              <div style={{ color: 'var(--color-blue)', fontSize: '0.85rem', fontWeight: 600 }}>
                                📡 Broadcasting transfer transaction to the Ethereum mempool...
                              </div>
                            )}

                            {web3Status === 'confirmed' && (
                              <div style={{
                                background: 'rgba(0, 230, 118, 0.05)',
                                border: '1px solid rgba(0, 230, 118, 0.2)',
                                borderRadius: '6px',
                                padding: '12px',
                                color: 'var(--color-green)',
                                fontSize: '0.85rem',
                                lineHeight: '1.5'
                              }}>
                                <strong style={{ display: 'block', marginBottom: '4px' }}>✅ Web3 Transaction Broadcasted!</strong>
                                <span>Hash: </span>
                                <code style={{ wordBreak: 'break-all', fontSize: '0.78rem', color: 'var(--text-header)' }}>{web3TxHash}</code>
                                <span style={{ display: 'block', marginTop: '6px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                                  We are tracking this transaction. Once confirmed on-chain, your order will be marked as paid.
                                </span>
                              </div>
                            )}

                            {web3Status === 'error' && (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <div style={{
                                  background: 'rgba(255, 23, 68, 0.05)',
                                  border: '1px solid rgba(255, 23, 68, 0.2)',
                                  borderRadius: '6px',
                                  padding: '12px',
                                  color: '#ff8a80',
                                  fontSize: '0.82rem',
                                  lineHeight: '1.5'
                                }}>
                                  <strong>Error:</strong> {web3Error}
                                </div>
                                <button
                                  type="button"
                                  onClick={handleWeb3Payment}
                                  className="btn btn-secondary"
                                  style={{ fontSize: '0.8rem', padding: '8px 16px', cursor: 'pointer' }}
                                >
                                  Retry Web3 Payment
                                </button>
                              </div>
                            )}
                          </>
                        ) : (
                          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>
                            MetaMask Web3 Auto-Pay is only supported for USDT (ERC-20 on Ethereum) and Native ETH payments. Since you selected <strong>{directSelectedCoin.split('_')[0]} {(() => {
                              const coinDetails = CRYPTO_COINS.find(c => c.id === directSelectedCoin);
                              return coinDetails ? `(${coinDetails.name.includes('(') ? coinDetails.name.split('(')[1].replace(')', '') : coinDetails.name})` : '';
                            })()}</strong>, please complete your payment manually using the QR code or deposit address above.
                          </p>
                        )}
                      </div>

                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                        <p>
                          We are monitoring blockchain network confirmations for credit. Once detected on-chain, we will email your tracking link and DHL air waybill code to <strong>{displayEmail}</strong>.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
              /* BANK WIRE DEPOSIT INFO */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6', textAlign: 'left' }}>
                  Please transfer the invoice total directly to our corporate bank account below. Enter your Order Reference number in the transfer description field.
                </p>

                <div style={{
                  background: 'var(--bg-main)',
                  border: '1px solid var(--border-color)',
                  padding: '20px',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  textAlign: 'left'
                }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Beneficiary:</span>
                    <strong style={{ color: 'var(--text-header)' }}>{paymentSettings.bankBeneficiary}</strong>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Bank Name:</span>
                    <strong style={{ color: 'var(--text-header)' }}>{paymentSettings.bankName}</strong>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>SWIFT Code:</span>
                    <strong style={{ color: 'var(--text-header)' }}>{paymentSettings.bankSwift}</strong>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Account Number:</span>
                    <strong style={{ color: 'var(--color-blue)' }}>{paymentSettings.bankAccount}</strong>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Reference Number:</span>
                    <strong style={{ color: 'var(--color-gold)' }}>{orderId}</strong>
                  </div>
                </div>

                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                  <p>
                    Please email your Swift/payment receipt receipt reference to <strong>sales@apextomining.com</strong>. The logistics team will dispatch the hardware as soon as the credit clears.
                  </p>
                </div>
              </div>
            )}

            <button 
              onClick={handleFinish} 
              className="btn btn-primary"
              style={{ width: '220px', marginTop: '10px' }}
            >
              Back to Homepage
            </button>
          </div>
        )}

      </div>
      
      <style>{`
        .checkout-main-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 30px;
        }
        @media (min-width: 769px) {
          .checkout-main-grid {
            grid-template-columns: 1.1fr 0.9fr;
          }
        }
        .crypto-details-row {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        @media (min-width: 577px) {
          .crypto-details-row {
            flex-direction: row;
          }
        }
        @media (max-width: 768px) {
          .checkout-main-grid, .form-row, .crypto-details-row {
            grid-template-columns: 1fr !important;
            flex-direction: column !important;
          }
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.6; }
          100% { transform: scale(1); opacity: 1; }
        }
        .nowpayments-grid {
          display: grid;
          grid-template-columns: 1fr;
        }
        @media (min-width: 577px) {
          .nowpayments-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        /* Custom scrollbar and animations for redesigned crypto widget */
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        /* Custom scrollbar styles */
        div::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        div::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 4px;
        }
        div::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 4px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
};
