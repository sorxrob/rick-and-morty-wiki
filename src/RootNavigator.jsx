import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Appbar, Colors } from 'react-native-paper';

// Screens
import HomeTabs from './screens/HomeTabs';
import CharacterScreen from './screens/CharacterScreen';
import EpisodeScreen from './screens/EpisodeScreen';
import LocationScreen from './screens/LocationScreen';

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeTabs}
        options={({ route }) => ({
          headerTitle: getFocusedRouteNameFromRoute(route) || 'Characters',
        })}
      />
      <Stack.Screen
        name="Character"
        component={CharacterScreen}
        options={{
          headerTransparent: true,
          headerBackTitleVisible: false,
          headerTitle: false,
          headerBackImage: () => <Appbar.BackAction color={Colors.white} />,
        }}
      />
      <Stack.Screen
        name="Episode"
        component={EpisodeScreen}
        options={{
          headerBackTitleVisible: false,
          headerBackImage: () => <Appbar.BackAction color={Colors.white} />,
        }}
      />
      <Stack.Screen
        name="Location"
        component={LocationScreen}
        options={{
          headerBackTitleVisible: false,
          headerBackImage: () => <Appbar.BackAction color={Colors.white} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
