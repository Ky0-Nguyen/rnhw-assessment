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
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import {Navigation} from 'react-native-navigation';
import {ApolloClient, InMemoryCache} from 'apollo-boost';

interface ContinentScreenProps {
  componentId: string;
  continentInfo: any;
}

const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com',
  cache: new InMemoryCache(),
});

const GET_COUNTRIES = gql`
  {
    countries {
      name
      code
      emoji
      emojiU
    }
  }
`;
const ContinentScreen = (props: ContinentScreenProps) => {
  const onChooseItem = (countryInfo: any) => {
    Navigation.push(props.componentId, {
      component: {
        name: 'DetailScreen',
        options: {
          topBar: {
            title: {
              text: 'DetailScreen',
            },
          },
        },
        passProps: {
          countryInfo,
        },
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{get(props, 'continentInfo.name')}</Text>
      <View style={styles.rowInfo}>
        <Text style={styles.textDetail}>{'Code'}</Text>
        <Text style={styles.textDetail}>
          {get(props, 'continentInfo.code', '')}
        </Text>
      </View>
      <View style={styles.rowInfo}>
        <Text style={styles.textDetail}>{'Countries'}</Text>
        <Query query={GET_COUNTRIES} client={client}>
          {({loading, error, data}) => {
            if (loading) {
              return <ActivityIndicator color="green" />;
            }
            if (error) {
              return <Text> {error.message}</Text>;
            }
            return (
              <FlatList
                data={data.countries}
                extraData={data.countries}
                keyExtractor={(item, index) => `${item.code}${index}`}
                renderItem={({item}): JSX.Element => {
                  return (
                    <TouchableWithoutFeedback
                      onPress={() => onChooseItem(item)}>
                      <Text style={styles.itemText}>{item.name}</Text>
                    </TouchableWithoutFeedback>
                  );
                }}
              />
            );
          }}
        </Query>
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
});
