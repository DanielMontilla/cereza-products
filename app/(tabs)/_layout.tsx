import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as other from '@expo/vector-icons/'
import { Tabs } from 'expo-router';
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

  const tabBarActiveTintColor = useThemeColor('neutral');
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
        name="index"
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