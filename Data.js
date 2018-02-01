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
  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.data),
          loaded: true,
          buttons: this.props.initialState,
        });
      })
      .done();
  }

  render() {
    //console.log(this.props);
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
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
    return (
      <Events name = {rowData.name} location = {rowData.location} time = {rowData.time} onPress={ () => this.notification(rowID, rowData)}
      initialState={this.props.initialState} callbackParent={this.props.callbackParent} rowID={rowID} />
    );
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





// import React, { Component } from 'react';
// import {Text, View, Platform, Image, ScrollView, StyleSheet, ListView, TouchableHighlight } from 'react-native';
// import Events from './events.js'
// import { Constants, Notifications, Permissions } from 'expo';

// var url = 'http://ignite-stem.herokuapp.com/api/schedule';
// var createReactClass = require('create-react-class');

// var Data = createReactClass({

//   getInitialState: function() {
//     return {
//       dataSource: new ListView.DataSource({
//         rowHasChanged: (row1, row2) => row1 !== row2,
//       }),
//       buttons: this.props.initialState,
//       loaded: false,
//     };
//     /*this.handleState = this.handleState.bind(this)  */
//   },

//   componentDidMount: function() {
//     this.fetchData();
//   },

//   fetchData: function() {
//     fetch(url)
//       .then((response) => response.json())
//       .then((responseData) => {
//         this.setState({
//           dataSource: this.state.dataSource.cloneWithRows(responseData.data),
//           loaded: true,
//           buttons: this.props.initialState,
//         });
//       })
//       .done();
//   },

//   render: function() {
//     console.log(this.props);
//     if (!this.state.loaded) {
//       return this.renderLoadingView();
//     }

//     return (
//       <ListView
//         dataSource={this.state.dataSource}
//         renderRow={this.renderMovie}
//         style={styles.listView}
//       />
//     );
//   },

//   renderLoadingView: function() {
//     return (
//       <View style={styles.container}>
//         <Text>
//           Loading events...
//         </Text>
//       </View>
//     );
//   },

//   handleState: function(newState, rowID, rowData){
    
//     rowData.button = newState;
//     var dataClone = this.state.buttons;
//     dataClone[rowID].button = rowData.button;
//     this.setState({
//       buttons: dataClone
//     });
//     },

//   renderMovie: function(rowData: string, sectionID: number, rowID: number) {
//     return (
//       <Events name = {rowData.name} location = {rowData.location} time = {rowData.time} onPress={ () => this.notification(rowID, rowData)}
//       initialState={this.state.buttons} callbackParent={this.props.callbackParent} rowID={this.rowID} />
//     );
//   },

//   notification: function(rowID, rowData){
//       const localnotification = {
//         title: `${rowData.name} is speaking in 10 minutes`,
//         body: `${rowData.location}`,
//         android: {
//           sound: true,
//         },
//         ios: {
//           sound: true,
//         },
//       };

//       let sendAfterFiveSeconds = Date.now();
//       sendAfterFiveSeconds += 1000;

//       const schedulingOptions = { time: sendAfterFiveSeconds };
//       Notifications.scheduleLocalNotificationAsync(
//         localnotification,
//         schedulingOptions
//       );
//     }
//   });

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 3,
//     flexGrow: 1,
//     flexDirection: 'column',
//     justifyContent: 'space-between' 
//   },
// });

// export default Data;