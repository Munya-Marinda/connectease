// import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { contactsReducer } from "../store/features/contacts/contactsSlice";
import { Text, View } from "./Themed";
import { Button, Pressable } from "react-native";

const WtestCounter = () => {
  const contacts = useSelector((state) => state.contacts.value);
  const dispatch = useDispatch();

  return (
    <View>
      <View>
        <Pressable onPress={() => dispatch(contactsReducer())}>
          <Text>contactsReducer</Text>
        </Pressable>
        <Text>{JSON.stringify(contacts)}</Text>
      </View>
    </View>
  );
};
export default WtestCounter;
