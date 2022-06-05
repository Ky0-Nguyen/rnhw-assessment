import {Navigation} from 'react-native-navigation';
import {HomeScreen} from '~/HomeScreen';
import DetailScreen from '~/DetailScreen';
import ContinentScreen from '~/ContinentScreen';

Navigation.registerComponent('HomeScreen', () => HomeScreen);
// Navigation.registerComponent('DetailScreen', () => DetailScreen);
// Navigation.registerComponent('ContinentScreen', () => ContinentScreen);
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'HomeScreen',
            },
          },
        ],
      },
    },
  });
});
