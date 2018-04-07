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
    <View style={styles.text1}>
    <Text style={{lineHeight: 24}}>We would love to hear from you, 
    whether you want more  information on any of our previous or upcoming conferences, how you can get more involved in the 
    community, or any other concerns you may have.</Text>
    </View>
    <Text selectable={true} style={{marginLeft: Dimensions.get('window').width/15,}}>mdijkgraaf@princeton.edu</Text>
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
  text1:{
    flexDirection: 'row',
     marginLeft: Dimensions.get('window').width/15,
     marginRight: Dimensions.get('window').width/15,
     marginBottom: Dimensions.get('window').height/7,
  },
  image1: {
    resizeMode: 'contain',
    width: Dimensions.get('window').width,
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