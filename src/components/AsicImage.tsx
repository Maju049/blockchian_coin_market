import React from 'react';

interface AsicImageProps {
  brand: string;
  coolingType: 'Air' | 'Hydro' | 'Immersion';
  hashrate: number;
  hashrateUnit: string;
  status: string;
  width?: number;
  height?: number;
}

export const AsicImage: React.FC<AsicImageProps> = ({
  brand,
  coolingType,
  hashrate,
  hashrateUnit,
  status,
  width = 240,
  height = 180,
}) => {
  const isHydro = coolingType === 'Hydro';
  const isImmersion = coolingType === 'Immersion';
  const isActive = status !== 'Out of Stock';

  return (
    <div style={{
      position: 'relative',
      width: `${width}px`,
      height: `${height}px`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at center, rgba(13, 22, 45, 0.4) 0%, rgba(5, 8, 16, 0.9) 100%)',
      borderRadius: '8px',
      border: '1px solid rgba(255, 255, 255, 0.04)',
      overflow: 'hidden'
    }}>
      {/* Background fine technical grid overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
        backgroundSize: '12px 12px',
        pointerEvents: 'none'
      }} />

      <svg
        width={width - 40}
        height={height - 20}
        viewBox="0 0 200 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.5))' }}
      >
        {/* Main Chassis Drop Shadow / Ambient Glow */}
        <rect
          x="30"
          y="30"
          width="140"
          height="100"
          rx="6"
          fill={isHydro ? 'rgba(0, 229, 255, 0.05)' : 'rgba(0, 230, 118, 0.03)'}
          style={{ filter: 'blur(8px)' }}
        />

        {/* Outer Metal Chassis */}
        <rect x="25" y="25" width="150" height="110" rx="8" fill="#1e2433" stroke="#2e374d" strokeWidth="2" />
        {/* Faceplate inner bevel */}
        <rect x="32" y="32" width="136" height="96" rx="4" fill="#0f131c" stroke="#171d2b" strokeWidth="1.5" />

        {/* Branding badge */}
        <rect x="42" y="42" width="45" height="14" rx="2" fill="#1e2433" stroke="rgba(255,255,255,0.06)" />
        <text x="47" y="52" fill="#94a3b8" fontSize="8" fontFamily="var(--font-title)" fontWeight="bold">
          {brand.toUpperCase()}
        </text>

        {/* Hashing Stats LCD Display */}
        <rect x="95" y="42" width="63" height="14" rx="2" fill="#050810" stroke="rgba(255, 255, 255, 0.1)" />
        <text
          x="100"
          y="52"
          fill={isActive ? 'var(--color-green)' : 'var(--text-muted)'}
          fontSize="8"
          fontFamily="monospace"
          fontWeight="bold"
        >
          {isActive ? `${hashrate} ${hashrateUnit}` : 'OFFLINE'}
        </text>

        {/* LED Status Indicators */}
        {/* Normal LED */}
        <circle cx="45" cy="115" r="3.5" fill={isActive ? 'var(--color-green)' : '#334155'} />
        {isActive && (
          <circle
            cx="45"
            cy="115"
            r="6"
            stroke="var(--color-green)"
            strokeWidth="1"
            fill="none"
            style={{ animation: 'pulseGlow 2s infinite' }}
          />
        )}
        <text x="54" y="118" fill="#64748b" fontSize="7" fontWeight="bold">ACT</text>

        {/* Fault/Preorder LED */}
        <circle
          cx="82"
          cy="115"
          r="3.5"
          fill={status === 'Pre-order' ? 'var(--color-gold)' : status === 'Out of Stock' ? 'var(--color-red)' : '#334155'}
        />
        <text x="91" y="118" fill="#64748b" fontSize="7" fontWeight="bold">ERR</text>

        {/* Cooling System visuals */}
        {isHydro ? (
          /* Hydro Liquid Manifold Pipes */
          <g>
            {/* Hydro tube inlet */}
            <path d="M 125 105 L 125 135 M 129 105 L 129 135" stroke="var(--color-blue)" strokeWidth="2" strokeLinecap="round" />
            <rect x="120" y="130" width="14" height="6" rx="1.5" fill="#475569" />
            {/* Hydro tube outlet */}
            <path d="M 145 105 L 145 135 M 149 105 L 149 135" stroke="#00b0ff" strokeWidth="2" strokeLinecap="round" />
            <rect x="140" y="130" width="14" height="6" rx="1.5" fill="#475569" />
            {/* Hydro Block casing */}
            <rect x="115" y="70" width="48" height="35" rx="3" fill="#1e293b" stroke="#334155" />
            <line x1="120" y1="78" x2="158" y2="78" stroke="var(--color-blue)" strokeWidth="1" />
            <line x1="120" y1="88" x2="158" y2="88" stroke="var(--color-blue)" strokeWidth="1" />
            <text x="122" y="99" fill="var(--color-blue)" fontSize="6" fontWeight="bold">LIQUID-FLOW</text>
          </g>
        ) : isImmersion ? (
          /* Immersion Tank details */
          <g>
            <rect x="110" y="65" width="55" height="45" rx="4" fill="rgba(0, 229, 255, 0.1)" stroke="var(--color-blue)" strokeWidth="1" />
            <circle cx="120" cy="78" r="1.5" fill="#00e5ff" />
            <circle cx="145" cy="85" r="2.5" fill="#00e5ff" opacity="0.6" />
            <circle cx="130" cy="95" r="2" fill="#00e5ff" opacity="0.8" />
            <circle cx="155" cy="74" r="1.5" fill="#00e5ff" />
            <text x="115" y="105" fill="var(--color-blue)" fontSize="6" fontWeight="bold">SUBMERGED</text>
          </g>
        ) : (
          /* Dual Air-cooling fans */
          <g>
            {/* Left Fan */}
            <circle cx="140" cy="82" r="20" fill="#090d16" stroke="#2e374d" strokeWidth="2" />
            <circle cx="140" cy="82" r="4" fill="#64748b" />
            {/* Blades (visual mockup) */}
            <g style={{
              transformOrigin: '140px 82px',
              animation: isActive ? 'spinFan 1.5s linear infinite' : 'none'
            }}>
              <path d="M140 64 L138 82 L142 82 Z" fill="#475569" />
              <path d="M140 100 L138 82 L142 82 Z" fill="#475569" />
              <path d="M122 82 L140 80 L140 84 Z" fill="#475569" />
              <path d="M158 82 L140 80 L140 84 Z" fill="#475569" />
            </g>
            
            {/* Right Fan (Smaller / Auxiliary) */}
            <circle cx="65" cy="82" r="14" fill="#090d16" stroke="#2e374d" strokeWidth="1.5" />
            <circle cx="65" cy="82" r="3" fill="#64748b" />
            <g style={{
              transformOrigin: '65px 82px',
              animation: isActive ? 'spinFan 1s linear infinite' : 'none'
            }}>
              <path d="M65 70 L64 82 L66 82 Z" fill="#475569" />
              <path d="M65 94 L64 82 L66 82 Z" fill="#475569" />
              <path d="M53 82 L65 81 L65 83 Z" fill="#475569" />
              <path d="M77 82 L65 81 L65 83 Z" fill="#475569" />
            </g>
          </g>
        )}
      </svg>

      <style>{`
        @keyframes spinFan {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulseGlow {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.6); opacity: 0.1; }
          100% { transform: scale(1); opacity: 0; }
        }
      `}</style>
    </div>
  );
};
