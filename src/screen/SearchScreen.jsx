import { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  Dimensions,
  Pressable,
  BackHandler,
} from "react-native";
import ContactListView from "../components/ContactListView";
import { useColorScheme } from "react-native";
import { searchItems } from "../functions/handleContactData";
import { Text, View } from "../components/Themed";
import { FontAwesome5 } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { ThemedFontAwesome5 } from "../components/ThemedFontAwesome5";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

//
const SearchScreen = ({ handleScreen }) => {
  //
  const theme = useColorScheme();
  // const theme = "dark";
  const [searchingTerm, setSearchingTerm] = useState("");
  //
  const [contactsAlphabetical, setContactsAlphabetical] = useState([]);

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = (term = null) => {
    if (term === null) {
      term = searchingTerm;
    }
    const fetchSearchResults = async () => {
      const results = await searchItems(term);
      setContactsAlphabetical(results);
    };
    fetchSearchResults();
  };
  //
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
    <View style={styles.container} lightColor="white" darkColor="rgba(0,0,0,1)">
      <View
        style={{
          display: "flex",
          width: windowWidth * 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
          borderBottomColor: theme === "dark" ? "white" : "transparent",
          borderBottomWidth: 1,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: windowWidth * 1,
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
          <TextInput
            style={{
              // width: windowWidth * 0.7,
              // backgroundColor: "silver",
              color: theme === "dark" ? "white" : "black",
            }}
            textAlign="center"
            placeholderTextColor={"silver"}
            placeholder="Search ..."
            value={searchingTerm}
            onEndEditing={() => {
              handleSearch();
            }}
            onChangeText={(term) => {
              setSearchingTerm(term);
              handleSearch(term);
            }}
          />
          <Pressable
            style={{
              paddingHorizontal: 20,
              opacity: 0,
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
        </View>
      </View>
      <ContactListView
        contactsAlphabetical={contactsAlphabetical}
        searching={true}
      />
    </View>
  );
};

export default SearchScreen;

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
