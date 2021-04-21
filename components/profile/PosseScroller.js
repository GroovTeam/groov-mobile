import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import getPosses from '../../utils/getPosses';
import getProfile from '../../utils/getProfile';

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.name}</Text>
  </TouchableOpacity>
);

const PosseScroller = ({ updatePosse }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [DATA, setDATA] = useState(undefined);

  useEffect(() => {
    getPosses()
      .then(res => {
        getProfile()
          .then(profileRes => {
            const posses = res.data.results;
            if (posses) {
              const DATA = [];
              posses.forEach(posse => {
                if (profileRes.data.posses === undefined || !profileRes.data.posses.includes(posse))
                  DATA.push(posse);
              });
              setDATA(DATA);
            }
          })
          .catch(console.error);
      })
      .catch(console.error);
  }, []);

  const selectPosse = (posseName, posseId) => {
    updatePosse(posseId);
  };

  const renderItem = ({ item }) => {
    const backgroundColor = item.posseID === selectedId ? '#2196f3' : '#ffffff';
    const color = item.posseID === selectedId ? 'white' : 'black';

    return (
      <Item 
        item={item}
        onPress={() => {setSelectedId(item.posseID); selectPosse(item.name, item.posseID);}}
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
        keyExtractor={(item) => item.posseID}
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
    borderBottomWidth: 1,
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
    fontWeight: '100',
  },
});

export default PosseScroller;