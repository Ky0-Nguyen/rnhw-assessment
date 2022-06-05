/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';

import get from 'lodash/get';
import gql from 'graphql-tag';
import styles from './styles';
import toString from 'lodash/toString';
import ApolloClient from 'apollo-boost';
import {Navigation} from 'react-native-navigation';

interface DetailScreenProps {
  componentId: string;
  countryInfo: any;
}

const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com',
});
const GET_COUNTRY_DETAILS = gql`
  query Country($countryCode: ID!) {
    country(code: $countryCode) {
      name
      native
      emoji
      currency
      code
      phone
      languages {
        code
        name
      }
      continent {
        name
        code
      }
    }
  }
`;

const DetailScreen = (props: DetailScreenProps) => {
  const [isLoading, setLoading] = React.useState(true);
  const [countryDetail, setCountryDetail] = React.useState(props.countryInfo);

  React.useEffect(() => {
    const getCountryDetail = async (countryCode: string) => {
      const {data} = await client.query({
        query: GET_COUNTRY_DETAILS,
        variables: {countryCode},
      });
      setCountryDetail(data.country);
    };
    getCountryDetail(toString(get(props.countryInfo, 'code', 'US'))).then(() =>
      setLoading(false),
    );
  }, [props.countryInfo]);

  const goToContinent = (continentInfo: any) => {
    Navigation.push(props.componentId, {
      component: {
        name: 'ContinentScreen',
        options: {
          topBar: {
            title: {
              text: 'ContinentScreen',
            },
          },
        },
        passProps: {
          continentInfo,
        },
      },
    });
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
