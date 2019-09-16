import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { data } from '../data'
import {Card} from '../components'
const { width, height } = Dimensions.get("window");
export default class FamiliarStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container} >
          <Card storeData = {data[0]}/>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom : 100
  }
});
