import React from 'react';
import { View, FlatList, Dimensions, StyleSheet, Platform } from 'react-native';
import { useInfiniteQuery } from 'react-query';
import { Card, ActivityIndicator, Text } from 'react-native-paper';

import { getCharacters } from '../api';
import { extractIds } from '../utils';

const NUM_COLUMNS = 2;
const WIDTH = Dimensions.get('window').width;

const HomeScreen = ({ navigation }) => {
  const { status, data, fetchMore } = useInfiniteQuery(
    'characters',
    getCharacters,
    {
      getFetchMore: (lastGroup, allGroups) => lastGroup.nextPage,
    }
  );

  const viewCharacter = (c) => {
    navigation.push('Character', {
      character: c,
    });
  };

  if (status === 'loading') {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" animating={true} />
      </View>
    );
  }

  const paginatedData = [];
  data.forEach((page) => {
    page.data &&
      page.data.forEach((char) => {
        paginatedData.push(char);
      });
  });

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={paginatedData}
        keyExtractor={({ id }) => id.toString()}
        numColumns={NUM_COLUMNS}
        onEndReached={() => fetchMore()}
        onEndReachedThreshold={0.5}
        renderItem={({ item: c }) => (
          <Card style={styles.character} onPress={() => viewCharacter(c)}>
            <Card.Cover
              source={{ uri: c.image }}
              resizeMode="cover"
              style={{ height: 207 }}
            />
            <View style={styles.textContainer}>
              <Text style={styles.characterName}>{c.name}</Text>
            </View>
          </Card>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  character: {
    height: WIDTH / NUM_COLUMNS,
    flex: 1,
    margin: 5,
    position: 'relative',
  },
  textContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'android' ? -1 : 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    padding: 5,
  },
  characterName: {
    fontSize: 15,
    color: '#f1f1f1',
  },
});

export default HomeScreen;
