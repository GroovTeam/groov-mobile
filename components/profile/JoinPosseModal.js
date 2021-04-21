import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Modal, Keyboard } from 'react-native';
import { windowWidth, windowHeight } from '../../utils/Dimensions';
import joinPosse from '../../utils/joinPosse';
import ModalStyles from '../ModalStyles';
import PosseScroller from './PosseScroller';

const JoinPosseModal = ({ joining, updateJoining, refreshProfile }) => {
  const [selectedID, setSelectedID] = useState({});

  const updatePosse = posseId => {
    setSelectedID(posseId);
  };

  const join = () => {
    joinPosse(selectedID)
      .then(() => {
        updateJoining(false);
        refreshProfile();
      });
  };

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={joining}
      onRequestClose={() => updateJoining(!joining)}
    >
      <TouchableOpacity
        style={{width: windowWidth, height: windowHeight}}
        onPress={() => updateJoining(false)}
      >
        <View style={ModalStyles.centeredView}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
            <View style={[ModalStyles.modalView, ModalStyles.content]}>
              <View style={{marginBottom: 25}}>
                <Text style={ModalStyles.label}>
                  Available Posses
                </Text>
                <PosseScroller updatePosse={updatePosse}/>
              </View>
              <TouchableOpacity
                style={[ModalStyles.button, ModalStyles.buttonClose]}
                onPress={join}
              >
                <Text style={ModalStyles.textStyle}>Join Posse</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default JoinPosseModal;