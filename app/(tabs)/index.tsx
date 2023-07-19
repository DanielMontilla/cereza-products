import { Spacer, Void } from "@/components/Themed";
import ProductCard from "@/components/ProductCard";
import { FlatList } from "react-native";
import { useProducts } from "@/stores";
import { usePathname } from 'expo-router';

export default function Products() {
  const products = useProducts(state => state.products);

  return <Void save style={{ flex: 1, flexDirection: 'column' }}>
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductCard product={item} />}
      keyExtractor={({ id }, _) => `${id}`}
      ItemSeparatorComponent={() => <Spacer height={8} />}
      windowSize={10}
    />
  </Void>
}