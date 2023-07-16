import { create } from 'zustand';
import { Product } from './types';

const useProducts = create<Product[]>(() => []);
const useFavorites = create<Set<number>>(() => new Set());
const useBought = create<Set<number>>(() => new Set());