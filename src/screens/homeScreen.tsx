import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import BottomBar from "../components/BottomBar";
import { createApi } from "unsplash-js";
import Spacer from "../components/Spacer";
import {
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { fetchAndSaveImage } from "../utils/helper";
import { Tcolors } from "../components/color";
const unsplash = createApi({
  accessKey: "OjA8ccB1Ln2SB25X-9ay0L8F-Ul-3ByiD0v08cIYVko",
  //...other fetch options
});
const width = Dimensions.get("window").width;

const HomeScreen = () => {
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    unsplash.search
      .getPhotos({ query: "womens hot images", perPage: 5, page: 1 })
      .then((response) => {
        setImages(response.response.results);
        setLoading(false);
      });
  }, []);

  return (
    <View style={{ flex: 1, paddingHorizontal: 10, backgroundColor: "black" }}>
      <Spacer height={50} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          // padding: 10,
        }}
      >
        <MaterialIcons name="menu" size={24} color="white" />
        <View style={{ height: 100, width: 100 }}>
          <Image
            source={require("../../assets/app_icon1.png")}
            resizeMode="contain"
            style={{ width: "100%", height: "100%" }}
          />
        </View>

        <Ionicons name="notifications-outline" size={24} color="white" />
      </View>
      <Spacer height={30} />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View
          style={{
            alignItems: "center",
            // justifyContent: "center",
            flexDirection: "row",
            gap: 10,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 22,
            }}
          >
            Trending
          </Text>
          <Ionicons name="chevron-down" size={24} color={"white"} />
        </View>

        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#31363F",
            gap: 8,
            paddingHorizontal: 6,
            paddingVertical: 6,
            borderRadius: 10,
          }}
        >
          <View style={{ backgroundColor: "black" }}>
            <MaterialCommunityIcons
              name="view-dashboard"
              size={22}
              color={"white"}
            />
          </View>
          <View style={{ backgroundColor: Tcolors.secondaryColor }}>
            <MaterialCommunityIcons
              name="view-dashboard"
              size={22}
              color={"white"}
            />
          </View>
        </View>
      </View>
      <Spacer height={10} />
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={"large"} />
        </View>
      ) : (
        <FlatList
          nestedScrollEnabled
          data={images}
          numColumns={2}
          ItemSeparatorComponent={() => (
            <View style={{ marginBottom: 10 }}></View>
          )}
          ListFooterComponent={() => <Spacer height={50} />}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          renderItem={ImageRenderItem}
          keyExtractor={(image) => image.id}
        />
      )}

      <BottomBar />
    </View>
  );
};
const ImageRenderItem = ({ item, index }) => {
  const Item = ({ item }) => {
    const [loading, setLoading] = useState(false);

    const onLoaded = () => {
      setLoading(false);
    };

    return (
      <View key={item.id} style={{ borderRadius: 20 }}>
        {loading && (
          <View
            style={{
              height: 300,
              width: width * 0.45,
              borderColor: "grey",
              borderWidth: 0.3,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
            }}
          >
            <ActivityIndicator />
          </View>
        )}

        <Image
          source={{ uri: item["urls"]["full"] }}
          // style={{ width: width * 0.3, height: "200" }}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          resizeMode="cover"
          height={300}
          width={width * 0.45}
          onError={() => console.log("firstError")}
          onLoad={onLoaded}
          style={{ borderRadius: 20 }}
        />

        <TouchableOpacity
          style={{ position: "absolute", bottom: 10, right: 10 }}
          onPress={() =>
            fetchAndSaveImage(item["links"]["download"], item["slug"])
          }
        >
          <MaterialIcons name="download" size={22} color="#FFFFF7" />
        </TouchableOpacity>
      </View>
    );
  };

  return <Item item={item} />;
};

export default HomeScreen;

const styles = StyleSheet.create({});
