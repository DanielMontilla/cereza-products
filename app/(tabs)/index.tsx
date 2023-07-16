import { Spacer, View, Void } from "@/components/Themed";
import { useContext, useMemo, memo } from "react";
import ProductCard from "@/components/ProductCard";
import { FavoritesContext, ProductsContext } from "@/constants/Context";
import { View as Container, FlatList } from "react-native";

export default function Products() {
  const products = useContext(ProductsContext);

  return <Void save style={{ flex: 1, flexDirection: 'column' }}>
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductCard product={item} />}
      keyExtractor={({ id }, _) => `${id}`}
      ItemSeparatorComponent={() => <Spacer height={8} />}
    />
  </Void>
}