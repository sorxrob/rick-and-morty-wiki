import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';

import LocationsScreen from './LocationsScreen';
import CharactersScreen from './CharactersScreen';
import EpisodesScreen from './EpisodesScreen';

const Tab = createMaterialBottomTabNavigator();

const ICON_SIZE = 26;

const HomeTabs = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Characters"
        component={CharactersScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-group-outline"
              color={color}
              size={ICON_SIZE}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Episodes"
        component={EpisodesScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="television-classic"
              color={color}
              size={ICON_SIZE}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Locations"
        component={LocationsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="map-marker"
              color={color}
              size={ICON_SIZE}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabs;
