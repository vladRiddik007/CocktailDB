import 'react-native-gesture-handler';
import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {TextInput} from 'react-native-gesture-handler';

const urlDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
const urlFilters =
  'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

function Header(navigation) {
  return (
    <View style={styles.headerHome}>
      <Text style={styles.textHeader}>Drinks</Text>
    </View>
  );
}

function HomeScreen({route, navigation}) {
  const [drinks, setDrinks] = useState(null);
  const filters = route.params?.filters || 'Cocoa';
  useEffect(() => {
    try {
      const getData = async () => {
        const response = await fetch(urlDrinks + filters);
        const data = await response.json();
        setDrinks(data.drinks);
      };
      getData();
    } catch (e) {
      throw e;
    }
  }, [filters]);

  useEffect(() => {
    if (route.params?.filters) {
    }
  }, [route.params?.filters]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.headerButton}
          onPress={() =>
            navigation.navigate('Filters', {
              // itemId: 86,
              otherParam: 'anything you want here',
            })
          }>
          <Image source={require('./src/image/filter.png')} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  return (
    <>
      <Text style={{margin: 20}}>Filters: {route.params?.filters}</Text>
      <ScrollView>
        {drinks &&
          drinks.map((item) => (
            <View key={item.idDrink} style={styles.drink}>
              <Image
                style={styles.imageDrink}
                source={{
                  uri: item.strDrinkThumb,
                }}
              />
              <Text style={styles.textDrink}>{item.strDrink}</Text>
            </View>
          ))}
      </ScrollView>
    </>
  );
}

function FiltersScreen({route, navigation}) {
  const [filters, setFilters] = useState();
  const {itemId} = route.params;
  const {otherParam} = route.params;
  const [filter, setFilter] = useState();
  // console.log('drinks: ', drinks);
  useEffect(() => {
    try {
      const getFilters = async () => {
        const response = await fetch(urlFilters);
        const data = await response.json();
        setFilter(data.drinks);
      };
      getFilters();
    } catch (e) {
      throw e;
    }
  }, []);
  return (
    <ScrollView>
      {filter &&
        filter.map((item, i) => (
          <View key={i} style={styles.drink}>
            <Text
              style={styles.textDrink}
              onPress={() => console.log(item.strCategory)}>
              {item.strCategory}
            </Text>
          </View>
        ))}
      <Text>FiltersScreen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        title="Go to Details... again"
        onPress={() =>
          navigation.push('Filters', {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{height: 200, padding: 10, backgroundColor: 'white'}}
        value={filters}
        onChangeText={setFilters}
      />
      <Button
        title="Done"
        onPress={() => {
          navigation.navigate('Drinks', {filters: filters});
        }}
      />
      {/* <Button
        title="Go to ItemDetail"
        onPress={() => navigation.navigate('ItemDetails')}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      /> */}
    </ScrollView>
  );
}
function ItemDetailsScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Item Details Screen</Text>
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
}

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
        <Stack.Screen name="ItemDetails" component={ItemDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerHome: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },
  headerButton: {
    paddingRight: 20,
  },
  header: {
    height: 70,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  textHeader: {
    // fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: 24,
    lineHeight: 28,
    color: '#000',
  },
  drink: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  imageDrink: {
    width: 100,
    height: 100,
  },
  textDrink: {
    paddingLeft: 20,
    fontSize: 16,
    lineHeight: 19,
    color: '#7E7E7E',
  },
});

export default App;
