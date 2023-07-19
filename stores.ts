import { create } from 'zustand';
import { Product, ThemeData, ThemeType } from './types';
import { THEMES } from '@/constants/Themes';

export const useProducts = create<{
  products: Product[];
  setProducts: (products: Product[]) => void;
}>(
  (set) => ({
    products: [],
    setProducts: (products) => set(_ => ({ products }))
  })
);
export const useTheme = create<{
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  getColor: (element: keyof ThemeData) => string;
}>(
  (set, get) => ({
    theme: 'light',
    setTheme: (theme) => set(_ => ({ theme })),
    getColor: (element) => THEMES[get().theme][element],
  })
);
export const useFavorites = create<{
  favorites: Set<number>;
  setFavorites: (favorites: Set<number>) => void;
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
}>(
  (set, get) => ({
    favorites: new Set(),
    setFavorites: (favorites) => set(_ => ({ favorites })),
    addFavorite: (id) => set(({ favorites }) => ({ favorites: new Set(favorites.add(id)) })),
    removeFavorite: (id) => set(({ favorites }) => {
      favorites.delete(id);
      return { favorites: new Set(favorites) };
    }),
  }),
);
export const useBought = create<{
  bought: Set<number>;
  setBought: (favorites: Set<number>) => void;
  addBought: (id: number) => void;
  removeBought: (id: number) => void;
}>(
  (set, get) => ({
    bought: new Set(),
    setBought: (bought) => set(_ => ({ bought })),
    addBought: (id) => set(({ bought }) => ({ bought: new Set(bought.add(id)) })),
    removeBought: (id) => set(({ bought }) => {
      bought.delete(id);
      return { bought: new Set(bought) };
    }),
  }),
);

