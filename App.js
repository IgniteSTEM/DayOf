import React, { Component } from 'react';
import {Alert, Text, View, Button, Platform, Image, ScrollView, StyleSheet, ListView, TouchableHighlight } from 'react-native';
import { TabNavigator, StackNavigator} from 'react-navigation';
import Data from './Data.js';
import MyHomeScreen from './MyHomeScreen.js';
import Scheduler from './Scheduler.js';


const SimpleTabs = TabNavigator(
  {
    Home: {
      screen: MyHomeScreen,
    },
    Scheduler: {
      screen: Scheduler,
    },
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
);

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

export default SimpleTabs;
