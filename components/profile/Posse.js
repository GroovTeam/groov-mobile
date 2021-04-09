import React, { useState, useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import PostStyles from '../PostStyles';
import axios from 'axios';

const Posse = ({ data }) => {
  const [possePhoto, setPossePhoto] = useState(undefined);

  useEffect(() => {
    axios.get(data.imagePath)
      .then(res => setPossePhoto(res.request.responseURL))
      .catch(err => console.error(err));
  }, []);

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
        <Image
          style={PostStyles.posseImage}
          source={{uri: possePhoto}}
        />
        <Text style={PostStyles.posseText}>{data.name}</Text>
      </View>
    </View>
  );
};

export default Posse;