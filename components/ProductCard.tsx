import { View, Text, useThemeColor } from "@/components/Themed";
import { Product } from "@/types";
import { useNumber } from "@/util";
import { formatNumber } from "@formatjs/intl";
import { StyleSheet, View as Container, Image } from "react-native";
import FA from '@expo/vector-icons/FontAwesome';

export default function ProductCard({ product }: { product: Product }) {

  return <View style={{ padding: 8, borderRadius: 4, marginHorizontal: 8, overflow: 'hidden' }}>
    <Container style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    }}>
      <Container style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 8,
      }}>
        <Container style={{ height: 96, aspectRatio: 1, borderRadius: 8, overflow: 'hidden' }}>
          <Image
            style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
            source={{ uri: product.thumbnail }}
          />
        </Container>
        <Container
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
            {product.title}
          </Text>
          <Text style={{ fontWeight: '200', fontStyle: "italic" }}>
            { product.brand }
          </Text>
          <Rating {...product}/>
          {/* <PriceLable {...product} /> */}
        </Container>
      </Container>
    </Container>
  </View>
}

function PriceLable({ price, discountPercentage }: { price: number, discountPercentage: number }) {
  return <Container style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }} >
    <Container style={{ flex: 1, flexDirection: 'row', alignContent: 'center' }}>
      <Text>

      </Text>
    </Container>
    <Text style={{ color: useThemeColor('invalidText'), textDecorationLine: 'line-through' }}>
      { useNumber(price, { currency: "USD", style: "currency" }) }
    </Text>
  </Container>
}

function Rating({ rating }: { rating: number }) {
  const stars: React.JSX.Element[] = [];
  const wholePart = Math.floor(rating);
  const decimalPart = rating - wholePart;
  const emptyPart = Math.floor(5 - rating);

  const color = useThemeColor('accent');

  for (const _ of Array(wholePart)) {
    stars.push(<FA name="star" color={color}/>)
  }

  if (decimalPart < 1/3) {
    stars.push(<FA name="star-o" color={color}/>)
  } else if (decimalPart < 2/3) {
    stars.push(<FA name="star-half-o" color={color}/>)
  } else {
    stars.push(<FA name="star" color={color}/>)
  }

  for (const _ of Array(emptyPart)) {
    stars.push(<FA name="star-o" color={color}/>)
  }

  return <Container
    style={{ flex: 1, flexDirection: 'row', gap: 2 }}
  >
    { stars }
  </Container>
}

