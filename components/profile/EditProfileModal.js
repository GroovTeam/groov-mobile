import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Modal, StyleSheet, TextInput, Keyboard } from 'react-native';
import { windowWidth, windowHeight } from '../../utils/Dimensions';
import updateProfile from '../../utils/updateProfile';

const EditProfileModal = ({ editing, updateEditing, refreshProfile }) => {

  /*
  {
    "firstName": "string",
    "lastName": "string",
    "bio": "string",
    "picURL": "string",
    "tagLikes": [
      "Pop"
    ],
    "tagDislikes": [
      "Country"
    ],
    "tagNeutrals": [
      "Rap"
    ]
  }
  */
  const [content, setContent] = useState({});

  const updateContent = (key, value) => {
    content[key] = value;
    setContent(content);
  };

  const edit = body => {
    updateProfile(body)
      .then(() => {
        updateEditing(false);
        refreshProfile();
      });
  };

  const prepareEdit = () => {
    const body = {};
    for (const [key, value] of Object.entries(content))
      if (value != '')
        body[key] = value;
    edit(body);
  };

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={editing}
      onRequestClose={() => updateEditing(!editing)}
    >
      <TouchableOpacity
        style={{width: windowWidth, height: windowHeight}}
        onPress={() => updateEditing(false)}
      >
        <View style={modalStyles.centeredView}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
            <View style={[modalStyles.modalView, modalStyles.content]}>
              <View style={{marginBottom: 25}}>
                <Text style={modalStyles.label}>
                  First Name
                </Text>
                <TextInput
                  style={[
                    modalStyles.input,
                    modalStyles.multiline,
                    {marginTop: 15}
                  ]}
                  onChangeText={text => updateContent('firstName', text)}
                />

                <Text style={modalStyles.label}>
                  Last Name
                </Text>
                <TextInput
                  style={[
                    modalStyles.input,
                    modalStyles.multiline,
                    {marginTop: 15}
                  ]}
                  onChangeText={text => updateContent('lastName', text)}
                />

                <Text style={modalStyles.label}>
                  Bio
                </Text>
                <TextInput
                  style={[
                    modalStyles.input,
                    modalStyles.multiline,
                    {marginTop: 15}
                  ]}
                  onChangeText={text => updateContent('bio', text)}
                  multiline={true}
                />
              </View>
              <TouchableOpacity
                style={[modalStyles.button, modalStyles.buttonClose]}
                onPress={prepareEdit}
              >
                <Text style={modalStyles.textStyle}>Apply</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default EditProfileModal;

const modalStyles = StyleSheet.create({
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
    marginBottom: 20
  },
  multiline: {
    borderWidth: 1,
  },
});