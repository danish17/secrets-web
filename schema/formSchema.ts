import * as Yup from "yup";

export const formValidationSchema = Yup.object().shape({
  secret: Yup.string()
    .min(1, "a secret should be more than one (1) character.")
    .required("secret cannot be empty :/"),
  passphrase: Yup.string()
    .min(4, "passphrase is too short.")
    .max(32, "passphrase cannot be longer than 32 characters")
    .required(),
  viewsAllowed: Yup.number().min(1).max(12).required(),
  validFor: Yup.number().min(1).max(24).required(),
});
