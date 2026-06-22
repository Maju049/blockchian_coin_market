import React, { useState } from 'react';
import { Cpu, Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer style={{
      background: 'var(--bg-footer)',
      borderTop: '1px solid var(--border-color)',
      paddingTop: '60px',
      paddingBottom: '30px',
      marginTop: 'auto'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px',
          marginBottom: '50px'
        }}>
          {/* Company Bio */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <div style={{
                background: 'linear-gradient(135deg, var(--color-green) 0%, var(--color-blue) 100%)',
                padding: '6px',
                borderRadius: '6px',
                color: '#000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Cpu size={18} />
              </div>
              <span style={{ fontFamily: 'var(--font-title)', fontWeight: 800, fontSize: '1.2rem', color: 'var(--text-header)' }}>
                APEXTO MINING
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '20px', lineHeight: '1.6' }}>
              Leading distributor of ASIC miners and hydro-cooling solutions worldwide since 2017. Delivering high-efficiency hardware directly from manufacturer hubs.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <div className="payment-badge">BTC</div>
              <div className="payment-badge">USDT</div>
              <div className="payment-badge">Bank Wire</div>
            </div>
          </div>

          {/* Logistics & Warehouses */}
          <div>
            <h4 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '20px', color: 'var(--text-header)' }}>
              Global Logistics
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <MapPin size={16} style={{ color: 'var(--color-blue)', marginTop: '3px', flexShrink: 0 }} />
                <span><strong>Shenzhen Head Office</strong><br />Futian District, Shenzhen, China</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <MapPin size={16} style={{ color: 'var(--color-blue)', marginTop: '3px', flexShrink: 0 }} />
                <span><strong>Hong Kong Warehouse</strong><br />Kwai Chung, NT, Hong Kong</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <MapPin size={16} style={{ color: 'var(--color-blue)', marginTop: '3px', flexShrink: 0 }} />
                <span><strong>US Hydro Center</strong><br />Houston, Texas, USA</span>
              </li>
            </ul>
          </div>

          {/* Quick Support */}
          <div>
            <h4 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '20px', color: 'var(--text-header)' }}>
              Contact Sales
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={16} style={{ color: 'var(--color-green)' }} />
                <span>+86 138 2356 8890</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={16} style={{ color: 'var(--color-green)' }} />
                <span>sales@apextomining.com</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MessageSquare size={16} style={{ color: 'var(--color-green)' }} />
                <span>Telegram: @Alice_Apexto</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '20px', color: 'var(--text-header)' }}>
              Price Drop Alerts
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '15px' }}>
              ASIC prices change daily. Subscribe to get our weekly inventory sheet and discount alerts.
            </p>
            <form onSubmit={handleSubscribe} style={{ display: 'flex', position: 'relative' }}>
              <input
                type="email"
                required
                placeholder="Enter email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                style={{
                  paddingRight: '48px',
                  borderRadius: '30px',
                  fontSize: '0.85rem'
                }}
              />
              <button
                type="submit"
                style={{
                  position: 'absolute',
                  right: '4px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'var(--color-green)',
                  border: 'none',
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'black'
                }}
              >
                <Send size={14} />
              </button>
            </form>
            {subscribed && (
              <p style={{ color: 'var(--color-green)', fontSize: '0.8rem', marginTop: '8px' }}>
                Thank you! You have subscribed successfully.
              </p>
            )}
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="footer-bottom" style={{
          borderTop: '1px solid var(--border-color)',
          paddingTop: '25px',
          fontSize: '0.78rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            &copy; {new Date().getFullYear()} Apexto Mining Tech Co., Ltd. All Rights Reserved.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span style={{ cursor: 'pointer' }}>Terms of Service</span>
            <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
            <span style={{ cursor: 'pointer' }}>Shipping Insurance</span>
          </div>
        </div>
      </div>

      <style>{`
        .payment-badge {
          background: var(--bg-input);
          border: 1px solid var(--border-color);
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-secondary);
          display: inline-block;
          margin-right: 6px;
        }
        .footer-bottom {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
        }
        @media (min-width: 769px) {
          .footer-bottom {
            flex-direction: row;
          }
        }
      `}</style>
    </footer>
  );
};
