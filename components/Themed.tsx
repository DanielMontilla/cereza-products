/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { useTheme } from '@/stores';
import { Text as DefaultText, View as DefaultView } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export function Text(props: DefaultText['props']) {
  const { getColor } = useTheme();
  const color = getColor('text');
  const { style, ...rest } = props
  return <DefaultText style={[{ color }, style]} {...rest } />;
}

export function MonoText(props: DefaultText['props']) {
  return <Text {...props} style={[props.style, { fontFamily: 'SpaceMono' }]} />;
}

export function View(props: DefaultView['props']) {
  const { getColor } = useTheme();
  const backgroundColor = getColor('background');
  const { style, ...rest } = props
  return <DefaultView style={[{ backgroundColor }, style]} {...rest} />;
}

export function Void(props: DefaultView['props'] & { save?: boolean }) {
  const { getColor } = useTheme();
  const backgroundColor = getColor('void');
  const { style, save, ...rest } = props
  return <DefaultView style={[{ backgroundColor, flex: 1, paddingTop: save ? getStatusBarHeight() : 0 }, style]} {...rest} />;
}

export function Spacer({ height, width }: { height?: number, width?: number }) {
  return <DefaultView style={{ height, width, backgroundColor: "transparent" }} />
}
