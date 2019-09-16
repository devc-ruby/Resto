import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import STYLE from './styleConstants'

const COLOR = STYLE.color 

export default ButtonStyle = (props) => {
    return (
        <View style = {styles.container}>
            <Text style = {styles.text}>
                {props.children}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical : 10,
        paddingHorizontal : 30,
        backgroundColor : COLOR.pink,
        borderRadius    : STYLE.radius
    },
    text : {
        color : COLOR.white
    }
  });
  