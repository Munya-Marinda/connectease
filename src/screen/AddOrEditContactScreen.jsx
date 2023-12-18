// import { Link, router, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Dimensions,
  Pressable,
} from "react-native";
import { Text, View, TextInput } from "../components/Themed";
import {
  addContact,
  countryPhoneCodes,
  deleteContactData,
  generateContacts,
  getContactByID,
  getContacts,
  getCountryPhoneCodes,
  openWhatsAppWithMessage,
  sortAndGroupByName,
  updateContactData,
  validateContactData,
} from "../functions/handleContactData";
import { ThemedStatusBar } from "../components/ThemedStatusBar";
import { ThemedFontAwesome5 } from "../components/ThemedFontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { contactsReducer } from "../store/features/contacts/contactsSlice";
import { Dropdown } from "react-native-element-dropdown";
import Ionicons from "@expo/vector-icons/Ionicons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

//
const AddOrEditContactScreen = ({ contact_id }) => {
  const data = getCountryPhoneCodes();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isFocus, setIsFocus] = useState(false);
  const [showWhatsAppCountryCodes, setShowWhatsAppCountryCodes] =
    useState(false);
  const [showNumberCountryCodes, setShowNumberCountryCodes] = useState(false);
  //
  const type = {
    type: isNaN(parseInt(contact_id)) ? "add" : "edit",
    id: !isNaN(parseInt(contact_id)) ? parseInt(contact_id) : -1,
  };
  //
  const [contactInformation, setContactInformation] = useState({
    id: 0,
    email: "",
    name: "",
    notes: "",
    number: "",
    number_country_code: countryPhoneCodes[198],
    other_fields: [],
    whatsapp: "",
    whatsapp_country_code: countryPhoneCodes[198],
  });
  //
  const [isEditing, setIsEditing] = useState(
    type.type === "add" ? true : false
  );
  //
  const [messageObj, setMessageObj] = useState({
    name: { result: true, message: "" },
  });
  //
  useEffect(() => {
    if (type.type === "edit") {
      const fetchContactByID = async () => {
        const contact = await getContactByID(type.id);
        if (
          contact !== null &&
          contact !== undefined &&
          typeof contact === "object"
        ) {
          if (Object.keys(contact).length > 0) {
            setContactInformation(contact);
          }
        }
      };
      fetchContactByID();
    }
    //
  }, []);
  //
  const TextValue = ({
    text_value,
    lable_text,
    isPhoneNumber,
    country_code,
  }) => {
    return (
      <>
        <Text
          style={{
            marginBottom: 10,
            color: "gray",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          {lable_text}
        </Text>
        <Text
          style={{
            borderWidth: 1,
            borderColor: "rgba(0,0,0,0.1)",
            paddingVertical: 10,
            paddingHorizontal: 10,
            width: windowWidth * 0.9,
          }}
        >
          {isPhoneNumber && country_code + " "}
          {text_value}
        </Text>
      </>
    );
  };
  //
  const fetchAndUpdateReduxContacts = async () => {
    const contacts = await getContacts();
    dispatch(
      contactsReducer({
        type: "UPDATE_CONTACTS",
        contacts: sortAndGroupByName(contacts),
      })
    );
    navigation.navigate("Home");
  };
  //
  const __validateContactInformation = () => {
    const result = _validateContactInformation()?.name?.result;
    if (result === false) {
      setContactInformation({
        ...contactInformation,
        name: "",
      });
    }
    return result;
  };
  //
  const _validateContactInformation = (
    key = "name",
    value = contactInformation.name,
    type = "text"
  ) => {
    //
    const OBJ = validateContactData(key, value, type);
    //
    const OBJ_result = OBJ.result;
    const OBJ_message = OBJ.message;
    //
    const RESULT = messageObj;
    RESULT[key] = { result: OBJ_result, message: OBJ_message };
    //
    setMessageObj(RESULT);
    return RESULT;
  };
  //
  return (
    <View style={styles.container}>
      <ThemedStatusBar />

      <View
        style={{
          display: "flex",
          width: windowWidth * 1,
          flexDirection: "row",
          alignContent: "center",
          justifyContent: "flex-end",
        }}
      >
        {isEditing ? (
          <TouchableOpacity
            style={{
              // paddingTop: 10,
              paddingBottom: 20,
              paddingHorizontal: 20,
            }}
            onPress={() => {
              setContactInformation(generateContacts());
            }}
          >
            <Text style={{ color: "blue" }}>INSERT TEST DATA</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              paddingTop: 10,
              paddingBottom: 20,
              paddingHorizontal: 20,
            }}
            onPress={() => {
              setIsEditing(true);
            }}
          >
            <Text>EDIT</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        style={{
          // paddingRight: 15,
          width: windowWidth * 0.9,
          height: windowHeight * 0.82,
        }}
      >
        <View style={styles.input_parent}>
          {isEditing ? (
            <>
              <Text style={styles.label}>Name</Text>
              <TextInput
                editable={!isEditing ? false : true}
                value={contactInformation.name}
                onChangeText={(value) => {
                  setContactInformation({
                    ...contactInformation,
                    name: value,
                  });
                }}
                style={[
                  styles.text_input,
                  ,
                  {
                    borderColor: messageObj?.name?.result ? "silver" : "red",
                  },
                ]}
                placeholder="Enter Name"
              />
              <Text style={styles.error_label}>
                {messageObj?.name?.message[0]}
              </Text>
            </>
          ) : (
            <TextValue
              text_value={contactInformation.name}
              lable_text={"Name"}
            />
          )}
        </View>

        <View style={styles.input_parent}>
          {isEditing ? (
            <>
              <Text style={styles.label}>Contact Number</Text>
              <View
                style={{
                  marginTop: 10,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {showNumberCountryCodes ? (
                  <>
                    <Pressable
                      style={{
                        padding: 5,
                      }}
                      onPress={() => {
                        setShowNumberCountryCodes(false);
                      }}
                    >
                      {({ pressed }) => (
                        <Ionicons
                          name="close-circle"
                          size={25}
                          color={"silver"}
                        />
                      )}
                    </Pressable>
                    <Dropdown
                      style={[
                        {
                          borderWidth: 1,
                          borderColor: "silver",
                          width: windowWidth * 0.8,
                        },
                        isFocus && { borderColor: "blue" },
                      ]}
                      placeholderStyle={{}}
                      selectedTextStyle={{ paddingHorizontal: 10 }}
                      inputSearchStyle={{}}
                      iconStyle={{}}
                      itemContainerStyle={{
                        backgroundColor: "white",
                        paddingHorizontal: 0,
                      }}
                      itemTextStyle={{
                        backgroundColor: "white",
                        paddingHorizontal: 0,
                      }}
                      containerStyle={{
                        backgroundColor: "white",
                        paddingHorizontal: 0,
                      }}
                      data={data}
                      labelField="label"
                      valueField="value"
                      placeholder={!isFocus ? "27" : "27"}
                      value={contactInformation.number_country_code.code}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={(item) => {
                        setContactInformation({
                          ...contactInformation,
                          number_country_code: countryPhoneCodes[item._index],
                        });
                        setShowNumberCountryCodes(false);
                      }}
                    />
                  </>
                ) : (
                  <>
                    <Pressable
                      style={{
                        display: "flex",
                        paddingVertical: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        width: windowWidth * 0.2,
                        backgroundColor: "#ededed",
                        justifyContent: "space-between",
                        borderWidth: 1,
                        borderColor: "silver",
                      }}
                      onPress={() => {
                        setShowNumberCountryCodes(true);
                      }}
                    >
                      {({ pressed }) => (
                        <>
                          <Ionicons
                            name="caret-down"
                            size={15}
                            color={"gray"}
                            style={{ paddingLeft: 5 }}
                          />
                          <Text
                            style={{ textAlign: "center", paddingRight: 10 }}
                          >
                            {contactInformation.number_country_code.code}
                          </Text>
                        </>
                      )}
                    </Pressable>
                    <TextInput
                      inputMode="numeric"
                      editable={!isEditing ? false : true}
                      onChangeText={(value) => {
                        setContactInformation({
                          ...contactInformation,
                          number: value,
                        });
                      }}
                      onBlur={() => {
                        __validateContactInformation();
                      }}
                      value={contactInformation.number}
                      style={[
                        styles.text_input,
                        {
                          width: windowWidth * 0.75,
                          marginTop: 0,
                        },
                      ]}
                      placeholder="Enter Contact Number"
                    />
                  </>
                )}
              </View>
            </>
          ) : (
            <TextValue
              text_value={contactInformation.number}
              lable_text={"Contact Number"}
              isPhoneNumber
              country_code={contactInformation.number_country_code.code}
            />
          )}
        </View>

        <View style={styles.input_parent}>
          {isEditing ? (
            <>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.label}>WhatsApp Number</Text>
                {type.type === "add" && (
                  <>
                    <TouchableOpacity
                      onPress={() => {
                        setContactInformation((prevContactInfo) => ({
                          ...prevContactInfo,
                          whatsapp: prevContactInfo.number,
                          whatsapp_country_code:
                            prevContactInfo.number_country_code,
                        }));
                      }}
                    >
                      <Text
                        style={{
                          color: "gray",
                          textDecorationLine: "underline",
                          fontSize: 12,
                          marginLeft: 10,
                        }}
                      >
                        Same as Contact Number?
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>

              <View
                style={{
                  marginTop: 10,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {showWhatsAppCountryCodes ? (
                  <>
                    <Pressable
                      style={{
                        padding: 5,
                      }}
                      onPress={() => {
                        setShowWhatsAppCountryCodes(false);
                      }}
                    >
                      {({ pressed }) => (
                        <Ionicons
                          name="close-circle"
                          size={25}
                          color={"silver"}
                        />
                      )}
                    </Pressable>
                    <Dropdown
                      style={[
                        {
                          borderWidth: 1,
                          borderColor: "silver",
                          width: windowWidth * 0.8,
                        },
                        isFocus && { borderColor: "blue" },
                      ]}
                      placeholderStyle={{}}
                      selectedTextStyle={{ paddingHorizontal: 10 }}
                      inputSearchStyle={{}}
                      iconStyle={{}}
                      itemContainerStyle={{
                        backgroundColor: "white",
                        paddingHorizontal: 0,
                      }}
                      itemTextStyle={{
                        backgroundColor: "white",
                        paddingHorizontal: 0,
                      }}
                      containerStyle={{
                        backgroundColor: "white",
                        paddingHorizontal: 0,
                      }}
                      data={data}
                      labelField="label"
                      valueField="value"
                      placeholder={!isFocus ? "27" : "27"}
                      value={contactInformation.whatsapp_country_code.code}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={(item) => {
                        setContactInformation({
                          ...contactInformation,
                          whatsapp_country_code: countryPhoneCodes[item._index],
                        });
                        setShowWhatsAppCountryCodes(false);
                      }}
                    />
                  </>
                ) : (
                  <>
                    <Pressable
                      style={{
                        display: "flex",
                        paddingVertical: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        width: windowWidth * 0.2,
                        backgroundColor: "#ededed",
                        justifyContent: "space-between",
                        borderWidth: 1,
                        borderColor: "silver",
                      }}
                      onPress={() => {
                        setShowWhatsAppCountryCodes(true);
                      }}
                    >
                      {({ pressed }) => (
                        <>
                          <Ionicons
                            name="caret-down"
                            size={15}
                            color={"gray"}
                            style={{ paddingLeft: 5 }}
                          />
                          <Text
                            style={{ textAlign: "center", paddingRight: 10 }}
                          >
                            {contactInformation.whatsapp_country_code.code}
                          </Text>
                        </>
                      )}
                    </Pressable>
                    <TextInput
                      inputMode="numeric"
                      editable={!isEditing ? false : true}
                      onChangeText={(value) => {
                        setContactInformation({
                          ...contactInformation,
                          whatsapp: value,
                        });
                      }}
                      value={contactInformation.whatsapp}
                      style={[
                        styles.text_input,
                        {
                          width: windowWidth * 0.75,
                          marginTop: 0,
                        },
                      ]}
                      placeholder="Enter WhatsApp Number"
                    />
                  </>
                )}
              </View>
              {contactInformation.whatsapp.length > 5 && (
                <TouchableOpacity
                  onPress={() => {
                    const final_number =
                      contactInformation.whatsapp_country_code.code +
                      contactInformation.whatsapp;
                    openWhatsAppWithMessage(final_number, "Hey.");
                  }}
                >
                  <Text
                    style={{
                      color: "gray",
                      textDecorationLine: "underline",
                      fontSize: 12,
                      marginTop: 5,
                    }}
                  >
                    Test Number
                  </Text>
                </TouchableOpacity>
              )}
            </>
          ) : (
            <TextValue
              text_value={contactInformation.whatsapp}
              lable_text={"WhatsApp"}
              isPhoneNumber
              country_code={contactInformation.whatsapp_country_code.code}
            />
          )}
        </View>
        <View style={styles.input_parent}>
          {isEditing ? (
            <>
              <Text style={styles.label}>Email</Text>
              <TextInput
                keyboardType="email-address"
                editable={!isEditing ? false : true}
                onChangeText={(value) => {
                  setContactInformation({
                    ...contactInformation,
                    email: value,
                  });
                }}
                value={contactInformation.email}
                style={styles.text_input}
                placeholder="Enter Email"
              />
            </>
          ) : (
            <TextValue
              text_value={contactInformation.email}
              lable_text={"Email"}
            />
          )}
        </View>

        <View style={styles.input_parent}>
          {isEditing ? (
            <>
              <Text style={styles.label}>Notes</Text>
              <TextInput
                editable={!isEditing ? false : true}
                style={[styles.text_input_multi]}
                onChangeText={(value) => {
                  setContactInformation({
                    ...contactInformation,
                    notes: value,
                  });
                }}
                value={contactInformation.notes}
                placeholder={"Add A Note\n...\n...\n...\n\n\n\n\n\n\n\n\n\n"}
                placeholderTextColor={"silver"}
                multiline={true}
                textAlignVertical="top"
              />
            </>
          ) : (
            <TextValue
              text_value={contactInformation.notes}
              lable_text={"Notes"}
            />
          )}
        </View>
      </ScrollView>

      <View style={styles.button_group_1}>
        {type.type === "edit" && (
          <TouchableOpacity
            onPress={() => {
              Alert.alert("Delete Contact", "Delete contact?", [
                {
                  text: "Cancel",
                  onPress: () => {
                    return false;
                  },
                  style: "cancel",
                },
                {
                  text: "OK",
                  onPress: () => {
                    const _deleteContactData = async () => {
                      const result = await deleteContactData(
                        contactInformation
                      );
                      fetchAndUpdateReduxContacts();
                    };
                    _deleteContactData();
                  },
                },
              ]);
            }}
            style={styles.button_style_2}
          >
            <Text style={{ fontWeight: "bold", color: "red" }}>DELETE</Text>
          </TouchableOpacity>
        )}

        {isEditing && (
          <TouchableOpacity
            onPress={() => {
              if (type.type === "add") {
                if (__validateContactInformation() === true) {
                  const _addContact = async () => {
                    const result = await addContact(contactInformation);
                    fetchAndUpdateReduxContacts();
                  };
                  _addContact();
                }
              } else if (type.type === "edit") {
                if (__validateContactInformation() === true) {
                  Alert.alert(
                    "Save Changes",
                    "Update contact with new changes?",
                    [
                      {
                        text: "Cancel",
                        onPress: () => {
                          return false;
                        },
                        style: "cancel",
                      },
                      {
                        text: "OK",
                        onPress: () => {
                          const _updateContactData = async () => {
                            const result = await updateContactData(
                              contactInformation
                            );
                            fetchAndUpdateReduxContacts();
                          };
                          _updateContactData();
                        },
                      },
                    ]
                  );
                }
              }
            }}
            style={styles.button_style_2}
          >
            <Text style={{ fontWeight: "bold" }}>SAVE</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default AddOrEditContactScreen;

const styles = StyleSheet.create({
  container: {
    // paddingTop: 20,
    width: windowWidth,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  input_parent: {
    marginBottom: 40,
  },
  text_input: {
    marginTop: 10,
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderColor: "silver",
  },
  label: {},
  error_label: {
    paddingTop: 5,
    color: "red",
    fontSize: 11,
  },
  text_input_multi: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "silver",
    padding: 5,
  },
  button_group: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    width: windowWidth * 1,
    justifyContent: "space-between",
  },
  button_group_1: {
    display: "flex",
    borderTopWidth: 1,
    alignItems: "center",
    flexDirection: "row",
    width: windowWidth * 1,
    borderTopColor: "silver",
    justifyContent: "space-evenly",
  },
  button_style_2: {
    display: "flex",
    paddingVertical: 20,
    alignItems: "center",
    flexDirection: "center",
    width: windowWidth * 0.5,
    justifyContent: "center",
  },
});
