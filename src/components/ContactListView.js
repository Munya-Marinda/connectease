import Ionicons from "@expo/vector-icons/Ionicons";
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import {
  openEmailApp,
  openPhoneApp,
  openWhatsAppWithMessage,
} from "../functions/handleContactData";
import { Text, View } from "../components/Themed";
import { useDispatch } from "react-redux";
import { contactsReducer } from "../store/features/contacts/contactsSlice";
import { useEffect } from "react";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const GLOBAL_GRAY = "silver";

//
const ContactListView = ({ searching, contactsAlphabetical, handleScreen }) => {
  const dispatch = useDispatch();
  //
  const ErrorMessage = () => {
    return (
      <>
        {searching ? (
          <Text></Text>
        ) : (
          <TouchableOpacity onPress={() => handleScreen("Contact")}>
            <Text
              style={{
                textDecorationLine: "underline",
              }}
            >
              ADD NEW CONTACT
            </Text>
          </TouchableOpacity>
        )}
      </>
    );
  };
  //
  //
  const ContactCard = ({ contact }) => {
    //
    //
    return (
      <>
        <View
          lightColor="white"
          darkColor="rgba(0,0,0,1)"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            backgroundColor: "transparent",
          }}
        >
          <View
            lightColor="silver"
            darkColor="rgba(255,255,255,0.2)"
            style={{
              paddingVertical: 10,
              paddingHorizontal:
                typeof contact.name.split(" ")[1] === "string" ? 10 : 15,
              borderRadius: 40,
            }}
          >
            <Text>
              {contact.name.trim().substring(0, 1).toUpperCase()}
              {typeof contact.name.trim().split(" ")[1] === "string"
                ? contact.name
                    .trim()
                    .split(" ")[1]
                    .substring(0, 1)
                    .toUpperCase()
                : ""}
            </Text>
          </View>
          <Text style={{ marginLeft: 10 }}>
            {contact.name.substring(0, 20)}...
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            backgroundColor: "transparent",
          }}
        >
          {contact.whatsapp.trim().length > 0 && (
            <TouchableOpacity
              onPress={() => {
                const final_number =
                  contact.whatsapp_country_code.code + contact.whatsapp;
                openWhatsAppWithMessage(final_number, "Hey " + contact.name);
              }}
              style={{
                padding: 5,
                borderRadius: 40,
                backgroundColor: "#075E54",
                marginHorizontal: 3,
              }}
            >
              <Ionicons name="logo-whatsapp" size={15} color="white" />
            </TouchableOpacity>
          )}
          {contact.number.trim().length > 0 && (
            <TouchableOpacity
              onPress={() => {
                openPhoneApp(
                  "+" + contact.number_country_code.code + contact.number
                );
              }}
              style={{
                padding: 5,
                borderRadius: 40,
                backgroundColor: "green",
                marginHorizontal: 3,
              }}
            >
              <Ionicons name="call" size={15} color="white" />
            </TouchableOpacity>
          )}
          {contact.email.trim().length > 0 && (
            <TouchableOpacity
              onPress={() => {
                openEmailApp(contact.email, "Email subject", "Email body");
              }}
              style={{
                padding: 5,
                borderRadius: 40,
                backgroundColor: "blue",
                marginHorizontal: 3,
              }}
            >
              <Ionicons name="mail" size={15} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </>
    );
  };
  //
  return (
    <ScrollView
      style={{
        height: windowHeight * 0.9,
      }}
    >
      {contactsAlphabetical !== undefined &&
      contactsAlphabetical !== null &&
      typeof contactsAlphabetical === "object" ? (
        <>
          {Object.keys(contactsAlphabetical).length > 0 ? (
            <>
              {Object.keys(contactsAlphabetical).map((key, index1) => (
                <View
                  lightColor="white"
                  darkColor="rgba(0,0,0,1)"
                  style={{ marginTop: index1 !== 0 ? 30 : 0 }}
                  key={index1}
                >
                  <View
                    lightColor="white"
                    darkColor="rgba(0,0,0,1)"
                    style={{
                      marginBottom: 5,
                    }}
                  >
                    <Text
                      style={{
                        borderRadius: 20,
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "silver",
                      }}
                    >
                      {key.toUpperCase()}
                    </Text>
                  </View>
                  {contactsAlphabetical[key].map((contact, index) => (
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(
                          contactsReducer({
                            type: "VIEW_CONTACT",
                            contact_id: parseInt(contact.id),
                          })
                        );
                        handleScreen("Contact");
                      }}
                      key={index}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignContent: "center",
                        justifyContent: "space-between",
                        paddingHorizontal: 10,
                        paddingVertical: 15,
                        borderWidth: 1,
                        borderRadius: 10,
                        marginVertical: 2,
                        borderColor: GLOBAL_GRAY,
                        width: windowWidth * 0.9,
                      }}
                    >
                      <ContactCard contact={contact} />
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
            </>
          ) : (
            <ErrorMessage />
          )}
        </>
      ) : (
        <ErrorMessage />
      )}
    </ScrollView>
  );
};

export default ContactListView;

const styles = StyleSheet.create({});
