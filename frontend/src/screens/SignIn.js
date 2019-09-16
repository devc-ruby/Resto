import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage, ActivityIndicator, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { SocialIcon } from 'react-native-elements';
import { OauthKey } from '../androidClientid';
import { OauthKey_ios } from '../iosClientid';
import {CONSTANT} from '../components'
import * as Google from 'expo-google-app-auth';

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            status : 2,
        };
    }

    //store userInfor to AsyncStore to test
    storeLogin = async (user) => {
        try {
            await AsyncStorage.setItem('userData', JSON.stringify(user));
        } catch (error) {
            console.log(error)
        }
    };
    // thằng này khi nào config redux thunk sẽ đưa vào middleware
    signInWithGoogleAsync = async () => {
        try {
            const result = await Google.logInAsync({
                androidClientId: OauthKey,
                iosClientId: OauthKey_ios,
                scopes: ['profile', 'email'],
            });
            console.log(result);

            if (result.type === 'success') {
                await this.setState({ isLoading: true });
                //store key to recognize isLogin

                await this.storeLogin(result.user);
                //if success redirect to APP
                await this.props.navigation.navigate('tabNavigation');
            } else {
                console.log("Login Fail")
            }
        } catch (e) {
            console.error(e)
        }
    }

    switchIcon = (index) => {
        if( status !== index){

        }
    }
    render() {
        return (
                this.state.isLoading
                    ? <ActivityIndicator animating={true} size='large' style={{ flex: 1 }} />
                    : (

                    <View style={styles.container} >
                        <Text style = {{fontSize : 30, fontWeight : "bold", alignSelf : "flex-start"}}>Sign In</Text>
                        <Text style = {{fontSize : 20, marginTop : 30, color : CONSTANT.color.gray}}>Choose your way to sign in</Text>
                        <View style = {{marginVertical : 120,alignSelf: "stretch" , justifyContent: "space-around" ,...CONSTANT.flexRow}}>
                            <TouchableOpacity
                                    onPress = {this.signInWithGoogleAsync}
                                >
                                <View style = {styles.containerUnactive}>
                                    <Image 
                                        style  = {styles.iconUnactive} 
                                        resizeMode="contain" 
                                        source = {require('../../assets/icon/instagram.png')}
                                    />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress = {this.signInWithGoogleAsync}
                            >
                                <View style = {styles.containerActive}>
                                    <Image 
                                        style  = {styles.iconActive} 
                                        resizeMode="contain" 
                                        source = {require('../../assets/icon/search.png')}
                                    />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style = {styles.containerUnactive}>
                                    <Image 
                                        style  = {styles.iconUnactive} 
                                        resizeMode="contain" 
                                        source = {require('../../assets/icon/twitter.png')}
                                        opacity = {0.4}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style = {CONSTANT.flexRow}>
                            <Text style = {{color : CONSTANT.color.gray}}>DON'T HAVE AN ACCOUNT?</Text><Text style = {{color : CONSTANT.color.pink}}>SIGN UP</Text>
                        </View>
                    </View>

                    )


        );
        

    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems : "center",
        padding : 20
    },

    iconActive : {
        width : 60,
        height : 60
    },
    iconUnactive : {
        width : 50,
        height : 50
    },
    containerActive : {
        width : 114,
        height : 114,
        borderRadius : 114/2,
        backgroundColor : "#fff",
        shadowColor : "rgba(252, 94, 255, 0.6)",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.58,
        shadowRadius: 20.00,
        ...CONSTANT.flexRow,
        justifyContent: "center"

        // elevation: 24,
    },
    containerUnactive : {
        opacity : 0.4
    }
});

/* Ellipse */



