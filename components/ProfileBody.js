import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { ButtonGroup } from 'react-native-elements';

var width = Dimensions.get('window').width;

const ProfileBodyStyles = StyleSheet.create({
  text: {
    alignSelf: 'center',
    marginTop: 15,
  },
});

const Feed = (props) => {
  if (props.selectedIndex == 0)
    return <Text style={ProfileBodyStyles.text}>Communities!</Text>;
  else
    return <Text style={ProfileBodyStyles.text}>Likes!</Text>;
};

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
      <View>
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{width: width - 20, height: 35}}
        />
        <Feed selectedIndex={selectedIndex}/>
      </View>
    );
  }
}