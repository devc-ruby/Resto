import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, } from 'react-native';
import CardInterest from '../components/CardInterest';
import { data } from '../data';

export default class PeopleInterest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: data
        };
    }

    render() {
        return (
            <View style={styles.container} >
                <FlatList
                    data={this.state.data}
                    renderItem={({ item, index }) => {
                        return (
                            <CardInterest
                                {...this.state}
                                item={item}
                                index={index}>
                            </CardInterest>
                        );
                    }}
                    keyExtractor={(item, index) => {
                        return item.FIELD1.toString()
                    }} >

                </FlatList>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection : "column",
        justifyContent : "space-between",
        alignItems : "center"

    },

});
