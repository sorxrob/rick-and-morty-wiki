import React from 'react';
import { View, FlatList } from 'react-native';
import { ActivityIndicator, Colors, List, Divider } from 'react-native-paper';
import { useInfiniteQuery } from 'react-query';

import { getEpisodes } from '../api';

const EpisodesScreen = ({ navigation, route }) => {
  const { status, data, fetchMore, canFetchMore } = useInfiniteQuery(
    'episodes',
    getEpisodes,
    {
      getFetchMore: (lastGroup, allGroups) => lastGroup.nextPage,
    }
  );

  const viewEpisode = (e) => {
    navigation.push('Episode', {
      episode: e,
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
        renderItem={({ item: e }) => (
          <List.Item
            onPress={() => viewEpisode(e)}
            title={e.name}
            description={e.episode}
            left={(props) => <List.Icon {...props} icon="television-classic" />}
          />
        )}
      />
    </View>
  );
};

export default EpisodesScreen;
