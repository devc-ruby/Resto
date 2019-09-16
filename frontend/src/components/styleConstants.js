import { Dimensions } from "react-native";
var width = Dimensions.get('window').width; 
var height = Dimensions.get('window').height; 

export default CONSTANT = {
    color : {
        pink      : "rgb(234,59,195)",
        lightPink : "#e5b0ea",
        black     : "#2b2b2b",
        gray      : "#696464",
        white     : "#fff",
    },

    fontSize : {
        big : 28,
        regular : 18
    },
    radius : 50,

    shadow : {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11, 
        elevation: 14,
    },
    dimension : {
        width,
        height
    },

    flexRow: {
        display : "flex",
        flexDirection : "row",
        alignItems : "center"
    }

}