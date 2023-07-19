import { Spacer, Void } from "@/components/Themed";
import { useCallback, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { FlatList } from "react-native";
import { useFocusEffect } from "expo-router";
import { useFavorites, useProducts } from "@/stores";

export default function FavoriteProducts() {
  const products = useProducts(state => state.products);
  const [favorites, setFavorites] = useState<Set<number>>(new Set())

  useFocusEffect(
    useCallback(() => {
      setFavorites(useFavorites.getState().favorites);
    }, [])
  )

  return <Void save style={{ flex: 1, flexDirection: 'column' }}>
    <FlatList
      data={products.filter(({ id }) => favorites.has(id) )}
      renderItem={({ item }) => <ProductCard product={item} />}
      keyExtractor={({ id }, _) => `${id}`}
      ItemSeparatorComponent={() => <Spacer height={8} />}
    />
  </Void>
}