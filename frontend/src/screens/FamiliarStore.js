import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView,ActivityIndicator, Dimensions, SafeAreaView } from 'react-native';
import { Card } from '../components';
const { width, height } = Dimensions.get("window");
import {recentVisiting} from '../data/recentVisiting';
export default class FamiliarStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        };
    }
    componentDidMount(){
        setTimeout( ()=> this.setState({ isLoading: false }), 3000)

    }
    render() {
        console.log(recentVisiting.data)
        return ( 
            this.state.isLoading ?
                <ActivityIndicator size = 'large'
                style = {{marginTop : 300}}/> 
            : 
            <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator = { false } >
            <View style = { styles.container } >
            <Text style ={{ marginVertical: 20 ,marginLeft : 20,fontSize : 30, fontWeight : "bold", alignSelf: "flex-start",color: CONSTANT.color.pink}}>Familiar Store</Text>
                {
                    recentVisiting.data.map(place => <Card storeData = { place }/>)
                }
            </View >
            </ScrollView>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        width,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 100
    }
});