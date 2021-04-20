import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { windowWidth, windowHeight } from '../../utils/Dimensions';
import ModalStyles from '../ModalStyles';
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
        <View style={ModalStyles.centeredView}>
          <View style={[ModalStyles.modalView, ModalStyles.content]}>
            <View style={{marginBottom: 25}}>
              <Text style={ModalStyles.label}>
                { isReply ? 'Reply' : 'Comment' }
              </Text>
              <TextInput
                style={[
                  ModalStyles.input,
                  ModalStyles.multiline,
                  {marginTop: 15}
                ]}
                onChangeText={text => setContent(text)}
                value={content}
                multiline={true}
              />
            </View>
            <TouchableOpacity
              style={[ModalStyles.button, ModalStyles.buttonClose]}
              onPress={prepareComment}
            >
              <Text style={ModalStyles.textStyle}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default PostCommentModal;