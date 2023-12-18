import { FontAwesome5 } from "@expo/vector-icons";
import { useColorScheme } from "react-native";

export function ThemedFontAwesome5({
  name = "question",
  size = 20,
  style = {},
}) {
  const theme = useColorScheme() ?? "light";
  //
  return (
    <FontAwesome5
      name={name}
      size={size}
      color={theme === "dark" ? "white" : "black"}
      style={style}
    />
  );
}
