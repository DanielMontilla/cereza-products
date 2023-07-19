import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as other from '@expo/vector-icons/'
import { Tabs } from 'expo-router';
import { useTheme } from '@/stores';

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

  const { getColor } = useTheme();

  const tabBarActiveTintColor = getColor('neutral');
  const tabBackgroundColor = getColor('background');

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor,
        tabBarStyle: {
          backgroundColor: tabBackgroundColor,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "products",
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
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="gear" color={color} />,
        }}
      />
    </Tabs>
  );
}