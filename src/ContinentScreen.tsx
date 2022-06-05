import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';

import get from 'lodash/get';
import {GET_COUNTRIES} from './constants';
import {useQuery} from '@apollo/client';
import {StackActions} from '@react-navigation/native';

interface ContinentScreenProps {
  componentId: string;
  continentInfo: any;
  route: any;
  navigation: any;
}

const ContinentScreen = ({
  route,
  navigation,
}: ContinentScreenProps): JSX.Element => {
  const {continentInfo} = route.params;
  const {loading, error, data} = useQuery(GET_COUNTRIES);
  const onChooseItem = (countryInfo: any) => {
    navigation.dispatch(
      StackActions.replace('Detail', {
        countryInfo,
      }),
    );
  };

  if (loading) {
    return <ActivityIndicator color="green" />;
  }
  if (error) {
    return <Text> {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{get(continentInfo, 'name')}</Text>
      <View style={styles.rowInfo}>
        <Text style={styles.textDetail}>{'Code'}</Text>
        <Text style={styles.textDetail}>{get(continentInfo, 'code', '')}</Text>
      </View>
      <View style={styles.rowInfo}>
        <Text style={styles.textDetail}>{'Countries'}</Text>
        <FlatList
          data={data.countries}
          style={styles.listCountry}
          extraData={data.countries}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => `${item.code}${index}`}
          renderItem={({item}): JSX.Element => {
            return (
              <TouchableWithoutFeedback onPress={() => onChooseItem(item)}>
                <Text style={styles.itemText}>{item.name}</Text>
              </TouchableWithoutFeedback>
            );
          }}
        />
      </View>
    </View>
  );
};

export default ContinentScreen;

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 24,
    marginVertical: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  rowInfo: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  textDetail: {
    fontSize: 15,
    color: '#111',
  },
  itemText: {
    maxWidth: 100,
    color: 'blue',
  },
  listCountry: {
    maxWidth: 100,
  },
});
