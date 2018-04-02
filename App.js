import React, { Component } from 'react';
import {Alert, Text, View, Button, Platform, Image, ScrollView, StyleSheet, ListView, TouchableOpacity, AsyncStorage } from 'react-native';
import { TabNavigator, StackNavigator, DrawerNavigator, NavigationActions} from 'react-navigation';
import MyHomeScreen from './MyHomeScreen.js';
import ContactUs from './ContactUs.js';
import Schedule from './Schedule.js';
import MyAgenda from './MyAgenda.js';
import { Icon } from 'react-native-elements'

var url = 'http://ignite-stem.herokuapp.com/api/schedule';

//var textElem = React.createElement(Data);

class Scheduler extends React.Component {
    constructor() {
      super();
      this.state = {
        loaded: false,
        buttons: [],
        currentScreen: 'Home'
      };
      
      this.getKey();
      //if(this.state.)
      //console.log(this.state.buttons);
   }

   async getKey() {
    try {
      const value = await AsyncStorage.getItem('@MySuperStore:key');
      this.setState({buttons: JSON.parse(value)});
    } catch (error) {
      this.fetchData();
    }
  }

  async saveKey(value) {
    try {
      await AsyncStorage.setItem('@MySuperStore:key', value);
    } catch (error) {
      console.log("Error saving data" + error);
    }
  }

  fetchData() {
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
          var length = responseData.data.length;
          var buttons = [];
          for (var i = 0; i < length; i++) {
              buttons.push({
                    ...responseData.data[i],
                  row: i,
                  button: false,
              });
          }
          // console.log("Loaded");
        this.setState({
          // dataSource: this.state.dataSource.cloneWithRows(responseData.data),
          loaded: true,
          buttons,
          currentScreen: 'Home'
        });
      })
      .done();
  }

  onChildChanged(newState, rowID, Screen){
    var dataClone = this.state.buttons;
      // console.log('Child changed');
      // console.log(dataClone);
    dataClone[rowID].button = newState;
    this.setState({
      buttons: dataClone,
      currentScreen: Screen
    });
    //this.resetKey();
    this.saveKey(JSON.stringify(this.state.buttons));
  }

  render() {
    //const { navigate } = this.props.navigation.state.routeName;
      // console.log("Parent:");
      // console.log(this.state);
      if (this.state.buttons.length == 0) {
          // console.log(this.state.buttons.length);
          return (<Text>Loading...</Text>);
      }
      
    return (
      <AppNavigator screenProps={{ initialState:this.state.buttons, callbackParent:(newState, rowID, Screen) => this.onChildChanged(newState, rowID, Screen)}} />
    );
  }
}


const SimpleTabs = TabNavigator(
          {
            Scheduler: {
              screen: Schedule
            },
            MySchedule: {
              screen: MyAgenda
            },
          },
            
          {
            title: 'Scheduler',
            tabBarPosition: 'top',
            animationEnabled: true,
            swipeEnabled: true,
    tabBarOptions: {
        showIcon: true,
        activeTintColor: 'blue',
        inactiveTintColor:'#999999',
        style: {
            backgroundColor: '#fff',
            margin: 0,
            paddingBottom: 10,
            height: 0
        },
        tabStyle: {
          height: 30,
           margin: 0,
        },
        labelStyle:{
          margin: 0,
          marginTop: 0
        },
        indicatorStyle: {
            backgroundColor: 'white'
        }
            
          }
        }
        );

const MyApp = DrawerNavigator({
  Home: {
    screen: MyHomeScreen,
  },
  Scheduler: {
    screen: SimpleTabs,
  },
  ContactUs: {
    screen: ContactUs,
  },
  },
);

const MenuButton = (props) => {
  return (
  <View>
    <TouchableOpacity onPress={() => {props.navigation.navigate('DrawerToggle')}} style={{padding: 10, marginLeft:10}}>
      <Icon name="bars" color="black" type={"font-awesome"}/>
    </TouchableOpacity>
  </View>
  );
};

const AppNavigator = new StackNavigator({
  Main: {
    screen: MyApp,
    navigationOptions: ({ navigation }) => (
      {headerLeft : <MenuButton navigation={navigation} />,
  }),
  }
});



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

export default Scheduler;
