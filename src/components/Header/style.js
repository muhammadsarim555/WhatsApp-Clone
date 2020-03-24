import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    width: width,
  },
  headerChild: {
    backgroundColor: 'white',
    flexDirection: 'row',
    flex: 2,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabsText: {fontSize: 18, fontFamily: 'LexendDeca-Regular'},
  headingText: {fontSize: 22, fontWeight: 'bold', marginLeft: 20},
  tabsContainer: {
    flex: 1.5,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },

  footerContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopColor: '#E3E5E9',
    borderTopWidth: 2,
    justifyContent: 'center',
  },
  footerSubContainer: {
    width: width * 0.6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  headerHeading: {fontSize: width * 0.04},
  bodyContainer: {flex: 7},
});
