import React, { Component } from 'react';
import {Alert, Text, View, Button, Platform, Image, ScrollView, StyleSheet, ListView, TouchableHighlight } from 'react-native';
import { TabNavigator, StackNavigator} from 'react-navigation';
import Data from './Data.js';
import MyHomeScreen from './MyHomeScreen.js';

class MyAgenda extends React.Component {
  static navigationOptions = {
        tabBarLabel: 'My Agenda',
        headerTitle: 'My Agenda',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    };

  render() {
    //console.log(this.props.navigation);
    //this.props.callbackScreen('MySchedule');
    return (
    <View  style={styles.container}>
      <View style={styles.noEventsView}>
        <Text style={styles.noEvents}>
          No Events Selected! Tap the Flame Next To Events To Add Reminders and Create Your Personalized Agenda! 
        </Text>
        {/*<Button
          onPress={() => this.props.navigation.navigate('Scheduler')}
          title="Go to settings tab"
          style={styles.noEvents}
        />*/}
      </View>
      <ScrollView>

      <Data personalSchedule = {0} initialState={this.props.screenProps.initialState} screen = {'MySchedule'} callbackParent={this.props.screenProps.callbackParent} onChange={()=>this.handleChange()}/>
        
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
  noEvents: {
    color: '#A5A5A5',
    //fontWeight: 'bold',
    fontSize: 12,
    position: 'absolute',
    paddingTop: 10
  },
  noEventsView:{
    paddingLeft: 15,
    paddingRight: 15,
    marginLeft: .2,
    alignItems: 'center'
  }
});

export default MyAgenda;
