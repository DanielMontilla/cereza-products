import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as other from '@expo/vector-icons/'
import { Tabs, usePathname } from 'expo-router';
import { useThemeColor } from '@/components/Themed';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -8 }} {...props} />;
}

export default function TabLayout() {

  const tabBarActiveTintColor = useThemeColor('accent');
  const tabBackgroundColor = useThemeColor('background');

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor,
        tabBarStyle: {
          backgroundColor: tabBackgroundColor,
        },
      }}
      initialRouteName="products"
    >
      <Tabs.Screen
        name="products"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="shopping-cart" color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="star" color={color} />,
        }}
      />
    </Tabs>
  );
}

// function MyTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
//   const backgroundColor = useThemeColor('background');

//   return (
//     <View style={{ flexDirection: 'row', backgroundColor }}>
//       {state.routes.map((route, index) => {
//         const { options } = descriptors[route.key];
//         const label =
//           options.tabBarLabel !== undefined
//             ? options.tabBarLabel
//             : options.title !== undefined
//             ? options.title
//             : route.name;

//         const isFocused = state.index === index;

//         const onPress = () => {
//           const event = navigation.emit({
//             type: 'tabPress',
//             target: route.key,
//             canPreventDefault: true,
//           });

//           if (!isFocused && !event.defaultPrevented) {
//             // The `merge: true` option makes sure that the params inside the tab screen are preserved
//             navigation.navigate({ name: route.name, merge: true });
//           }
//         };

//         const onLongPress = () => {
//           navigation.emit({
//             type: 'tabLongPress',
//             target: route.key,
//           });
//         };

//         return (
//           <TouchableOpacity
//             accessibilityRole="button"
//             accessibilityState={isFocused ? { selected: true } : {}}
//             accessibilityLabel={options.tabBarAccessibilityLabel}
//             testID={options.tabBarTestID}
//             onPress={onPress}
//             onLongPress={onLongPress}
//             style={{ flex: 1 }}
//           >
//             <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
//               {label}
//             </Text>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// }