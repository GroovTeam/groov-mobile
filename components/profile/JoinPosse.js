import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PostStyles from '../PostStyles';

const JoinPosse = ({ joinFunction }) => {
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
        <TouchableOpacity onPress={joinFunction}>
          <Ionicons 
            name={'list-circle-outline'}
            size={70}
          />
        </TouchableOpacity>
        <Text style={PostStyles.posseText}>Join an existing Posse!</Text>
      </View>
    </View>
  );
};

export default JoinPosse;