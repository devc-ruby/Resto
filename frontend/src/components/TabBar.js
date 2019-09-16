import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import CONSTANT from './styleConstants'

const TabBar = props => {
    const {
        renderIcon,
        getLabelText,
        activeTintColor,
        inactiveTintColor,
        onTabPress,
        onTabLongPress,
        getAccessibilityLabel,
        navigation
      } = props;

    const { routes, index: activeRouteIndex } = navigation.state;

    return (
        <View style={styles.container}>
        {routes.map((route, routeIndex) => {
            const isRouteActive = routeIndex === activeRouteIndex;
            const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;

            return (
            <TouchableOpacity
                key={routeIndex}
                style={styles.tabButton}
                onPress={() => {
                    onTabPress({ route });
                }}
                onLongPress={() => {
                    onTabLongPress({ route });
                }}
                accessibilityLabel={getAccessibilityLabel({ route })}
            >
                {renderIcon({ route, focused: isRouteActive, tintColor })}

            </TouchableOpacity>
            );
        })}
    </View>
    )
};

const styles = StyleSheet.create({
    container: { 
        flexDirection: "row", 
        paddingVertical : 15,
        elevation: 2,
        marginHorizontal : 10,
        backgroundColor : CONSTANT.color.pink,
        borderRadius : CONSTANT.radius,
    },
    tabButton: { flex: 1, justifyContent: "center", alignItems: "center" }
  });

export default TabBar;