import React from 'react';
import {Alert, Text, View, Button, Platform, Image, ScrollView, StyleSheet, ListView, TouchableHighlight } from 'react-native';
import { TabNavigator, StackNavigator} from 'react-navigation';
import Events from './events.js'
import { Constants, Notifications, Permissions } from 'expo';

class MyHomeScreen extends React.Component {
static navigationOptions = {
    tabBarLabel: 'Home',
    title: 'igniteSTEM',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
  };

  render() {
    return (
      <View style={styles.home}>
    <Image source={require('./ignite.jpg')} style={{width: 350, height: 500, marginBottom: 200}} />
      <Button
        onPress={() => this.props.navigation.navigate('Schedule')}
        title="Go to notifications"
      />
    </View>
    );
  }
}

var url = 'http://ignite-stem.herokuapp.com/api/schedule';
var createReactClass = require('create-react-class');
var Data = createReactClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.data),
          loaded: true,
        });
      })
      .done();
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMovie}
        style={styles.listView}
      />
    );
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading events...
        </Text>
      </View>
    );
  },

  renderMovie: function(movie) {
    return (
      <Events name = {movie.name} location = {movie.location} time = {movie.time} onPress={ () => this.notification(movie)}/>
    );
  },
  notification: function(movie){
      const localnotification = {
        title: `${movie.name} is speaking in 10 minutes`,
        body: `${movie.location}`,
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
  });


class Schedule extends React.Component {
	static navigationOptions = {
    tabBarLabel: 'Schedule',
    headerTitle: 'igniteSTEM',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
  }
   

  render() {
    return (
    <View  style={styles.container}>
    
    <ScrollView>
  
    <Data/>

    <Button
        onPress={() => this.props.navigation.navigate('Home')}
        title="Go Home"
      />
      
    </ScrollView>
    
    </View>
    );
  }
}

/*class MyProfileScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Profile',
    headerTitle: 'igniteSTEM',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
  }
   

  render() {
    return (
    );
  }
}*/




const SimpleTabs = TabNavigator(
  {
    Home: {
      screen: MyHomeScreen,
    },
    Schedule: {
      screen: Schedule,
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
    backgroundColor: 'grey'
  },
});

export default SimpleTabs;