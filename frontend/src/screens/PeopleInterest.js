import React, { Component } from 'react';
import { View,
         Text, 
         StyleSheet,
         FlatList,
         ActivityIndicator } from 'react-native';
import CardInterest from '../components/CardInterest';
import {placeSearching} from '../utils/fetchAPI';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default class PeopleInterest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLocation: null,
            data: null,
            isLoading : true,
            errorMessage : null
        };
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
			"distance" : "4500",
			"latitude" : location.coords.latitude,
			"longitude" : location.coords.longitude,
			"maxWidth" : "1000",
			"signature": "MTIzMjEzMTIzOmFwcA=="
		};
		this.setState({
			currentLocation,
		});
	};
  
    componentDidMount = async() =>{
        await this._getLocationAsync()
        const data = await placeSearching(this.state.currentLocation);
        this.setState({
            data,
            isLoading: false
        });
    }
    render() {
        return (
            this.state.isLoading
            ? <ActivityIndicator size='large' style={styles.container} />
            : <View style={styles.container} >
                <FlatList
                    data={this.state.data}
                    renderItem={({ item, index }) => {
                        return (
                            <CardInterest
                                {...this.state}
                                item={item}
                                index={index}>
                            </CardInterest>
                        );
                    }}
                    keyExtractor={(item, index) => {
                        return index.toString()
                    }} >

                </FlatList>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection : "column",
        justifyContent : "center",
        alignItems : "center"

    },

});
