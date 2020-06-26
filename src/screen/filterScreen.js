import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {styles} from '../components/styles';

export const FiltersScreen = ({route, navigation}) => {
  const {filters} = route.params;
  const [isEnabled, setIsEnabled] = useState(filters);
  // const [tick, setTick] = useState(true);
  // const [isEnabled, setIsEnabled] = useState(false);
  // const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  // const {itemId} = route.params;
  // const {otherParam} = route.params;
  // const [filters, setFilter] = useState();
  // console.log('filter: ', filters);
  // useEffect(() => {
  //   try {
  //     const getFilters = async () => {
  //       const response = await fetch(urlFilters);
  //       const data = await response.json();
  //       setFilter(
  //         data.drinks.map((item) => ({
  //           strCategory: item.strCategory,
  //           isEnabled: true,
  //         })),
  //       );
  //     };
  //     getFilters();
  //   } catch (e) {
  //     throw e;
  //   }
  // }, []);
  const toggleSwitch = (str) => {
    setIsEnabled(
      isEnabled.map((item) =>
        item.strCategory === str ? {...item, isEnabled: !item.isEnabled} : item,
      ),
    );
  };
  return (
    <ScrollView>
      {isEnabled &&
        isEnabled.map((item, i) => (
          <View key={i} style={styles.drink}>
            <TouchableOpacity
              onPress={() => toggleSwitch(item.strCategory)}
              style={styles.filter}>
              <Text style={styles.textFilter}>{item.strCategory}</Text>
              {/* <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              /> */}
              {item.isEnabled && (
                <Image source={require('../image/true.png')} />
              )}
            </TouchableOpacity>
          </View>
        ))}
      {/* <Text>FiltersScreen</Text>
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
      <TouchableOpacity
        style={styles.buttonApply}
        onPress={() => {
          navigation.navigate('Drinks', {filters: filters});
        }}>
        <Text>APPLY</Text>
      </TouchableOpacity> */}
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('Drinks', {isEnabled});
          }}>
          <Text style={styles.textButton}>APPLY</Text>
        </TouchableOpacity>
      </View>
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
};
