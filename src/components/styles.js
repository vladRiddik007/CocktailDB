import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
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
  textButton: {
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 28,
    color: '#FFFFFF',
  },
  drink: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  filter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  textFilter: {
    paddingLeft: 20,
    fontSize: 16,
    lineHeight: 19,
    color: '#7E7E7E',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 35,
    paddingVertical: 15,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#272727',
    padding: 10,
  },
});
