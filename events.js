import React from 'react';
import {Alert, Text, View, Button, Platform, Image, ScrollView, StyleSheet, TouchableHighlight } from 'react-native';
import { Notifications } from 'expo';
import {StackNavigator} from 'react-navigation';

class Events extends React.Component {
  constructor({initialState}) {
    super();
    this.state = {
      button: initialState,
    }
  }

  clickedMe(){
    var newState = !this.props.initialState.button;
    this.props.callbackParent(newState, this.props.rowID, this.props.screen);
 }

   componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.props.initialState) !== JSON.stringify(nextProps.initialState)) 
    {
           this.setState({ button: nextProps.initialState });  
    }
    
}

  render() {

  	const {time, name, location} = this.props;
    return (
     <TouchableHighlight underlayColor='rgba(0,0,0,0)' onPress={() => this.clickedMe()}>
        <View style={styles.event}>
            <Image
            source={require('./igniteStemLogo.png')}
            style={styles.picture}>

              <View style={styles.picture}>
                <Image
                  source={require('./checkbox.png')}
                  style={[styles.checkVisible, this.props.initialState.button ? {opacity: 1} : {opacity: 0}]}>
                </Image>
              </View>
            </Image>

            <View style = {styles.rightContainer}>
              <Text style = {styles.name}> {name} </Text>
              <Text style = {styles.location}> Location: {location} </Text>
              <Text style = {styles.time}> Time: {time} </Text>
            </View>
          </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
event: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderColor: '#DDDDDD',
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
    paddingLeft: 5,
    marginLeft: .2,
    marginTop: 3,
    paddingTop: 5, 
    paddingBottom: 5,
    padding: 10

  },
  name: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'left',
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 5,
  },
  time: {
    fontSize:15,
    color: '#A5A5A5',
    paddingLeft: 15,
    flex: 10
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
     width: 40,
     height: 53,
    marginLeft: 7,
  },
  picture: {
    width: 40,
    height: 53,
  },
  checkVisible: {
    width: 10,
    height: 10,
  },
});

export default Events;
