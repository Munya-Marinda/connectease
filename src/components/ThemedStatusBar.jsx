import { StatusBar } from "react-native";
import { useColorScheme } from "react-native";

export function ThemedStatusBar() {
  // const theme = "dark";
  const theme = useColorScheme() ?? "light";
  //
  return <StatusBar backgroundColor={theme === "dark" ? "black" : "white"} />;
}
