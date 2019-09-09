import React from 'react';
import {
    createAppContainer,
    createStackNavigator,
    createBottomTabNavigator
} from 'react-navigation';
//import icon-vector
import { MaterialIcons, MaterialCommunityIcons,Entypo,FontAwesome } from '@expo/vector-icons';

//import screen // it will be replaced when we have container
import SignUp from '../screens/SignUp';
import SignIn from '../screens/SignIn';
import NearBy from '../screens/NearBy';
import FamiliarStore from '../screens/FamiliarStore';
import PeopleInterest from '../screens/PeopleInterest';
import Setting from '../screens/Setting';
import AuthLoading from '../screens/AuthLoading';

//create stack NearBy
const stackNearBy = createStackNavigator({
    NearBy : {
        screen : NearBy,
        navigationOptions :{
            header : null
        }
    }
});
// create stack FamiliarStore 
const stackFamiliarStore = createStackNavigator({
    FamiliarStore : {
        screen : FamiliarStore,
        navigationOptions :{
            header : null
        }
    }
});
//create stack PeopleInterest
const stackPeopleInterest = createStackNavigator({
    PeopleInterest : {
        screen : PeopleInterest,
        navigationOptions :{
            header : null
        }
    }
});
//create stack Setting
const stackSetting = createStackNavigator({
    Setting : {
        screen : Setting,
        navigationOptions : {
            header : null
        }
    }
});
//create tabNavigation
const tabNavigation = createBottomTabNavigator({
    NearBy : {
        screen: stackNearBy,
        navigationOptions : {
            header: null,
            title: "NearBy",
            tabBarIcon: ({tintColor}) => <MaterialCommunityIcons name="map-marker" size={26} color={tintColor} />
        }
    },
    FamiliarStore : {
        screen : stackFamiliarStore,
        navigationOptions : {
            header: null,
            title: "FamiliarStore",
            tabBarIcon: ({tintColor}) => <Entypo name="feather" size={26} color={tintColor} />
        }
    },
    PeopleInterest : {
        screen : stackPeopleInterest,
        navigationOptions : {
            header: null,
            title: "PeopleInterest",
            tabBarIcon: ({tintColor}) => <FontAwesome name="users" size={26} color={tintColor} />
        }
    },
    Setting : {
        screen : stackSetting,
        navigationOptions : {
            header: null,
            title: "Setting",
            tabBarIcon: ({tintColor}) => <MaterialIcons name="settings" size={26} color={tintColor} />
        }
    },

},{
    initialRouteName : "NearBy"
});

//create stack Auth
const stackAuth = createStackNavigator({
    AuthLoading : AuthLoading,
    SignIn : SignIn,
    SignUp : SignUp,
    tabNavigation : tabNavigation
},{
    initialRouteName : 'AuthLoading',
    defaultNavigationOptions: {
        header : null
    }
});


//create AppContainer 
export const AppContainer = createAppContainer(stackAuth);
