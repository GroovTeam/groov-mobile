import React, { useState } from 'react';
import { Text } from 'react-native';
import { View,  } from 'react-native';
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import Styles from '../../components/Styles';
import getPosses from '../../utils/getPosses';

/*
{
    "content": "metal post",
    "posses" : ["cool guys", "group1"],
    "tags" : ["metal"]
}
*/

const CreatePost = ({ setPosting }) => {

  let posses = [];

  getPosses()
    .then(res => {
      if (res.data)
        posses = res.data.results;
      console.log(posses);
    })
    .catch(console.error);

  useState(() => {

  }, []);

  const [content, setContent] = useState('');
  const [selectedPosses, setSelectedPosses] = useState([]);
  const [tags, setTags] = useState([]);

  return (
    <View>
      <NavBar>
        <NavTitle style={Styles.text}>
          {'Create Post'}
        </NavTitle>
        <NavButton onPress={() => setPosting(false)}>
          <NavButtonText style={Styles.blueAccentText}>
            Go back
          </NavButtonText>
        </NavButton>
      </NavBar> 
      <View>
        <Text>
          test
        </Text>
      </View>
    </View>
  );
};

export default CreatePost;
