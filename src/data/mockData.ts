export interface Product {
  id: string;
  name: string;
  brand: 'Bitmain' | 'MicroBT' | 'Canaan' | 'Goldshell' | 'Jasminer' | string;
  model: string;
  price: number;
  hashrate: number;
  hashrateUnit: 'TH/s' | 'GH/s' | 'MH/s' | string;
  power: number; // Watts
  algorithm: string;
  coins: string[];
  efficiency: number; // J/T or J/G or J/M
  efficiencyUnit: 'J/T' | 'J/G' | 'J/M' | string;
  status: 'In Stock' | 'Pre-order' | 'Out of Stock' | 'Hot';
  releaseDate: string;
  noise: number; // dB
  description: string;
  coolingType: 'Air' | 'Hydro' | 'Immersion' | string;
  imageUrl?: string;
  imageUrls?: string[];
}

export interface Staff {
  name: string;
  role: string;
  email: string;
  telegram: string;
  whatsapp: string;
  avatar: string;
  verified: boolean;
}

export interface HostingCabinet {
  id: string;
  name: string;
  capacity: string; // e.g. "10 ASIC Miners"
  cooling: string; // e.g. "Water Cooling / Dry Cooler"
  powerLimit: string; // e.g. "40 kW"
  pricePerMonth: number;
  setupFee: number;
  location: string;
  efficiency: string; // PUE
  description: string;
}

