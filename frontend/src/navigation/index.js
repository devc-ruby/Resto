import React from 'react';
import {
    createAppContainer,
    createStackNavigator,
    createBottomTabNavigator
} from 'react-navigation';
//import icon-vector
import { MaterialIcons, MaterialCommunityIcons, Entypo, FontAwesome } from '@expo/vector-icons';
import {TabBar} from '../components'
//import screen // it will be replaced when we have container

import SignIn from '../screens/SignIn';
import NearBy from '../screens/NearBy';
import FamiliarStore from '../screens/FamiliarStore';
import PeopleInterest from '../screens/PeopleInterest';
import Setting from '../screens/Setting';
import StoreDetail from '../screens/StoreDetail';
import STYLE from '../components/styleConstants';
import AuthLoading from '../screens/AuthLoading';

import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

//create stack NearBy
const stackNearBy = createStackNavigator({
    NearBy: {
        screen: NearBy,
        navigationOptions: {
            header: null
        }
    }
});
// create stack FamiliarStore 
const stackFamiliarStore = createStackNavigator({
    FamiliarStore: {
        screen: FamiliarStore,
        navigationOptions: {
            header: null
        }
    }
});
//create stack PeopleInterest
const stackPeopleInterest = createStackNavigator({
    PeopleInterest: {
        screen: PeopleInterest,
        navigationOptions: {
            header : null
        }
    },
    StoreDetail: {
        screen: StoreDetail,
    }
});

stackPeopleInterest.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    for (let i = 0; i < navigation.state.routes.length; i++) {
      if (navigation.state.routes[i].routeName == "StoreDetail") {
        tabBarVisible = false;
      }
    }
  
    return {
      tabBarVisible
    };
  };
//create stack Setting
const stackSetting = createStackNavigator({
    Setting: {
        screen: Setting,
        navigationOptions: {
            headerTitle: "Setting"
        }
    }
});
//create tabNavigation
const tabNavigation = createBottomTabNavigator({
    NearBy: {
        screen: stackNearBy,
        navigationOptions: {
            title: "NearBy",
            tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name="map-marker" size={26} color={tintColor} />
        }
    },
    FamiliarStore: {
        screen: stackFamiliarStore,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Entypo name="feather" size={26} color={tintColor} />
        }
    },
    PeopleInterest: {
        screen: stackPeopleInterest,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <FontAwesome name="users" size={26} color={tintColor} />
        }
    },
    Setting: {
        screen: stackSetting,
        navigationOptions: {
            title: "Setting",
            tabBarIcon: ({ tintColor }) => <MaterialIcons name="settings" size={26} color={tintColor} />
        }
    },

}, {  
    tabBarComponent: props => {
        return (
            <View style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 10,
            }}>
                <TabBar{...props} />
            </View>
        )
    },
    tabBarOptions: {
        activeTintColor: STYLE.color.pink,
        inactiveTintColor: "#aaa"
    },
    initialRouteName: "NearBy"

    });

//create stack Auth
const stackAuth = createStackNavigator({
    AuthLoading: AuthLoading,
    SignIn: SignIn,
    tabNavigation: tabNavigation,


}, {
        initialRouteName: 'AuthLoading',
        defaultNavigationOptions: {
            header: null
        }
    });


//create AppContainer 
export const AppContainer = createAppContainer(stackAuth);
