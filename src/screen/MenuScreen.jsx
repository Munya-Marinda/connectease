import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Button,
} from "react-native";
import { clearContacts } from "../functions/handleContactData";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

//
const MenuScreen = () => {
  //
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.setting_parent}>
          <Text>Clear all contacts data.</Text>
          <Button
            onPress={() => {
              clearContacts();
            }}
            title="Clear"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    width: windowWidth,
    alignItems: "center",
    justifyContent: "center",
  },
  setting_parent_top: {
    display: "flex",
    borderTopWidth: 1,
    paddingVertical: 10,
    alignItems: "center",
    flexDirection: "row",
    borderTopColor: "silver",
    width: windowWidth * 0.9,
    justifyContent: "space-between",
  },
  setting_parent: {
    display: "flex",
    borderTopWidth: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderBottomWidth: 1,
    flexDirection: "row",
    borderTopColor: "silver",
    width: windowWidth * 0.9,
    borderBottomColor: "silver",
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
