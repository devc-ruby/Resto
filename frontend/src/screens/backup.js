import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Dimensions,
    Platform
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Card from '../components/Card';
import {data} from '../data';


const {height, width} = Dimensions.get('window');
export default class NearByScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLocation: null,
            isLoading: true,
            errorMessage: null,
            data : data
        };
    }
    componentDidMount = async () => {
        await this._getLocationAsync();
        console.log(this.state.currentLocation)
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
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        };
        this.setState({
            currentLocation,
            isLoading: false
        });
    };
    changeCurrentLocation = (currentLocation) =>{
        this.setState(
            currentLocation
        );
    }


    render() {
        return (
            this.state.isLoading
                ? <ActivityIndicator size='large' style={styles.container} />
                : (
                    <View style = {StyleSheet.absoluteFillObject}>
                        <MapView
                            style={StyleSheet.absoluteFillObject}
                            initialRegion={this.state.currentLocation}>
                            <Marker
                                coordinate={this.state.currentLocation} />
                            {this.state.data.map((marker,index)=>{
                                return (
                                    <Marker
                                        key = {index}
                                        coordinate = {
                                            {
                                                latitude : marker.latitude,
                                                latitudeDelta : 0.0922,
                                                longitude : marker.longitude,
                                                longitudeDelta: 0.0421,
                                            }
                                        }>
                                            <Entypo name="location-pin" size={32} color="green" />
                                        </Marker>
                                )
                            })}
                            
                        </MapView>
                        <View style={styles.cardOnMap }>
                                {/* <Card
                                    onPress = {()=>this.changeCurrentLocation} /> */}
                            </View>
                    </View>
                        
                )

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position : 'relative',
        justifyContent: "center",
        alignItems: "center"
    },
    cardOnMap : {
        position: 'absolute',
        bottom: 0,
        left : 0,
        right : 0,
        top : height* 0.55,
        backgroundColor : 'rgba(52, 52, 52, 0)'
        

    }
});