export const PRODUCTS: Product[] = [
  {
    "id": "whatsminer-m79s",
    "name": "WhatsMiner M79S",
    "brand": "MicroBT",
    "model": "M79",
    "price": 9831,
    "hashrate": 1.35,
    "hashrateUnit": "PH/s",
    "power": 20000,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 14.81,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2025-12",
    "noise": 50,
    "coolingType": "Hydro",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1765197987/duNwmUDww47pov_e6-nX2oEvjWY.png",
    "description": "The WhatsMiner M79S is a high-performance SHA-256 miner from MicroBT. Operating at 20000W with an efficiency of 14.81 J/Unit, it generates a daily revenue of approximately $62.70 with a net daily profit of $14.70 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "antminer-s23-hydro-u3-1160th",
    "name": "Antminer S23 Hyd 3U",
    "brand": "Bitmain",
    "model": "S23",
    "price": 6208,
    "hashrate": 1.16,
    "hashrateUnit": "PH/s",
    "power": 11020,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 9.5,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2026-01",
    "noise": 50,
    "coolingType": "Hydro",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1771082619/BNp2n9qYZpo54U8it430TgYzjLk.png",
    "description": "The Antminer S23 Hyd 3U is a high-performance SHA-256 miner from Bitmain. Operating at 11020W with an efficiency of 9.50 J/Unit, it generates a daily revenue of approximately $53.87 with a net daily profit of $27.42 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "whatsminer-m79",
    "name": "WhatsMiner M79",
    "brand": "MicroBT",
    "model": "M79",
    "price": 11598,
    "hashrate": 920,
    "hashrateUnit": "TH/s",
    "power": 14500,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 15.76,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2026-01",
    "noise": 50,
    "coolingType": "Hydro",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1765197987/duNwmUDww47pov_e6-nX2oEvjWY.png",
    "description": "The WhatsMiner M79 is a high-performance SHA-256 miner from MicroBT. Operating at 14500W with an efficiency of 15.76 J/Unit, it generates a daily revenue of approximately $42.73 with a net daily profit of $7.93 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "sealminer-a4-ultra-hydro",
    "name": "SealMiner A4 Ultra Hydro",
    "brand": "Bitdeer",
    "model": "A4",
    "price": 7976,
    "hashrate": 886,
    "hashrateUnit": "TH/s",
    "power": 8372,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 9.45,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2026-05",
    "noise": 50,
    "coolingType": "Hydro",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1758233774/Obbi9ZsdbOLlN8MDbnXAWwk2QR0.png",
    "description": "The SealMiner A4 Ultra Hydro is a high-performance SHA-256 miner from Bitdeer. Operating at 8372W with an efficiency of 9.45 J/Unit, it generates a daily revenue of approximately $41.15 with a net daily profit of $21.05 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "antminer-s23e-hyd-u2h-865th",
    "name": "Antminer S23e Hyd 2U (865Th)",
    "brand": "Bitmain",
    "model": "S23",
    "price": 15999,
    "hashrate": 865,
    "hashrateUnit": "TH/s",
    "power": 8650,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 10,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2026-04",
    "noise": 50,
    "coolingType": "Hydro",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1769595473/jp9DBTMcqO5g2iCPSGgHmUFa5FM.png",
    "description": "The Antminer S23e Hyd 2U (865Th) is a high-performance SHA-256 miner from Bitmain. Operating at 8650W with an efficiency of 10.00 J/Unit, it generates a daily revenue of approximately $40.17 with a net daily profit of $19.41 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "antminer-s21e-xp-hydro-860th",
    "name": "Antminer S21e XP Hyd 3U",
    "brand": "Bitmain",
    "model": "S21",
    "price": 4080,
    "hashrate": 860,
    "hashrateUnit": "TH/s",
    "power": 11180,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 13,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2025-01",
    "noise": 50,
    "coolingType": "Hydro",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1725979133/MhCBLWUT3FjpGz8CuAqYntkmMSk.png",
    "description": "The Antminer S21e XP Hyd 3U is a high-performance SHA-256 miner from Bitmain. Operating at 11180W with an efficiency of 13.00 J/Unit, it generates a daily revenue of approximately $39.94 with a net daily profit of $13.11 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "proto-rig",
    "name": "Rig",
    "brand": "Proto",
    "model": "Rig",
    "price": 3590,
    "hashrate": 819,
    "hashrateUnit": "TH/s",
    "power": 12000,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 14.65,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2025-09",
    "noise": 80,
    "coolingType": "Air",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1755249373/f9W3vqIeCinBlnRLdIWCQSzLNt0.png",
    "description": "The Rig is a high-performance SHA-256 miner from Proto. Operating at 12000W with an efficiency of 14.65 J/Unit, it generates a daily revenue of approximately $38.04 with a net daily profit of $9.24 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "whatsminer-m7ds",
    "name": "WhatsMiner M7DS",
    "brand": "MicroBT",
    "model": "M7D",
    "price": 4878,
    "hashrate": 680,
    "hashrateUnit": "TH/s",
    "power": 9200,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 13.53,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2026-03",
    "noise": 75,
    "coolingType": "Hydro",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1772964356/3jCDxGgbBE-1SyrDDDMR45ZJebk.png",
    "description": "The WhatsMiner M7DS is a high-performance SHA-256 miner from MicroBT. Operating at 9200W with an efficiency of 13.53 J/Unit, it generates a daily revenue of approximately $31.58 with a net daily profit of $9.50 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "sealminer-a4-pro-hydro",
    "name": "SealMiner A4 Pro Hydro",
    "brand": "Bitdeer",
    "model": "A4",
    "price": 6898,
    "hashrate": 680,
    "hashrateUnit": "TH/s",
    "power": 7412,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 10.9,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2026-05",
    "noise": 50,
    "coolingType": "Hydro",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1775573398/fV3MyLnkeRPbviOV8lLEVRlY1PA.png",
    "description": "The SealMiner A4 Pro Hydro is a high-performance SHA-256 miner from Bitdeer. Operating at 7412W with an efficiency of 10.90 J/Unit, it generates a daily revenue of approximately $31.58 with a net daily profit of $13.79 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "sealminer-a3-pro-hydro",
    "name": "SealMiner A3 Pro Hydro",
    "brand": "Bitdeer",
    "model": "A3",
    "price": 8359,
    "hashrate": 660,
    "hashrateUnit": "TH/s",
    "power": 8250,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 12.5,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2025-09",
    "noise": 50,
    "coolingType": "Hydro",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1758233774/Obbi9ZsdbOLlN8MDbnXAWwk2QR0.png",
    "description": "The SealMiner A3 Pro Hydro is a high-performance SHA-256 miner from Bitdeer. Operating at 8250W with an efficiency of 12.50 J/Unit, it generates a daily revenue of approximately $30.65 with a net daily profit of $10.85 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "whatsminer-m7d",
    "name": "WhatsMiner M7D",
    "brand": "MicroBT",
    "model": "M7D",
    "price": 4892,
    "hashrate": 634,
    "hashrateUnit": "TH/s",
    "power": 9200,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 14.51,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2026-03",
    "noise": 75,
    "coolingType": "Hydro",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1772964356/3jCDxGgbBE-1SyrDDDMR45ZJebk.png",
    "description": "The WhatsMiner M7D is a high-performance SHA-256 miner from MicroBT. Operating at 9200W with an efficiency of 14.51 J/Unit, it generates a daily revenue of approximately $29.44 with a net daily profit of $7.36 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "teraflux-ah3880",
    "name": "Teraflux AH3880",
    "brand": "Auradine",
    "model": "AH",
    "price": 4800,
    "hashrate": 600,
    "hashrateUnit": "TH/s",
    "power": 10740,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 17.9,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2025-03",
    "noise": 35,
    "coolingType": "Hydro",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1742965798/6lvNHfOFes_RAomktUKUZiz6LtA.jpg",
    "description": "The Teraflux AH3880 is a high-performance SHA-256 miner from Auradine. Operating at 10740W with an efficiency of 17.90 J/Unit, it generates a daily revenue of approximately $27.87 with a net daily profit of $2.09 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "whatsminer-m6ds-plus-plus",
    "name": "WhatsMiner M6DS++",
    "brand": "MicroBT",
    "model": "M6D",
    "price": 3606,
    "hashrate": 592,
    "hashrateUnit": "TH/s",
    "power": 9200,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 15.54,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2026-03",
    "noise": 75,
    "coolingType": "Hydro",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1772964356/3jCDxGgbBE-1SyrDDDMR45ZJebk.png",
    "description": "The WhatsMiner M6DS++ is a high-performance SHA-256 miner from MicroBT. Operating at 9200W with an efficiency of 15.54 J/Unit, it generates a daily revenue of approximately $27.49 with a net daily profit of $5.41 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "antminer-s23-hyd-580th",
    "name": "Antminer S23 Hyd (580Th)",
    "brand": "Bitmain",
    "model": "S23",
    "price": 10992,
    "hashrate": 580,
    "hashrateUnit": "TH/s",
    "power": 5510,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 9.5,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2026-01",
    "noise": 50,
    "coolingType": "Hydro",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1748391942/vrgbEQ9brQb29awB5zfWZpydq7k.jpg",
    "description": "The Antminer S23 Hyd (580Th) is a high-performance SHA-256 miner from Bitmain. Operating at 5510W with an efficiency of 9.50 J/Unit, it generates a daily revenue of approximately $26.94 with a net daily profit of $13.71 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "whatsminer-m73s-plus",
    "name": "WhatsMiner M73S+",
    "brand": "MicroBT",
    "model": "M73",
    "price": 8160,
    "hashrate": 540,
    "hashrateUnit": "TH/s",
    "power": 7200,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 13.33,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2025-12",
    "noise": 50,
    "coolingType": "Hydro",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1733754095/eHnVNEAdZ4JxTbhk3HLIU6BIFZk.png",
    "description": "The WhatsMiner M73S+ is a high-performance SHA-256 miner from MicroBT. Operating at 7200W with an efficiency of 13.33 J/Unit, it generates a daily revenue of approximately $25.08 with a net daily profit of $7.80 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "whatsminer-m6ds-plus",
    "name": "WhatsMiner M6DS+",
    "brand": "MicroBT",
    "model": "M6D",
    "price": 5760,
    "hashrate": 540,
    "hashrateUnit": "TH/s",
    "power": 9200,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 17.04,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2026-03",
    "noise": 75,
    "coolingType": "Hydro",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1772964356/3jCDxGgbBE-1SyrDDDMR45ZJebk.png",
    "description": "The WhatsMiner M6DS+ is a high-performance SHA-256 miner from MicroBT. Operating at 9200W with an efficiency of 17.04 J/Unit, it generates a daily revenue of approximately $25.08 with a net daily profit of $3.00 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "antminer-s219-xp-hydro-512th",
    "name": "Antminer S19 XP Hyd 3U",
    "brand": "Bitmain",
    "model": "S19",
    "price": 4599,
    "hashrate": 512,
    "hashrateUnit": "TH/s",
    "power": 10600,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 20.7,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2025-01",
    "noise": 50,
    "coolingType": "Hydro",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1731345608/Fi0bhMQoF5AoDp-UuJitGLMK500.webp",
    "description": "The Antminer S19 XP Hyd 3U is a high-performance SHA-256 miner from Bitmain. Operating at 10600W with an efficiency of 20.70 J/Unit, it generates a daily revenue of approximately $23.78 with a net daily profit of $-1.66 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "sealminer-a3-hydro",
    "name": "SealMiner A3 Hydro",
    "brand": "Bitdeer",
    "model": "A3",
    "price": 5120,
    "hashrate": 500,
    "hashrateUnit": "TH/s",
    "power": 6750,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 13.5,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2025-09",
    "noise": 50,
    "coolingType": "Hydro",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1758233580/dKQhIQDNkT8z2WOPkg5R8dsU0RI.png",
    "description": "The SealMiner A3 Hydro is a high-performance SHA-256 miner from Bitdeer. Operating at 6750W with an efficiency of 13.50 J/Unit, it generates a daily revenue of approximately $23.22 with a net daily profit of $7.02 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "antminer-s21-xp-plus-hyd-500th",
    "name": "Antminer S21 XP+ Hyd (500Th)",
    "brand": "Bitmain",
    "model": "S21",
    "price": 7600,
    "hashrate": 500,
    "hashrateUnit": "TH/s",
    "power": 5500,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 11,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2025-07",
    "noise": 50,
    "coolingType": "Hydro",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1738238784/zk3oSP3sDyclfLfyfVBCQQUngM4.jpg",
    "description": "The Antminer S21 XP+ Hyd (500Th) is a high-performance SHA-256 miner from Bitmain. Operating at 5500W with an efficiency of 11.00 J/Unit, it generates a daily revenue of approximately $23.22 with a net daily profit of $10.02 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "sealminer-a2-pro-hyd",
    "name": "SealMiner A2 Pro Hyd",
    "brand": "Bitdeer",
    "model": "A2",
    "price": 6720,
    "hashrate": 500,
    "hashrateUnit": "TH/s",
    "power": 7450,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 14.9,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2025-03",
    "noise": 50,
    "coolingType": "Hydro",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1742245505/VHYP-VdYzNwe-Uge3bFxGWmpq1I.webp",
    "description": "The SealMiner A2 Pro Hyd is a high-performance SHA-256 miner from Bitdeer. Operating at 7450W with an efficiency of 14.90 J/Unit, it generates a daily revenue of approximately $23.22 with a net daily profit of $5.34 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "whatsminer-m73s",
    "name": "WhatsMiner M73S",
    "brand": "MicroBT",
    "model": "M73",
    "price": 5119,
    "hashrate": 500,
    "hashrateUnit": "TH/s",
    "power": 7200,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 14.4,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2025-12",
    "noise": 75,
    "coolingType": "Hydro",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1733754095/eHnVNEAdZ4JxTbhk3HLIU6BIFZk.png",
    "description": "The WhatsMiner M73S is a high-performance SHA-256 miner from MicroBT. Operating at 7200W with an efficiency of 14.40 J/Unit, it generates a daily revenue of approximately $23.22 with a net daily profit of $5.94 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "antminer-s21j-xp-hyd-495th",
    "name": "Antminer S21j XP Hyd (495Th)",
    "brand": "Bitmain",
    "model": "S21",
    "price": 4854,
    "hashrate": 495,
    "hashrateUnit": "TH/s",
    "power": 5940,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 12,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2026-03",
    "noise": 50,
    "coolingType": "Hydro",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1731762560/dljqkm7oS-go7EfUsT93X8IzFqk.jpg",
    "description": "The Antminer S21j XP Hyd (495Th) is a high-performance SHA-256 miner from Bitmain. Operating at 5940W with an efficiency of 12.00 J/Unit, it generates a daily revenue of approximately $22.99 with a net daily profit of $8.73 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "avalon-a1566ha",
    "name": "Avalon A1566HA 2U",
    "brand": "Canaan",
    "model": "A15",
    "price": 5599,
    "hashrate": 480,
    "hashrateUnit": "TH/s",
    "power": 8064,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 16.8,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2025-06",
    "noise": 40,
    "coolingType": "Hydro",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1750937118/YZKOhCCAlHaM5f3YExJh2990SbM.png",
    "description": "The Avalon A1566HA 2U is a high-performance SHA-256 miner from Canaan. Operating at 8064W with an efficiency of 16.80 J/Unit, it generates a daily revenue of approximately $22.29 with a net daily profit of $2.94 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "antminer-s21-xp-hyd-473th",
    "name": "Antminer S21 XP Hyd (473Th)",
    "brand": "Bitmain",
    "model": "S21",
    "price": 4943,
    "hashrate": 473,
    "hashrateUnit": "TH/s",
    "power": 5676,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 12,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2024-11",
    "noise": 50,
    "coolingType": "Hydro",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1718731892/ckh25ylqdlpyu7uedopm.jpg",
    "description": "The Antminer S21 XP Hyd (473Th) is a high-performance SHA-256 miner from Bitmain. Operating at 5676W with an efficiency of 12.00 J/Unit, it generates a daily revenue of approximately $21.97 with a net daily profit of $8.34 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "whatsminer-m78s",
    "name": "WhatsMiner M78S",
    "brand": "MicroBT",
    "model": "M78",
    "price": 6230,
    "hashrate": 472,
    "hashrateUnit": "TH/s",
    "power": 6550,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 13.88,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2025-12",
    "noise": 75,
    "coolingType": "Immersion",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1733780648/2jlhmN_NuKdUgfx9y9laSeNaNho.png",
    "description": "The WhatsMiner M78S is a high-performance SHA-256 miner from MicroBT. Operating at 6550W with an efficiency of 13.88 J/Unit, it generates a daily revenue of approximately $21.92 with a net daily profit of $6.20 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "whatsminer-m73",
    "name": "WhatsMiner M73",
    "brand": "MicroBT",
    "model": "M73",
    "price": 3614,
    "hashrate": 470,
    "hashrateUnit": "TH/s",
    "power": 7200,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 15.32,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2025-12",
    "noise": 75,
    "coolingType": "Hydro",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1733754095/eHnVNEAdZ4JxTbhk3HLIU6BIFZk.png",
    "description": "The WhatsMiner M73 is a high-performance SHA-256 miner from MicroBT. Operating at 7200W with an efficiency of 15.32 J/Unit, it generates a daily revenue of approximately $21.83 with a net daily profit of $4.55 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "whatsminer-m63s-plus-plus",
    "name": "WhatsMiner M63S++",
    "brand": "MicroBT",
    "model": "M63",
    "price": 8306,
    "hashrate": 464,
    "hashrateUnit": "TH/s",
    "power": 7200,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 15.52,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2024-12",
    "noise": 75,
    "coolingType": "Air",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1733754095/eHnVNEAdZ4JxTbhk3HLIU6BIFZk.png",
    "description": "The WhatsMiner M63S++ is a high-performance SHA-256 miner from MicroBT. Operating at 7200W with an efficiency of 15.52 J/Unit, it generates a daily revenue of approximately $21.55 with a net daily profit of $4.27 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "sealminer-a2-hyd",
    "name": "SealMiner A2 Hyd",
    "brand": "Bitdeer",
    "model": "A2",
    "price": 5997,
    "hashrate": 446,
    "hashrateUnit": "TH/s",
    "power": 7360,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 16.5,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2025-02",
    "noise": 50,
    "coolingType": "Hydro",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1730478878/3NJyAIw2eBaBibI7AOIT22cN6so.png",
    "description": "The SealMiner A2 Hyd is a high-performance SHA-256 miner from Bitdeer. Operating at 7360W with an efficiency of 16.50 J/Unit, it generates a daily revenue of approximately $20.71 with a net daily profit of $3.05 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "antminer-s23-immersion-442th",
    "name": "Antminer S23 Immersion (442Th)",
    "brand": "Bitmain",
    "model": "S23",
    "price": 7911,
    "hashrate": 442,
    "hashrateUnit": "TH/s",
    "power": 5304,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 12,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2026-01",
    "noise": 50,
    "coolingType": "Immersion",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1748393518/Bj1-3VTowmnfy2A78oR7RRlTAi8.webp",
    "description": "The Antminer S23 Immersion (442Th) is a high-performance SHA-256 miner from Bitmain. Operating at 5304W with an efficiency of 12.00 J/Unit, it generates a daily revenue of approximately $20.53 with a net daily profit of $7.80 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "antminer-s21e-xp-hyd-430th",
    "name": "Antminer S21e XP Hyd (430Th)",
    "brand": "Bitmain",
    "model": "S21",
    "price": 5519,
    "hashrate": 430,
    "hashrateUnit": "TH/s",
    "power": 5590,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 13,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2024-11",
    "noise": 50,
    "coolingType": "Hydro",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1731762560/dljqkm7oS-go7EfUsT93X8IzFqk.jpg",
    "description": "The Antminer S21e XP Hyd (430Th) is a high-performance SHA-256 miner from Bitmain. Operating at 5590W with an efficiency of 13.00 J/Unit, it generates a daily revenue of approximately $19.97 with a net daily profit of $6.55 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "whatsminer-m63s-plus",
    "name": "WhatsMiner M63S+",
    "brand": "MicroBT",
    "model": "M63",
    "price": 8532,
    "hashrate": 424,
    "hashrateUnit": "TH/s",
    "power": 7208,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 17,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2024-08",
    "noise": 75,
    "coolingType": "Air",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1733753921/XcBslZadqF4Krbo52djSxDihhAY.png",
    "description": "The WhatsMiner M63S+ is a high-performance SHA-256 miner from MicroBT. Operating at 7208W with an efficiency of 17.00 J/Unit, it generates a daily revenue of approximately $19.69 with a net daily profit of $2.39 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "whatsminer-m63s",
    "name": "WhatsMiner M63S",
    "brand": "MicroBT",
    "model": "M63",
    "price": 3944,
    "hashrate": 390,
    "hashrateUnit": "TH/s",
    "power": 7215,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 18.5,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2023-11",
    "noise": 50,
    "coolingType": "Air",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1701074312/pd2ok7nxe0ywtfvfjmjw.png",
    "description": "The WhatsMiner M63S is a high-performance SHA-256 miner from MicroBT. Operating at 7215W with an efficiency of 18.50 J/Unit, it generates a daily revenue of approximately $18.11 with a net daily profit of $0.80 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "whatsminer-m76s-plus",
    "name": "WhatsMiner M76S+",
    "brand": "MicroBT",
    "model": "M76",
    "price": 3900,
    "hashrate": 390,
    "hashrateUnit": "TH/s",
    "power": 5200,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 13.33,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2025-12",
    "noise": 75,
    "coolingType": "Immersion",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1733780648/2jlhmN_NuKdUgfx9y9laSeNaNho.png",
    "description": "The WhatsMiner M76S+ is a high-performance SHA-256 miner from MicroBT. Operating at 5200W with an efficiency of 13.33 J/Unit, it generates a daily revenue of approximately $18.11 with a net daily profit of $5.63 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "whatsminer-m76s",
    "name": "WhatsMiner M76S",
    "brand": "MicroBT",
    "model": "M76",
    "price": 1040,
    "hashrate": 362,
    "hashrateUnit": "TH/s",
    "power": 5200,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 14.36,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2025-12",
    "noise": 75,
    "coolingType": "Immersion",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1733780648/2jlhmN_NuKdUgfx9y9laSeNaNho.png",
    "description": "The WhatsMiner M76S is a high-performance SHA-256 miner from MicroBT. Operating at 5200W with an efficiency of 14.36 J/Unit, it generates a daily revenue of approximately $16.81 with a net daily profit of $4.33 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "teraflux-ai3680",
    "name": "Teraflux AI3680",
    "brand": "Auradine",
    "model": "AI",
    "price": 399,
    "hashrate": 360,
    "hashrateUnit": "TH/s",
    "power": 6840,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 19,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2024-12",
    "noise": 50,
    "coolingType": "Immersion",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1738269416/oQmlFwGPJ0Dv66pLzm0OfeujGik.png",
    "description": "The Teraflux AI3680 is a high-performance SHA-256 miner from Auradine. Operating at 6840W with an efficiency of 19.00 J/Unit, it generates a daily revenue of approximately $16.72 with a net daily profit of $0.30 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "antminer-s21-plus-hyd-358th",
    "name": "Antminer S21+ Hyd (358Th)",
    "brand": "Bitmain",
    "model": "S21+",
    "price": 2236,
    "hashrate": 358,
    "hashrateUnit": "TH/s",
    "power": 5370,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 15,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2025-08",
    "noise": 50,
    "coolingType": "Hydro",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1755003858/NvLQRA-St1IIlt-7Y0S0ueWvl5A.webp",
    "description": "The Antminer S21+ Hyd (358Th) is a high-performance SHA-256 miner from Bitmain. Operating at 5370W with an efficiency of 15.00 J/Unit, it generates a daily revenue of approximately $16.63 with a net daily profit of $3.74 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "whatsminer-m66s-plus-plus",
    "name": "WhatsMiner M66S++",
    "brand": "MicroBT",
    "model": "M66",
    "price": 6520,
    "hashrate": 356,
    "hashrateUnit": "TH/s",
    "power": 5518,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 15.5,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2024-12",
    "noise": 75,
    "coolingType": "Air",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1733780648/2jlhmN_NuKdUgfx9y9laSeNaNho.png",
    "description": "The WhatsMiner M66S++ is a high-performance SHA-256 miner from MicroBT. Operating at 5518W with an efficiency of 15.50 J/Unit, it generates a daily revenue of approximately $16.53 with a net daily profit of $3.29 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "whatsminer-m76",
    "name": "WhatsMiner M76",
    "brand": "MicroBT",
    "model": "M76",
    "price": 750,
    "hashrate": 336,
    "hashrateUnit": "TH/s",
    "power": 5200,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 15.48,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2025-12",
    "noise": 75,
    "coolingType": "Immersion",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1733780648/2jlhmN_NuKdUgfx9y9laSeNaNho.png",
    "description": "The WhatsMiner M76 is a high-performance SHA-256 miner from MicroBT. Operating at 5200W with an efficiency of 15.48 J/Unit, it generates a daily revenue of approximately $15.60 with a net daily profit of $3.12 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "sealminer-a4-pro-air",
    "name": "SealMiner A4 Pro Air",
    "brand": "Bitdeer",
    "model": "A4",
    "price": 2669,
    "hashrate": 336,
    "hashrateUnit": "TH/s",
    "power": 3662,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 10.9,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2026-05",
    "noise": 75,
    "coolingType": "Air",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1775573335/UB-UUqQEsUZlqGNbd1YvEEozlGI.png",
    "description": "The SealMiner A4 Pro Air is a high-performance SHA-256 miner from Bitdeer. Operating at 3662W with an efficiency of 10.90 J/Unit, it generates a daily revenue of approximately $15.60 with a net daily profit of $6.82 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "antminer-s21-hyd-335th",
    "name": "Antminer S21 Hyd (335Th)",
    "brand": "Bitmain",
    "model": "S21",
    "price": 2639,
    "hashrate": 335,
    "hashrateUnit": "TH/s",
    "power": 5360,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 16,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2024-02",
    "noise": 50,
    "coolingType": "Hydro",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1695366808/m5vdij15uqkg0qxsxpro.jpg",
    "description": "The Antminer S21 Hyd (335Th) is a high-performance SHA-256 miner from Bitmain. Operating at 5360W with an efficiency of 16.00 J/Unit, it generates a daily revenue of approximately $15.56 with a net daily profit of $2.69 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "whatsminer-m63",
    "name": "WhatsMiner M63",
    "brand": "MicroBT",
    "model": "M63",
    "price": 4554,
    "hashrate": 334,
    "hashrateUnit": "TH/s",
    "power": 6646,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 19.9,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2023-11",
    "noise": 50,
    "coolingType": "Air",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1701074036/axct0jobauagv8j5639p.png",
    "description": "The WhatsMiner M63 is a high-performance SHA-256 miner from MicroBT. Operating at 6646W with an efficiency of 19.90 J/Unit, it generates a daily revenue of approximately $15.51 with a net daily profit of $-0.44 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "antminer-s21-plus-hyd-319th",
    "name": "Antminer S21+ Hyd (319Th)",
    "brand": "Bitmain",
    "model": "S21+",
    "price": 1929,
    "hashrate": 319,
    "hashrateUnit": "TH/s",
    "power": 4785,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 15,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2025-02",
    "noise": 50,
    "coolingType": "Hydro",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1728471382/0zwKTiCYGXK4vkKeg5t6nYfRWmw.jpg",
    "description": "The Antminer S21+ Hyd (319Th) is a high-performance SHA-256 miner from Bitmain. Operating at 4785W with an efficiency of 15.00 J/Unit, it generates a daily revenue of approximately $14.82 with a net daily profit of $3.33 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "antminer-s23-318th",
    "name": "Antminer S23 (318Th)",
    "brand": "Bitmain",
    "model": "S23",
    "price": 6159,
    "hashrate": 318,
    "hashrateUnit": "TH/s",
    "power": 3498,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 11,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2026-01",
    "noise": 75,
    "coolingType": "Air",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1748393193/YUb54Nbbsidq0kKK5vsBHz_2vXg.jpg",
    "description": "The Antminer S23 (318Th) is a high-performance SHA-256 miner from Bitmain. Operating at 3498W with an efficiency of 11.00 J/Unit, it generates a daily revenue of approximately $14.77 with a net daily profit of $6.37 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "whatsminer-m66s-plus",
    "name": "WhatsMiner M66S+",
    "brand": "MicroBT",
    "model": "M66",
    "price": 430,
    "hashrate": 318,
    "hashrateUnit": "TH/s",
    "power": 5406,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 17,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2024-08",
    "noise": 75,
    "coolingType": "Air",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1733754225/DiLj07ddmoO_zkuTm9UOknAOifM.png",
    "description": "The WhatsMiner M66S+ is a high-performance SHA-256 miner from MicroBT. Operating at 5406W with an efficiency of 17.00 J/Unit, it generates a daily revenue of approximately $14.77 with a net daily profit of $1.79 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "antminer-s21e-hyd-310th",
    "name": "Antminer S21e Hyd (310Th)",
    "brand": "Bitmain",
    "model": "S21",
    "price": 1176,
    "hashrate": 310,
    "hashrateUnit": "TH/s",
    "power": 5270,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 17,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2025-08",
    "noise": 50,
    "coolingType": "Hydro",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1754930429/wJJYZY38rm6fVd1dmInK3k5KZIk.webp",
    "description": "The Antminer S21e Hyd (310Th) is a high-performance SHA-256 miner from Bitmain. Operating at 5270W with an efficiency of 17.00 J/Unit, it generates a daily revenue of approximately $14.40 with a net daily profit of $1.75 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "antminer-s21-immersion-301th",
    "name": "Antminer S21 Immersion (301Th)",
    "brand": "Bitmain",
    "model": "S21",
    "price": 2159,
    "hashrate": 301,
    "hashrateUnit": "TH/s",
    "power": 5569,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 18.5,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2024-12",
    "noise": 50,
    "coolingType": "Immersion",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1734267335/n__DvThJnJqq4WWG_R0fvwNwySg.jpg",
    "description": "The Antminer S21 Immersion (301Th) is a high-performance SHA-256 miner from Bitmain. Operating at 5569W with an efficiency of 18.50 J/Unit, it generates a daily revenue of approximately $13.98 with a net daily profit of $0.61 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "antminer-s21-xp-immersion-300th",
    "name": "Antminer S21 XP Immersion (300Th)",
    "brand": "Bitmain",
    "model": "S21",
    "price": 2848,
    "hashrate": 300,
    "hashrateUnit": "TH/s",
    "power": 4050,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 13.5,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2024-09",
    "noise": 50,
    "coolingType": "Immersion",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1719598951/wcsqDJz_XHMMBjfScpsoQxmv4Ck.webp",
    "description": "The Antminer S21 XP Immersion (300Th) is a high-performance SHA-256 miner from Bitmain. Operating at 4050W with an efficiency of 13.50 J/Unit, it generates a daily revenue of approximately $13.93 with a net daily profit of $4.21 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "a16xp-300t",
    "name": "Avalon A16XP-300T",
    "brand": "Canaan",
    "model": "A16",
    "price": 4464,
    "hashrate": 300,
    "hashrateUnit": "TH/s",
    "power": 3850,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 12.83,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2026-04",
    "noise": 75,
    "coolingType": "Air",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1761671842/UbNNyYCvp9HYLBaWbaDIzyQS4Gs.png",
    "description": "The Avalon A16XP-300T is a high-performance SHA-256 miner from Canaan. Operating at 3850W with an efficiency of 12.83 J/Unit, it generates a daily revenue of approximately $13.93 with a net daily profit of $4.69 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "whatsminer-m66s",
    "name": "WhatsMiner M66S",
    "brand": "MicroBT",
    "model": "M66",
    "price": 3999,
    "hashrate": 298,
    "hashrateUnit": "TH/s",
    "power": 5513,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 18.5,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2023-11",
    "noise": 50,
    "coolingType": "Air",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1701074731/xyshv8ytrr4dtcbjt3q9.png",
    "description": "The WhatsMiner M66S is a high-performance SHA-256 miner from MicroBT. Operating at 5513W with an efficiency of 18.50 J/Unit, it generates a daily revenue of approximately $13.84 with a net daily profit of $0.61 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "antminer-s19-xp-plus-hyd-293th",
    "name": "Antminer S19 XP+ Hyd (293Th)",
    "brand": "Bitmain",
    "model": "S19",
    "price": 725,
    "hashrate": 293,
    "hashrateUnit": "TH/s",
    "power": 5567,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 19,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2025-04",
    "noise": 50,
    "coolingType": "Hydro",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1744634892/zdH1t5Eh_hd0hNtJT4L_1QGqyMQ.jpg",
    "description": "The Antminer S19 XP+ Hyd (293Th) is a high-performance SHA-256 miner from Bitmain. Operating at 5567W with an efficiency of 19.00 J/Unit, it generates a daily revenue of approximately $13.61 with a net daily profit of $0.25 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "sealminer-a3-pro-air",
    "name": "SealMiner A3 Pro Air",
    "brand": "Bitdeer",
    "model": "A3",
    "price": 3592,
    "hashrate": 290,
    "hashrateUnit": "TH/s",
    "power": 3625,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 12.5,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2025-09",
    "noise": 75,
    "coolingType": "Air",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1758233278/vC-9QS01XghepaVdHs3ZKUTPzFI.png",
    "description": "The SealMiner A3 Pro Air is a high-performance SHA-256 miner from Bitdeer. Operating at 3625W with an efficiency of 12.50 J/Unit, it generates a daily revenue of approximately $13.47 with a net daily profit of $4.77 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "antminer-s21e-hyd-288th",
    "name": "Antminer S21e Hyd (288Th)",
    "brand": "Bitmain",
    "model": "S21",
    "price": 1096,
    "hashrate": 288,
    "hashrateUnit": "TH/s",
    "power": 4896,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 17,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2025-04",
    "noise": 50,
    "coolingType": "Hydro",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1744737700/k5V6JlKhyAlTa0ibQrR1WRoZ248.jpg",
    "description": "The Antminer S21e Hyd (288Th) is a high-performance SHA-256 miner from Bitmain. Operating at 4896W with an efficiency of 17.00 J/Unit, it generates a daily revenue of approximately $13.38 with a net daily profit of $1.62 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "a16-282t",
    "name": "Avalon A16-282T",
    "brand": "Canaan",
    "model": "A16",
    "price": 3359,
    "hashrate": 282,
    "hashrateUnit": "TH/s",
    "power": 3900,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 13.83,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2026-03",
    "noise": 75,
    "coolingType": "Air",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1761672061/e3MwT1by7cJsQboR72DzbUbuGRk.png",
    "description": "The Avalon A16-282T is a high-performance SHA-256 miner from Canaan. Operating at 3900W with an efficiency of 13.83 J/Unit, it generates a daily revenue of approximately $13.10 with a net daily profit of $3.74 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "whatsminer-m66",
    "name": "WhatsMiner M66",
    "brand": "MicroBT",
    "model": "M66",
    "price": 3360,
    "hashrate": 280,
    "hashrateUnit": "TH/s",
    "power": 5572,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 19.9,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2023-11",
    "noise": 50,
    "coolingType": "Air",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1701074589/jsgslnrj2tsthb2iaiuq.png",
    "description": "The WhatsMiner M66 is a high-performance SHA-256 miner from MicroBT. Operating at 5572W with an efficiency of 19.90 J/Unit, it generates a daily revenue of approximately $13.00 with a net daily profit of $-0.37 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "antminer-s19-xp-plus-hyd-279th",
    "name": "Antminer S19 XP+ Hyd (279Th)",
    "brand": "Bitmain",
    "model": "S19",
    "price": 743,
    "hashrate": 279,
    "hashrateUnit": "TH/s",
    "power": 5301,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 19,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2025-01",
    "noise": 50,
    "coolingType": "Hydro",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1737897634/TKb3BlyKLch5amu6wpZDqXiZ10o.jpg",
    "description": "The Antminer S19 XP+ Hyd (279Th) is a high-performance SHA-256 miner from Bitmain. Operating at 5301W with an efficiency of 19.00 J/Unit, it generates a daily revenue of approximately $12.96 with a net daily profit of $0.23 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "antmine-s21-xp-270th",
    "name": "Antminer S21 XP (270Th)",
    "brand": "Bitmain",
    "model": "S21",
    "price": 2879,
    "hashrate": 270,
    "hashrateUnit": "TH/s",
    "power": 3645,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 13.5,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2024-09",
    "noise": 75,
    "coolingType": "Air",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1719598629/Mb9PMkXPXpWOBFlLycwFarjkyic.webp",
    "description": "The Antminer S21 XP (270Th) is a high-performance SHA-256 miner from Bitmain. Operating at 3645W with an efficiency of 13.50 J/Unit, it generates a daily revenue of approximately $12.54 with a net daily profit of $3.79 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "whatsminer-m72s",
    "name": "WhatsMiner M72S",
    "brand": "MicroBT",
    "model": "M72",
    "price": 4480,
    "hashrate": 264,
    "hashrateUnit": "TH/s",
    "power": 4000,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 15.15,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2025-12",
    "noise": 75,
    "coolingType": "Air",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1765211230/Fnt-GOjmXbGJ3UwLAtPe1FovHIo.png",
    "description": "The WhatsMiner M72S is a high-performance SHA-256 miner from MicroBT. Operating at 4000W with an efficiency of 15.15 J/Unit, it generates a daily revenue of approximately $12.26 with a net daily profit of $2.66 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "avalon-a1566i",
    "name": "Avalon A1566I",
    "brand": "Canaan",
    "model": "A15",
    "price": 399,
    "hashrate": 261,
    "hashrateUnit": "TH/s",
    "power": 4500,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 17.24,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2024-07",
    "noise": 50,
    "coolingType": "Air",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1721344061/FHbdvgoyxjDvtRKzr0gqEqRSl60.jpg",
    "description": "The Avalon A1566I is a high-performance SHA-256 miner from Canaan. Operating at 4500W with an efficiency of 17.24 J/Unit, it generates a daily revenue of approximately $12.12 with a net daily profit of $1.32 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "whatsminer-m53s",
    "name": "Whatsminer M53S",
    "brand": "MicroBT",
    "model": "M53",
    "price": 3120,
    "hashrate": 260,
    "hashrateUnit": "TH/s",
    "power": 6760,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 26,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2023-05",
    "noise": 50,
    "coolingType": "Air",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1684392390/t4hlfzppsawd2lwijepv.webp",
    "description": "The Whatsminer M53S is a high-performance SHA-256 miner from MicroBT. Operating at 6760W with an efficiency of 26.00 J/Unit, it generates a daily revenue of approximately $12.07 with a net daily profit of $-4.15 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "sealminer-a3-air",
    "name": "SealMiner A3 Air",
    "brand": "Bitdeer",
    "model": "A3",
    "price": 3199,
    "hashrate": 260,
    "hashrateUnit": "TH/s",
    "power": 3640,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 14,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2025-09",
    "noise": 75,
    "coolingType": "Air",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1758232960/COgEF1eNuhWB0oV2417HW_Eg258.png",
    "description": "The SealMiner A3 Air is a high-performance SHA-256 miner from Bitdeer. Operating at 3640W with an efficiency of 14.00 J/Unit, it generates a daily revenue of approximately $12.07 with a net daily profit of $3.34 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "teraflux-at2880",
    "name": "Teraflux AT2880",
    "brand": "Auradine",
    "model": "AT",
    "price": 399,
    "hashrate": 260,
    "hashrateUnit": "TH/s",
    "power": 4680,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 18,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2024-11",
    "noise": 70,
    "coolingType": "Air",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1738269062/_f2T_nUE7jUruyf64dHJjWXTNJs.png",
    "description": "The Teraflux AT2880 is a high-performance SHA-256 miner from Auradine. Operating at 4680W with an efficiency of 18.00 J/Unit, it generates a daily revenue of approximately $12.07 with a net daily profit of $0.84 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "antminer-s19-xp-hyd-257th",
    "name": "Antminer S19 XP Hyd (257Th)",
    "brand": "Bitmain",
    "model": "S19 XP",
    "price": 946,
    "hashrate": 257,
    "hashrateUnit": "TH/s",
    "power": 5345,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 20.8,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2022-10",
    "noise": 50,
    "coolingType": "Hydro",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1750171553/lIoTomBPMbzPIpPTcL98FRhTa3E.jpg",
    "description": "The Antminer S19 XP Hyd (257Th) is a high-performance SHA-256 miner from Bitmain. Operating at 5345W with an efficiency of 20.80 J/Unit, it generates a daily revenue of approximately $11.94 with a net daily profit of $-0.89 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "sealminer-a2-pro-air",
    "name": "SealMiner A2 Pro Air",
    "brand": "Bitdeer",
    "model": "A2",
    "price": 2704,
    "hashrate": 255,
    "hashrateUnit": "TH/s",
    "power": 3790,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 14.86,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2025-03",
    "noise": 75,
    "coolingType": "Air",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1742245300/tWWWEkk1NDwtmJ0JawK3USpNlHI.webp",
    "description": "The SealMiner A2 Pro Air is a high-performance SHA-256 miner from Bitdeer. Operating at 3790W with an efficiency of 14.86 J/Unit, it generates a daily revenue of approximately $11.84 with a net daily profit of $2.75 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "antminer-s21-pro-245th",
    "name": "Antminer S21 Pro (245Th)",
    "brand": "Bitmain",
    "model": "S21",
    "price": 2479,
    "hashrate": 245,
    "hashrateUnit": "TH/s",
    "power": 3675,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 15,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2025-11",
    "noise": 75,
    "coolingType": "Air",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1716505538/evtmkqz0jefzz2tssirj.png",
    "description": "The Antminer S21 Pro (245Th) is a high-performance SHA-256 miner from Bitmain. Operating at 3675W with an efficiency of 15.00 J/Unit, it generates a daily revenue of approximately $11.38 with a net daily profit of $2.56 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "whatsminer-m70splus",
    "name": "WhatsMiner M70S+",
    "brand": "MicroBT",
    "model": "M70",
    "price": 911,
    "hashrate": 244,
    "hashrateUnit": "TH/s",
    "power": 3140,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 12.87,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2025-12",
    "noise": 75,
    "coolingType": "Air",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1765129675/tS4hPI-QNj049sBOglADY8v7JtE.png",
    "description": "The WhatsMiner M70S+ is a high-performance SHA-256 miner from MicroBT. Operating at 3140W with an efficiency of 12.87 J/Unit, it generates a daily revenue of approximately $11.33 with a net daily profit of $3.80 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "whatsminer-m33s",
    "name": "Whatsminer M33S++",
    "brand": "MicroBT",
    "model": "M33",
    "price": 2904,
    "hashrate": 242,
    "hashrateUnit": "TH/s",
    "power": 7260,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 30,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2022-12",
    "noise": 40,
    "coolingType": "Hydro",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1675069463/fhwtpjtxg6kujdxjzbw2.webp",
    "description": "The Whatsminer M33S++ is a high-performance SHA-256 miner from MicroBT. Operating at 7260W with an efficiency of 30.00 J/Unit, it generates a daily revenue of approximately $11.24 with a net daily profit of $-6.19 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "antminer-t19-pro-hyd-235th",
    "name": "Antminer T19 Pro Hyd (235Th)",
    "brand": "Bitmain",
    "model": "T19",
    "price": 2820,
    "hashrate": 235,
    "hashrateUnit": "TH/s",
    "power": 5170,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 22,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2024-02",
    "noise": 30,
    "coolingType": "Hydro",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1708689215/mzevapro3o0aly92tbzw.webp",
    "description": "The Antminer T19 Pro Hyd (235Th) is a high-performance SHA-256 miner from Bitmain. Operating at 5170W with an efficiency of 22.00 J/Unit, it generates a daily revenue of approximately $10.91 with a net daily profit of $-1.49 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "antminer-s21-plus-235th",
    "name": "Antminer S21+ (235Th)",
    "brand": "Bitmain",
    "model": "S21",
    "price": 1221,
    "hashrate": 235,
    "hashrateUnit": "TH/s",
    "power": 3877,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 16.5,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2025-06",
    "noise": 75,
    "coolingType": "Air",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1749711286/pDnbFkZi8BQwwg3IjBkk5VQ7-DQ.jpg",
    "description": "The Antminer S21+ (235Th) is a high-performance SHA-256 miner from Bitmain. Operating at 3877W with an efficiency of 16.50 J/Unit, it generates a daily revenue of approximately $10.91 with a net daily profit of $1.61 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "antminer-s21-pro-234th",
    "name": "Antminer S21 Pro (234Th)",
    "brand": "Bitmain",
    "model": "S21",
    "price": 1666,
    "hashrate": 234,
    "hashrateUnit": "TH/s",
    "power": 3510,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 15,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2024-07",
    "noise": 75,
    "coolingType": "Air",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1716505538/evtmkqz0jefzz2tssirj.png",
    "description": "The Antminer S21 Pro (234Th) is a high-performance SHA-256 miner from Bitmain. Operating at 3510W with an efficiency of 15.00 J/Unit, it generates a daily revenue of approximately $10.87 with a net daily profit of $2.44 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "whatsminer-m53",
    "name": "Whatsminer M53",
    "brand": "MicroBT",
    "model": "M53",
    "price": 2760,
    "hashrate": 230,
    "hashrateUnit": "TH/s",
    "power": 6670,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 29,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2023-05",
    "noise": 50,
    "coolingType": "Air",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1684392189/gvfnum9ns4fybkxflp1c.webp",
    "description": "The Whatsminer M53 is a high-performance SHA-256 miner from MicroBT. Operating at 6670W with an efficiency of 29.00 J/Unit, it generates a daily revenue of approximately $10.68 with a net daily profit of $-5.33 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "sealminer-a2",
    "name": "SealMiner A2",
    "brand": "Bitdeer",
    "model": "A2",
    "price": 3201,
    "hashrate": 226,
    "hashrateUnit": "TH/s",
    "power": 3730,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 16.5,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2025-02",
    "noise": 75,
    "coolingType": "Air",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1730157041/3eNnmoSLvX3mR9Xt5ChxpAj25rs.png",
    "description": "The SealMiner A2 is a high-performance SHA-256 miner from Bitdeer. Operating at 3730W with an efficiency of 16.50 J/Unit, it generates a daily revenue of approximately $10.50 with a net daily profit of $1.54 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "whatsminer-m60s-plus-plus",
    "name": "WhatsMiner M60S++",
    "brand": "Micro BT",
    "model": "M60",
    "price": 1680,
    "hashrate": 226,
    "hashrateUnit": "TH/s",
    "power": 3600,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 15.93,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2024-12",
    "noise": 75,
    "coolingType": "Air",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1733753630/gWwTZw9J2Uk_yX37GHoY061ixCo.png",
    "description": "The WhatsMiner M60S++ is a high-performance SHA-256 miner from Micro BT. Operating at 3600W with an efficiency of 15.93 J/Unit, it generates a daily revenue of approximately $10.50 with a net daily profit of $1.86 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "whatsminer-m70s",
    "name": "WhatsMiner M70S",
    "brand": "MicroBT",
    "model": "M70",
    "price": 2398,
    "hashrate": 226,
    "hashrateUnit": "TH/s",
    "power": 3140,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 13.89,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2025-12",
    "noise": 75,
    "coolingType": "Air",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1765129675/tS4hPI-QNj049sBOglADY8v7JtE.png",
    "description": "The WhatsMiner M70S is a high-performance SHA-256 miner from MicroBT. Operating at 3140W with an efficiency of 13.89 J/Unit, it generates a daily revenue of approximately $10.50 with a net daily profit of $2.96 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "antminer-s21-plus-225th",
    "name": "Antminer S21+ (225Th)",
    "brand": "Bitmain",
    "model": "S21",
    "price": 1359,
    "hashrate": 225,
    "hashrateUnit": "TH/s",
    "power": 3712,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 16.5,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2025-06",
    "noise": 75,
    "coolingType": "Air",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1749711019/GvXW_FWljklwD3W64Lo8v5kKqFY.jpg",
    "description": "The Antminer S21+ (225Th) is a high-performance SHA-256 miner from Bitmain. Operating at 3712W with an efficiency of 16.50 J/Unit, it generates a daily revenue of approximately $10.45 with a net daily profit of $1.54 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "a15pro-221t",
    "name": "Avalon A15Pro-221T",
    "brand": "Canaan",
    "model": "A15",
    "price": 1530,
    "hashrate": 221,
    "hashrateUnit": "TH/s",
    "power": 3662,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 16.57,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2025-03",
    "noise": 75,
    "coolingType": "Air",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1761674265/NiSzDhBJb09yCkQyLtthJ6zDzQ8.png",
    "description": "The Avalon A15Pro-221T is a high-performance SHA-256 miner from Canaan. Operating at 3662W with an efficiency of 16.57 J/Unit, it generates a daily revenue of approximately $10.26 with a net daily profit of $1.47 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "a15pro-218t",
    "name": "Avalon A15Pro-218T",
    "brand": "Canaan",
    "model": "A15",
    "price": 1999,
    "hashrate": 218,
    "hashrateUnit": "TH/s",
    "power": 3662,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 16.8,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2025-02",
    "noise": 75,
    "coolingType": "Air",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1743665309/EpYIT7gjMnmq26r9ts9eXCJjw88.png",
    "description": "The Avalon A15Pro-218T is a high-performance SHA-256 miner from Canaan. Operating at 3662W with an efficiency of 16.80 J/Unit, it generates a daily revenue of approximately $10.12 with a net daily profit of $1.34 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "antminer-s21-plus-216th",
    "name": "Antminer S21+ (216Th)",
    "brand": "Bitmain",
    "model": "S21",
    "price": 2100,
    "hashrate": 216,
    "hashrateUnit": "TH/s",
    "power": 3564,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 16.5,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2025-02",
    "noise": 75,
    "coolingType": "Air",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1728470878/w9wes_94Y41AMDdfNGZwMX_lD5M.jpg",
    "description": "The Antminer S21+ (216Th) is a high-performance SHA-256 miner from Bitmain. Operating at 3564W with an efficiency of 16.50 J/Unit, it generates a daily revenue of approximately $10.03 with a net daily profit of $1.48 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "whatsminer-m70",
    "name": "WhatsMiner M70",
    "brand": "MicroBT",
    "model": "M70",
    "price": 577,
    "hashrate": 214,
    "hashrateUnit": "TH/s",
    "power": 3140,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 14.67,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2025-12",
    "noise": 75,
    "coolingType": "Air",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1765129675/tS4hPI-QNj049sBOglADY8v7JtE.png",
    "description": "The WhatsMiner M70 is a high-performance SHA-256 miner from MicroBT. Operating at 3140W with an efficiency of 14.67 J/Unit, it generates a daily revenue of approximately $9.94 with a net daily profit of $2.40 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "whatsminer-m60s-plus",
    "name": "WhatsMiner M60S+",
    "brand": "Micro BT",
    "model": "M60",
    "price": 399,
    "hashrate": 212,
    "hashrateUnit": "TH/s",
    "power": 3600,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 16.98,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2024-07",
    "noise": 75,
    "coolingType": "Air",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1722354921/ysGSFzBuhAvzsUsDLBpdG1cAUtw.png",
    "description": "The WhatsMiner M60S+ is a high-performance SHA-256 miner from Micro BT. Operating at 3600W with an efficiency of 16.98 J/Unit, it generates a daily revenue of approximately $9.85 with a net daily profit of $1.21 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "whatsminer-m56s",
    "name": "WhatsMiner M56S",
    "brand": "MicroBT",
    "model": "M56",
    "price": 1359,
    "hashrate": 212,
    "hashrateUnit": "TH/s",
    "power": 5550,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 26.18,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2023-01",
    "noise": 45,
    "coolingType": "Immersion",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1683583160/fqoblvem4btbqafaa6c3.webp",
    "description": "The WhatsMiner M56S is a high-performance SHA-256 miner from MicroBT. Operating at 5550W with an efficiency of 26.18 J/Unit, it generates a daily revenue of approximately $9.85 with a net daily profit of $-3.47 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "a15xp-206t",
    "name": "Avalon A15XP-206T",
    "brand": "Canaan",
    "model": "A15",
    "price": 3183,
    "hashrate": 206,
    "hashrateUnit": "TH/s",
    "power": 3667,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 17.8,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2024-12",
    "noise": 75,
    "coolingType": "Air",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1731054564/yOzAH-Ks0FAS9ziLA2TpFME8fsY.png",
    "description": "The Avalon A15XP-206T is a high-performance SHA-256 miner from Canaan. Operating at 3667W with an efficiency of 17.80 J/Unit, it generates a daily revenue of approximately $9.57 with a net daily profit of $0.77 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "antminer-s21-200th",
    "name": "Antminer S21 (200Th)",
    "brand": "Bitmain",
    "model": "S21",
    "price": 887,
    "hashrate": 200,
    "hashrateUnit": "TH/s",
    "power": 3500,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 17.5,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2024-02",
    "noise": 75,
    "coolingType": "Air",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1695366551/ytdmzeira0f9bchznwan.jpg",
    "description": "The Antminer S21 (200Th) is a high-performance SHA-256 miner from Bitmain. Operating at 3500W with an efficiency of 17.50 J/Unit, it generates a daily revenue of approximately $9.29 with a net daily profit of $0.89 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "antminer-s19-pro-hyd-198th",
    "name": "Antminer S19 Pro+ Hyd (198Th)",
    "brand": "Bitmain",
    "model": "S19",
    "price": 918,
    "hashrate": 198,
    "hashrateUnit": "TH/s",
    "power": 5445,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 27.5,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2022-05",
    "noise": 50,
    "coolingType": "Hydro",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1642772874/v0ob7lrf8rp9kwekqkbn.png",
    "description": "The Antminer S19 Pro+ Hyd (198Th) is a high-performance SHA-256 miner from Bitmain. Operating at 5445W with an efficiency of 27.50 J/Unit, it generates a daily revenue of approximately $9.20 with a net daily profit of $-3.87 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "a15-194t",
    "name": "Avalon A15-194T",
    "brand": "Canaan",
    "model": "A15",
    "price": 399,
    "hashrate": 194,
    "hashrateUnit": "TH/s",
    "power": 3647,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 18.8,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2024-12",
    "noise": 75,
    "coolingType": "Air",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1731056143/2Gz0VVVjEza5EnkW9STwHGN50Bo.png",
    "description": "The Avalon A15-194T is a high-performance SHA-256 miner from Canaan. Operating at 3647W with an efficiency of 18.80 J/Unit, it generates a daily revenue of approximately $9.01 with a net daily profit of $0.26 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "whatsminer-m56",
    "name": "WhatsMiner M56",
    "brand": "MicroBT",
    "model": "M56",
    "price": 2328,
    "hashrate": 194,
    "hashrateUnit": "TH/s",
    "power": 5550,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 28.61,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2023-01",
    "noise": 45,
    "coolingType": "Immersion",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1673355130/a4tnymaab3mlrquwomss.png",
    "description": "The WhatsMiner M56 is a high-performance SHA-256 miner from MicroBT. Operating at 5550W with an efficiency of 28.61 J/Unit, it generates a daily revenue of approximately $9.01 with a net daily profit of $-4.31 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "antminer-t21-190th",
    "name": "Antminer T21 (190Th)",
    "brand": "Bitmain",
    "model": "T21",
    "price": 1712,
    "hashrate": 190,
    "hashrateUnit": "TH/s",
    "power": 3610,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 19,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2024-02",
    "noise": 75,
    "coolingType": "Air",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1698307950/hssgao4kk2jryzunhajj.jpg",
    "description": "The Antminer T21 (190Th) is a high-performance SHA-256 miner from Bitmain. Operating at 3610W with an efficiency of 19.00 J/Unit, it generates a daily revenue of approximately $8.82 with a net daily profit of $0.16 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "whatsminer-m60s",
    "name": "WhatsMiner M60S",
    "brand": "MicroBT",
    "model": "M60",
    "price": 1684,
    "hashrate": 186,
    "hashrateUnit": "TH/s",
    "power": 3441,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 18.5,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2024-02",
    "noise": 75,
    "coolingType": "Air",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1698310158/r9oslhkzebwuxpswyeq0.png",
    "description": "The WhatsMiner M60S is a high-performance SHA-256 miner from MicroBT. Operating at 3441W with an efficiency of 18.50 J/Unit, it generates a daily revenue of approximately $8.64 with a net daily profit of $0.38 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "avalon-a1566",
    "name": "Avalon A1566",
    "brand": "Canaan",
    "model": "A15",
    "price": 939,
    "hashrate": 185,
    "hashrateUnit": "TH/s",
    "power": 3420,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 18.49,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2024-10",
    "noise": 75,
    "coolingType": "Air",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1716505681/sbvjysji3pf3yw905t0i.jpg",
    "description": "The Avalon A1566 is a high-performance SHA-256 miner from Canaan. Operating at 3420W with an efficiency of 18.49 J/Unit, it generates a daily revenue of approximately $8.59 with a net daily profit of $0.38 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "antminer-t21-180th",
    "name": "Antminer T21 (180Th)",
    "brand": "Bitmain",
    "model": "T21",
    "price": 399,
    "hashrate": 180,
    "hashrateUnit": "TH/s",
    "power": 3420,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 19,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2024-04",
    "noise": 75,
    "coolingType": "Air",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1754424982/X-XhJpGoG59k37IY_4Tru72y_RE.jpg",
    "description": "The Antminer T21 (180Th) is a high-performance SHA-256 miner from Bitmain. Operating at 3420W with an efficiency of 19.00 J/Unit, it generates a daily revenue of approximately $8.36 with a net daily profit of $0.15 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "antminer-s19-pro-hyd-177th",
    "name": "Antminer S19 Pro Hyd (177Th)",
    "brand": "Bitmain",
    "model": "S19 Pro",
    "price": 2124,
    "hashrate": 177,
    "hashrateUnit": "TH/s",
    "power": 5221,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 29.5,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2023-01",
    "noise": 50,
    "coolingType": "Hydro",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1667753683/exlphnafjwvyfovmimp8.png",
    "description": "The Antminer S19 Pro Hyd (177Th) is a high-performance SHA-256 miner from Bitmain. Operating at 5221W with an efficiency of 29.50 J/Unit, it generates a daily revenue of approximately $8.22 with a net daily profit of $-4.31 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "antminer-ka3-173th",
    "name": "Antminer KA3 (173Th)",
    "brand": "Bitmain",
    "model": "KA3",
    "price": 2076,
    "hashrate": 173,
    "hashrateUnit": "TH/s",
    "power": 3287,
    "algorithm": "Kadena",
    "coins": [
      "KDA"
    ],
    "efficiency": 19,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2024-05",
    "noise": 80,
    "coolingType": "Air",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1728421620/dgeBV0n2pjwb21RwEyf1_FeU3ro.webp",
    "description": "The Antminer KA3 (173Th) is a high-performance Kadena miner from Bitmain. Operating at 3287W with an efficiency of 19.00 J/Unit, it generates a daily revenue of approximately $0.00 with a net daily profit of $-7.89 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "whatsminer-m60",
    "name": "WhatsMiner M60",
    "brand": "MicroBT",
    "model": "M60",
    "price": 612,
    "hashrate": 172,
    "hashrateUnit": "TH/s",
    "power": 3422,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 19.9,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2024-02",
    "noise": 75,
    "coolingType": "Air",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1698310060/llb9sgh0tyqhder08cb5.png",
    "description": "The WhatsMiner M60 is a high-performance SHA-256 miner from MicroBT. Operating at 3422W with an efficiency of 19.90 J/Unit, it generates a daily revenue of approximately $7.99 with a net daily profit of $-0.22 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "antminer-ka3-166th",
    "name": "Antminer KA3 (166Th)",
    "brand": "Bitmain",
    "model": "KA3",
    "price": 1992,
    "hashrate": 166,
    "hashrateUnit": "TH/s",
    "power": 3154,
    "algorithm": "Kadena",
    "coins": [
      "KDA"
    ],
    "efficiency": 19,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2022-09",
    "noise": 80,
    "coolingType": "Air",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1663081317/x6fvj9ikeadet7vjcx7t.jpg",
    "description": "The Antminer KA3 (166Th) is a high-performance Kadena miner from Bitmain. Operating at 3154W with an efficiency of 19.00 J/Unit, it generates a daily revenue of approximately $0.00 with a net daily profit of $-7.57 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "whatsminer-m36s",
    "name": "Whatsminer M36S+",
    "brand": "MicroBT",
    "model": "M36",
    "price": 1968,
    "hashrate": 164,
    "hashrateUnit": "TH/s",
    "power": 5576,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 34,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2023-05",
    "noise": 50,
    "coolingType": "Air",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1684392060/qyletprphj5jb0tkbmov.webp",
    "description": "The Whatsminer M36S+ is a high-performance SHA-256 miner from MicroBT. Operating at 5576W with an efficiency of 34.00 J/Unit, it generates a daily revenue of approximately $7.62 with a net daily profit of $-5.77 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "antminer-s19-hydro-158th",
    "name": "Antminer S19 Hydro (158Th)",
    "brand": "Bitmain",
    "model": "S19",
    "price": 1896,
    "hashrate": 158,
    "hashrateUnit": "TH/s",
    "power": 5451,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 34.5,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2022-10",
    "noise": 50,
    "coolingType": "Hydro",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1666211470/zke1ikusibaqyddujmde.webp",
    "description": "The Antminer S19 Hydro (158Th) is a high-performance SHA-256 miner from Bitmain. Operating at 5451W with an efficiency of 34.50 J/Unit, it generates a daily revenue of approximately $7.34 with a net daily profit of $-5.74 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "antminer-t19-hydro-158th",
    "name": "Antminer T19 Hydro (158Th)",
    "brand": "Bitmain",
    "model": "T19",
    "price": 1896,
    "hashrate": 158,
    "hashrateUnit": "TH/s",
    "power": 5451,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 34.5,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2022-10",
    "noise": 40,
    "coolingType": "Hydro",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1750634411/dffBddtZF9FzWiahmNQfbXSuveo.jpg",
    "description": "The Antminer T19 Hydro (158Th) is a high-performance SHA-256 miner from Bitmain. Operating at 5451W with an efficiency of 34.50 J/Unit, it generates a daily revenue of approximately $7.34 with a net daily profit of $-5.74 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "antminer-s19j-xp-151th",
    "name": "Antminer S19j XP (151Th)",
    "brand": "Bitmain",
    "model": "S19",
    "price": 447,
    "hashrate": 151,
    "hashrateUnit": "TH/s",
    "power": 3247,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 21.5,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2024-06",
    "noise": 75,
    "coolingType": "Air",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1719599235/nXic3rjuvIgjdH2jRUxO9kWC-UA.webp",
    "description": "The Antminer S19j XP (151Th) is a high-performance SHA-256 miner from Bitmain. Operating at 3247W with an efficiency of 21.50 J/Unit, it generates a daily revenue of approximately $7.01 with a net daily profit of $-0.78 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "avalon-made-a1466",
    "name": "Avalon Made A1466",
    "brand": "Canaan",
    "model": "A14",
    "price": 1800,
    "hashrate": 150,
    "hashrateUnit": "TH/s",
    "power": 3230,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 21.53,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2023-09",
    "noise": 75,
    "coolingType": "Air",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1695711877/ltk7pnebihsbx1kg0sah.png",
    "description": "The Avalon Made A1466 is a high-performance SHA-256 miner from Canaan. Operating at 3230W with an efficiency of 21.53 J/Unit, it generates a daily revenue of approximately $6.97 with a net daily profit of $-0.79 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "antminer-t19-hydro-145th",
    "name": "Antminer T19 Hydro (145Th)",
    "brand": "Bitmain",
    "model": "T19",
    "price": 1740,
    "hashrate": 145,
    "hashrateUnit": "TH/s",
    "power": 5438,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 37.5,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2022-10",
    "noise": 40,
    "coolingType": "Hydro",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1657806821/mjc5mybv1dcqlr1nqhce.jpg",
    "description": "The Antminer T19 Hydro (145Th) is a high-performance SHA-256 miner from Bitmain. Operating at 5438W with an efficiency of 37.50 J/Unit, it generates a daily revenue of approximately $6.73 with a net daily profit of $-6.32 (estimated at $0.10/kWh electricity cost)."
  },
  {
    "id": "antminer-s19-xp-140th",
    "name": "Antminer S19 XP (140Th)",
    "brand": "Bitmain",
    "model": "S19",
    "price": 1680,
    "hashrate": 140,
    "hashrateUnit": "TH/s",
    "power": 3010,
    "algorithm": "SHA-256",
    "coins": [
      "BTC"
    ],
    "efficiency": 21.5,
    "efficiencyUnit": "J/T",
    "status": "In Stock",
    "releaseDate": "2022-07",
    "noise": 75,
    "coolingType": "Air",
    "imageUrl": "https://res.cloudinary.com/dluwgr5op/image/upload/v1636570378/vl49nbievkrgipo2l0m6.png",
    "description": "The Antminer S19 XP (140Th) is a high-performance SHA-256 miner from Bitmain. Operating at 3010W with an efficiency of 21.50 J/Unit, it generates a daily revenue of approximately $6.50 with a net daily profit of $-0.72 (estimated at $0.10/kWh electricity cost)."
  }
];

