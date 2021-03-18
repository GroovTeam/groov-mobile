import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import GenreSelections from '../components/GenreSelections';
import Styles from '../components/Styles';
import favicon from '../assets/favicon.png';

const ProfileHeaderStyles = StyleSheet.create ({
  container: {
    alignItems: 'center',
    marginVertical: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

const ProfileHeader = ({data}) => {
  
  return (
    <View style={ProfileHeaderStyles.container}>
      <Image
        style={ProfileHeaderStyles.image}
        source={favicon}
      />
      <Text style={Styles.text}>{data.user}</Text>
      <GenreSelections
        data={data.genres}
        isStatic='true'
        style={ProfileHeaderStyles.container}
      />
    </View>
  );
};

export default ProfileHeader;