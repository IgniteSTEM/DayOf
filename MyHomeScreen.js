import React, { Component } from 'react';
import {Alert, Text, View, Button, Platform, Image, ScrollView, StyleSheet, ListView, TouchableHighlight } from 'react-native';
import { TabNavigator, StackNavigator} from 'react-navigation';
import Data from './Data.js'
import Scheduler from './Scheduler.js';

class MyHomeScreen extends Component {
static navigationOptions = {
    tabBarLabel: 'Home',
    title: 'igniteSTEM',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
  };

  render() {
    //console.log(this.props);
    //this.props.callbackScreen(this.props.navigation.state.routeName);
    return (
      <View style={styles.home}>
      
    <Image source={require('./home.jpg')} style={styles.image} />
      {/*<Button
        onPress={() => this.props.navigation.navigate('Schedule')}
        title="Go to notifications"
      />*/}
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