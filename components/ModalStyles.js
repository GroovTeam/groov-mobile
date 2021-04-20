import { StyleSheet } from 'react-native';
import { windowWidth } from '../utils/Dimensions';

const ModalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: 'auto',
    backgroundColor: 'white'
  },  
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  },
  label: {
    fontSize: 25,
    alignSelf: 'center'
  },
  input: {
    borderColor: 'black',
    borderBottomWidth: 1,
    borderRadius: 15,
    padding: 10,
    width: windowWidth * 0.5,
  },
  multiline: {
    borderWidth: 1,
  },
});

export default ModalStyles;