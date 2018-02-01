import React, { Component } from 'react';
import {Alert, Text, View, Button, Platform, Image, ScrollView, StyleSheet, ListView, TouchableHighlight } from 'react-native';
import { TabNavigator, StackNavigator} from 'react-navigation';
import Data from './Data.js';
import Schedule from './Schedule.js';
import MyAgenda from './MyAgenda.js';
import MyHomeScreen from './MyHomeScreen.js';


var textElem = React.createElement(Data);

class Scheduler extends React.Component {
    constructor() {
      super();
      this.state = {
        buttons: this.populateStates(),
      };
   }

   populateStates() {
    var buttons = [];
    for (var i = 0; i < 6; i++) {
      buttons.push({
        row: i,
        button: false,
      });
    }

    return buttons;
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.props.initialState) !== JSON.stringify(nextProps.initialState)) 
    {
           this.setState({ button: nextProps.initialState });  
    }
    
}

  onChildChanged(newState, rowID){
    var dataClone = this.state.buttons;
    console.log(rowID);
    dataClone[rowID].button = newState;
    this.setState({
      buttons: dataClone
    });
    console.log(this.state.buttons);
    }
   

  render() {
    return (
      <View>
        <Schedule initialState={this.state.buttons} callbackParent={(newState, rowID) => this.onChildChanged(newState, rowID)}/>
        <MyAgenda initialState={this.state.buttons} callbackParent={(newState, rowID) => this.onChildChanged(newState, rowID)}/>
      </View>
    );
  }
}

/*const SimpleTabs = TabNavigator(
  {
    Home: {
      screen: MyHomeScreen,
    },
    Schedule: {
      screen: Schedule,
    },
    MyAgenda: {
      screen: MyAgenda,
    }
  },
  {
    title: 'igniteSTEM',
    tabBarPosition: 'top',
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? '#e91e63' : '#fff',
      style: {
      marginTop: Platform.OS === 'ios' ? 50 : 24
    },

    },
  }
);*/


const styles = StyleSheet.create({
  container: {
  	marginTop: 3,
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between' 
  },
  home: {
    flex: 1,
    alignItems: 'stretch'
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  },
});

export default Scheduler;
