import { useState } from "react";
import { TouchableOpacity, Text, ScrollView, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function DropDown({ options, handle_chosen_index }) {
  //
  const _handle_chosen_index = (index) => {
    handle_chosen_index(index);
  };
  //
  //
  return (
    <ScrollView
      style={{
        top: 0,
        left: 0,
        zIndex: 999,
        backgroundColor: "silver",
        height: windowHeight * 0.5,
      }}
    >
      {options.map((option, index) => {
        return (
          <TouchableOpacity
            onPress={() => {
              _handle_chosen_index(index);
            }}
            key={index}
          >
            <Text>{option}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
