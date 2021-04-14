import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import getFile from '../../utils/getFile';
import getBeats from '../../utils/getBeats';

const Item = ({ item, onPress, backgroundColor, textColor}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.displayName}</Text>
  </TouchableOpacity>
);

/**
 * Give the user a selection menu for their beats
 * 
 * @param {Callback} updateBeat update the currently selected beat in the parent component 
 */
const BeatScroller = ({ updateBeat }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [DATA, setDATA] = useState(undefined);

  // Kind of convoluted, but get all the categories, and parse them into display fields
  useEffect(() => {
    getBeats()
      .then(res => {
        const categories = res.data.results;
        if (categories) {
          const DATA = [];
          categories.forEach(category => {
            const beats = category.beats;
            beats.forEach(beat => {
              beat.displayName = beat.title + ' - ' + category.type;
              DATA.push(beat);
            });
          });
          setDATA(DATA);
        }
      })
      .catch(console.error);
  }, []);

  const selectBeat = async (displayName, link) => {
    getFile(link).then(beat => updateBeat(displayName, link, beat));
  };

  const renderItem = ({ item }) => {
    const backgroundColor = item.link === selectedId ? '#2196f3' : '#ffffff';
    const color = item.link === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => {setSelectedId(item.link); selectBeat(item.displayName, item.link);}}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.link}
        extraData={selectedId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 300,
    width: '70%',
    borderTopWidth: 1,
    borderBottomWidth: 1
  },
  item: {
    alignItems: 'center',
    paddingVertical: 5,
    margin: 5,
    borderWidth: 0.5,
    borderRadius: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '100'
  },
});

export default BeatScroller;