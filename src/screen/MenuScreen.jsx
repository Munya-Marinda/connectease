import {
  ScrollView,
  StyleSheet,
  Dimensions,
  Button,
  BackHandler,
  Pressable,
} from "react-native";
import { clearContacts } from "../functions/handleContactData";
import { useEffect } from "react";
import { ThemedFontAwesome5 } from "../components/ThemedFontAwesome5";
import { Text, View } from "../components/Themed";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

//
const MenuScreen = ({ handleScreen }) => {
  //  //
  useEffect(() => {
    const backAction = () => {
      handleScreen("Home");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  //
  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          marginBottom: 20,
          flexDirection: "row",
          width: windowWidth * 1,
          alignContent: "center",
          justifyContent: "space-between",
        }}
      >
        <Pressable
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
          }}
          onPress={() => {
            handleScreen("Home");
          }}
        >
          {({ pressed }) => (
            <ThemedFontAwesome5
              name="arrow-left"
              size={20}
              style={{ opacity: pressed ? 0.5 : 1 }}
            />
          )}
        </Pressable>
      </View>
      <ScrollView>
        <View style={styles.setting_parent}>
          <Text>Clear all contacts data.</Text>
          <Button
            onPress={() => {
              clearContacts();
            }}
            title="Clear"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    // paddingTop: 35,
    width: windowWidth,
    alignItems: "center",
    justifyContent: "center",
  },
  setting_parent_top: {
    display: "flex",
    borderTopWidth: 1,
    paddingVertical: 10,
    alignItems: "center",
    flexDirection: "row",
    borderTopColor: "silver",
    width: windowWidth * 0.9,
    justifyContent: "space-between",
  },
  setting_parent: {
    display: "flex",
    borderTopWidth: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderBottomWidth: 1,
    flexDirection: "row",
    borderTopColor: "silver",
    width: windowWidth * 0.9,
    borderBottomColor: "silver",
    justifyContent: "space-between",
  },
  horizontal_container_center: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: windowWidth * 0.8,
  },
});
