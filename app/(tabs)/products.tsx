import { Spacer, View, Void } from "@/components/Themed";
import { useContext } from "react";
import ProductCard from "@/components/ProductCard";
import { AppContext } from "@/constants/Context";
import { SwipeListView } from 'react-native-swipe-list-view';
import { getStatusBarHeight } from "react-native-status-bar-height";

export default function Products() {
  const { products } = useContext(AppContext);

  return <Void style={{ paddingTop: getStatusBarHeight() }}>
    <SwipeListView
      data={products}
      renderItem={({ item }) => <ProductCard product={item}/>}
      keyExtractor={({ id }, _) => `${id}`}
      renderHiddenItem={ ({item}) => <View/> }
      closeOnRowBeginSwipe={true}
      ItemSeparatorComponent={() => <Spacer height={8} />}
    />
  </Void>
}