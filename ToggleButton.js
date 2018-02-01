import React from 'react';
import {Text, View, Image, StyleSheet, TouchableHighlight } from 'react-native';

class ToggleButton extends React.Component {

constructor(props) {
    super(props);
    this.state = {
      button: this.props.initialState[this.props.rowID],
    }
    
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.props.initialState) !== JSON.stringify(nextProps.initialState)) 
    {
           this.setState({ button: nextProps.initialState });  
    }
    
}

 clickedMe(){
    this.props.onPress();
    var newState = !this.state.button;
    this.setState({ button: newState }); // we update our state
    this.props.callbackParent(newState, this.props.rowID);
 }

 changed(){
	var newState = !this.state.button;
    this.setState({ button: newState }); // we update our state
    this.props.callbackParent(newState, this.props.rowID);
 }


/*
 stateHandler() {
 var current = this.state.button;
 this.props.theStateHandle(current);
 }*/
  render() {
    return (
      <TouchableHighlight underlayColor='rgba(0,0,0,.1)' style={styles.thumbnail} onPress={() => this.clickedMe()} onChange={() => this.changed()}>
          <Image
          source={require('./igniteStemLogo.png')}
          style={styles.picture}
         >
            <View style={styles.picture}>
            
            	<Image
          			source={require('./checkbox.png')}
          			style={[styles.checkVisible, this.state.button ? {opacity: 1} : {opacity: 0}]}
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