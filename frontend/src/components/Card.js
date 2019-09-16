import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import STYLE from './styleConstants'

const COLOR = STYLE.color 

export default Card = (props) => {
    const [isDescription, setDescription] = useState(true)
    const [tabDescription, setTabDescription] = useState(styles.tabActive)
    const [tabFeebBack, setTabFeebBack] = useState(styles.tabUnactive)
    const {storeData} = props
    switchTab = (bool) => {
        console.log(isDescription)
        if(bool){
            setDescription(bool)
            setTabDescription(styles.tabActive)
            setTabFeebBack(styles.tabUnactive)
        }
        else {
            setDescription(bool)
            setTabDescription(styles.tabUnactive)
            setTabFeebBack(styles.tabActive)
        }
    }
    function Description(props){
        const {detailInfo} = props
        return (
            <View>
                <View style = {styles.property}>
                    <Image style = {styles.icon} source={require('../../assets/icon/location.png')}/>
                    <Text style = {{flex: 1}}>{detailInfo.location}</Text>
                </View>
                <View style = {styles.property}>
                    <Image style = {styles.icon} source={require('../../assets/icon/clock-circular.png')}/>
                    <Text>{detailInfo.services}</Text>
                </View>
            </View>
        )
    }


    function Feedback(props){
        const {fb} = props
        console.log(fb)
        return (
            <View>
                <View style = {{...STYLE.flexRow}}>
                    <Image  
                        style = {{width : 50, height : 50, borderRadius: 25}} 
                        source={{uri: fb.profile_photo_url}}
                    />
                    <Text style = {{fontSize : 23}}>
                        {fb.author_name}
                    </Text>
                </View>
                <Text style = {{fontSize : 15}}>{ ((fb.text).length > 100) ? 
                    (((fb.text).substring(0,100-3)) + '...') : 
                    fb.text }
                </Text>
            </View>
        )
    }

    return (
        <View style = {styles.container}>
                <Text style = {styles.title}>{storeData.name_store}</Text>
                <View style = {styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={require('../../assets/thecoffeehouse.jpg')}
                    />
                </View>
                <View style = {{marginTop : 20 ,display : "flex", flexDirection : "row"}}>
                    <TouchableOpacity
                        onPress = {() => switchTab(true)}
                    >
                        <Text style={tabDescription} >Description</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress = {() => switchTab(false)}
                    >
                        <Text style={tabFeebBack} >Feedback</Text>
                    </TouchableOpacity>

                </View>
                    
                <View >
                    {   
                         isDescription ? 
                            <Description detailInfo = {storeData}/> 
                            : 
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <FlatList
                                data={storeData.review}
                                renderItem={({ item }) => <Feedback fb={item} />}
                                keyExtractor={ (item,i) => i}  
                                />
                            </ScrollView>     
                    }
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width : STYLE.dimension.width-40,
        backgroundColor : "#fff",
        padding : 20,
        ...STYLE.shadow,
        borderRadius : 20,

    },
    text : {
        color : COLOR.white
    },
    title : {
        fontSize : STYLE.fontSize.big,
        color : STYLE.color.black,
        fontWeight : "bold",
    },
    imageContainer: {
        marginTop : 30,
        display : "flex",
        flexDirection : "row"
    },
    image : {
        width : 250,
        height : 250,
        borderRadius : 20,
        marginRight : 20 
    },
    imageOpacity : {
        width : 250,
        height : 250,
        borderRadius : 20,
        marginRight : 20 ,
        opacity : 0.5,
    },
    tabActive : {
        fontSize : STYLE.fontSize.big,
        fontWeight : "bold",
        borderBottomWidth : 3,
        borderColor : STYLE.color.black,
        marginRight : 20, 
    },
    tabUnactive : {
        fontSize : STYLE.fontSize.big,
        marginRight : 20,
        color : STYLE.color.gray
    },

    property : {
        ...STYLE.flexRow,
    },

    icon : {
        width : 30,
        height : 30,
        marginRight : 10,
        marginVertical : 15,
    }
  });
  