import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Modal, TextInput, Keyboard } from 'react-native';
import { windowWidth, windowHeight } from '../../utils/Dimensions';
import ModalStyles from '../ModalStyles';
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
        <View style={ModalStyles.centeredView}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
            <View style={[ModalStyles.modalView, ModalStyles.content]}>
              <View style={{marginBottom: 25}}>
                <Text style={ModalStyles.label}>
                  First Name
                </Text>
                <TextInput
                  style={[
                    ModalStyles.input,
                    ModalStyles.multiline,
                    {marginTop: 15}
                  ]}
                  onChangeText={text => updateContent('firstName', text)}
                />

                <Text style={ModalStyles.label}>
                  Last Name
                </Text>
                <TextInput
                  style={[
                    ModalStyles.input,
                    ModalStyles.multiline,
                    {marginTop: 15}
                  ]}
                  onChangeText={text => updateContent('lastName', text)}
                />

                <Text style={ModalStyles.label}>
                  Bio
                </Text>
                <TextInput
                  style={[
                    ModalStyles.input,
                    ModalStyles.multiline,
                    {marginTop: 15}
                  ]}
                  onChangeText={text => updateContent('bio', text)}
                  multiline={true}
                />
              </View>
              <TouchableOpacity
                style={[ModalStyles.button, ModalStyles.buttonClose]}
                onPress={prepareEdit}
              >
                <Text style={ModalStyles.textStyle}>Apply</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default EditProfileModal;