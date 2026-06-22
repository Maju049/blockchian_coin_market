import React from 'react';
import { Product } from '../data/mockData';
import { AsicImage } from './AsicImage';
import { useCart } from '../context/CartContext';
import { useStore } from '../context/StoreContext';
import { calculateProfit } from '../utils/profitCalc';
import { Eye, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onViewDetails: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const { addToCart } = useCart();
  const { electricityCost } = useStore();

  const profitResults = calculateProfit(product, electricityCost);
  const isProfitable = profitResults.profit > 0;

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'In Stock': return 'badge-green';
      case 'Hot': return 'badge-red';
      case 'Pre-order': return 'badge-gold';
      default: return 'badge-red';
    }
  };

  return (
    <div 
      className="glass-panel glow-green"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        padding: '16px'
      }}
    >
      {/* Brand & Status Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px'
      }}>
        <span style={{
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          fontWeight: 700,
          letterSpacing: '0.05em',
          textTransform: 'uppercase'
        }}>
          {product.brand}
        </span>
        <span className={`badge ${getStatusBadgeClass(product.status)}`}>
          {product.status}
        </span>
      </div>

      {/* Product Image (Upload or SVG Vector fallback) */}
      <div 
        onClick={() => onViewDetails(product.id)}
        style={{ 
          cursor: 'pointer', 
          marginBottom: '16px', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          width: '220px', 
          height: '160px', 
          margin: '0 auto 16px auto', 
          overflow: 'hidden' 
        }}
      >
        {(() => {
          const coverImage = product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls[0] : product.imageUrl;
          return coverImage ? (
            <img 
              src={coverImage} 
              alt={product.name} 
              style={{ 
                maxWidth: '100%', 
                maxHeight: '100%', 
                objectFit: 'contain',
                borderRadius: '6px'
              }} 
            />
          ) : (
            <AsicImage 
              brand={product.brand}
              coolingType={product.coolingType as any}
              hashrate={product.hashrate}
              hashrateUnit={product.hashrateUnit}
              status={product.status}
              width={220}
              height={160}
            />
          );
        })()}
      </div>

      {/* Product Title */}
      <h3 
        onClick={() => onViewDetails(product.id)}
        style={{
          fontSize: '1.1rem',
          fontWeight: 700,
          marginBottom: '10px',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}
      >
        {product.name}
      </h3>

      {/* Technical Specifications list */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.02)',
        borderRadius: '6px',
        padding: '10px 12px',
        fontSize: '0.82rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        marginBottom: '16px',
        border: '1px solid rgba(255, 255, 255, 0.03)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Hashrate:</span>
          <span style={{ fontWeight: 600, color: 'white' }}>{product.hashrate} {product.hashrateUnit}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Power:</span>
          <span style={{ fontWeight: 600, color: 'white' }}>{product.power} W</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Algorithm:</span>
          <span style={{ fontWeight: 600, color: 'var(--color-blue)' }}>{product.algorithm}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed rgba(255,255,255,0.08)', paddingTop: '6px', marginTop: '4px' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Est. Daily Profit:</span>
          <span style={{ fontWeight: 700, color: isProfitable ? 'var(--color-green)' : 'var(--color-red)' }}>
            {isProfitable ? '+' : ''}${profitResults.profit.toFixed(2)}/day
          </span>
        </div>
      </div>

      {/* Price and CTA Block */}
      <div style={{
        marginTop: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '10px',
        paddingTop: '12px',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <div>
          <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)' }}>MSRP Price</span>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-green)' }}>
            ${product.price.toLocaleString()}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '6px' }}>
          <button 
            onClick={() => onViewDetails(product.id)}
            className="btn-icon"
            style={{ width: '36px', height: '36px' }}
            title="View Details"
          >
            <Eye size={15} />
          </button>
          
          <button 
            onClick={() => addToCart(product)}
            className="btn btn-primary"
            style={{
              padding: '0 12px',
              height: '36px',
              fontSize: '0.8rem',
              borderRadius: '6px'
            }}
            title="Add to Cart"
          >
            <ShoppingCart size={14} />
            <span>Buy</span>
          </button>
        </div>
      </div>
    </div>
  );
};
