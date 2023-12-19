import { StyleSheet, Dimensions } from "react-native";
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
  // const contact_id = 3;
  // const redux_contacts = {
  //   f: [
  //     {
  //       id: 3,
  //       name: "FusionFlavors Catering",
  //       email: "fusionflavorscatering758@example.com",
  //       number: "601234567",
  //       whatsapp: "839876543",
  //       notes:
  //         "Identified John Smith as the key decision maker in the organization.",
  //       other_fields: [
  //         { name: "Website", value: "https://www.fusionflavorscatering.com" },
  //         {
  //           name: "LinkedIn",
  //           value: "https://www.linkedin.com/in/robertwilson",
  //         },
  //         {
  //           name: "Facebook",
  //           value: "https://www.facebook.com/fusionflavorscatering",
  //         },
  //         {
  //           name: "Instagram",
  //           value: "https://www.instagram.com/fusionflavorscatering",
  //         },
  //         {
  //           name: "Twitter",
  //           value: "https://www.twitter.com/fusionflavorscatering",
  //         },
  //         {
  //           name: "Address",
  //           value: "7890 Acacia Crescent, East London, Eastern Cape, 5201",
  //         },
  //       ],
  //       whatsapp_country_code: { country: "Cuba", code: "+53", iso: "CU" },
  //       number_country_code: { country: "Comoros", code: "+269", iso: "KM" },
  //     },
  //   ],
  //   g: [
  //     {
  //       id: 1,
  //       name: "GreenLeaf Organics",
  //       email: "greenleaforganics129@example.com",
  //       number: "798765432",
  //       whatsapp: "823456789",
  //       notes: "Reached out via email; waiting for response.",
  //       other_fields: [
  //         { name: "Website", value: "https://www.greenleaforganics.com" },
  //         {
  //           name: "LinkedIn",
  //           value: "https://www.linkedin.com/in/olivialopez",
  //         },
  //         {
  //           name: "Facebook",
  //           value: "https://www.facebook.com/greenleaforganics",
  //         },
  //         {
  //           name: "Instagram",
  //           value: "https://www.instagram.com/greenleaforganics",
  //         },
  //         {
  //           name: "Twitter",
  //           value: "https://www.twitter.com/greenleaforganics",
  //         },
  //         {
  //           name: "Address",
  //           value: "7890 Acacia Crescent, East London, Eastern Cape, 5201",
  //         },
  //       ],
  //       whatsapp_country_code: {
  //         country: "Micronesia",
  //         code: "+691",
  //         iso: "FM",
  //       },
  //       number_country_code: { country: "Iraq", code: "+964", iso: "IQ" },
  //     },
  //   ],
  //   s: [
  //     {
  //       id: 2,
  //       name: "Sparkling Innovations",
  //       email: "sparklinginnovations124@example.com",
  //       number: "823456789",
  //       whatsapp: "712345678",
  //       notes:
  //         "Client expressed interest in a product demo; set up a demo session.",
  //       other_fields: [
  //         { name: "Website", value: "https://www.sparklinginnovations.com" },
  //         {
  //           name: "LinkedIn",
  //           value: "https://www.linkedin.com/in/alexanderwang",
  //         },
  //         {
  //           name: "Facebook",
  //           value: "https://www.facebook.com/sparklinginnovations",
  //         },
  //         {
  //           name: "Instagram",
  //           value: "https://www.instagram.com/sparklinginnovations",
  //         },
  //         {
  //           name: "Twitter",
  //           value: "https://www.twitter.com/sparklinginnovations",
  //         },
  //         {
  //           name: "Address",
  //           value: "5678 Oak Avenue, Cape Town, Western Cape, 8000",
  //         },
  //       ],
  //       whatsapp_country_code: { country: "Guyana", code: "+592", iso: "GY" },
  //       number_country_code: { country: "Netherlands", code: "+31", iso: "NL" },
  //     },
  //   ],
  // };
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
  const handleScreen = (screen) => {
    setCurrentScreen(screen);
  };
  //
  return (
    <>
      {currentScreen === "Search" && (
        <SearchScreen handleScreen={handleScreen} />
      )}
      {currentScreen === "Menu" && (
        <MenuScreen handleScreen={handleScreen} />
      )}
      {currentScreen === "Contact" && (
        <AddOrEditContactScreen
          contact_id={contact_id}
          handleScreen={handleScreen}
        />
      )}
      {currentScreen === "Home" && (
        <HomeScreen
          _contactsAlphabetical={contactsAlphabetical}
          handleScreen={handleScreen}
        />
      )}
    </>
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
