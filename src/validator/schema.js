import * as yup from "yup";

const passwordRules = /^(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).{8,}$/;
const titleRules = /^[a-z A-Z]+$/;
const subtitleRules = /^[a-z A-Z ,]+$/;
// Must Contain 8 Characters, One Uppercase, One Lowercase

export const signInSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup
    .string()
    .min(8)
    .matches(passwordRules, { message: "Please create a strong password" })
    .required("Required"),
});

export const signUpSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup
    .string()
    .min(8)
    .matches(passwordRules, { message: "Please create a strong password" })
    .required("Required"),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

export const taskSchema = yup.object().shape({
  name: yup
    .string()
    .required("Main Task is required")
    .matches(titleRules, { message: "Enter correct Main Task" }),
  subtitle: yup
    .string()
    .required("Sub Task is required")
    .matches(subtitleRules, { message: "Enter correct Sub Task" }),
});
