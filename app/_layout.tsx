import { AppContext, ThemeContext } from '@/constants/Context';
import { BOUGHT_STORAGE_KEY, DEFAULT_APP_CONTEXT_OBJ, DEFAULT_THEME_CONTEXT_OBJ, FAVORITES_STORAGE_KEY } from '@/constants/Default';
import { boughtSchema, favoritesSchema, productsSchema } from '@/constants/Schema';
import { AppData, Product, Data, ThemeType } from '@/types';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { getItem, setItem } from '@/util';
import { THEMES } from '@/constants/Themes';
import { useThemeColor } from '@/components/Themed';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [products, setProducts] = useState<Data<Product[]>>({ state: "loading" });
  const [favorites, setFavorites] = useState<Data<number[]>>({ state: "loading" });
  const [bought, setBought] = useState<Data<number[]>>({ state: "loading" });
  const [appData, setAppData] = useState<Data<AppData>>({ state: "loading" });

  const [fontLoaded, fontError] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeType>(colorScheme ?? 'dark');

  // Loading products
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then(response => response.json())
      .then(json => productsSchema.parse(json["products"]))
      .then(products => setProducts({ state: "completed", value: products }))
      .catch(e => setProducts({ state: 'error', errors: [e.toString()] }))
  }, [])

  // Loading favorites
  useEffect(() => {
    getItem(FAVORITES_STORAGE_KEY, favoritesSchema, [])
      .then(favs => setFavorites({ state: "completed", value: favs }))
      .catch(e => setFavorites({ state: 'error', errors: [e.toString()] }))
  }, []);

  // Loading Bought
  useEffect(() => {
    getItem(BOUGHT_STORAGE_KEY, boughtSchema, [])
      .then(favs => setBought({ state: "completed", value: favs }))
      .catch(e => setBought({ state: 'error', errors: [e.toString()] }))
  }, []);

  // Joining everyting into app data
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
      setAppData({
        state: "completed",
        value: {
          products: products.value,
          favorites: favorites.value,
          bought: bought.value,
        }
      });
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

  if (!fontLoaded || appData.state !== "completed") return null;

  return <AppContext.Provider
    value={{
      ...DEFAULT_APP_CONTEXT_OBJ,
      ...appData.value,
    }}
  >
    <ThemeContext.Provider
      value={{
        ...DEFAULT_THEME_CONTEXT_OBJ,
        type: theme,
        ...THEMES[theme],
      }}
    >
      <Stack initialRouteName="(tabs)">
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* <Stack.Screen name="modal" options={{ presentation: 'modal' }} /> */}
      </Stack>
    </ThemeContext.Provider>
  </AppContext.Provider>
}
