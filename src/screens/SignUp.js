import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
} from "react-native";
import React from "react";
import Icon from "react-native-dynamic-vector-icons";
import { useToast } from "react-native-toast-notifications";
import { Formik, Field } from "formik";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "../config/firebase";
import { Button } from "../components/Button";
import FocusedStatusBar from "../components/FocusedStatusBar";

import { signUpSchema } from "../validator/schema";
import Background from "../../assets/images/background.png";

const SignUp = ({ navigation }) => {
  const toast = useToast();

  const onSubmit = async (values, actions) => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        values.email.trim(),
        values.password.trim()
      );
      toast.show("Registration Successful", {
        type: "success",
        placement: "top",
        duration: 500,
        offset: 30,
        animationType: "slide-in",
      });
    } catch (err) {
      toast.show(err, {
        type: "error",
        placement: "top",
        duration: 500,
        offset: 30,
        animationType: "slide-in",
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <FocusedStatusBar backgroundColor={"#13236b"} />
      <Image
        source={Background}
        resizeMode="cover"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: 180,
          width: "100%",
        }}
      />
      <View
        style={{
          height: 40,
          position: "absolute",
          top: 40,
          left: 20,
        }}
      >
        <Text
          style={{ color: "#fff", fontSize: 24, fontFamily: "OpenSansRegular" }}
        >
          Create
        </Text>
        <Text
          style={{ color: "#fff", fontSize: 24, fontFamily: "OpenSansRegular" }}
        >
          Account
        </Text>
      </View>
      <View
        style={{
          position: "absolute",
          top: 250,
          left: 8,
          right: 8,
        }}
      >
        <Formik
          initialValues={{ email: "", password: "", confirmPassword: "" }}
          validationSchema={signUpSchema}
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
            <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
              <View>
                <Icon
                  name="user"
                  type="AntDesign"
                  size={20}
                  color="black"
                  style={{
                    position: "absolute",
                    top: 22,
                    left: 20,
                    borderRightWidth: 1,
                  }}
                />
                <Field
                  component={TextInput}
                  placeholder="Enter Email"
                  name="email"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  style={{
                    height: 40,
                    margin: 12,
                    padding: 10,
                    paddingLeft: 35,
                    borderWidth: 1,
                    borderRadius: 20,
                  }}
                />
                {touched.email && errors.email ? (
                  <Text style={{ color: "red" }}>{errors.email}</Text>
                ) : null}
              </View>
              <View>
                <Icon
                  name="lock"
                  type="AntDesign"
                  size={20}
                  color="black"
                  style={{
                    position: "absolute",
                    top: 22,
                    left: 20,
                    borderRightWidth: 1,
                  }}
                />
                <Field
                  component={TextInput}
                  name="password"
                  placeholder="Enter Password"
                  secureTextEntry
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  style={{
                    height: 40,
                    margin: 12,
                    padding: 10,
                    paddingLeft: 35,
                    borderWidth: 1,
                    borderRadius: 20,
                  }}
                />
                {touched.password && errors.password ? (
                  <Text style={{ color: "red" }}>{errors.password}</Text>
                ) : null}
              </View>
              <View>
                <Icon
                  name="lock"
                  type="AntDesign"
                  size={20}
                  color="black"
                  style={{
                    position: "absolute",
                    top: 22,
                    left: 20,
                    borderRightWidth: 1,
                  }}
                />
                <Field
                  component={TextInput}
                  placeholder="Enter Confirm Password"
                  name="confirmPassword"
                  secureTextEntry
                  value={values.confirmPassword}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  style={{
                    height: 40,
                    margin: 12,
                    padding: 10,
                    paddingLeft: 35,
                    borderWidth: 1,
                    borderRadius: 20,
                  }}
                />
                {touched.confirmPassword && errors.confirmPassword ? (
                  <Text style={{ color: "red" }}>{errors.confirmPassword}</Text>
                ) : null}
              </View>
              <Button
                fontSize={15}
                marginBottom={5}
                text={"Register"}
                width={Dimensions.get("window").width - 80}
                backgroundColor={"#74B72D"}
                handlePress={handleSubmit}
                disabled={isSubmitting}
              />
            </ScrollView>
          )}
        </Formik>
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            fontFamily: "OpenSansRegular",
          }}
        >
          -------------- or --------------
        </Text>
        <Button
          fontSize={15}
          text={"Log In"}
          marginBottom={12}
          width={Dimensions.get("window").width - 80}
          backgroundColor={"#13236b"}
          handlePress={() => navigation.navigate("SignIn")}
        />
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
