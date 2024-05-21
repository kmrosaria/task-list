import { useContext, useState, type ReactElement } from "react";
import { Formik, Form, Field } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { useAuthLogin } from "./utils/queries";
import { AuthContext } from "../../context/AuthContext";
import { UserErrorResponse } from "./utils/type";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const Login = (): ReactElement => {
  const { setAuthenticated } = useContext(AuthContext);
  const [apiError, setApiError] = useState<UserErrorResponse>();

  const navigate = useNavigate();
  const AuthLogin = useAuthLogin();
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          // same shape as initial values
          AuthLogin.mutate(values, {
            onSuccess: (data) => {
              localStorage.setItem("token", data.token);
              setAuthenticated(true);
              navigate("/task");
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
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
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
            </div>
            {apiError && (
              <div className="alert alert-danger text-center" role="alert">
                {apiError.message}
              </div>
            )}
            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>

            <div className="mt-3">
              <Link
                to="/register"
                relative="path"
                className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
              >
                No account? Create one
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
