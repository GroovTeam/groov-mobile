import React from 'react';
import { Text, View } from 'react-native';
import PostStyles from '../PostStyles';

const Empty = () => {
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
        <Text style={PostStyles.posseText}>Uh oh! Looks like there&apos;s nothing to show here :(</Text>
      </View>
    </View>
  );
};

export default Empty;