import { StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Text, View } from "./Themed";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  openEmailApp,
  openPhoneApp,
  openWhatsAppWithMessage,
} from "../functions/handleContactData";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export function ContactActions({ contact }) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "transparent",
        marginBottom: 30,
        // borderColor: "silver",
        // borderWidth: 1,
      }}
    >
      {contact.whatsapp.trim().length > 0 && (
        <View style={styles.icon_container}>
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
            <Ionicons name="logo-whatsapp" size={30} color="white" />
          </TouchableOpacity>
          <Text style={styles.label}>WHATSAPP</Text>
        </View>
      )}
      {contact.number.trim().length > 0 && (
        <View style={styles.icon_container}>
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
            <Ionicons name="call" size={30} color="white" />
          </TouchableOpacity>
          <Text style={styles.label}>CALL</Text>
        </View>
      )}
      {contact.email.trim().length > 0 && (
        <View style={styles.icon_container}>
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
            <Ionicons name="mail" size={30} color="white" />
          </TouchableOpacity>
          <Text style={styles.label}>EMAIL</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
  },
  label: { fontSize: 9, marginTop: 5 },
  icon_container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "flex-start",
    marginHorizontal: 5,
  },
});
