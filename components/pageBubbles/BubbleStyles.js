import { StyleSheet } from 'react-native';

const BubbleStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  bubble: {
    width: '10vw',
    height: '10vw',
    backgroundColor: 'grey',
  },
  selected: {
    backgroundColor: 'black',
  },
});

export default BubbleStyles;