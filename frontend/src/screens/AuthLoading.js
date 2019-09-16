import React, { Component } from 'react';
import { View, Text, ActivityIndicator, AsyncStorage } from 'react-native';

export default class AuthLoading extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            userData: {}
        };
    }
    componentDidMount = async () => {
        try {
            let userData = await AsyncStorage.getItem("userData");
            let data = await JSON.parse(userData);
            this.setState({
                userData: data,
                isLoading: false
            })
            this.props.navigation.navigate(userData ? 'tabNavigation' : 'SignIn')

        } catch (error) {
            console.log("something went wrong" + `${error}`);
        }
    }

    render() {
        return (
            <View>
                <ActivityIndicator
                    animating={this.state.isLoading} />
            </View>
        );
    }
}
