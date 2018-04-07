import React, { Component } from 'react';
import {Alert, Text, View, Button, Platform, Image, ScrollView, StyleSheet, ListView, TouchableHighlight } from 'react-native';
import { TabNavigator, StackNavigator, NavigationActions} from 'react-navigation';
import Data from './Data.js'

class MyHomeScreen extends Component {
static navigationOptions = {
    tabBarLabel: 'Home',
    title: 'About IgniteSTEM',
  };

  render() {
    return (
      <View style={styles.home}>
      
    <Image source={require('./banner.png')} style={styles.image} />
    </View>
    );
  }
}

const styles = StyleSheet.create({
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

export default MyHomeScreen;