import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage, ActivityIndicator } from 'react-native';
import { SocialIcon } from 'react-native-elements';
import { OauthKey } from '../androidClientid';
import * as Google from 'expo-google-app-auth';




export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
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
    // thằng này khi nào config redux thunk sẽ đưa vào midleware
    signInWithGoogleAsync = async () => {
        try {
            const result = await Google.logInAsync({
                androidClientId: OauthKey,
                // iosClientId: YOUR_CLIENT_ID_HERE,
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
            console.log(e)
        }
    }

    render() {
        return (
            this.state.isLoading
                ? <ActivityIndicator animating={true} size='large' style={{ flex: 1 }} />
                : (<View style={styles.container} >
                    <SocialIcon
                        title='Sign In With Google'
                        button
                        type='google'
                        onPress={this.signInWithGoogleAsync}
                    />
                </View>)


        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center"
    }
});
