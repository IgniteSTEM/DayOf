import React, { Component } from 'react';
import {Text, View, Platform, Image, ScrollView, StyleSheet, ListView, TouchableHighlight } from 'react-native';
import Events from './events.js'
import { Constants, Notifications, Permissions } from 'expo';

var url = 'http://ignite-stem.herokuapp.com/api/schedule';
var createReactClass = require('create-react-class');

class Data extends Component {

  constructor({initialState}) {
    super();
     
      this.state = {
        buttons: initialState,
        loaded: false,
        dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        }),
      }
    }
    /*this.handleState = this.handleState.bind(this)  */

    componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.props.initialState) !== JSON.stringify(nextProps.initialState)) 
    {
           this.setState({ buttons: nextProps.initialState });  
    }
    
}

  render() {
    // console.log(this.props.initialState);
    const ds = this.state.dataSource.cloneWithRows(this.props.initialState);

    return (
      <ListView
        dataSource={ds}
        renderRow={this.renderMovie.bind(this)}
        style={styles.listView}
      />
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading events...
        </Text>
      </View>
    );
  }


  renderMovie(rowData: string, sectionID: number, rowID: number) {
      // console.log("Rendering row");
      // console.log(rowData);
      // console.log(this.props.initialState[rowID]);
    if(this.props.personalSchedule == 0 && this.state.buttons[rowID].button == true || this.props.personalSchedule == 1) {
    return (
      <Events name = {rowData.name} location = {rowData.location} time = {rowData.time} onPress={ () => this.notification(rowID, rowData)}
      initialState={this.props.initialState[rowID]} screen = {this.props.screen} callbackParent={this.props.callbackParent} rowID={rowID} />
      );
    }
    else return (<View/>);
  }

  notification(rowID, rowData){
      const localnotification = {
        title: `${rowData.name} is speaking in 10 minutes`,
        body: `${rowData.location}`,
        android: {
          sound: true,
        },
        ios: {
          sound: true,
        },
      };

      let sendAfterFiveSeconds = Date.now();
      sendAfterFiveSeconds += 1000;

      const schedulingOptions = { time: sendAfterFiveSeconds };
      Notifications.scheduleLocalNotificationAsync(
        localnotification,
        schedulingOptions
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
});

export default Data;
