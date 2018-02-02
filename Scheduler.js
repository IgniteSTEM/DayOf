import React, { Component } from 'react';
import {Alert, Text, View, Button, Platform, Image, ScrollView, StyleSheet, ListView, TouchableHighlight } from 'react-native';
import { TabNavigator, StackNavigator} from 'react-navigation';
import Data from './Data.js';
import Schedule from './Schedule.js';
import MyAgenda from './MyAgenda.js';
import MyHomeScreen from './MyHomeScreen.js';

var url = 'http://ignite-stem.herokuapp.com/api/schedule';

var textElem = React.createElement(Data);

class Scheduler extends React.Component {
    constructor() {
      super();
      this.state = {
          loaded: false,
        buttons: this.populateStates(),
      };
   }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
          var length = responseData.data.length;
          var buttons = [];
          for (var i = 0; i < length; i++) {
              buttons.push({
                    ...responseData.data[i],
                  row: i,
                  button: false,
              });
          }
          console.log("Loaded");
        this.setState({
          // dataSource: this.state.dataSource.cloneWithRows(responseData.data),
          loaded: true,
          buttons,
        });
      })
      .done();
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
      console.log('Child changed');
      console.log(dataClone);
    dataClone[rowID].button = newState;
    this.setState({
      buttons: dataClone
    });
    }
   

  render() {
      console.log("Parent:");
      console.log(this.state);
      if (this.state.buttons.length == 0) {
          console.log(this.state.buttons.length);
          return (<Text>Loading...</Text>);
      }
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
