import React, { Component } from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Animated,
    Image,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";

import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { Entypo } from '@expo/vector-icons';
<<<<<<< HEAD
import {placeSearching} from '../utils/fetchAPI'

=======
import { data } from '../data'
import { recommendation } from '../data/recommendation';
import STYLE from '../components/styleConstants'
>>>>>>> branchcuadung
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 3;
const CARD_WIDTH = CARD_HEIGHT + 50;

<<<<<<< HEAD




export default class screens extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentLocation: null,
			isLoading: true,
			errorMessage: null,
			markers: []
		};
	}
=======
export default class screens extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLocation: null,
            isLoading: true,
            errorMessage: null,
            markers: data
        };
    }

    
    _getLocationAsync = async() => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }
>>>>>>> branchcuadung

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
    componentWillMount = () => {
        this.index = 0;
        this.animation = new Animated.Value(0);
    }
    componentDidMount = async() => {
        await this._getLocationAsync();
        // We should detect when scrolling has stopped then animate
        // We should just debounce the event listener here
        this.animation.addListener(({ value }) => {
            let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
            if (index >= this.state.markers.length) {
                index = this.state.markers.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }

<<<<<<< HEAD
		const location = await Location.getCurrentPositionAsync({});
		const currentLocation = {
			latitude: location.coords.latitude,
			longitude: location.coords.longitude,
			latitudeDelta: 0.008,
			longitudeDelta: 0.008,
		};
		this.setState({
			currentLocation,
		});
	};
	componentWillMount = () => {
		this.index = 0;
		this.animation = new Animated.Value(0);
	}
	componentDidMount = async () => {
		await this._getLocationAsync();
		const ob = {
			"distance" : "4500",
			"latitude" : this.state.currentLocation.latitude,
			"longitude" : this.state.currentLocation.longitude,
			"maxWidth" : "1000",
			"signature": "MTIzMjEzMTIzOmFwcA=="
		}
		const data = await placeSearching(ob);
		this.setState({
			isLoading : false,
			markers :data
		});



		// We should detect when scrolling has stopped then animate
		// We should just debounce the event listener here
		this.animation.addListener(({ value }) => {
			let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
			if (index >= this.state.markers.length) {
				index = this.state.markers.length - 1;
			}
			if (index <= 0) {
				index = 0;
			}
=======
            clearTimeout(this.regionTimeout);
            this.regionTimeout = setTimeout(() => {
                if (this.index !== index) {
                    this.index = index;
                    this.map.animateToRegion({
                            latitude: this.state.markers[index].latitude,
                            latitudeDelta: this.state.currentLocation.latitudeDelta,
                            longitude: this.state.markers[index].longitude,
                            longitudeDelta: this.state.currentLocation.longitudeDelta,
                        },
                        350
                    );
                }
            }, 10);
        });
    }
>>>>>>> branchcuadung

    render() {
        const interpolations = this.state.markers.map((marker, index) => {
            const inputRange = [
                (index - 1) * CARD_WIDTH,
                index * CARD_WIDTH,
                ((index + 1) * CARD_WIDTH),
            ];
            const scale = this.animation.interpolate({
                inputRange,
                outputRange: [1, 2.5, 1],
                extrapolate: "clamp",
            });
            const opacity = this.animation.interpolate({
                inputRange,
                outputRange: [0.1, 1, 0.1],
                extrapolate: "clamp",
            });


            return { scale, opacity };
        });

        return (
            this.state.isLoading ?
            <ActivityIndicator size = 'large'
            style = { styles.container }
            /> :
            <View style = { styles.container }>
            <ScrollView>
                <MapView ref = { map => this.map = map }
                provider = { PROVIDER_GOOGLE }
                initialRegion = { this.state.currentLocation }
                style = { styles.mapContainer }
                >
                <MapView.Marker coordinate = { this.state.currentLocation }/>

                {
                    this.state.markers.map((marker, index) => {
                        const scaleStyle = {
                            transform: [{
                                scale: interpolations[index].scale,
                            }, ],
                        };
                        const opacityStyle = {
                            opacity: interpolations[index].opacity,
                        };
                        return ( 
                            <MapView.Marker key = { index }
                                coordinate = {
                                    {
                                        latitude: marker.latitude,
                                        longitude: marker.longitude
                                    }
                                }
                            >
                                <Animated.View style = {
                                    [styles.markerWrap, opacityStyle] }
                                >
                                <Entypo name = "location-pin"
                                size = { 38 }
                                color = "#ff00c8"/>
                                </Animated.View> 
                            </MapView.Marker>
                        );
                    })
                } 
                </MapView> 
                <Animated.ScrollView 
                    horizontal 
                    scrollEventThrottle = { 1 }
                    showsHorizontalScrollIndicator = { false }
                    snapToInterval = { CARD_WIDTH }
                    onScroll = {
                        Animated.event(
                            [{
                                nativeEvent: {
                                    contentOffset: {
                                        x: this.animation,
                                    },
                                },
                            }, ], { useNativeDriver: true }
                        )
                    }
                    style = { styles.scrollView }
                    contentContainerStyle = { styles.endPadding } 
                >
                {
                    this.state.markers.map((marker, index) => {
                        return ( 
                        <View style = { styles.cardContainer }
                            key = { index }
                            // navigate sang screen chi tiết store tại đây
                            // onPress = {() =>this.props.navigation.navigate('FamiliarStore')}
                            >
                            <Image source = {{url: (marker.image[0] && marker.image[0].url) || null}}
                            style = { styles.cardImage }
                            resizeMode = "cover"
                            />
                            <View style = { styles.textContent } >
                                <Text style = { styles.cardtitle }> 
                                    { marker.name_store } 
                                </Text> 
                                <Text numberOfLines = { 1 } style = { styles.cardDescription }> 
                                    { marker.location } 
                                </Text> 
                            </View> 
                        </View>
                        )
                    })
                } 
                </Animated.ScrollView>
                </ScrollView> 
            </View>
        );
    }
}

const styles = StyleSheet.create({


    container: {
        flex: 1,
        position: "relative"
    },
    cardContainer: {
        width: width - 80,
        height: 120,
        marginLeft: 10,
        ...STYLE.flexRow,
        // borderRadius: 16,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,

    },
    mapContainer: {
        height: height,
    },
    scrollView: {
        position: "absolute",
        bottom: 100,
        left: 10,
        right: 0,
        paddingVertical: 10,

    },
    endPadding: {
        paddingRight: width - CARD_WIDTH,
    },
    card: {
        padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
    },
    cardImage: {
        width: 130,
        height: 120,
        alignSelf: "center",
    },
    textContent: {
        flex: 1,

        justifyContent: "flex-start",

    },
    cardtitle: {
        fontSize: 16,
        marginHorizontal: 10,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 12,
        color: "#444",
        marginHorizontal: 10,
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
    },
    marker: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "rgba(189,195,199, 0.9)",
    },
    ring: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "rgba(189,195,199, 0.3)",
        position: "absolute",
        borderWidth: 1,
        borderColor: "rgba(189,195,199, 0.5)",
    },
});
