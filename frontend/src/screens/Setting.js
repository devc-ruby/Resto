import React, { Component } from 'react';
import { View, Text, AsyncStorage, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

export default class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    logOut = async () => {
        await AsyncStorage.removeItem('userData');
        await this.props.navigation.navigate('SignIn');
    }

    render() {
        return (
            <View style={styles.container} >
                <Button
                    title="Logout"
                    onPress={this.logOut} >
                </Button>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});
