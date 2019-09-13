import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { data } from '../data';

const { width: screenWidth } = Dimensions.get('window');
export default class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            marker: data
        };
    }

    _renderItem = ({ item, index }, parallaxProps) => {
        const location = {
            latitude: item.latitude,
            latitudeDelta: 0.0922,
            longitude: item.longitude,
            longitudeDelta: 0.0421,
        }
        return (
            <View
                style={styles.item} >
                <Text style={styles.title} numberOfLines={2}>
                    {item.category}
                </Text>
                <ParallaxImage
                    source={{ uri: item.thumbnail }}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.4}
                    {...parallaxProps}
                />

            </View>
        );
    }
    _centerMapOnMarker (markerIndex) {
        const mapRef = this._mapView;
        const markerData = this.state.marker[markerIndex];

        if (!markerData || !mapRef) {
            return;
        }
        mapRef.animateToRegion({
            latitude: markerData.latitude,
            longitude: markerData.longitude,
            latitudeDelta: 0.0315,
            longitudeDelta: 0.0258
        });
    }


    render() {
        return (
            <Carousel
                sliderWidth={screenWidth}
                sliderHeight={screenWidth}
                itemWidth={screenWidth - 60}
                data={this.state.marker}
                renderItem={this._renderItem}
                hasParallaxImages={true}
            />
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#333333',
        marginHorizontal: 20,
        height: '80%',
    },
    item: {
        marginHorizontal: 5,
        marginVertical: 20,
        width: '100%',
        height: '90%',
    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: "cover",
    },
});