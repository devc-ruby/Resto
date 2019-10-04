import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator
} from 'react-native';
import CardInterest from '../components/CardInterest';

import { data } from '../data';
import {peopleInterest} from '../data/peopleInterest';
import { CONSTANT } from '../components';

export default class PeopleInterest extends Component {
    constructor(props) {
        super(props);
        this.state = {

            data: peopleInterest.data,
            isLoading: true
        };
    }


    componentDidMount = async() => {
        setTimeout( ()=> this.setState({ isLoading: false }), 3000)
    }
    render() {
        return (
            this.state.isLoading ?
                <ActivityIndicator size = 'large'
                style = {{marginTop : 300}}/> 
            : 
            <View style = { styles.container } >
            <Text style = { {marginVertical: 30 ,marginLeft : 20,fontSize : 30, fontWeight : "bold", alignSelf: "flex-start", color: CONSTANT.color.pink}}>People Interest</Text>
            <FlatList data = { this.state.data }
            renderItem = {
                ({ item, index }) => {
                    return ( 
                        <CardInterest {...this.props }
                        item = { item }
                        index = { index } >
                        </CardInterest>
                    );
                }
            }
            keyExtractor = {
                (item, index) => {
                    return index
                }
            } >

            </FlatList>  
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center"
    },

});