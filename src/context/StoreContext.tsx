import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Staff, PRODUCTS, STAFF_MEMBERS, SCAM_WARNINGS } from '../data/mockData';

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  status: 'Pending Payment' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    address: string;
    city: string;
    zip: string;
  };
  items: OrderItem[];
  total: number;
  paymentMethod: 'crypto' | 'wire';
  cryptoCoin?: string;
  nowpaymentsInvoiceId?: string;
  nowpaymentsInvoiceUrl?: string;
}

export interface PaymentSettings {
  usdtAddress: string;
  btcAddress: string;
  ethAddress: string;
  ltcAddress: string;
  dogeAddress: string;
  kasAddress: string;
  solAddress: string;
  tronAddress: string;
  bchAddress: string;
  xrpAddress: string;
  xlmAddress: string;
  xmrAddress: string;
  usdtQr?: string;
  btcQr?: string;
  ethQr?: string;
  ltcQr?: string;
  dogeQr?: string;
  kasQr?: string;
  solQr?: string;
  tronQr?: string;
  bchQr?: string;
  xrpQr?: string;
  xlmQr?: string;
  xmrQr?: string;
  bankBeneficiary: string;
  bankName: string;
  bankSwift: string;
  bankAccount: string;
  useNowPayments: boolean;
  nowpaymentsApiKey: string;
  nowpaymentsIpnSecret: string;
}

interface StoreContextType {
  products: Product[];
  staff: Staff[];
  scams: { [key: string]: string };
  orders: Order[];
  paymentSettings: PaymentSettings;
  electricityCost: number;
  setElectricityCost: (cost: number) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  addOrder: (order: Omit<Order, 'date' | 'status'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  updateOrderCoin: (orderId: string, coin: string) => void;
  addStaff: (staff: Staff) => void;
  removeStaff: (telegram: string) => void;
  addScam: (handle: string, warning: string) => void;
  updatePaymentSettings: (settings: PaymentSettings) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('apexmining_products_v3');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= PRODUCTS.length) {
          return parsed;
        }
      } catch (e) {}
    }
    return PRODUCTS;
  });

  // Load staff
  const [staff, setStaff] = useState<Staff[]>(() => {
    const saved = localStorage.getItem('apexmining_staff_v3');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= STAFF_MEMBERS.length) {
          return parsed;
        }
      } catch (e) {}
    }
    return STAFF_MEMBERS;
  });

  // Load scams
  const [scams, setScams] = useState<{ [key: string]: string }>(() => {
    const saved = localStorage.getItem('apexmining_scams_v3');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Object.keys(parsed).length >= Object.keys(SCAM_WARNINGS).length) {
          return parsed;
        }
      } catch (e) {}
    }
    return SCAM_WARNINGS;
  });

  // Load orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('apexmining_orders_v3');
    return saved ? JSON.parse(saved) : [];
  });

  // Load electricity cost
  const [electricityCost, setElectricityCost] = useState<number>(() => {
    const saved = localStorage.getItem('apexmining_electricity_cost_v3');
    return saved ? Number(saved) : 0.10;
  });

  // Load payment settings
  const [paymentSettings, setPaymentSettings] = useState<PaymentSettings>(() => {
    const saved = localStorage.getItem('apexmining_payment_settings_v3');
    const defaults: PaymentSettings = {
      usdtAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
      btcAddress: 'bc1qxy2kg3sk5ftzth72pqg22z47tsf24xcls35dx6',
      ethAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
      ltcAddress: 'LMockLitecoinAddress72pqg22z47tsf24xcl',
      dogeAddress: 'DMockDogecoinAddress72pqg22z47tsf24xcl',
      kasAddress: 'kaspa:qmockkaspaaddress72pqg22z47tsf24xcl',
      solAddress: 'SolMockAddress72pqg22z47tsf24xcls35dx6sol',
      tronAddress: 'TTRXMockAddress72pqg22z47tsf24xcls35dxtrx',
      bchAddress: 'qmockbitcoincashaddress72pqg22z47tsf24xcl',
      xrpAddress: 'rMockRippleAddress72pqg22z47tsf24xcls35dxrp',
      xlmAddress: 'GDXMockStellarAddress72pqg22z47tsf24xcls35xlm',
      xmrAddress: '44AFFMockMoneroAddress72pqg22z47tsf24xcls35xmr',
      usdtQr: '',
      btcQr: '',
      ethQr: '',
      ltcQr: '',
      dogeQr: '',
      kasQr: '',
      solQr: '',
      tronQr: '',
      bchQr: '',
      xrpQr: '',
      xlmQr: '',
      xmrQr: '',
      bankBeneficiary: 'APEXTO COMPANY LIMITED',
      bankName: 'HSBC HONG KONG LTD',
      bankSwift: 'HSBCHKHhh90',
      bankAccount: '848-992145-001',
      useNowPayments: false,
      nowpaymentsApiKey: 'SANDBOX_DEMO_KEY',
      nowpaymentsIpnSecret: 'IPN_SECRET_MOCK'
    };
    if (saved) {
      try {
        return { ...defaults, ...JSON.parse(saved) };
      } catch (e) {
        return defaults;
      }
    }
    return defaults;
  });

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('apexmining_products_v3', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('apexmining_staff_v3', JSON.stringify(staff));
  }, [staff]);

  useEffect(() => {
    localStorage.setItem('apexmining_scams_v3', JSON.stringify(scams));
  }, [scams]);

  useEffect(() => {
    localStorage.setItem('apexmining_orders_v3', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('apexmining_payment_settings_v3', JSON.stringify(paymentSettings));
  }, [paymentSettings]);

  useEffect(() => {
    localStorage.setItem('apexmining_electricity_cost_v3', String(electricityCost));
  }, [electricityCost]);

  // CRUD actions for products
  const addProduct = (p: Omit<Product, 'id'>) => {
    const id = `${p.brand.toLowerCase()}-${p.model.toLowerCase().replace(/\s+/g, '-')}-${Math.floor(100 + Math.random() * 900)}`;
    const newProduct: Product = { ...p, id };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (p: Product) => {
    setProducts((prev) => prev.map((item) => (item.id === p.id ? p : item)));
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== productId));
  };

  // Order Actions
  const addOrder = (orderData: Omit<Order, 'date' | 'status'>) => {
    const newOrder: Order = {
      ...orderData,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending Payment'
    };
    
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((item) => (item.id === orderId ? { ...item, status } : item))
    );
  };

  const updateOrderCoin = (orderId: string, coin: string) => {
    setOrders((prev) =>
      prev.map((item) => (item.id === orderId ? { ...item, cryptoCoin: coin } : item))
    );
  };

  // Staff and Scam Actions
  const addStaff = (s: Staff) => {
    setStaff((prev) => [s, ...prev]);
  };

  const removeStaff = (telegram: string) => {
    setStaff((prev) => prev.filter((s) => s.telegram !== telegram));
  };

  const addScam = (handle: string, warning: string) => {
    setScams((prev) => ({
      ...prev,
      [handle.toLowerCase().trim()]: warning
    }));
  };

  const updatePaymentSettings = (settings: PaymentSettings) => {
    setPaymentSettings(settings);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        staff,
        scams,
        orders,
        paymentSettings,
        electricityCost,
        setElectricityCost,
        addProduct,
        updateProduct,
        deleteProduct,
        addOrder,
        updateOrderStatus,
        updateOrderCoin,
        addStaff,
        removeStaff,
        addScam,
        updatePaymentSettings
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