export const STAFF_MEMBERS: Staff[] = [
  {
    name: 'Alice Chen',
    role: 'Senior Sales Director',
    email: 'alice.c@apextomining.com',
    telegram: '@Alice_Apexto',
    whatsapp: '+86 138 2356 8890',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    verified: true
  },
  {
    name: 'David Smith',
    role: 'Global Logistics Manager',
    email: 'david.smith@apextomining.com',
    telegram: '@David_Apexto_Logistics',
    whatsapp: '+1 (415) 890-4432',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150',
    verified: true
  },
  {
    name: 'Elena Petrova',
    role: 'Sales Representative (CIS Region)',
    email: 'elena.p@apextomining.com',
    telegram: '@Elena_Apexto',
    whatsapp: '+86 139 4432 9901',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
    verified: true
  },
  {
    name: 'Kenji Sato',
    role: 'Technical Support Lead',
    email: 'kenji.s@apextomining.com',
    telegram: '@Kenji_Apexto_Support',
    whatsapp: '+86 137 9900 1122',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150',
    verified: true
  }
];

export const SCAM_WARNINGS: { [key: string]: string } = {
  '@alice_apexto_support': 'This is an impersonation account. The official Telegram handle is @Alice_Apexto. They will never DM you first with investment schemes.',
  '@elena_apexto_sales': 'Impostor detected. The official handle is @Elena_Apexto. Always authenticate staff through our site.',
  '@apexto_miners_bot': 'Warning! This is a scam channel. Apexto Mining does not use automated bots to collect payments or deposits.',
  '@david_apexto_admin': 'Impostor alert. The official logistics coordinator Telegram is @David_Apexto_Logistics.'
};

