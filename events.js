import React from 'react';
import {Alert, Text, View, Button, Platform, Image, ScrollView, StyleSheet, TouchableHighlight } from 'react-native';
import { Notifications } from 'expo';
import {StackNavigator} from 'react-navigation';
import ToggleButton from './ToggleButton.js'

class Events extends React.Component {
  constructor({initialState}) {
    super();
    this.state = {
      button: initialState,
    }
    /*this.handleState = this.handleState.bind(this);*/
  }

  /*handleState(theState){
         this.setState({button: theState});
         console.log(theState);
    }*/
   componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.props.initialState) !== JSON.stringify(nextProps.initialState)) 
    {
           this.setState({ button: nextProps.initialState });  
    }
    
}

  render() {

  	const {time, name, location} = this.props;
    return (
     <View style = {styles.event} >
     <ToggleButton onPress={this.props.onPress} initialState={this.props.initialState} callbackParent={this.props.callbackParent}
     rowID={this.props.rowID} screen = {this.props.screen}/>
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
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
    //borderRadius: 4,
    paddingLeft: 5,
    marginLeft: .2,
    //marginBottom: 5,
    marginTop: 3,
    paddingTop: 5, 
    paddingBottom: 5,

  },
  name: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'left',
    paddingLeft: 15,
    paddingBottom: 5,
    
  },
  time: {
    fontSize:15,
    color: '#A5A5A5',
    textAlign: 'left',
    paddingLeft: 15,
  },
  location: {
    fontSize:15,
    color: '#A5A5A5',
    textAlign: 'left',
    paddingLeft: 15,
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
