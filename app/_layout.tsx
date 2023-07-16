import {  BoughtContext, FavoritesContext, ProductsContext, ThemeContext, TransformersContext } from '@/constants/Context';
import { BOUGHT_STORAGE_KEY, DEFAULT_THEME_CONTEXT_OBJ, DEFAULT_TRANSFORMER_CONTEXT_OBJ, FAVORITES_STORAGE_KEY } from '@/constants/Default';
import { boughtSchema, favoritesSchema, productsSchema } from '@/constants/Schema';
import { Product, Data, ThemeType, Transformers } from '@/types';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { getItem, setItem } from '@/util';
import { THEMES } from '@/constants/Themes';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [products, setProducts] = useState<Data<Product[]>>({ state: "loading" });
  const [favorites, setFavorites] = useState<Data<Set<number>>>({ state: "loading" });
  const [bought, setBought] = useState<Data<Set<number>>>({ state: "loading" });
  const [appData, setAppData] = useState<Data>({ state: "loading" });

  const [fontLoaded, fontError] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeType>(colorScheme ?? 'dark');

  // Loading `Products`
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then(response => response.json())
      .then(json => productsSchema.parse(json["products"]))
      .then(products => setProducts({ state: "completed", value: products }))
      .catch(e => setProducts({ state: 'error', errors: [e.toString()] }))
  }, [])

  // Loading `Favorites`
  useEffect(() => {
    getItem(FAVORITES_STORAGE_KEY, favoritesSchema, [])
      .then(favs => setFavorites({ state: "completed", value: new Set(favs) }))
      .catch(e => setFavorites({ state: 'error', errors: [e.toString()] }))
  }, []);

  // Loading `Bought`
  useEffect(() => {
    getItem(BOUGHT_STORAGE_KEY, boughtSchema, [])
      .then(favs => setBought({ state: "completed", value: new Set(favs) }))
      .catch(e => setBought({ state: 'error', errors: [e.toString()] }))
  }, []);

  useEffect(() => {
    const errors: string[] = [];

    if (products.state === "error") errors.push(...products.errors);
    if (favorites.state === "error") errors.push(...favorites.errors);
    if (bought.state === "error") errors.push(...bought.errors);

    if (errors.length > 0) {
      setAppData({ state: "error", errors })
      return;
    }
    if (
      products.state === "completed" &&
      favorites.state === "completed" &&
      bought.state === "completed"
    ) {
      setAppData({ state: "completed", value: undefined });
    }
  }, [products, favorites, bought]);

  useEffect(() => {
    if (fontError) throw fontError;
    if (appData.state === "error") throw Error(appData.errors.join(" "));
  }, [fontError, appData]);

  useEffect(() => {
    if (!fontLoaded || appData.state !== "completed") return;
    SplashScreen.hideAsync();
  }, [fontLoaded, appData]);

  const uploadFavorites = () => setItem(FAVORITES_STORAGE_KEY, favorites.state === 'completed' ? favorites.value : []);
  const uploadBought = () => setItem(BOUGHT_STORAGE_KEY, bought.state === 'completed' ? bought.value : []);

  const transformers: Transformers = {
    addFavorite(id: number) {
      setFavorites(f => {
        if (f.state !== 'completed') return f;
        f.value.add(id);
        return { state: 'completed', value: f.value };
      });
      uploadFavorites();
    },
    removeFavorite(id: number) {
      setFavorites(f => {
        if (f.state !== 'completed') return f;
        f.value.delete(id);
        return { state: 'completed', value: f.value };
      });
      uploadFavorites();
    },
    addBought(id: number) {
      setBought(b => {
        if (b.state !== 'completed') return b;
        b.value.add(id);
        return b;
      });
      uploadBought();
    },
    removeBought(id: number) {
      setBought(b => {
        if (b.state !== 'completed') return b;
        b.value.delete(id);
        return b;
      });
      uploadBought();
    },
    clear() {
      setBought(b => {
        if (b.state !== 'completed') return b;
        b.value.clear();
        return b;
      });
      setFavorites(f => {
        if (f.state !== 'completed') return f;
        f.value.clear();
        return f;
      });
      uploadFavorites();
      uploadBought();
    }
  }

  if (
    !fontLoaded ||
    appData.state !== "completed" ||
    products.state !== "completed" ||
    favorites.state !== "completed" ||
    bought.state !== "completed"

  ) return null;

  return <ThemeContext.Provider value={{...DEFAULT_THEME_CONTEXT_OBJ, type: theme, ...THEMES[theme] }}>
    <TransformersContext.Provider value={transformers}>
      <ProductsContext.Provider value={products.value}>
        <FavoritesContext.Provider value={favorites.value}>
          <BoughtContext.Provider value={bought.value}>
            <Stack initialRouteName="(tabs)">
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="product/[id]" options={{ headerShown: false }} />
              {/* <Stack.Screen name="modal" options={{ presentation: 'modal' }} /> */}
            </Stack>
          </BoughtContext.Provider>
        </FavoritesContext.Provider>
      </ProductsContext.Provider>
    </TransformersContext.Provider> 
  </ThemeContext.Provider>
}