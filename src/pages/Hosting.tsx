import React, { useState } from 'react';
import { HOSTING_CABINETS } from '../data/mockData';
import { Zap, MapPin, Wind, Thermometer, CheckCircle2 } from 'lucide-react';

export const Hosting: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    minersCount: 10,
    minerModel: '',
    location: 'Houston, Texas, USA',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="section animate-fade-in" style={{ paddingTop: '40px' }}>
      <div className="container">
        
        {/* Header Title */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span className="badge badge-blue" style={{ marginBottom: '10px' }}>Hosting Infrastructure</span>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '15px' }}>ASIC Hosting & Liquid Cooling Cabinets</h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Operate your miners at rock-bottom electricity rates in our specialized hydro-cooling and immersion-fluid data centers located globally.
          </p>
        </div>

        {/* Benefits Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '60px'
        }}>
          <div className="glass-panel" style={{ padding: '24px' }}>
            <Zap size={24} style={{ color: 'var(--color-green)', marginBottom: '15px' }} />
            <h3 style={{ fontSize: '1.15rem', marginBottom: '10px' }}>Ultra-Low Power Tariffs</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.6' }}>
              Our partnerships with power grids in stable regions provide institutional tariffs ranging from $0.062/kWh to $0.075/kWh inclusive of maintenance.
            </p>
          </div>
          <div className="glass-panel" style={{ padding: '24px' }}>
            <Wind size={24} style={{ color: 'var(--color-blue)', marginBottom: '15px' }} />
            <h3 style={{ fontSize: '1.15rem', marginBottom: '10px' }}>Liquid Cooling Efficiency</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.6' }}>
              Water loops and immersion systems keep chip temperatures below 60°C, lowering PUE to 1.03 and extending hardware lifecycle by up to 40%.
            </p>
          </div>
          <div className="glass-panel" style={{ padding: '24px' }}>
            <Thermometer size={24} style={{ color: 'var(--color-gold)', marginBottom: '15px' }} />
            <h3 style={{ fontSize: '1.15rem', marginBottom: '10px' }}>Silent Operations</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.6' }}>
              By replacing high-decibel fans with silent heat exchangers, our cabinet solutions operate comfortably within municipal noise limits.
            </p>
          </div>
        </div>

        {/* Cabinet Inventory / Hosting Packages */}
        <h2 style={{ marginBottom: '30px', fontSize: '1.8rem' }}>Available Containment Hardware</h2>
        <div style={{
          gap: '30px',
          marginBottom: '60px'
        }} className="cabinet-grid">
          {HOSTING_CABINETS.map((cabinet) => (
            <div 
              key={cabinet.id} 
              className="glass-panel glow-blue"
              style={{
                padding: '30px',
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--text-header)', maxWidth: '70%' }}>{cabinet.name}</h3>
                <span className="badge badge-blue" style={{ fontSize: '0.7rem' }}>{cabinet.efficiency} PUE</span>
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px', lineHeight: '1.6' }}>
                {cabinet.description}
              </p>

              {/* Technical properties */}
              <div style={{
                background: 'var(--bg-input)',
                borderRadius: '6px',
                padding: '16px',
                fontSize: '0.85rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                border: '1px solid var(--border-color)',
                marginBottom: '24px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Capacity:</span>
                  <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>{cabinet.capacity}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Cooling Module:</span>
                  <span style={{ fontWeight: 'bold', color: 'var(--color-blue)' }}>{cabinet.cooling}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Power Cap:</span>
                  <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>{cabinet.powerLimit}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)' }}>
                    <MapPin size={12} />
                    <span>Location:</span>
                  </span>
                  <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>{cabinet.location}</span>
                </div>
              </div>

              {/* Price Details */}
              <div style={{
                marginTop: 'auto',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                borderTop: '1px solid var(--border-color)',
                paddingTop: '16px'
              }}>
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Monthly Rack Fee</span>
                  <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-green)' }}>
                    ${cabinet.pricePerMonth}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}> / month</span>
                </div>
                <div style={{ textAlign: 'right', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Setup Fee: ${cabinet.setupFee}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Hosting Inquiry form */}
        <div className="glass-panel" style={{
          padding: '40px',
          maxWidth: '800px',
          margin: '0 auto',
          border: '1px solid var(--border-color)'
        }}>
          <h2 style={{ fontSize: '1.6rem', marginBottom: '15px', textAlign: 'center' }}>Hosting Application</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textAlign: 'center', marginBottom: '30px' }}>
            Submit your container slot requirements and a customer director will build a custom SLA proposal.
          </p>

          {formSubmitted ? (
            <div style={{
              textAlign: 'center',
              padding: '40px 10px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '15px'
            }}>
              <CheckCircle2 size={48} style={{ color: 'var(--color-green)' }} />
              <h3 style={{ color: 'var(--text-header)' }}>Application Submitted</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '500px', lineHeight: '1.6' }}>
                Thank you! Your mining hosting request has been received. Our operations team in {formData.location} will run heat-load reviews and email your draft contract within 1 business day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row">
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row">
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>Number of ASIC Miners</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.minersCount}
                    onChange={(e) => setFormData({ ...formData, minersCount: Number(e.target.value) })}
                    className="form-input"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>Hardware Model(s)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Antminer S21 Hydro, Whatsminer M60"
                    value={formData.minerModel}
                    onChange={(e) => setFormData({ ...formData, minerModel: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row">
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>Preferred Data Center</label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="form-input"
                  >
                    <option value="Houston, Texas, USA">Houston, Texas, USA ($0.068/kWh)</option>
                    <option value="Dubai, UAE">Dubai, UAE ($0.075/kWh)</option>
                    <option value="Reykjavik, Iceland">Reykjavik, Iceland ($0.062/kWh)</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>Phone Number (Optional)</label>
                  <input
                    type="text"
                    placeholder="Enter telephone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>Additional Requirements / Notes</label>
                <textarea
                  rows={4}
                  placeholder="Mention custom water loops, telemetry access, or bulk deployment deadlines..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="form-input"
                  style={{ fontFamily: 'inherit' }}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                Submit Hosting Application
              </button>
            </form>
          )}
        </div>

      </div>

      <style>{`
        .cabinet-grid {
          display: grid;
          grid-template-columns: 1fr;
        }
        @media (min-width: 769px) {
          .cabinet-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 768px) {
          .cabinet-grid, .form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
