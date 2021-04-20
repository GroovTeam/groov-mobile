import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import GenreSelections from '../genreButtons/GenreSelections';
import axios from 'axios';

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

const ProfileHeader = ({ data }) => {

  const [profilePhoto, setProfilePhoto] = useState(undefined);

  useEffect(() => {
    // Get their image from the server.
    axios.get(data.imagePath)
    .then(res => setProfilePhoto(res.request.responseURL))
    .catch(err => console.error(err));
  }, []);

   

  return (
    <View style={ProfileHeaderStyles.container}>
      <Image
        style={ProfileHeaderStyles.image}
        source={{uri: profilePhoto}}
      />
      <Text style={ProfileHeaderStyles.nameText}>{data.firstName + ' ' + data.lastName}</Text>
      <Text style={ProfileHeaderStyles.userText}>{'@' + data.username}</Text>
      <GenreSelections
        data={data.tagLikes}
        isStatic='true'
      />
      <Text style={ProfileHeaderStyles.bioText}>{data.bio}</Text>
    </View>
  );
};

export default ProfileHeader;