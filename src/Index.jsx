import {
  StyleSheet,
  Dimensions,
  Animated,
  useColorScheme,
  Text,
} from "react-native";
import HomeScreen from "./screen/HomeScreen";
import AddOrEditContactScreen from "./screen/AddOrEditContactScreen";
import MenuScreen from "./screen/MenuScreen";
import SearchScreen from "./screen/SearchScreen";
import { useEffect, useRef, useState } from "react";
import { getContacts, sortAndGroupByName } from "./functions/handleContactData";
import { Provider, useDispatch } from "react-redux";
import store from "./store/store";
import { contactsReducer } from "./store/features/contacts/contactsSlice";
import { useSelector } from "react-redux";
import { View } from "./components/Themed";
import { ThemedStatusBar } from "./components/ThemedStatusBar";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export function Index() {
  const theme = useColorScheme();
  // const theme = "dark";

  //
  const [currentScreen, setCurrentScreen] = useState("Home");
  const contact_id = useSelector((state) => state.contacts.value.contact_id);
  const redux_contacts = useSelector((state) => state.contacts.value?.contacts);
  //
  const dispatch = useDispatch();
  const contactsAlphabetical = redux_contacts;
  //
  useEffect(() => {
    const fetchContacts = async () => {
      const contacts = await getContacts();
      dispatch(
        contactsReducer({
          type: "UPDATE_CONTACTS",
          contacts: sortAndGroupByName(contacts),
        })
      );
    };
    fetchContacts();
  }, []);
  //
  const FadeInView = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, [fadeAnim]);

    return (
      <Animated.View
        style={{
          flex: 1,
          opacity: fadeAnim,
          position: "absolute",
          width: windowWidth,
          alignItems: "flex-start",
          justifyContent: "flex-start",
          backgroundColor: theme === "light" ? "white" : "black",
        }}
      >
        {props.children}
      </Animated.View>
    );
  };
  //
  const handleScreen = (screen) => {
    setCurrentScreen(screen);
  };
  //
  return (
    <View style={styles.container}>
      <ThemedStatusBar />
      {currentScreen === "Search" && (
        <FadeInView>
          <SearchScreen handleScreen={handleScreen} />
        </FadeInView>
      )}
      {currentScreen === "Menu" && (
        <FadeInView>
          <MenuScreen handleScreen={handleScreen} />
        </FadeInView>
      )}
      {currentScreen === "Contact" && (
        <FadeInView>
          <AddOrEditContactScreen
            contact_id={contact_id}
            handleScreen={handleScreen}
          />
        </FadeInView>
      )}
      {currentScreen === "Home" && (
        <FadeInView>
          <HomeScreen
            _contactsAlphabetical={contactsAlphabetical}
            handleScreen={handleScreen}
          />
        </FadeInView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: windowHeight,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});
