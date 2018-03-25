import React from 'react';
import {Text, View, Image, StyleSheet, TouchableHighlight } from 'react-native';

class ToggleButton extends React.Component {

 clickedMe(){
    this.props.onPress();
    var newState = !this.props.initialState.button;
     // console.log("Passing changed(): ", newState);
    this.props.callbackParent(newState, this.props.rowID, this.props.screen);
 }


/*
 stateHandler() {
 var current = this.state.button;
 this.props.theStateHandle(current);
 }*/
  render() {
      // console.log(this.props);
    return (
      <TouchableHighlight underlayColor='rgba(0,0,0,0)' style={styles.thumbnail} onPress={() => this.clickedMe()}>
          <Image
          source={require('./igniteStemLogo.png')}
          style={styles.picture}
         >
            <View style={styles.picture}>
            
            	<Image
          			source={require('./checkbox.png')}
          			style={[styles.checkVisible, this.props.initialState.button ? {opacity: 1} : {opacity: 0}]}
         			>
         			</Image>
            </View>
          </Image>
      </TouchableHighlight>
    );
  }
}
/*{[styles.picture, this.state.button ? {backgroundColor: 'rgba(0,0,0,.2)'} : {backgroundColor:'transparent'}]}>*/
/*<Text style={styles.choicetext}>{this.props.label}</Text>.      rgba(80,94,104,0.7)*/

const styles = StyleSheet.create({
  thumbnail: {
    width: 40,
    height: 53,
    marginLeft: 7,
  },
  picture: {
    width: 40,
    height: 53,
  },
  checkVisible: {
    width: 10,
    height: 10,
  },
});

export default ToggleButton;
