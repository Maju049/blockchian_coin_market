import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, ShieldAlert, Search, Check, HelpCircle } from 'lucide-react';

export const StaffVerifier: React.FC = () => {
  const { staff, scams } = useStore();
  const [query, setQuery] = useState('');
  const [checked, setChecked] = useState(false);
  const [result, setResult] = useState<{
    type: 'verified' | 'scam' | 'unverified';
    data?: any;
    message?: string;
  } | null>(null);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const normalizedQuery = query.trim().toLowerCase();

    // Check verified staff
    const matchedStaff = staff.find(
      (s) =>
        s.telegram.toLowerCase() === normalizedQuery ||
        s.telegram.toLowerCase() === `@${normalizedQuery}` ||
        s.email.toLowerCase() === normalizedQuery ||
        s.whatsapp.replace(/\s+/g, '').includes(normalizedQuery.replace(/\s+/g, ''))
    );

    if (matchedStaff) {
      setResult({
        type: 'verified',
        data: matchedStaff
      });
    } else {
      // Check known scams
      const cleanQuery = normalizedQuery.startsWith('@') ? normalizedQuery : `@${normalizedQuery}`;
      const matchedScam = scams[cleanQuery];

      if (matchedScam) {
        setResult({
          type: 'scam',
          message: matchedScam
        });
      } else {
        // Unverified
        setResult({
          type: 'unverified'
        });
      }
    }

    setChecked(true);
  };

  return (
    <div className="section animate-fade-in" style={{ paddingTop: '40px' }}>
      <div className="container" style={{ maxWidth: '750px' }}>
        
        {/* Title Block */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            background: 'rgba(0, 229, 255, 0.1)',
            padding: '12px',
            borderRadius: '50%',
            color: 'var(--color-blue)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '15px',
            boxShadow: 'var(--shadow-glow-blue)',
            border: '1px solid rgba(0, 229, 255, 0.2)'
          }}>
            <ShieldCheck size={32} />
          </div>
          <h1 style={{ fontSize: '2.2rem', marginBottom: '10px' }}>Anti-Fraud Staff Verifier</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
            Phishing accounts frequently impersonate our sales reps. Enter their Telegram handle, email, or WhatsApp phone number below to confirm their official credentials.
          </p>
        </div>

        {/* Verification Input Box */}
        <div className="glass-panel" style={{ padding: '30px', marginBottom: '35px' }}>
          <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-header)', fontWeight: 600 }}>
              Agent Contact Details
            </label>
            <div style={{ display: 'flex', position: 'relative' }}>
              <input
                type="text"
                required
                placeholder="e.g. @Alice_Apexto or alice.c@apextomining.com"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setChecked(false);
                }}
                className="form-input"
                style={{
                  paddingLeft: '44px',
                  borderRadius: '6px',
                  fontSize: '0.95rem',
                  height: '48px'
                }}
              />
              <Search size={18} style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)'
              }} />
            </div>
            <button 
              type="submit" 
              className="btn btn-primary"
              style={{ height: '48px' }}
            >
              Verify Representative credentials
            </button>
          </form>

          {/* Quick tips list */}
          <div style={{ marginTop: '20px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            <span style={{ fontWeight: 'bold', color: 'var(--text-header)', display: 'block', marginBottom: '6px' }}>Verification Tips:</span>
            <ul style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <li>Telegram usernames are case-sensitive. Verify the exact spelling.</li>
              <li>Official representatives will ONLY email you from `@apextomining.com` addresses.</li>
              <li>Apexto staff will NEVER contact you first offering random coin cloud mining investments.</li>
            </ul>
          </div>
        </div>

        {/* Verdict Results Screen */}
        {checked && result && (
          <div className="animate-fade-in">
            {result.type === 'verified' && (
              <div 
                className="glass-panel"
                style={{
                  padding: '30px',
                  borderColor: 'var(--color-green)',
                  background: 'rgba(0, 230, 118, 0.05)',
                  boxShadow: 'var(--shadow-glow)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    background: 'var(--color-green)',
                    color: 'black',
                    borderRadius: '50%',
                    padding: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Check size={20} strokeWidth={3} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--text-header)' }}>Verified Official Representative</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-green)', fontWeight: 'bold' }}>CREDENTIALS CONFIRMED</p>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'center',
                  background: 'var(--bg-main)',
                  padding: '16px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)'
                }} className="staff-details">
                  <img 
                    src={result.data.avatar} 
                    alt={result.data.name} 
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid var(--color-green)'
                    }}
                  />
                  <div>
                    <h4 style={{ fontSize: '1.05rem', color: 'var(--text-header)', marginBottom: '2px' }}>{result.data.name}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>{result.data.role}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                      <span>Email: <strong style={{ color: 'var(--text-primary)' }}>{result.data.email}</strong></span>
                      <span>Telegram: <strong style={{ color: 'var(--text-primary)' }}>{result.data.telegram}</strong></span>
                      <span>WhatsApp: <strong style={{ color: 'var(--text-primary)' }}>{result.data.whatsapp}</strong></span>
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>
                  This representative is authorized to generate official invoices, coordinate logistics, and communicate shipping schedules. You are safe to continue transactions.
                </p>
              </div>
            )}

            {result.type === 'scam' && (
              <div 
                className="glass-panel"
                style={{
                  padding: '30px',
                  borderColor: 'var(--color-red)',
                  background: 'rgba(255, 23, 68, 0.05)',
                  boxShadow: '0 0 25px rgba(255, 23, 68, 0.25)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    background: 'var(--color-red)',
                    color: 'white',
                    borderRadius: '50%',
                    padding: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: 'pulseGlowRed 1.5s infinite'
                  }}>
                    <ShieldAlert size={20} strokeWidth={2} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--text-header)' }}>Impostor Scammer Profile Detected</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-red)', fontWeight: 'bold' }}>WARNING: HIGH FRAUD RISK</p>
                  </div>
                </div>

                <div style={{
                  background: 'var(--bg-main)',
                  padding: '16px',
                  borderRadius: '6px',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.9rem',
                  color: 'var(--text-primary)',
                  lineHeight: '1.5'
                }}>
                  {result.message}
                </div>

                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>
                  <strong>Do not transfer any funds or share account details!</strong> This handler has been flagged by our security team as an impersonator profile trying to redirect customer wire payments.
                </p>
              </div>
            )}

            {result.type === 'unverified' && (
              <div 
                className="glass-panel"
                style={{
                  padding: '30px',
                  borderColor: 'var(--color-gold)',
                  background: 'rgba(255, 179, 0, 0.05)',
                  boxShadow: '0 0 25px rgba(255, 179, 0, 0.15)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    background: 'var(--color-gold)',
                    color: 'black',
                    borderRadius: '50%',
                    padding: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <HelpCircle size={20} strokeWidth={2} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--text-header)' }}>Unverified Handle</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-gold)', fontWeight: 'bold' }}>NOT FOUND IN TEAM REGISTER</p>
                  </div>
                </div>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.6' }}>
                  We could not find any active employee with the credentials <strong style={{ color: 'var(--text-header)' }}>"{query}"</strong>. 
                  <br /><br />
                  Please proceed with caution. Ask this user to send you a verification email from their official `@apextomining.com` address, or contact our customer support team directly to double-check their role.
                </p>
              </div>
            )}
          </div>
        )}

      </div>

      <style>{`
        @keyframes pulseGlowRed {
          0% { box-shadow: 0 0 0 0 rgba(255, 23, 68, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(255, 23, 68, 0); }
          100% { box-shadow: 0 0 0 0 rgba(255, 23, 68, 0); }
        }
        @media (max-width: 576px) {
          .staff-details {
            flex-direction: column !important;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};
