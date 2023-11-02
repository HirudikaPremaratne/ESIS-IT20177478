import React from "react";
import RootNavigation from "./src/navigation";
import { useFonts } from "expo-font";

const App = () => {
  const [loaded] = useFonts({
    OpenSansBold: require("./assets/fonts/OpenSans-Bold.ttf"),
    OpenSansSemiBold: require("./assets/fonts/OpenSans-SemiBold.ttf"),
    OpenSansMedium: require("./assets/fonts/OpenSans-Medium.ttf"),
    OpenSansRegular: require("./assets/fonts/OpenSans-Regular.ttf"),
    OpenSansLight: require("./assets/fonts/OpenSans-Light.ttf"),
  });

  if (!loaded) return null;
  return <RootNavigation />;
};

export default App;
