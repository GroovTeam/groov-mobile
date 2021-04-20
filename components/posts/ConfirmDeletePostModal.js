import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { windowWidth, windowHeight } from '../../utils/Dimensions';
import ModalStyles from '../ModalStyles';
import deletePost from '../../utils/deletePost';

const PostCommentModal = ({ id, deleting, updateDeleting, updatePosts }) => {

  const onDelete = () => {
    deletePost(id)
      .then(updatePosts);
  };

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={deleting}
      onRequestClose={() => updateDeleting(!deleting)}
    >
      <TouchableOpacity
        style={{width: windowWidth, height: windowHeight}}
        onPress={() => updateDeleting(false)}
      >
        <View style={ModalStyles.centeredView}>
          <View style={[ModalStyles.modalView, ModalStyles.content]}>
            <View style={{marginBottom: 25}}>
              <Text style={ModalStyles.label}>
                Are you sure you would like to delete this post?
              </Text>
              <TouchableOpacity
                style={[ModalStyles.button, ModalStyles.buttonClose, {backgroundColor: 'lightgray', marginTop: 50}]}
                onPress={() => updateDeleting(!deleting)}
              >
                <Text style={ModalStyles.textStyle}>Cancel</Text>
              </TouchableOpacity>
              <View style={{height: 10}} />
              <TouchableOpacity
                style={[ModalStyles.button, ModalStyles.buttonClose, {backgroundColor: 'red'}]}
                onPress={onDelete}
              >
                <Text style={ModalStyles.textStyle}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default PostCommentModal;