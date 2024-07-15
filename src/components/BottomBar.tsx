import { View, Text, Dimensions } from "react-native";
import React from "react";
import { Feather, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { Tcolors } from "./color";

const width = Dimensions.get("window").width;
const BottomBar = () => {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 30,
        flexDirection: "row",
        backgroundColor: "#7460ff",
        justifyContent: "space-around",
        padding: 20,
        marginHorizontal: 20,
        borderRadius: 25,
        width: width * 0.9,
      }}
    >
      <Ionicons name="home" size={24} color={Tcolors.TabIconColor} />
      <MaterialCommunityIcons
        name="view-dashboard"
        size={24}
        color={Tcolors.TabIconColor}
      />
      <Feather name="search" size={24} color={Tcolors.TabIconColor} />
      <MaterialCommunityIcons
        name="rhombus-outline"
        size={24}
        color={Tcolors.TabIconColor}
      />
    </View>
  );
};

export default BottomBar;
