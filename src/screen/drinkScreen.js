import 'react-native-gesture-handler';
import React from 'react';
import {View, Text, Button} from 'react-native';

export const DrinkScreen = ({navigation}) => (
  <View>
    <Text>Drink Screen</Text>
    <Button
      title="Go back to first screen in stack"
      onPress={() => navigation.popToTop()}
    />
    <Button title="Go back" onPress={() => navigation.goBack()} />
    <Button
      title="Go to Details"
      onPress={() => navigation.navigate('Details')}
    />
  </View>
);
