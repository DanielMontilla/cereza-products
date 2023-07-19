import { BOUGHT_STORAGE_KEY, FAVORITES_STORAGE_KEY, THEME_STORAGE_KEY } from '@/constants/Default';
import { boughtSchema, favoritesSchema, productsSchema, themeSchema } from '@/constants/Schema';
import { State } from '@/types';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { useBought, useFavorites, useProducts, useTheme } from '@/stores';
import { getItem, setItem } from '@/storage';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [productsState, setProductsState] = useState<State>({ state: 'loading' });
  const [favoritesState, setFavoritesState] = useState<State>({ state: 'loading' });
  const [boughtState, setBoughtState] = useState<State>({ state: 'loading' });
  const [themeState, setThemeState] = useState<State>({ state: 'loading' });
  const [appState, setAppState] = useState<State>({ state: 'loading' });

  const setProducts = useProducts(state => state.setProducts);
  const setFavorites = useFavorites(state => state.setFavorites);
  const setBought = useBought(state => state.setBought);
  const setTheme = useTheme(state => state.setTheme);

  const [fontLoaded, fontError] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Loading `Products`
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then(response => response.json())
      .then(json => productsSchema.parse(json["products"]))
      .then(products => setProducts(products))
      .then(_ => setProductsState({ state: 'completed' }))
      .catch(e => setProductsState({ state: 'error', errors: [e.toString()] }))
  }, []);

  // Loading `Favorites`
  useEffect(() => {
    let unsub: ReturnType<typeof useFavorites.subscribe> | null = null;

    getItem(FAVORITES_STORAGE_KEY, favoritesSchema, [])
      .then(favArr => setFavorites(new Set(favArr)))
      .then(_ => setFavoritesState({ state: "completed" }))
      .then(_ => unsub = useFavorites.subscribe(({ favorites }) => {
        setItem(FAVORITES_STORAGE_KEY, [...favorites]);
      }))
      .catch(e => setFavoritesState({ state: 'error', errors: [e.toString()] }))

      return () => {
        if (unsub) unsub();
      }
  }, []);

  // Loading `Bought`
  useEffect(() => {
    let unsub: ReturnType<typeof useBought.subscribe> | null = null;

    getItem(FAVORITES_STORAGE_KEY, boughtSchema, [])
      .then(boughtArr => setBought(new Set(boughtArr)))
      .then(_ => setBoughtState({ state: "completed" }))
      .then(_ => unsub = useBought.subscribe(({ bought }) => {
        setItem(BOUGHT_STORAGE_KEY, [...bought]);
      }))
      .catch(e => setFavoritesState({ state: 'error', errors: [e.toString()] }))

      return () => {
        if (unsub) unsub();
      }
  }, []);

  // Loading `Theme`
  useEffect(() => {
    let unsub: ReturnType<typeof useTheme.subscribe> | null = null;

    getItem(THEME_STORAGE_KEY, themeSchema, 'dark')
    .then(theme => setTheme(theme ?? 'dark'))
    .then(_ => setThemeState({ state: "completed" }))
    .then(_ => unsub = useTheme.subscribe(({ theme }) => {
      setItem(THEME_STORAGE_KEY, theme);
    }))
    .catch(e => setThemeState({ state: 'error', errors: [e.toString()] }))
  }, [])

  useEffect(() => {
    const errors: string[] = [];

    if (productsState.state === "error") errors.push(...productsState.errors);
    if (favoritesState.state === "error") errors.push(...favoritesState.errors);
    if (boughtState.state === "error") errors.push(...boughtState.errors);
    if (themeState.state === "error") errors.push(...themeState.errors);

    if (errors.length > 0) {
      setAppState({ state: "error", errors })
      return;
    }
    if (
      productsState.state === "completed" &&
      favoritesState.state === "completed" &&
      boughtState.state === "completed" &&
      themeState.state === "completed"
    ) {
      setAppState({ state: "completed" });
    }
  }, [productsState, favoritesState, boughtState, themeState]);

  // Finally show screen when font is loaded and all state is loaded
  useEffect(() => {
    if (!fontLoaded || appState.state !== "completed") return;
    SplashScreen.hideAsync();
  }, [fontLoaded, appState]);

  // if error show
  useEffect(() => {
    if (fontError) throw fontError;
    if (appState.state === "error") throw Error(appState.errors.join(" "));
  }, [fontError, appState]);

  if (!fontLoaded || appState.state !== 'completed') return null; // only render when everything is loaded

  return <Stack initialRouteName="/">
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    <Stack.Screen name="product/[id]" options={{ headerShown: false }} />
  </Stack>
}