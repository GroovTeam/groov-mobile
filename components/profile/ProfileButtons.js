import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { windowWidth } from '../../utils/Dimensions';

const ProfileButtonsStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});

export default class ProfileButtons extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedIndex: 0
    };
    this.updateIndex = this.updateIndex.bind(this);
    this.updateFunction = this.props.function;
  }
    
  updateIndex (selectedIndex) {
    this.setState({selectedIndex});
    this.updateFunction(selectedIndex);
  }

  render () {
    const buttons = ['Posses', 'Likes', 'Posts'];
    const { selectedIndex } = this.state;

    return (
      <View style={ProfileButtonsStyles.container}>
        <ButtonGroup 
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{width: windowWidth - 20, height: 35}}
        />
      </View>
    );
  }
}