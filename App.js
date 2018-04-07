import React, { Component } from 'react';
import {Alert, Text, View, Button, StyleSheet, Dimensions, StatusBar, Platform, Image, ScrollView, ListView, TouchableOpacity, AsyncStorage } from 'react-native';
import { TabNavigator, StackNavigator, DrawerNavigator, NavigationActions} from 'react-navigation';
import MyHomeScreen from './MyHomeScreen.js';
import ContactUs from './ContactUs.js';
import Schedule from './Schedule.js';
import MyAgenda from './MyAgenda.js';
import { Icon } from 'react-native-elements';

var url = 'http://ignite-stem.herokuapp.com/api/schedule';

class Scheduler extends React.Component {
    constructor() {
      super();
      this.state = {
        loaded: false,
        buttons: [],
        agenda: [],
        currentScreen: 'Home'
      };
      this.getKey(18);
      this.fetchData();
   }

   async getKey(length) {
    try {
      const value = await AsyncStorage.getItem('@MySuperStore:key');
      if (value == null) {
        let error = new Error();
        throw error;
      }
      this.setState({agenda: JSON.parse(value)});
    } catch (error) {
      var temp = [];
      for(var i = 0; i<length; i++) {
        temp.push(false);
      }
      this.setState({agenda: temp});
    }

  }

  async saveKey(value) {
    try {
      await AsyncStorage.setItem('@MySuperStore:key', value);
    } catch (error) {
      //console.log("Error saving data" + error);
    }
  }

  fetchData() {
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
          var length = responseData.data.length;
          var buttons = [];
          //console.log(JSON.stringify(this.state.agenda));
          for (var i = 0; i < length; i++) {
              buttons.push({
                    ...responseData.data[i],
                  row: i,
                  button: this.state.agenda[i],
              });
              //console.log(this.state.agenda[i]);
          }
        this.wait(3000);
        this.setState({
          loaded: true,
          buttons,
          currentScreen: 'Home',
        });
      })
      .done();
  }

  wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

  onChildChanged(newState, rowID, Screen){
    var dataClone = this.state.buttons;
    dataClone[rowID].button = newState;
    var agenda = [];
    for (var i = 0; i < this.state.buttons.length; i++) {
      var toPush = this.state.buttons[i].button;
      if(toPush == null)
        toPush = false;
      agenda.push(toPush);
    }
    this.setState({
      buttons: dataClone,
      currentScreen: Screen,
      agenda: agenda
    });
    this.saveKey(JSON.stringify(agenda));
  }

  render() {
      if (this.state.loaded == false) {
          return (
            <Image source={require('./home.jpg')} style={styles.image} />
            );
      }
      
    return (
      <AppNavigator screenProps={{ initialState:this.state.buttons, callbackParent:(newState, rowID, Screen) => this.onChildChanged(newState, rowID, Screen)}} />
    );
  }
}


const SimpleTabs = TabNavigator({
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
      showIcon: false,
      activeTintColor: 'blue',
      inactiveTintColor:'gray',
      style:{
        padding: 0,
        margin: 0,
        backgroundColor: 'white',
      },
  tabStyle: {
    padding: 0,
    margin: 0,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
   labelStyle: {
      justifyContent: 'center',
      textAlign: 'center',
      fontSize: 15,
      paddingTop: 5,
      paddingBottom: 5,
      textAlignVertical: 'center'
   },
  indicatorStyle: {
      backgroundColor: 'white'
  }  
}
});

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
    <TouchableOpacity onPress={() => {props.navigation.navigate('DrawerToggle')}} style={{marginLeft:10}}>
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
  },

},
{
  cardStyle: {
      paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
    }
}
);

const styles = StyleSheet.create({
  home: {
    flex: 1,
    alignItems: 'stretch'
  },
  image: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default Scheduler;
