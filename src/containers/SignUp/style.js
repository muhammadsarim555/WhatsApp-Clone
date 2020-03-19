import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  iconStyle: {width: 100, height: 100},
  container: {
    flex: 1,
    alignItems: 'flex-start',
  },
  subContainer: {
    height: height * 0.6,
    width: width * 0.9,
    justifyContent: 'space-evenly',
  },
  headingContainer: {
    width: width * 0.7,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    marginLeft: width * 0.04,
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
  inputContainer: {
    marginLeft: width * 0.04,
    width: width * 0.6,
  },

  userImageContainer: {
    width: 100,
    height: 100,
    backgroundColor: 'rgb(255,255,255)',
    borderRadius: 50,

    shadowColor: '#00000021',
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 3,
      justifyContent: 'center',
      alignItems: 'center',
    },
    shadowOpacity: 0.22,
    shadowRadius: 3,
    elevation: 3,
  },
  addIconContainer: {
    position: 'absolute',
    right: 10,
    top: 75,
    width: 25,
    height: 25,
    borderRadius: 15,
    justifyContent: 'center',
    backgroundColor: '#16D173',
  },
});
