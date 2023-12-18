import { StyleSheet, Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screen/HomeScreen";
import AddOrEditContactScreen from "./screen/AddOrEditContactScreen";
import MenuScreen from "./screen/MenuScreen";
import SearchScreen from "./screen/SearchScreen";
import { useEffect, useState } from "react";
import { getContacts, sortAndGroupByName } from "./functions/handleContactData";
import { Provider, useDispatch } from "react-redux";
import store from "./store/store";
import { contactsReducer } from "./store/features/contacts/contactsSlice";
import { useSelector } from "react-redux";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export function Index() {
  //
  const contact_id = useSelector((state) => state.contacts.value.contact_id);
  const redux_contacts = useSelector((state) => state.contacts.value?.contacts);
  const Stack = createStackNavigator();
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
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            children={() => {
              return (
                <HomeScreen _contactsAlphabetical={contactsAlphabetical} />
              );
            }}
            options={{ header: () => <></> }}
          />
          <Stack.Screen name="Menu" component={MenuScreen} />

          <Stack.Screen
            name="Contact"
            children={() => {
              return <AddOrEditContactScreen contact_id={contact_id} />;
            }}
          />

          <Stack.Screen
            name="Search"
            component={SearchScreen}
            options={{ header: () => <></> }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
