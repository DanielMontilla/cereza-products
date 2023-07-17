import { View, Text, MonoText, Spacer } from "@/components/Themed";
import { Product } from "@/types";
import { splitPrice } from "@/util";
import { View as Container, Image, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import FA from '@expo/vector-icons/FontAwesome';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFavorites, useTheme } from "@/stores";
import { router } from "expo-router";

export default function ProductCard({ product }: { product: Product }) {
  const { id } = product;
  const { getColor } = useTheme();
  const addFavorite = useFavorites(state => state.addFavorite);
  const removeFavorite = useFavorites(state => state.removeFavorite);
  const favorites = useFavorites(state => state.favorites);

  const [favorite, setFavorite] = useState<boolean>(useFavorites.getState().favorites.has(id));

  useEffect(() => {
    if (favorites.has(id) === favorite) return;
    console.log(`ran @ ${id}`)
    setFavorite(favorites.has(id))
  }, [favorites])

  const toggleFavorite = () => {
    favorite
      ? removeFavorite(id)
      : addFavorite(id);
  }

  return <TouchableOpacity
    onPress={ () => router.push({ pathname: `product/[${id}]`, params: { id } }) }
    activeOpacity={0.8}
  >
    <View style={{ position: 'relative', padding: 8, borderRadius: 4, marginHorizontal: 8, overflow: 'hidden' }}>
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
          <Container style={{ height: 132, aspectRatio: 3/4, borderRadius: 8, overflow: 'hidden' }}>
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
            <Text
              adjustsFontSizeToFit={true}
              numberOfLines={2}
              style={{ fontWeight: 'bold', fontSize: 16 }}
            >
              { product.title }
            </Text>
            <Text style={{ fontSize: 12, fontWeight: '200', fontStyle: "italic"}}>
              { product.brand }
            </Text>
            <Spacer height={2}/>
            <Rating {...product} />
            <Price {...product} />
          </Container>
        </Container>
      </Container>
      <Container style={{ position: 'absolute', bottom: 0, right: 0, margin: 12, zIndex: 1 }}>
        <TouchableWithoutFeedback
          delayPressIn={0}
          onPress={ toggleFavorite }
        >
          <Container style={{ padding: 6 }}>
            <FA size={26} name={ favorite ? "heart" : "heart-o" } color={getColor('neutral')}/>
          </Container>
        </TouchableWithoutFeedback>
      </Container>
    </View>
  </TouchableOpacity>
}

function Price({ price, discountPercentage, stock }: { price: number, discountPercentage: number, stock: number }) {
  const { getColor } = useTheme();
  const finalPrice = price * (1 - (discountPercentage / 100));
  const { dollars, cents } = splitPrice(finalPrice);
  const mt = 2;
  const mb = 3;

  return <Container style={{ display: 'flex', flexDirection: 'column' }} >
      <Container style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'flex-start', gap: 0 }}>
        <MonoText style={{ lineHeight: 0, fontSize: 16, marginTop: -2 }}>$</MonoText>
        <Text style={{ lineHeight: 0, fontSize: 24, fontWeight: '700' }}>{dollars}</Text>
        <MonoText style={{ lineHeight: 0, fontSize: 10, marginTop: 1 }}>{cents}</MonoText>
        {
          stock <= 10
            ? <>
                <Spacer width={6}/>
                <Container style={{ display: 'flex', gap: 3, flexDirection: 'row',  backgroundColor: getColor('bad'), alignSelf: 'flex-start', marginTop: mt + 1, paddingVertical: 1, paddingHorizontal: 2, borderRadius: 4 }}>
                  <Text style={{ lineHeight: 0, fontSize: 10 }}>only</Text>
                  <Text style={{ lineHeight: 0, fontSize: 10, fontWeight: '900' }}>{stock}</Text>
                  <Text style={{ lineHeight: 0, fontSize: 10 }}>left!</Text>
                </Container>
              </>
            : <></>
        }
      </Container>
      <Container style={{ marginTop: -6, marginLeft: 2, display: 'flex', flexDirection: 'row' }} >
        <Text style={{ color: getColor('invalidText'), textDecorationLine: 'line-through', fontSize: 14, alignSelf: 'flex-end', marginBottom: mb }}>
          { price.toFixed(2) }
        </Text>
        <Spacer width={3}/>
        <Container style={{ display: 'flex', flexDirection: 'row',  backgroundColor: getColor('good'), alignSelf: 'flex-end', marginBottom: mb, paddingVertical: 1, paddingHorizontal: 2, borderRadius: 4 }}>
          <Text style={{ lineHeight: 0, fontSize: 10, alignSelf: 'flex-end' }}>-%</Text>
          <Spacer width={1}/>
          <Text style={{ lineHeight: 0, fontSize: 10, fontWeight: '700' }}>{Math.round(discountPercentage).toFixed(0)}</Text>
        </Container>
      </Container>
  </Container>
}

function Rating({ rating }: { rating: number }) {
  const { getColor } = useTheme();
  const stars: ('star' | 'star-o' | 'star-half-o')[] = [];
  const wholePart = Math.floor(rating);
  const decimalPart = rating - wholePart;
  const emptyPart = Math.floor(5 - rating);

  const color = getColor('neutral');

  for (const _ of Array(wholePart)) {
    stars.push('star')
  }

  if (decimalPart < 1/3) {
    stars.push("star-o")
  } else if (decimalPart < 2/3) {
    stars.push("star-half-o")
  } else {
    stars.push("star")
  }

  for (const _ of Array(emptyPart)) {
    stars.push("star-o")
  }

  return (
    <Container style={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
      { stars.map((s, i) => <FA name={s} color={color} key={i} />) }
    </Container>
  )
}

