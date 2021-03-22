import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import GenreSelections from '../components/GenreSelections';
import favicon from '../assets/favicon.png';

const ProfileHeaderStyles = StyleSheet.create ({
  container: {
    alignItems: 'center',
    marginVertical: 5,
  },
  nameText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  userText: {
    fontSize: 18,
  },
  bioText: {
    fontSize: 15,
    marginTop: 5,
    textAlign: 'center',
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
      <Text style={ProfileHeaderStyles.nameText}>{data.name}</Text>
      <Text style={ProfileHeaderStyles.userText}>{data.user}</Text>
      <GenreSelections
        data={data.genres}
        isStatic='true'
      />
      <Text style={ProfileHeaderStyles.bioText}>{data.bio}</Text>
    </View>
  );
};

export default ProfileHeader;