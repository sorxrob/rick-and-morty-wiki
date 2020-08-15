import React from 'react';
import { View, FlatList } from 'react-native';
import { ActivityIndicator, Colors, List, Divider } from 'react-native-paper';
import { useInfiniteQuery } from 'react-query';

import { getLocations } from '../api';

const LocationsScreen = ({ navigation, route }) => {
  const { status, data, fetchMore, canFetchMore } = useInfiniteQuery(
    'locations',
    getLocations,
    {
      getFetchMore: (lastGroup, allGroups) => lastGroup.nextPage,
    }
  );

  const viewLocation = (location) => {
    navigation.push('Location', {
      location,
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
        ItemSeparatorComponent={() => <Divider />}
        onEndReached={() => {
          if (canFetchMore) {
            fetchMore();
          }
        }}
        onEndReachedThreshold={0.5}
        renderItem={({ item: l }) => (
          <List.Item
            onPress={() => viewLocation(l)}
            title={l.name}
            description={l.type}
            left={(props) => <List.Icon {...props} icon="map-marker" />}
          />
        )}
      />
    </View>
  );
};

export default LocationsScreen;
