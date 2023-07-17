import { BOUGHT_STORAGE_KEY, FAVORITES_STORAGE_KEY, THEME_STORAGE_KEY } from '@/constants/Default';
import { boughtSchema, favoritesSchema, productsSchema, themeSchema } from '@/constants/Schema';
import { State } from '@/types';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { useFavorites, useProducts, useTheme } from '@/stores';
import { getItem } from '@/storage';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [productsState, setProductsState] = useState<State>({ state: 'loading' });
  const [favoritesState, setFavoritesState] = useState<State>({ state: 'loading' });
  const [themeState, setThemeState] = useState<State>({ state: 'loading' });
  const [appState, setAppState] = useState<State>({ state: 'loading' });

  const setProducts = useProducts(state => state.setProducts);
  const setFavorites = useFavorites(state => state.setFavorites);
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
    getItem(FAVORITES_STORAGE_KEY, favoritesSchema, [])
      .then(favArr => {
        console.log(favArr);
        setFavorites(new Set(favArr));
      })
      .then(_ => setFavoritesState({ state: "completed" }))
      .catch(e => setFavoritesState({ state: 'error', errors: [e.toString()] }))
  }, []);

  // Loading `Theme`
  useEffect(() => {
    getItem(THEME_STORAGE_KEY, themeSchema, 'dark')
    .then(theme => setTheme(theme ?? 'dark'))
    .then(_ => setThemeState({ state: "completed" }))
    .catch(e => setThemeState({ state: 'error', errors: [e.toString()] }))
  }, [])

  useEffect(() => {
    const errors: string[] = [];

    if (productsState.state === "error") errors.push(...productsState.errors);
    if (favoritesState.state === "error") errors.push(...favoritesState.errors);
    if (themeState.state === "error") errors.push(...themeState.errors);

    if (errors.length > 0) {
      setAppState({ state: "error", errors })
      return;
    }
    if (
      productsState.state === "completed" &&
      favoritesState.state === "completed" &&
      themeState.state === "completed"
    ) {
      setAppState({ state: "completed" });
    }
  }, [productsState, favoritesState, themeState]);

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

  return <Stack initialRouteName="(tabs)">
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    <Stack.Screen name="product/[id]" options={{ headerShown: false }} />
  </Stack>
}