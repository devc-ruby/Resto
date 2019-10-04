import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import STYLE from './styleConstants'

const COLOR = STYLE.color 

export default Card = (props) => {
    const data = props.storeData;
    console.log(data)
    return (
        <View style = {styles.container}>
            <View style = {{backgroundColor: "rgb(247,246,249)", padding : 10, borderRadius:24}}>
            <Image style = {{width : 34, height : 34}} source = {require('../../assets/icon/coffee.png')}/>
            </View>
            <View style = {{marginLeft: 20}}>
                <Text style = {{fontSize : 20, fontWeight: "500", color : STYLE.color.pink}}>{data.name_store}</Text>
                <View style = {STYLE.flexRow}>
                    <Text>Status: </Text> 
                    <Text style = {{fontWeight: "500"}}>{data.status}</Text>
                </View>

                <View style = {STYLE.flexRow}>
                    <Text>Last Visited: </Text> 
                    <Text style = {{fontWeight: "500"}}>{data.last_visit}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        ...STYLE.flexRow,
        width : STYLE.dimension.width-30,
        marginVertical: 6,
        backgroundColor : "#fff",
        padding : 20,
        borderRadius : 14,
        shadowColor: "#ccc",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.50,
        shadowRadius: 4.65,
        
        elevation: 6,
    },

  });
  