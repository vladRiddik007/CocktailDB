import {Dimensions} from 'react-native';
const window = Dimensions.get('window');
export const h = window.height;
export const w = window.width;

export const urlDrinks =
  'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
export const urlFilters =
  'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
