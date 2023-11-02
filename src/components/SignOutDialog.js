import { View, Text, Modal, TouchableOpacity } from "react-native";
import React from "react";
import { signOut } from "firebase/auth";
import { useToast } from "react-native-toast-notifications";

import { auth } from "../config/firebase";
import { Button } from "./Button";

const SignOutDialog = ({ visible, onClose }) => {
  const toast = useToast();
  const onSubmit = async () => {
    signOut(auth)
      .then(() => {
        toast.show("Sign Out Successful", {
          type: "success",
          placement: "top",
          duration: 500,
          offset: 30,
          animationType: "slide-in",
        });
      })
      .catch((err) => {
        toast.show(err, {
          type: "error",
          placement: "top",
          duration: 500,
          offset: 30,
          animationType: "slide-in",
        });
      });

    onClose();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <TouchableOpacity style={{ flex: 1 }} onPress={onClose}>
        <View style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", flex: 1 }} />
      </TouchableOpacity>
      <View style={{ backgroundColor: "white", padding: 20 }}>
        <Text
          style={{
            borderBottomWidth: 1,
            borderStyle: "dashed",
            fontSize: 16,
            padding: 5,
          }}
        >
          Sign Out
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: 10,
          }}
        >
          <Button
            fontSize={15}
            marginRight={10}
            text={"NO"}
            backgroundColor={"red"}
            handlePress={onClose}
          />
          <Button
            fontSize={15}
            marginRight={10}
            text={"YES"}
            backgroundColor={"#74B72D"}
            handlePress={onSubmit}
          />
        </View>
      </View>
    </Modal>
  );
};

export default SignOutDialog;
