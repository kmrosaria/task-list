import { useState, type ReactElement } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { useAuthRegister } from "./utils/queries";
import { UserErrorResponse } from "./utils/type";
import { Link, useNavigate } from "react-router-dom";

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(5, "Your password is too short.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  password2: Yup.string().oneOf([Yup.ref("password")], "Passwords must match"),
});

const Register = (): ReactElement => {
  const [apiError, setApiError] = useState<UserErrorResponse>();

  const navigate = useNavigate();
  const AuthRegister = useAuthRegister();
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <Formik
        initialValues={{
          email: "",
          password: "",
          password2: "",
        }}
        validationSchema={RegisterSchema}
        onSubmit={(values) => {
          // same shape as initial values
          console.log(values);
          AuthRegister.mutate(values, {
            onSuccess: (data) => {
              console.log(data);
              navigate("/");
            },
            onError: (error) => {
              setApiError(error?.response?.data as UserErrorResponse);
            },
          });
        }}
      >
        {({ errors, touched }) => (
          <Form style={{ maxWidth: "330px", padding: "16px" }}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <Field
                name="email"
                type="email"
                className={
                  "form-control " +
                  (errors.email && touched.email ? "is-invalid" : null)
                }
                id="email"
              />
              <div
                id="validationServerUsernameFeedback"
                className="invalid-feedback"
              >
                {errors.email}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <Field
                name="password"
                type="password"
                className={
                  "form-control " +
                  (errors.password && touched.password ? "is-invalid" : null)
                }
                id="password"
              />

              <div
                id="validationServerUsernameFeedback"
                className="invalid-feedback"
              >
                {errors.password}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="password2" className="form-label">
                Re-type Password
              </label>
              <Field
                name="password2"
                type="password"
                className={
                  "form-control " +
                  (errors.password2 && touched.password2 ? "is-invalid" : null)
                }
                id="password2"
              />

              <div
                id="validationServerUsernameFeedback"
                className="invalid-feedback"
              >
                {errors.password2}
              </div>
            </div>

            {apiError && (
              <div className="alert alert-danger text-center" role="alert">
                {apiError.message}
              </div>
            )}
            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>

            <div className="float-right mt-3">
              <Link
                to="/"
                relative="path"
                className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
              >
                Already have an account?
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
