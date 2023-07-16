/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, View as DefaultView } from 'react-native';
import { useContext } from 'react';
import { ThemeData } from '@/types';
import { ThemeContext } from '@/constants/Context';
import { getStatusBarHeight } from 'react-native-status-bar-height';


export function useThemeColor(element: keyof ThemeData): string {
  const context = useContext(ThemeContext);
  return context[element];
}

export function Text(props: DefaultText['props']) {
  const color = useThemeColor('text');
  const { style, ...rest } = props
  return <DefaultText style={[{ color }, style]} {...rest } />;
}

export function MonoText(props: DefaultText['props']) {
  return <Text {...props} style={[props.style, { fontFamily: 'SpaceMono' }]} />;
}

export function View(props: DefaultView['props']) {
  const backgroundColor = useThemeColor('background');
  const { style, ...rest } = props
  return <DefaultView style={[{ backgroundColor }, style]} {...rest} />;
}

export function Void(props: DefaultView['props'] & { save?: boolean }) {
  const backgroundColor = useThemeColor('void');
  const { style, save, ...rest } = props
  return <DefaultView style={[{ backgroundColor, flex: 1, paddingTop: save ? getStatusBarHeight() : 0 }, style]} {...rest} />;
}

export function Spacer({ height, width }: { height?: number, width?: number }) {
  return <DefaultView style={{ height, width, backgroundColor: "transparent" }} />
}
