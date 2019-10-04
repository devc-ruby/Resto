import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    Button,
    TouchableOpacity
} from 'react-native';
import CONSTANT from "./styleConstants";
const { width, height } = Dimensions.get("window");
const CARD_WIDTH = height / 2;
const CARD_HEIGHT = CARD_WIDTH;

export default class CardInterest extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    processName = (name) => {
        if(!name){
            return "Anonymous"
        }
        var name_arr = name.split(" ")
        if(name_arr.length > 2){
            return name_arr.slice(name_arr.length - 2).join(" ")
        }
        else {
            return name
        }
    }
    render() {
        const { item, index } = this.props;
        console.log(item)
        return ( 
            <View style = {styles.container}>
                <View style = {{display : "flex", flexDirection : "row"}}>
                    <View style = {styles.imageContainer}>
                        <Image 
                            style = {styles.image} 
                            source = {{ uri : item.image}}
                        />
                        <Text style = {{width : 100, fontSize : 15,position : "absolute", top : 10, left : 10, color : "white", fontWeight : "bold"}}>{item.name_store}</Text>
                        <View style = {{...CONSTANT.flexRow, position: "absolute", bottom : 20, right : 10}}>
                            <Text style = {{color : "white", fontSize : 35, fontWeight : "bold"}}>4.2</Text>
                            <Text style = {{color : "white", fontSize : 20, fontWeight : "bold"}}>/5</Text>
                        </View>
                        <Image 
                            style = {{...styles.image, position: 'absolute', tintColor: 'gray', opacity: 0.4}} 
                            source = {{ uri : item.image}}
                        />
                    </View>
                    <View style = {{marginTop : 10, marginLeft : 10}}>
                        <View style = {{display : "flex", flexDirection : "row", alignItems : "center"}}>
                            <Image 
                                style = {styles.avatar}
                                source = {{ uri : item.review.profile_photo_url}}
                            />
                            <Text style = {{marginLeft : 10,fontWeight : "bold", fontSize : 20}}>{this.processName(item.review.author_name)}</Text>
                        </View>
                        <View style = {{marginTop : 20}}>
                            <View style = {CONSTANT.flexRow}>
                                <View style = {styles.star}></View>
                                <View style = {styles.star}></View>
                                <View style = {styles.star}></View>
                                <View style = {styles.star}></View>
                                <View style = {styles.star}></View>
                            </View>
                            <Text style = {{width : 159, fontSize : 16 }}>
                                {
                                    item.review.text && (item.review.text.length < 100 ? item.review.text : item.review.text.slice(0,100) + "...")
                                }
                            </Text>
                        </View>
                    </View>
                </View>
                <View style = {{marginTop : 5,justifyContent : "space-evenly",...CONSTANT.flexRow}}>
                    <TouchableOpacity onPress = {() => {this.props.navigation.navigate('StoreDetail')}}>
                        <View style = {styles.buttonVisit} >
                            <Text style = {{textAlign : "center", fontWeight : "bold", color :CONSTANT.color.pink}}>I'd visit</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style = {styles.buttonCheck}>
                            <Text style = {{textAlign : "center", color : "white",fontWeight : "bold",}}>Check Me</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container : {
    width : width - 40,
    height : 300,
    margin : 10,
    marginLeft : 30,
    marginTop : 40,
    backgroundColor : "#fff",
    borderRadius : 15,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  imageContainer: {
    position : "relative",
    top : -15,
    left : -20,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    zIndex : 10,
  },
  image : {
      zIndex : -1,
      width : 140,
      height : 240,
      borderRadius : 15,
  },

  avatar : {
    width : 50,
    height : 50,
    borderRadius: 25,
  },
  star : {
      width : 20,
      height : 20,
      borderRadius : 10,
      margin : 1,
      marginBottom : 5,
      backgroundColor : CONSTANT.color.pink
  },
  buttonVisit: {
    borderRadius : 40,
    borderColor : CONSTANT.color.pink,
    borderWidth : 2,
    width : 100,
    paddingHorizontal : 15,
    paddingVertical : 8,
    color : CONSTANT.color.pink,
  },
  buttonCheck: {
    borderRadius : 40,
    width : 100,
    paddingHorizontal : 15,
    paddingVertical : 8,
    backgroundColor : CONSTANT.color.pink
  }

});