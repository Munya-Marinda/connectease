import Ionicons from "@expo/vector-icons/Ionicons";
import { useColorScheme } from "react-native";

export function ThemedIonicons({ name = "question", size = 20, style = {} }) {
  // const theme = "dark";
  const theme = useColorScheme() ?? "light";
  //
  return (
    <Ionicons
      name={name}
      size={size}
      color={theme === "dark" ? "white" : "black"}
      style={style}
    />
  );
}
