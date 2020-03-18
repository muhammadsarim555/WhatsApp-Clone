import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  iconStyle: {width: 100, height: 100},
  container: {
    height: height,
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
  },
  headingContainer: {
    width: width * 0.9,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  headingSubContainer: {fontSize: 16, fontFamily: 'LexendDeca-Regular'},
  btnContainer: {
    height: height * 0.07,
    width: width * 0.8,
    backgroundColor: '#16D174',
    alignSelf: 'center',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: width * 0.04,
    fontFamily: 'LexendDeca-Regular',
  },
});
