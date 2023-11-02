import { TouchableOpacity, Image } from "react-native";
import { Text } from "react-native";
import React from "react";

export const Button = ({ text, width, fontSize, handlePress, ...props }) => {
  return (
    <TouchableOpacity
      style={{
        marginTop: 10,
        alignSelf: "center",
        backgroundColor: "#1C0C4F",
        borderRadius: 20,
        width: width,
        padding: 12,
        ...props,
      }}
      onPress={handlePress}
    >
      <Text
        style={{
          fontFamily: "OpenSansSemiBold",
          fontSize: fontSize,
          color: "#fff",
          textAlign: "center",
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export const CircularButton = ({
  size,
  imgSize,
  imgUrl,
  handlePress,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        width: size,
        height: size,
        backgroundColor: "gray",
        borderRadius: size / 2,
        alignItems: "center",
        justifyContent: "center",
        ...props,
      }}
      onPress={handlePress}
    >
      <Image
        source={imgUrl}
        resizeMode="contain"
        style={{ width: imgSize, height: imgSize }}
      />
    </TouchableOpacity>
  );
};

export const ApplyButton = ({
  text,
  width,
  fontSize,
  handlePress,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={{
        marginTop: 10,
        alignSelf: "center",
        backgroundColor: "#1C0C4F",
        borderRadius: 10,
        width: width,
        padding: 12,
        ...props,
      }}
      onPress={handlePress}
    >
      <Text
        style={{
          fontFamily: "OpenSansSemiBold",
          fontSize: fontSize,
          color: "#fff",
          textAlign: "center",
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};
