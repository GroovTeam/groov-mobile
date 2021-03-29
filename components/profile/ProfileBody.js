import React from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { ButtonGroup } from 'react-native-elements';

var width = Dimensions.get('window').width;

const ProfileBodyStyles = StyleSheet.create({
  text: {
    alignSelf: 'center',
    marginTop: 15,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

const DATA = [
  {
    id: '1',
    title: 'TEST 1',
  },
  {
    id: '2',
    title: 'TEST 2',
  },
  {
    id: '3',
    title: 'TEST 3',
  },
  {
    id: '4',
    title: 'TEST 4',
  },
  {
    id: '5',
    title: 'TEST 5',
  },
  {
    id: '6',
    title: 'TEST 6',
  },
  {
    id: '7',
    title: 'TEST 7',
  },
  {
    id: '8',
    title: 'TEST 8',
  },
  {
    id: '9',
    title: 'TEST 9',
  },
  {
    id: '10',
    title: 'TEST 10',
  },
];

const Item = ({ title }) => (
  <View style={ProfileBodyStyles.item}>
    <Text style={ProfileBodyStyles.title}>{title}</Text>
  </View>
);

const renderItem = ({ item }) => (
  <Item title={item.title} />
);

const Feed = (props) => {
  if (props.selectedIndex == 0)
    return (
      <FlatList
        data={DATA}
        renderItem={renderItem}
      />
    );
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
    
    const bodyData = [
      {
        type: 'test',
      },
    ];

    const buttonGroup = () => (
      <ButtonGroup
        onPress={this.updateIndex}
        selectedIndex={selectedIndex}
        buttons={buttons}
        containerStyle={{width: width - 20, height: 35}}
      />
    );

    const bodyItem = () => {
      return <Feed selectedIndex={selectedIndex}/>;
    };

    return (
      <FlatList
        data={bodyData}
        renderItem={bodyItem}
        ListHeaderComponent={buttonGroup}
        stickyHeaderIndices={[0]}
      />
    );
  }
}