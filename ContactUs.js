import React, { Component } from 'react';
import {Alert, Text, View, Dimensions, Button, Platform, Image, ScrollView, StyleSheet, ListView, TouchableHighlight } from 'react-native';
import { TabNavigator, StackNavigator} from 'react-navigation';
import Data from './Data.js'

class ContactUs extends Component {
static navigationOptions = {
    title: 'Contact Us',
  };

  render() {
    return (
      <View style={styles.home}>
    <Image source={require('./logo.png')} style={styles.image1}/>
    <Image source={require('./contactus.png')} style={styles.image2} />
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
    backgroundColor: '#fff',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  image1: {
    resizeMode: 'contain',
    width: Dimensions.get('window').width,
    marginBottom: 0
  },
  image2: {
    resizeMode: 'contain',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height/3,
    marginLeft: 10,
    marginTop: 0
  },
});

export default ContactUs;