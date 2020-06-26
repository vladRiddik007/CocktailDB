import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Header} from './src/components/header';
import {HomeScreen} from './src/screen/homeScreen';
import {FiltersScreen} from './src/screen/filterScreen';
import {DrinkScreen} from './src/screen/drinkScreen';
import {styles} from './src/components/styles';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: styles.header,
          headerTitleStyle: styles.textHeader,
        }}>
        <Stack.Screen
          name="Drinks"
          component={HomeScreen}
          options={{
            headerTitle: (props) => <Header {...props} />,
          }}
        />
        <Stack.Screen
          name="Filters"
          component={FiltersScreen}
          initialParams={{itemId: 42}}
        />
        <Stack.Screen name="ItemDetails" component={DrinkScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
