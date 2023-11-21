
import { Address, UserValue } from "@/interfaces/pages/user";
import { number, object, ref, string } from "yup";

export const editUserSchema = object<UserValue>().shape({
  email: string().email("Invalid email").required("Required"),
  password: string().required("Required"),
  firstName: string().required("Required"),
  lastName: string().required("Required"),
  passwordConfirmation: string().oneOf(
    [ref("password"), ""],
    "Passwords must match"
  ),
  address: object<Address>().shape({
    city: string().required("Required"),
    number: number().min(1, "Numero invalido").required("Required"),
    state: string().required("Required"),
    street: string().required("Required"),
    zipcode: number().min(1, "Numero invalido").required("Required"),
  })
});
