import React, { createContext, useContext, useState } from "react";
import { products as initialProducts } from "../data/product"; 

export type ProductType = {
  id: string | number;         
  title: string;
  category: string;
  price: string;
  image: string;
  allImages?: string[];
  rating: string | number;     
  reviewCount: string | number;
  location: string;
  description: string;
  owner: {
    name: string;
    role: string;
    avatar: string;
  };
  isUploadedByUser?: boolean;  // 👈 DIPERBAIKI: Ditambahkan tanda '?' agar opsional sehingga data awal dari initialProducts tidak eror!
  specs: { label: string; value: string }[];
  rentalTerms?: string[];      // 👈 DIPERBAIKI: Ditambahkan tanda '?' agar opsional sehingga data awal dari initialProducts tidak eror!
  isMyProduct?: boolean;     
  daysRented?: number;       
};

type ProductContextType = {
  products: ProductType[];
  addProduct: (product: ProductType) => void;
  deleteProduct: (id: string | number) => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  // TypeScript sekarang aman menerima initialProducts karena rentalTerms sudah opsional
  const [products, setProducts] = useState<ProductType[]>(initialProducts as ProductType[]);

  const addProduct = (newProduct: ProductType) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const deleteProduct = (id: string | number) => {
    setProducts((prev) => prev.filter((p) => p.id.toString() !== id.toString()));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useProducts must be used within a ProductProvider");
  return context;
}