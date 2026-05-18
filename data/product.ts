// 1. Definisikan Struktur Cetak Biru (Interface) Data Produk Sewaja
export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductOwner {
  id: number;
  name: string;
  role: string;
  avatar: string;
}

export interface Product {
  id: number;
  title: string;
  category: string;
  price: string;
  image: string;
  description: string;
  rating: number;
  reviewCount: number;
  location: string;
  owner: ProductOwner;
  specs: ProductSpec[];
}

// 2. Data Terpusat Berdasarkan Kode Program Kamu
export const products: Product[] = [
  {
    id: 1,
    title: "Sony Alpha a7 III",
    category: "Photography",
    price: "Rp750.000/hari",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop",
    description: "Professional mirrorless camera perfect for photography and videography projects.",
    rating: 4.9,
    reviewCount: 128,
    location: "Bandung",
    owner: {
      id: 1,
      name: "Rizky Pratama",
      role: "Trusted Owner",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    specs: [
      { label: "Camera Type", value: "Full Frame Mirrorless" },
      { label: "Resolution", value: "24.2 MP" },
      { label: "Video", value: "4K UHD Recording" },
      { label: "Included", value: "Extra Battery & Charger" }
    ]
  },
  {
    id: 2,
    title: "Makita Cordless Drill",
    category: "Tools",
    price: "Rp120.000/hari",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=1200&auto=format&fit=crop",
    description: "High-performance cordless drill suitable for home and construction work.",
    rating: 4.7, // Data dinamis tambahan agar halaman tidak statis
    reviewCount: 45,
    location: "Jakarta",
    owner: {
      id: 2,
      name: "Amanda Putri", // Disinkronkan dengan chat list kamu
      role: "Verified Renter",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    specs: [
      { label: "Power Source", value: "Cordless Battery" },
      { label: "Voltage", value: "18V" },
      { label: "Chuck Size", value: "10mm" },
      { label: "Included", value: "2x Battery, Charger, Drill Bits" }
    ]
  },
  {
    id: 3,
    title: "DJI Mavic Air 2",
    category: "Electronics",
    price: "Rp950.000/hari",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=1200&auto=format&fit=crop",
    description: "Compact drone with stunning aerial photography and video capabilities.",
    rating: 4.9,
    reviewCount: 89,
    location: "Sleman",
    owner: {
      id: 3,
      name: "Fajar Nugraha",
      role: "Pro Owner",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    specs: [
      { label: "Flight Time", value: "Up to 34 mins" },
      { label: "Video Resolution", value: "4K 60fps" },
      { label: "Transmission Range", value: "10 km" },
      { label: "Included", value: "Controller, 3x Battery, Bag" }
    ]
  },
  {
    id: 4,
    title: "Camping Tent",
    category: "Sports",
    price: "Rp180.000/hari",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1200&auto=format&fit=crop",
    description: "Comfortable camping tent suitable for outdoor adventures and hiking trips.",
    rating: 4.8,
    reviewCount: 62,
    location: "Bandung",
    owner: {
      id: 4,
      name: "Dina Aulia",
      role: "Outdoor Enthusiast",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    specs: [
      { label: "Capacity", value: "4-5 Persons" },
      { label: "Layer", value: "Double Layer Waterproof" },
      { label: "Material", value: "Polyester Flysheet" },
      { label: "Weight", value: "3.8 kg" }
    ]
  }
];

// Data Kategori Tetap Terpusat
export const categories = [
  "All",
  "Photography",
  "Tools",
  "Electronics",
  "Books",
  "Sports",
  "Fashion",
  "Vehicles",
  "Real Estate",
];