export const HOSTING_CABINETS: HostingCabinet[] = [
  {
    id: 'hydro-cabinet-h12',
    name: 'Apexto Hydro Cooling Cabinet H12',
    capacity: '12 Hydro ASICs (e.g. S21 Hydro, M63S)',
    cooling: 'Water Loop & External Dry Cooler Support',
    powerLimit: '80 kW',
    pricePerMonth: 850,
    setupFee: 1200,
    location: 'Houston, Texas, USA',
    efficiency: '1.04 PUE',
    description: 'Industrial-grade water-cooling cabinet housing up to 12 heavy hydro miners. Features intelligent water flow controls, automatic leak detection, and heat recycling outlets.'
  },
  {
    id: 'immersion-tank-i8',
    name: 'Apexto Immersion Tank System I8',
    capacity: '8 Air-Cooled ASICs (Modified for Immersion)',
    cooling: 'Single-phase Dielectric Fluid Circulation',
    powerLimit: '35 kW',
    pricePerMonth: 600,
    setupFee: 950,
    location: 'Dubai, UAE',
    efficiency: '1.02 PUE',
    description: 'Advanced fluid-submersion system designed to operate air-cooled ASIC miners completely silently and at ultra-low chip temperatures, unlocking safe 15% overclocking margins.'
  }
];

export const BLOG_POSTS = [
  {
    id: 'btc-halving-2024-strategy',
    title: 'Post-Halving Survival Guide: Transitioning to Sub-20 J/T Hashing',
    summary: 'With BTC mining rewards halved, hardware efficiency is now a matter of survival. Learn why upgrading to S21 or M60S models makes financial sense.',
    date: '2026-05-15',
    readTime: '6 min read',
    category: 'Industry Insights'
  },
  {
    id: 'hydro-cooling-datacenter-upgrade',
    title: 'Why Hydro-Cooling is the Future of Enterprise Mining Farms',
    summary: 'Analyze the cooling efficiencies, reduction in noise complaints, and increased device lifespan of water-cooled containers versus traditional air setups.',
    date: '2026-05-28',
    readTime: '8 min read',
    category: 'Technical Guide'
  }
];
