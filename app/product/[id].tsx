import { Void, Text, View, ScrollView, MonoText, Spacer } from '@/components/Themed';
import { productSearchParamsSchema } from '@/constants/Schema';
import { useBought, useFavorites, useProducts, useTheme } from '@/stores';
import { Redirect, useLocalSearchParams,  } from 'expo-router';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Dimensions, Image, View as Container, TouchableOpacity } from 'react-native';
import { useRef, useState } from 'react';
import { splitPrice } from '@/util';
import RatingTag from '@/components/RatingTag';

export default function Page() {
  const result = productSearchParamsSchema.safeParse(useLocalSearchParams());
  if (!result.success)  return <Redirect href="/"/>
  const index = Number.parseInt(result.data.id) - 1;
  if (Number.isNaN(index) || index < 0 || index > 30) return <Redirect href="/"/>
  const product = useProducts(state => state.products[index]);
  const { title, description, images, rating, brand, id } = product;

  const { bought, addBought, removeBought } = useBought.getState();
  const { favorites, addFavorite, removeFavorite } = useFavorites.getState();

  const isBought = bought.has(id);
  const isFavorite = favorites.has(id);
  
  const onBoughtPressed = (added: boolean) => {
    added
      ? addBought(id)
      : removeBought(id)
  }

  const onFavoritePressed = (added: boolean) => {
    added
      ? addFavorite(id)
      : removeFavorite(id)
  }

  const px = 8;

  return <ScrollView save contentContainerStyle={{ paddingBottom: 96 }}>
    <Container style={{ paddingHorizontal: px, display: 'flex', flexDirection: 'column' }}>
      <Text
        adjustsFontSizeToFit={true}
        numberOfLines={2}
        style={{ fontSize: 38, fontWeight: '700' }}
      >
        { title }
      </Text>
      <Container style={{ display: 'flex', flexDirection: 'row', gap: 6, marginTop: 0 }}>
        <Text style={{ fontWeight: '600' }}>
          Seller
        </Text>
        <Text style={{ fontWeight: '300', fontStyle: 'italic' }}>
          {brand}
        </Text>
      </Container>
    </Container>
    <Spacer height={6}/>
    <Container style={{ display: 'flex', width: '100%', flexDirection: 'column', paddingHorizontal: px }}>
      <Container style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
        <RatingTag size={16} gap={4} {...product} />
        <Text> ({ rating.toFixed(1) }) </Text>
      </Container>
      <PriceTag  {...product} />
    </Container>
    <Spacer height={8}/>
    <Container style={{ paddingHorizontal: px, flex: 1, flexDirection: 'row', width: '100%', justifyContent: 'space-around'}}>
      <ToggleButton onText="Cancel Order" offText="Place Order" initialToggle={isBought} onPressed={onBoughtPressed} />
      <ToggleButton onText="Unfavorite" offText="Favorite" initialToggle={isFavorite} onPressed={onFavoritePressed} />
    </Container>
    <Spacer height={16}/>
    <ImagesArea images={images} />
    <Container style={{ paddingHorizontal: 8 }}>
      <Text style={{ fontSize: 24, fontWeight: '700', marginLeft: -6 }}> Description: </Text>
      <Text>{ description }</Text>
    </Container>
  </ScrollView>
}

function ToggleButton(
  { onText, offText, initialToggle, onPressed }: { onText: string, offText: string, initialToggle: boolean, onPressed: (added: boolean) => any }
) {
  const { getColor } = useTheme();

  const [toggled, setToggled] = useState(initialToggle);
  const [canPress, setCanPress] = useState(true);

  const onPress = () => {
    if (!canPress) return;
    setCanPress(false);

    const newToggled = !toggled;
    setToggled(newToggled);

    onPressed(newToggled)
    
    setCanPress(true);
  }

  return <TouchableOpacity activeOpacity={0.1} onPress={onPress}>
    <Container
      style={{
        backgroundColor: toggled ? getColor('bad') : getColor('good'),
        paddingHorizontal: 6,
        paddingVertical: 3,
        width: 128,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        minHeight: 48,
      }}
    >
      <Text
        style={{ color: getColor('void'), fontWeight: 'bold', fontSize: 64 }}
        adjustsFontSizeToFit={true}
        numberOfLines={1}
      >
        {toggled ? onText : offText}
      </Text>
    </Container>
  </TouchableOpacity>
}

function ImagesArea({ images }: { images: string[] }) {
  const [imgIndex, setImgIndex] = useState(0);
  const imageSize = Dimensions.get('screen').width;
  const { getColor } = useTheme();

  return <View style={{
      backgroundColor: 'transparent',
      height: imageSize + 24,
      width: imageSize
    }}>
    <Carousel
      style={{ height: imageSize }}
      layout='default'
      data={images}
      renderItem={
        ({ item: uri }) => (
          <View style={{ width: imageSize, height: imageSize }}>
            <Image
              style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
              source={{ uri }}
            />
          </View>
        )
      }
      onSnapToItem={(index) => setImgIndex(index)}
      sliderWidth={imageSize}
      itemWidth={imageSize}
      itemHeight={imageSize}
      sliderHeight={imageSize}
    />
    <Container style={{ position: 'absolute', bottom: 0, right: 0, left: 0 }}>
      <Pagination
        dotsLength={images.length}
        activeDotIndex={imgIndex}
        dotStyle={{ backgroundColor: getColor('neutral') }}
        containerStyle={{ padding: 0, marginBottom: -24}}
      />
    </Container>
  </View>
}

function PriceTag({ price, discountPercentage }: { price: number, discountPercentage: number }) {

  const finalPrice = price * (1 - (discountPercentage / 100));
  const { dollars, cents } = splitPrice(finalPrice);
  const { getColor } = useTheme();

  const fs = 48;
  const ts = 16;

  return <Container style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', marginTop: -6 }}>
    <Container style={{ display: 'flex', flexDirection: 'column' }}>
      <Container style={{ display: 'flex', flexDirection: 'row' }}>
        <MonoText style={{ lineHeight: 0, fontSize: 28, marginTop: 2 }}>$</MonoText>
        <Text style={{ lineHeight: 0, fontSize: fs, fontWeight: '700' }}>{dollars}</Text>
        <MonoText style={{ lineHeight: 0, fontSize: 24, marginTop: 4 }}>{cents}</MonoText>
      </Container>
      <Container style={{ alignSelf: 'flex-start', display: 'flex', flexDirection: 'row', gap: 6, marginTop: -10 }}>
        <Text style={{ color: getColor('invalidText'), fontSize: ts }}>
          List price: 
        </Text>
        <Text style={{ color: getColor('invalidText'), textDecorationLine: 'line-through', fontSize: ts }}>
          ${ price.toFixed(2) }
        </Text>
        <Text style={{ color: getColor('good'), fontSize: ts, alignSelf: 'flex-end', marginBottom: 6, fontStyle: 'italic' }}>
          -{Math.round(discountPercentage)}%
        </Text>
      </Container>
    </Container>
  </Container>
  
}