/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';

import get from 'lodash/get';
import styles from './styles';
import ApolloClient from 'apollo-boost';
import {GET_COUNTRY_DETAILS} from './constants';
import {StackActions} from '@react-navigation/native';

interface DetailScreenProps {
  route: any;
  componentId: string;
  countryInfo: any;
  navigation: any;
}

const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com',
});

const DetailScreen = ({route, navigation}: DetailScreenProps): JSX.Element => {
  const {countryInfo, code} = route.params;
  const [isLoading, setLoading] = React.useState(true);
  const [countryDetail, setCountryDetail] = React.useState(countryInfo);

  React.useEffect(() => {
    const getCountryDetail = async (countryCode: string) => {
      const {data} = await client.query({
        query: GET_COUNTRY_DETAILS,
        variables: {countryCode},
      });
      setCountryDetail(data.country);
    };
    getCountryDetail(code || get(countryInfo, 'code', 'US')).then(() =>
      setLoading(false),
    );
  }, [countryInfo, code]);

  const goToContinent = (continentInfo: any) => {
    navigation.dispatch(
      StackActions.replace('Continent', {
        continentInfo,
      }),
    );
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.itemTitle}>Country Info</Text>
      </View>
      <View style={styles.cardView}>
        <View style={styles.itemView}>
          <View style={{flex: 2}}>
            <Text>Name</Text>
          </View>
          <View style={{flex: 2}}>
            <Text style={styles.itemText}>{`:${get(
              countryDetail,
              'name',
              '',
            )}`}</Text>
          </View>
        </View>
        <View style={styles.itemView}>
          <View style={{flex: 2}}>
            <Text>Country code</Text>
          </View>
          <View style={{flex: 2}}>
            <Text style={styles.itemText}>
              : {get(countryDetail, 'code', '')}
            </Text>
          </View>
        </View>
        <View style={styles.itemView}>
          <View style={{flex: 2}}>
            <Text>Native</Text>
          </View>
          <View style={{flex: 2}}>
            <Text style={styles.itemText}>
              : {get(countryDetail, 'native', '')}
            </Text>
          </View>
        </View>
        <View style={styles.itemView}>
          <View style={{flex: 2}}>
            <Text>Currency</Text>
          </View>
          <View style={{flex: 2}}>
            <Text style={styles.itemText}>
              : {get(countryDetail, 'currency', '')}
            </Text>
          </View>
        </View>

        <View style={styles.itemView}>
          <View style={{flex: 2}}>
            <Text>Phone Code</Text>
          </View>
          <View style={{flex: 2}}>
            <Text style={styles.itemText}>
              : {get(countryDetail, 'phone', '')}
            </Text>
          </View>
        </View>
        <View style={styles.itemView}>
          <View style={{flex: 2}}>
            <Text>Emoji</Text>
          </View>
          <View style={{flex: 2}}>
            <Text style={styles.itemText}>
              : {get(countryDetail, 'emoji', '')}
            </Text>
          </View>
        </View>
        <View style={styles.itemView}>
          <View style={{flex: 2}}>
            <Text>Continent</Text>
          </View>
          <View style={{flex: 2}}>
            <Text
              style={{color: 'blue'}}
              onPress={() => goToContinent(countryDetail.continent)}>
              : {get(countryDetail, 'continent.name', '')}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DetailScreen;
