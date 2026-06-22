import React from 'react';
import { useCart } from '../context/CartContext';
import { AsicImage } from './AsicImage';
import { X, Trash2, Plus, Minus, CreditCard, ShoppingBag } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, onCheckout }) => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop Overlay */}
      <div 
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(4px)',
          zIndex: 150,
          transition: 'var(--transition)'
        }}
      />

      {/* Cart Drawer */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        height: '100%',
        width: '450px',
        maxWidth: '100%',
        background: 'var(--bg-drawer)',
        borderLeft: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-lg)',
        zIndex: 160,
        display: 'flex',
        flexDirection: 'column',
        animation: 'slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        {/* Header */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={20} style={{ color: 'var(--color-green)' }} />
            <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Shopping Cart</h3>
          </div>
          <button 
            onClick={onClose}
            className="btn-icon"
            style={{ width: '32px', height: '32px' }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Item List */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          {cart.length === 0 ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '80%',
              color: 'var(--text-secondary)',
              gap: '15px'
            }}>
              <ShoppingBag size={48} strokeWidth={1} style={{ color: 'var(--text-muted)' }} />
              <p>Your cart is empty.</p>
              <button 
                onClick={onClose}
                className="btn btn-secondary"
                style={{ fontSize: '0.85rem', padding: '10px 20px' }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div 
                key={item.id}
                style={{
                  display: 'flex',
                  gap: '16px',
                  paddingBottom: '20px',
                  borderBottom: '1px solid var(--border-color)'
                }}
              >
                {/* Product image/graphics Mini */}
                <div style={{ flexShrink: 0 }}>
                  {(() => {
                    const coverImage = item.product.imageUrls && item.product.imageUrls.length > 0 ? item.product.imageUrls[0] : item.product.imageUrl;
                    return coverImage ? (
                      <div style={{ 
                        width: '90px', 
                        height: '75px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        background: 'var(--bg-image-grad)', 
                        borderRadius: '8px', 
                        border: '1px solid var(--border-color)', 
                        overflow: 'hidden' 
                      }}>
                        <img 
                          src={coverImage} 
                          alt={item.product.name} 
                          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
                        />
                      </div>
                    ) : (
                      <AsicImage 
                        brand={item.product.brand}
                        coolingType={item.product.coolingType as any}
                        hashrate={item.product.hashrate}
                        hashrateUnit={item.product.hashrateUnit}
                        status={item.product.status}
                        width={90}
                        height={75}
                      />
                    );
                  })()}
                </div>

                {/* Meta details */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '4px', color: 'var(--text-header)' }}>
                      {item.product.name}
                    </h4>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      Algo: {item.product.algorithm}
                    </span>
                  </div>

                  {/* Quantity controls & price */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      background: 'var(--bg-input)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '4px',
                      padding: '2px'
                    }}>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
                      >
                        <Minus size={12} />
                      </button>
                      <span style={{ padding: '0 10px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-green)' }}>
                      ${(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Remove button */}
                <button 
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    alignSelf: 'flex-start',
                    padding: '4px',
                    transition: 'var(--transition)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-red)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer actions */}
        {cart.length > 0 && (
          <div style={{
            padding: '24px',
            borderTop: '1px solid var(--border-color)',
            background: 'var(--bg-drawer-footer)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Subtotal:</span>
              <span style={{ color: 'var(--text-header)', fontSize: '1.4rem', fontWeight: 800 }}>
                ${getCartTotal().toLocaleString()}
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
              * Shipping and tax will be calculated during the checkout process. Real-time rates apply.
            </p>
            <button 
              onClick={onCheckout}
              className="btn btn-primary"
              style={{ width: '100%', display: 'flex', gap: '10px' }}
            >
              <CreditCard size={18} />
              <span>Proceed to Checkout</span>
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  );
};
