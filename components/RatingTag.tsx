import { useTheme } from "@/stores";
import { View as Container } from "react-native";
import FA from '@expo/vector-icons/FontAwesome';

export default function RatingTag(
  { rating, size, gap }: { rating: number, size?: number, gap?: number }
) {
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
  } else if (decimalPart < 0.99) {
    stars.push("star-half-o")
  } else {
    stars.push("star")
  }

  for (const _ of Array(emptyPart)) {
    stars.push("star-o")
  }

  return (
    <Container style={{ display: 'flex', flexDirection: 'row', gap: gap ?? 2 }}>
      { stars.map((s, i) => <FA size={size} name={s} color={color} key={i} />) }
    </Container>
  )
}