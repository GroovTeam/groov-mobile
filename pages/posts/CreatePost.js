import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { View, Dimensions } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import Styles from '../../components/Styles';
import getProfile from '../../utils/getProfile';
import GenreSelections from '../../components/genreButtons/GenreSelections';
import { Button } from 'react-native-material-ui';
import post from '../../utils/post';
import NavStyles from '../../components/NavStyles';
import Tags from '../../utils/Tags';
import YoutubeSearchAndRecord from './YoutubeSearchAndRecord';

/*
{
    "content": "metal post",
    "posses" : ["cool guys", "group1"],
    "tags" : ["metal"]
}
*/

const window = Dimensions.get('window');
const [windowWidth, windowHeight] = [window.width, window.height];

const CreatePostStyles = StyleSheet.create({
  white: {
    backgroundColor: 'white'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: windowHeight - 100, // weird constant for now
    backgroundColor: 'white'
  },
  label: {
    fontSize: 25,
  },
  input: {
    borderColor: 'black',
    borderBottomWidth: 1,
    borderRadius: 15,
    padding: 10,
    width: windowWidth * 0.8,
  },
  multiline: {
    borderWidth: 1,
  },
  selections: {
    marginTop: -40
  },
  spacer: {
    marginTop: 40
  }
});

const CreatePost = ({ returnToFeed }) => {

  const [posses, setPosses] = useState({});
  // const [posses_og, setPosses_og] = useState([]); <-- Enable this if you need posses in their original form
  const [content, setContent] = useState('');
  const [tags, setTags] = useState(Tags);

  const [recording, setRecording] = useState(false);

  useState(() => {
  // Store the posses in the posses variable
    getProfile()
      .then(res => {
        if (res.data) {
          const posses = res.data.posses;
          if (posses) {

            const posseSelections = {};
            posses.forEach(posse => {
              posseSelections[posse] = false;
            });

            // setPosses(posses); <-- Enable this if you need posses in their original form
            setPosses(posseSelections);
          }
        }
      })
      .catch(console.error);
  }, []);

  // Update a posse by key.
  const updatePosses = (key) => {
    const newPosses = posses;
    newPosses[key] = !newPosses[key];
    setPosses(newPosses);
  };

  // Update a tag by key.
  const updateTags = (key) => {
    const newTags = tags;
    newTags[key] = !newTags[key];
    setTags(newTags);
  };

  // Parses the input data.
  const constructPost = () => {

    const selectedPosses = [];
    const selectedTags = [];

    for (const [key, value] of Object.entries(posses))
      if (value)
        selectedPosses.push(key);

    for (const [key, value] of Object.entries(tags))
      if (value)
        selectedTags.push(key);

    const body = {
      content: content,
      posses: selectedPosses,
      tags: selectedTags,
    };

    return body;
  };

  // Calls upon constructPost to generate the body, then sends it off to the API
  const makePost = () => {
    const body = constructPost();
    post(body)
      .then(() => {
        returnToFeed();
      })
      .catch(console.error);
  };

  const doneRecording = () => {
    setRecording(false);
  };
  
  if (recording) return <YoutubeSearchAndRecord doneRecording={doneRecording}/>;

  return (
    <View>
      <NavBar style={NavStyles}>
        <NavTitle style={NavStyles.title}>
          {'Create Post'}
        </NavTitle>
        <NavButton onPress={returnToFeed}>
          <NavButtonText style={Styles.blueAccentText}>
            Go back
          </NavButtonText>
        </NavButton>
      </NavBar>

      <View style={CreatePostStyles.container}>

        <View style={CreatePostStyles.spacer} />

        <Text style={CreatePostStyles.label}>
          Content
        </Text>
        <TextInput
          style={[
            CreatePostStyles.input,
            CreatePostStyles.multiline,
            {marginTop: 15}
          ]}
          onChangeText={text => setContent(text)}
          multiline={true}
        />

        <View style={CreatePostStyles.spacer} />

        <Text style={CreatePostStyles.label}>
          Select your posses
        </Text>
        <View style={CreatePostStyles.selections}>
          <GenreSelections
            data={posses}
            color={'#007BFF44'}
            fontSize={15}
            updateButtons={updatePosses}
          />
        </View>

        <View style={CreatePostStyles.spacer} />

        <Text style={CreatePostStyles.label}>
          Select your tags
        </Text>
        <View style={CreatePostStyles.selections}>
          <GenreSelections
            data={tags}
            color={'#007BFF44'}
            fontSize={15}
            updateButtons={updateTags}
          />
        </View>

        <View style={CreatePostStyles.spacer} />

        <View>
          <Button
            primary
            raised
            text='Attach Recording'
            onPress={() => setRecording(true)}
          />
        </View>

        <View style={{marginTop: 'auto', marginBottom: 50}}>
          <Button
            primary
            raised
            text='Post'
            onPress={makePost}
          />
        </View>

      </View>
    </View>
  );
};

export default CreatePost;
