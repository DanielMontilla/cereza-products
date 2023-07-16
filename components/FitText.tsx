import { Text as DefaultText, View as DefaultView } from 'react-native';
import { Text } from '@/components/Themed';
import { useState } from "react";

export default function FitText({
  fontSize, numberOfLines, text, ...props
}: DefaultText['props'] & { fontSize: number, numberOfLines: number, text: string }) {
  const { style, ...rest } = props;

  const [currentFont, setCurrentFont] = useState(fontSize);

  return (
    <Text
      numberOfLines={ numberOfLines }
      adjustsFontSizeToFit
      style={ [style, { fontSize: currentFont }] }
      onTextLayout={(e) => {
        const { lines } = e.nativeEvent;
        if (lines.length > numberOfLines) {
          setCurrentFont(currentFont - 1);
        }
      }}
      { ...rest }
    >
      { text }
    </Text>
  );
};