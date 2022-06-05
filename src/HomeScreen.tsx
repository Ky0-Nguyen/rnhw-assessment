/* eslint-disable prettier/prettier */
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import styles from './styles';
import {Query} from 'react-apollo';
import {ApolloClient, gql, InMemoryCache} from '@apollo/client';
import styled from 'styled-components/native';
import {getScreenStyle} from './misc/getScreenStyle';
import {Navigation, NavigationFunctionComponent} from 'react-native-navigation';

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

const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com',
  cache: new InMemoryCache(),
});

export const HomeScreen: NavigationFunctionComponent<Props> = props => {
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
    <Root>
      <Title>Welcome to RN lab!</Title>
      <Text>Your journey starts here</Text>
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
                  <TouchableWithoutFeedback onPress={() => onChooseItem(item)}>
                    <View style={styles.cardView}>
                      <Text style={styles.itemText}>{item.emoji}</Text>
                      <Text style={styles.itemText}>{item.code}</Text>
                      <Text style={styles.itemText}>{item.name}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                );
              }}
            />
          );
        }}
      </Query>
    </Root>
  );
};

//#region
type Props = {};

const Root = styled.View`
  flex: 1;
  background-color: #e6eeff;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;

HomeScreen.options = getScreenStyle();
//#endregion
