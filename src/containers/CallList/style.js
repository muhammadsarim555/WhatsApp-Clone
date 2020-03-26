import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');

export default StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#dcdcdc',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    padding: 10,
    justifyContent: 'center',
  },
  activeCircle: {
    width: 12,
    height: 12,
    backgroundColor: '#16D174',
    borderRadius: 6,
    alignSelf: 'center',
  },
  pic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarBackground: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: '#16D174',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 250,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    color: '#222',
    fontSize: 15,
  },
  mblTxt: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
  },
  end: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  msg: {
    fontWeight: '400',
    color: '#666',
    fontSize: 12,
  },
  time: {
    fontWeight: '400',
    color: '#666',
    fontSize: 11,
  },
  icon: {
    color: '#777',
    marginLeft: 15,

    padding: 2
  },
});
