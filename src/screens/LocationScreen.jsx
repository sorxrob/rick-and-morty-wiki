import React from 'react';
import { View, ScrollView } from 'react-native';
import { useQuery } from 'react-query';
import {
  List,
  Divider,
  Avatar,
  Title,
  ActivityIndicator,
  Text,
} from 'react-native-paper';

import { getCharacter } from '../api';
import { extractIds } from '../utils';

const LocationScreen = ({ navigation, route }) => {
  const { location } = route.params;
  const residentIds = extractIds(location.residents);

  const { isLoading, data } = useQuery(
    ['location_residents', residentIds],
    getCharacter
  );

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" animating={true} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ alignItems: 'center', paddingTop: 20 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 30 }}>
            {location.name}
          </Text>
          <Text style={{ fontSize: 20 }}>
            {location.dimension} ({location.type})
          </Text>
        </View>
        <List.Section>
          <List.Subheader>Residents</List.Subheader>
          {data.map((char, index, arr) => {
            return (
              <React.Fragment key={char.id}>
                <List.Item
                  onPress={() =>
                    navigation.push('Character', {
                      character: char,
                    })
                  }
                  title={<Title>{char.name}</Title>}
                  left={(props) => (
                    <Avatar.Image
                      {...props}
                      size={45}
                      source={{ uri: char.image }}
                      style={{ alignSelf: 'center', marginRight: 20 }}
                    />
                  )}
                />
                {arr.length !== index + 1 && <Divider />}
              </React.Fragment>
            );
          })}
        </List.Section>
      </ScrollView>
    </View>
  );
};

export default LocationScreen;
