import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, TextInput, Alert } from 'react-native';
import { windowWidth, windowHeight } from '../../utils/Dimensions';
import postComment from '../../utils/postComment';
import postReply from '../../utils/replyComment';

const PostCommentModal = ({ id, commenting, updateCommenting, updateComments, isReply }) => {

  const [content, setContent] = useState('');

  const prepareComment = () => {
    if (content === '') {
      Alert.alert(
        'Hold up.',
        'Your comment looks a bit dull'
      );
      return;
    }

    // Post the comment
    if (isReply)
      postReply(id, content)
        .then(updateComments);
    else
      postComment(id, content)
        .then(updateComments);
  };

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={commenting}
      onRequestClose={() => updateCommenting(!commenting)}
    >
      <TouchableOpacity
        style={{width: windowWidth, height: windowHeight}}
        onPress={() => updateCommenting(false)}
      >
        <View style={modalStyles.centeredView}>
          <View style={[modalStyles.modalView, modalStyles.content]}>
            <View style={{marginBottom: 25}}>
              <Text style={modalStyles.label}>
                { isReply ? 'Reply' : 'Comment' }
              </Text>
              <TextInput
                style={[
                  modalStyles.input,
                  modalStyles.multiline,
                  {marginTop: 15}
                ]}
                onChangeText={text => setContent(text)}
                value={content}
                multiline={true}
              />
            </View>
            <TouchableOpacity
              style={[modalStyles.button, modalStyles.buttonClose]}
              onPress={prepareComment}
            >
              <Text style={modalStyles.textStyle}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default PostCommentModal;

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
  },
  multiline: {
    borderWidth: 1,
  },
});