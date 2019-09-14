import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity
} from 'react-native';

const { width, height } = Dimensions.get("window");
const CARD_WIDTH = height / 2;
const CARD_HEIGHT = CARD_WIDTH  ;

export default class CardInterest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        const {item, index} = this.props;
        return (
            <View style={styles.container} >
                <View style = {styles.avatar}>
                    <Image 
                        style = {{width : 40, height: 40, borderRadius: 50, marginRight: 5}} 
                        source = {{uri : item.thumbnail }} />
                    <Text 
                        numberOfLines = {1} 
                        style = {styles.cardTitle}>
                        Phung DaiHiep
                    </Text>
                </View>
                <View style = {styles.thumbnail} >
                    <Image
                        source = {{uri : item.thumbnail}}
                        style = {styles.image} />
                </View>
                <View style = {styles.comment} >
                    <Text>
                    {item.store_address.length < 53
                    ? `${item.store_address}`
                    : `${item.store_address.substring(0,50)}...` }</Text>
                </View>
                <TouchableOpacity style = {styles.btnVisit} >
                    <Text>Visit</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection : "column",
        justifyContent : "center",
        marginHorizontal: 30,
        marginVertical: 5,
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    avatar : {
        top : 0,
        left: 5,
        flexDirection : "row",
        alignItems : "center",
        
        
    },
    thumbnail:{

    },
    comment : {
        marginHorizontal : 10
    },
    btnVisit :{
        left : CARD_WIDTH/2 -30 ,
        flexDirection : "column",
        justifyContent: "center",
        alignItems : "center",
        height : 30,
        width : 60,
        borderRadius: 30,
        backgroundColor : "#ff00c8"

    },
    image : {
        marginVertical : 5,
        marginHorizontal : 10,
        width: CARD_WIDTH -20,
        height: CARD_HEIGHT /2,
    },
    cardTitle : {
        fontSize: 16,
		fontWeight: "bold",
    }
});