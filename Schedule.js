import React, { Component } from 'react';
import {Alert, Text, View, Button, Platform, Image, ScrollView, StyleSheet, ListView, TouchableHighlight } from 'react-native';
import { TabNavigator, StackNavigator} from 'react-navigation';
import Data from './Data.js';
import MyHomeScreen from './MyHomeScreen.js';


class Schedule extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Schedule',
        headerTitle: 'igniteSTEM',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    };

  render() {
    
      console.log(this.props.initialState);
    return (
    <View  style={styles.container}>
    <ScrollView>
  
    <Data initialState={this.props.initialState} callbackParent={this.props.callbackParent} onChange={()=>this.handleChange()}/>

    <Button
        onPress={() => this.props.navigation.navigate('Home')}
        title="Go Home"
      />
      
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

export default Schedule;
