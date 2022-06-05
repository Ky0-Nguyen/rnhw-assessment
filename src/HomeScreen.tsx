import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import styles from './styles';
import {useQuery} from '@apollo/client';
import {GET_COUNTRIES} from './constants';
import styled from 'styled-components/native';
import {getScreenStyle} from './misc/getScreenStyle';

export const HomeScreen = (props: {
  navigation: {navigate: (arg0: string, arg1: {countryInfo: any}) => void};
}): JSX.Element => {
  const {loading, error, data} = useQuery(GET_COUNTRIES);
  const onChooseItem = (countryInfo: any) => {
    props.navigation.navigate('Detail', {countryInfo});
  };
  if (loading) {
    return <ActivityIndicator color="green" />;
  }
  if (error) {
    return <Text> {error.message}</Text>;
  }
  return (
    <Root>
      <Title>Welcome to RN lab!</Title>
      <Text>Your journey starts here</Text>
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
