import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { ButtonGroup } from 'react-native-elements';

var width = Dimensions.get('window').width;

const ProfileBodyStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});

export default class ProfileBody extends React.Component {
  constructor () {
    super();
    this.state = {
      selectedIndex: 0
    };
    this.updateIndex = this.updateIndex.bind(this);
  }
    
  updateIndex (selectedIndex) {
    this.setState({selectedIndex});
  }

  render () {
    const buttons = ['Communities', 'Likes'];
    const { selectedIndex } = this.state;

    return (
      <View style={ProfileBodyStyles.container}>
        <ButtonGroup 
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{width: width - 20, height: 35}}
        />
      </View>
    );
  }
}