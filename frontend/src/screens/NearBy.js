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
//
import { data } from '../data'
//
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 3;
const CARD_WIDTH = CARD_HEIGHT + 50;

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
	componentWillMount = () => {
		this.index = 0;
		this.animation = new Animated.Value(0);
	}
	componentDidMount = async () => {
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

			clearTimeout(this.regionTimeout);
			this.regionTimeout = setTimeout(() => {
				if (this.index !== index) {
					this.index = index;
					this.map.animateToRegion(
						{
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
			this.state.isLoading
				? <ActivityIndicator size='large' style={styles.container} />
				: <View style={styles.container}>
					<MapView
						ref={map => this.map = map}
						provider={PROVIDER_GOOGLE}
						initialRegion={this.state.currentLocation}
						style={styles.container}>
						<MapView.Marker coordinate={this.state.currentLocation} />

						{this.state.markers.map((marker, index) => {
							const scaleStyle = {
								transform: [
									{
										scale: interpolations[index].scale,
									},
								],
							};
							const opacityStyle = {
								opacity: interpolations[index].opacity,
							};
							return (
								<MapView.Marker key={index}
									coordinate={{
										latitude: marker.latitude,
										longitude: marker.longitude
									}}>
									<Animated.View style={[styles.markerWrap, opacityStyle]}>
										<Entypo name="location-pin" size={38} color="#ff00c8" />
									</Animated.View>
								</MapView.Marker>
							);
						})}
					</MapView>
					<Animated.ScrollView
						horizontal
						scrollEventThrottle={1}
						showsHorizontalScrollIndicator={false}
						snapToInterval={CARD_WIDTH}
						onScroll={Animated.event(
							[
								{
									nativeEvent: {
										contentOffset: {
											x: this.animation,
										},
									},
								},
							],
							{ useNativeDriver: true }
						)}
						style={styles.scrollView}
						contentContainerStyle={styles.endPadding}
					>
						{this.state.markers.map((marker, index) => (
							<TouchableOpacity 
								style={styles.card} 
								key={index} 
								// navigate sang screen chi tiết store tại đây
								onPress = {() =>this.props.navigation.navigate('FamiliarStore')}
								>
								<Image
									source={{ uri: marker.thumbnail }}
									style={styles.cardImage}
									resizeMode="cover"
								/>
								<View style={styles.textContent}>
									<Text numberOfLines={1} style={styles.cardtitle}>{marker.store_name}</Text>
									<Text numberOfLines={1} style={styles.cardDescription}>
										{marker.store_address}
									</Text>
								</View>
							</TouchableOpacity>
						))}
					</Animated.ScrollView>
				</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollView: {
		position: "absolute",
		bottom: 0,
		left: 0,
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
		flex: 3,
		width: "100%",
		height: "100%",
		alignSelf: "center",
	},
	textContent: {
		flex: 1,
	},
	cardtitle: {
		fontSize: 12,
		marginTop: 5,
		fontWeight: "bold",
	},
	cardDescription: {
		fontSize: 12,
		color: "#444",
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