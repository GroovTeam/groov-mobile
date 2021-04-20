import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Modal, TextInput, Keyboard } from 'react-native';
import { windowWidth, windowHeight } from '../../utils/Dimensions';
import createPosse from '../../utils/createPosse';
import joinPosse from '../../utils/joinPosse';
import ModalStyles from '../ModalStyles';

const CreatePosseModal = ({ creating, updateCreating, refreshProfile }) => {
  const [content, setContent] = useState({});

  const updateContent = (key, value) => {
    content[key] = value;
    setContent(content);
  };

  const create = body => {
    createPosse(body)
      .then(res => {
        joinPosse(res.data.posseID)
          .then(() => {
            updateCreating(false);
            refreshProfile();
          });
      });
  };

  const prepareCreate = () => {
    const body = {};
    for (const [key, value] of Object.entries(content))
      if (value != '')
        body[key] = value;
    create(body);
  };

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={creating}
      onRequestClose={() => updateCreating(!creating)}
    >
      <TouchableOpacity
        style={{width: windowWidth, height: windowHeight}}
        onPress={() => updateCreating(false)}
      >
        <View style={ModalStyles.centeredView}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
            <View style={[ModalStyles.modalView, ModalStyles.content]}>
              <View style={{marginBottom: 25}}>
                <Text style={ModalStyles.label}>
                  Posse Name
                </Text>
                <TextInput
                  style={[
                    ModalStyles.input,
                    ModalStyles.multiline,
                    {marginTop: 15, marginBottom: 15}
                  ]}
                  onChangeText={text => updateContent('name', text)}
                />

                <Text style={ModalStyles.label}>
                  Posse Bio
                </Text>
                <TextInput
                  style={[
                    ModalStyles.input,
                    ModalStyles.multiline,
                    {marginTop: 15}
                  ]}
                  onChangeText={text => updateContent('bio', text)}
                />
              </View>
              <TouchableOpacity
                style={[ModalStyles.button, ModalStyles.buttonClose]}
                onPress={prepareCreate}
              >
                <Text style={ModalStyles.textStyle}>Create</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default CreatePosseModal;