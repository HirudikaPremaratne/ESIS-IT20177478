import React from "react";
import { Modal, TextInput, Text, View, TouchableOpacity } from "react-native";
import { Button } from "./Button";
import { taskSchema } from "../validator/schema";
import { Formik, Field } from "formik";
import { useToast } from "react-native-toast-notifications";

import { db, auth } from "../config/firebase";
import { collection, doc, updateDoc } from "firebase/firestore";

const UpdateDialog = ({ visible, onClose, data }) => {
  const toast = useToast();
  const onSubmit = async (values) => {
    const todoRef = collection(db, "userData", auth.currentUser.uid, "todos");
    const docTodo = doc(todoRef, data.id);

    const updateTodo = {
      name: values.name,
      subtitle: values.subtitle,
    };

    updateDoc(docTodo, updateTodo)
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
          type: "success",
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
          Update Task
        </Text>
        <Formik
          initialValues={{
            id: auth.currentUser.uid,
            name: data.name,
            subtitle: data.subtitle,
            isComplete: data.isComplete,
          }}
          validationSchema={taskSchema}
          onSubmit={onSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isSubmitting,
          }) => (
            <>
              <View>
                <Field
                  component={TextInput}
                  placeholder="Enter Task Name"
                  value={values.name}
                  name="name"
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  style={{
                    height: 40,
                    margin: 12,
                    padding: 10,
                    paddingLeft: 20,
                    borderWidth: 1,
                    borderRadius: 20,
                  }}
                />
                {touched.name && errors.name ? (
                  <Text style={{ color: "red", paddingStart: 32 }}>
                    {errors.name}
                  </Text>
                ) : null}
              </View>
              <View>
                <Field
                  component={TextInput}
                  name="subtitle"
                  placeholder="Enter Sub Task"
                  value={values.subtitle}
                  onChangeText={handleChange("subtitle")}
                  onBlur={handleBlur("subtitle")}
                  style={{
                    height: 40,
                    margin: 12,
                    padding: 10,
                    paddingLeft: 20,
                    borderWidth: 1,
                    borderRadius: 20,
                  }}
                />
                {touched.subtitle && errors.subtitle ? (
                  <Text style={{ color: "red", paddingStart: 32 }}>
                    {errors.subtitle}
                  </Text>
                ) : null}
              </View>
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
                  text={"CANCEL"}
                  backgroundColor={"red"}
                  handlePress={onClose}
                  disabled={isSubmitting}
                />
                <Button
                  fontSize={15}
                  marginRight={10}
                  text={"UPDATE"}
                  backgroundColor={"#74B72D"}
                  handlePress={handleSubmit}
                  disabled={isSubmitting}
                />
              </View>
            </>
          )}
        </Formik>
      </View>
    </Modal>
  );
};

export default UpdateDialog;
