import { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  Dimensions,
  Pressable,
  Text,
} from "react-native";
import ContactListView from "../components/ContactListView";
import { useColorScheme } from "react-native";
import { View } from "../components/Themed";
import { ThemedFontAwesome5 } from "../components/ThemedFontAwesome5";
import { useDispatch, useSelector } from "react-redux";
import { contactsReducer } from "../store/features/contacts/contactsSlice";
import { ThemedIonicons } from "../components/ThemedIonicons";

//
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
//
const HomeScreen = ({ _contactsAlphabetical, handleScreen }) => {
  //
  const dispatch = useDispatch();
  // const theme = "dark";
  const theme = useColorScheme();
  //
  const textThemeColor = theme === "dark" ? "white" : "black";
  //
  return (
    <View style={styles.container} lightColor="white" darkColor="rgba(0,0,0,1)">
      <View
        style={{
          display: "flex",
          marginBottom: 20,
          borderBottomWidth: 1,
          flexDirection: "row",
          width: windowWidth * 1,
          alignContent: "center",
          justifyContent: "space-between",
          borderBottomColor: theme === "dark" ? "white" : "transparent",
        }}
      >
        <Pressable
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
          }}
          onPress={() => {
            handleScreen("Search");
          }}
        >
          {({ pressed }) => (
            <ThemedFontAwesome5
              name="search"
              size={20}
              style={{ opacity: pressed ? 0.5 : 1 }}
            />
          )}
        </Pressable>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "space-around",
          }}
        >
          <Pressable
            style={{
              paddingVertical: 10,
              paddingHorizontal: 20,
            }}
            onPress={() => {
              dispatch(
                contactsReducer({
                  type: "VIEW_CONTACT",
                  contact_id: "add",
                })
              );
              handleScreen("Contact");
            }}
          >
            {({ pressed }) => (
              <ThemedFontAwesome5
                name="plus"
                size={20}
                style={{ opacity: pressed ? 0.5 : 1 }}
              />
            )}
          </Pressable>
          <Pressable
            style={{
              paddingVertical: 10,
              paddingHorizontal: 20,
            }}
            onPress={() => {
              handleScreen("Menu");
            }}
          >
            {({ pressed }) => (
              <ThemedIonicons
                name="settings-sharp"
                size={22}
                style={{ opacity: pressed ? 0.5 : 1 }}
              />
            )}
          </Pressable>
          {/* <TouchableOpacity
                style={{
                  paddingVertical: 5,
                  paddingRight: 20,
                  paddingLeft: 30,
                }}
                onPress={() => {
                  navigation.navigate("Menu");
                }}
              >
                <Ionicons name="menu-outline" size={25} color={"gray"} />
              </TouchableOpacity> */}
        </View>
      </View>
      <ContactListView
        contactsAlphabetical={_contactsAlphabetical}
        handleScreen={handleScreen}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    // paddingTop: 35,
    flex: 1,
    display: "flex",
    width: windowWidth,
    alignItems: "center",
    justifyContent: "center",
  },
  horizontal_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    width: windowWidth * 0.65,
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
