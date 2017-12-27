import React from 'react';
import {Alert, Text, View, Button, Platform, Image, ScrollView, StyleSheet, TouchableHighlight } from 'react-native';
import { Notifications } from 'expo';
import {StackNavigator} from 'react-navigation';

class Events extends React.Component {
  constructor(props) {
    super(props)
  }

 

  render() {
   
  	const {time, name, location} = this.props;
    return (
     <View style = {styles.event} >
     <TouchableHighlight onPress={this.props.onPress} title="Remind me" style={styles.thumbnail}>
        <Image
          source={require('./igniteStemLogo.png')}
          style={styles.thumbnail}
        />
      </TouchableHighlight>
      <View style = {styles.rightContainer}>
     	<Text style = {styles.name}> {name} </Text>
     	<Text style = {styles.location}> Location: {location} </Text>
     	<Text style = {styles.time}> Time: {time} </Text>
      </View>
     </View>
    );
  }
}
/*const StacksOnTabs = StackNavigator({
  Root: {
    screen: SimpleTabs,
  },
  Profile: {
    screen: MyProfileScreen,
    path: '/people/:name',
  },
  });*/

const styles = StyleSheet.create({
event: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#DDDDDD',
    borderWidth: 0.2,
    paddingLeft: 5,
    marginLeft: .2
  },
  name: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    
  },
  time: {
    fontSize:20,
    color: '#A5A5A5',
    textAlign: 'left',
  },
  location: {
    fontSize:20,
    color: '#A5A5A5',
    textAlign: 'left',
  },
  rightContainer: {
    flex: 1,
  },
  thumbnail: {
    width: 30,
    height: 40,
  },
});

export default Events;
