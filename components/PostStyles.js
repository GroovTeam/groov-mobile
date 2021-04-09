import { Dimensions, StyleSheet } from 'react-native';

const window = Dimensions.get('window');
const windowWidth = window.width;

const PostStyles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  flexHori: {
    flexDirection: 'row',
  },
  flexVert: {
    flexDirection: 'column',
  },
  topBorder: {
    borderTopWidth: 1,
    borderTopColor: '#888888',
  },
  padded: {
    padding: 15,
  },
  user: {
    color: 'rgb(0,0,0)',
    fontSize: 13,
    fontWeight: 'bold',
  },
  text: {
    color: 'rgb(0,0,0)',
    fontSize: 25,
    fontWeight: '100',
    textAlign: 'center',
    marginLeft: 10,
  },
  header: {
    marginTop: 25,
    padding: 5,
    paddingLeft: 10,
    alignItems: 'flex-start',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
  body: {
    marginTop: 4,
    width: (windowWidth - 100),
  },
  negativeMargin: {
    marginTop: -15,
  },
  posseImage: {
    width: 70,
    height: 70,
    borderRadius: 5,
  },
  posseText: {
    color: 'rgb(0,0,0)',
    fontSize: 25,
    fontWeight: '300',
    textAlign: 'center',
    marginLeft: 20,
    marginTop: 20,
  },
});

export default PostStyles;