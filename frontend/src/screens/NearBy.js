import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, SafeAreaView} from 'react-native';
import {ButtonStyle, Card} from '../components';

const fake_data = {
  name_store : "The Coffee House",
  image : [
      "../../assets/thecoffeehouse.jpg",
  ],
  detail : {
      location : "798 Sư Vạn Hạnh, Phường 12, Quận 10, Hồ Chí Minh",
      active_time : "Cả tuần, 07:00 - 22:30",
      website : "thecoffeehouse.com",
  },
  feedbacks : [
      {
          avatar : "https://img.cinemablend.com/filter:scale/quill/d/e/6/c/9/6/de6c96f1e9871aef148dbc51fb9a5bc90ff25314.jpg?mw=600",
          reviewer : "Avatar",
          content_review : "Đi từ hồi thứ 7 mà giờ mới nhớ ra để đăng lên😂😂. Chuyện là hôm đó team mình hẹn ở TCH(The Coffee House) Sư Vạn..."
      }
  ]
}

export default class NearByScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <SafeAreaView >
          <ScrollView style = {{width : Dimensions.get('window').width ,...styles.container}}>
            <Text style = {styles.title} > NearBy </Text>
            <Card storeData = {fake_data}></Card>
            <View style = {{height : 100}}></View>
          </ScrollView>
        </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal : 20,
  },
  title : {
    fontSize: 30,
    fontWeight : "bold",
    marginVertical : 20,
    alignSelf : "flex-start"
  }
});
