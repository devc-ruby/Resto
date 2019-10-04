import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Image, TouchableOpacity, FlatList, Button } from 'react-native';
import { data } from '../data';
import { Card } from '../components';
import CONSTANT from '../components/styleConstants';
const { width, height } = Dimensions.get("window");


const metadatas = [
    {
        name : "website",
        image : require('../../assets/icon/website.png'),
    },
    {
        name : "email",
        image : require('../../assets/icon/envelope.png'),
    },
    {
        name : "direction",
        image : require('../../assets/icon/turn-right.png'),
    },
    {
        name : "call",
        image : require('../../assets/icon/phone-call.png'),
    }
]
function Description(props){
    const {detailInfo} = props
    return (
        <View style = {{width : width - 50}}>
            <Text style = {{fontSize : 18, fontWeight : "bold", marginVertical : 20}}>
                Store Information
            </Text>
            <Text style = {{flex: 1, color : "rgb(121,121,121)", }}>{detailInfo.location}</Text>

            {/* <View style = {styles.property}>
                <Image style = {styles.icon} source={require('../../assets/icon/location.png')}/>
            </View>
            <View style = {styles.property}>
                <Image style = {styles.icon} source={require('../../assets/icon/clock-circular.png')}/>
                <Text>{detailInfo.services}</Text>
            </View> */}
        </View>
    )
}

function Feedback(props){
    const {fb} = props
    console.log(fb)
    return (
        <View style = {styles.reviewContainer}>
            <View style = {{...CONSTANT.flexRow}}>
                <Image  
                    style = {{width : 80, height : 80, borderRadius: 40, margin : 10}} 
                    source={{uri: fb.profile_photo_url}}
                />
                <View>
                    <Text style = {{fontSize : 23, fontWeight : "bold", marginBottom : 5}}>
                        {fb.author_name}
                    </Text>
                    <View style = {CONSTANT.flexRow}>
                                <View style = {styles.star}></View>
                                <View style = {styles.star}></View>
                                <View style = {styles.star}></View>
                                <View style = {styles.star}></View>
                                <View style = {styles.star}></View>
                     </View>
                </View>

            </View>
            <Text style = {{fontSize : 15}}>{ ((fb.text).length > 100) ? 
                (((fb.text).substring(0,100-3)) + '...') : 
                fb.text }
            </Text>
        </View>
    )
}


export default class StoreDetail extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTransparent: true,
        
        headerLeft: (
            <View style = {{marginTop : 20, marginLeft : 20}}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
            >
                <View style = {{...CONSTANT, justifyContent : "center", alignItems : "center", width : 40, height : 40, borderRadius : 20, backgroundColor : "#FFF"}}>
                    <Image style = {{width : 16, height : 16}} source = {require('../../assets/icon/previous.png')}/>
                </View>
            </TouchableOpacity>
            </View>
          ),
        tabBarVisible:false,
      });
    constructor(props) {
        super(props);
        this.state = {
            isDescription : true,
            tabFeedBack : styles.tabUnactive,
            tabDescription : styles.tabActive,
            storeData : data[0]
        };
    }

    switchTab = (bool) => {
        if(bool){
            this.setState({
                isDescription : bool,
                tabDescription : styles.tabActive,
                tabFeebBack : styles.tabUnactive
            })
        }
        else {
            this.setState({
                isDescription : bool,
                tabDescription : styles.tabUnactive,
                tabFeebBack : styles.tabActive
            })
        }
    }
    render() {
        return ( 
            <ScrollView showsVerticalScrollIndicator = { false } >
            <View style = { styles.container } >
                <View style = {styles.imageContainer}>
                    <Image style = {styles.image_store} source = {require('../../assets/thecoffeehouse.jpg')}/>
                    <Image style = {{...styles.image_store,tintColor : "gray", position : "absolute", opacity : 0.4}} source = {require('../../assets/thecoffeehouse.jpg')}/>
                    <View style = {{position : "absolute" , bottom : 100, left : 10}}>
                        <Text style = {{fontSize: 30, fontWeight : "bold", color : "white"}}> The Coffee House</Text>
                    </View>
                    <View style = {styles.metaInfo}>
                        
                        <View style = {{marginTop : 25,...CONSTANT.flexRow, justifyContent : "center", alignItems : "center"}}>
                                {
                                    metadatas.map(metadata => (
                                        <View style = {{justifyContent : "center", alignItems : "center", marginHorizontal : 10}}>
                                            <View style = {styles.metaInfoContainer}>
                                                <Image style = {{width : 20, height : 20}} source = {metadata.image}/>
                                            </View>
                                            <Text style = {{marginTop : 5,fontSize : 10, fontWeight : "bold"}}>{metadata.name}</Text>
                                         </View>
                                    ))
                                }
                        </View>
                    </View>
                </View>

            <View style = {{display : "flex", flexDirection : "row", marginTop : 20}}>
                    <TouchableOpacity
                        onPress = {() => this.switchTab(true)}
                    >
                        <Text style={this.state.tabDescription} >Description</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress = {() => this.switchTab(false)}
                    >
                        <Text style={this.state.tabFeedBack} >Feedback</Text>
                    </TouchableOpacity>

                </View>

                <View >
                    {   
                         this.state.isDescription ? 
                            <Description detailInfo = {this.state.storeData}/> 
                            : 
                                <FlatList
                                data={this.state.storeData.review}
                                renderItem={({ item }) => <Feedback fb={item} />}
                                keyExtractor={ (item,i) => i}  
                                />
                    }
                </View>
                </View >
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        width,
        flex: 1,
        alignItems: "center",
        marginBottom: 50
    },
    metaInfo : {
        height : 120,
        width : width - 20,
        backgroundColor : "#fff",
        position : "absolute", 
        borderRadius : 10,
        bottom : -50,
        left : 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        
        elevation: 6,
    },

    image_store : {
        width,
        height : 400,
        borderRadius : 40,
    },
    imageContainer : {
        position: "relative",
        top : -50,
        width,
        height : 400,
        backgroundColor : "#fff",
    },
    imageOpacity : {
        width : 250,
        height : 250,
        borderRadius : 20,
        marginRight : 20 ,
        opacity : 0.5,
    },
    tabActive : {
        fontSize : CONSTANT.fontSize.big,
        fontWeight : "bold",
        borderBottomWidth : 3,
        borderColor : CONSTANT.color.black,
        marginRight : 20, 
    },
    tabUnactive : {
        fontSize : CONSTANT.fontSize.big,
        marginRight : 20,
        color : CONSTANT.color.gray
    },

    property : {
        ...CONSTANT.flexRow,
    },

    icon : {
        width : 30,
        height : 30,
        marginRight : 10,
        marginVertical : 15,
    },
    reviewContainer : {
        height : 250,
        marginHorizontal : 10,
        padding : 30,
        marginVertical : 20,
        borderRadius : 15,
        backgroundColor : "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,

    },
    star : {
        width : 20,
        height : 20,
        borderRadius : 10,
        margin : 1,
        marginBottom : 5,
        backgroundColor : CONSTANT.color.pink
    },
    metaInfoContainer: {display: "flex",width : 50, height : 50, borderRadius : 25, backgroundColor : "rgb(245,245,245)", justifyContent : "center", alignItems : "center"}
});