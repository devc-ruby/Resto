import React, { Component } from 'react';
import { View, Text ,StyleSheet} from 'react-native';

export default class FamiliarStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style = {styles.container} >
        <Text> FamiliarStore </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
      flex :1,
      justifyContent : "center",
      alignItems: "center"
  }
});