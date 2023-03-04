import React from "react";
import Dropzone from "react-dropzone";
import * as yup from "yup";
import { Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../store/authSlice.js";
import { AiOutlineCloudUpload } from "react-icons/ai";
import axios from "axios";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("first name is required"),
  lastName: yup.string().required("last name is required"),
  email: yup.string().email("invalid email").required("email is required"),
  password: yup.string().required("password is required"),
  picture: yup.string().required("picture is required"),
  bio: yup.string().required("bio is required"),
  location: yup.string().required("location is required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("email is required"),
  password: yup.string().required("password is required"),
});

const registerInitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  picture: "",
  bio: "",
  location: "",
};

const loginInitialValues = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const loginFunc = async (values, onSubmitProps) => {
    try {
        const loginResponse = await fetch("http://localhost:5000/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          });

          const isLoggedin = await loginResponse.json();
          if (isLoggedin) {
            onSubmitProps.resetForm();
            dispatch(
              setLogin({ user: isLoggedin.foundUser, token: isLoggedin.token })
            );
            navigate("/home");
          }
    } catch (err) {
        console.log(err.message)
    }
   
  };

  const reginterFunc = async (values, onSubmitProps) => {
    const data = new FormData();
    for (let value in values) {
      data.append(value, values[value]);
    }

    data.append("picturePath", values.picture.name);
    const registerRequest = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      body: data,
    });
    //http://localhost:5000/auth/register
    const savedUser = await registerRequest.json();
    onSubmitProps.resetForm();
    setPageType("login");
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await loginFunc(values, onSubmitProps);
    if (isRegister) await reginterFunc(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? loginInitialValues : registerInitialValues}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit} id="myForm" className="container">
          <div className="row">
            {isLogin && (
              <>
                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="Email"
                    className="form-control"
                  />
                  <div className="form-text text-danger">
                    {errors.email && touched.email && errors.email}
                  </div>
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    placeholder="Password"
                    className="form-control"
                  />
                  <div className="form-text text-danger">
                    {errors.password && touched.password && errors.password}
                  </div>
                </div>
              </>
            )}
            {isRegister && (
              <>
                <div className="mb-3  col-6">
                  <input
                    type="text"
                    name="firstName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                    placeholder="First Name"
                    className="form-control"
                  />
                  <div className="form-text text-danger">
                    {errors.firstName && touched.firstName && errors.firstName}
                  </div>
                </div>
                <div className="mb-3  col-6">
                  <input
                    type="text"
                    name="lastName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                    placeholder="Last Name"
                    className="form-control"
                  />
                  <div className="form-text text-danger">
                    {errors.lastName && touched.lastName && errors.lastName}
                  </div>
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="Email"
                    className="form-control"
                  />
                  <div className="form-text text-danger">
                    {errors.email && touched.email && errors.email}
                  </div>
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    placeholder="Password"
                    className="form-control"
                  />
                  <div className="form-text text-danger">
                    {errors.password && touched.password && errors.password}
                  </div>
                </div>
                {/*next field for image*/}
                <div className="mb-3">
                  {/* <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="Email"
                className="form-control"
                /> */}
                  <Dropzone
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <section>
                        <div
                          {...getRootProps()}
                          className="form-control d-flex justify-content-center align-items-center flex-column"
                          style={{ cursor: "pointer" }}
                        >
                          <AiOutlineCloudUpload size={40} />
                          <input {...getInputProps()} />
                          {!values.picture ? (
                            <p className="text-grey">
                              Click to browse or drag your profile picture Here
                            </p>
                          ) : (
                            <p>{values.picture.name}</p>
                          )}
                        </div>
                      </section>
                    )}
                  </Dropzone>
                  <div className="form-text text-danger">
                    {errors.email && touched.email && errors.email}
                  </div>
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    name="bio"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.bio}
                    placeholder="Bio"
                    className="form-control"
                  />
                  <div className="form-text text-danger">
                    {errors.bio && touched.bio && errors.bio}
                  </div>
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    name="location"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.location}
                    placeholder="Location"
                    className="form-control"
                  />
                  <div className="form-text text-danger">
                    {errors.location && touched.location && errors.location}
                  </div>
                </div>
              </>
            )}
            <button
              type="submit"
              className="btn btn-info mx-auto mb-3"
              style={{ width: 626 }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </button>
            <a
              className="text-primary"
              style={{ cursor: "pointer" }}
              onClick={() => setPageType(isLogin ? "register" : "login")}
            >
              {isLogin
                ? "Don't havea an account ? Singup here ."
                : "Already have an account ? Login here ."}
            </a>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default Form;
