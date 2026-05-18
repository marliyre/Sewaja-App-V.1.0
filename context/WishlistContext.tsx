import { createContext, useContext, useState } from "react";

type ItemType = {
  id: number;
  title: string;
  category: string;
  price: string;
  image: string;
};

type WishlistContextType = {
  favorites: ItemType[];
  toggleFavorite: (item: ItemType) => void;
};

const WishlistContext = createContext<WishlistContextType>({
  favorites: [],
  toggleFavorite: () => {},
});

export function WishlistProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [favorites, setFavorites] = useState<ItemType[]>([]);

  const toggleFavorite = (item: ItemType) => {
    const exists = favorites.find((fav) => fav.id === item.id);

    if (exists) {
      setFavorites(
        favorites.filter((fav) => fav.id !== item.id)
      );
    } else {
      setFavorites([...favorites, item]);
    }
  };

  return (
    <WishlistContext.Provider
      value={{ favorites, toggleFavorite }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);