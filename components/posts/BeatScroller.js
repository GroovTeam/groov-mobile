import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Text, TouchableOpacity } from 'react-native';

const DATA = [
  {
    id: '1',
    title: 'Kanye - Free',
    first: true
  },
  {
    id: '2',
    title: 'Kanye - Floating',
  },
  {
    id: '3',
    title: 'Another one',
  },
  {
    id: '4',
    title: 'Another one',
  },
  {
    id: '5',
    title: 'Another one',
  },
  {
    id: '6',
    title: 'Another one',
  },
  {
    id: '7',
    title: 'Another one',
  },
  {
    id: '8',
    title: 'Another one',
  },
  {
    id: '9',
    title: 'Another one',
  },
];

const Item = ({ item, onPress, backgroundColor, textColor}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);

const BeatScroller = () => {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? '#2196f3' : '#ffffff';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
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
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: '60%'
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