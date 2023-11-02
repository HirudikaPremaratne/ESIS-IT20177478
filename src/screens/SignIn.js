import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  Dimensions,
} from "react-native";
import React from "react";
import { Formik, Field } from "formik";
import Icon from "react-native-dynamic-vector-icons";
import { useToast } from "react-native-toast-notifications";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../config/firebase";
import { Button } from "../components/Button";
import FocusedStatusBar from "../components/FocusedStatusBar";
import Background from "../../assets/images/background.png";

import { signInSchema } from "../validator/schema";

const SignIn = ({ navigation }) => {
  const toast = useToast();

  const onSubmit = async (values, actions) => {
    console.log(values);

    try {
      await signInWithEmailAndPassword(
        auth,
        values.email.trim(),
        values.password.trim()
      );
      toast.show("Login Successful", {
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
          Welcome
        </Text>
        <Text
          style={{ color: "#fff", fontSize: 24, fontFamily: "OpenSansRegular" }}
        >
          Back
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
          initialValues={{ email: "", password: "" }}
          validationSchema={signInSchema}
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
                  value={values.email}
                  name="email"
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
              <Button
                fontSize={15}
                marginBottom={5}
                text={"Log In"}
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
          backgroundColor={"#13236b"}
          text={"Sign Up"}
          width={Dimensions.get("window").width - 80}
          handlePress={() => navigation.navigate("SignUp")}
        />
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
