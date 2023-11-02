import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Icon from "react-native-dynamic-vector-icons";
import { doc, collection, updateDoc } from "firebase/firestore";
import CheckBox from "expo-checkbox";
import { useToast } from "react-native-toast-notifications";

import { db, auth } from "../config/firebase";
import UpdateDialog from "./UpdateDialog";
import DeleteDialog from "./DeleteDialog";

const Task = (props) => {
  const toast = useToast();
  const [agree, setAgree] = useState(props.data.isComplete);
  const [updateDialogVisible, setUpdateDialogVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);

  const handleShowDialog = () => {
    setUpdateDialogVisible(true);
  };

  const handleCloseDialog = () => {
    setUpdateDialogVisible(false);
  };

  const handleShowDeleteDialog = () => {
    setDeleteDialogVisible(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogVisible(false);
  };

  const leftSwipe = () => (
    <TouchableOpacity
      onPress={handleShowDialog}
      style={{
        width: 100,
        height: 80,
        borderRadius: 10,
        backgroundColor: "green",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Icon name="edit" type="FontAwesome5" size={26} color="black" />
    </TouchableOpacity>
  );

  const rightSwipe = () => (
    <TouchableOpacity
      onPress={handleShowDeleteDialog}
      style={{
        width: 100,
        height: 80,
        borderRadius: 10,
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Icon name="trash" type="FontAwesome5" size={26} color="black" />
    </TouchableOpacity>
  );

  const updateTodo = () => {
    setAgree(!agree);
    const todoRef = collection(db, "userData", auth.currentUser.uid, "todos");
    const docRef = doc(todoRef, props.data.id);

    const updateTodo = {
      isComplete: agree,
    };

    updateDoc(docRef, updateTodo)
      .then(() => {
        toast.show("Todo updated Successfully", {
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
  };

  return (
    <View style={{ margin: 8 }}>
      <Swipeable renderLeftActions={leftSwipe} renderRightActions={rightSwipe}>
        <View
          style={{
            height: 80,
            justifyContent: "center",
            borderRadius: 10,
            padding: 10,
            marginLeft: 8,
            marginRight: 8,
            backgroundColor: "#f4f4f4",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {props.data.isComplete ? (
              <Icon
                name="check"
                type="FontAwesome5"
                size={24}
                style={{ margin: 8 }}
              />
            ) : (
              <Icon
                name="tasks"
                type="FontAwesome5"
                size={24}
                style={{ margin: 8 }}
              />
            )}
            <View
              style={{
                flex: 1,
                flexDirection: "column",
              }}
            >
              <Text
                style={
                  props.data.isComplete
                    ? { textDecorationLine: "line-through" }
                    : {}
                }
              >
                {props.data.name}
              </Text>
              <Text
                style={
                  props.data.isComplete
                    ? { textDecorationLine: "line-through" }
                    : {}
                }
              >
                {props.data.subtitle}
              </Text>
            </View>
            <CheckBox
              style={{ borderRadius: 10 }}
              value={props.data.isComplete}
              onValueChange={updateTodo}
              color={agree ? "#4630EB" : undefined}
            />
          </View>
        </View>
      </Swipeable>
      <UpdateDialog
        visible={updateDialogVisible}
        onClose={handleCloseDialog}
        data={{
          id: props.data.id,
          name: props.data.name,
          subtitle: props.data.subtitle,
          isComplete: props.data.isComplete,
        }}
      />
      <DeleteDialog
        visible={deleteDialogVisible}
        onClose={handleCloseDeleteDialog}
        data={{
          id: props.data.id,
        }}
      />
    </View>
  );
};

export default Task;
