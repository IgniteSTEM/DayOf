import React, { Component } from 'react';
import {Alert, Text, View, Button, Platform, Image, ScrollView, StyleSheet, ListView, TouchableHighlight } from 'react-native';
import { TabNavigator, StackNavigator} from 'react-navigation';
import Data from './Data.js';
import MyHomeScreen from './MyHomeScreen.js';

class MyAgenda extends React.Component {
  static navigationOptions = {
        tabBarLabel: 'My Agenda',
        headerTitle: 'igniteSTEM',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    };

  render() {
    //this.props.callbackScreen('MySchedule');
    return (
    <View  style={styles.container}>
    
    <ScrollView>
  
    <Data personalSchedule = {0} initialState={this.props.initialState} screen = {'MySchedule'} callbackParent={this.props.callbackParent} onChange={()=>this.handleChange()}/>
      
    </ScrollView>
    
    </View>
    );
  }
}




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

export default MyAgenda;
