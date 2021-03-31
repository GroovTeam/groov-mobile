import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  androidSafeView: {
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  stretch: {
    width: '100%',
  },
  text: {
    color: 'rgb(0,0,0)',
    fontSize: 25,
    fontWeight: '200',
    textAlign: 'center',
  },
  headerText: {
    fontSize: 35,
    fontWeight: '200',
  },
  smallText: {
    fontSize: 15,
    fontWeight: '100',
  },
  blueAccentText: {
    color: 'rgb(59,108,212)',
  },
  greenAccentText: {
    color: 'rgb(80,220,100)',
  },
  redAccentText: {
    color: 'rgb(237,28,36)',
  },
});

export default styles;