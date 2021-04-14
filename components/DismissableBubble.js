import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DismissableBubble = ({ text, dismiss, size }) => {

  const DBStyles = StyleSheet.create({
    internalContainer: {
      backgroundColor: 'white',
      paddingLeft: 10,
      paddingRight: 5,
      paddingVertical: 2,
      height: 'auto',
      overflow:'hidden',
      borderRadius: 25,
      borderColor: 'black',
      borderWidth: 0.8,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    text: {
      color: 'rgb(0,0,0)',
      fontSize: size ? size : 25,
      fontWeight: '200',
      textAlign: 'center',
    },
    dismiss: {
      marginLeft: 'auto'
    }
  });

  return (
    <View style={DBStyles.internalContainer}>
      <Text style={DBStyles.text}>{text}</Text>
      <TouchableOpacity
        onPress={dismiss}
        style={{marginLeft: 10}}
      >
        <Ionicons
          name='ios-close-circle-outline'
          color='crimson'
          size={size}
        />
      </TouchableOpacity>
    </View>
  );
};

export default DismissableBubble;