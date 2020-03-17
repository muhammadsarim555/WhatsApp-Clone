import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerContainer: {
    flex: 0.8,
    backgroundColor: 'red',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  footerContainer: {
    flex: 0.9,
    backgroundColor: 'white',
    borderTopColor: '#E3E5E9',
    borderTopWidth: 2,
    justifyContent: 'center',
  },
  footerSubContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
});
