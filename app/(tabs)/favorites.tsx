import { Spacer, View, Void } from "@/components/Themed";
import { useContext, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { FavoritesContext, ProductsContext } from "@/constants/Context";
import { View as Container, FlatList } from "react-native";

export default function FavoriteProducts() {
  const products = useContext(ProductsContext);
  const favorites = useContext(FavoritesContext);

  useEffect(() => {
    console.log("Changed favs")
  }, [favorites])

  return <Void save style={{ flex: 1, flexDirection: 'column' }}>
    {/* <FlatList
      data={ products.filter(({ id }) => favorites.has(id) )}
      renderItem={({ item }) => <ProductCard product={item} />}
      keyExtractor={({ id }, _) => `${id}`}
      ItemSeparatorComponent={() => <Spacer height={8} />}
    /> */}
  </Void>
}