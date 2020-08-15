import React, { useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
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

const EpisodeScreen = ({ navigation, route }) => {
  const { episode } = route.params;
  const characterIds = extractIds(episode.characters);

  const { isLoading, data } = useQuery(
    ['episode_characters', characterIds],
    getCharacter
  );

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        headerTitle: episode.episode,
      });
    }, [])
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
            {episode.name}
          </Text>
          <Text style={{ fontSize: 20 }}>{episode.air_date}</Text>
        </View>
        <List.Section>
          <List.Subheader>Characters</List.Subheader>
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

export default EpisodeScreen;
