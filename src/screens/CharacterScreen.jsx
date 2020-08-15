import { View } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HeaderImageScrollView, {
  TriggeringView,
} from 'react-native-image-header-scroll-view';
import { useHeaderHeight } from '@react-navigation/stack';

import { useQuery } from 'react-query';
import {
  ActivityIndicator,
  Colors,
  Text,
  List,
  Divider,
  useTheme,
} from 'react-native-paper';

import { getEpisode } from '../api';
import { extractIds } from '../utils';

const MAX_HEIGHT = 300;

const CharacterScreen = ({ navigation, route }) => {
  const { character } = route.params;
  const headerHeight = useHeaderHeight();
  const theme = useTheme();
  const episodeIds = extractIds(character.episode);

  const { isLoading, data } = useQuery(['episode', episodeIds], getEpisode);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator
          size="large"
          animating={true}
          color={theme.colors.primary}
        />
      </View>
    );
  }

  let iconColor;

  if (character.status === 'Alive') {
    iconColor = Colors.greenA700;
  } else if (character.status === 'Dead') {
    iconColor = Colors.redA400;
  } else {
    iconColor = Colors.grey400;
  }

  return (
    <HeaderImageScrollView
      maxHeight={MAX_HEIGHT}
      minHeight={headerHeight}
      headerImage={{ uri: character.image }}
      maxOverlayOpacity={0.6}
      minOverlayOpacity={0.3}
      fadeOutForeground
      showsVerticalScrollIndicator={false}
      scrollViewBackgroundColor={theme.colors.background}
      renderForeground={() => (
        <View
          style={{
            height: MAX_HEIGHT,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{ color: Colors.white, fontWeight: 'bold', fontSize: 30 }}
          >
            {character.name}
          </Text>
          <View
            style={{
              color: Colors.white,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <MaterialCommunityIcons
              name="checkbox-blank-circle"
              color={iconColor}
              size={16}
              style={{ marginRight: 5 }}
            />
            <Text style={{ fontSize: 20, color: Colors.white }}>
              {character.status} - {character.species}
            </Text>
          </View>
        </View>
      )}
    >
      <View>
        <TriggeringView
          onBeginHidden={() => {
            navigation.setOptions({ headerTitle: character.name });
          }}
          onDisplay={() => {
            navigation.setOptions({ headerTitle: false });
          }}
        >
          <List.Section>
            <List.Subheader>Episodes</List.Subheader>
            {(Array.isArray(data) ? data : [data]).map((e, index, arr) => {
              return (
                <React.Fragment key={e.id}>
                  <List.Item
                    onPress={() =>
                      navigation.push('Episode', {
                        episode: e,
                      })
                    }
                    title={e.name}
                    description={e.episode}
                    left={(props) => (
                      <List.Icon {...props} icon="television-classic" />
                    )}
                  />
                  {arr.length !== index + 1 && <Divider />}
                </React.Fragment>
              );
            })}
          </List.Section>
        </TriggeringView>
      </View>
    </HeaderImageScrollView>
  );
};

export default CharacterScreen;
