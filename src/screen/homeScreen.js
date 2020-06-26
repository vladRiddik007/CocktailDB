/* eslint-disable react-hooks/exhaustive-deps */
import 'react-native-gesture-handler';
import React, {useState, useEffect, useLayoutEffect} from 'react';
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import {urlDrinks, urlFilters} from '../../constants';
import {styles} from '../components/styles';

export const HomeScreen = ({route, navigation}) => {
  const [filters, setFilter] = useState([]);
  const [fullListDrinks, setFullListDrinks] = useState([]);
  const [renderFullListDrinks, setRenderFullListDrinks] = useState();
  const [isEnabled, setIsEnabled] = useState(null);

  useEffect(() => {
    try {
      const getFilters = async () => {
        const response = await fetch(urlFilters);
        const data = await response.json();
        const filt = data.drinks.map((item) => ({
          strCategory: item.strCategory,
          isEnabled: true,
        }));
        setFilter(filt);
      };
      getFilters();
    } catch (e) {
      throw e;
    }
  }, []);

  useEffect(() => {
    try {
      const arrPromises = filters.map((filter) =>
        fetch(urlDrinks + filter.strCategory).then(async (d) => ({
          drinks: (await d.json()).drinks,
          filter: filter.strCategory,
        })),
      );
      Promise.all(arrPromises).then((d) => {
        setFullListDrinks(d);
        setRenderFullListDrinks(d);
      });
    } catch (e) {
      console.error('e: ', e);
    }
  }, [filters]);

  useEffect(() => {
    if (route.params?.isEnabled) {
      console.log('route.params?.isEnabled: ', route.params?.isEnabled);
      setIsEnabled(route.params?.isEnabled);
      const newFullListDrinks = fullListDrinks.filter((item) => {
        const currentIten = route.params?.isEnabled.find(
          (el) => el.strCategory === item.filter,
        );
        return (currentIten && currentIten.isEnabled) || false;
      });
      setRenderFullListDrinks(newFullListDrinks);
      console.log('newFullListDrinks: ', newFullListDrinks);
    }
  }, [route.params?.isEnabled]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.headerButton}
          onPress={() =>
            navigation.navigate('Filters', {
              filters: isEnabled ? isEnabled : filters,
            })
          }>
          <Image source={require('../image/filter.png')} />
        </TouchableOpacity>
      ),
    });
  }, [filters, isEnabled, navigation]);

  return (
    <FlatList
      data={renderFullListDrinks}
      renderItem={({item}) => (
        <>
          <Text style={styles.textDrink}>{item.filter}</Text>
          {item.drinks.map((el, i) => (
            <View style={styles.drink} key={i}>
              <Image
                style={styles.imageDrink}
                source={{
                  uri: el.strDrinkThumb,
                }}
              />
              <Text style={styles.textDrink}>{el.strDrink}</Text>
            </View>
          ))}
        </>
      )}
      keyExtractor={(item) => item.filter}
    />
  );
};
