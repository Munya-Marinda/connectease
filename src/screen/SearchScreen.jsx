import { useState, useEffect } from "react";
import { StyleSheet, TextInput, Dimensions, Pressable } from "react-native";
import ContactListView from "../components/ContactListView";
import { useColorScheme } from "react-native";
import { searchItems } from "../functions/handleContactData";
import { Text, View } from "../components/Themed";
import { ThemedStatusBar } from "../components/ThemedStatusBar";
import { FontAwesome5 } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

//
const SearchScreen = () => {
  //
  const navigation = useNavigation();
  const theme = useColorScheme();
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
  return (
    <View style={styles.container} lightColor="white" darkColor="rgba(0,0,0,1)">
      <ThemedStatusBar />
      <View
        style={{
          display: "flex",
          width: windowWidth * 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: 30,
          marginBottom: 10,
          borderBottomColor: theme === "dark" ? "white" : "transparent",
          borderBottomWidth: 1,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            // paddingHorizontal: 10,
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Pressable
            style={{
              paddingLeft: 20,
            }}
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <Text>CLOSE</Text>
          </Pressable>
          {/* <Pressable
            style={{
              paddingLeft: 20,
            }}
            onPress={() => {
              handleSearch();
            }}
          >
            {({ pressed }) => (
              <FontAwesome5
                name="search"
                color="silver"
                size={20}
                style={{ opacity: pressed ? 0.5 : 1 }}
              />
            )}
          </Pressable> */}
          <TextInput
            style={{
              width: windowWidth * 0.7,
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
    paddingTop: 20,
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
