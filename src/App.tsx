import React from 'react';

import {HomeScreen} from './HomeScreen';
import DetailScreen from './DetailScreen';
import ContinentScreen from './ContinentScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="Continent" component={ContinentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
