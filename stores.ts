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
  // toggleFavorite: (id: number) => void;
}>(
  (set, get) => ({
    favorites: new Set(),
    setFavorites: (favorites) => set(_ => ({ favorites })),
    addFavorite: (id) => set(({ favorites }) => ({ favorites: new Set(favorites.add(id)) })),
    removeFavorite: (id) => set(({ favorites }) => {
      favorites.delete(id);
      return { favorites: new Set(favorites) };
    }),
    // toggleFavorite: (id) => get().favorites.has(id) ? get().removeFavorite(id) : get().addFavorite(id)
  }),
);