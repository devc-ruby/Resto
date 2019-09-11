import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default class NearByScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLocation : null,
            isLoading: true,
            errorMessage : null
        };
    }
    componentDidMount = async() => {
        await this._getLocationAsync();
    }
    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
          this.setState({
            errorMessage: 'Permission to access location was denied',
          });
        }
    
        const location = await Location.getCurrentPositionAsync({});
        const currentLocation = {
            latitude: location.coords.latitude,
            longitude : location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        };
        this.setState({ 
            currentLocation,
            isLoading : false
        });
      };

    render() {
        return (
            this.state.isLoading
            ? <ActivityIndicator size = 'large' style = {styles.container} />
            : (
            <MapView
                style = {{flex: 1}}
                initialRegion = {this.state.currentLocation}>
                <Marker
                coordinate = {this.state.currentLocation} />
                </MapView>
            )
            
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
