import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PostStyles from '../PostStyles';

const CreatePosse = ({ createFunction }) => {
  return (
    <View style={[
      PostStyles.container,
      PostStyles.flexVert,
      PostStyles.topBorder,
    ]}>
      <View style={[
        PostStyles.container,
        PostStyles.flexHori,
        PostStyles.padded,
      ]}>
        <TouchableOpacity onPress={createFunction}>
          <Ionicons 
            name={'add-circle-outline'}
            size={70}
          />
        </TouchableOpacity>
        <Text style={PostStyles.posseText}>Create a new Posse!</Text>
      </View>  
    </View>
  );
};

export default CreatePosse;