import { Dimensions } from 'react-native';

const window = Dimensions.get('window');
const [ windowWidth, windowHeight ] = [ window.width, window.height ];

export {
  windowWidth,
  windowHeight
};