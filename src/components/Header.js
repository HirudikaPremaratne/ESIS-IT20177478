import { View, Text } from "react-native";

export const Header = () => {
  return (
    <View style={{ marginTop: 24 }}>
      <Text
        style={{
          paddingLeft: 40,
          color: "#bf0603",
          fontFamily: "OpenSansRegular",
          fontSize: 48,
          fontStyle: "normal",
        }}
      >
        Chaos
      </Text>
      <Text
        style={{
          marginTop: -24,
          paddingLeft: 100,
          color: "#74c69d",
          fontFamily: "OpenSansRegular",
          fontSize: 48,
          fontStyle: "normal",
        }}
      >
        to Control
      </Text>
      <Text
        style={{
          marginTop: -12,
          paddingLeft: 170,
          color: "#606060",
          fontFamily: "OpenSansLight",
          fontSize: 20,
        }}
      >
        Time Focus Excel
      </Text>
    </View>
  );
};
